import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getMostCommentPosts = async () => {
    try {
        const query = `*[_type == "post" && typePost == "Q&A"] {
        _id,
        title,
        "commentCount": count(*[_type == "comment" && references(^._id)]),
        author->{profile_pic}
        }`;


        const posts = await client.fetch(query);

        // Sort manually in JavaScript
        posts.sort((a:any, b:any) => b.commentCount - a.commentCount);
        const result = [posts[0],posts[1]];

        return result;
    } catch (_error) {
        console.error("Error fetching most commented posts:", _error);
        return [];
    }
};

export async function GET(_req: Request) {
    try {
        const posts = await getMostCommentPosts();
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
