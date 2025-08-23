"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import client from "@/sanity/lib/client";

export default function ReportPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all"); // all | post | comment
  const [filterStatus, setFilterStatus] = useState("all"); // all | pending | reviewed | resolved
  const [selectedReport, setSelectedReport] = useState(null);
  const [updating, setUpdating] = useState(false);

  async function updateReportStatus(id, status) {
    try {
      setUpdating(true);
      const res = await fetch('/api/reportStatus', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error('Failed to update status');
      // Optimistically update list
      setReports((prev) => prev.map((it) => it._id === id ? { ...it, status } : it));
      // And selected
      setSelectedReport((prev) => prev && prev._id === id ? { ...prev, status } : prev);
    } catch (e) {
      console.error(e);
      setError(e?.message || 'Failed to update status');
    } finally {
      setUpdating(false);
    }
  }

  function exportReports() {
    try {
      // Apply same filters as the table
      const filtered = (reports || [])
        .filter((r) => {
          if (!search.trim()) return true;
          const q = search.toLowerCase();
          const name = (r?.author?.name || r?.author?.username || '').toLowerCase();
          const email = (r?.author?.email || '').toLowerCase();
          const reason = (r?.reason || '').toLowerCase();
          const desc = (r?.description || '').toLowerCase();
          return name.includes(q) || email.includes(q) || reason.includes(q) || desc.includes(q);
        })
        .filter((r) => filterType === 'all' || (r?.target?._type || '').toLowerCase() === filterType)
        .filter((r) => filterStatus === 'all' || (r?.status || 'pending') === filterStatus);

      const headers = [
        'ReportID',
        'Type',
        'Reporter',
        'TargetID',
        'TargetLabel',
        'Reason',
        'Status',
        'Date',
        'Time',
        'Description',
      ];

      const rows = filtered.map((r) => {
        const date = r.createdAt ? new Date(r.createdAt) : (r._createdAt ? new Date(r._createdAt) : null);
        const dateStr = date ? date.toISOString().slice(0,10) : '';
        const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '';
        const typeLabel = (r?.target?._type || '').toLowerCase() === 'comment' ? 'Comment' : 'Post';
        const reporter = r?.author?.name || r?.author?.username || r?.author?.email || '';
        const targetId = r?.target?._id || '';
        const targetLabel = r?.target?.label || '';
        const reason = (r?.reason || '').replace(/_/g, ' ');
        const status = r?.status || 'pending';
        const desc = r?.description || '';
        const values = [r._id, typeLabel, reporter, targetId, targetLabel, reason, status, dateStr, timeStr, desc];
        // CSV escape
        return values.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',');
      });

      const csv = [headers.join(','), ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const ts = new Date().toISOString().replace(/[:.]/g, '-');
      a.download = `reports-${ts}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error('Export failed', e);
      setError('Failed to export data');
    }
  }
  

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        const data = await client.fetch(`*[_type == "report"] | order(coalesce(createdAt, _createdAt) desc) {
          _id,
          reason,
          description,
          status,
          createdAt,
          _createdAt,
          target->{
            _type,
            _id,
            // For post: prefer title, fallback to pitch; For comment: text
            'label': select(
              _type == 'post' => coalesce(title, pitch),
              _type == 'comment' => text,
              null
            )
          },
          author->{ name, username, email }
        }`);
        if (!cancelled) setReports(data || []);
      } catch (e) {
        if (!cancelled) setError(e?.message || "Failed to load reports");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return ( 
    <div className="w-full h-full min-h-screen relative bg-white">
      {/* Background content with conditional fade */}
      <div className={`${isOpen ? "opacity-20 pointer-events-none" : "opacity-100"} transition-opacity duration-300`}>
        <div className="grid grid-cols-12 w-full">
          <div className="grid col-start-3 col-span-10 "> 

            {/* Top Bar */}
            <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
              <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
                <FaArrowLeft className="text-xl cursor-pointer" />
              </Link>
              Reports & Feedbacks Management
            </div>

            {/* Functional Buttons */}
            <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-4 text-xl ml-5 z-1">
              <button onClick={exportReports} className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Export Data
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-24 mx-3 rounded-t-lg px-6 pt-6 flex gap-4 border-b-2 border-[#E5E7EB]">
              <Link href="/admin/reports" className="text-[#2563EB] border-[#2563EB] border-b-2 pb-2 cursor-pointer">
                Reports
              </Link>
              <Link href="/admin/feedbacks" className="text-[#6B7280] cursor-pointer">
                Feedbacks
              </Link>
            </div>

            {/* Main Content */}
            <div className="mx-3 rounded-b-lg p-6 flex gap-4 shadow-2xl flex-col">
              {/* Filters */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search reports"
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
                    <option value="post">Post</option>
                    <option value="comment">Comment</option>
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
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
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
                <div className="w-full py-2 px-6 text-[#374151] text-md bg-[#F9FAFB] grid grid-cols-7 border-b-2 border-[#E5E7EB] items-center">
                  <div>Type</div>
                  <div>Reporter</div>
                  <div className="w-full text-center">Reported ID</div>
                  <div className="w-full text-center">Reason</div>
                  <div className="w-full text-center">Status</div>
                  <div className="w-full text-center">Date</div>
                  <div className="flex justify-end pr-2">Actions</div>
                </div>

                {loading && (
                  <div className="w-full py-3 px-6 text-gray-600">Loading reports…</div>
                )}
                {error && (
                  <div className="w-full py-3 px-6 text-red-600">{error}</div>
                )}
                {!loading && !error && reports.length === 0 && (
                  <div className="w-full py-3 px-6 text-gray-600">No report found.</div>
                )}
                {!loading && !error && reports
                  .filter((r) => {
                    if (!search.trim()) return true;
                    const q = search.toLowerCase();
                    const name = (r?.author?.name || r?.author?.username || '').toLowerCase();
                    const email = (r?.author?.email || '').toLowerCase();
                    const reason = (r?.reason || '').toLowerCase();
                    const desc = (r?.description || '').toLowerCase();
                    return name.includes(q) || email.includes(q) || reason.includes(q) || desc.includes(q);
                  })
                  .filter((r) => filterType === 'all' || (r?.target?._type || '').toLowerCase() === filterType)
                  .filter((r) => filterStatus === 'all' || (r?.status || 'pending') === filterStatus)
                  .map((r) => {
                    const date = r.createdAt ? new Date(r.createdAt) : (r._createdAt ? new Date(r._createdAt) : null);
                    const dateStr = date ? date.toISOString().slice(0,10) : "-";
                    const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
                    const typeLabel = (r?.target?._type || '').toLowerCase() === 'comment' ? 'Comment' : 'Post';
                    const st = r.status || 'pending';
                    const statusLabel = st === 'pending' ? 'Pending' : st === 'reviewed' ? 'Reviewed' : 'Resolved';
                    const badgeClass = st === 'pending'
                      ? 'bg-red-100 text-red-700 border-red-300'
                      : st === 'reviewed'
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                      : 'bg-green-100 text-green-700 border-green-300';
                    return (
                      <div key={r._id} className="w-full py-2 px-6 text-black text-md grid grid-cols-7 items-center border-b gap-1 border-[#E5E7EB]">
                        <div>{typeLabel}</div>
                        <div>{r?.author?.name || r?.author?.username || r?.author?.email || 'Unknown'}</div>
                        <div className="truncate" title={(r?.target?.label || '-') + (r?.target?._id ? ` (ID: ${r.target._id})` : '')}>
                          <div className="text-xs text-gray-500 truncate font-mono">{r?.target?._id || ''}</div>
                        </div>
                        <div className="text-center flex items-center w-full justify-center">
                          <div className="capitalize text-center text-white bg-blue-500 px-2 py-1 rounded">{r?.reason?.replace(/_/g, ' ') || '-'}</div> 
                        </div>
                        <div className="text-center flex items-center w-full justify-center">
                          <span className={`inline-block px-2 py-1 rounded border text-sm ${badgeClass}`}>{statusLabel}</span>
                        </div>
                        <div className="col flex gap-2 w-full items-center justify-center">
                          <span>{dateStr}</span>
                          <span>{timeStr}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedReport(r);
                              setIsOpen(true);
                              const current = (r.status || 'pending');
                              if (current === 'pending') {
                                updateReportStatus(r._id, 'reviewed');
                              }
                            }}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={() => updateReportStatus(r._id, 'resolved')}
                            disabled={updating || st === 'resolved'}
                            className={`px-4 py-2 rounded-lg ${st === 'resolved' || updating ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}
                            title={st === 'resolved' ? 'Already resolved' : 'Mark as Resolved'}
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
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/2  text-[#374151]">
            <button
              onClick={() => { setIsOpen(false); setSelectedReport(null); }}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">Report Details</div>
            <div className="text-md mt-2 gap-2 flex w-full border-[#E5E7EB] border-b-2 pb-4">
              {selectedReport && (() => {
                const r = selectedReport;
                const date = r.createdAt ? new Date(r.createdAt) : (r._createdAt ? new Date(r._createdAt) : null);
                const dateStr = date ? date.toISOString().slice(0,10) : "-";
                const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
                const typeLabel = (r?.target?._type || '').toLowerCase() === 'comment' ? 'Comment' : 'Post';
                const st = r.status || 'pending';
                const statusLabel = st === 'pending' ? 'Pending' : st === 'reviewed' ? 'Reviewed' : 'Resolved';
                const badgeClass = st === 'pending'
                  ? 'bg-yellow-100 text-yellow-700 border-yellow-300'
                  : st === 'reviewed'
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-green-100 text-green-700 border-green-300';
                return (
                  <div className="flex w-full">
                    <div className="w-1/4 flex flex-col gap-2 text-[#6B7280]">
                      <div>Type:</div>
                      <div>Reported Item:</div>
                      <div>Reporter:</div>
                      <div>Reason:</div>
                      <div>Status:</div>
                      <div>Date:</div>
                      <div>Details:</div>
                    </div>
                    <div className="w-3/4 flex flex-col gap-2 text-[#111827]">
                      <div>{typeLabel}</div>
                      <div className="truncate" title={(r?.target?._id ? ` (ID: ${r.target._id})` : '')}>
                        <div className="text-xs text-gray-500 truncate font-mono">{r?.target?._id || ''}</div>
                      </div>
                      <div>{r?.author?.name || r?.author?.username || r?.author?.email || 'Unknown'}</div>
                      <div className="capitalize">{r?.reason?.replace(/_/g, ' ') || '-'}</div>
                      <div><span className={`inline-block px-2 py-1 rounded border text-sm ${badgeClass}`}>{statusLabel}</span></div>
                      <div>{dateStr} <span className="text-gray-600 text-sm">{timeStr}</span></div>
                      <div className="bg-[#F9FAFB] p-3 rounded-lg whitespace-pre-wrap">{r?.description || '-'}</div>
                    </div>
                  </div>
                );
              })()}
            </div>
            <div className="justify-end w-full mt-2 flex gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#374151] bg-[#F3F4F6] hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg px-4 py-2 cursor-pointer"
              >
                Close
              </button>
              <Link
                href="/admin/content"
                className="text-white bg-[#2563EB] hover:bg-blue-800 text-xl font-bold rounded-lg px-4 py-2 cursor-pointer"
              >
                Go to Content
              </Link>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
