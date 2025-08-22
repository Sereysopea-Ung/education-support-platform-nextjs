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
    if (!email) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { targetUserId } = await req.json();
    if (!targetUserId || typeof targetUserId !== 'string') {
      return new Response(JSON.stringify({ error: 'targetUserId is required' }), { status: 400 });
    }

    // Resolve current user's Sanity _id
    const me = await client.fetch<{ _id: string } | null>(
      `*[_type == "user" && email == $email][0]{ _id }`,
      { email }
    );
    if (!me?._id) {
      return new Response(JSON.stringify({ error: 'Current user not found in Sanity' }), { status: 404 });
    }

    // Read target followers
    const target = await client.fetch<{ _id: string; followers?: string[] } | null>(
      `*[_type == "user" && _id == $id][0]{ _id, followers }`,
      { id: targetUserId }
    );
    if (!target?._id) {
      return new Response(JSON.stringify({ error: 'Target user not found' }), { status: 404 });
    }

    const currentFollowers = Array.isArray(target.followers) ? target.followers : [];
    if (!currentFollowers.includes(me._id)) {
      // Not following; idempotent response
      return new Response(JSON.stringify({ ok: true, alreadyUnfollowed: true }), { status: 200 });
    }

    const newFollowers = currentFollowers.filter((id) => id !== me._id);

    await client
      .patch(target._id)
      .set({ followers: newFollowers })
      .commit();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unfollow API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to unfollow user' }), { status: 500 });
  }
}
