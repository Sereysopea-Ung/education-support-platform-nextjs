"use client";

import { useState, useEffect } from "react";
import imageUrlBuilder from "@sanity/image-url";
import client from "@/sanity/lib/client";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function EventSection() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/getUserByFollower");
        if (!res.ok) throw new Error("Failed to fetch people");
        setPeople(await res.json());
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    })();
  }, []);

  return (
    <div className="event-section border-1 border-gray-300 bg-white rounded-lg p-4 ml-5 mt-5">
      <h2 className="text-lg font-bold mb-3">People to follow</h2>
      <div className="space-y-3 border-t-1 pt-2 border-[#E5E7EB] gap-2">
        {people.map((person) => (
          <div key={person._id} className="flex items-center gap-3">
            <img
              src={
                person.profile_pic
                  ? urlFor(person.profile_pic).width(50).height(50).url()
                  : "/placeholder.png"
              }
              alt={person.username || "User"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium">{person.username || "Unknown"}</p>
              <p className="text-sm text-gray-500">
                {person.major || "N/A"} • Year {person.year || "-"}
              </p>
            </div>
            <button className="ml-auto bg-blue-500 text-white px-3 py-1 rounded text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
