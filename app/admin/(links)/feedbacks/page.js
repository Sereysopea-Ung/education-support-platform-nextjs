"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";

export default function FeedbackPage() {
  const [isOpen, setIsOpen] = useState(false);

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
              <button className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
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
                  className="pl-2 pr-20 py-2 rounded-lg bg-white border-gray-200 border-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {/* Type Select */}
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                    defaultValue="All"
                  >
                    <option value="All">All Types</option>
                    <option value="Feature">Feature</option>
                    <option value="Bug">Bug Report</option>
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
                    defaultValue="Alls"
                  >
                    <option value="Alls">All Status</option>
                    <option value="New">New</option>
                    <option value="Inprogress">In Progress</option>
                    <option value="Resolved">Resolved</option>
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
                  <div>User</div>
                  <div>Type</div>
                  <div>Category</div>
                  <div>Rating</div>
                  <div>Status</div>
                  <div>Date</div>
                  <div className="flex justify-end pr-2">Actions</div>
                </div>

                {/* Table Row (Example) */}
                <div className="w-full py-2 px-6 text-black text-md grid grid-cols-7 items-center">
                  <div>User Name</div>
                  <div>Type of Feedback</div>
                  <div>Type of Category</div>
                  <div>1 to 5 stars</div>
                  <div>Status Type</div>
                  <div className="col flex gap-2">
                    <span>2025-06-23</span>
                    <span>10:00 AM</span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setIsOpen(true)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      View
                    </button>
                  </div>
                </div>

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
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
            >
              &times;
            </button>
            <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">Feedback Details</div>
            <div className="text-md mt-2 gap-2 flex flex-col">

                <div className="flex text-[#6B7280]">
                    <div className="w-1/2">User</div>
                    <div className="w-1/2">Date</div>
                </div>
                <div className="flex">
                    <div className="w-1/2">User Name</div>
                    <div className="w-1/2">yyyy-mm-dd hh:mm AM</div>
                </div>

                <div className="text-[#6B7280] mt-4">Description</div>
                <div className="bg-[#F9FAFB] p-2 rounded-lg">Info of the Description</div>

                <div className="text-[#6B7280] mt-4">Comments</div>
                <div className="border-l-2 border-[#E5E7EB] p-2 flex flex-col gap-2">
                    <div className="flex gap-4">
                        <div className="font-bold">
                            Support Team
                        </div>
                        <div>
                            yyyy-mm-dd hh:mm AM
                        </div>   
                    </div>
                    <div>
                        Comment detail
                    </div>
                    
                </div>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
