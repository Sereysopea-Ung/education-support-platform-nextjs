"use client";

import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import { useEffect, useState } from "react";
import client from "../../../../sanity/lib/client";
import { department as majors } from "@/helper-files/department";

export default function SettingPage(){
    const [isView, setIsView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [viewData, setViewData] = useState(null);
    const [viewLoading, setViewLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [editData, setEditData] = useState(null);
    const [editLoading, setEditLoading] = useState(false);
    const [savingEdit, setSavingEdit] = useState(false);
    const [formTitle, setFormTitle] = useState('');
    const [formText, setFormText] = useState('');
    const [formImages, setFormImages] = useState([]); // array of URLs
    const [formFiles, setFormFiles] = useState([]);   // array of URLs

    const [items, setItems] = useState([]); // combined posts + comments
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("AllType"); // AllType | Post | Comment
    const [statusFilter, setStatusFilter] = useState("AllStatus");
    const [majorFilter, setMajorFilter] = useState("AllMajors");
    const [page, setPage] = useState(1);
    const pageSize = 10;

    const acronymize = (s) => {
        if (!s) return '-';
        if (s.length <= 18) return s;
        const ac = s
          .replace(/&/g, ' ')
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => w[0])
          .join('')
          .toUpperCase();
        return ac || s;
    };

    const openEdit = async (it) => {
        try {
            setSelectedItem(it);
            setIsEdit(true);
            setEditLoading(true);
            setEditData(null);
            const id = it?._id;
            if (!id) { setEditLoading(false); return; }
            const query = `*[_id == $id][0]{
                _id,
                _type,
                createdAt,
                _createdAt,
                _updatedAt,
                title,
                pitch,
                text,
                images,
                files,
                author->{ name, username, email, major }
            }`;
            const data = await client.fetch(query, { id });
            setEditData(data || it);
            const d = data || it;
            setFormTitle(d?.title || '');
            setFormText(d?.text || d?.pitch || '');
            setFormImages(Array.isArray(d?.images) ? d.images : []);
            setFormFiles(Array.isArray(d?.files) ? d.files : []);
        } catch (e) {
            console.error('Failed to load edit data', e);
        } finally {
            setEditLoading(false);
        }
    };

    const updateArray = (arr, idx, value) => arr.map((v, i) => (i === idx ? value : v));
    const addArrayItem = (arr, value = '') => [...arr, value];
    const removeArrayItem = (arr, idx) => arr.filter((_, i) => i !== idx);

    const saveEdit = async () => {
        if (!editData?._id) { setIsEdit(false); return; }
        try {
            setSavingEdit(true);
            const type = editData?._type;
            const patch = {};
            if (type === 'post') {
                patch.title = formTitle;
                // Put primary body in text; if empty, keep pitch separate
                patch.text = formText || '';
                patch.pitch = editData.pitch ? formText || editData.pitch : formText; // maintain existing pitch if present
                patch.images = formImages.filter(Boolean);
                patch.files = formFiles.filter(Boolean);
            } else if (type === 'comment') {
                patch.text = formText || '';
            }
            const res = await fetch('/api/content/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: editData._id, type, patch })
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || `Request failed: ${res.status}`);
            }
            const result = await res.json();
            const _updated = result?.result || {};
            // Update local list label
            setItems((prev) => prev.map((x) => {
                if (x._id !== editData._id) return x;
                const newLabel = type === 'post' ? (formTitle || formText || x.label) : (formText || x.label);
                return { ...x, label: newLabel };
            }));
            setIsEdit(false);
            setSelectedItem(null);
        } catch (e) {
            console.error('Save edit failed', e);
            setError(e?.message || 'Failed to save changes');
        } finally {
            setSavingEdit(false);
        }
    };

    const csvEscape = (value) => {
        const s = String(value ?? '');
        // Escape double quotes by doubling them, wrap field in quotes
        return '"' + s.replace(/"/g, '""') + '"';
    };

    const handleExport = () => {
        try {
            const headers = [
                'Title / Text',
                'ID',
                'Author',
                'Major',
                'Status',
                'Last Modified'
            ];
            const lines = [headers.map(csvEscape).join(',')];
            filtered.forEach((it) => {
                const last = it._updatedAt || it.createdAt || it._createdAt;
                const date = last ? new Date(last) : null;
                const lastStr = date ? date.toISOString() : '';
                const author = it?.author?.name || it?.author?.username || it?.author?.email || '';
                const isActive = last ? (Date.now() - new Date(last).getTime()) <= 7 * 24 * 60 * 60 * 1000 : false;
                const row = [
                    it?.label || '',
                    it?._id || '',
                    author,
                    it?.author?.major || '',
                    isActive ? 'Active' : 'Inactive',
                    lastStr
                ];
                lines.push(row.map(csvEscape).join(','));
            });
            const csv = lines.join('\r\n');
            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `content_${new Date().toISOString().slice(0,10)}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (e) {
            console.error('CSV export failed', e);
        }
    };

    const openView = async (it) => {
        try {
            setSelectedItem(it);
            setIsView(true);
            setViewLoading(true);
            setViewData(null);
            const id = it?._id;
            if (!id) {
                setViewLoading(false);
                return;
            }
            // Fetch full document depending on type
            const query = `*[_id == $id][0]{
                _id,
                _type,
                _rev,
                createdAt,
                _createdAt,
                _updatedAt,
                title,
                pitch,
                text,
                major,
                postImages[]{ asset-> { url } },
                images,
                files,
                post->{ _id, title },
                author->{ name, username, email, major }
            }`;
            const data = await client.fetch(query, { id });
            setViewData(data || it);
        } catch (e) {
            console.error('Failed to load view data', e);
            setViewData(it); // fallback to list item data
        } finally {
            setViewLoading(false);
        }
    };

    useEffect(() => {
        let cancelled = false;
        async function load() {
            try {
                setLoading(true);
                const data = await client.fetch(`*[_type in ['post','comment'] && !(_type == 'comment' && (text == null || text == '' || lower(text) == '[deleted]'))] | order(coalesce(_updatedAt, createdAt, _createdAt) desc) {
                    _id,
                    _type,
                    createdAt,
                    _updatedAt,
                    _createdAt,
                    'label': select(
                        _type == 'post' => coalesce(title, pitch),
                        _type == 'comment' => text,
                        null
                    ),
                    author->{ name, username, email, major }
                }`);
                if (!cancelled) setItems(data || []);
            } catch (e) {
                if (!cancelled) setError(e?.message || 'Failed to load content');
            } finally {
                if (!cancelled) setLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, []);

    // Compute filtered items for header and table
    const filtered = (items || [])
      .filter((it) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        const author = (it?.author?.name || it?.author?.username || it?.author?.email || '').toLowerCase();
        const label = (it?.label || '').toLowerCase();
        return author.includes(q) || label.includes(q) || it._id.toLowerCase().includes(q);
      })
      .filter((it) => typeFilter === 'AllType' || (typeFilter === 'Post' ? it._type === 'post' : it._type === 'comment'))
      .filter((it) => {
        if (majorFilter === 'AllMajors') return true;
        const mj = (it?.author?.major || '').toLowerCase();
        return mj === majorFilter.toLowerCase();
      })
      .filter((it) => {
        if (statusFilter === 'AllStatus') return true;
        const last = it._updatedAt || it.createdAt || it._createdAt;
        if (!last) return false;
        const ms = Date.now() - new Date(last).getTime();
        const isActive = ms <= 7 * 24 * 60 * 60 * 1000;
        return statusFilter.toLowerCase() === (isActive ? 'active' : 'inactive');
      });

    const filteredItemsLength = filtered.length;
    const totalPages = Math.max(1, Math.ceil(filteredItemsLength / pageSize));
    const safePage = Math.min(page, totalPages);
    const startIndex = (safePage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, filteredItemsLength);
    const pageItems = filtered.slice(startIndex, endIndex);

    // Clamp/reset page when filters/search change
    useEffect(() => {
        const newTotalPages = Math.max(1, Math.ceil(filteredItemsLength / pageSize));
        if (page > newTotalPages) setPage(newTotalPages);
        if (page < 1) setPage(1);
    }, [filteredItemsLength, page]);

    // Reset to first page whenever search or filters change
    useEffect(() => {
        setPage(1);
    }, [search, typeFilter, majorFilter, statusFilter]);

    return (
        <div className="w-full h-full min-h-screen relative bg-white">
            <div className={`${(isView || isEdit || isDelete) ? "opacity-20 pointer-events-none" : "opacity-100"} transition-opacity duration-300`}>
            <div className="grid grid-cols-12 w-full ">
                <div className="grid col-start-3 col-span-10 flex-col">
                    
                    <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
                            <FaArrowLeft className="text-xl cursor-pointer" />
                        </Link>
                        Content Management
                    </div> 

                    <div className="mt-25 mx-9 rounded-t-lg p-6 flex gap-4 border-[#E5E7EB] border-t-2 border-x-2">
                        {/* Make this functional */}
                        <div className="relative w-full">
                            <input
                                type="text" 
                                placeholder="Search by title, author, or content..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-2 pr-4 py-2 rounded-lg bg-white border-gray-200 border-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <FaSearch className="text-gray-500 w-4 h-4" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                            id="type"
                            name="type"
                            className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                            >
                            <option value="AllType">All Type</option>
                            <option value="Post">Post</option>
                            <option value="Comment">Comment</option>
                            </select>
    
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                            id="major"
                            name="major"
                            className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                            value={majorFilter}
                            onChange={(e) => setMajorFilter(e.target.value)}
                            >
                            <option value="AllMajors">All Majors</option>
                            {majors.filter(Boolean).map((m) => (
                                <option key={m} value={m} title={m}>{acronymize(m)}</option>
                            ))}
                            </select>
    
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                            </div>
                        </div>

                        <div className="relative">
                            <select
                            id="status"
                            name="status"
                            className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            >
                            <option value="AllStatus">All Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            </select>
    
                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                            </div>
                        </div>
                    </div>

                    <div className="mx-9 px-6 flex py-2 justify-between bg-white border-x-2 border-[#E5E7EB]">
                        {/* Max 10 users per page? */}
                        <div className="col-start-1 col-span-5 flex items-center text-[#6B7280]">
                            {loading ? 'Loading…' : error ? 'Failed to load' : `Showing ${filteredItemsLength === 0 ? 0 : startIndex + 1}–${endIndex} of ${filteredItemsLength} results`}
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPage((p) => Math.max(1, p - 1))}
                              disabled={loading || error || safePage <= 1}
                              className={`border-gray-200 border-1 text-black px-3 py-2 rounded-lg transition-colors ${safePage <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                            >
                              Prev
                            </button>
                            <span className="text-[#6B7280] text-sm">
                              {loading || error ? '' : `Page ${safePage} of ${totalPages}`}
                            </span>
                            <button
                              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                              disabled={loading || error || safePage >= totalPages}
                              className={`border-gray-200 border-1 text-black px-3 py-2 rounded-lg transition-colors ${safePage >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                            >
                              Next
                            </button>
                            <button
                                onClick={handleExport}
                                disabled={loading || !!error || filteredItemsLength === 0}
                                className={`border-gray-200 border-1 text-black px-4 py-2 rounded-lg transition-colors ${loading || !!error || filteredItemsLength === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'}`}
                            >
                                Export to CSV
                            </button>
                        </div>
                    </div>

                    <div className="mx-9 py-2 px-6 text-[#374151] text-md bg-[#F9FAFB] grid grid-cols-8 border-2 border-[#E5E7EB] items-center uppercase">
                        <div>Title / Text</div>
                        <div className="w-full text-center">ID</div>
                        <div className="w-full text-center">Author</div>
                        <div className="w-full text-center">Major</div>
                        <div className="w-full text-center">Status</div>
                        <div className="col-span-2">Last Modified</div>
                        <div className="flex justify-end pr-2">Actions</div>
                    </div>

                    {/* Table Rows */}
                    {loading && (
                        <div className="mx-9 py-3 px-6 text-gray-600">Loading content…</div>
                    )}
                    {!loading && error && (
                        <div className="mx-9 py-3 px-6 text-red-600">{error}</div>
                    )}
                    {!loading && !error && filtered.length === 0 && (
                        <div className="mx-9 py-3 px-6 text-gray-600">No content found.</div>
                    )}
                    {!loading && !error && pageItems.map((it) => {
                        const last = it._updatedAt || it.createdAt || it._createdAt;
                        const date = last ? new Date(last) : null;
                        const dateStr = date ? date.toISOString().slice(0,10) : "-";
                        const timeStr = date ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "";
                        const author = it?.author?.name || it?.author?.username || it?.author?.email || 'Unknown';
                        const isActive = last ? (Date.now() - new Date(last).getTime()) <= 7 * 24 * 60 * 60 * 1000 : false;
                        return (
                            <div key={it._id} className="mx-9 py-2 px-6 text-black text-md grid grid-cols-8 items-center gap-2 border-b-2 border-x-2 border-[#E5E7EB]">
                                <div className="truncate" title={it.label || ''}>{it.label || '-'}</div>
                                <div className="text-xs text-gray-600 font-mono truncate w-full text-center" title={it._id}>{it._id}</div>
                                <div className="truncate w-full text-center" title={author}>{author}</div>
                                <div className="flex justify-center">
                                    <span
                                        className="inline-flex max-w-full truncate bg-blue-500 text-white px-2 py-1 rounded"
                                        title={it?.author?.major || '-' }
                                    >
                                        {acronymize(it?.author?.major || '-')}
                                    </span>
                                </div>
                                <div className="flex justify-center">
                                    <span
                                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                        title={isActive ? 'active' : 'inactive'}
                                    >
                                        {isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2 min-w-0 col-span-2">
                                    <span className="whitespace-nowrap">{dateStr}</span>
                                    <span className="whitespace-nowrap">{timeStr}</span>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button onClick={() => openView(it)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                        View
                                    </button>
                                    <button onClick={() => openEdit(it)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                        Edit
                                    </button>
                                    <button onClick={() => { setSelectedItem(it); setIsDelete(true); }} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                        Delete
                                    </button>
                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
            </div>

            {/* Get data */}
            {isView && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/2  text-[#374151]">
                    <button
                    onClick={() => setIsView(false)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                    >
                    &times;
                    </button>
                    <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">
                        {viewLoading ? 'Loading…' : (viewData?._type === 'post' ? (viewData?.title || viewData?.label || 'Post') : (viewData?.label || viewData?.text || 'Comment'))}
                    </div>
                    <div className="text-md mt-2 gap-2 flex w-full">
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">AUTHOR</div>
                            <div>{viewLoading ? '-' : (viewData?.author?.name || viewData?.author?.username || viewData?.author?.email || 'Unknown Author')}</div>
                            <div className="text-[#6B7280] mt-2">ID</div>
                            <div className="break-all">{viewLoading ? '-' : (viewData?._id || '-')}</div>
                        </div>
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">MAJOR</div>
                            <div>{viewLoading ? '-' : (viewData?.author?.major || (Array.isArray(viewData?.major) ? viewData?.major?.join(', ') : viewData?.major) || '-')}</div>
                            <div className="text-[#6B7280] mt-2">LAST MODIFIED</div>
                            <div>
                                {viewLoading ? '-' : (() => {
                                    const last = viewData?._updatedAt || viewData?.createdAt || viewData?._createdAt;
                                    if (!last) return '-';
                                    const d = new Date(last);
                                    return `${d.toISOString().slice(0,10)} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                })()}
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col text-black mt-4 pb-2 border-[#E5E7EB] border-b-2">
                        <div className="text-[#6B7280]">CONTENT</div>
                        <div className="whitespace-pre-wrap break-words">
                            {viewLoading ? 'Loading…' : (
                                viewData?._type === 'post'
                                  ? (viewData?.text || viewData?.pitch || '-')
                                  : (viewData?.text || '-')
                            )}
                        </div>
                        {!viewLoading && viewData?._type === 'comment' && viewData?.post?.title && (
                            <div className="mt-3 text-sm text-gray-600">
                                <span className="font-semibold text-gray-700">Related Post:</span> {viewData.post.title}
                            </div>
                        )}
                    </div>
                    {/* Media preview for posts */}
                    {!viewLoading && viewData?._type === 'post' && (
                        <div className="w-full flex flex-col text-black mt-4 gap-3">
                            {/* Sanity images */}
                            {Array.isArray(viewData?.postImages) && viewData.postImages.length > 0 && (
                                <div>
                                    <div className="text-[#6B7280] mb-1">Images</div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {viewData.postImages.map((img, idx) => {
                                            const url = img?.asset?.url || img?.url;
                                            if (!url) return null;
                                            return (
                                                <img key={`pi-${idx}`} src={url} alt={`image-${idx}`} className="w-full h-40 object-cover rounded border" />
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                            {/* External image URLs */}
                            {Array.isArray(viewData?.images) && viewData.images.length > 0 && (
                                <div>
                                    <div className="text-[#6B7280] mb-1">Image URLs</div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {viewData.images.map((url, idx) => (
                                            <img key={`iu-${idx}`} src={url} alt={`image-url-${idx}`} className="w-full h-40 object-cover rounded border" />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Files */}
                            {Array.isArray(viewData?.files) && viewData.files.length > 0 && (
                                <div>
                                    <div className="text-[#6B7280] mb-1">Files</div>
                                    <ul className="list-disc pl-5 text-blue-600">
                                        {viewData.files.map((url, idx) => (
                                            <li key={`file-${idx}`} className="truncate"><a href={url} target="_blank" rel="noreferrer" className="hover:underline break-words">{url}</a></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="justify-end w-full mt-2 flex gap-4">
                        <button
                            onClick={() => setIsView(false)}
                            className="text-[#374151] bg-white border border-[#D1D5DB] hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg px-4 py-2 cursor-pointer"
                            >
                            Close
                        </button>
                    </div>
                    
                </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEdit && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative w-11/12 md:w-3/4 lg:w-1/2 text-[#374151] max-h-[80vh] overflow-y-auto">
                        <button
                            onClick={() => setIsEdit(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">
                            {editLoading ? 'Loading…' : (editData?._type === 'post' ? (formTitle || 'Untitled Post') : 'Edit Comment')}
                            {editData?._type === 'post' && (
                                <input
                                    type="text"
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="mt-2 w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Change Post Title"
                                />
                            )}
                        </div>
                        <div className="text-md mt-2 gap-2 flex w-full">
                            <div className="w-1/2 flex flex-col text-black">
                                <div className="text-[#6B7280]">AUTHOR</div>
                                <div>{editLoading ? '-' : (editData?.author?.name || editData?.author?.username || editData?.author?.email || 'Unknown Author')}</div>
                                <div className="text-[#6B7280] mt-2">ID</div>
                                <div className="break-all">{editLoading ? '-' : (editData?._id || '-')}</div>
                            </div>
                            <div className="w-1/2 flex flex-col text-black">
                                <div className="text-[#6B7280]">MAJOR</div>
                                <div>{editLoading ? '-' : (editData?.author?.major || '-')}</div>
                                <div className="text-[#6B7280] mt-2">LAST MODIFIED</div>
                                <div>
                                    {editLoading ? '-' : (() => {
                                        const last = editData?._updatedAt || editData?.createdAt || editData?._createdAt;
                                        if (!last) return '-';
                                        const d = new Date(last);
                                        return `${d.toISOString().slice(0,10)} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex flex-col text-black mt-4 pb-2 border-[#E5E7EB] border-b-2">
                            <div className="text-[#6B7280]">{editData?._type === 'post' ? 'CONTENT (Text/Pitch)' : 'CONTENT'}</div>
                            <textarea
                                value={formText}
                                onChange={(e) => setFormText(e.target.value)}
                                rows={4}
                                className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={editData?._type === 'post' ? 'Edit post text or pitch' : 'Edit comment text'}
                            />
                        </div>
                        {editData?._type === 'post' && (
                            <div className="w-full flex flex-col text-black mt-4 gap-6">
                                <div>
                                    <div className="text-[#6B7280] mb-2">Images</div>
                                    {formImages.length === 0 && (
                                        <div className="text-sm text-gray-500 mb-2">No images</div>
                                    )}
                                    {formImages.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {formImages.map((u, i) => (
                                                <div key={`img-${i}`} className="relative group">
                                                    <img src={u} alt={`preview-${i}`} className="w-full h-32 object-cover rounded border" />
                                                    <button
                                                        type="button"
                                                        aria-label="Remove image"
                                                        onClick={() => setFormImages(removeArrayItem(formImages, i))}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-600 opacity-90"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    <div className="mt-3">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const url = window.prompt('Enter image URL');
                                                if (url && url.trim()) {
                                                    setFormImages([...formImages, url.trim()]);
                                                }
                                            }}
                                            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 w-fit"
                                        >
                                            Add Image
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-[#6B7280] mb-2">File URLs</div>
                                    {formFiles.map((url, idx) => (
                                        <div key={`file-${idx}`} className="flex items-center gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={url}
                                                onChange={(e) => setFormFiles(updateArray(formFiles, idx, e.target.value))}
                                                className="flex-1 border border-[#E5E7EB] rounded-md px-3 py-2"
                                                placeholder="https://..."
                                            />
                                            <button onClick={() => setFormFiles(removeArrayItem(formFiles, idx))} className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300">Remove</button>
                                        </div>
                                    ))}
                                    <button onClick={() => setFormFiles(addArrayItem(formFiles))} className="mt-1 px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 w-fit">Add File URL</button>
                                </div>
                            </div>
                        )}
                        <div className="justify-end w-full mt-4 flex gap-4">
                            <button
                                onClick={() => setIsEdit(false)}
                                className="text-[#374151] bg-white border border-[#D1D5DB] hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg px-4 py-2 cursor-pointer transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={saveEdit}
                                disabled={savingEdit}
                                className={`text-white border border-[#D1D5DB] text-xl font-bold rounded-lg px-4 py-2 cursor-pointer transition-colors ${savingEdit ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
                            >
                                {savingEdit ? 'Saving…' : 'Confirm Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {isDelete && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/3  text-[#374151]">
                        <button
                            onClick={() => setIsDelete(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                        >
                            &times;
                        </button>
                        <div className="text-xl font-semibold pb-2 border-b-2 border-[#E5E7EB] text-black">Delete Content</div>
                        <div className="mt-4 text-black pb-2 border-b-2 border-[#E5E7EB]">
                            Are you sure you want to delete this content? This action cannot be undone and all associated data will be permanently removed from our servers.
                        </div>
                        <div className="flex justify-end gap-2 mt-6">
                            <button
                                onClick={() => setIsDelete(false)}
                                className="bg-gray-200 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!selectedItem?._id) { setIsDelete(false); return; }
                                    try {
                                        setDeleteLoading(true);
                                        const res = await fetch('/api/content/delete', {
                                            method: 'POST',
                                            headers: { 'Content-Type': 'application/json' },
                                            body: JSON.stringify({ id: selectedItem._id })
                                        });
                                        if (!res.ok) {
                                            const data = await res.json().catch(() => ({}));
                                            throw new Error(data?.error || `Request failed: ${res.status}`);
                                        }
                                        setItems((prev) => prev.filter((x) => x._id !== selectedItem._id));
                                        if (viewData?._id === selectedItem._id) setIsView(false);
                                        setIsDelete(false);
                                        setSelectedItem(null);
                                    } catch (e) {
                                        console.error('Delete failed', e);
                                        setError(e?.message || 'Failed to delete content');
                                    } finally {
                                        setDeleteLoading(false);
                                    }
                                }}
                                disabled={deleteLoading}
                                className={`text-white font-bold py-2 px-4 rounded ${deleteLoading ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
                            >
                                {deleteLoading ? 'Deleting…' : 'Confirm'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}