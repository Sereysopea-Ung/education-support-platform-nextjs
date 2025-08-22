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
    const { postId, text, userEmail, parentCommentId } = await req.json();
    if (!postId || !text || !userEmail) {
      return NextResponse.json({ error: 'postId, text, and userEmail are required' }, { status: 400 });
    }

    // Find user by email to set author reference
    const user = await client.fetch(
      `*[_type == "user" && email == $email][0]{ _id }`,
      { email: userEmail }
    );
    if (!user?._id) {
      return NextResponse.json({ error: 'User not found for provided email' }, { status: 404 });
    }

    const doc: any = {
      _type: 'comment',
      text,
      author: { _type: 'reference', _ref: user._id },
      post: { _type: 'reference', _ref: postId },
      createdAt: new Date().toISOString(),
      upvote: [],
      downvote: [],
    };

    if (parentCommentId) {
      doc.parentComment = { _type: 'reference', _ref: parentCommentId };
    }

    const created = await client.create(doc);

    // Return created comment with author info
    const full = await client.fetch(
      `*[_type == "comment" && _id == $id][0]{
        _id, text, createdAt,
        author->{_id, username, email, profile_pic},
        post, parentComment, upvote, downvote
      }`,
      { id: created._id }
    );

    return NextResponse.json(full, { status: 201 });
  } catch (err: any) {
    console.error('Create comment error:', err);
    return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 });
  }
}
