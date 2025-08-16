"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import RequirementsInput from "@/components/RequirementsInput"; // Assuming you have this component for requirements input
import BenefitsInput from "@/components/BenefitsInput";
import { TbTriangleInverted } from "react-icons/tb";

export default function AnnouncementPage() {
  const [selectedCategory, setSelectedCategory] = useState("announcement");

  const categories = [
    { label: "Announcement", value: "announcement" },
    { label: "Scholarship", value: "scholarship" },
    { label: "Job Opportunity", value: "job" },
    { label: "School News", value: "news" },
  ];

  return (
    <div className="w-full h-full bg-[#F9FAFB]">
        <div className="grid grid-cols-12 w-full">
        <div className="grid col-start-3 col-span-10">

            <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
                <Link href="/admin/dashboard" className="flex items-center gap-2 ">
                <FaArrowLeft className="text-xl cursor-pointer" />
                </Link>
                Create Announcement
            </div>
            
            {/* Data for topic */}
            <div className="bg-white mt-25 mx-3 rounded-lg">
            <div className="bg-gray flex gap-4 px-4 py-2 rounded-lg mt-2">
              {categories.map(({ label, value }) => {
                const isSelected = selectedCategory === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedCategory(value)}
                    className={`flex-col flex gap-2 cursor-pointer px-4 py-2 rounded-lg ${
                      isSelected
                        ? "bg-[#EFF6FF] text-[#2563EB]"
                        : "bg-[#F3F4F6] text-[#374151]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Data for title */}
            <div className="px-4 py-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter title..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                />
            </div>

            {/* Data for category */}
            {/* Conditional input based on category */}
            <div className="px-4">
            {selectedCategory === "scholarship" && (
                <>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                </label>
                <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                />
                <RequirementsInput />
                </>
                
            )}

            {selectedCategory === "job" && (
                <>
                <div className=" py-2">
                    <div className="flex gap-4">
                        {/* Company Input */}
                        <div className="w-1/2">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                            Company
                        </label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            placeholder="Enter company name..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                        />
                        </div>

                        {/* Location Input */}
                        <div className="w-1/2">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Enter location..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]" 
                        />
                        </div>
                    </div>
                </div>
                
                {/* Job Type Input */}
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                </label>
                <input
                    type="text"
                    id="salary"
                    name="salary"
                    placeholder="Enter salary..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                />
                
                <RequirementsInput />
                <BenefitsInput />
                </>
            )}

            {(selectedCategory === "announcement" || selectedCategory === "news") && (
                <>
                {/* Category Input */}
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                </label>
                <div className="relative">
                    <select
                        id="category"
                        name="category"
                        className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                        defaultValue=""
                    >
                        <option value="" disabled>
                        Select category...
                        </option>
                        <option value="announcement">Announcement</option>
                        <option value="scholarship">Scholarship</option>
                        <option value="job">Job Opportunity</option>
                        <option value="news">School News</option>
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                        <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                    </div>
                </div>
                </>
            )}
            </div>



            {/* Data for content */}
            <div className="px-4 py-2">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                </label>
                <textarea
                    id="content"
                    name="content"
                    placeholder="Enter content..."
                    rows={6} // You can adjust the number of rows here
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                ></textarea>
            </div>

            {/* Data for attachments */}
            <div className="px-4 py-2">
                <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
                    Attachments
                </label>
                <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center w-full h-48 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
                >
                    <svg
                    className="w-8 h-8 text-gray-500 mb-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, DOC, DOCX, PNG, JPG up to 10MB</p>
                    <input id="file-upload" type="file" className="hidden" />
                </label>
            </div>


            <div className="w-full bg-[#F9FAFB] border-t border-gray-200 px-6 py-4 flex justify-between items-center rounded-b-lg">
                <div className="flex gap-3">
                    {/* Save as Draft and Preview buttons */}
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    Save as Draft
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                    Preview
                    </button>
                </div>
                {/* Publish button */}
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
                    Publish
                </button>
            </div>

        </div>

        </div>
        </div>
    </div>
  );
}
