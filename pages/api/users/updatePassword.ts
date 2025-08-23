import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

const sanityToken = process.env.SANITY_API_TOKEN;

const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: sanityToken,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!sanityToken) {
    return res.status(500).json({ error: 'Missing SANITY_API_TOKEN server secret' });
  }

  try {
    const { id, newPassword } = req.body || {};

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing id' });
    }

    if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // NOTE: For production, hash the password (e.g., bcrypt) before storing.
    await serverClient.patch(id).set({ password: newPassword }).commit();

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('updatePassword error', err);
    return res.status(500).json({ error: 'Failed to update password' });
  }
}
