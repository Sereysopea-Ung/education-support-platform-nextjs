import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;
const token = process.env.SANITY_API_TOKEN as string;

const sanity = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-05-01',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { filename, contentType, dataBase64 } = req.body || {};
    if (!dataBase64 || !filename) {
      return res.status(400).json({ error: 'Missing image data' });
    }
    if (!token) {
      return res.status(500).json({ error: 'Server is not configured with SANITY_API_TOKEN' });
    }

    const buffer = Buffer.from(String(dataBase64), 'base64');

    const asset = await sanity.assets.upload('image', buffer, {
      filename,
      contentType: contentType || 'image/*',
    });

    // Prefer asset.url when available; otherwise return id so client can build URL
    const result = {
      id: (asset as any)?._id || null,
      url: (asset as any)?.url || null,
    };

    return res.status(200).json(result);
  } catch (err: any) {
    console.error('uploadCommentImage error', err);
    return res.status(500).send(err?.message || 'Upload failed');
  }
}
