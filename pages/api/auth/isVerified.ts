import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const isVerified = async (email: string): Promise<boolean> => {
    try {
        const user = await client.fetch(`*[_type == "user" && email == $email][0]{_id, isVerified}`, { email });

        // Check if user exists and if they are verified
        if (user && user.isVerified) {
            return true;
        }

        console.error("Email is not verified yet!");
        return false;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return false;
    }
};
export default isVerified;