'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardUser, faCircleDown, faCircleUp, faComment } from "@fortawesome/free-solid-svg-icons";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";
import { useSession } from "next-auth/react";
import formatDate from "@/util/date";
import { FaSearch } from "react-icons/fa";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source);
}

export default function QnA() {
    const { data: session } = useSession();
    const [postData, setPostData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Per-post states
    const [voteState, setVoteState] = useState<{ [key: string]: { up: boolean; down: boolean } }>({});
    const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const res = await fetch('/api/getQnAPosts');
                if (!res.ok) throw new Error('Failed to fetch all posts');
                const data = await res.json();
                setPostData(data);
            } catch (err) {
                setError('Error fetching all posts');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPosts();
    }, []);

    const handleVote = (id: string, type: "up" | "down") => {
        setVoteState(prev => {
            const current = prev[id] || { up: false, down: false };
            if (type === "up") {
                return { ...prev, [id]: { up: !current.up, down: false } };
            } else {
                return { ...prev, [id]: { up: false, down: !current.down } };
            }
        });
    };

    const toggleText = (id: string) => {
        setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const [search, setSearch] = useState("");
    const filteredPostData = postData.filter((datum) => {
    const matchesSearch =
        datum.author?.username?.toLowerCase().includes(search.toLowerCase()) ||
        datum.pitch?.toLowerCase().includes(search.toLowerCase()) ||
        datum.author?.major?.toLowerCase().includes(search.toLowerCase()) ||
        datum.author?.department?.toLowerCase().includes(search.toLowerCase()) ||
        datum.author?.year?.toString().includes(search.toLowerCase());
    return matchesSearch;
    });

    if (loading) return <div className="mt-16 px-5 lg:ml-60">Loading Q&A...</div>;

    return (
        <div className="bg-white min-h-screen h-full text-[#111827]">
            <div className="fixed flex p-2 gap-4 top-3 right-70 z-100 rounded-xl bg-white border border-gray-300 item-center justify-between">
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-2 pr-4 text-black focus:outline-none"
            />
            <FaSearch className="text-gray-500 pr-2 text-2xl" />
            </div>
            {session?.user ? (
                <div className="grid grid-cols-12">
                    <div className="lg:col-span-7 lg:col-start-3 col-span-12 md:col-span-8 bg-[#F9FAFB] w-full lg:px-10 md:px-5 lg:mt-16">
                        <div className="flex flex-col w-full h-full lg:pt-5 gap-5">
                            {filteredPostData.map((datum: any) => {
                                const isUpvoted = voteState[datum._id]?.up || false;
                                const isDownvoted = voteState[datum._id]?.down || false;
                                const isExpanded = expandedItems[datum._id] || false;
                                return (
                                    <li key={datum._id} className="flex border-1 border-[#DDE3EF] w-full h-auto min-h-75 rounded-xl px-2 py-2">
                                        <div className="w-full h-full flex-col gap-5">
                                            <div className="flex">
                                                <div className="flex h-12 w-12">
                                                    <div className="border-gray-500 border-1 w-1/10 rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10">
                                                        <img
                                                            src={urlFor(datum?.author.profile_pic).width(50).height(50).fit('crop').url()}
                                                            className="rounded-full"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex w-full h-12">
                                                    <div className="flex-1 h-12 w-5/6">
                                                        <div className="h-1/2 gap-3 flex">
                                                            <div className="h-full flex text-lg break-all whitespace-normal">{datum?.author.username}</div>
                                                            <div className="bg-[#DBEAFE] text-[#2563EB] border-1 h-full flex rounded-lg px-2">
                                                                {datum?.author.role}
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="h-1/2 justify-between flex gap-3 text-[#6B7280] text-center text-md">
                                                            {datum?.author?.year ? (
                                                                <p>Year {datum.author.year} • {datum.author.major}</p>
                                                            ) : (
                                                                <p>{datum?.author?.experience} year • {datum?.author?.department}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="h-full flex rounded-lg px-2 w-1/6 justify-end">
                                                        <div className={`border-1 h-1/2 flex rounded-lg px-2 text-center ${
                                                            datum?.typePost === "Q&A" ? "bg-[#C7FFDE] text-[#27AE60]" :
                                                            datum?.typePost === "Lesson" ? "bg-[#F4D2C5] text-[#E29578]" : ""
                                                        }`}>
                                                            {datum?.typePost}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="h-1/2 w-full pl-10 pr-15 mt-3">

                                                {datum?.postImages?.map((image: any, index: number) => (
                                                    <img key={index} className="mb-[5px]" src={urlFor(image).url()} alt={image?.alt || 'Image'} />
                                                ))}
                                                <div className="text-[#6B7280] w-3/4 text-sm mt-3">{formatDate(datum?._createdAt)}</div>
                                                <div className="w-full">
                                                    <div className={`truncate ${isExpanded ? "whitespace-normal" : ""}`} style={{ width: "100%" }}>
                                                        {datum?.pitch}
                                                    </div>
                                                    <button onClick={() => toggleText(datum._id)} className="text-blue-500 mt-2 text-sm cursor-pointer">
                                                        {isExpanded ? "Show less" : "See more"}
                                                    </button>
                                                </div>
                                                <div className="w-full pl-10 pr-15 mt-3 flex gap-5">
                                                    <div className="flex gap-3">
                                                        <div
                                                            onClick={() => handleVote(datum._id, "up")}
                                                            className={`flex gap-3 items-center cursor-pointer ${isUpvoted ? 'text-blue-500' : 'text-gray-500'}`}
                                                        >
                                                            <FontAwesomeIcon icon={faCircleUp} />
                                                            <span>{datum?.upvote?.length ?? 0}</span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        onClick={() => handleVote(datum._id, "down")}
                                                        className={`flex gap-3 items-center cursor-pointer ${isDownvoted ? 'text-red-500' : 'text-gray-500'}`}
                                                    >
                                                        <FontAwesomeIcon icon={faCircleDown} />
                                                    </div>
                                                    <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                                                        <FontAwesomeIcon icon={faComment} />
                                                        {datum?.commentCount}
                                                    </div>
                                                    <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                                                        •••
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 pt-4 px-5">
                    {filteredPostData.map((datum: any) => {
                        const isUpvoted = voteState[datum._id]?.up || false;
                        const isDownvoted = voteState[datum._id]?.down || false;
                        const isExpanded = expandedItems[datum._id] || false;
                        return (
                            <li key={datum._id} className="flex border-1 border-[#DDE3EF] w-full h-auto min-h-75 rounded-xl px-2 py-2">
                                <div className="w-full h-full flex-col gap-5">
                                    <div className="flex">
                                        <div className="flex h-12 w-12">
                                            <div className="border-gray-500 border-1 w-1/10 rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10">
                                                <img
                                                    src={urlFor(datum?.author.profile_pic).width(50).height(50).fit('crop').url()}
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full h-12">
                                            <div className="flex-1 h-12 w-5/6">
                                                <div className="h-1/2 gap-3 flex text-center">
                                                    <div className="h-full flex break-all whitespace-normal">{datum?.author.username}</div>
                                                    <div className="bg-[#DBEAFE] text-[#2563EB] border-1 h-full flex rounded-lg px-2">
                                                        {datum?.author.role}
                                                    </div>
                                                    <div className="h-full flex">
                                                        <FontAwesomeIcon icon={faChalkboardUser} />
                                                    </div>
                                                </div>
                                                <div className="h-1/2 justify-between flex gap-3 text-[#6B7280] text-center text-md">
                                                    {datum?.author?.year ? (
                                                        <p>Year {datum.author.year} • {datum.author.major}</p>
                                                    ) : (
                                                        <p>{datum?.author?.experience} year • {datum?.author?.department}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="h-full flex rounded-lg px-2 w-1/6 justify-end">
                                                <div className={`border-1 h-1/2 flex rounded-lg px-2 text-center ${
                                                    datum?.typePost === "Q&A" ? "bg-[#C7FFDE] text-[#27AE60]" : "bg-[#F4D2C5] text-[#E29578]"
                                                }`}>
                                                    {datum?.typePost}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-1/2 w-full pl-10 pr-15 mt-3">
                                        {datum?.postImages?.map((image: any, index: number) => (
                                            <img key={index} className="mb-[5px]" src={urlFor(image).url()} alt={image?.alt || 'Image'} />
                                        ))}
                                        <div className="text-[#6B7280] w-3/4 text-sm mt-3">{formatDate(datum?._createdAt)}</div>
                                        <div className="w-full">
                                            <div className={`truncate ${isExpanded ? "whitespace-normal" : ""}`} style={{ width: "100%" }}>
                                                {datum?.pitch}
                                            </div>
                                            <button onClick={() => toggleText(datum._id)} className="text-blue-500 mt-2 text-sm cursor-pointer">
                                                {isExpanded ? "Show less" : "See more"}
                                            </button>
                                        </div>
                                        <div className="w-full pl-10 pr-15 mt-3 flex gap-5">
                                            <div className="flex gap-3">
                                                <div
                                                    onClick={() => handleVote(datum._id, "up")}
                                                    className={`flex gap-3 items-center cursor-pointer ${isUpvoted ? 'text-blue-500' : 'text-gray-500'}`}
                                                >
                                                    <FontAwesomeIcon icon={faCircleUp} />
                                                    <span>{datum?.upvote?.length ?? 0}</span>
                                                </div>
                                            </div>
                                            <div
                                                onClick={() => handleVote(datum._id, "down")}
                                                className={`flex gap-3 items-center cursor-pointer ${isDownvoted ? 'text-red-500' : 'text-gray-500'}`}
                                            >
                                                <FontAwesomeIcon icon={faCircleDown} />
                                            </div>
                                            <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                                                <FontAwesomeIcon icon={faComment} />
                                                {datum?.commentCount}
                                            </div>
                                            <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                                                •••
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
