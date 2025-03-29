import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getMostUpvoteLessons = async () => {
    try {
        const query = `*[_type=="post"&& typePost == "Lesson"]{
            title,
            upvote,
            _id
        }`;
        const data = await client.fetch(query);

        const result = data.sort((a: any, b: any) => b.upvote - a.upvote).slice(0, 2);

        return result;
    } catch (error) {
        console.error("Error fetching most upvoted lessons:", error);
        return [];
    }
};

export async function GET(req: Request) {
    try {
        const data = await getMostUpvoteLessons();

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        console.error("Error in GET request:", e);

        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
