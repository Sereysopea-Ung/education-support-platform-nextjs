import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { targetId, targetType, userEmail, reason, description } = await req.json();
    if (!targetId || !targetType || !userEmail || !reason) {
      return NextResponse.json({ error: 'targetId, targetType, userEmail and reason are required' }, { status: 400 });
    }
    if (targetType !== 'post' && targetType !== 'comment') {
      return NextResponse.json({ error: 'targetType must be post or comment' }, { status: 400 });
    }

    const user = await client.fetch(`*[_type == "user" && email == $email][0]{ _id }`, { email: userEmail });
    if (!user?._id) {
      return NextResponse.json({ error: 'User not found for provided email' }, { status: 404 });
    }

    // Optional: verify target exists
    const target = await client.fetch(`*[_type == $t && _id == $id][0]{ _id }`, { t: targetType, id: targetId });
    if (!target?._id) {
      return NextResponse.json({ error: 'Target not found' }, { status: 404 });
    }

    const doc = {
      _type: 'report',
      reason,
      description: description || '',
      target: { _type: 'reference', _ref: targetId },
      author: { _type: 'reference', _ref: user._id },
      createdAt: new Date().toISOString(),
      status: 'pending',
    } as any;

    const created = await client.create(doc);

    return NextResponse.json({ _id: created._id }, { status: 201 });
  } catch (err: any) {
    console.error('Create report error:', err);
    return NextResponse.json({ error: 'Failed to submit report' }, { status: 500 });
  }
}
