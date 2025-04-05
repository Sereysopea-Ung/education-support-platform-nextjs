// app/api/top-users/route.ts

import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false, // False to ensure you're always working with the latest data
    token: process.env.SANITY_API_TOKEN, // Secure your token
});

const getTopUsersByFollowers = async () => {
    try {

        // Fetch user documents, sorting by the number of followers (length of the array)
        const query = `*[_type == "user"] | order(_createdAt asc)[0..2]{
            username, 
            profile_pic, 
            year, 
            major,
            followers,
            _createdAt
        }`;

        const users = await client.fetch(query);

        // Check if users are returned as expected
        if (!users || users.length === 0) {
            console.warn("No users found.");
        }

        return users || [];
    } catch (error) {
        console.error("Error fetching users:", error);

        return [];
    }
};

export async function GET(req: Request) {
    try {

        const users = await getUserByFollower();

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in GET request:", error);

        return new Response(JSON.stringify({ error: "Failed to fetch users" }), {

            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
