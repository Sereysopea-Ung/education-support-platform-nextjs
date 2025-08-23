import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Fetch user ID using the email
        const userQuery = `*[_type == "user" && email == $email][0] { _id }`;
        const user = await client.fetch(userQuery, { email });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Fetch only the posts of the logged-in user
        const query = `*[_type == "post" && author._ref == $userId] | order(_createdAt desc) {
            _id,
            title,
            pitch,
            postImages,
            upvote,
            downvote,
            typePost,
            _createdAt,
            "commentCount": count(*[_type == "comment" && references(^._id)])
        }`;

        const posts = await client.fetch(query, { userId: user._id });

        return NextResponse.json(posts, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
    }
}
