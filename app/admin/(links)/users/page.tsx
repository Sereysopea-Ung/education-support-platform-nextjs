
"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@sanity/client";
import Link from "next/link";
import { FaArrowLeft, FaSearch, FaArrowsAltV } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import { formatDistanceToNow } from "date-fns";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

type User = {
  _id: string;
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  profile_pic?: React.ReactNode;
  lastActive?: string;
};

import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("Allstat");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const usersPerPage = 10;
 
  useEffect(() => {
  async function fetchUsers() {
    try {
      const data = await client.fetch(`
        *[_type == "user"]{
          _id,
          name,
          email,
          role,
          status,
          profile_pic,
          "lastActive": coalesce(lastActive, _updatedAt, _createdAt),
          _updatedAt,
          _createdAt
        }
      `);

        // Normalize: ensure array, compute most recent time among lastActive, _updatedAt, _createdAt; sort desc
        const arr = Array.isArray(data) ? data : [];
        const toMillis = (v: any) => {
          const t = v ? new Date(v).getTime() : NaN;
          return isNaN(t) ? 0 : t;
        };
        const normalized = arr.map((u: any) => {
          const most = Math.max(toMillis(u.lastActive), toMillis(u._updatedAt), toMillis(u._createdAt));
          return { ...u, lastActive: most ? new Date(most).toISOString() : u.lastActive };
        }).sort((a: any, b: any) => toMillis(b.lastActive) - toMillis(a.lastActive));
        setUsers(normalized);
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // fallback to empty array
      }
    }
    fetchUsers();
  }, []);

  const computeStatus = (u: User) => {
    const explicit = (u.status || '').toLowerCase();
    if (explicit === 'banned') return 'Banned';
    // Derive from lastActive: < 1 week => Active, else Inactive
    if (!u.lastActive) return 'Inactive';
    const last = new Date(u.lastActive).getTime();
    if (isNaN(last)) return 'Inactive';
    const oneWeekMs = 7 * 24 * 60 * 60 * 1000;
    return (Date.now() - last) <= oneWeekMs ? 'Active' : 'Inactive';
  };

  // Filtering
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole =
      roleFilter === "All" || user.role?.toLowerCase() === roleFilter.toLowerCase();
    const derived = computeStatus(user).toLowerCase();
    const matchesStatus =
      statusFilter === "Allstat" || derived === statusFilter.toLowerCase();
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleSelectUser = (id: string) => {
    setSelectedUsers(prev =>
      prev.includes(id)
        ? prev.filter(userId => userId !== id) // remove if already selected
        : [...prev, id] // add if not selected
    );
  };
 
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <div className="w-full h-full min-h-screen bg-[#FFFFFF] text-black">
      <div className="grid grid-cols-12 w-full">
        <div className="grid col-start-3 col-span-10">
          {/* Header */}
          <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1 text-[#374151]">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
              <FaArrowLeft className="text-xl cursor-pointer" />
            </Link>
            Users
          </div>

          {/* Search & Filters */}
          <div className="mt-24 mx-3 rounded-lg p-6 flex gap-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by name or email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-2 pr-4 py-2 rounded-lg bg-white border-gray-200 border-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-500 w-4 h-4" />
              </div>
            </div>

            {/* Role filter */}
            <div className="relative">
              <select
                id="role"
                name="role"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-sm focus:outline-none appearance-none pr-10"
              >
                <option value="All">All Roles</option>
                <option value="Teacher">Teachers</option>
                <option value="Student">Students</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
              </div>
            </div>

            {/* Status filter */}
            <div className="relative">
              <select
                id="status"
                name="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-gray-200 text-black rounded-lg shadow-sm focus:outline-none appearance-none pr-10"
              >
                <option value="Allstat">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Banned">Banned</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div className="mt-4 w-full pl-10 pr-8">
            <div className="bg-[#F9FAFB] shadow-md grid grid-cols-10 rounded-t-lg py-2 text-black font-semibold border-b-1">
              <div className="col-start-2 col-span-1 flex items-center">
                Name <FaArrowsAltV />
              </div>
              <div className="col-start-4 col-span-2 flex items-center">Email</div>
              <div className="col-start-6 col-span-1 flex items-center">Role</div>
              <div className="col-start-7 col-span-1 flex items-center">Status</div>
              <div className="col-start-8 col-span-1 flex items-center">Last Active</div>
              <div className="col-start-10 col-span-1 flex justify-end pr-">Actions</div>
            </div>

            {/* User rows */}
            {paginatedUsers.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md grid grid-cols-10 py-2 text-black border-b-1 border-[#E5E7EB]"
              >
                <div className="col-start-1 col-span-1 flex items-center pl-8">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => toggleSelectUser(user._id)}
                    className="w-4 h-4"
                  />
                </div>
                <div className="col-start-2 col-span-2 flex items-center break-words pr-3">
                  {user.profile_pic && (
                    <img
                      src={urlFor(user.profile_pic)}
                      alt={user.name || "User profile"}
                      className="w-10 h-10 rounded-full mr-1"
                    />
                  )} 
                  {user.name}
                </div>
                <div className="col-start-4 col-span-2 flex items-center break-all pr-3">{user.email}</div>
                <div className="col-start-6 col-span-1 flex items-center">
                  <div className={`p-1 rounded-lg border
                     ${user.role?.toLowerCase() === "student"
                      ? "bg-[#F3E8FF] text-[#6B21A8]"
                      : user.role?.toLowerCase() === "teacher"
                      ? "bg-[#E1EFFE] text-[#1E40AF]"
                      : "bg-transparent border-none p-0"
                    }`}
                  >
                  {user.role}
                  </div>
                </div>
                <div className="col-start-7 col-span-1 flex items-center">
                  {(() => {
                    const s = computeStatus(user);
                    const lower = s.toLowerCase();
                    let cls = 'bg-transparent border-none p-0';
                    if (lower === 'active') cls = 'bg-green-100 text-green-800';
                    else if (lower === 'inactive') cls = 'bg-yellow-100 text-yellow-800';
                    else if (lower === 'banned') cls = 'bg-red-100 text-red-800';
                    return (
                      <div className={`p-1 rounded-lg border ${cls}`}>
                        {s}
                      </div>
                    );
                  })()}
                </div>
                <div className="col-start-8 col-span-1 flex items-center">
                  {user.lastActive
                    ? formatDistanceToNow(new Date(user.lastActive), { addSuffix: true })
                    : "Never"}
                </div>

                <div className="col-start-9 col-span-2 flex items-center justify-end mr-4 gap-2">
                  <Link
                    href={`/admin/users/view/${user._id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/users/edit/${user._id}`}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    Edit
                  </Link>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                    Ban
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="bg-white shadow-md grid grid-cols-10 py-2 border-b-1 border-[#E5E7EB]">
              <div className="pl-8 col-start-1 col-span-5 flex items-center text-[#6B7280]">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length} entries
              </div>
              <div className="col-start-6 col-span-5 flex items-center justify-end gap-2 pr-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="border-gray-200 border-1 text-black px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 rounded-lg border border-gray-200 ${
                        currentPage === page
                          ? "bg-blue-500 text-white"
                          : "bg-white text-black hover:bg-gray-300"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="border-gray-200 border-1 text-black px-4 py-2 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Bulk Actions */}
            <div className="bg-white shadow-md py-2 border-b-1 border-[#E5E7EB] gap-2 pr-4 w-full flex items-center">
              <div className="ml-5">
                {selectedUsers.length} Users Selected
              </div>
              <div className="flex items-center gap-2 ml-auto justify-end">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                Ban Selected
              </button>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Email Selected
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}