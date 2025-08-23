"use client";

import React, { useEffect, useMemo, useState, useCallback } from 'react'; 
import { FaArrowLeft } from 'react-icons/fa';
import { TbTriangleInverted } from 'react-icons/tb';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import client from '@/sanity/lib/client';
import { formatDistanceToNow } from 'date-fns';
import imageUrlBuilder from '@sanity/image-url';
export default function UsersPage() {
  const params = useParams();
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [selectedCategory, setSelectedCategory] = useState("overview");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [_error, setError] = useState(null);

  // Posts tab controls
  const [postSearch, setPostSearch] = useState("");
  const [postCategory, setPostCategory] = useState("allcategories"); // allcategories | qna | lesson
  const [postSort, setPostSort] = useState("popular"); // popular | oldest | recent

  // Comments tab controls
  const [commentSearch, setCommentSearch] = useState("");
  const [commentType, setCommentType] = useState("all"); // all | post | reply
  const [commentSort, setCommentSort] = useState("recent"); // popular | oldest | recent

  // Sanity image URL builder
  const builder = useMemo(() => imageUrlBuilder(client), []);
  const urlFor = (source) => (source ? builder.image(source) : null);

  // Export data (user, posts, comments) as JSON
  const handleExport = useCallback(() => {
    try {
      const payload = {
        meta: {
          exportedAt: new Date().toISOString(),
          version: 1,
          userId: user?._id || null,
          counts: {
            posts: Array.isArray(posts) ? posts.length : 0,
            comments: Array.isArray(comments) ? comments.length : 0,
          },
        },
        user: user || null,
        posts: Array.isArray(posts) ? posts : [],
        comments: Array.isArray(comments) ? comments : [],
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const nameBase = user?.email || user?._id || 'user-data';
      a.download = `${nameBase}-export.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed', e);
      alert('Failed to export data.');
    }
  }, [user, posts, comments]);

  const categories = [
    { label: "Overview", value: "overview" },
    { label: "Posts", value: "posts" },
    { label: "Comments", value: "comments" },
  ];

  useEffect(() => {
    if (!id) return;
    const run = async () => {
      try {
        setLoading(true);
        const [u, p, c] = await Promise.all([
          client.fetch(`*[_type == "user" && _id == $id][0]{
            _id,
            email,
            firstName,
            lastName,
            role,
            status,
            department,
            major,
            enroll_year,
            bio,
            profile_pic,
            "lastActive": coalesce(lastActive, _updatedAt, _createdAt),
            _updatedAt,
            _createdAt
          }`, { id }),
          client.fetch(`*[_type=="post" && author._ref==$id]{
            _id,
            title,
            text,
            typePost,
            upvote,
            downvote,
            createdAt,
            _createdAt,
            "commentCount": count(*[_type=="comment" && post._ref == ^._id])
          } | order(coalesce(createdAt,_createdAt) desc)`, { id }),
          client.fetch(`*[_type=="comment" && author._ref==$id]{
            _id,
            text,
            createdAt,
            _createdAt,
            upvote,
            downvote,
            post->{ _id, title },
            parentComment->{ _id, text }
          } | order(coalesce(createdAt,_createdAt) desc)`, { id })
        ]);
        setUser(u);
        setPosts(Array.isArray(p) ? p : []);
        setComments(Array.isArray(c) ? c : []);
        setError(u ? null : 'User not found');
      } catch (e) {
        setError(e?.message || 'Failed to load');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const mostRecentIso = useMemo(() => {
    if (!user) return null;
    const toMs = (v) => (v ? new Date(v).getTime() : 0);
    const ms = Math.max(toMs(user?.lastActive), toMs(user?._updatedAt), toMs(user?._createdAt));
    return ms ? new Date(ms).toISOString() : null;
  }, [user]);

  // Derived list for posts with search/filter/sort
  const filteredPosts = useMemo(() => {
    const q = postSearch.trim().toLowerCase();
    const cat = postCategory;
    const byDate = (a) => new Date(a.createdAt || a._createdAt || 0).getTime();
    const upCount = (p) => (Array.isArray(p.upvote) ? p.upvote.length : 0);
    const downCount = (p) => (Array.isArray(p.downvote) ? p.downvote.length : 0);

    let list = Array.isArray(posts) ? [...posts] : [];

    // Filter by category
    if (cat !== 'allcategories') {
      list = list.filter((p) => (p.typePost || '').toLowerCase() === cat);
    }

    // Filter by search query (title or text)
    if (q) {
      list = list.filter((p) => {
        const title = (p.title || '').toLowerCase();
        const text = (p.text || '').toLowerCase();
        return title.includes(q) || text.includes(q);
      });
    }

    // Sort
    if (postSort === 'popular') {
      list.sort((a, b) => {
        const aScore = upCount(a) - downCount(a);
        const bScore = upCount(b) - downCount(b);
        if (bScore !== aScore) return bScore - aScore; // higher score first
        return byDate(b) - byDate(a); // tie-breaker: newer first
      });
    } else if (postSort === 'oldest') {
      list.sort((a, b) => byDate(a) - byDate(b)); // oldest first
    } else if (postSort === 'recent') {
      list.sort((a, b) => byDate(b) - byDate(a)); // newest first
    }

    return list;
  }, [posts, postSearch, postCategory, postSort]);

  // Derived list for comments with search/filter/sort
  const filteredComments = useMemo(() => {
    const q = commentSearch.trim().toLowerCase();
    const type = commentType;
    const byDate = (a) => new Date(a.createdAt || a._createdAt || 0).getTime();
    const upCount = (c) => (Array.isArray(c.upvote) ? c.upvote.length : 0);
    const downCount = (c) => (Array.isArray(c.downvote) ? c.downvote.length : 0);

    let list = Array.isArray(comments) ? [...comments] : [];

    // Filter by type
    if (type === 'post') {
      list = list.filter((c) => !c.parentComment?._id);
    } else if (type === 'reply') {
      list = list.filter((c) => !!c.parentComment?._id);
    }

    // Filter by search text
    if (q) {
      list = list.filter((c) => (c.text || '').toLowerCase().includes(q));
    }

    // Sort
    if (commentSort === 'popular') {
      list.sort((a, b) => {
        const aScore = upCount(a) - downCount(a);
        const bScore = upCount(b) - downCount(b);
        if (bScore !== aScore) return bScore - aScore;
        return byDate(b) - byDate(a);
      });
    } else if (commentSort === 'oldest') {
      list.sort((a, b) => byDate(a) - byDate(b));
    } else if (commentSort === 'recent') {
      list.sort((a, b) => byDate(b) - byDate(a));
    }

    return list;
  }, [comments, commentSearch, commentType, commentSort]);

  const derivedStatus = useMemo(() => {
    if (!user) return '';
    const explicit = (user?.status || '').toLowerCase();
    if (explicit === 'banned') return 'Banned';
    const last = mostRecentIso ? new Date(mostRecentIso).getTime() : 0;
    const weekMs = 7 * 24 * 60 * 60 * 1000;
    return last && Date.now() - last <= weekMs ? 'Active' : 'Inactive';
  }, [user, mostRecentIso]);

  // Derive academic year from email code, e.g. 2823 -> 2, 2822 -> 3 (assuming base 2825)
  const yearFromEmail = useMemo(() => {
    const e = user?.email || '';
    const match = e.match(/(\d{4})/);
    if (!match) return 'N/A';
    const code = parseInt(match[1], 10);
    if (isNaN(code)) return 'N/A';
    const year = 2825 - code; // Mapping: 2824->1, 2823->2, 2822->3, 2821->4
    return year >= 1 && year <= 4 ? year : 'N/A';
  }, [user]);

  return (
    <div className="w-full h-full bg-[#FFFFFF]">
      <div className="grid grid-cols-12 w-full">
        <div className="grid col-start-3 col-span-10">
          <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-800">
              <FaArrowLeft className="text-xl cursor-pointer" />
            </Link>
            View User
          </div>

          {/*Make Functional Buttons */}
          <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-4 text-xl ml-5 z-1">
            <button onClick={handleExport} className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Export Data
            </button>
            <Link href={id ? `/admin/users/edit/${id}` : '/admin/users'} className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Edit User
            </Link>
          </div>

          {/* User Info Card */}
          <div className="mt-24 mx-8 rounded-t-lg p-6 bg-white shadow-md flex gap-8 border-b border-[#E5E7EB]">
            <div className="min-h-[200px] min-w-[200px] bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
              {user?.profile_pic ? (
                <img
                  src={urlFor(user.profile_pic).width(200).height(200).fit('crop').url()}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img src="/Default_pfp.jpg" alt="Profile" className="w-1/2 h-1/2 object-contain opacity-80" />
              )}
            </div>

            <div className="flex w-full flex-col gap-4 h-full">
              <div className="h-1/2 justify-between flex">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold text-gray-800">{user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.email : '—'}</div>
                  <div className="text-gray-600">{user?.email || '—'}</div>
                </div>
                <div className={`flex text-[#374151]`}>
                  {(() => {
                    const s = derivedStatus || '—';
                    const lower = s.toLowerCase();
                    const base = 'inline-flex items-center h-1/3 gap-1 px-2 py-0 rounded-sm text-xs font-medium border bg-transparent leading-tight';
                    let cls = 'text-gray-700 border-gray-300';
                    let dot = 'bg-gray-500';
                    if (lower === 'active') { cls = 'text-green-700 border-green-400'; dot = 'bg-green-500'; }
                    else if (lower === 'inactive') { cls = 'text-yellow-700 border-yellow-400'; dot = 'bg-yellow-500'; }
                    else if (lower === 'banned') { cls = 'text-red-700 border-red-400'; dot = 'bg-red-500'; }
                    return (
                      <div className={`${base} ${cls}`}>
                        <span className={`w-1 h-1 rounded-[2px] ${dot}`}></span>
                        <span className="tracking-normal">{s}</span>
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="h-1/2 flex justify-between px-20">
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-[#374151] text-2xl font-bold">{posts.length}</div>
                  <div className="text-xl text-[#374151]">Posts</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-[#2563EB] text-2xl font-bold">{comments.length}</div>
                  <div className="text-xl text-[#2563EB]">Comments</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mx-8 px-4 bg-white shadow-md flex gap-8 border-[#E5E7EB] border-b-2">
            <div className="bg-gray flex gap-4 px-2 pt-2 rounded-lg mt-2">
              {categories.map(({ label, value }) => {
                const isSelected = selectedCategory === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedCategory(value)}
                    className={`flex-col flex gap-2 cursor-pointer ${
                      isSelected
                        ? "border-[#2563EB] border-b-3 text-[#2563EB] pb-1"
                        : "border-0 text-[#374151]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
              
          {selectedCategory === "overview" && (
                <>
                <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md flex gap-8 border-[#E5E7EB] border-b-2">
                    <div className="w-full grid gird-cols-2 flex-col gap-8">
                        <div className="col-start-1 col-span-1 flex-col flex gap-4">
                            <div className="text-2xl font-bold text-gray-800">
                            Personal Information
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Major
                                </div>
                                <div className="text-black">
                                    {user?.major || 'N/A'}
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Year
                                </div>
                                <div className="text-black">
                                    {yearFromEmail}
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Join Date
                                </div>
                                <div className="text-black">
                                    {user?._createdAt ? new Date(user._createdAt).toLocaleDateString() : 'N/A'}
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Role
                                </div>
                                <div className="text-black">
                                    {user?.role || 'N/A'}
                                </div>
                            </div>

                        </div>

                        <div className="col-start-2 col-span-1 flex-col flex gap-4">
                            <div className="text-2xl font-bold text-gray-800">
                                Contact Information
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Email
                                </div>
                                <div className="text-black">
                                    {user?.email || 'N/A'}
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Phone
                                </div>
                                <div className="text-black">
                                    N/A
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 gap-4 flex-col flex">
                            <div className="text-2xl font-bold text-gray-800">
                                Bio
                            </div>
                            <div className="text-xl text-gray-600 whitespace-pre-wrap">
                                {user?.bio || 'N/A'}
                            </div>
                        </div>

                    </div>
                </div>
                </>
          )}

          {(selectedCategory === "posts") && (
            <>
              <div className="mx-8 px-6 py-4 bg-white shadow-md border-[#E5E7EB]">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-4 flex-wrap w-full">

                      {/* Search Input */}
                      <div className="relative w-1/4">
                        <input
                          type="text"
                          value={postSearch}
                          onChange={(e) => setPostSearch(e.target.value)}
                          placeholder="Search"
                          className="w-full pl-3 pr-4 py-2 rounded-lg border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Categories */}
                      <div className="">
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                value={postCategory}
                                onChange={(e) => setPostCategory(e.target.value)}
                            >
                                <option value="allcategories">All Categories</option>
                                <option value="qna">Q&A</option>
                                <option value="lesson">Lesson</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <div className="relative">
                            <select
                                id="state"
                                name="state"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                value={postSort}
                                onChange={(e) => setPostSort(e.target.value)}
                            >
                                <option value="popular">Popular</option>
                                <option value="oldest">Oldest</option>
                                <option value="recent">Recent</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </>
          )}

          {selectedCategory === "comments" && (
            <>
              <div className="mx-8 px-6 py-4 bg-white shadow-md border-[#E5E7EB]">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-4 flex-wrap w-full">

                      {/* Search Input */}
                      <div className="relative w-1/4">
                        <input
                          type="text"
                          value={commentSearch}
                          onChange={(e) => setCommentSearch(e.target.value)}
                          placeholder="Search comments"
                          className="w-full pl-3 pr-4 py-2 rounded-lg border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Type Filter */}
                      <div className="">
                        <div className="relative">
                            <select
                                id="commentType"
                                name="commentType"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                value={commentType}
                                onChange={(e) => setCommentType(e.target.value)}
                            >
                                <option value="all">All</option>
                                <option value="post">Comments on Post</option>
                                <option value="reply">Replies to Comment</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <div className="relative">
                            <select
                                id="commentSort"
                                name="commentSort"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                value={commentSort}
                                onChange={(e) => setCommentSort(e.target.value)}
                            >
                                <option value="recent">Recent</option>
                                <option value="popular">Popular</option>
                                <option value="oldest">Oldest</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </>
          )}

          {selectedCategory === "posts" && (
            <>
              <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md border-b-2 border-[#E5E7EB]">

                {/* Post Map  */}
                <div className="flex w-full flex-col bg-[#F9FAFB] p-4 gap-2">
                  {filteredPosts.length === 0 && <div className="text-gray-500">No posts</div>}
                  {filteredPosts.map((p) => {
                    const created = p.createdAt || p._createdAt;
                    return (
                      <div key={p._id} className="rounded-lg flex flex-col gap-2 w-full bg-white p-3 border border-gray-200">
                        <div className="flex justify-between">
                          <div className="flex flex-col gap-1">
                            <div className="text-black font-bold text-lg">{p.title || 'Untitled'}</div>
                            <div className="text-[#6B7280] text-sm">
                              {created ? formatDistanceToNow(new Date(created), { addSuffix: true }) : '—'}
                            </div>
                          </div>
                          <div className="gap-2 flex items-center shrink-0">
                            <div className="text-[#374151] text-md bg-[#F3F4F6] py-1 px-3 rounded-3xl">
                              {p.typePost || '—'}
                            </div>
                          </div>
                        </div>
                        {p.text && (
                          <div className="text-gray-800">
                            {p.text}
                          </div>
                        )}
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Upvotes: {Array.isArray(p.upvote) ? p.upvote.length : 0}</span>
                          <span>Downvotes: {Array.isArray(p.downvote) ? p.downvote.length : 0}</span>
                          <span>Comments: {typeof p.commentCount === 'number' ? p.commentCount : 0}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {selectedCategory === "comments" && (
            <>
              <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md border-b-2 border-[#E5E7EB]">

                {/* Comment Map  */}
                <div className="flex w-full flex-col bg-[#F9FAFB] p-4 gap-2">
                  {filteredComments.length === 0 && <div className="text-gray-500">No comments</div>}
                  {filteredComments.map((c) => {
                    const created = c.createdAt || c._createdAt;
                    return (
                      <div key={c._id} className="rounded-lg flex flex-col gap-2 w-full bg-white p-3 border border-gray-200">
                        <div className="flex justify-between items-start">
                          <div className="text-[#6B7280] text-sm">
                            {created ? formatDistanceToNow(new Date(created), { addSuffix: true }) : '—'}
                          </div>
                          <div className="text-xs text-[#374151] bg-[#F3F4F6] px-2 py-1 rounded-md">
                            {c.parentComment?._id
                              ? `Reply to comment: "${(c.parentComment.text || '').slice(0, 40)}${(c.parentComment.text || '').length > 40 ? '…' : ''}"`
                              : `Comment on post: "${(c.post?.title || 'Untitled').slice(0, 40)}${(c.post?.title || '').length > 40 ? '…' : ''}"`}
                          </div>
                        </div>
                        <div className="text-gray-800">{c.text}</div>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>Upvotes: {Array.isArray(c.upvote) ? c.upvote.length : 0}</span>
                          <span>Downvotes: {Array.isArray(c.downvote) ? c.downvote.length : 0}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
