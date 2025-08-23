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
    const body = await req.json();
    const { id, type, patch } = body || {};
    if (!id || typeof id !== 'string') {
      return new Response(JSON.stringify({ error: 'Invalid id' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Safety: allow only known fields per type
    const allowedPostFields = new Set(['title', 'pitch', 'text', 'images', 'files']);
    const allowedCommentFields = new Set(['text']);

    const filteredPatch: Record<string, any> = {};
    if (type === 'post') {
      Object.keys(patch || {}).forEach((k) => {
        if (allowedPostFields.has(k)) filteredPatch[k] = patch[k];
      });
    } else if (type === 'comment') {
      Object.keys(patch || {}).forEach((k) => {
        if (allowedCommentFields.has(k)) filteredPatch[k] = patch[k];
      });
    } else {
      return new Response(JSON.stringify({ error: 'Unsupported type' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const result = await client.patch(id).set(filteredPatch).commit();

    return new Response(JSON.stringify({ ok: true, result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    console.error('Update API error', e);
    const msg = e?.message || 'Failed to update content';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
