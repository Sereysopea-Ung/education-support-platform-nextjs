import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getMostUpvotePosts = async () => {
    try {
        // Corrected query definition
        const query = `*[_type == "post"] | order(upvote desc) [0...2] {
            _id,
            title,
            upvote,
            author->{
                username,
                profile_pic
            }
        }`;

        const posts = await client.fetch(query);
        return posts;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching most upvoted posts:', error.message);
            throw new Error('Failed to fetch posts');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export async function GET(req: Request) {
    try {
        const posts = await getMostUpvotePosts();
        return new Response(JSON.stringify(posts), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        } else {
            return new Response(JSON.stringify({ error: 'An unknown error occurred' }), { status: 500 });
        }
    }
}