import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: "2023-08-01", // Add API version to avoid deprecation warning
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        console.log("Received body:", body);

        // Fetch author reference by email 
        const authorQuery = `*[_type == "user" && email == $email][0]{_id}`;
        const author = await client.fetch(authorQuery, { email: body.authorEmail });

        const postDoc = {
            _type: "post",
            pitch: body.postText,
            major: body.major,
            subject: body.subject,
            typePost: body.typePost,
            authorEmail: body.authorEmail,
            images: body.images,
            files: body.files,
            createdAt: new Date().toISOString(),
            author: author?._id
                ? { _type: "reference", _ref: author._id }
                : undefined,
        };

        const result = await client.create(postDoc);

        return NextResponse.json({ success: true, postId: result._id }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }
}
