"use client";

import React from 'react';
import { FaArrowLeft, FaSearch, FaArrowsAltV } from 'react-icons/fa';
import Link from 'next/link';
import { TbTriangleInverted } from 'react-icons/tb';
import { useState } from 'react';

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full h-full min-h-screen bg-[#FFFFFF]">
        <div className="grid grid-cols-12 w-full">
            <div className="grid col-start-3 col-span-10">
                <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1  text-[#374151]">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
                        <FaArrowLeft className="text-xl cursor-pointer" />
                    </Link>
                    Users
                </div>

                
                <div className="mt-25 mx-3 rounded-lg p-6 flex gap-4">
                    {/* Make this functional */}
                    <div className="relative w-full">
                        <input
                            type="text"
                            placeholder="Search by name, email, or ID"
                            className="w-full pl-2 pr-4 py-2 rounded-lg bg-white border-gray-200 border-1 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-500 w-4 h-4" />
                        </div>
                    </div>

                    {/* Dropdowns for filtering users */}
                    <div className="relative">
                        <select
                        id="role"
                        name="role"
                        className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                        defaultValue=""
                        >
                        <option value="All">All Roles</option>
                        <option value="Teachers">Teachers</option>
                        <option value="Students">Students</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center z-0">
                            <TbTriangleInverted className="text-gray-700 w-4 h-4 z-0" />
                        </div>
                    </div>

                    {/* Dropdown for user status */}
                    <div className="relative">
                        <select
                        id="status"
                        name="status"
                        className="px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                        defaultValue=""
                        >
                        <option value="Allstat">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <TbTriangleInverted className="text-gray-700 w-4 h-4" />
                        </div>
                    </div>
                </div>

                {/* Number of user selected */}
                <div className="ml-10  text-[#374151]">
                    0 Users selected
                </div>

                <div className="mt-4 w-full pl-10 pr-8">
                    <div className="bg-[#F9FAFB] shadow-md grid grid-cols-10 rounded-t-lg py-2 text-black font-semibold border-b-1">
                        <div className="col-start-2 col-span-1 flex items-center">
                            Name
                            <FaArrowsAltV />
                        </div>

                        <div className="col-start-4 col-span-2 flex items-center">
                            Email
                        </div>

                        <div className="col-start-6 col-span-1 flex items-center">
                            Role
                        </div>

                        <div className="col-start-7 col-span-1 flex items-center">
                            Status
                        </div>

                        <div className="col-start-8 col-span-1 flex items-center">
                            Last Active
                        </div>

                        <div className="col-start-10 col-span-1 flex items-center justify-end mr-4">
                            Actions
                        </div>
                    </div>

                    {/* Map for users data */}
                    <div className="bg-white shadow-md grid grid-cols-10 py-2 text-black border-b-1 border-[#E5E7EB]">

                        <div className="col-start-1 col-span-1 flex items-center pl-8">
                            <input type="checkbox" className="w-4 h-4" />
                        </div>

                        <div className="col-start-2 col-span-1 flex items-center">
                            User Name
                        </div>

                        <div className="col-start-4 col-span-2 flex items-center">
                            Email.@rupp.edu.kh
                        </div>

                        <div className="col-start-6 col-span-1 flex items-center">
                            Student/Teacher
                        </div>

                        <div className="col-start-7 col-span-1 flex items-center">
                            Active/Inactive
                        </div>

                        <div className="col-start-8 col-span-1 flex items-center">
                            yyyy-mm-dd
                        </div>

                        <div className="col-start-9 col-span-2 flex items-center justify-end mr-4 gap-2">
                            <Link href="/admin/users/view" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                                View
                            </Link>
                            <Link href="/admin/users/edit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                                Edit
                            </Link>
                            {/* Make the buttons functional */}
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                                Ban
                            </button>
                        </div>
                    </div>

                    <div className="bg-white shadow-md grid grid-cols-10 py-2 border-b-1 border-[#E5E7EB]">

                        {/* only 10 users should be shown in a page, entries are the number of pages? */}
                        <div className="pl-8 col-start-1 col-span-5 flex items-center text-[#6B7280]">
                            Showing 1 to 10 of 200 entries
                        </div>

                        <div className="col-start-6 col-span-5 flex items-center justify-end gap-2 pr-4">
                            <button className="border-gray-200 border-1 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                                Previous
                            </button>

                            {/* Map for the number of pages, only 3 pages should be shown at a time */}
                            {[1, 2, 3].map((page) => (
                                <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-4 py-2 rounded-lg border border-gray-200 transition-colors ${
                                    currentPage === page
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white text-black hover:bg-gray-300'
                                }`}
                                >
                                {page}
                                </button>
                            ))}            

                            <button className="border-gray-200 border-1 text-black px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">
                                Next
                            </button>
                        </div>
                    </div>

                    {/* Make the buttons functional */}
                    <div className="bg-white shadow-md py-2 border-b-1 border-[#E5E7EB] justify-end gap-2 pr-4 w-full flex items-center">
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                            Ban Selected
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Email Selected
                        </button>
                    </div>


                </div>

            </div>
        </div>
    </div>
  );
}