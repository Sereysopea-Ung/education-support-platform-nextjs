import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

// Function to fetch the scholarships
const route = async () => {
    try {
        const query = `*[_type == "scholarship"] | order(_createdAt desc){
            _id,
            scholarshipTitle,
            forApplicant,
            amountOfMoney,
            _createdAt,
            typeofcoverage
        }`;

        const data = await client.fetch(query);

        if (!data || data.length === 0) {
            console.warn("No scholarships found.");
            return [];
        }

        return data; // Only return if data exists
    } catch (error) {
        console.error("Error fetching latest scholarships:", error);
        return [];
    }
};

// Export GET function for your API endpoint
export async function GET(_req: Request) {
    try {
        const scholarships = await route();
        return new Response(JSON.stringify(scholarships), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Error in GET request:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch scholarships" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
