import { NextResponse } from 'next/server';
import { groq } from 'next-sanity';
import { createClient } from 'next-sanity';

// Create a Sanity client instance directly here
const sanityClient = createClient({
    projectId: 'your-project-id',  // Replace with your Sanity project ID
    dataset: 'your-dataset',       // Replace with your Sanity dataset name
    useCdn: true,                  // Set to false for fresh data (useful in development)
});

// GROQ query to fetch the post by its ID
const postQuery = groq`
  *[_type == "post" && _id == $id][0] {
    _id,
    title,
    slug,
    pitch,
    postImage {
      asset -> {
        url
      }
    },
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
        const id = url.searchParams.get('id'); // Get the post ID from the query string

        if (!id) {
            return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
        }

        const post = await sanityClient.fetch(postQuery, { id });

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch (error) {
        console.error('Error fetching the post:', error);
        return NextResponse.json({ error: 'Error fetching the post' }, { status: 500 });
    }
}
