import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    token: process.env.SANITY_API_TOKEN
});

export const getUserByEmail = async (email: string) => {
    try {
        const query = `*[_type == "user" && email == $email][0]`;
        const user = await client.fetch(query, { email });

        return user || null; // Return null instead of throwing an error
    } catch (error) {
        console.error('Error fetching user:', error);
        return null; // Return null on error
    }
};
