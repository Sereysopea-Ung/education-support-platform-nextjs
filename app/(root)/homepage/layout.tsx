"use client";

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { doLogout } from '@/pages/api/auth/loginAndLogout';
import { HomepageFiltersContext, PostTab } from '@/components/homepageFilters';
import { useSession } from 'next-auth/react';
import client from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { useCallback } from 'react';

export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<PostTab>("NewsFeed");
  const [menuOpen, setMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [typefeed, setTypefeed] = useState<'feature' | 'bug_report'>('feature');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Notifications state
  const [user, setUser] = useState<any>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [hasUnread, setHasUnread] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);

  const builder = imageUrlBuilder(client);
  const urlFor = (source: any) => {
    try {
      return builder.image(source).width(64).height(64).fit('crop').url();
    } catch {
      return '/Default_pfp.jpg';
    }
  };

  // Seen notifications helpers (persisted in localStorage)
  const getSeenSet = (): Set<string> => {
    if (typeof window === 'undefined') return new Set();
    try {
      const raw = localStorage.getItem('notif_seen_ids');
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  };

  const addSeenId = (id: string) => {
    if (typeof window === 'undefined' || !id) return;
    try {
      const set = getSeenSet();
      if (!set.has(id)) {
        set.add(id);
        localStorage.setItem('notif_seen_ids', JSON.stringify(Array.from(set)));
      }
    } catch {}
  };

  // Lock page scroll when feedback modal is open
  useEffect(() => {
    if (showFeedback) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showFeedback]);

  // Fetch current user (with following) by session email
  useEffect(() => {
    if (!session?.user?.email) return;
    const query = `*[_type == "user" && email == $email][0]{ _id, username, following }`;
    client
      .fetch(query, { email: session.user.email })
      .then((u) => setUser(u))
      .catch((e) => console.error('Failed to fetch user', e));
  }, [session?.user?.email]);

  // Fetch notifications from followings
  const fetchNotifications = useCallback(async () => {
    try {
      const following = Array.isArray(user?.following) ? user.following : [];
      if (!user?._id || following.length === 0) {
        setNotifications([]);
        setHasUnread(false);
        return;
      }
      const posts = await client.fetch(
        `*[_type == "post" && defined(author._ref) && author._ref in $following] | order(_createdAt desc)[0...10]{ _id, pitch, _createdAt, author->{ username, profile_pic, profile_pic_from_cloudinary } }`,
        { following }
      );
      const seen = getSeenSet();
      const filtered = (Array.isArray(posts) ? posts : []).filter((p: any) => !seen.has(p?._id));
      setNotifications(filtered);
      const lastSeenStr = typeof window !== 'undefined' ? localStorage.getItem('notif_last_seen') : null;
      const lastSeen = lastSeenStr ? new Date(lastSeenStr).getTime() : 0;
      const anyNew = (filtered || []).some((p: any) => new Date(p?._createdAt || 0).getTime() > lastSeen);
      setHasUnread(anyNew);
    } catch (e) {
      console.error('Failed to fetch notifications', e);
    }
  }, [user?._id, user?.following]);

  useEffect(() => {
    fetchNotifications();
    const onFocus = () => fetchNotifications();
    const onVisibility = () => { if (document.visibilityState === 'visible') fetchNotifications(); };
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [fetchNotifications]);

  // Close dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!notifOpen) return;
      const target = e.target as Node;
      if (notifRef.current && !notifRef.current.contains(target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [notifOpen]);

  return (
    <section className="min-h-screen bg-gray-100">
      {/* Unified Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 text-gray-900">
        <div className="w-full">
          <div className="h-16 flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
              <span className="text-2xl text-[#0092C6] font-semibold">S3TUDY</span>
            </Link>

            {/* Tabs as filters */}
            <div className="hidden md:flex items-center gap-3 ml-20">
              {(["NewsFeed", "Q&A", "Lesson", "Announcement"] as PostTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={
                    `px-3 py-1 rounded-md ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-gray-900 hover:bg-blue-600 hover:text-white'}`
                  }
                >
                  {tab}
                </button>
              ))}
              <Link href="/mynetwork" className="px-3 py-1 rounded-md text-gray-900 hover:bg-blue-600 hover:text-white">Network</Link>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-xl">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts, users, majors..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600"
              />
            </div>

            {/* Right actions: Notification bell + Ellipsis menu */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Notification Bell */}
              {session?.user?.email && (
                <div className="relative" ref={notifRef}>
                  <button
                    aria-label="Notifications"
                    className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
                    onClick={() => {
                      setNotifOpen((o) => !o);
                      if (!notifOpen) {
                        try { localStorage.setItem('notif_last_seen', new Date().toISOString()); } catch {}
                        setHasUnread(false);
                      }
                    }}
                  >
                    {/* Bell Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path d="M12 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 006 14h12a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6z" />
                      <path d="M8 16a4 4 0 008 0H8z" />
                    </svg>
                    {/* Red dot */}
                    {hasUnread && (
                      <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                    )}
                  </button>
                  {/* Dropdown */}
                  {notifOpen && (
                    <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                      <div className="px-3 py-2 border-b text-sm font-semibold text-gray-800">Notifications</div>
                      {notifications.length === 0 ? (
                        <div className="px-4 py-6 text-sm text-gray-600">No recent posts from your followings.</div>
                      ) : (
                        <ul className="divide-y divide-gray-100">
                          {notifications.map((n: any) => (
                            <li key={n._id}>
                              <Link
                                href={`/post/${n._id}`}
                                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                                onClick={() => {
                                  // Mark as seen and remove from list on first click
                                  addSeenId(n._id);
                                  setNotifications((prev) => prev.filter((x) => x._id !== n._id));
                                  setNotifOpen(false);
                                }}
                              >
                                <img
                                  src={n.author?.profile_pic_from_cloudinary
                                        ? n.author.profile_pic_from_cloudinary
                                        : (n.author?.profile_pic ? urlFor(n.author.profile_pic) : '/Default_pfp.jpg')}
                                  alt={n.author?.username || 'Author'}
                                  className="w-8 h-8 rounded-full object-cover"
                                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/Default_pfp.jpg'; }}
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm text-gray-800"><span className="font-medium">{n.author?.username || 'Someone'}</span> posted</p>
                                  <p className="text-sm text-gray-600 line-clamp-2 truncate">{n.pitch || 'New post'}</p>
                                  <span className="text-xs text-gray-500">{new Date(n._createdAt).toLocaleString()}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Ellipsis menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-label="Menu"
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <svg width="22" height="23" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.91667 15.3333C1.38958 15.3333 0.9384 15.1457 0.56302 14.7703C0.187641 14.3949 0 13.9437 0 13.4167C0 12.8896 0.187641 12.4384 0.56302 12.063C0.9384 11.6876 1.38958 11.5 1.91667 11.5C2.44375 11.5 2.89493 11.6876 3.27031 12.063C3.64569 12.4384 3.83333 12.8896 3.83333 13.4167C3.83333 13.9437 3.64569 14.3949 3.27031 14.7703C2.89493 15.1457 2.44375 15.3333 1.91667 15.3333ZM1.91667 9.58333C1.38958 9.58333 0.9384 9.39569 0.56302 9.02031C0.187641 8.64493 0 8.19375 0 7.66667C0 7.13958 0.187641 6.6884 0.56302 6.31302C0.9384 5.93764 1.38958 5.75 1.91667 5.75C2.44375 5.75 2.89493 5.93764 3.27031 6.31302C3.64569 6.6884 3.83333 7.13958 3.83333 7.66667C3.83333 8.19375 3.64569 8.64493 3.27031 9.02031C2.89493 9.39569 2.44375 9.58333 1.91667 9.58333ZM1.91667 3.83333C1.38958 3.83333 0.9384 3.64566 0.56302 3.27031C0.187641 2.89496 0 2.44375 0 1.91667C0 1.38958 0.187641 0.938371 0.56302 0.563021C0.9384 0.187671 1.38958 0 1.91667 0C2.44375 0 2.89493 0.187671 3.27031 0.563021C3.64569 0.938371 3.83333 1.38958 3.83333 1.91667C3.83333 2.44375 3.64569 2.89496 3.27031 3.27031C2.89493 3.64566 2.44375 3.83333 1.91667 3.83333Z" fill="#1D1B20"/>
                  </svg>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md border bg-white shadow-sm">
                    <Link href="/profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Profile</Link>
                    <Link href="/settings/edit-profile" className="block px-4 py-2 text-gray-900 hover:bg-gray-50">Settings</Link>
                    <button onClick={() => { setShowFeedback(true); setMenuOpen(false); }} className="w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-50">Feedback</button> 
                    <button onClick={doLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Sign out</button> 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content wrapped with filters context */}
      <HomepageFiltersContext.Provider value={{ search: query, setSearch: setQuery, activeTab, setActiveTab }}>
        <div className="w-full">
          {children}
        </div>
      </HomepageFiltersContext.Provider>

      {/* Feedback Modal (Portal) */}
      {showFeedback && createPortal(
        (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center w-full">
            <div className="fixed inset-0 z-[2000] bg-black/60" onClick={() => !submitting && setShowFeedback(false)} />
            <div className="relative z-[2001] w-11/12 md:w-2/3 max-w-4xl rounded-lg bg-white p-6 shadow-xl max-h-[85vh] overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900">Send Feedback</h3>
                <button disabled={submitting} onClick={() => setShowFeedback(false)} className="p-1 rounded hover:bg-gray-100">✕</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setRating(n)}
                        className={`px-3 py-1 rounded border ${rating === n ? 'bg-blue-600 text-white border-[#0092C6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        disabled={submitting}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div className="flex gap-2">
                    {[
                      { title: 'Feature', value: 'feature' as const },
                      { title: 'Bug Report', value: 'bug_report' as const },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setTypefeed(opt.value)}
                        className={`px-3 py-1 rounded border ${typefeed === opt.value ? 'bg-blue-600 text-white border-[#0092C6]' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
                        disabled={submitting}
                      >
                        {opt.title}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">Feedback</label>
                  <textarea
                    id="feedback"
                    rows={5}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full resize-none rounded border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-[#0092C6]"
                    placeholder="What can we improve?"
                    disabled={submitting}
                  />
                </div>
                {submitError && (
                  <p className="text-sm text-red-600">{submitError}</p>
                )}
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setShowFeedback(false)}
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-[#007aa5] disabled:opacity-60 cursor-pointer"
                    disabled={submitting}
                    onClick={async () => {
                      // Validate input
                      if (!feedbackText.trim()) {
                        setSubmitError('Please enter your feedback.');
                        const el = document.getElementById('feedback') as HTMLTextAreaElement | null;
                        el?.focus();
                        return;
                      }
                      setSubmitError(null);
                      setSubmitting(true);
                      try {
                        const res = await fetch('/api/feedback', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ feedbackText, rating, typefeed })
                        });
                        if (!res.ok) {
                          const data = await res.json().catch(() => ({}));
                          throw new Error(data?.message || 'Failed to submit feedback');
                        }
                        setFeedbackText('');
                        setRating(5);
                        setShowFeedback(false);
                      } catch (err: any) {
                        setSubmitError(err.message || 'Something went wrong');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    {submitting ? 'Submitting…' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ),
        document.body
      )}
    </section>
  );
}
