import { NextResponse } from 'next/server';
import { createClient } from 'next-sanity';

// Create a Sanity client instance directly here
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  // Replace with your Sanity project ID
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,       // Replace with your Sanity dataset name
    useCdn: true,                  // Set to false for fresh data (useful in development)
});

// GROQ query to fetch the post by its ID
const postQuery = `
  *[_type == "post" && _id == $id][0] {
    _id,
    title,
    slug,
    pitch,
    images,
    files,
    postImages,
    upvote,
    downvote,
    typePost,
    pdfFile {
      asset -> {
        url
      }
    },
    author -> {
      _id,
      username,
      name,
      profile_pic {
        asset -> {
          url
        }
      }
    }
  }
`;

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        const post = await sanityClient.fetch(postQuery, {id});
        console.log('Fetched post:', post);

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching the post:', error);
        return NextResponse.json({ error: 'Error fetching the post' }, { status: 500 });
    }
}
