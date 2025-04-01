'use client';

import {useEffect, useState} from "react";

export default function QnA(){

    const [posts, setPosts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/getQnAPosts');
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError('Error fetching posts');
                console.error(err);
            }
        };
    }, []);

    return (
        <div>

        </div>
    )
}