import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,  // Replace with your actual project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,         // Change to your dataset (e.g., 'development', 'production')
  useCdn: true,                  // Use Sanity's CDN for fast reads (set to false if you need fresh data)
  apiVersion: '2023-01-01',       // Use the latest API version
});

export default client;