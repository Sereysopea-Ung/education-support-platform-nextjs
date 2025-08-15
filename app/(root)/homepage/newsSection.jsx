"use client";

import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function NewsSection() {
  const [news, setNews] = useState([]);

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

  return (
    <div className="news-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
      <h2 className="text-lg font-bold mb-3">Trending News</h2>
      <div className="space-y-4">
        {news.map((article) => (
          <div key={article._id} className="flex gap-3 pb-3 p-3 bg-[#E5E7EB] rounded-lg">
            <img
              src={
                article.author?.profile_pic
                  ? urlFor(article.author.profile_pic).width(50).height(50).url()
                  : "/placeholder.png"
              }
              alt={article.author?.username || "Author"}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{article.author?.username || "Unknown"}</p>
              <p className="text-sm text-gray-600">{article.pitch || ""}</p>
              <span className="text-xs text-gray-400">
                {article._createdAt
                  ? new Date(article._createdAt).toLocaleDateString()
                  : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
