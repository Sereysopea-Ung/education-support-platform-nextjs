import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const route = async () => {
    try {
        const query = `*[_type == "job"] | order(numberOfApplication desc) { 
        _id,
        jobTitle,
        companyName,
        numberOfApplication
        }`;

        const data = await client.fetch(query);

        // Return the first two jobs from the sorted data
        const result = [data[0], data[1]];

        return result;
    } catch (_error) {
        console.error("Error fetching latest jobs:", _error);
        return []; // Return an empty array or handle as needed
    }
};

export async function GET(_req: Request) {
    try {
        const jobs = await route();
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch most applied jobs" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
