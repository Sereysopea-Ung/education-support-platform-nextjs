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
    const { commentId, userEmail, action } = await req.json();
    if (!commentId || !userEmail || !['upvote', 'downvote'].includes(action)) {
      return NextResponse.json({ error: 'commentId, userEmail, and valid action are required' }, { status: 400 });
    }

    // Fetch current votes
    const comment = await client.fetch(
      `*[_type == "comment" && _id == $id][0]{ _id, upvote, downvote }`,
      { id: commentId }
    );
    if (!comment?._id) {
      return NextResponse.json({ error: 'Comment not found' }, { status: 404 });
    }

    const up = Array.isArray(comment.upvote) ? comment.upvote : [];
    const down = Array.isArray(comment.downvote) ? comment.downvote : [];

    let newUp = [...up];
    let newDown = [...down];

    const hasUp = newUp.includes(userEmail);
    const hasDown = newDown.includes(userEmail);

    if (action === 'upvote') {
      if (hasUp) {
        // remove upvote (toggle off)
        newUp = newUp.filter((e) => e !== userEmail);
      } else {
        newUp = [...newUp, userEmail];
        if (hasDown) newDown = newDown.filter((e) => e !== userEmail);
      }
    } else if (action === 'downvote') {
      if (hasDown) {
        // remove downvote (toggle off)
        newDown = newDown.filter((e) => e !== userEmail);
      } else {
        newDown = [...newDown, userEmail];
        if (hasUp) newUp = newUp.filter((e) => e !== userEmail);
      }
    }

    const patched = await client
      .patch(commentId)
      .set({ upvote: newUp, downvote: newDown })
      .commit();

    // Return updated comment with author as the page expects
    const full = await client.fetch(
      `*[_type == "comment" && _id == $id][0]{
        _id, text, createdAt,
        author->{_id, username, email, profile_pic},
        post, parentComment, upvote, downvote
      }`,
      { id: patched._id }
    );

    return NextResponse.json(full);
  } catch (err) {
    console.error('Comment vote error:', err);
    return NextResponse.json({ error: 'Failed to update vote' }, { status: 500 });
  }
}
