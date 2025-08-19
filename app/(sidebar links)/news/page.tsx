"use client";

import formatDate from "@/util/date";
import {useEffect, useState} from "react";
import imageUrlBuilder from "@sanity/image-url";
import {createClient} from "@sanity/client";
import {useSession} from "next-auth/react";

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
}); 

const builder = imageUrlBuilder(client);

function urlFor(source:any) {
    return builder.image(source);
}

export default function NewsPage() {
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);
    const [news, setnews] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const toggleText = (id: string) => {
        setExpandedItems(prev => ({
            ...prev,
            [id]: !prev[id] // Toggle only the clicked item's state
        }));
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const res = await fetch('/api/getTopNews');
                if (!res.ok) {
                    throw new Error('Failed to fetch News');
                }
                const data = await res.json();
                setnews(data);
            } catch (err) {
                setError('Error fetching news');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews()
    }, []);

    const { data: session, status } = useSession();

    if (loading) {
        return <div className="lg:mt-16 lg:ml-54 px-5">Loading news...</div>;
    }

    if (error) {
        return <div className="mt-16 px-5 text-red-500">{error}</div>;
    }

    return(
        <div className="lg:mt-16 pt-4 min-h-screen px-5 grid grid-cols-12 bg-white text-[#111827]">
            <div className={session?.user ? "lg:col-span-10 col-span-12 lg:col-start-3 gap-5" : "mt-16 lg:mt-0 col-span-12"}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {news.map((newItem: any) => (
                        <div key={newItem._id} className="flex-col justify-between items-start rounded-xl border shadow-md border-gray-100 w-full mb-4 p-5">
                            <div className="flex w-full gap-2 mb-3">
                                <div id="profile_picture" className="border-gray-500 rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10">
                                    <img src={urlFor(newItem?.author.profile_pic).width(50).height(50).fit('crop').url()} className="rounded-full"/>
                                </div>
                                <div id="username" className="flex text-lg font-bold">
                                    {newItem?.author.username}
                                </div>
                            </div>

                            <div className="flex w-full mt-2 text-start">
                                <div
                                    className={`truncate ${expandedItems[newItem._id] ? "whitespace-normal" : ""}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "block",               // Use block to allow text wrapping
                                        whiteSpace: expandedItems[newItem._id] ? "normal" : "nowrap",  // Allow wrapping when expanded, otherwise truncate
                                        overflow: "hidden",            // Hide any content that overflows
                                        textOverflow: "ellipsis",      // Display ellipsis when content is truncated
                                        lineHeight: "1.5rem",          // Optional: Define line height for better readability
                                    }}
                                >
                                    {newItem?.pitch}
                                </div>
                            </div>

                            <div className="flex text-[#6B7280] text-sm mt-3 gap-2">
                                <div id="date">
                                    {formatDate(newItem?._createdAt)}
                                </div>
                                <div>
                                    {newItem?.read} reads
                                </div>
                            </div>

                            <div className="flex w-full">
                                {/* Button to toggle text visibility */}
                                <button
                                    onClick={() => toggleText(newItem._id)}
                                    className="text-center mt-2 text-md font-bold cursor-pointer w-full text-black rounded-[10px] py-1"
                                >
                                    {expandedItems[newItem._id] ? "See less" : "See more"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}