import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const { postId, userEmail, action } = await req.json();
    console.log("Vote API request:", { postId, userEmail, action });

    if (!postId || !userEmail || !action) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Query for either published or draft post
    const post = await client.fetch(
      `*[_id == $postId || _id == "drafts." + $postId][0]`,
      { postId }
    );
    console.log("Fetched post:", post?._id);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    let updatedUpvotes = post.upvote || [];
    let updatedDownvotes = post.downvote || [];

    if (action === "upvote") {
      if (updatedUpvotes.includes(userEmail)) {
        updatedUpvotes = updatedUpvotes.filter((email: string) => email !== userEmail);
      } else {
        updatedUpvotes.push(userEmail);
        updatedDownvotes = updatedDownvotes.filter((email: string) => email !== userEmail);
      }
    } else if (action === "downvote") {
      if (updatedDownvotes.includes(userEmail)) {
        updatedDownvotes = updatedDownvotes.filter((email: string) => email !== userEmail);
      } else {
        updatedDownvotes.push(userEmail);
        updatedUpvotes = updatedUpvotes.filter((email: string) => email !== userEmail);
      }
    }

    const updatedPost = await client
      .patch(post._id) // Use exact ID (handles draft case)
      .set({ upvote: updatedUpvotes, downvote: updatedDownvotes })
      .commit();

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Error updating votes:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
