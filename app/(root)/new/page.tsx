"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NewsItem = {
  _id: string;
  pitch?: string;
  _createdAt?: string;
  author?: {
    username?: string;
    profile_pic?: any; // Ignored here; showing text-only to avoid Sanity builder dependency.
  };
};

type SortOrder = "Newest" | "Oldest";

export default function NewPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("Newest");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/getTopNews", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch news");
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message || "Could not load news");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    let items = !term
      ? news
      : news.filter((n) => {
          const u = n.author?.username?.toLowerCase() || "";
          const p = n.pitch?.toLowerCase() || "";
          return u.includes(term) || p.includes(term);
        });

    items = [...items].sort((a, b) => {
      const ta = new Date(a?._createdAt || 0).getTime();
      const tb = new Date(b?._createdAt || 0).getTime();
      return sortOrder === "Newest" ? tb - ta : ta - tb;
    });
    return items;
  }, [news, search, sortOrder]);

  return (
    <section className="min-h-screen bg-gray-100 text-gray-900">
      {/* Top navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
              <span className="text-2xl text-[#0092C6] font-semibold">S3TUDY</span>
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
                aria-label="Go back"
              >
                Back
              </button>
              <Link
                href="/homepage"
                className="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
                aria-label="Go to homepage"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Controls */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row gap-3 md:items-center">
          {/* Search */}
          <div className="flex-1">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search news by author or content..."
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder:text-gray-600"
            />
          </div>

          {/* Sort */}
          <div className="w-full md:w-56">
            <label className="sr-only" htmlFor="sort">
              Sort
            </label>
            <select
              id="sort"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as SortOrder)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="p-4 text-sm text-gray-700 bg-white rounded-lg border">Loading...</div>
          )}
          {error && (
            <div className="p-4 text-sm text-red-700 bg-white rounded-lg border border-red-300">
              {error}
            </div>
          )}
          {!loading && !error && filtered.length === 0 && (
            <div className="p-4 text-sm text-gray-700 bg-white rounded-lg border">No results.</div>
          )}

          <div className="space-y-4">
            {filtered.map((article) => (
              <div key={article._id} className="p-4 bg-white rounded-lg border">
                <div className="flex items-start gap-3">
                  {/* Placeholder avatar (text-only page to avoid Sanity image dep) */}
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold">
                    {(article.author?.username || "U").slice(0, 1).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">
                        {article.author?.username || "Unknown"}
                      </p>
                      <span className="text-xs text-gray-700">
                        {article._createdAt
                          ? new Date(article._createdAt).toLocaleDateString()
                          : ""}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-800 whitespace-pre-wrap">
                      {article.pitch || ""}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}