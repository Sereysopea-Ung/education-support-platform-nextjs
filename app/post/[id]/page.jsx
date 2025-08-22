'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { useSession } from "next-auth/react";
import { useParams, useRouter } from 'next/navigation';
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
  onEdit,
  onReport,
}) {
  const replies = getReplies(c._id);
  const defaultCollapsed = true;
  const isCollapsed = (threadCollapsed && Object.prototype.hasOwnProperty.call(threadCollapsed, c._id))
    ? threadCollapsed[c._id]
    : defaultCollapsed;

  const displayName = c?.author?.username || c?.author?.email || 'Anonymous';
  const authorPfpUrl = c?.author?.profile_pic
    ? urlFor(c.author.profile_pic).width(20).height(20).url()
    : (c?.author?.image || null);
  const authorInitial = (displayName?.[0] || 'A').toUpperCase();

  // 3-dot menu state and outside-click handling
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const onDocClick = (e) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    if (menuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [menuOpen]);

  const isOwner = !!(c?.author?._id && c.author._id === currentUserId);

  // Edit state
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(c?.text || '');
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState('');
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [removeAttachment, setRemoveAttachment] = useState(false);

  useEffect(() => {
    // Keep in sync if comment updates outside
    if (!editMode) setEditValue(c?.text || '');
  }, [c?.text, editMode]);

  const startEdit = () => {
    setMenuOpen(false);
    setEditError('');
    setEditValue(c?.text || '');
    setEditImageFile(null);
    if (editImagePreview) { try { URL.revokeObjectURL(editImagePreview); } catch {}
    setEditImagePreview(null); }
    setRemoveAttachment(false);
    setEditMode(true);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditError('');
    setEditValue(c?.text || '');
    setRemoveAttachment(false);
    if (editImagePreview) { try { URL.revokeObjectURL(editImagePreview); } catch {} }
    setEditImagePreview(null);
    setEditImageFile(null);
  };

  const saveEdit = async () => {
    const newText = (editValue || '').trim();
    if (!newText) {
      setEditError('Text cannot be empty.');
      return;
    }
    try {
      setEditLoading(true);
      setEditError('');
      let attachmentUrl = undefined;
      let attachmentType = undefined;
      let remove = false;
      // If new image picked, upload to Cloudinary
      if (editImageFile) {
        const form = new FormData();
        form.append('file', editImageFile);
        form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const resUp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: form });
        const dataUp = await resUp.json();
        if (!resUp.ok || !dataUp?.secure_url) {
          throw new Error('Image upload failed');
        }
        attachmentUrl = dataUp.secure_url;
        attachmentType = 'image';
        remove = false;
      } else if (removeAttachment) {
        remove = true;
      }

      await onEdit(c._id, newText, { attachmentUrl, attachmentType, removeAttachment: remove });
      setEditMode(false);
    } catch (e) {
      setEditError(e?.message || 'Failed to edit');
    } finally {
      setEditLoading(false);
    }
  };

  const onEditImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    // Only allow image types by mime
    if (!file.type.startsWith('image/')) {
      setEditError('Please choose an image file.');
      return;
    }
    if (editImagePreview) { try { URL.revokeObjectURL(editImagePreview); } catch {} }
    setRemoveAttachment(false);
    setEditImageFile(file);
    setEditImagePreview(URL.createObjectURL(file));
  };

  return (
    <div id={`c_${c._id}`} className={`border border-gray-200 rounded-md p-3 bg-white text-black mt-3 ${depth > 0 ? 'ml-4' : ''}`}>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center gap-2">
          {authorPfpUrl ? (
          <img
            src={authorPfpUrl}
            alt={displayName}
            className="w-5 h-5 rounded-full object-cover"
            width={20}
            height={20}
          />
          ) : (
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white">
            {authorInitial}
          </div>
          )}
          {displayName}
          <span>•</span>
          <span>{formatDate(c?.createdAt)}</span>
          {replies.length > 0 && (
            <span className="ml-2 inline-flex items-center text-xs text-gray-500">{replies.length} repl{replies.length === 1 ? 'y' : 'ies'}</span>
          )}
        </div>
        {c?.text !== '[deleted]' && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              aria-label="More options"
              className="px-2 py-1 rounded hover:bg-gray-100"
              onClick={() => setMenuOpen((v) => !v)}
            >
              •••
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                {isOwner ? (
                  <>
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                      onClick={startEdit}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      onClick={() => { onDelete(c._id); setMenuOpen(false); }}
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <button
                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
                    onClick={() => { setMenuOpen(false); onReport && onReport('comment', c._id); }}
                  >
                    Report
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-1">
        {c?.text === '[deleted]' ? (
          <span className="text-gray-500 italic">[deleted]</span>
        ) : editMode ? (
          <div className="space-y-2">
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-white text-black border border-gray-300 rounded-md p-2 outline-none"
              rows={3}
              disabled={editLoading}
              autoFocus
            />
            {/* Current or new image preview and controls */}
            <div className="space-y-2">
              {/* Preview existing image if any and not removed, and no new image selected */}
              {!editImagePreview && c?.attachmentType === 'image' && c?.attachmentUrl && !removeAttachment && (
                <div className="flex items-start gap-3">
                  <img src={c.attachmentUrl} alt="Current" className="max-h-32 w-auto rounded border" />
                  <div className="flex flex-col gap-2">
                    <label className="inline-block">
                      <span className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Change image</span>
                      <input type="file" accept="image/*" className="hidden" onChange={onEditImageChange} disabled={editLoading} />
                    </label>
                    <button type="button" onClick={() => { setRemoveAttachment(true); setEditImageFile(null); if (editImagePreview) { try { URL.revokeObjectURL(editImagePreview); } catch {} } setEditImagePreview(null); }} disabled={editLoading} className="px-3 py-1 rounded-md border border-gray-300 text-red-600 hover:bg-red-50">Remove image</button>
                  </div>
                </div>
              )}
              {/* Preview newly selected image */}
              {editImagePreview && (
                <div className="flex items-start gap-3">
                  <img src={editImagePreview} alt="Preview" className="max-h-32 w-auto rounded border" />
                  <div className="flex flex-col gap-2">
                    <label className="inline-block">
                      <span className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Choose different</span>
                      <input type="file" accept="image/*" className="hidden" onChange={onEditImageChange} disabled={editLoading} />
                    </label>
                    <button type="button" onClick={() => { if (editImagePreview) { try { URL.revokeObjectURL(editImagePreview); } catch {} } setEditImagePreview(null); setEditImageFile(null); }} disabled={editLoading} className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Clear selection</button>
                  </div>
                </div>
              )}
              {/* If no existing image and no new preview, show add control */}
              {!editImagePreview && !(c?.attachmentType === 'image' && c?.attachmentUrl) && !removeAttachment && (
                <label className="inline-block">
                  <span className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer">Add image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={onEditImageChange} disabled={editLoading} />
                </label>
              )}
              {/* If there was a non-image attachment, allow removal only */}
              {c?.attachmentUrl && c?.attachmentType === 'file' && !editImagePreview && !removeAttachment && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">This comment has a file attached.</span>
                  <button type="button" onClick={() => setRemoveAttachment(true)} disabled={editLoading} className="px-2 py-1 rounded-md border border-gray-300 text-red-600 hover:bg-red-50">Remove file</button>
                </div>
              )}
              {removeAttachment && (
                <div className="text-xs text-red-600">Attachment will be removed.</div>
              )}
            </div>
            {editError ? <div className="text-sm text-red-600">{editError}</div> : null}
            <div className="flex gap-2">
              <button
                onClick={saveEdit}
                disabled={editLoading}
                className={`px-3 py-1 rounded-md text-white ${editLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {editLoading ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={cancelEdit}
                disabled={editLoading}
                className="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          c?.text
        )}
      </div>
      {/* Attachment (image or file) */}
      {c?.attachmentUrl && (
        <div className="mt-2">
          {c?.attachmentType === 'image' ? (
            <img
              src={c.attachmentUrl}
              alt="Comment attachment"
              className="max-h-40 w-auto h-auto max-w-full rounded-md border border-gray-200 object-contain"
            />
          ) : (
            <a
              href={c.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline break-all"
              download
            >
              {c.attachmentUrl.split('/').pop() || 'Download file'}
            </a>
          )}
        </div>
      )}
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
              onEdit={handleEditComment}
              onReport={onReport}
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
  const router = useRouter();

  const [datum, setDatum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  // New comment: allow only one attachment (either an image or a file)
  const [commentImageFile, setCommentImageFile] = useState(null);
  const [commentFile, setCommentFile] = useState(null);
  const [commentImagePreview, setCommentImagePreview] = useState(null);
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
  // Comment sorting: 'popular' | 'recent' | 'oldest'
  const [commentSort, setCommentSort] = useState('popular');

  // Report modal state
  const [reportModal, setReportModal] = useState({
    open: false,
    targetType: null, // 'post' | 'comment'
    targetId: null,
    reason: '',
    description: '',
    loading: false,
    error: '',
    success: false,
  });

  const reportReasons = [
    { value: 'spam', title: 'Spam', desc: 'Unwanted commercial content or repetitive posts' },
    { value: 'harassment', title: 'Harassment or Bullying', desc: 'Targeting individuals with harmful content' },
    { value: 'hate_speech', title: 'Hate Speech', desc: 'Content that promotes hatred against groups' },
    { value: 'violence', title: 'Violence or Threats', desc: 'Content that threatens or promotes violence' },
    { value: 'false_info', title: 'False Information', desc: 'Misleading or factually incorrect content' },
    { value: 'inappropriate', title: 'Inappropriate Content', desc: 'Content not suitable for this platform' },
    { value: 'copyright', title: 'Copyright Violation', desc: 'Unauthorized use of copyrighted material' },
    { value: 'other', title: 'Other', desc: 'Something else not listed above' },
  ];

  // Edit post modal state and helpers
  const [editPostModal, setEditPostModal] = useState({
    open: false,
    pitch: '',
    images: [],
    files: [],
    newImageFiles: [],
    newFiles: [],
    imagePreviews: [],
    selectedMajors: [],
    selectedSubjects: [],
    selectedOption: 'Q&A',
    loading: false,
    error: '',
    success: false,
  });

  const availableMajors = [
    'ITE','IT','SCA','TEED','BIOE','Biology','Math','Physics','English','DMC','Chemistry','Chinese','Sociology'
  ];
  const availableSubjects = [
    'Linear Algebra','Database','Artificial Intelligence','English','Calculus','C++','JAVA','Computer Fundamental','Label'
  ];

  const openEditPost = () => {
    setPostMenuOpen(false);
    setEditPostModal((p) => ({
      ...p,
      open: true,
      pitch: datum?.pitch || '',
      images: Array.isArray(datum?.images) ? datum.images : [],
      files: Array.isArray(datum?.files) ? datum.files : [],
      selectedMajors: Array.isArray(datum?.major) ? datum.major : [],
      selectedSubjects: Array.isArray(datum?.subject) ? datum.subject : [],
      selectedOption: typeof datum?.typePost === 'string' && datum.typePost ? datum.typePost : 'Q&A',
      newImageFiles: [],
      newFiles: [],
      imagePreviews: [],
      loading: false,
      error: '',
      success: false,
    }));
  };

  const closeEditPost = () => {
    try { editPostModal.imagePreviews.forEach((u) => URL.revokeObjectURL(u)); } catch {}
    setEditPostModal((p) => ({ ...p, open: false, imagePreviews: [], newImageFiles: [], newFiles: [], loading: false, error: '', success: false }));
  };

  const onEditAddImages = (e) => {
    const files = e?.target?.files;
    if (!files?.length) return;
    const arr = Array.from(files).filter((f) => f.type.startsWith('image/'));
    const previews = arr.map((f) => URL.createObjectURL(f));
    setEditPostModal((p) => ({ ...p, newImageFiles: [...p.newImageFiles, ...arr], imagePreviews: [...p.imagePreviews, ...previews] }));
  };
  const onEditAddFiles = (e) => {
    const files = e?.target?.files;
    if (!files?.length) return;
    const arr = Array.from(files).filter((f) => !f.type.startsWith('image/'));
    setEditPostModal((p) => ({ ...p, newFiles: [...p.newFiles, ...arr] }));
  };
  const removeExistingImage = (url) => setEditPostModal((p) => ({ ...p, images: p.images.filter((u) => u !== url) }));
  const removeExistingFile = (url) => setEditPostModal((p) => ({ ...p, files: p.files.filter((u) => u !== url) }));
  const removeNewImage = (idx) => setEditPostModal((p) => {
    const previews = [...p.imagePreviews];
    const files = [...p.newImageFiles];
    const toRevoke = previews[idx];
    previews.splice(idx, 1);
    files.splice(idx, 1);
    try { if (toRevoke) URL.revokeObjectURL(toRevoke); } catch {}
    return { ...p, imagePreviews: previews, newImageFiles: files };
  });
  const removeNewFile = (file) => setEditPostModal((p) => ({ ...p, newFiles: p.newFiles.filter((f) => f !== file) }));
  const toggleMajor = (m) => setEditPostModal((p) => ({ ...p, selectedMajors: p.selectedMajors.includes(m) ? p.selectedMajors.filter((x) => x !== m) : (p.selectedMajors.length < 2 ? [...p.selectedMajors, m] : p.selectedMajors) }));
  const toggleSubject = (s) => setEditPostModal((p) => ({ ...p, selectedSubjects: p.selectedSubjects.includes(s) ? p.selectedSubjects.filter((x) => x !== s) : (p.selectedSubjects.length < 2 ? [...p.selectedSubjects, s] : p.selectedSubjects) }));

  const saveEditPost = async () => {
    if (!datum?._id) return;
    if (!userEmail) { setEditPostModal((p) => ({ ...p, error: 'Please log in.' })); return; }
    try {
      setEditPostModal((p) => ({ ...p, loading: true, error: '' }));
      const uploadedImageUrls = [];
      for (const f of editPostModal.newImageFiles) {
        const form = new FormData();
        form.append('file', f);
        form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const resUp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: form });
        const dataUp = await resUp.json();
        if (dataUp?.secure_url) uploadedImageUrls.push(dataUp.secure_url);
      }
      const uploadedFileUrls = [];
      for (const f of editPostModal.newFiles) {
        const form = new FormData();
        form.append('file', f);
        form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const resUp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, { method: 'POST', body: form });
        const dataUp = await resUp.json();
        if (dataUp?.secure_url) uploadedFileUrls.push(dataUp.secure_url);
      }
      const nextImages = [...editPostModal.images, ...uploadedImageUrls];
      const nextFiles = [...editPostModal.files, ...uploadedFileUrls];
      const payload = { postId: datum._id, userEmail, pitch: editPostModal.pitch, images: nextImages, files: nextFiles, major: editPostModal.selectedMajors, subject: editPostModal.selectedSubjects, typePost: editPostModal.selectedOption };
      const res = await fetch('/api/postUpdate', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) {
        let msg = 'Failed to update post';
        try { const err = await res.json(); if (err?.error) msg = err.error; } catch {}
        throw new Error(msg);
      }
      setDatum((prev) => ({ ...(prev || {}), pitch: editPostModal.pitch, images: nextImages, files: nextFiles, major: editPostModal.selectedMajors, subject: editPostModal.selectedSubjects, typePost: editPostModal.selectedOption }));
      setEditPostModal((p) => ({ ...p, loading: false, success: true }));
      setTimeout(() => closeEditPost(), 800);
    } catch (e) {
      setEditPostModal((p) => ({ ...p, loading: false, error: e?.message || 'Update failed' }));
    }
  };

  // Post menu (three dots) state
  const [postMenuOpen, setPostMenuOpen] = useState(false);
  const postMenuRef = useRef(null);
  useEffect(() => {
    const onDocClick = (e) => {
      if (!postMenuRef.current) return;
      if (!postMenuRef.current.contains(e.target)) setPostMenuOpen(false);
    };
    if (postMenuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [postMenuOpen]);

  const isPostOwner = !!(
    (sessionUser?.email && datum?.author?.email && sessionUser.email === datum.author.email) ||
    (sessionUser?._id && datum?.author?._id && sessionUser._id === datum.author._id)
  );

  const handleDeletePost = async () => {
    if (!datum?._id) return;
    if (!userEmail) {
      alert('Please log in to delete your post.');
      return;
    }
    try {
      const res = await fetch('/api/postDelete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: datum._id, userEmail }),
      });
      if (!res.ok) {
        let msg = 'Failed to delete post';
        try { const err = await res.json(); if (err?.error) msg = err.error; } catch {}
        throw new Error(msg);
      }
      alert('Post deleted successfully');
      router.push('/homepage');
    } catch (e) {
      alert(e?.message || 'Failed to delete post');
    }
  };

  // Report handlers (PostPage scope)
  const onReport = (targetType, targetId) => {
    if (!userEmail) {
      setReportModal({ open: true, targetType, targetId, reason: '', description: '', loading: false, error: 'Please log in to report.', success: false });
      return;
    }
    setReportModal({ open: true, targetType, targetId, reason: '', description: '', loading: false, error: '', success: false });
  };

  const closeReport = () => setReportModal({ open: false, targetType: null, targetId: null, reason: '', description: '', loading: false, error: '', success: false });

  const submitReport = async () => {
    if (!reportModal.reason) {
      setReportModal((p) => ({ ...p, error: 'Please select a reason.' }));
      return;
    }
    if (!userEmail) {
      setReportModal((p) => ({ ...p, error: 'Please log in to report.' }));
      return;
    }
    try {
      setReportModal((p) => ({ ...p, loading: true, error: '' }));
      const res = await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetId: reportModal.targetId,
          targetType: reportModal.targetType,
          userEmail,
          reason: reportModal.reason,
          description: reportModal.description,
        }),
      });
      if (!res.ok) {
        let msg = 'Failed to submit report';
        try { const err = await res.json(); if (err?.error) msg = err.error; } catch {}
        throw new Error(msg);
      }
      setReportModal((p) => ({ ...p, loading: false, success: true }));
      setTimeout(() => closeReport(), 1200);
    } catch (e) {
      setReportModal((p) => ({ ...p, loading: false, error: e?.message || 'Failed to submit report' }));
    }
  };

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
          `*[_type == "user" && email == $email][0]{ _id, username, email, profile_pic }`,
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
  const hasDirectReplies = (parentId) =>
    comments.some(
      (c) => c?.parentComment && (c.parentComment._ref === parentId || c.parentComment._id === parentId)
    );

  const isLeafDeleted = (c) => c?.text === '[deleted]' && !hasDirectReplies(c._id);

  const sortComparator = (a, b) => {
    const upA = Array.isArray(a.upvote) ? a.upvote.length : 0;
    const upB = Array.isArray(b.upvote) ? b.upvote.length : 0;
    const tA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
    const tB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
    if (commentSort === 'popular') {
      if (upB !== upA) return upB - upA;
      return tB - tA; // tie-breaker: newer first
    }
    if (commentSort === 'recent') return tB - tA;
    return tA - tB; // oldest
  };

  const getReplies = (parentId) =>
    comments
      .filter(
        (c) => c?.parentComment && (c.parentComment._ref === parentId || c.parentComment._id === parentId)
      )
      .filter((c) => !isLeafDeleted(c))
      .sort(sortComparator);

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

  // Edit an existing comment
  const handleEditComment = async (commentId, newText, opts = {}) => {
    if (!userEmail) throw new Error('Please log in to edit.');
    const res = await fetch('/api/comments', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentId,
        userEmail,
        text: newText,
        attachmentUrl: opts.attachmentUrl,
        attachmentType: opts.attachmentType,
        removeAttachment: opts.removeAttachment === true,
      }),
    });
    if (!res.ok) {
      let msg = 'Failed to edit comment';
      try {
        const err = await res.json();
        if (err?.error) msg = err.error;
      } catch {}
      throw new Error(msg);
    }
    const updated = await res.json();
    setComments((prev) => prev.map((c) => (c._id === updated._id ? { ...c, ...updated } : c)));
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
      // Upload attachment if provided
      let attachmentUrl = null;
      let attachmentType = null; // 'image' | 'file'
      if (commentImageFile) {
        const form = new FormData();
        form.append('file', commentImageFile);
        form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const resUp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, { method: 'POST', body: form });
        const dataUp = await resUp.json();
        if (dataUp?.secure_url) {
          attachmentUrl = dataUp.secure_url;
          attachmentType = 'image';
        }
      } else if (commentFile) {
        const form = new FormData();
        form.append('file', commentFile);
        form.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
        const resUp = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, { method: 'POST', body: form });
        const dataUp = await resUp.json();
        if (dataUp?.secure_url) {
          attachmentUrl = dataUp.secure_url;
          attachmentType = 'file';
        }
      }

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: id, text: newComment.trim(), userEmail, attachmentUrl, attachmentType }),
      });
      if (!res.ok) throw new Error('Failed to add comment');
      const created = await res.json();
      setComments((prev) => [...prev, created]);
      setNewComment("");
      setCommentImageFile(null);
      setCommentFile(null);
      if (commentImagePreview) try { URL.revokeObjectURL(commentImagePreview); } catch {}
      setCommentImagePreview(null);
    } catch (err) {
      console.error('Add comment error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  // Attachment handlers for new comment
  const handleCommentImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    // clear file if switching to image
    setCommentFile(null);
    if (commentImagePreview) {
      try { URL.revokeObjectURL(commentImagePreview); } catch {}
    }
    setCommentImageFile(file);
    setCommentImagePreview(URL.createObjectURL(file));
  };

  const handleCommentFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;
    // ignore images here, only non-image files
    setCommentImageFile(null);
    if (commentImagePreview) {
      try { URL.revokeObjectURL(commentImagePreview); } catch {}
    }
    setCommentImagePreview(null);
    setCommentFile(file);
  };

  const clearCommentAttachment = () => {
    setCommentFile(null);
    setCommentImageFile(null);
    if (commentImagePreview) {
      try { URL.revokeObjectURL(commentImagePreview); } catch {}
    }
    setCommentImagePreview(null);
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

  // Prefer Sanity profile_pic (like homepage) then fallback to session image
  const sessionAvatar = sessionUser?.profile_pic
    ? urlFor(sessionUser.profile_pic).width(50).height(50).url()
    : (session?.user?.image || null);

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
        <div className="col-span-12 md:col-span-7 mt-6 md:mt-10 lg:sticky lg:mt-20 lg:self-start">
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
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImageIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
                      }
                      className="absolute top-1/2 left-2 md:left-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setImageIndex((prev) => (prev + 1) % allImages.length)}
                      className="absolute top-1/2 right-2 md:right-[-40px] -translate-y-1/2 bg-black/50 text-white p-2 rounded-full cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                    <div>
                      <p className="text-center text-gray-500 mt-2">
                        {imageIndex + 1} / {allImages.length}
                      </p>
                    </div>
                  </>
                )}
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
                  {comments.length}
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
            <div className="relative" ref={postMenuRef}>
              <button
                type="button"
                aria-label="More options"
                className="px-2 py-1 rounded hover:bg-gray-100"
                onClick={() => setPostMenuOpen((v) => !v)}
              >
                •••
              </button>
              {postMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg z-10 overflow-hidden">
                  {isPostOwner ? (
                    <>
                      <button
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
                        onClick={openEditPost}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        onClick={() => { setPostMenuOpen(false); handleDeletePost(); }}
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <button
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
                      onClick={() => { setPostMenuOpen(false); onReport('post', datum._id); }}
                    >
                      Report
                    </button>
                  )}
                </div>
              )}
            </div>
            
          </div>

          {/* Pitch with expand */}
          <div className="mt-3 flex-col gap-2 w-full flex rounded-2xl p-2 py-2">
            <div
              className={`truncate ${expandedItems[datum._id] ? "whitespace-normal" : ""} `}
            >
              {datum?.pitch}
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
          </div>

          {/* Separator between author/pitch and comments */}
          <div className="mb-4 border-t border-gray-200" />

          {/* Comments section */}
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">Comments</h3>
            <div className="flex items-center gap-2 text-sm">
              <label htmlFor="commentSort" className="text-gray-600">Sort:</label>
              <select
                id="commentSort"
                value={commentSort}
                onChange={(e) => setCommentSort(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 bg-white text-black focus:outline-none"
              >
                <option value="popular">Popular</option>
                <option value="recent">Recent</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* New comment input */}
          <div className="mt-3 w-full border border-gray-300 rounded-md px-3 py-2">
            <div className="flex items-center gap-2 mb-1">
              {sessionAvatar ? (
                <Image
                  src={sessionAvatar}
                  alt={sessionUser?.username || session?.user?.email || 'User'}
                  width={20}
                  height={20}
                  className="rounded-full w-8 h-8 object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-[10px] text-white">
                  {((sessionUser?.username || session?.user?.email || 'U')[0] || 'U').toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-700">{sessionUser?.username || session?.user?.email || 'You'}</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={userEmail ? 'Write a comment...' : 'Log in to comment'}
                disabled={!userEmail || submitting}
                className="flex-1 bg-white text-black outline-none"
              />
              {/* Attachment pickers: only one allowed at a time */}
              <label htmlFor="comment-file-input" className={`hover:cursor-pointer ${commentImageFile ? 'opacity-50 pointer-events-none' : ''}`} title={commentImageFile ? 'Remove image first' : 'Attach file'}>
                <Image src="/file.svg" alt="file" width={20} height={20} />
              </label>
              <input
                id="comment-file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
                onChange={handleCommentFileChange}
                disabled={!userEmail || submitting || !!commentImageFile}
                className="hidden"
              />
              <label htmlFor="comment-image-input" className={`hover:cursor-pointer ${commentFile ? 'opacity-50 pointer-events-none' : ''}`} title={commentFile ? 'Remove file first' : 'Attach image'}>
                <Image src="/image.svg" alt="image" width={20} height={20} />
              </label>
              <input
                id="comment-image-input"
                type="file"
                accept="image/*"
                onChange={handleCommentImageChange}
                disabled={!userEmail || submitting || !!commentFile}
                className="hidden"
              />
              <button
                onClick={handleAddComment}
                disabled={!userEmail || submitting || !newComment.trim()}
                className={`px-4 py-2 rounded-md text-white ${(!userEmail || submitting || !newComment.trim()) ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
              >
                {submitting ? 'Posting...' : 'Post'}
              </button>
            </div>
            {/* Attachment preview */}
            {(commentImagePreview || commentFile) && (
              <div className="mt-2 flex items-center gap-3">
                {commentImagePreview ? (
                  <div className="relative">
                    <img src={commentImagePreview} alt="Preview" className="h-16 w-16 object-cover rounded border" />
                  </div>
                ) : null}
                {commentFile ? (
                  <div className="px-2 py-1 rounded border bg-gray-50 text-xs text-gray-700 break-all">
                    {commentFile.name}
                  </div>
                ) : null}
                <button onClick={clearCommentAttachment} className="text-red-600 text-sm underline">Remove</button>
              </div>
            )}
          </div>

          {/* Render root comments recursively */}
            {comments
              .filter((c) => !c.parentComment)
              .filter((c) => !isLeafDeleted(c))
              .sort(sortComparator)
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
                  onEdit={handleEditComment}
                  onReport={onReport}
                />
              ))}
          </div>

          {/* Modal overlay and dialog (keep inside the main root) */}
          {confirmModal.open && (
            <div className="fixed inset-0 z-40 bg-blue-500/30 backdrop-blur-md"></div>
          )}
          {reportModal.open && (
            <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"></div>
          )}
          {editPostModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/30" onClick={closeEditPost}></div>
              <div className="relative z-10 w-full max-w-2xl bg-white text-black rounded-lg shadow-lg p-4 max-h-[85vh] overflow-auto">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Edit Post</h3>
                  <button onClick={closeEditPost} className="px-2 py-1 rounded hover:bg-gray-100">X</button>
                </div>
                {editPostModal.error ? <div className="text-sm text-red-600 mb-2">{editPostModal.error}</div> : null}
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pitch</label>
                    <textarea value={editPostModal.pitch} onChange={(e) => setEditPostModal((p) => ({ ...p, pitch: e.target.value }))} rows={3} className="w-full p-2 border border-gray-300 rounded" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Images</div>
                    {Array.isArray(editPostModal.images) && editPostModal.images.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        {editPostModal.images.map((url) => (
                          <div key={url} className="relative">
                            <img src={url} alt="image" className="w-full h-auto rounded border" />
                            <button className="absolute top-1 right-1 bg-white/80 px-2 py-0.5 text-red-600 rounded" onClick={() => removeExistingImage(url)}>Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {editPostModal.imagePreviews.length > 0 && (
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        {editPostModal.imagePreviews.map((url, idx) => (
                          <div key={url} className="relative">
                            <img src={url} alt="new" className="w-full h-auto rounded border" />
                            <button className="absolute top-1 right-1 bg-white/80 px-2 py-0.5 text-red-600 rounded" onClick={() => removeNewImage(idx)}>X</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <label className="px-3 py-1 border rounded cursor-pointer">
                        Add images
                        <input type="file" accept="image/*" multiple className="hidden" onChange={onEditAddImages} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Files</div>
                    {Array.isArray(editPostModal.files) && editPostModal.files.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {editPostModal.files.map((url) => (
                          <div key={url} className="flex items-center justify-between border rounded px-2 py-1">
                            <a className="text-blue-600 underline break-all" href={url} target="_blank" rel="noreferrer">{url.split('/').pop() || url}</a>
                            <button className="text-red-600" onClick={() => removeExistingFile(url)}>Remove</button>
                          </div>
                        ))}
                      </div>
                    )}
                    {editPostModal.newFiles.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {editPostModal.newFiles.map((f, idx) => (
                          <div key={idx} className="flex items-center justify-between border rounded px-2 py-1">
                            <span className="break-all text-gray-700">{f.name}</span>
                            <button className="text-red-600" onClick={() => removeNewFile(f)}>X</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                      <label className="px-3 py-1 border rounded cursor-pointer">
                        Add files
                        <input type="file" multiple className="hidden" onChange={onEditAddFiles} />
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Major (max 2)</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {availableMajors.map((m) => (
                        <button key={m} type="button" onClick={() => toggleMajor(m)} className={`px-3 py-1 rounded border ${editPostModal.selectedMajors.includes(m) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{m}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Subject (max 2)</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {availableSubjects.map((s) => (
                        <button key={s} type="button" onClick={() => toggleSubject(s)} className={`px-3 py-1 rounded border ${editPostModal.selectedSubjects.includes(s) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Type</div>
                    <div className="mt-2 flex gap-4 text-sm">
                      <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="typePost" checked={editPostModal.selectedOption === 'Q&A'} onChange={() => setEditPostModal((p) => ({ ...p, selectedOption: 'Q&A' }))} /> Q&A</label>
                      <label className="flex items-center gap-1 cursor-pointer"><input type="radio" name="typePost" checked={editPostModal.selectedOption === 'Lesson'} onChange={() => setEditPostModal((p) => ({ ...p, selectedOption: 'Lesson' }))} /> Lesson</label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  {editPostModal.loading ? <span className="text-blue-600 text-sm">Saving...</span> : null}
                  <button onClick={closeEditPost} className="px-3 py-1 border rounded">Cancel</button>
                  <button onClick={saveEditPost} disabled={editPostModal.loading} className={`px-3 py-1 rounded text-white ${editPostModal.loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>Save</button>
                </div>
              </div>
            </div>
          )}
          {confirmModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white text-black w-full max-w-md rounded-lg shadow-xl p-5">
                <h3 className="text-lg font-semibold">Delete comment?</h3>
                <p className="text-sm text-gray-600 mt-2">
                  {confirmModal.requireLogin ? 'Please log in to delete your comment.' : 'Replies to it will not be removed.'}
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
          {reportModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white text-black w-full max-w-lg rounded-lg shadow-xl p-5">
                <div className="flex items-center gap-2">
                  <span className="text-red-600">⚠️</span>
                  <h3 className="text-lg font-semibold">Report {reportModal.targetType === 'comment' ? 'Comment' : 'Post'}</h3>
                </div>
                <p className="text-sm text-gray-600 mt-1">Help us understand what's wrong. Your report will be reviewed by our moderation team.</p>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Why are you reporting this {reportModal.targetType}?</p>
                  <div className="space-y-2 max-h-72 overflow-auto pr-1">
                    {reportReasons.map((r) => (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setReportModal((p) => ({ ...p, reason: r.value }))}
                        className={`w-full text-left rounded-md border px-3 py-2 ${reportModal.reason === r.value ? 'border-red-400 bg-red-50' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        <div className="font-medium">{r.title}</div>
                        <div className="text-xs text-gray-600">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional details (optional)</label>
                  <textarea
                    value={reportModal.description}
                    onChange={(e) => setReportModal((p) => ({ ...p, description: e.target.value }))}
                    className="w-full bg-white text-black border border-gray-300 rounded-md p-2 outline-none"
                    rows={3}
                    placeholder="Provide any additional context"
                    disabled={reportModal.loading}
                  />
                </div>

                <div className="mt-4 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
                  <span className="inline-block mr-2">ℹ️</span>
                  Privacy Notice: Your report is anonymous and will be reviewed by our moderation team. We may take action if it violates our community guidelines.
                </div>

                {reportModal.error && (
                  <div className="mt-3 text-sm text-red-600">{reportModal.error}</div>
                )}
                {reportModal.success && (
                  <div className="mt-3 text-sm text-green-600">Report submitted</div>
                )}

                <div className="mt-5 flex justify-end gap-2">
                  <button
                    onClick={closeReport}
                    disabled={reportModal.loading}
                    className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-60"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submitReport}
                    disabled={reportModal.loading}
                    className={`px-4 py-2 rounded-md text-white ${reportModal.loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                  >
                    {reportModal.loading ? 'Submitting...' : 'Submit Report'}
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
