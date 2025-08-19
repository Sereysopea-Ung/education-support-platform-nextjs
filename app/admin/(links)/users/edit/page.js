"use client";

import React, { useState } from 'react'; 
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function EditUserPage(){
    const [selectedCategory, setSelectedCategory] = useState("profile");
    
    const categories = [
        { label: "Profile", value: "profile" },
        { label: "Security", value: "security" },
    ];

    return (
        <div className="w-full h-full min-h-screen bg-[#FFFFFF]">
            <div className="grid grid-cols-12 w-full">
                <div className="grid col-start-3 col-span-10">
                    <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1 text-[#374151]">
                        <Link href="/admin/users" className="flex items-center gap-2 text-gray-800">
                            <FaArrowLeft className="text-xl cursor-pointer" />
                        </Link>
                        Edit User
                    </div>

                    {/* Functional Buttons */}
                    <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-4 text-xl ml-5 z-1">
                        <Link href="/admin/users" className="bg-[#F3F4F6] text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                            Cancel
                        </Link>
                        <button className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                            Save Changes
                        </button>
                    </div>

                    <div className="mt-20 mx-3 rounded-t-lg p-6 flex gap-4">
                        {categories.map(({ label, value }) => {
                            const isSelected = selectedCategory === value;
                            return (
                            <button
                                key={value}
                                onClick={() => setSelectedCategory(value)}
                                className={`flex-col flex gap-2 cursor-pointer px-3 py-2 rounded-lg ${
                                isSelected
                                    ? "bg-[#2563EB] text-white"
                                    : "bg-[#F3F4F6] text-black"
                                }`}
                            >
                                {label}
                            </button>
                            );
                        })}
                    </div>

                    {selectedCategory === "profile" && (
                        <>
                        <div className="mx-8 rounded-t-lg p-6 bg-white shadow-md flex gap-8 border-b border-[#E5E7EB] border-b-[#E5E7EB]">
                            <div className="min-h-[200px] min-w-[200px] bg-gray-200 rounded-lg flex text-[#374151] items-center justify-center">
                                200 x 200
                            </div>

                            <div className="flex w-full flex-col gap-4 h-full">
                                <div className="h-1/2 justify-between flex">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-2xl font-bold text-gray-800">
                                            User Name
                                        </div>
                                        <div className="text-gray-600">
                                            User Email
                                        </div>
                                    </div>
                                    <div className="flex">
                                        Status
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Make it a functional form */}
                        <div className="mx-8 rounded-b-lg p-6 bg-white shadow-md gap-8 border-b border-[#E5E7EB] grid grid-cols-2">
                            <div className="col-span-1 col-start-1 flex flex-col gap-4">
                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        UserName
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        School Email
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        Major
                                    </label>
                                    <input
                                        type="text"
                                        id="major"
                                        name="major"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-1 col-start-2 flex flex-col gap-4">
                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        Academic year
                                    </label>
                                    <input
                                        type="number"
                                        id="username"
                                        name="username"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="number"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                                        Register Since
                                    </label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500  text-[#374151]"
                                    />
                                </div>
                            </div>
                        </div>
                        </>
                    )}

                    {selectedCategory === "security" && (
                        <>
                        <div>
                            <div className="mx-8 rounded-t-lg p-6 bg-white shadow-md flex flex-col gap-4 border-b border-[#E5E7EB] border-b-[#E5E7EB] rounded-lg">
                                <div className="text-2xl font-bold text-gray-800">
                                    Change Password
                                </div>
                                <div className="text-xl text-[#6B7280]">
                                    Current Password
                                </div>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="text-xl text-[#6B7280]">
                                    New Password
                                </div>
                                <input
                                    type="password"
                                    id="newpassword"
                                    name="newpassword"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="text-xl text-[#6B7280]">
                                    Confirm New Password
                                </div>
                                <input
                                    type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <button className="bg-[#2563EB] text-white hover:bg-blue-600 cursor-pointer text-2xl py-2 rounded-lg mt-4 shadow-lg">
                                    Change Password
                                </button>
                            </div>

                            <div className="mt-8 mx-8 rounded-t-lg p-6 bg-white shadow-md flex flex-col gap-4 border-b border-[#E5E7EB] border-b-[#E5E7EB] rounded-lg">
                                <div className="text-2xl font-bold text-gray-800">
                                    Active Sessions
                                </div>

                                {/* Make a map of sessions  */}
                                <div className="border-[#E5E7EB] border-1 w-full rounded-lg p-4 gap-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="text-lg text-black font-bold">
                                            Device Name
                                        </div>
                                        {/* Current Session/Terminate Session */}
                                        <div className="text-md text-[#059669] bg-[#D1FAE5] px-2 py-1 rounded-3xl">
                                            Current Session
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col text-[#6B7280] text-md">
                                        <div className="flex gap-2">
                                            {/* Name of Broswer */}
                                            <div>
                                                Broswer
                                            </div>
                                            •
                                            {/* Location  */}
                                            <div>
                                                Location
                                            </div>
                                        </div>

                                        <div className="gap-2 flex">
                                            IP Address:
                                            {/* Get IP  */}
                                            <div>
                                                User IP
                                            </div>
                                        </div>

                                        <div className="gap-2 flex">
                                            Last Active:
                                            {/* Date of last Activity*/}
                                            <div>
                                                yyyy-mm-dd hh:mm:ss
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="mt-8 mb-8 mx-8 rounded-t-lg p-6 bg-white shadow-md flex flex-col gap-4 border-b border-[#E5E7EB] border-b-[#E5E7EB] rounded-lg">
                                <div className="text-2xl font-bold text-gray-800">
                                    Activity Log
                                </div>

                                {/* Make a map of Activities */}
                                <div className="border-[#E5E7EB] border-1 w-full rounded-lg p-4 gap-4">
                                    <div className="flex gap-4 items-center">
                                        {/* Get title  */}
                                        <div className="text-lg text-black font-bold">
                                            Title
                                        </div>
                                    </div>
                                    
                                    <div className="flex flex-col text-[#6B7280] text-md">

                                        <div className="gap-2 flex">
                                            {/* Date of Activity*/}
                                            <div>
                                                yyyy-mm-dd hh:mm:ss
                                            </div>
                                            •
                                            {/* Location  */}
                                            <div>
                                                Location
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            <div>
                                                Device: 
                                            </div>
                                            {/* Name of Broswer */}
                                            <div>
                                                Name of Device 
                                            </div>
                                            •
                                            {/* Broswer  */}
                                            <div>
                                                Broswer
                                            </div>
                                        </div>

                                        <div className="gap-2 flex">
                                            IP Address:
                                            {/* Get IP  */}
                                            <div>
                                                User IP
                                            </div>
                                        </div>
 
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