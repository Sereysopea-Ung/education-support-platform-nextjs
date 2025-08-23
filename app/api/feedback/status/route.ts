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

const ALLOWED = ['new', 'in_progress', 'resolved'] as const;

type Status = typeof ALLOWED[number];

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email as string | undefined;
    if (!email) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });

    const { id, status } = await req.json();
    if (!id || typeof id !== 'string') {
      return new Response(JSON.stringify({ error: 'id is required' }), { status: 400 });
    }
    if (!ALLOWED.includes(status)) {
      return new Response(JSON.stringify({ error: 'invalid status' }), { status: 400 });
    }

    // Ensure document exists and is feedback
    const exists = await client.fetch<{ _id: string } | null>(
      `*[_id == $id && _type == "feedback"][0]{ _id }`,
      { id }
    );
    if (!exists?._id) {
      return new Response(JSON.stringify({ error: 'Feedback not found' }), { status: 404 });
    }

    await client.patch(id).set({ status: status as Status }).commit();
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('Update feedback status error:', err);
    return new Response(JSON.stringify({ error: 'Failed to update status' }), { status: 500 });
  }
}
