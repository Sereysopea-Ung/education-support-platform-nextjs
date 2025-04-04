import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
    try {
        const { postId, userEmail, action } = await req.json();

        if (!postId || !userEmail || !action) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const post = await client.fetch(`*[_id == $postId][0]`, { postId });

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        let updatedUpvotes = post.upvote || [];
        let updatedDownvotes = post.downvote || [];

        if (action === 'upvote') {
            if (updatedUpvotes.includes(userEmail)) {
                updatedUpvotes = updatedUpvotes.filter((email:string) => email !== userEmail);
            } else {
                updatedUpvotes.push(userEmail); // Add upvote
                updatedDownvotes = updatedDownvotes.filter((email:string) => email !== userEmail);
            }
        } else if (action === 'downvote') {
            if (updatedDownvotes.includes(userEmail)) {
                updatedDownvotes = updatedDownvotes.filter((email:string) => email !== userEmail);
            } else {
                updatedDownvotes.push(userEmail); // Add downvote
                updatedUpvotes = updatedUpvotes.filter((email:string) => email !== userEmail);
            }
        }

        await client.patch(postId)
            .set({ upvote: updatedUpvotes, downvote: updatedDownvotes })
            .commit();

        return NextResponse.json({ success: true, upvote: updatedUpvotes, downvote: updatedDownvotes });

    } catch (error) {
        console.error("Error updating votes:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
