"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { useParams } from "next/navigation";
import Link from "next/link";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
});

interface PostData {
    title?: string;
    author?: { name?: string };
    slug?: { current?: string };
    _id?: string;
}

const Post = () => {
    const params = useParams();
    console.log("Params:", params); // Debugging log
    const id = params?.id || null;
    console.log("ID:", id); // Debugging log
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            console.warn("No ID provided in params.");
            setLoading(false);
            setError("No ID provided.");
            return;
        }

        const query = `*[_type == "post" && _id == $id][0] {
            title,
            author->{name},
            slug,
            _id
        }`;

        client
            .fetch<PostData>(query, { id })
            .then((data) => {
                console.log("Fetched data:", data); // Debugging log
                setPost(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching post:", err);
                setError("Failed to load post data.");
                setLoading(false);
            });
    }, [id]);

    const sanitizeSlug = (slug: string | undefined): string => {
        if (!slug) return "";
        return slug.replace(/[^a-zA-Z0-9-]/g, "-").toLowerCase();
    };

    console.log("Rendering Post component"); // Debugging log

    return (
        <div className="min-h-[250px] flex-1 border-2 border-gray-300 bg-white rounded-lg p-4 text-left">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : post ? (
                <div>
                    <h2 className="font-bold text-lg">{post.title || "Untitled Post"}</h2>
                    <p className="text-gray-600 text-sm">By: {post.author?.name || "Unknown"}</p>
                    {post.slug?.current && (
                        <Link href={`/posts/${sanitizeSlug(post.slug.current)}`}>
                            <span className="text-blue-500 underline">Read more</span>
                        </Link>
                    )}
                    <p>Post ID: {post._id}</p>
                </div>
            ) : (
                <p>No post found</p>
            )}
        </div>
    );
};

export default Post;