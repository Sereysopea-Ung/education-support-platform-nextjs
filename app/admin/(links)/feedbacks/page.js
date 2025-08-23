"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import client from "@/sanity/lib/client";

export default function FeedbackPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'feature' | 'bug_report'
  const [filterStatus, setFilterStatus] = useState('all'); // 'all' | 'new' | 'in_progress' | 'resolved'
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [search, setSearch] = useState('');

  // Export currently filtered feedbacks to CSV
  const exportCSV = () => {
    // Apply the same filters used in the table rendering
    const filtered = feedbacks
      .filter((fb) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        const name = (fb?.author?.name || '').toLowerCase();
        const email = (fb?.author?.email || '').toLowerCase();
        const text = (fb?.feedbackText || '').toLowerCase();
        return name.includes(q) || email.includes(q) || text.includes(q);
      })
      .filter((fb) => {
        if (filterType === 'all') return true;
        const raw = fb?.typefeed;
        const norm = typeof raw === 'string' ? raw.toLowerCase().replace(/\s+/g, '_') : '';
        return norm === filterType;
      })
      .filter((fb) => {
        const st = fb.status || 'new';
        return filterStatus === 'all' || st === filterStatus;
      });

    const escapeCSV = (val) => {
      const s = val == null ? '' : String(val);
      const needsQuotes = /[",\n]/.test(s);
      const escaped = s.replace(/"/g, '""');
      return needsQuotes ? `"${escaped}"` : escaped;
    };

    const header = ['User', 'Type', 'Rating', 'Status', 'Date', 'Time', 'Text'];
    const rows = filtered.map((fb) => {
      const user = fb?.author?.name || fb?.author?.email || 'Unknown';
      const rawType = fb?.typefeed;
      const typeNorm = typeof rawType === 'string' ? rawType.toLowerCase().replace(/\s+/g, '_') : '';
      const typeLabel = typeNorm === 'feature' ? 'Feature' : typeNorm === 'bug_report' ? 'Bug Report' : '-';
      const rating = fb?.rating ?? '-';
      const st = fb.status || 'new';
      const statusLabel = st === 'new' ? 'New' : st === 'in_progress' ? 'In Progress' : 'Resolved';
      const date = fb.createdAt ? new Date(fb.createdAt) : null;
      const dateStr = date ? date.toISOString().slice(0,10) : '-';
      const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
      const text = fb?.feedbackText || '';
      return [user, typeLabel, rating, statusLabel, dateStr, timeStr, text].map(escapeCSV).join(',');
    });

    const csv = [header.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedbacks_${new Date().toISOString().slice(0,10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await client.fetch(
          `*[_type == "feedback"] | order(createdAt desc) {
            _id,
            feedbackText,
            rating,
            typefeed,
            status,
            createdAt,
            author->{ _id, name, email, image }
          }`
        );
        if (!cancelled) setFeedbacks(data || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load feedbacks");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return ( 
    <div className="w-full h-full min-h-screen relative bg-white">
      {/* Background content with conditional fade */}
      <div className={`${isOpen ? "opacity-20 pointer-events-none" : "opacity-100"} transition-opacity duration-300`}>
        <div className="grid grid-cols-12 w-full">
          <div className="grid col-start-3 col-span-10 ">

            {/* Top Bar */}
            <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1 text-[#374151]">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
                <FaArrowLeft className="text-xl cursor-pointer" />
              </Link>
              Reports & Feedbacks Management
            </div>

            {/* Functional Buttons */}
            <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-4 text-xl ml-5 z-1">
              <button onClick={exportCSV} className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Export Data
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-24 mx-3 rounded-t-lg px-6 pt-6 flex gap-4 border-b-2 border-[#E5E7EB]">
              <Link href="/admin/reports" className="text-[#6B7280] cursor-pointer">
                Reports
              </Link>
              <Link href="/admin/feedbacks" className="text-[#2563EB] border-[#2563EB] border-b-2 pb-2 cursor-pointer">
                Feedbacks
              </Link>
            </div>

            {/* Main Content */}
            <div className="mx-3 rounded-b-lg p-6 flex gap-4 shadow-2xl flex-col">
              {/* Filters */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search feedbacks"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-2 pr-20 py-2 rounded-lg bg-white border-gray-200 border-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Type Select */}
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="feature">Feature</option>
                    <option value="bug_report">Bug Report</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                    <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                  </div>
                </div>

                {/* Status Select */}
                <div className="relative">
                  <select
                    id="status"
                    name="status"
                    className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                    <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="flex-col w-full flex">
                {/* Table Header */}
                <div className="w-full py-2 px-6 text-[#374151] text-md bg-[#F9FAFB] grid grid-cols-6 border-b-2 border-[#E5E7EB] items-center">
                  <div>User</div>
                  <div className="w-full text-center">Type</div>
                  <div className="w-full text-center">Rating</div>
                  <div className="w-full text-center">Status</div>
                  <div className="w-full text-center">Date</div>
                  <div className="flex justify-end pr-2">Actions</div>
                </div>

                {loading && (
                  <div className="w-full py-3 px-6 text-gray-600">Loading feedbacks…</div>
                )}
                {error && (
                  <div className="w-full py-3 px-6 text-red-600">{error}</div>
                )}
                {!loading && !error && feedbacks.length === 0 && (
                  <div className="w-full py-3 px-6 text-gray-600">No feedback found.</div>
                )}
                {!loading && !error && feedbacks
                  .filter((fb) => {
                    if (!search.trim()) return true;
                    const q = search.toLowerCase();
                    const name = (fb?.author?.name || '').toLowerCase();
                    const email = (fb?.author?.email || '').toLowerCase();
                    const text = (fb?.feedbackText || '').toLowerCase();
                    return name.includes(q) || email.includes(q) || text.includes(q);
                  })
                  .filter((fb) => {
                    if (filterType === 'all') return true;
                    const raw = fb?.typefeed;
                    const norm = typeof raw === 'string' ? raw.toLowerCase().replace(/\s+/g, '_') : '';
                    return norm === filterType;
                  })
                  .filter((fb) => {
                    const st = fb.status || 'new';
                    return filterStatus === 'all' || st === filterStatus;
                  })
                  .map((fb) => {
                  const date = fb.createdAt ? new Date(fb.createdAt) : null;
                  const dateStr = date ? date.toISOString().slice(0,10) : "-";
                  const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
                  return (
                    <div key={fb._id} className="w-full py-2 px-6 text-black text-md grid grid-cols-6 items-center border-b border-[#E5E7EB]">
                      <div>{fb?.author?.name || fb?.author?.email || 'Unknown'}</div>
                      <div className="w-full text-center">
                        {(() => {
                          const raw = fb?.typefeed;
                          const norm = typeof raw === 'string' ? raw.toLowerCase().replace(/\s+/g, '_') : '';
                          if (norm === 'feature') {
                            return (
                              <span className="inline-block px-2 py-1 rounded border text-sm bg-blue-100 text-blue-700 border-blue-300">
                                Feature
                              </span>
                            );
                          }
                          if (norm === 'bug_report') {
                            return (
                              <span className="inline-block px-2 py-1 rounded border text-sm bg-red-100 text-red-700 border-red-300">
                                Bug Report
                              </span>
                            );
                          }
                          return '-';
                        })()}
                      </div>
                      <div className="w-full text-center">{fb?.rating ?? '-'}</div>
                      <div className="w-full text-center">
                        {(() => {
                          const st = fb.status || 'new';
                          const label = st === 'new' ? 'New' : st === 'in_progress' ? 'In Progress' : 'Resolved';
                          const badgeClass = st === 'new'
                            ? 'bg-blue-100 text-blue-700 border-blue-300'
                            : st === 'in_progress'
                            ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                            : 'bg-green-100 text-green-700 border-green-300';
                          return (
                            <span className={`inline-block px-2 py-1 rounded border text-sm ${badgeClass}`}>
                              {label}
                            </span>
                          );
                        })()}
                      </div>
                      <div className="col flex gap-2 w-full items-center justify-center">
                        <span>{dateStr}</span>
                        <span>{timeStr}</span>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={async () => {
                            // set to in_progress when viewing
                            const current = fb.status || 'new';
                            if (current !== 'in_progress' && current !== 'resolved') {
                              await fetch('/api/feedback/status', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: fb._id, status: 'in_progress' })
                              }).catch(() => {});
                              setFeedbacks((prev) => prev.map(x => x._id === fb._id ? { ...x, status: 'in_progress' } : x));
                            }
                            setSelectedFeedback(fb);
                            setIsOpen(true);
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors mr-2"
                        >
                          View
                        </button>
                        <button
                          onClick={async () => {
                            await fetch('/api/feedback/status', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ id: fb._id, status: 'resolved' })
                            }).catch(() => {});
                            setFeedbacks((prev) => prev.map(x => x._id === fb._id ? { ...x, status: 'resolved' } : x));
                          }}
                          disabled={(fb.status || 'new') === 'resolved'}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-60"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50  text-[#374151]">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/2">
            <button
              onClick={() => { setIsOpen(false); setSelectedFeedback(null); }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">Feedback Details</div>
            <div className="text-md mt-2 gap-4 flex flex-col">
              {selectedFeedback && (() => {
                const fb = selectedFeedback;
                const date = fb.createdAt ? new Date(fb.createdAt) : null;
                const dateStr = date ? date.toISOString().slice(0,10) : "-";
                const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
                const typeNorm = typeof fb?.typefeed === 'string' ? fb.typefeed.toLowerCase().replace(/\s+/g, '_') : '';
                const typeBadge = typeNorm === 'feature'
                  ? (<span className="inline-block px-2 py-1 rounded border text-sm bg-blue-100 text-blue-700 border-blue-300">Feature</span>)
                  : typeNorm === 'bug_report'
                  ? (<span className="inline-block px-2 py-1 rounded border text-sm bg-red-100 text-red-700 border-red-300">Bug Report</span>)
                  : '-';
                const st = fb.status || 'new';
                const statusLabel = st === 'new' ? 'New' : st === 'in_progress' ? 'In Progress' : 'Resolved';
                const statusClass = st === 'new'
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : st === 'in_progress'
                  ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                  : 'bg-green-100 text-green-700 border-green-300';
                return (
                  <>
                    <div className="grid grid-cols-2 gap-2 text-[#6B7280]">
                      <div>User</div>
                      <div>Date</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center">
                      <div className="text-black">{fb?.author?.name || fb?.author?.email || 'Unknown'}</div>
                      <div className="text-black flex gap-2 items-center">{dateStr} <span className="text-gray-600 text-sm">{timeStr}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[#6B7280]">
                      <div>Type</div>
                      <div>Status</div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center">
                      <div>{typeBadge}</div>
                      <div><span className={`inline-block px-2 py-1 rounded border text-sm ${statusClass}`}>{statusLabel}</span></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[#6B7280]">
                      <div>Rating</div>
                      <div></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 items-center">
                      <div className="text-black">{fb?.rating ?? '-'}</div>
                      <div></div>
                    </div>
                    <div className="text-[#6B7280] mt-2">Description</div>
                    <div className="bg-[#F9FAFB] p-3 rounded-lg text-black whitespace-pre-wrap">{fb?.feedbackText}</div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
