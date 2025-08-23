import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function PATCH(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'id and status are required' }, { status: 400 });
    }

    const allowed = ['pending', 'reviewed', 'resolved'];
    if (!allowed.includes(status)) {
      return NextResponse.json({ error: 'invalid status' }, { status: 400 });
    }

    // Ensure the document exists and is a report
    const exists = await client.fetch(`*[_type == "report" && _id == $id][0]{ _id }`, { id });
    if (!exists?._id) {
      return NextResponse.json({ error: 'report not found' }, { status: 404 });
    }

    await client.patch(id).set({ status }).commit();

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.error('Update report status error:', err);
    return NextResponse.json({ error: 'failed to update status' }, { status: 500 });
  }
}
