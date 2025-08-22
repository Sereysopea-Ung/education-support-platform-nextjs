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
    const { commentId, userEmail } = await req.json();
    if (!commentId || !userEmail) {
      return NextResponse.json({ error: 'commentId and userEmail are required' }, { status: 400 });
    }

    // Resolve requesting user by email
    const requester = await client.fetch(
      `*[_type == "user" && email == $email][0]{ _id, email }`,
      { email: userEmail }
    );
    if (!requester?._id) {
      return NextResponse.json({ error: 'User not found for provided email' }, { status: 404 });
    }

    // Fetch the comment with author id
    const comment = await client.fetch(
      `*[_type == "comment" && _id == $id][0]{ _id, author-> { _id, email } }`,
      { id: commentId }
    );

    if (!comment?._id) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    if (comment?.author?._id !== requester._id) {
      return NextResponse.json({ error: 'Not authorized to delete this comment' }, { status: 403 });
    }

    // Find all direct replies to this comment
    const replies: { _id: string; author: { _id: string } }[] = await client.fetch(
      `*[_type == "comment" && defined(parentComment) && parentComment._ref == $id]{ _id, author->{ _id } }`,
      { id: commentId }
    );

    // If there are replies by other users, soft-delete the parent (keep doc, set text to "[deleted]")
    const hasOtherUsers = replies.some((r) => r?.author?._id && r.author._id !== requester._id);
    if (hasOtherUsers) {
      const patched = await client.patch(commentId).set({ text: '[deleted]' }).commit();
      return NextResponse.json({ softDeleted: true, id: commentId });
    }

    // Otherwise, delete direct replies and the parent
    let tx = client.transaction();
    for (const r of replies) tx = tx.delete(r._id);
    tx = tx.delete(commentId);
    await tx.commit();

    return NextResponse.json({ deletedId: commentId, deletedReplies: replies.map(r => r._id) });
  } catch (err: any) {
    console.error('Delete comment error:', err);
    return NextResponse.json({ error: err?.message || 'Failed to delete comment' }, { status: 500 });
  }
}
