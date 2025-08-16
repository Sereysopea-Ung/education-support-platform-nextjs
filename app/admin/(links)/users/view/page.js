"use client";

import React, { useState } from 'react'; 
import { FaArrowLeft } from 'react-icons/fa';
import { TbTriangleInverted } from 'react-icons/tb';
import Link from 'next/link';

export default function UsersPage() {
  const [selectedCategory, setSelectedCategory] = useState("overview");

  const categories = [
    { label: "Overview", value: "overview" },
    { label: "Posts", value: "posts" },
    { label: "Comments", value: "comments" },
    { label: "Reactions", value: "reactions" },
  ];

  return (
    <div className="w-full h-full bg-[#FFFFFF]">
      <div className="grid grid-cols-12 w-full">
        <div className="grid col-start-3 col-span-10">
          <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
            <Link href="/admin/users" className="flex items-center gap-2 text-gray-800">
              <FaArrowLeft className="text-xl cursor-pointer" />
            </Link>
            View User
          </div>

          {/*Make Functional Buttons */}
          <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-4 text-xl ml-5 z-1">
            <button className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
              Export Data
            </button>
            <Link href="/admin/users/edit" className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
              Edit User
            </Link>
          </div>

          {/* User Info Card */}
          <div className="mt-24 mx-8 rounded-t-lg p-6 bg-white shadow-md flex gap-8 border-b border-[#E5E7EB]">
            <div className="min-h-[200px] min-w-[200px] bg-gray-200 rounded-lg flex items-center justify-center">
              200 x 200
            </div>

            <div className="flex w-full flex-col gap-4 h-full">
              <div className="h-1/2 justify-between flex">
                <div className="flex flex-col gap-2">
                  <div className="text-2xl font-bold text-gray-800">User Name</div>
                  <div className="text-gray-600">User Email</div>
                </div>
                <div className="flex  text-[#374151]">Status</div>
              </div>

              <div className="h-1/2 flex justify-between px-20">
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-[#374151] text-2xl font-bold">Number of posts</div>
                  <div className="text-xl text-[#374151]">Posts</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-[#2563EB] text-2xl font-bold">Number of comments</div>
                  <div className="text-xl text-[#2563EB]">Comments</div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                  <div className="text-[#374151] text-2xl font-bold">Number of Reactions</div>
                  <div className="text-xl text-[#374151]">Reactions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mx-8 px-4 bg-white shadow-md flex gap-8 border-[#E5E7EB] border-b-2">
            <div className="bg-gray flex gap-4 px-2 pt-2 rounded-lg mt-2">
              {categories.map(({ label, value }) => {
                const isSelected = selectedCategory === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedCategory(value)}
                    className={`flex-col flex gap-2 cursor-pointer ${
                      isSelected
                        ? "border-[#2563EB] border-b-3 text-[#2563EB] pb-1"
                        : "border-0 text-[#374151]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
              
          {selectedCategory === "overview" && (
                <>
                <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md flex gap-8 border-[#E5E7EB] border-b-2">
                    <div className="w-full grid gird-cols-2 flex-col gap-8">
                        <div className="col-start-1 col-span-1 flex-col flex gap-4">
                            <div className="text-2xl font-bold text-gray-800">
                            Personal Information
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Department
                                </div>
                                {/* User Department */}
                                <div className="text-black">
                                    User Department
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Year
                                </div>
                                {/* Year */}
                                <div className="text-black">
                                    yyyy
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Join Date
                                </div>
                                {/* Join Date */}
                                <div className="text-black">
                                    yyyy-mm-dd
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Role
                                </div>
                                {/* User Role */}
                                <div className="text-black">
                                    Student/Teacher
                                </div>
                            </div>

                        </div>

                        <div className="col-start-2 col-span-1 flex-col flex gap-4">
                            <div className="text-2xl font-bold text-gray-800">
                                Contact Information
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Email
                                </div>
                                {/* User Email */}
                                <div className="text-black">
                                    user@email.com
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Phone
                                </div>
                                {/* User Phone Number */}
                                <div className="text-black">
                                    +855 11 111 111
                                </div>
                            </div>

                            <div className="text-xl justify-between flex mr-8 border-b-2 border-[#E5E7EB] pb-2">
                                <div className="text-[#6B7280]">
                                    Address
                                </div>
                                {/* User Address */}
                                <div className="text-black">
                                    User Address
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 gap-4 flex-col flex">
                            <div className="text-2xl font-bold text-gray-800">
                                Bio
                            </div>
                            {/* User Bio */}
                            <div className="text-xl text-gray-600">
                                User Bio
                            </div>
                        </div>

                    </div>
                </div>
                </>
          )}

          {(selectedCategory === "posts" || selectedCategory === "comments" || selectedCategory === "reactions") && (
            <>
              <div className="mx-8 px-6 py-4 bg-white shadow-md border-[#E5E7EB]">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-4 flex-wrap w-full">

                      {/* Search Input */}
                      <div className="relative w-1/4">
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full pl-3 pr-4 py-2 rounded-lg border border-gray-200 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Categories */}
                      <div className="">
                        <div className="relative">
                            <select
                                id="category"
                                name="category"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                defaultValue="allcategories"
                            >
                                <option value="allcategories">All Categories</option>
                                <option value="qna">Q&A</option>
                                <option value="lesson">Lesson</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                      <div className="ml-auto">
                        <div className="relative">
                            <select
                                id="state"
                                name="state"
                                className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                defaultValue="popular"
                            >
                                <option value="popular">Popular</option>
                                <option value="oldest">Oldest</option>
                                <option value="recent">Recent</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                            </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
            </>
          )}

          {selectedCategory === "posts" && (
            <>
              <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md border-b-2 border-[#E5E7EB]">

                {/* Post Map  */}
                <div className="flex w-full flex-col bg-[#F9FAFB] p-4 gap-2">
                  <div className="rounded-lg flex justify-between w-full">
                    <div className="flex flex-col gap-2">

                      {/* Post title */}
                      <div className="text-black font-bold text-lg">
                        Title
                      </div>

                      {/* time and date */}
                      <div className="text-[#6B7280] text-sm">
                        yyyy-mm-dd hh:mm AM
                      </div>

                    </div>

                    <div className="gap-2 flex items-center shrink-0">

                      {/* Active/Inactive  */}
                      <div className="text-[#059669] text-md bg-[#D1FAE5] py-1 px-3 rounded-3xl">
                        Active
                      </div>

                      {/* Category */}
                      <div className="text-[#374151] text-md bg-[#F3F4F6] py-1 px-3 rounded-3xl">
                        Category
                      </div>
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="flex justify-between w-full">
                    Text...
                  </div>

                  {/* Upvote and Downvote  */}
                  <div className="flex gap-4 justify-start">
                    <div className="flex">
                      upvote
                    </div>
                    <div className="flex">
                      downvote
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {selectedCategory === "comments" && (
            <>
              <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md border-b-2 border-[#E5E7EB]">

                {/* Comment Map  */}
                <div className="flex w-full flex-col bg-[#F9FAFB] p-4 gap-2">
                  <div className="rounded-lg flex justify-between w-full">
                    <div className="flex flex-col gap-2">

                      {/* Post title */}
                      <div className="text-black font-bold text-lg">
                        Title
                      </div>

                      {/* time and date */}
                      <div className="text-[#6B7280] text-sm">
                        yyyy-mm-dd hh:mm AM
                      </div>

                    </div>

                    {/* Number of upvote  */}
                    <div className="flex">
                      upvote
                    </div>
                  </div>

                  {/* Detail */}
                  <div className="flex justify-between w-full">
                    Text...
                  </div>

                </div>
              </div>
            </>
          )}

          {selectedCategory === "reactions" && (
            <>
              <div className="rounded-b-lg mx-8 px-6 py-4 bg-white shadow-md border-b-2 border-[#E5E7EB]">

                {/* Reaction Map  */}
                <div className="flex w-full flex-col bg-[#F9FAFB] p-4 gap-2">
                  <div className="rounded-lg flex justify-between w-full">
                    <div className="flex flex-col gap-2">

                      {/* Post title */}
                      <div className="text-black font-bold text-lg">
                        Title
                      </div>

                      {/* time and date */}
                      <div className="text-[#6B7280] text-sm">
                        yyyy-mm-dd hh:mm AM
                      </div>

                    </div>

                    {/* Type of reaction  */}
                    <div className="gap-2 flex">
                      Reactions
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
