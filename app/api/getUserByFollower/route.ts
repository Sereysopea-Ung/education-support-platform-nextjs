// app/api/top-users/route.ts

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getTopUsersByFollowers = async () => {
    try {
        const query = `*[_type == "user"] {
            username,
            _id,
            profile_pic,
            year,
            major,
            "followersCount": count(followers)
        } | order(followersCount desc)[0...3]`;

        const users = await client.fetch(query);
        return users;
    } catch (error) {
        console.error("Error fetching top users:", error);
        return [];
    }
};

export async function GET(req: Request) {
    try {
        const users = await getTopUsersByFollowers();
        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch top users" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
