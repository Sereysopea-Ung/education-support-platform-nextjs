import { NextRequest } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id || typeof id !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await client.delete(id);

    return new Response(JSON.stringify({ ok: true, id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('Delete API error', e);
    const msg = e?.message || 'Failed to delete content';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
