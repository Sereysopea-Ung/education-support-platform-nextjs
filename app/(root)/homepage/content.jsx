"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
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

export default function Context({ activeTab }) {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || null;

  const [postData, setPostData] = useState([]);
  const [search, setSearch] = useState("");
  const [expandedItems, setExpandedItems] = useState({});
  const [error, setError] = useState(null);

  // Image index per post
  const [imageIndexes, setImageIndexes] = useState({});

  // Fetch posts
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await client.fetch(`
          *[_type == "post"]{
            _id,
            author->{
              username,
              profile_pic,
              role,
              year,
              major,
              experience,
              department
            },
            typePost,
            images,
            files,
            _createdAt,
            pitch, 
            postImages,
            upvote,
            downvote,
            commentCount
          } | order(_createdAt desc)
        `);
        setPostData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching posts");
      }
    }
    fetchData();
  }, []);

  // Filter search
  const filteredPostData = postData.filter(
    (post) =>
      post.author?.username?.toLowerCase().includes(search.toLowerCase()) ||
      post.pitch?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.major?.toLowerCase().includes(search.toLowerCase())
  );

  // final filtered posts = search + tab filter
  const finalFilteredPosts = filteredPostData.filter((item) => {
    if (activeTab === "Q&A") return item.typePost === "Q&A";
    if (activeTab === "Lesson") return item.typePost === "Lesson";
    return true; // NewsFeed = all
  });

  // Toggle pitch text expand
  const toggleText = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Format date
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString();

  // Handle voting (from 1)
  const handleVote = async (postId, action) => {
    if (!userEmail) {
      alert("Please log in to vote.");
      return;
    }
    console.log("handleVote:", { postId, userEmail, action });

    try {
      const res = await fetch("/api/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, userEmail, action }),
      });

      if (!res.ok) throw new Error("Vote failed");

      const updatedPost = await res.json();
      setPostData((prev) =>
        prev.map((p) =>
          p._id === postId
            ? { ...p, upvote: updatedPost.upvote, downvote: updatedPost.downvote }
            : p
        ) 
      );
    } catch (err) {
      console.error("Voting error:", err);
    }
  };

  return (
    <div className="ml-8 mt-5">
      {/* Search bar */}
      <div className="w-full p-4 flex gap-4 mb-4 fixed top-4 left-270 z-100 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="absolute pl-2 pr-4 py-2 rounded-lg bg-white border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Posts */}
      {finalFilteredPosts.map((datum) => {
        const isUpvoted = datum.upvote?.includes(userEmail);
        const isDownvoted = datum.downvote?.includes(userEmail);

        const allImages = [
          ...(datum?.postImages?.map((img) => urlFor(img).url()) || []),
          ...(datum?.images || []),
        ];

        const currentIndex = imageIndexes[datum._id] || 0;
        const showImage =
          allImages.length > 0 ? allImages[currentIndex % allImages.length] : null;

        const handlePrev = () => {
          setImageIndexes((prev) => ({
            ...prev,
            [datum._id]:
              currentIndex === 0 ? allImages.length - 1 : currentIndex - 1,
          }));
        };

        const handleNext = () => {
          setImageIndexes((prev) => ({
            ...prev,
            [datum._id]: (currentIndex + 1) % allImages.length,
          }));
        };

        return (
          <li
            key={datum._id}
            className="flex border-1 border-[#DDE3EF] bg-white w-full h-auto rounded-xl px-2 py-2 mb-5"
          >
            <div className="w-full h-full flex-col gap-5">
              {/* Author info */}
              <div className="flex">
                <div className="flex h-12 w-12 ">
                  <div className="border-gray-500 border-1 w-1/10 rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10">
                    <img
                      src={urlFor(datum?.author.profile_pic)
                        .width(50)
                        .height(50)
                        .fit("crop")
                        .url()}
                      className="rounded-full"
                    />
                  </div>
                </div>
                <div className="flex w-full h-12">
                  <div className="flex-1 h-12 w-5/6">
                    <div className="h-1/2 gap-3 flex">
                      <div className="h-full flex text-lg">
                        {datum?.author.username}
                      </div>
                      <div
                        className={`border-1 h-full flex rounded-lg px-2 ${
                          datum?.author.role === "teacher"
                            ? "bg-[#8E44AD] text-white"
                            : datum?.author.role === "student"
                            ? "bg-[#D1E8FF] text-[#1D4ED8]"
                            : ""
                        }`}
                      >
                        {datum?.author.role}
                      </div>
                    </div>
                    <div className="h-1/2 justify-between flex gap-3 text-[#6B7280] text-center text-md">
                      {datum?.author?.year ? (
                        <p>
                          Year {datum.author.year} • {datum.author.major}
                        </p>
                      ) : (
                        <p>
                          {datum?.author?.experience} year •{" "}
                          {datum?.author?.department}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="h-full flex rounded-lg px-2 w-1/6 justify-end">
                    <div
                      className={`border-1 h-1/2 flex rounded-lg px-2 text-center ${
                        datum?.typePost === "Q&A"
                          ? "bg-[#C7FFDE] text-[#27AE60]"
                          : datum?.typePost === "Lesson"
                          ? "bg-[#F4D2C5] text-[#E29578]"
                          : datum?.typePost === "Announcement"
                          ? "bg-[#ff9cfc] text-[#ed11c1]"
                          : ""
                      }`}
                    >
                      {datum?.typePost}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post content */}
              <div className="h-1/2 w-full pl-10 pr-15 mt-3">
                
                  <div id="post" className="relative flex items-center justify-center">
                    {showImage && (
                      <div className="relative w-full flex items-center justify-center">
                        <Link href={`/post/${datum._id}`}>
                        <div className="w-full h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                          <img
                          key={`img-${currentIndex}`}
                          src={showImage}
                          alt="Post image"
                          className="h-full w-auto object-contain"
                        />
                        </div>
                        
                        </Link>

                        {/* Left button */}
                        <button
                          onClick={handlePrev}
                          className="absolute top-1/2 left-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        {/* Right button */}
                        <button
                          onClick={handleNext}
                          className="absolute top-1/2 right-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    )}
                  </div>
               

                {/* Cloudinary files */}
                {Array.isArray(datum?.files) && datum.files.length > 0 && (
                  <div className="mt-2 flex flex-col gap-2 w-full max-w-2xl mx-auto">
                    {datum.files.map((file, idx) => {
                      // Normalize file URL
                      const href = typeof file === "string" ? file : file?.url || file?.secure_url || "";

                      if (!href) return null;

                      // Extract a readable filename
                      const fileName = href.split("/").pop()?.split("?")[0] || `File ${idx + 1}`;

                      return (
                        <a
                          key={idx}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline break-all"
                          download
                        >
                          {fileName}
                        </a>
                      );
                    })}
                  </div>
                )}



                <div className="text-[#6B7280] w-3/4 text-sm mt-3">
                  {formatDate(datum?._createdAt)}
                </div>
                <div className="w-full">
                  <div
                    className={`truncate ${
                      expandedItems[datum._id] ? "whitespace-normal" : ""
                    }`}
                    style={{ width: "100%" }}
                  >
                    {datum?.pitch}
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => toggleText(datum._id)}
                  className="text-blue-500 mt-2 text-sm cursor-pointer w-1/5"
                >
                  {expandedItems[datum._id] ? "Show less" : "See more"}
                </button>
              </div>

              {/* Action buttons */}
              <div className="w-full pr-15 mt-3 flex gap-5 ml-10"> 
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
                <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                  •••
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </div>
  );
}
