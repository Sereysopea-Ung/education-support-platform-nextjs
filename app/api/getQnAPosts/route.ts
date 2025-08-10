import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getQnAPosts = async () => {
    try {
        const query = `*[_type == "post" && typePost == "Q&A"] {
            _id,
            title,
            _createdAt,
            typePost,
            upvote,
            postImages, 
            pitch,
            isVerified,
            "commentCount": count(*[_type == "comment" && references(^._id)]),
            author->{profile_pic, role, year, major, experience, username, department}
        }`;

        let posts = await client.fetch(query);

        return posts;
    } catch (error) {
        console.error("Error fetching Q&A posts:", error);
        return [];
    }
};

export async function GET(req: Request) {
    try {
        const posts = await getQnAPosts();
        return new Response(JSON.stringify(posts), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in GET request:", error); // Added more specific error logging here
        return new Response(JSON.stringify({ error: "Failed to fetch Q&A posts" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
