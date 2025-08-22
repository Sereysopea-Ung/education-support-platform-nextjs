import { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email as string | undefined;
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { feedbackText, rating } = await req.json();
    if (!feedbackText || typeof feedbackText !== 'string') {
      return new Response(JSON.stringify({ error: 'feedbackText is required' }), { status: 400 });
    }
    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5) {
      return new Response(JSON.stringify({ error: 'rating must be 1-5' }), { status: 400 });
    }

    // resolve user id
    const me = await client.fetch<{ _id: string } | null>(
      `*[_type == "user" && email == $email][0]{ _id }`,
      { email }
    );
    if (!me?._id) return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });

    const doc = {
      _type: 'feedback',
      author: { _type: 'reference', _ref: me._id },
      feedbackText,
      rating: ratingNum,
      createdAt: new Date().toISOString(),
    };

    const created = await client.create(doc);
    return new Response(JSON.stringify({ ok: true, id: created._id }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Feedback API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to submit feedback' }), { status: 500 });
  }
}
