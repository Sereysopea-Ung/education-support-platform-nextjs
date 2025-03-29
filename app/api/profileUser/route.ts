import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getUserInfo = async (email: string) => {
    try {
        const query = `*[_type == "user" && email == $email][0]{
            username,
            profile_pic,
            year,
            major
        }`;
        const params = { email };

        const user = await client.fetch(query, params);
        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching user data:', error.message);
            throw new Error('Failed to fetch user data');
        } else {
            console.error('Unknown error:', error);
            throw new Error('An unknown error occurred');
        }
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email is required" }),
                { status: 400 }
            );
        }

        const user = await getUserInfo(email);
        if (!user) {
            return new Response(
                JSON.stringify({ error: "User not found" }),
                { status: 404 }
            );
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(
                JSON.stringify({ error: error.message }),
                { status: 500 }
            );
        } else {
            return new Response(
                JSON.stringify({ error: 'An unknown error occurred' }),
                { status: 500 }
            );
        }
    }
}
