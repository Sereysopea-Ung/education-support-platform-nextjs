'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MyNetworkPage() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("My Network");
  const [search, setSearch] = useState("");

  // Placeholder counts
  const followingCount = 0;
  const followersCount = 0;
  const totalPeople = followingCount + followersCount;

  return (
    <section>
      <header>
        <title>S3TUDY | My Network</title>
      </header>

      <div className="h-full w-screen grid grid-cols-1 lg:grid-cols-12 bg-gray-100 text-gray-900 min-h-screen">
        {/* Top navbar - spans full width */}
        <div className="col-span-12 bg-white w-full h-[80px] flex items-center justify-between px-6 shadow-sm">
          {/* logo + name */}
          <div className="flex items-center gap-3">
            <img src="/favicon.ico" alt="Logo" className="w-8 h-8" />
            <span className="text-xl font-semibold text-[#0092C6]">S3TUDY</span>
          </div>
          {/* search bar */}
          <div className="w-full max-w-[480px]">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search people..."
              className="h-11 w-full rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none placeholder:text-gray-400"
            />
          </div>
          {/* amount of people */}
          <div className="text-sm text-gray-600">
            {totalPeople} {totalPeople === 1 ? 'person' : 'people'}
          </div>
        </div>
        {/* Left sidebar */}
        <aside className="hidden lg:block lg:col-span-3">
          <div className="sticky p-4">
            <div className="rounded-2xl shadow-sm bg-white">
              {/* Profile placeholder */}
              <div className="flex items-center gap-4 p-4">
                <img src="/Default_pfp.jpg" alt="User" className="rounded-full border w-12 h-12 object-cover" />
                <div className="flex flex-col">
                  <p className="font-semibold text-gray-900">Your Name</p>
                  <p className="text-sm text-gray-700">Your Major • Year X</p>
                </div>
              </div>
              {/* Menu */}
              <ul className="flex flex-col gap-y-2 p-4">
                <li className="p-2 rounded-md hover:bg-gray-50 hover:cursor-pointer text-gray-700" onClick={() => router.push('/homepage')}>
                  Home
                </li>
                <li className={`p-2 rounded-md hover:cursor-pointer ${activeMenu === 'My Network' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setActiveMenu('My Network')}>
                  My Network
                </li>
                <li className="p-2 rounded-md hover:bg-gray-50 hover:cursor-pointer text-gray-700" onClick={() => router.push('/collection')}>
                  Collection
                </li>
                <li className="p-2 rounded-md hover:bg-gray-50 hover:cursor-pointer text-gray-700" onClick={() => router.push('/opportunity')}>
                  Opportunity
                </li>
                <li className="p-2 rounded-md hover:bg-gray-50 hover:cursor-pointer text-gray-700" onClick={() => router.push('/news')}>
                  News
                </li>
              </ul>
            </div>
          </div>
        </aside>

        {/* Right content */}
        <main className="lg:col-span-9 pt-6">

          {/* Content sections */}
          <div className="px-6 py-6 space-y-6">
            {/* People you follow */}
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold mb-3">People you follow</h2>
              <p className="text-gray-600 text-sm">No data yet. This section will list users you follow.</p>
            </section>

            {/* People who follow you */}
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="text-lg font-semibold mb-3">People who follow you</h2>
              <p className="text-gray-600 text-sm">No data yet. This section will list users who follow you.</p>
            </section>
          </div>
        </main>
      </div>
    </section>
  );
}
