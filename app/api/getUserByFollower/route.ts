// app/api/getUserByFollower/route.ts

import { createClient } from '@sanity/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false, // False to ensure you're always working with the latest data
    token: process.env.SANITY_API_TOKEN, // Secure your token
});

const getTopUsersByFollowers = async (excludeId?: string) => {
    try {

        // Exclude current user when provided, exclude drafts, and sort by follower count then recency
        const query = `*[
            _type == "user" &&
            (!defined($excludeId) || _id != $excludeId) &&
            !(_id in path('drafts.**'))
        ] | order(coalesce(length(followers), 0) desc, _createdAt desc)[0..9]{
            _id,
            username,
            profile_pic,
            year,
            major,
            followers,
            "followerCount": coalesce(length(followers), 0),
            _createdAt
        }`;

        const users = await client.fetch(query, { excludeId });

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
        // Resolve session and current user's Sanity _id
        const session = await getServerSession(authOptions);
        let excludeId: string | undefined = undefined;
        const email = session?.user?.email as string | undefined;
        if (email) {
            const me = await client.fetch(`*[_type == "user" && email == $email][0]{ _id }`, { email });
            excludeId = me?._id;
        }

        const users = await getTopUsersByFollowers(excludeId);

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
