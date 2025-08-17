'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Image builder
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

// Date formatter
const formatDate = (dateString) => {
  if (!dateString) return "No date";
  const normalized = dateString.includes("T")
    ? dateString
    : dateString.replace(" ", "T");
  const parsed = new Date(normalized);
  if (isNaN(parsed.getTime())) return "Invalid date";
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const PostPage = ({ params }) => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || null;

  const [datum, setDatum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [imageIndex, setImageIndex] = useState(0);

  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/getPostByID?id=${id}`);
        if (!res.ok) throw new Error('Error fetching the post');
        const data = await res.json();
        setDatum(data);
      } catch (err) {
        setError('Error fetching the post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  // Voting handler
  const handleVote = async (postId, action) => {
    if (!userEmail) {
      alert("Please log in to vote.");
      return;
    }
    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userEmail, action }),
      });

      if (!res.ok) throw new Error("Vote failed");

      const updatedPost = await res.json();
      setDatum((prev) =>
        prev && prev._id === postId
          ? { ...prev, upvote: updatedPost.upvote, downvote: updatedPost.downvote }
          : prev
      );
    } catch (err) {
      console.error("Voting error:", err);
    }
  };

  const toggleText = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (loading) return <div>Loading...</div>;
  if (error || !datum) return <div>{error || "Post not found"}</div>;

  // Combine Sanity + Cloudinary images
  const allImages = [
    ...(datum?.postImages?.map((img) => urlFor(img).url()) || []),
    ...(datum?.images || []),
  ];
  const showImage = allImages[imageIndex % (allImages.length || 1)];

  const isUpvoted = datum.upvote?.includes(userEmail);
  const isDownvoted = datum.downvote?.includes(userEmail);

  return (
    <div className="post-page w-screen">
      <div className="grid grid-cols-12 bg-white text-black w-full">
        <div className="col-span-12 flex justify-end items-center gap-2 p-4 shadow-md">
          <Link href="/home" className="text-blue-500 flex items-center gap-2">
            ←Back
            <img src="/favicon.ico" alt="Logo" className="max-w-10 max-h-10" />
          </Link>
        </div>
        
        {/* Left: Images + files (col-span-7) */}
        <div className="col-span-7 mt-10">
          <div id="post" className="">
            {allImages.length > 0 && (
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Image */}
                <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={showImage}
                    alt="Post image"
                    className="h-full w-auto object-contain"
                  />
                </div>

                {/* Controls */}
                <button
                  onClick={() =>
                    setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
                  }
                  className="absolute top-1/2 left-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setImageIndex((prev) => (prev + 1) % allImages.length)}
                  className="absolute top-1/2 right-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}

            {/* Files */}
            {datum?.files?.length > 0 && (
              <div className="mt-2 flex flex-col gap-2 w-full max-w-2xl mx-auto">
                <h3 className="text-lg font-semibold">Files:</h3>
                {datum.files.map((fileUrl, idx) => {
                  const fileName = typeof fileUrl === "string"
                    ? fileUrl.split("/").pop()
                    : `File ${idx + 1}`;
                  return (
                    <a
                      key={idx}
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                      download
                    >
                      {fileName || `File ${idx + 1}`}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Date */}
            <div className="text-[#6B7280] w-full max-w-2xl mx-auto text-sm mt-2 flex items-center gap-5 justify-end p-2">
              <div clasName="">
                {formatDate(datum?.createdAt || datum?._createdAt)}
              </div>
              {/* Voting + actions */}
              <div className="pr-15 flex gap-5">
                <div
                  onClick={() => handleVote(datum._id, "upvote")}
                  className={`flex gap-3 items-center cursor-pointer ${
                    isUpvoted ? "text-blue-500" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faCircleUp} />
                  <span>{datum.upvote?.length ?? 0}</span>
                </div>
                <div
                  onClick={() => handleVote(datum._id, "downvote")}
                  className={`flex gap-3 items-center cursor-pointer ${
                    isDownvoted ? "text-red-500" : "text-gray-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faCircleDown} />
                  <span>{datum.downvote?.length ?? 0}</span>
                </div>
                <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                  <FontAwesomeIcon icon={faComment} />
                  {datum?.commentCount}
                </div>
                
              </div>
            </div>

          </div>
        </div>

        {/* Right: Author + pitch + actions (col-span-5) */}
        <div className="col-span-4 mt-10 col-start-8 shadow-md p-4 rounded-lg">
          {/* Author info */}
          <div className="author flex gap-3 items-center">
            
            {datum?.author?.profile_pic && (
              <Image
                src={urlFor(datum.author.profile_pic).width(50).height(50).url()}
                alt={datum?.author?.username || 'Author'}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col w-full">
              <p>{datum?.author?.username || datum?.author?.name}</p>
              <div chassName="flex">
                Year {datum.author.year} • {datum.author.major}
              </div>
            </div>
            <div className="text-gray-500 flex gap-3 items-center cursor-pointer">•••</div>
            
          </div>

          {/* Pitch with expand */}
          <div className="mt-3 flex-col gap-2 w-full border-gray-400 border-1 flex rounded-2xl p-2 py-2">
            <div
              className={`truncate ${expandedItems[datum._id] ? "whitespace-normal" : ""} `}
            >
              {datum?.pitch}
            <button
              onClick={() => toggleText(datum._id)}
              className="text-blue-500 mt-2 text-sm cursor-pointer flex"
            >
              {expandedItems[datum._id] ? "Show less" : "See more"}
            </button>
            </div>
          </div>

          <div className="author flex gap-3 items-center mt-5">            
            {datum?.author?.profile_pic && (
              <Image
                src={urlFor(datum.author.profile_pic).width(50).height(50).url()}
                alt={datum?.author?.username || 'Author'}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col w-full">
              <p>{datum?.author?.username || datum?.author?.name}</p>
            </div>
          </div>

          <div className="opacity-50 mt-3 font-light text-md bg-transparent outline-none w-full border-1 border-gray-500 p-3 rounded-lg">
            <div>
              Add a comment...
            </div>
            
          </div>
              
        </div>
      </div>

    </div>
  );
};

export default PostPage;
