// pages/api/search.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;
  if (!query || typeof query !== "string") {
    return res.status(400).json({ error: "Missing query" });
  }

  const groq = `
    [
      *[_type == "user" && name match $term]{ _id, name, _type },
      *[_type == "post" && (title match $term || pitch match $term)]{ _id, title, pitch, _type },
      *[_type == "scholarship" && scholarshipTitle match $term]{ _id, scholarshipTitle, _type },
      *[_type == "news" && (newsTitle match $term || pitch match $term)]{ _id, newsTitle, pitch, _type },
      *[_type == "job" && jobTitle match $term]{ _id, jobTitle, _type }
    ]
  `;

  const params = { term: `*${query}*` };

  try {
    const results = await client.fetch(groq, params);
    res.status(200).json(results.flat());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Search failed" });
  }
}
