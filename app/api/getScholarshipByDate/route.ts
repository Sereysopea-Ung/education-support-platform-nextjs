import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const route = async () => {
    try {
        const query = `*[_type == "scholarship"] | order(amountOfMoney desc) {
            _id,
            scholarshipTitle,
            forApplicant,
            amountOfMoney,
            _createdAt
        }`;

        const data = await client.fetch(query);

        if (!data || data.length === 0) {
            console.warn("No scholarships found.");
            return [];
        }

        return data.slice(0, 2); // Only return if data exists
    } catch (error) {
        console.error("Error fetching latest scholarships:", error);
        return [];
    }
};

export async function GET(req: Request) {
    try {
        const jobs = await route();
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch scholarship by date" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
