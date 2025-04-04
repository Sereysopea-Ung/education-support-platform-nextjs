'use client'; // This is important for client-side code in Next.js 13+

import { useState, useEffect } from 'react';

interface PostPageProps {
    params: {
        id: string; // Dynamic 'id' from the route params
    };
}

const PostPage = ({ params }: PostPageProps) => {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const { id } = params; // Access the dynamic 'id' from the route params

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/getPostByID?id=${id}`);
                if (!res.ok) {
                    throw new Error('Error fetching the post');
                }
                const data = await res.json();
                setPost(data);
            } catch (err) {
                setError('Error fetching the post');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // Fetch post data whenever the 'id' changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="post-page">
            <h1>{post?.title}</h1>
            <div className="author">
                <p>By: {post?.author?.username || post?.author?.name}</p>
                <img src={post?.author?.profile_pic?.asset?.url} alt={post?.author?.name} width={50} height={50} />
            </div>
            <img src={post?.postImage?.asset?.url} alt={post?.title} />
            <p>{post?.pitch}</p>
            <p>Upvotes: {post?.upvote}</p>
            <p>Downvotes: {post?.downvote}</p>
            {post?.pdfFile && (
                <a href={post.pdfFile.asset.url} download>
                    Download PDF
                </a>
            )}
            {/* Render other post elements here */}
        </div>
    );
};

export default PostPage;
