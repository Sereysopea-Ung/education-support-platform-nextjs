import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function PATCH(req: Request) {
  try {
    const { postId, userEmail, pitch, images, files, major, subject, typePost } = await req.json();
    if (!postId || !userEmail) {
      return NextResponse.json({ error: 'postId and userEmail are required' }, { status: 400 });
    }

    const post = await client.fetch(
      `*[_type == "post" && _id == $id][0]{ _id, author->{email} }`,
      { id: postId }
    );
    if (!post?._id) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }
    if (post.author?.email !== userEmail) {
      return NextResponse.json({ error: 'Not authorized to update this post' }, { status: 403 });
    }

    const patch = client.patch(postId);
    if (typeof pitch === 'string') patch.set({ pitch });
    if (Array.isArray(images)) patch.set({ images });
    if (Array.isArray(files)) patch.set({ files });
    if (Array.isArray(major)) patch.set({ major });
    if (Array.isArray(subject)) patch.set({ subject });
    if (typeof typePost === 'string') patch.set({ typePost });

    const updated = await patch.commit();
    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error('Update post error:', err);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
