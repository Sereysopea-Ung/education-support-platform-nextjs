"use client";

import Link from "next/link";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { TbTriangleInverted } from "react-icons/tb";
import { useState } from "react";

export default function SettingPage(){
    const [isView, setIsView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

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
                            defaultValue="AllType"
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
                            id="department"
                            name="department"
                            className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                            defaultValue=""
                            >
                            <option value="AllDepartment">All Departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Economic">Economic</option>
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
                            defaultValue=""
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
                            Showing 1-2 of 2 results
                        </div>
                        <button className="border-gray-200 border-1 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                            Export to CSV
                        </button>
                    </div>

                    <div className="mx-9 py-2 px-6 text-[#374151] text-md bg-[#F9FAFB] grid grid-cols-8 border-2 border-[#E5E7EB] items-center uppercase">
                        <div>Title</div>
                        <div>Author</div>
                        <div>Department</div>
                        <div>Subject</div>
                        <div>Status</div>
                        <div className="col-span-2">Last Modified</div>
                        <div className="flex justify-end pr-2">Actions</div>
                    </div>

                    {/* Table Row (Example) */}
                    <div className="mx-9 py-2 px-6 text-black text-md grid grid-cols-8 items-center border-b-2 rounded-b-lg border-x-2 border-[#E5E7EB]">
                        <div>Title Name</div>
                        <div>Author Name</div>
                        <div>Department</div>
                        <div>Subject</div>
                        <div>Active/Inactive</div>
                        <div className="flex flex-wrap gap-2 min-w-0 col-span-2">
                            <span className="whitespace-nowrap">2025-06-23</span>
                            <span className="whitespace-nowrap">10:00 AM</span>
                        </div>

                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsView(true)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                View
                            </button>
                            <button onClick={() => setIsEdit(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                Edit
                            </button>
                            <button onClick={() => setIsDelete(true)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                Delete
                            </button>
                        </div>

                    </div>

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
                    <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">Post Title</div>
                    <div className="text-md mt-2 gap-2 flex w-full">
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">AUTHOR</div>
                            <div>Author Name</div>
                            <div className="text-[#6B7280] mt-2">VERSION</div>
                            <div>version</div>
                        </div>
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">DEPARTMENT</div>
                            <div>Department Name</div>
                            <div className="text-[#6B7280] mt-2">LAST MODIFIED</div>
                            <div>yyyy-mm-dd hh:mm</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col text-black mt-4 pb-2 border-[#E5E7EB] border-b-2">
                        <div className="text-[#6B7280]">CONTENT</div>
                        <div>Content details</div>
                    </div>
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
                    <div className="bg-white rounded-lg shadow-lg p-6 relative w-1/2  text-[#374151]">
                        <button
                            onClick={() => setIsEdit(false)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl font-bold"
                        >
                            &times;
                        </button>
                    <div className="text-xl font-semibold pb-2 border-[#E5E7EB] border-b-2">
                        Post Title
                        <input
                            type="text"
                            className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Change Post Title"
                        />
                    </div>
                    <div className="text-md mt-2 gap-2 flex w-full">
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">AUTHOR</div>
                            <div>Author Name</div>
                            <div className="text-[#6B7280] mt-2">VERSION</div>
                            <div>version</div>
                        </div>
                        <div className="w-1/2 flex flex-col text-black">
                            <div className="text-[#6B7280]">DEPARTMENT</div>
                            <div>Department Name</div>
                            <div className="text-[#6B7280] mt-2">LAST MODIFIED</div>
                            <div>yyyy-mm-dd hh:mm</div>
                        </div>
                    </div>
                    <div className="w-full flex flex-col text-black mt-4 pb-2 border-[#E5E7EB] border-b-2">
                        <div className="text-[#6B7280]">CONTENT</div>
                        <div>
                            <input
                            type="text"
                            className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Change Content"
                        />
                        </div>
                    </div>
                    <div className="justify-end w-full mt-2 flex gap-4">
                        <button
                            onClick={() => setIsEdit(false)}
                            className="text-[#374151] bg-white border border-[#D1D5DB] hover:bg-gray-600 hover:text-white text-xl font-bold rounded-lg px-4 py-2 cursor-pointer transition-colors"
                            >
                            Close
                        </button>
                        <button
                            className="text-white bg-blue-500 border border-[#D1D5DB] hover:text-black hover:bg-blue-600 text-xl font-bold rounded-lg px-4 py-2 cursor-pointer transition-colors"
                            >
                            Confirm Changes
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
                                onClick={() => {
                                    // handle actual delete logic here
                                    setIsDelete(false);
                                }}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}