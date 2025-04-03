import { createClient } from '@sanity/client';
import { NextApiRequest, NextApiResponse } from 'next';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getUserByFollower = async () => {
    try {
        const query = `*[_type == "user"] | order(length(followers) desc)[0...3]{
            username,
            profile_pic,
            year,
            major,
            followers
        }`;

        console.log('Running query:', query); // Log the query being sent to Sanity

        const users = await client.fetch(query);

        // Log the response from Sanity
        console.log('Fetched users:', users);

        if (!users || users.length === 0) {
            throw new Error('No users found');
        }

        return users;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching top users:', error.message);
            throw new Error('Failed to fetch top users: ' + error.message); // Include the original error message
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred during the fetch process');
        }
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const users = await getUserByFollower();
        res.status(200).json(users); // Return the fetched users
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
}
