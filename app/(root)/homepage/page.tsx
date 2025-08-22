"use client";

import { useState , useEffect, useRef } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import imageUrlBuilder from '@sanity/image-url'; 
import { createClient } from '@sanity/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp, faCircleDown, faComment } from "@fortawesome/free-solid-svg-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CreatePostForm from "../../../components/CreatePostForm";
import { useHomepageFilters } from '@/components/homepageFilters';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleClickedMyNetwork = () => {
    router.push('/mynetwork');
  };

  const [activeMenu, setActiveMenu] = useState("Homepage");
  
  const [activeTab, setActiveTab] = useState("NewsFeed");

  useEffect(() => {
    if (activeTab === "Network") {
      router.push("/mynetwork");
    }
  }, [activeTab, router]);

  const [profilePic, setProfilePic] = useState<string | null>(null);

  const { data: session} = useSession();
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  // Create Post modal state
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      client
        .fetch(`*[_type == "user" && email == $email][0]{ _id, profile_pic, major, enroll_year, username, firstName, lastName }`, {
          email: session.user.email,
        })
        .then((user) => {
          if (user?.profile_pic) {
            setProfilePic(urlFor(user.profile_pic).width(50).height(50).url());
          }
          if (user?.major) setMajor(user.major);
          if (user?.enroll_year) setYear(user.enroll_year);
          if (user?.username) setUsername(user.username);
          if (user?._id) setUserId(user._id);
        });
    }
  }, [session]);

  // Sync tab from query param (?tab=qa)
  useEffect(() => {
    const t = searchParams?.get('tab');
    if (t === 'qa') setActiveTab('Q&A');
    else if (t === 'lesson') setActiveTab('Lesson');
    else setActiveTab('NewsFeed');
  }, [searchParams]);

  // Local components
  function FeedContent() {
    const { data: session } = useSession();
    const userEmail = session?.user?.email || null;
    const [postData, setPostData] = useState<any[]>([]);
    const { search, activeTab } = useHomepageFilters();
    const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
    const [imageIndexes, setImageIndexes] = useState<Record<string, number>>({});
    const [canExpand, setCanExpand] = useState<Record<string, boolean>>({});
    const contentRefs = useRef<Record<string, HTMLParagraphElement | null>>({});

    if(!session){
      router.push('/');
      return;
    }
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
        }
      }
      fetchData();
    }, []);

    const filteredPostData = postData.filter((post: any) =>
      post.author?.username?.toLowerCase().includes(search.toLowerCase()) ||
      post.pitch?.toLowerCase().includes(search.toLowerCase()) ||
      post.author?.major?.toLowerCase().includes(search.toLowerCase())
    );

    const finalFilteredPosts = filteredPostData.filter((item: any) => {
      if (activeTab === "Q&A") return item.typePost === "Q&A";
      if (activeTab === "Lesson") return item.typePost === "Lesson";
      if (activeTab === "Announcement") return item.typePost === "Announcement";
      // "All"
      return true;
    });

    const toggleText = (id: string) => {
      setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

    const handleVote = async (postId: string, action: "upvote" | "downvote") => {
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
        setPostData((prev) =>
          prev.map((p) =>
            p._id === postId ? { ...p, upvote: updatedPost.upvote, downvote: updatedPost.downvote } : p
          )
        );
      } catch (err) {
        console.error("Voting error:", err);
      }
    };

    return (
      <div className="ml-8 mt-5">

        {finalFilteredPosts.map((datum: any) => {
          const isUpvoted = datum.upvote?.includes(userEmail);
          const isDownvoted = datum.downvote?.includes(userEmail);
          const allImages = [
            ...(datum?.postImages?.map((img: any) => urlFor(img).url()) || []),
            ...(datum?.images || []),
          ];

          return (
            <li key={datum._id} className="flex border-1 border-[#DDE3EF] bg-white w-full h-auto rounded-xl px-2 py-2 mb-5 text-gray-900">
              <div className="w-full h-full flex-col gap-5">
                {/* Author */}
                <div className="flex">
                  <div className="flex h-12 w-12 ">
                    <div className="border-gray-500 border-1 w-1/10 rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10">
                      <img
                        src={datum?.author?.profile_pic ? urlFor(datum.author.profile_pic).width(50).height(50).fit("crop").url() : "/Default_pfp.jpg"}
                        className="rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex w-full h-12">
                    <div className="flex-1 h-12 w-5/6">
                      <div className="h-1/2 gap-3 flex">
                        <div className="h-full flex text-lg text-gray-900">{datum?.author.username}</div>
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
                          <p>Year {datum.author.year} • {datum.author.major}</p>
                        ) : (
                          <p>{datum?.author?.experience} year • {datum?.author?.department}</p>
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
                  {/* Post images grid layouts */}
                  {allImages.length > 0 && (
                    <Link href={`/post/${datum._id}`}>
                      {/* 1 image: big square */}
                      {allImages.length === 1 && (
                        <div className="w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden">
                          <img src={allImages[0]} alt="Post image" className="w-full h-full object-cover" />
                        </div>
                      )}

                      {/* 2 images: two columns */}
                      {allImages.length === 2 && (
                        <div className="grid grid-cols-2 gap-2 w-full h-[320px]">
                          {allImages.slice(0, 2).map((src, i) => (
                            <div key={i} className="bg-gray-100 rounded-lg overflow-hidden">
                              <img src={src} alt={`Post image ${i + 1}`} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* 3 images: 4 cols x 2 rows; left spans 2x2, right two stacked */}
                      {allImages.length === 3 && (
                        <div className="grid grid-cols-4 grid-rows-2 gap-2 w-full h-[360px]">
                          <div className="col-span-2 row-span-2 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[0]} alt="Post image 1" className="w-full h-full object-cover" />
                          </div>
                          <div className="col-span-2 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[1]} alt="Post image 2" className="w-full h-full object-cover" />
                          </div>
                          <div className="col-span-2 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[2]} alt="Post image 3" className="w-full h-full object-cover" />
                          </div>
                        </div>
                      )}

                      {/* 4+ images: left big, right 3 stacked. For 5+, last tile shows +N overlay */}
                      {allImages.length >= 4 && (
                        <div className="grid grid-cols-4 grid-rows-3 gap-2 w-full h-[420px]">
                          {/* Left big (spans 3 cols x 3 rows) */}
                          <div className="col-span-3 row-span-3 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[0]} alt="Post image 1" className="w-full h-full object-cover" />
                          </div>
                          {/* Right column stacked */}
                          <div className="col-span-1 row-span-1 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[1]} alt="Post image 2" className="w-full h-full object-cover" />
                          </div>
                          <div className="col-span-1 row-span-1 bg-gray-100 rounded-lg overflow-hidden">
                            <img src={allImages[2]} alt="Post image 3" className="w-full h-full object-cover" />
                          </div>
                          <div className="relative col-span-1 row-span-1 bg-gray-100 rounded-lg overflow-hidden">
                            {allImages.length === 4 ? (
                              <img src={allImages[3]} alt="Post image 4" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <img src={allImages[3]} alt="Post image more" className="w-full h-full object-cover blur-[2px]" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                  <span className="text-white text-xl font-semibold">+{allImages.length - 4}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </Link>
                  )}

                  {/* Files */}
                  {Array.isArray(datum?.files) && datum.files.length > 0 && (
                    <div className="mt-2 flex flex-col gap-2 w-full max-w-2xl mx-auto">
                      {datum.files.map((file: any, idx: number) => {
                        const href = typeof file === "string" ? file : file?.url || file?.secure_url || "";
                        if (!href) return null;
                        const fileName = href.split("/").pop()?.split("?")[0] || `File ${idx + 1}`;
                        return (
                          <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all" download>
                            {fileName}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  <div className="text-gray-700 w-3/4 text-sm mt-3">{formatDate(datum?._createdAt)}</div>
                  <div className="w-full">
                    <p
                      ref={(el) => {
                        contentRefs.current[datum._id] = el;
                      }}
                      className="text-gray-900"
                      style={
                        expandedItems[datum._id]
                          ? undefined
                          : {
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              // @ts-ignore
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }
                      }
                    >
                      {datum?.pitch}
                    </p>
                  </div>
                </div>

                {canExpand[datum._id] && (
                  <div>
                    <button onClick={() => toggleText(datum._id)} className="text-blue-500 mt-2 text-sm cursor-pointer w-1/5">
                      {expandedItems[datum._id] ? "Show less" : "See more"}
                    </button>
                  </div>
                )}

                {/* Actions */}
                <div className="w-full pr-15 mt-3 flex gap-5 ml-10">
                  <div onClick={() => handleVote(datum._id, "upvote")} className={`flex gap-3 items-center cursor-pointer ${isUpvoted ? "text-blue-600" : "text-gray-700"}`}>
                    <FontAwesomeIcon icon={faCircleUp} />
                    <span>{datum.upvote?.length ?? 0}</span>
                  </div>
                  <div onClick={() => handleVote(datum._id, "downvote")} className={`flex gap-3 items-center cursor-pointer ${isDownvoted ? "text-red-600" : "text-gray-700"}`}>
                    <FontAwesomeIcon icon={faCircleDown} />
                    <span>{datum.downvote?.length ?? 0}</span>
                  </div>
                  <div className="text-gray-700 flex gap-3 items-center cursor-pointer">
                    <FontAwesomeIcon icon={faComment} />
                    {datum?.commentCount}
                  </div>
                  <div className="text-gray-700 flex gap-3 items-center cursor-pointer">•••</div>
                </div>
              </div>
            </li>
          );
        })}
      </div>
    );
  }

    // Top users by followers (uses /api/getUserByFollower)
    function TopUsersByFollowerLocal({ excludeId }: { excludeId?: string | null }) {
      const [users, setUsers] = useState<any[]>([]);
      const [loading, setLoading] = useState<boolean>(false);
      const [error, setError] = useState<string | null>(null);
      const [busy, setBusy] = useState<Record<string, boolean>>({});

      useEffect(() => {
        (async () => {
          setLoading(true);
          setError(null);
          try {
            const url = excludeId ? `/api/getUserByFollower?excludeId=${encodeURIComponent(excludeId)}` : "/api/getUserByFollower";
            const res = await fetch(url, { cache: "no-store" });
            if (!res.ok) throw new Error("Failed to fetch top users");
            const data = await res.json();
            setUsers(Array.isArray(data) ? data : []);
          } catch (err: any) {
            console.error("Error fetching top users:", err);
            setError("Could not load top users");
          } finally {
            setLoading(false);
          }
        })();
      }, [excludeId]);

      const resolveUserAvatar = (user: any) => {
        const pic = user?.profile_pic;
        if (!pic) return "/Default_pfp.jpg";
        try {
          return urlFor(pic).width(56).height(56).fit("crop").url();
        } catch {
          return "/Default_pfp.jpg";
        }
      };
  
      const handleFollow = async (targetId: string) => {
        if (!userId || !targetId) return;
        // Prevent duplicate clicks
        setBusy(prev => ({ ...prev, [targetId]: true }));
        try {
          const res = await fetch('/api/follow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId: targetId })
          });
          if (!res.ok) throw new Error('Failed to follow');
          // Optimistically update the local state
          setUsers(prev => prev.map(u => {
            if (u._id === targetId) {
              const prevFollowers = Array.isArray(u.followers) ? u.followers : [];
              if (!prevFollowers.includes(userId)) {
                return { ...u, followers: [...prevFollowers, userId] };
              }
            }
            return u;
          }));
        } catch (e) {
          console.error('Follow action failed:', e);
        } finally {
          setBusy(prev => ({ ...prev, [targetId]: false }));
        }
      };

      const handleUnfollow = async (targetId: string) => {
        if (!userId || !targetId) return;
        setBusy(prev => ({ ...prev, [targetId]: true }));
        try {
          const res = await fetch('/api/unfollow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId: targetId })
          });
          if (!res.ok) throw new Error('Failed to unfollow');
          // Optimistically update local state: remove userId from followers
          setUsers(prev => prev.map(u => {
            if (u._id === targetId) {
              const prevFollowers = Array.isArray(u.followers) ? u.followers : [];
              if (prevFollowers.includes(userId)) {
                return { ...u, followers: prevFollowers.filter((fid: string) => fid !== userId) };
              }
            }
            return u;
          }));
        } catch (e) {
          console.error('Unfollow action failed:', e);
        } finally {
          setBusy(prev => ({ ...prev, [targetId]: false }));
        }
      };
  
      return (
        <div className="top-users-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Top Members</h2>
            <Link href="/peopleTofollow" className="text-sm text-blue-600 hover:underline">View more</Link>
          </div>
          {loading && <p className="text-sm text-gray-700">Loading...</p>}
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="max-h-60 overflow-y-auto gap-2 flex flex-col">
            {users.map((u: any, idx: number) => (
              <div key={u.username ?? idx} className="p-3 bg-[#E5E7EB] rounded-lg flex items-center gap-3">
                <img
                  src={resolveUserAvatar(u)}
                  alt={(u.username || "User") + " avatar"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{u.username || "Unknown"}</p>
                  <p className="text-sm text-gray-700">{u.major ? `${u.major}` : ""}{u.year ? ` • Year ${u.year}` : ""}</p>
                </div>
                {(() => {
                  const alreadyFollowing = Array.isArray(u?.followers) && !!userId && u.followers.includes(userId);
                  const isBusy = !!busy[u._id];
                  const handleClick = () => {
                    if (!userId || isBusy) return;
                    if (alreadyFollowing) return handleUnfollow(u._id);
                    return handleFollow(u._id);
                  };
                  const className = alreadyFollowing
                    ? (isBusy
                        ? "px-3 py-1 rounded-md bg-gray-300 text-gray-500 cursor-wait"
                        : "px-3 py-1 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 cursor-pointer")
                    : (isBusy
                        ? "px-3 py-1 rounded-md bg-blue-300 text-white cursor-wait"
                        : "px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer");
                  const label = isBusy ? (alreadyFollowing ? "Unfollowing..." : "Following...") : (alreadyFollowing ? "Following" : "Follow");
                  return (
                    <button
                      type="button"
                      onClick={handleClick}
                      disabled={!userId || isBusy}
                      className={className}
                    >
                      {label}
                    </button>
                  );
                })()}
              </div>
            ))}
            {!loading && !error && users.length === 0 && (
              <p className="text-sm text-gray-700">No users to display.</p>
            )}
          </div>
        </div>
      );
    }
  

  function OppSectionLocal() {
    const [opportunities, setOpportunities] = useState<any[]>([]);
    useEffect(() => {
      (async () => {
        try {
          const [jobsRes, scholarshipsRes] = await Promise.all([
            fetch("/api/getTopJob"),
            fetch("/api/getTopScholarship"),
          ]);
          if (!jobsRes.ok || !scholarshipsRes.ok) throw new Error("Failed to fetch opportunities");
          const jobs = await jobsRes.json();
          const scholarships = await scholarshipsRes.json();
          const merged = [...jobs, ...scholarships].sort((a: any, b: any) => {
            const ta = new Date(a?._createdAt || 0).getTime();
            const tb = new Date(b?._createdAt || 0).getTime();
            return tb - ta; // desc
          });
          setOpportunities(merged);
        } catch (error) {
          console.error("Error fetching opportunities:", error);
        }
      })();
    }, []);
    // Resolve an avatar/logo for opportunity items (supports URL string or Sanity image object)
    const resolveOppAvatar = (opp: any) => {
      const candidate = opp?.companyLogo || opp?.logo || opp?.author?.profile_pic || null;
      if (!candidate) return "/Default_pfp.jpg";
      if (typeof candidate === "string") return candidate;
      try {
        return urlFor(candidate).width(56).height(56).fit("crop").url();
      } catch {
        return "/Default_pfp.jpg";
      }
    };
    return (
      <div className="opp-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Latest Opportunities</h2>
          <Link href="/opportunity" className="text-sm text-blue-600 hover:underline">View more</Link>
        </div>
        <div className="max-h-56 overflow-y-auto gap-2 flex flex-col">
          {opportunities.map((opp: any) => (
            <div key={opp._id} className="p-3 bg-[#E5E7EB] rounded-lg flex items-center gap-3">
              <div>
                <p className="font-medium text-gray-900">{opp.jobTitle || opp.scholarshipTitle || "No title"}</p>
                <p className="text-sm text-gray-700">{opp.companyName || opp.typeofcoverage || "N/A"}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function NewsSectionLocal() {
    const [news, setNews] = useState<any[]>([]);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});
    const [canExpand, setCanExpand] = useState<Record<string, boolean>>({});
    const newsRefs = useRef<Record<string, HTMLParagraphElement | null>>({});
    useEffect(() => {
      (async () => {
        try {
          const res = await fetch("/api/getTopNews");
          if (!res.ok) throw new Error("Failed to fetch news");
          setNews(await res.json());
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      })();
    }, []);
    const toggleExpand = (id: string) =>
      setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

    // Measure overflow: show See more only when pitch exceeds 5 lines
    useEffect(() => {
      const measure = () => {
        const next: Record<string, boolean> = {};
        Object.entries(newsRefs.current).forEach(([id, el]) => {
          if (!el) return;
          const isExpanded = !!expanded[id];
          const prevStyle = el.getAttribute("style") || "";

          // 1) Remove clamp to measure full content height
          el.style.removeProperty("display");
          // @ts-ignore
          el.style.removeProperty("WebkitLineClamp");
          // @ts-ignore
          el.style.removeProperty("WebkitBoxOrient");
          el.style.removeProperty("overflow");
          const fullHeight = el.scrollHeight;

          // 2) Apply clamp styles to measure clamped height
          el.style.display = "-webkit-box";
          // @ts-ignore
          el.style.WebkitLineClamp = "5";
          // @ts-ignore
          el.style.WebkitBoxOrient = "vertical";
          el.style.overflow = "hidden";
          const clampedHeight = el.clientHeight;

          // 3) Determine overflow
          next[id] = fullHeight > clampedHeight + 1;

          // 4) Restore element style to the render state
          if (isExpanded) {
            // Expanded should have no clamp
            el.setAttribute("style", prevStyle);
          } else {
            // Not expanded should keep clamp (prevStyle also had clamp via React inline style)
            el.setAttribute("style", prevStyle);
          }
        });
        setCanExpand(next);
      };
      measure();
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }, [news, expanded]);
    return (
      <div className="news-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Trending News</h2>
          <Link href="/new" className="text-sm text-blue-600 hover:underline">View more</Link>
        </div>
        <div className="space-y-4">
          {news.map((article: any) => (
            <div key={article._id} className="pb-3 p-3 bg-[#E5E7EB] rounded-lg">
              <div className="flex gap-3">
              <img
                src={article.author?.profile_pic ? urlFor(article.author.profile_pic).width(50).height(50).url() : "/placeholder.png"}
                alt={article.author?.username || "Author"}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <div>
                <p className="font-medium text-black font-semibold">{article.author?.username || "Unknown"}</p>
                <p
                  ref={(el) => {
                    newsRefs.current[article._id] = el;
                  }}
                  className="text-sm text-gray-800"
                  style={
                    expanded[article._id]
                      ? undefined
                      : {
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical" as any,
                          overflow: "hidden",
                        }
                  }
                >
                  {article.pitch || ""}
                </p>
                <span className="text-xs text-gray-700">{article._createdAt ? new Date(article._createdAt).toLocaleDateString() : ""}</span>
                </div>
              </div>
              </div>
              {canExpand[article._id] && (
                <button
                  type="button"
                  onClick={() => toggleExpand(article._id)}
                  className="mt-2 text-sm text-blue-700 hover:underline font-semibold items-center text-center w-full cursor-pointer"
                >
                  {expanded[article._id] ? "See less" : "See more"}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section>
      <header>
        <title>S3TUDY | Home Page</title>
      </header>
      
        <section>
          <div className="flex-12 h-full w-full grid grid-cols-1 lg:grid-cols-12 bg-gray-100 text-gray-900">
            {/* left-sidebar */}
            <div className="hidden lg:flex col-span-3">
              <div className="sticky top-20 w-full bg-gray-100">
                
                <div className="position-absolute w-full mt-5 rounded-2xl shadow-2xs bg-white h-full">
                  {/* profile Info */}
                  <Link href="/profile" className = "h-20 flex items-center pr-8 gap-2 text-[#374151] cursor-pointer">	
                    <div className="p-4 flex items-center gap-4">
                      <Image
                        src={profilePic ?? '/Default_pfp.jpg'}
                        alt={session?.user?.name ?? 'User profile'}
                        width={50}
                        height={50}
                        className="rounded-full border-2"
                      />
                      <div className="flex flex-col">
                        <p className="font-bold text-gray-900">{username}</p>
                        <p className="text-sm text-gray-700">{major} •</p>
                        <p className="text-sm text-gray-700">year {year}</p>
                      </div>
              
                    </div>
                  </Link>

                  {/* menu */}
                  <ul className="flex flex-col gap-y-4 mt-5 ml-5">
                    <li className={`p-2 hover:cursor-pointer text-gray-700 hover:text-gray-900 ${activeMenu === "Homepage" ? "bg-blue-600 px-2 py-4 text-white rounded-[10px] mr-5" : ""}`}>
                      <span className="flex items-center gap-x-5" onClick={() => setActiveMenu("Homepage")}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.6667 6.3334L11.6667 2.16923C11.2084 1.77977 10.615 1.56445 10.0001 1.56445C9.38514 1.56445 8.79176 1.77977 8.33341 2.16923L3.33341 6.3334C3.06872 6.55829 2.8575 6.83417 2.71381 7.14268C2.57012 7.45118 2.49726 7.78522 2.50008 8.12257V15.0417C2.50008 15.6716 2.76347 16.2757 3.23231 16.7211C3.70115 17.1665 4.33704 17.4167 5.00008 17.4167H15.0001C15.6631 17.4167 16.299 17.1665 16.7678 16.7211C17.2367 16.2757 17.5001 15.6716 17.5001 15.0417V8.11465C17.5017 7.77864 17.4283 7.44612 17.2846 7.13906C17.141 6.83201 16.9304 6.55741 16.6667 6.3334ZM11.6667 15.8334H8.33341V11.8751C8.33341 11.6651 8.42121 11.4637 8.57749 11.3153C8.73377 11.1668 8.94573 11.0834 9.16675 11.0834H10.8334C11.0544 11.0834 11.2664 11.1668 11.4227 11.3153C11.5789 11.4637 11.6667 11.6651 11.6667 11.8751V15.8334ZM15.8334 15.0417C15.8334 15.2517 15.7456 15.4531 15.5893 15.6015C15.4331 15.75 15.2211 15.8334 15.0001 15.8334H13.3334V11.8751C13.3334 11.2452 13.07 10.6411 12.6012 10.1957C12.1323 9.75029 11.4965 9.50007 10.8334 9.50007H9.16675C8.5037 9.50007 7.86782 9.75029 7.39898 10.1957C6.93014 10.6411 6.66675 11.2452 6.66675 11.8751V15.8334H5.00008C4.77907 15.8334 4.5671 15.75 4.41082 15.6015C4.25454 15.4531 4.16675 15.2517 4.16675 15.0417V8.11465C4.1669 8.00224 4.19224 7.89116 4.24109 7.78878C4.28995 7.68641 4.36119 7.59509 4.45008 7.5209L9.45008 3.36465C9.60215 3.23773 9.79766 3.16773 10.0001 3.16773C10.2025 3.16773 10.398 3.23773 10.5501 3.36465L15.5501 7.5209C15.639 7.59509 15.7102 7.68641 15.7591 7.78878C15.8079 7.89116 15.8333 8.00224 15.8334 8.11465V15.0417ZM7.5 2.375C9.22617 2.375 10.6255 3.70437 10.6255 5.34423C10.6255 6.98409 9.22617 8.31346 7.5 8.31346C5.77383 8.31346 4.37449 6.98409 4.37449 5.34423C4.37449 3.70437 5.77383 2.375 7.5 2.375ZM13.75 3.5625C15.1307 3.5625 16.25 4.62582 16.25 5.9375C16.25 7.24918 15.1307 8.3125 13.75 8.3125C12.3693 8.3125 11.25 7.24918 11.25 5.9375C11.25 4.62582 12.3693 3.5625 13.75 3.5625ZM7.5 3.5625C6.46419 3.5625 5.62449 4.36021 5.62449 5.34423C5.62449 6.32825 6.46419 7.12596 7.5 7.12596C8.53581 7.12596 9.37551 6.32825 9.37551 5.34423C9.37551 4.36021 8.53581 3.5625 7.5 3.5625ZM13.75 4.75C13.0596 4.75 12.5 5.28166 12.5 5.9375C12.5 6.59334 13.0596 7.125 13.75 7.125C14.4404 7.125 15 6.59334 15 5.9375C15 5.28166 14.4404 4.75 13.75 4.75Z"
                            fill={activeMenu === "Homepage" ? "#FFFFFF" : "#565D6C"}
                          />
                        </svg>
                        Home
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer" onClick={handleClickedMyNetwork}>
                      <span className="flex items-center gap-x-5">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.6197 9.5C11.6553 9.5 12.4947 10.2975 12.4947 11.2812L12.4938 12.1699C12.6223 14.3508 10.8542 15.4385 7.57524 15.4385C4.3069 15.4385 2.5 14.3651 2.5 12.2011V11.2812C2.5 10.2975 3.33947 9.5 4.375 9.5H10.6197ZM15.6205 9.5C16.656 9.5 17.4955 10.2975 17.4955 11.2812L17.4945 11.9066C17.6076 13.8629 16.0452 14.8438 13.1895 14.8438C12.8018 14.8438 12.4374 14.8258 12.0971 14.7899C12.4604 14.4724 12.731 14.0934 12.9035 13.6531L13.1895 13.6562C15.4198 13.6562 16.3114 13.0965 16.2455 11.9391V11.2812C16.2455 10.9533 15.9657 10.6875 15.6205 10.6875L13.041 10.6875C12.9144 10.2204 12.6421 9.80897 12.2728 9.49951L15.6205 9.5ZM10.6197 10.6875H4.375C4.02982 10.6875 3.75 10.9533 3.75 11.2812V12.2011C3.75 13.5619 4.90993 14.251 7.57524 14.251C10.23 14.251 11.3248 13.5775 11.2447 12.2031V11.2812C11.2447 10.9533 10.9649 10.6875 10.6197 10.6875ZM7.5 2.375C9.22617 2.375 10.6255 3.70437 10.6255 5.34423C10.6255 6.98409 9.22617 8.31346 7.5 8.31346C5.77383 8.31346 4.37449 6.98409 4.37449 5.34423C4.37449 3.70437 5.77383 2.375 7.5 2.375ZM13.75 3.5625C15.1307 3.5625 16.25 4.62582 16.25 5.9375C16.25 7.24918 15.1307 8.3125 13.75 8.3125C12.3693 8.3125 11.25 7.24918 11.25 5.9375C11.25 4.62582 12.3693 3.5625 13.75 3.5625ZM7.5 3.5625C6.46419 3.5625 5.62449 4.36021 5.62449 5.34423C5.62449 6.32825 6.46419 7.12596 7.5 7.12596C8.53581 7.12596 9.37551 6.32825 9.37551 5.34423C9.37551 4.36021 8.53581 3.5625 7.5 3.5625ZM13.75 4.75C13.0596 4.75 12.5 5.28166 12.5 5.9375C12.5 6.59334 13.0596 7.125 13.75 7.125C14.4404 7.125 15 6.59334 15 5.9375C15 5.28166 14.4404 4.75 13.75 4.75Z"
                            fill="#565D6C"
                          />
                        </svg>
                        My Network
                      </span>
                    </li>

                    <li className="p-2">
                      <span className="flex items-center gap-x-5 hover:cursor-pointer" onClick={() => router.push("/collection")}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16.857 17.1656H3.14453C2.97877 17.1656 2.8198 17.0998 2.70259 16.9826C2.58538 16.8654 2.51953 16.7064 2.51953 16.5406V9.5625C2.51953 9.39674 2.58538 9.23777 2.70259 9.12056C2.8198 9.00335 2.97877 8.9375 3.14453 8.9375H16.857C17.0228 8.9375 17.1818 9.00335 17.299 9.12056C17.4162 9.23777 17.482 9.39674 17.482 9.5625V16.5406C17.482 16.7064 17.4162 16.8654 17.299 16.9826C17.1818 17.0998 17.0228 17.1656 16.857 17.1656ZM3.76953 15.9156H16.232V10.1875H3.76953V15.9156Z"
                            fill="#565D6C"
                          />
                          <path
                            d="M15.607 10.1874H4.39453C4.22877 10.1874 4.0698 10.1216 3.95259 10.0043C3.83538 9.88713 3.76953 9.72816 3.76953 9.5624V6.19678C3.76953 6.03102 3.83538 5.87205 3.95259 5.75484C4.0698 5.63763 4.22877 5.57178 4.39453 5.57178H15.607C15.7728 5.57178 15.9318 5.63763 16.049 5.75484C16.1662 5.87205 16.232 6.03102 16.232 6.19678V9.5624C16.232 9.72816 16.1662 9.88713 16.049 10.0043C15.9318 10.1216 15.7728 10.1874 15.607 10.1874ZM5.01953 8.9374H14.982V6.82178H5.01953V8.9374Z"
                            fill="#565D6C"
                          />
                          <path
                            d="M14.25 6.82192H5.75C5.58424 6.82192 5.42527 6.75608 5.30806 6.63887C5.19085 6.52166 5.125 6.36268 5.125 6.19692V3.4563C5.125 3.29054 5.19085 3.13157 5.30806 3.01436C5.42527 2.89715 5.58424 2.8313 5.75 2.8313H14.25C14.4158 2.8313 14.5747 2.89715 14.6919 3.01436C14.8092 3.13157 14.875 3.29054 14.875 3.4563V6.19692C14.875 6.36268 14.8092 6.52166 14.6919 6.63887C14.5747 6.75608 14.4158 6.82192 14.25 6.82192ZM6.375 5.57192H13.625V4.0813H6.375V5.57192Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Collection
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5 ml-1" onClick={() => router.push("/opportunity")}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 18 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.12195 0C7.40317 7.73577e-05 6.71089 0.256331 6.18348 0.717547C5.65606 1.17876 5.33236 1.81097 5.27707 2.4878H5.01717C4.22341 2.4878 3.58332 2.4878 3.06615 2.53176C2.53405 2.57737 2.06868 2.67439 1.64634 2.90493C1.14573 3.17768 0.729945 3.57008 0.440781 4.04268C0.197561 4.44156 0.0948292 4.88107 0.0465366 5.38361C-2.23517e-08 5.87205 0 6.47658 0 7.22624V7.28595C0 8.03561 -2.23517e-08 8.64015 0.0465366 9.12859C0.0948292 9.63112 0.197561 10.0706 0.441659 10.4695C0.663805 10.8344 0.962341 11.1512 1.31707 11.4024V11.448C1.31707 12.5817 1.31707 13.4963 1.4198 14.2153C1.52517 14.9617 1.75346 15.5902 2.28117 16.0895C2.80976 16.5887 3.47532 16.8026 4.26556 16.9038C5.02683 17 5.99532 17 7.19561 17H10.8044C12.0047 17 12.9732 17 13.7344 16.9038C14.5247 16.8026 15.1902 16.5887 15.7188 16.0895C16.2474 15.5902 16.474 14.9617 16.5811 14.2153C16.6829 13.4963 16.6829 12.5817 16.6829 11.448V11.4024C17.0387 11.1505 17.3368 10.8332 17.5592 10.4695C17.8024 10.0706 17.9052 9.63112 17.9535 9.12859C18 8.64015 18 8.03561 18 7.28595V7.22624C18 6.47658 18 5.87205 17.9535 5.38361C17.9052 4.88107 17.8024 4.44156 17.5583 4.04268C17.2695 3.56988 16.8541 3.1772 16.3537 2.9041C15.9313 2.67439 15.466 2.57737 14.9339 2.53176C14.4167 2.4878 13.7766 2.4878 12.9828 2.4878H12.7229C12.6676 1.81097 12.3439 1.17876 11.8165 0.717547C11.2891 0.256331 10.5968 7.73577e-05 9.87805 0H8.12195ZM8.12195 1.2439C7.75246 1.24391 7.39535 1.36966 7.11605 1.59812C6.83674 1.82657 6.65395 2.14242 6.60117 2.4878H11.3988C11.346 2.14242 11.1633 1.82657 10.884 1.59812C10.6046 1.36966 10.2475 1.24391 9.87805 1.2439H8.12195ZM2.72459 14.0495C2.64907 13.5196 2.63678 12.8437 2.63415 11.9282C2.77376 11.9506 2.91776 11.9672 3.06615 11.9804C3.58332 12.0244 4.22341 12.0244 5.01717 12.0244H6.67668C6.82019 12.502 7.12473 12.9223 7.5441 13.2216C7.96348 13.521 8.47478 13.6829 9.00044 13.6829C9.52609 13.6829 10.0374 13.521 10.4568 13.2216C10.8761 12.9223 11.1807 12.502 11.3242 12.0244H12.9828C13.7766 12.0244 14.4167 12.0244 14.9339 11.9804C15.0831 11.9672 15.2262 11.9506 15.3659 11.9282C15.3632 12.8437 15.3509 13.5196 15.2754 14.0495C15.1885 14.6581 15.0296 14.9799 14.7872 15.2096C14.544 15.4393 14.2033 15.5886 13.558 15.6707C12.895 15.7544 12.0161 15.7561 10.7561 15.7561H7.2439C5.9839 15.7561 5.1041 15.7544 4.44117 15.6707C3.79668 15.5886 3.456 15.4385 3.21278 15.2096C2.96956 14.9799 2.81151 14.659 2.72459 14.0495ZM11.3242 10.7805H12.9512C13.7836 10.7805 14.3649 10.7805 14.8144 10.7415C15.2561 10.7034 15.5063 10.6337 15.6951 10.5309C15.9954 10.3667 16.2448 10.1312 16.4186 9.84756C16.5275 9.66927 16.6013 9.43293 16.6417 9.0158C16.682 8.59122 16.6829 8.04224 16.6829 7.2561C16.6829 6.46995 16.6829 5.92098 16.6417 5.49639C16.6013 5.07927 16.5275 4.84293 16.4186 4.66463C16.2452 4.38081 15.9956 4.14513 15.6951 3.98132C15.5063 3.87849 15.2561 3.80883 14.8144 3.77068C14.3649 3.73254 13.7836 3.73171 12.9512 3.73171H5.04878C4.21639 3.73171 3.63512 3.73171 3.18556 3.77068C2.7439 3.80883 2.49366 3.87849 2.30488 3.98132C2.00436 4.14513 1.75482 4.38081 1.58137 4.66463C1.47249 4.84293 1.39873 5.07927 1.35834 5.49639C1.31795 5.92098 1.31707 6.46995 1.31707 7.2561C1.31707 8.04224 1.31707 8.59122 1.35834 9.0158C1.39873 9.4321 1.47249 9.66927 1.58137 9.84756C1.75522 10.1312 2.00459 10.3667 2.30488 10.5309C2.49366 10.6337 2.7439 10.7034 3.18556 10.7415C3.63512 10.7797 4.21639 10.7805 5.04878 10.7805H6.67668C6.82019 10.3029 7.12473 9.88255 7.5441 9.58323C7.96348 9.28392 8.47478 9.12197 9.00044 9.12197C9.52609 9.12197 10.0374 9.28392 10.4568 9.58323C10.8761 9.88255 11.1807 10.3029 11.3242 10.7805ZM7.90244 11.4024C7.90244 11.1275 8.01807 10.8639 8.22391 10.6695C8.42974 10.4751 8.70891 10.3659 9 10.3659C9.29109 10.3659 9.57026 10.4751 9.77609 10.6695C9.98193 10.8639 10.0976 11.1275 10.0976 11.4024C10.0976 11.6774 9.98193 11.941 9.77609 12.1354C9.57026 12.3298 9.29109 12.439 9 12.439C8.70891 12.439 8.42974 12.3298 8.22391 12.1354C8.01807 11.941 7.90244 11.6774 7.90244 11.4024Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Opportunity
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5 ml-1" onClick={() => router.push("/new")}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 18 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1743_82)">
                            <path
                              d="M0.630859 0H15.2925V3.1968H0.630859V0ZM0.630859 4.7968H15.2925V16H1.29063C0.994957 16 0.630859 15.5456 0.630859 15.1744V4.7968ZM1.85266 6.3872V14.4H7.96169V6.3872H1.85266ZM9.18349 6.4V8H14.0707V6.4H9.18349ZM3.07447 7.9872H6.73988V12.8H3.07447V7.9872ZM16.5143 8H17.7361V15.4C17.7361 15.6784 17.5113 16 17.1252 16C16.7391 16 16.5143 15.68 16.5143 15.4V12.8192V8ZM9.18349 9.6V11.2H14.0707V9.6H9.18349ZM9.18349 12.8V14.4H14.0707V12.8H9.18349Z"
                              fill="#565D6C"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1743_82">
                              <rect width="18" height="16" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        News
                      </span>
                    </li>

                    <li className="p-2 hover:cursor-pointer">
                      <span className="flex items-center gap-x-5" onClick={() => router.push("/settings/edit-profile")}>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M21.32 9.55L19.43 8.92L20.32 7.14C20.4102 6.95369 20.4404 6.74397 20.4064 6.53978C20.3723 6.33558 20.2758 6.14699 20.13 6L18 3.87C17.8522 3.72209 17.6618 3.62421 17.4555 3.59013C17.2493 3.55605 17.0375 3.58748 16.85 3.68L15.07 4.57L14.44 2.68C14.3735 2.483 14.2472 2.31163 14.0787 2.18975C13.9102 2.06787 13.7079 2.00155 13.5 2H10.5C10.2904 1.99946 10.0858 2.06482 9.91537 2.18685C9.7449 2.30887 9.61709 2.48138 9.55 2.68L8.92 4.57L7.14 3.68C6.95369 3.58978 6.74397 3.55961 6.53978 3.59364C6.33558 3.62767 6.14699 3.72423 6 3.87L3.87 6C3.72209 6.14777 3.62421 6.33818 3.59013 6.54446C3.55605 6.75074 3.58748 6.96251 3.68 7.15L4.57 8.93L2.68 9.56C2.483 9.62654 2.31163 9.75283 2.18975 9.92131C2.06787 10.0898 2.00155 10.2921 2 10.5V13.5C1.99946 13.7096 2.06482 13.9142 2.18685 14.0846C2.30887 14.2551 2.48138 14.3829 2.68 14.45L4.57 15.08L3.68 16.86C3.58978 17.0463 3.55961 17.256 3.59364 17.4602C3.62767 17.6644 3.72423 17.853 3.87 18L6 20.13C6.14777 20.2779 6.33818 20.3758 6.54446 20.4099C6.75074 20.444 6.96251 20.4125 7.15 20.32L8.93 19.43L9.56 21.32C9.62709 21.5186 9.7549 21.6911 9.92537 21.8132C10.0958 21.9352 10.3004 22.0005 10.51 22H13.51C13.7196 22.0005 13.9242 21.9352 14.0946 21.8132C14.2651 21.6911 14.3929 21.5186 14.46 21.32L15.09 19.43L16.87 20.32C17.0551 20.4079 17.2628 20.4369 17.4649 20.4029C17.667 20.3689 17.8538 20.2737 18 20.13L20.13 18C20.2779 17.8522 20.3758 17.6618 20.4099 17.4555C20.444 17.2493 20.4125 17.0375 20.32 16.85L19.43 15.07L21.32 14.44C21.517 14.3735 21.6884 14.2472 21.8103 14.0787C21.9321 13.9102 21.9985 13.7079 22 13.5V10.5C22.0005 10.2904 21.9352 10.0858 21.8132 9.91537C21.6911 9.7449 21.5186 9.61709 21.32 9.55ZM20 12.78L18.8 13.18C18.5241 13.2695 18.2709 13.418 18.0581 13.6151C17.8452 13.8122 17.6778 14.0533 17.5675 14.3216C17.4571 14.5899 17.4064 14.879 17.419 15.1688C17.4315 15.4586 17.5069 15.7422 17.64 16L18.21 17.14L17.11 18.24L16 17.64C15.7436 17.5122 15.4627 17.4411 15.1763 17.4313C14.89 17.4215 14.6049 17.4734 14.3403 17.5834C14.0758 17.6934 13.8379 17.8589 13.6429 18.0688C13.4479 18.2787 13.3003 18.5281 13.21 18.8L12.81 20H11.22L10.82 18.8C10.7305 18.5241 10.582 18.2709 10.3849 18.0581C10.1878 17.8452 9.94671 17.6778 9.67842 17.5675C9.41014 17.4571 9.12105 17.4064 8.83123 17.419C8.5414 17.4315 8.25777 17.5069 8 17.64L6.86 18.21L5.76 17.11L6.36 16C6.4931 15.7422 6.56852 15.4586 6.58105 15.1688C6.59358 14.879 6.5429 14.5899 6.43254 14.3216C6.32218 14.0533 6.15478 13.8122 5.94195 13.6151C5.72912 13.418 5.47595 13.2695 5.2 13.18L4 12.78V11.22L5.2 10.82C5.47595 10.7305 5.72912 10.582 5.94195 10.3849C6.15478 10.1878 6.32218 9.94671 6.43254 9.67842C6.5429 9.41014 6.59358 9.12105 6.58105 8.83123C6.56852 8.5414 6.4931 8.25777 6.36 8L5.79 6.89L6.89 5.79L8 6.36C8.25777 6.4931 8.5414 6.56852 8.83123 6.58105C9.12105 6.59358 9.41014 6.5429 9.67842 6.43254C9.94671 6.32218 10.1878 6.15478 10.3849 5.94195C10.582 5.72912 10.7305 5.47595 10.82 5.2L11.22 4H12.78L13.18 5.2C13.2695 5.47595 13.418 5.72912 13.6151 5.94195C13.8122 6.15478 14.0533 6.32218 14.3216 6.43254C14.5899 6.5429 14.879 6.59358 15.1688 6.58105C15.4586 6.56852 15.7422 6.4931 16 6.36L17.14 5.79L18.24 6.89L17.64 8C17.5122 8.25645 17.4411 8.53735 17.4313 8.82369C17.4215 9.11003 17.4734 9.39513 17.5834 9.65969C17.6934 9.92424 17.8589 10.1621 18.0688 10.3571C18.2787 10.5521 18.5281 10.6997 18.8 10.79L20 11.19V12.78ZM12 8C11.2089 8 10.4355 8.2346 9.77772 8.67413C9.11993 9.11365 8.60724 9.73836 8.30448 10.4693C8.00173 11.2002 7.92252 12.0044 8.07686 12.7804C8.2312 13.5563 8.61217 14.269 9.17158 14.8284C9.73099 15.3878 10.4437 15.7688 11.2196 15.9231C11.9956 16.0775 12.7998 15.9983 13.5307 15.6955C14.2616 15.3928 14.8864 14.8801 15.3259 14.2223C15.7654 13.5645 16 12.7911 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17158C14.0783 8.42143 13.0609 8 12 8ZM12 14C11.6044 14 11.2178 13.8827 10.8889 13.6629C10.56 13.4432 10.3036 13.1308 10.1522 12.7654C10.0009 12.3999 9.96126 11.9978 10.0384 11.6098C10.1156 11.2219 10.3061 10.8655 10.5858 10.5858C10.8655 10.3061 11.2219 10.1156 11.6098 10.0384C11.9978 9.96126 12.3999 10.0009 12.7654 10.1522C13.1308 10.3036 13.4432 10.56 13.6629 10.8889C13.8827 11.2178 14 11.6044 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z"
                            fill="#565D6C"
                          />
                        </svg>
                        Setting
                      </span>
                    </li>
                  </ul>

                </div>
              </div>
            </div>

            {/* mid-content */}
            <div className="flex flex-col bg-gray-100 overflow-hidden w-full col-span-1 lg:col-start-4 lg:col-span-6">
              <div className="ml-2">
                {/* Create Post trigger (opens modal) */}
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(true)}
                  className="flex items-center gap-x-2 mb-4 rounded-lg border-1 bg-white border-[#DDE3EF] p-3 mt-5 ml-8 text-gray-900 w-[calc(100%-2rem)] cursor-pointer"
                >
                  <div className="flex items-center w-full text-left">
                    {profilePic && (
                      <Image
                        src={profilePic}
                        alt={session?.user?.name ?? 'User profile'}
                        width={50}
                        height={50}
                        className="rounded-full border-2 w-10 h-10"
                      />
                    )}
                    <span className="opacity-50 font-light ml-3 text-[20px]">Share something with your community...</span>
                  </div>
                </button>
                
                {/* content */}
                <FeedContent />
              </div>
            </div>

            {/* Right-sidebar */}
            <div className="hidden lg:flex flex-col bg-gray-100 col-span-3 h-full">
              <div className="flex-1 h-full w-full">
                <TopUsersByFollowerLocal excludeId={userId} />
                <OppSectionLocal />
                <NewsSectionLocal />                
              </div>
            </div>
          </div>
        </section>

        {/* Create Post Modal */}
        {isCreateOpen && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm"
              onClick={() => setIsCreateOpen(false)}
            />
            {/* Dialog */}
            <div className="relative z-10 w-full max-w-3xl mx-4">
              <CreatePostForm
                onClose={() => setIsCreateOpen(false)}
                onSuccess={() => setIsCreateOpen(false)}
              />
            </div>
          </div>
        )}

      </section>
    
  );
}

