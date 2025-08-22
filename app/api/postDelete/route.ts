import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { postId, userEmail } = await req.json();
    if (!postId || !userEmail) {
      return NextResponse.json({ error: 'postId and userEmail are required' }, { status: 400 });
    }

    const post = await client.fetch(
      `*[_type == "post" && _id == $id][0]{ _id, author->{_id, email} }`,
      { id: postId }
    );
    if (!post?._id) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    if (!post.author?.email || post.author.email !== userEmail) {
      return NextResponse.json({ error: 'Not authorized to delete this post' }, { status: 403 });
    }

    await client.delete(postId);

    return NextResponse.json({ deletedId: postId }, { status: 200 });
  } catch (err: any) {
    console.error('Delete post error:', err);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
