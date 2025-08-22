'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useSession } from "next-auth/react";
import { useParams } from 'next/navigation';
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

// Standalone recursive comment component to avoid remounts on each parent render
function CommentNode({
  c,
  depth = 0,
  getReplies,
  replyOpen,
  replyText,
  replySubmitting,
  userEmail,
  currentUserId,
  formatDate,
  toggleReply,
  toggleThread,
  threadCollapsed,
  onChangeReply,
  onAddReply,
  onVote,
  onDelete,
}) {
  const replies = getReplies(c._id);
  const defaultCollapsed = depth >= 2;
  const isCollapsed = (threadCollapsed && Object.prototype.hasOwnProperty.call(threadCollapsed, c._id))
    ? threadCollapsed[c._id]
    : defaultCollapsed;

  return (
    <div className={`border border-gray-200 rounded-md p-3 bg-white text-black ${depth > 0 ? 'ml-4' : ''}`}>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        {c?.author?.username || c?.author?.email || 'Anonymous'}
        <span>•</span>
        <span>{formatDate(c?.createdAt)}</span>
        {replies.length > 0 && (
          <span className="ml-2 inline-flex items-center text-xs text-gray-500">{replies.length} repl{replies.length === 1 ? 'y' : 'ies'}</span>
        )}
      </div>
      <div className="mt-1">
        {c?.text === '[deleted]' ? (
          <span className="text-gray-500 italic">deleted</span>
        ) : (
          c?.text
        )}
      </div>
      <div className="mt-2 text-sm flex flex-wrap items-center gap-3">
        <button onClick={() => toggleReply(c._id)} className="text-blue-600 hover:underline">
          {replyOpen[c._id] ? 'Cancel' : 'Reply'}
        </button>
        {/* Comment votes */}
        <div className="flex items-center gap-4 text-gray-600">
          <button
            onClick={() => onVote(c._id, 'upvote')}
            className={`flex items-center gap-1 cursor-pointer hover:opacity-80 ${Array.isArray(c.upvote) && userEmail && c.upvote.includes(userEmail) ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <FontAwesomeIcon icon={faCircleUp} />
            <span className="text-xs">{Array.isArray(c.upvote) ? c.upvote.length : 0}</span>
          </button>
          <button
            onClick={() => onVote(c._id, 'downvote')}
            className={`flex items-center gap-1 cursor-pointer hover:opacity-80 ${Array.isArray(c.downvote) && userEmail && c.downvote.includes(userEmail) ? 'text-red-600' : 'text-gray-600'}`}
          >
            <FontAwesomeIcon icon={faCircleDown} />
            <span className="text-xs">{Array.isArray(c.downvote) ? c.downvote.length : 0}</span>
          </button>
        </div>
        {/* Delete (only for owner) */}
        {c?.author?._id === currentUserId && (
          <button
            onClick={() => onDelete(c._id)}
            className="text-blue-600 underline cursor-pointer bg-transparent p-0"
          >
            Delete
          </button>
        )}
        {replies.length > 0 && (
          <button onClick={() => toggleThread(c._id, defaultCollapsed)} className="ml-3 text-gray-600 hover:underline">
            {isCollapsed ? `Show replies (${replies.length})` : 'Hide replies'}
          </button>
        )}
      </div>

      {replyOpen[c._id] && (
        <div className="mt-2 flex items-center gap-2">
          <input
            type="text"
            value={replyText[c._id] || ''}
            onChange={(e) => onChangeReply(c._id, e.target.value)}
            placeholder={userEmail ? 'Write a reply...' : 'Log in to reply'}
            disabled={!userEmail || replySubmitting[c._id]}
            className="flex-1 bg-white text-black border border-gray-300 rounded-md px-3 py-2 outline-none"
            autoFocus={replyOpen[c._id] === true}
          />
          <button
            onClick={() => onAddReply(c._id)}
            disabled={!userEmail || replySubmitting[c._id] || !(replyText[c._id] || '').trim()}
            className={`px-3 py-2 rounded-md text-white ${(!userEmail || replySubmitting[c._id] || !(replyText[c._id] || '').trim()) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {replySubmitting[c._id] ? 'Posting...' : 'Reply'}
          </button>
        </div>
      )}

      {replies.length > 0 && !isCollapsed && (
        <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200">
          {replies.map((child) => (
            <CommentNode
              key={child._id}
              c={child}
              depth={(depth || 0) + 1}
              getReplies={getReplies}
              replyOpen={replyOpen}
              replyText={replyText}
              replySubmitting={replySubmitting}
              userEmail={userEmail}
              currentUserId={currentUserId}
              formatDate={formatDate}
              toggleReply={toggleReply}
              toggleThread={toggleThread}
              threadCollapsed={threadCollapsed}
              onChangeReply={onChangeReply}
              onAddReply={onAddReply}
              onVote={onVote}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

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

const PostPage = () => {
  const { data: session } = useSession();
  const userEmail = session?.user?.email || null;

  const [datum, setDatum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Reply UI state
  const [replyText, setReplyText] = useState({});
  const [replyOpen, setReplyOpen] = useState({});
  const [replySubmitting, setReplySubmitting] = useState({});
  // Thread collapse state (per comment id)
  const [threadCollapsed, setThreadCollapsed] = useState({});
  // Session user profile from Sanity
  const [sessionUser, setSessionUser] = useState(null);
  // Delete confirmation modal
  const [confirmModal, setConfirmModal] = useState({ open: false, commentId: null, loading: false, error: '', requireLogin: false });

  // Optional: refs for future use (not required for stable focus)
  const replyInputRefs = useRef({});

  // Params from Next.js App Router (client-side)
  const routeParams = useParams();
  const { id } = routeParams || {};

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

  // Fetch session user's profile (id, username) from Sanity by email
  useEffect(() => {
    if (!session?.user?.email) return;
    const run = async () => {
      try {
        const user = await client.fetch(
          `*[_type == "user" && email == $email][0]{ _id, username, email }`,
          { email: session.user.email }
        );
        setSessionUser(user || null);
      } catch (e) {
        console.error('Fetch session user error:', e);
      }
    };
    run();
  }, [session?.user?.email]);

  const handleAddReply = async (parentCommentId) => {
    if (!userEmail) {
      alert('Please log in to comment.');
      return;
    }
    const text = (replyText[parentCommentId] || '').trim();
    if (!text) return;
    try {
      setReplySubmitting((prev) => ({ ...prev, [parentCommentId]: true }));
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, text, userEmail, parentCommentId }),
      });
      if (!res.ok) throw new Error('Failed to add reply');
      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setReplyText((prev) => ({ ...prev, [parentCommentId]: '' }));
      setReplyOpen((prev) => ({ ...prev, [parentCommentId]: false }));
    } catch (err) {
      console.error('Add reply error:', err);
    } finally {
      setReplySubmitting((prev) => ({ ...prev, [parentCommentId]: false }));
    }
  };

  const toggleReply = (commentId) => {
    setReplyOpen((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const toggleThread = (commentId, defaultCollapsed) => {
    setThreadCollapsed((prev) => {
      const current = prev[commentId] ?? defaultCollapsed ?? false;
      return { ...prev, [commentId]: !current };
    });
  };

  // Helper: derive replies for a given parent without using hooks
  const getReplies = (parentId) =>
    comments.filter(
      (c) => c?.parentComment && (c.parentComment._ref === parentId || c.parentComment._id === parentId)
    );

  // Handlers for child component
  const onChangeReply = (commentId, value) => {
    setReplyText((prev) => ({ ...prev, [commentId]: value }));
  };

  // Vote on comment/reply
  const handleCommentVote = async (commentId, action) => {
    if (!userEmail) {
      alert('Please log in to vote.');
      return;
    }
    try {
      const res = await fetch('/api/commentVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId, userEmail, action }),
      });
      if (!res.ok) throw new Error('Vote failed');
      const updated = await res.json();
      // Replace the updated comment in local state
      setComments((prev) => prev.map((c) => (c._id === updated._id ? { ...c, ...updated } : c)));
    } catch (err) {
      console.error('Comment vote error:', err);
    }
  };

  // Open confirmation modal
  const handleDeleteComment = (commentId) => {
    // Open modal. If not logged in, show a login-required message.
    setConfirmModal({ open: true, commentId, loading: false, error: '', requireLogin: !userEmail });
  };

  // Confirm delete from modal
  const confirmDelete = async () => {
    if (!confirmModal.commentId) return;
    if (confirmModal.requireLogin) {
      // Close if login required; user cannot proceed
      setConfirmModal({ open: false, commentId: null, loading: false, error: '', requireLogin: false });
      return;
    }
    try {
      setConfirmModal((prev) => ({ ...prev, loading: true, error: '' }));
      const res = await fetch('/api/commentDelete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commentId: confirmModal.commentId, userEmail }),
      });
      if (!res.ok) {
        let msg = 'Delete failed';
        try {
          const err = await res.json();
          if (err?.error) msg = err.error;
        } catch {}
        throw new Error(msg);
      }
      const data = await res.json();
      if (data?.softDeleted) {
        setComments((prev) => prev.map((c) => (c._id === confirmModal.commentId ? { ...c, text: '[deleted]' } : c)));
      } else {
        const toRemove = new Set([data.deletedId, ...(data.deletedReplies || [])]);
        setComments((prev) => prev.filter((c) => !toRemove.has(c._id)));
      }
      setConfirmModal({ open: false, commentId: null, loading: false, error: '', requireLogin: false });
    } catch (err) {
      console.error('Delete comment error:', err);
      setConfirmModal((prev) => ({ ...prev, loading: false, error: err?.message || 'Delete failed' }));
    }
  };

  const closeConfirm = () => setConfirmModal({ open: false, commentId: null, loading: false, error: '', requireLogin: false });

  // Load comments for this post
  useEffect(() => {
    if (!id) return;
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(`/api/getCommentsForPost?postId=${id}`);
        if (!res.ok) throw new Error('Error fetching comments');
        const data = await res.json();
        setComments(Array.isArray(data?.comments) ? data.comments : []);
      } catch (err) {
        console.error('Comments fetch error:', err);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!userEmail) {
      alert('Please log in to comment.');
      return;
    }
    if (!newComment.trim()) return;
    try {
      setSubmitting(true);
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, text: newComment.trim(), userEmail }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch (err) {
      console.error('Add comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

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
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white text-black w-full">
        <div className="col-span-12 flex justify-end w-full items-center gap-2 p-4 shadow-md fixed z-1 bg-white">
          <Link href="/homepage" className="text-blue-500 flex items-center gap-2">
            ←Back
            <img src="/favicon.ico" alt="Logo" className="max-w-10 max-h-10" />
          </Link>
        </div>
        
        {/* Left: Images + files */}
        <div className="col-span-12 md:col-span-7 mt-6 md:mt-10 lg:sticky lg:top-24 lg:self-start">
          <div id="post" className="">
            {allImages.length > 0 && (
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Image */}
                <div className="w-full h-64 md:h-[400px] flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
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
                  className="absolute top-1/2 left-2 md:left-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setImageIndex((prev) => (prev + 1) % allImages.length)}
                  className="absolute top-1/2 right-2 md:right-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <ChevronRight size={20} />
                </button>
                <div>
                  <p className="text-center text-gray-500 mt-2">
                    {imageIndex + 1} / {allImages.length}
                  </p>
                </div>
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
              <div>
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

          {/* Right: Author + pitch + actions + comments */}
          <div className="col-span-12 md:col-span-4 md:col-start-9 mt-6 md:mt-20 shadow-md p-4 rounded-lg">
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
              <div className="flex">
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
            {session?.user?.image && (
              <Image
                src={session.user.image}
                alt={sessionUser?.username || session?.user?.email || 'User'}
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col w-full">
              <p>{sessionUser?.username || session?.user?.email || "Cannot Fetch" }</p>
            </div>
          </div>

          {/* Render root comments recursively */}
            {comments
              .filter((c) => !c.parentComment)
              .map((c) => (
                <CommentNode
                  key={c._id}
                  c={c}
                  depth={0}
                  getReplies={getReplies}
                  replyOpen={replyOpen}
                  replyText={replyText}
                  replySubmitting={replySubmitting}
                  userEmail={userEmail}
                  currentUserId={sessionUser?._id}
                  formatDate={formatDate}
                  toggleReply={toggleReply}
                  toggleThread={toggleThread}
                  threadCollapsed={threadCollapsed}
                  onChangeReply={onChangeReply}
                  onAddReply={handleAddReply}
                  onVote={handleCommentVote}
                  onDelete={handleDeleteComment}
                />
              ))}
          </div>

          {/* Modal overlay and dialog (keep inside the main root) */}
          {confirmModal.open && (
            <div className="fixed inset-0 z-40 bg-blue-500/30 backdrop-blur-md"></div>
          )}
          {confirmModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white text-black w-full max-w-md rounded-lg shadow-xl p-5">
                <h3 className="text-lg font-semibold">Delete comment?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {confirmModal.requireLogin ? 'Please log in to delete your comment.' : 'Replies to it will also be removed.'}
                </p>
                {confirmModal.error && (
                  <div className="mt-3 text-sm text-red-600">{confirmModal.error}</div>
                )}
                <div className="mt-5 flex justify-end gap-2">
                  <button
                    onClick={closeConfirm}
                    disabled={confirmModal.loading}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    disabled={confirmModal.loading}
                    className={`px-4 py-2 rounded-md text-white ${confirmModal.requireLogin ? 'bg-gray-400' : (confirmModal.loading ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700')}`}
                  >
                    {confirmModal.requireLogin ? 'Close' : (confirmModal.loading ? 'Deleting...' : 'Delete')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

export default PostPage;
