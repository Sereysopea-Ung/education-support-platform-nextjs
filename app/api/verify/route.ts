// app/api/verify/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const fetchDocumentByEmail = async (email:string) => {
    const query = `*[_type == "user" && email == $email][0]{_id}`;
    const params = { email };

    const document = await client.fetch(query, params);
    return document?._id;
};

const patchVerifyToTrueByEmail = async (email:string) => {
    try {
        const documentId = await fetchDocumentByEmail(email);

        if (!documentId) {
            console.log('Document not found');
            return;
        }

        const updatedDoc = await client
            .patch(documentId)
            .set({ isVerified: true })
            .commit();

        console.log('Updated document:', updatedDoc);
    } catch (error) {
        console.error('Error updating document:', error);
    }
};

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const token = url.searchParams.get('token');
        const emailParam = url.searchParams.get('email');
        const email = emailParam ? decodeURIComponent(emailParam) : '';

        if (!token || !email) {
            return NextResponse.json({ message: 'Missing token or email' }, { status: 400 });
        }

        const query = `*[_type == "user" && email == $email][0]{verificationToken}`;
        const user = await client.fetch(query, { email });

        if (user?.verificationToken === token) {
            await patchVerifyToTrueByEmail(email);
            return NextResponse.json({ message: 'Token verified successfully' });
        } else {
            return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
        }
    } catch (error) {
        console.error("Error verifying token:", error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
