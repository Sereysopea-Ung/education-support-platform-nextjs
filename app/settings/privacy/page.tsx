'use client';
import React, { useState } from "react";

export default function PrivacyPage() {
  type Audience = "Public" | "Private" | "Friends";
  type PostAudience = "Everyone" | "Friends" | "Only me";

  type BlockedUser = {
    id: string;
    name: string;
    handle: string;
    blockedOn: string;
    avatarInitials: string;
  };

  const [profileVisibility, setProfileVisibility] = useState<Audience>("Public");
  const [postAudience, setPostAudience] = useState<PostAudience>("Everyone");
  const [blocked, setBlocked] = useState<BlockedUser[]>([
    { id: "1", name: "Srey_Sart", handle: "Srey_Sart", blockedOn: "10/15/2023", avatarInitials: "S" },
    { id: "2", name: "Tong_Cute", handle: "Tong_Cute", blockedOn: "10/15/2023", avatarInitials: "T" },
  ]);

  const [toast, setToast] = useState<string | null>(null);
  const lastUpdated = "Jan 15, 2025";

  function handleUnblock(id: string) {
    setBlocked((prev) => prev.filter((u) => u.id !== id));
  }

  function handleSave() {
    setToast("Changes saved");
    setTimeout(() => setToast(null), 1800);
  }

  return (
    <div className="bg-white overflow-x-hidden h-screen grid grid-cols-12">
      <div className="bg-white p-4 col-span-9 col-start-4 text-gray-500">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
            {/* Title */}
            <h1 className="text-[30px] text-gray-800 ml-4">Privacy</h1>
            <button className="text-[#1E3A8A]">
                <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
                <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
            </button>    
        </div>       

        {/* Profile Visibility */}
        <div className="px-4 py-3 mb-3">
          <div className="text-[16px] text-gray-500 mb-1">Profile Visibility</div>
            <select
                className="w-full p-3 border border-gray-200 rounded-lg bg-white
                        focus:outline-none focus:ring-2 focus:ring-indigo-200"
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value as Audience)}
            >
                <option>Public</option>
                <option>Follower</option>
                <option>Private</option>
            </select>
          <p className="text-[16px] text-gray-500 mt-2">Control who can view your profile information</p>
        </div>

        {/* Post Audience */}
        <div className="px-4 py-3 mb-3">
          <div className="text-[16px] text-gray-500 mb-1">Who Can See My Posts?</div>
          <select
            className="w-full p-3 border border-gray-200 rounded-lg bg-white
                       focus:outline-none focus:ring-2 focus:ring-indigo-200"
            value={postAudience}
            onChange={(e) => setPostAudience(e.target.value as PostAudience)}
          >
            <option>Everyone</option>
            <option>Follow</option>
            <option>Only me</option>
          </select>
          <p className="text-[16px] text-gray-500 mt-2">Set who can see your posts and activities</p>
        </div>

        <div className="h-px bg-gray-200 my-3 mb-25" />

        {/* Blocked Users */}
        <div className="px-4 pb-4 mb-2">
          <div className="text-[16px] text-gray-500 mb-2">Blocked Users</div>
          {blocked.length === 0 ? (
            <div className="text-[16px] text-gray-500">You have no blocked users.</div>
          ) : (
            blocked.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-3 mt-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full grid place-items-center bg-indigo-50 text-blue-600 font-bold">
                    {u.avatarInitials}
                  </div>
                  <div>
                    <div className="font-semibold">{u.name}</div>
                    <div className="text-xs text-gray-500">Blocked on {u.blockedOn}</div>
                  </div>
                </div>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleUnblock(u.id)}
                >
                  Unblock
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 mb-3">
            <div className="text-[16px] text-gray-500">Last updated: {lastUpdated}</div> 
        </div>

        <div className="px-4">
            <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
                onClick={handleSave}
                >
                Save Changes
            </button>            
        </div>

      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
