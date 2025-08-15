'use client';

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDown, faCircleUp, faComment } from "@fortawesome/free-solid-svg-icons";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";
import { useSession } from "next-auth/react";
import formatDate from "@/util/date";
import { FaSearch } from "react-icons/fa";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function Lessons() {
  const { data: session } = useSession();
  const [postData, setPostData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Unified state like QnA
  const [voteState, setVoteState] = useState<{ [key: string]: { up: boolean; down: boolean } }>({});
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const res = await fetch('/api/getLessonPosts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPostData(data);
      } catch (err) {
        setError('Error fetching posts');
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

  if (loading) return <div className="mt-16 px-5 lg:ml-60">Loading Lessons...</div>;

  const filteredPostData = postData.filter((datum) => {
  const matchesSearch =
      datum.author?.username?.toLowerCase().includes(search.toLowerCase()) ||
      datum.pitch?.toLowerCase().includes(search.toLowerCase()) ||
      datum.author?.major?.toLowerCase().includes(search.toLowerCase()) ||
      datum.author?.department?.toLowerCase().includes(search.toLowerCase()) ||
      datum.author?.year?.toString().includes(search.toLowerCase());
  return matchesSearch;
  });

  const renderPost = (datum: any) => {
    const isUpvoted = voteState[datum._id]?.up || false;
    const isDownvoted = voteState[datum._id]?.down || false;
    const isExpanded = expandedItems[datum._id] || false;

    return (
      <li key={datum._id} className="flex border border-[#DDE3EF] w-full rounded-xl px-2 py-2">
        <div className="w-full flex-col gap-5">
          {/* Author Section */}
          <div className="flex">
            <div className="flex h-12 w-12">
              <img
                src={urlFor(datum?.author.profile_pic).width(50).height(50).fit('crop').url()}
                className="rounded-full"
                alt="profile"
              />
            </div> 
            <div className="flex w-full h-12 pl-2">
              <div className="flex-1 h-12">
                <div className="h-1/2 gap-3 flex text-lg">
                  <div>{datum?.author.username}</div>
                  <div className="bg-[#DBEAFE] text-[#2563EB] border h-full flex rounded-lg px-2">
                    {datum?.author.role}
                  </div>
                  
                </div>
                <div className="h-1/2 flex gap-3 text-[#6B7280] text-md">
                  {datum?.author?.year
                    ? <p>Year {datum.author.year} • {datum.author.major}</p>
                    : <p>{datum?.author?.experience} year • {datum?.author?.department}</p>
                  }
                </div>
              </div>
              <div className="flex items-center">
                <div className={`border h-1/2 flex rounded-lg px-2 text-center ${
                  datum?.typePost === "Lesson" ? "bg-[#F4D2C5] text-[#E29578]" :
                  datum?.typePost === "Q&A" ? "bg-[#C7FFDE] text-[#27AE60]" : ""
                }`}>
                  {datum?.typePost}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full pl-10 pr-15 mt-3">
            {datum?.postImages?.map((image: any, index: number) => (
              <img key={index} src={urlFor(image).url()} alt={image?.alt || 'Image'} className="w-full max-h-[400px] object-cover rounded" />
            ))}
            <div className="text-[#6B7280] w-3/4 text-sm mt-3">{formatDate(datum?._createdAt)}</div>
            <div className="w-full">
              <div className={`${isExpanded ? "" : "truncate"}`} style={{ width: "100%" }}>
                {datum?.pitch}
              </div>
              <button onClick={() => toggleText(datum._id)} className="text-blue-500 mt-2 text-sm cursor-pointer">
                {isExpanded ? "Show less" : "See more"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="w-full mt-3 flex gap-5">
              <div
                className={`flex gap-3 items-center cursor-pointer ${isUpvoted ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => handleVote(datum._id, "up")}
              >
                <FontAwesomeIcon icon={faCircleUp} />
                <span>{datum?.upvote?.length ?? 0}</span>
              </div>
              <div
                className={`flex gap-3 items-center cursor-pointer ${isDownvoted ? 'text-red-500' : 'text-gray-500'}`}
                onClick={() => handleVote(datum._id, "down")}
              >
                <FontAwesomeIcon icon={faCircleDown} />
              </div>
              <div className="text-gray-500 flex gap-3 items-center cursor-pointer">
                <FontAwesomeIcon icon={faComment} />
                {datum?.commentCount}
              </div>
              <div className="text-gray-500 flex gap-3 items-center cursor-pointer">•••</div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <div className="w-full h-full bg-white min-h-screen px-5 lg:px-0 text-[#111827]">
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
      {error && <div className="text-red-500">{error}</div>}
      {session?.user ? (
        <div className="grid grid-cols-12">
          <div className="lg:col-span-7 lg:col-start-3 col-span-12 bg-[#F9FAFB] w-full lg:px-10 md:px-5 lg:mt-20">
            <div className="flex flex-col w-full gap-5">
              {filteredPostData.map(renderPost)}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 px-5">
          {filteredPostData.map(renderPost)}
        </div>
      )}
    </div>
  );
}
