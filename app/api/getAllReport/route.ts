import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const getAllReport = await client.fetch(`
  *[_type == "report"] | order(_createdAt desc){
    _id,
    reporttype,
    author->{
      username,
      email
    },
    _createdAt
  } 
`);

export async function GET(_req: Request) {
    try {
        const jobs = await getAllReport();
        return new Response(JSON.stringify(jobs), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: "Failed to fetch jobs" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}