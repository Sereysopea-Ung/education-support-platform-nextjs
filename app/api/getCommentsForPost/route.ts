import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const postId = searchParams.get('postId')
    if (!postId) {
      return NextResponse.json({ error: 'postId is required' }, { status: 400 })
    }

    // Fetch all comments for the post (flat). Threading can be built client-side if needed.
    const comments = await client.fetch(
      `*[_type == "comment" && post._ref == $postId] | order(createdAt asc){
        _id,
        text,
        createdAt,
        parentComment,
        upvote,
        downvote,
        attachmentUrl,
        attachmentType,
        author->{ _id, username, email, profile_pic }
      }`,
      { postId }
    )

    return NextResponse.json({ comments })
  } catch (err) {
    console.error('Fetch comments error:', err)
    return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
  }
}
