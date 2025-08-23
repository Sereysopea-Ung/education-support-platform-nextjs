"use client";

import React, { useEffect, useMemo, useState } from 'react'; 
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useParams } from 'next/navigation';
import client from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { department as departmentList } from '@/helper-files/department';

export default function EditUserPage(){
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    const [selectedCategory, setSelectedCategory] = useState("profile");
    const [_loading, setLoading] = useState(true);
    const [_error, setError] = useState(null);

    // Form state
    const [username, setUsername] = useState("");
    const [major, setMajor] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [_createdAt, setCreatedAt] = useState("");

    // Security state
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [pwLoading, setPwLoading] = useState(false);
    const [pwMessage, setPwMessage] = useState("");

    // Sanity image URL builder
    const builder = useMemo(() => imageUrlBuilder(client), []);
    const urlFor = (source) => (source ? builder.image(source).width(200).height(200).fit('crop').url() : null);

    const categories = [
        { label: "Profile", value: "profile" },
        { label: "Security", value: "security" },
    ];

    useEffect(() => {
        if (!id) return;
        const run = async () => {
            setLoading(true);
            setError(null);
            try {
                const u = await client.fetch(`*[_type=="user" && _id==$id][0]{
                  _id,
                  username,
                  role,
                  department,
                  major,
                  bio,
                  profile_pic,
                  _createdAt
                }`, { id });

                if (u) {
                    setUsername(u.username || "");
                    setMajor(u.major || "");
                    setRole(u.role || "");
                    setBio(u.bio || "");
                    setProfilePic(u.profile_pic || null);
                    setCreatedAt(u._createdAt || "");
                }
            } catch (e) {
                console.error(e);
                setError('Failed to load user');
            } finally {
                setLoading(false);
            }
        };
        run();
    }, [id]);

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
                            <div className="min-h-[200px] min-w-[200px] bg-gray-200 rounded-lg flex text-[#374151] items-center justify-center overflow-hidden">
                                {profilePic ? (
                                    <img src={urlFor(profilePic)} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-sm text-gray-500">No Image</div>
                                )}
                            </div>

                            <div className="flex w-full flex-col gap-4 h-full">
                                <div className="h-1/2 justify-between flex">
                                    <div className="flex flex-col gap-2">
                                        <div className="text-2xl font-bold text-gray-800">
                                            {username || 'Username'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Make it a functional form */}
                        <div className="mx-8 rounded-b-lg p-6 bg-white shadow-md gap-8 border-b border-[#E5E7EB] grid grid-cols-2">
                            <div className="col-span-1 col-start-1 flex flex-col gap-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="major" className="block text-sm font-medium text-gray-700 mb-2">
                                        Major
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="major"
                                            name="major"
                                            value={major}
                                            onChange={(e) => setMajor(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                        >
                                            <option value="">Select a major</option>
                                            {departmentList.filter(Boolean).map((m) => (
                                                <option key={m} value={m}>{m}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-1 col-start-2 flex flex-col gap-4">
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                                        Role
                                    </label>
                                    <div className="relative">
                                        <select
                                            id="role"
                                            name="role"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-200 text-black border-none rounded-lg shadow-sm focus:outline-none focus:ring-0 hover:border-none appearance-none pr-10"
                                        >
                                            <option value="">Select a role</option>
                                            <option value="student">Student</option>
                                            <option value="teacher">Teacher</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Bio full-width row */}
                            <div className="col-span-2">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={5}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                                />
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
                                    New Password
                                </div>
                                <input
                                    type="password"
                                    id="newpassword"
                                    name="newpassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                <div className="text-xl text-[#6B7280]">
                                    Confirm New Password
                                </div>
                                <input
                                    type="password"
                                    id="confirmpassword"
                                    name="confirmpassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                                {pwMessage && (
                                    <div className="text-sm mt-2 {pwMessage.startsWith('Error') ? 'text-red-600' : 'text-green-600'}">
                                        {pwMessage}
                                    </div>
                                )}
                                <button
                                  onClick={async () => {
                                    setPwMessage("");
                                    if (!newPassword || newPassword.length < 6) {
                                      setPwMessage('Error: Password must be at least 6 characters.');
                                      return;
                                    }
                                    if (newPassword !== confirmPassword) {
                                      setPwMessage('Error: Passwords do not match.');
                                      return;
                                    }
                                    try {
                                      setPwLoading(true);
                                      const res = await fetch('/api/users/updatePassword', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json' },
                                        body: JSON.stringify({ id, newPassword })
                                      });
                                      const data = await res.json();
                                      if (!res.ok) throw new Error(data?.error || 'Request failed');
                                      setPwMessage('Password updated successfully.');
                                      setNewPassword("");
                                      setConfirmPassword("");
                                    } catch (e) {
                                      setPwMessage(`Error: ${e.message || 'Failed to update password'}`);
                                    } finally {
                                      setPwLoading(false);
                                    }
                                  }}
                                  disabled={pwLoading}
                                  className={`bg-[#2563EB] text-white hover:bg-blue-600 cursor-pointer text-2xl py-2 rounded-lg mt-4 shadow-lg ${pwLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                  {pwLoading ? 'Updating…' : 'Change Password'}
                                </button>
                            </div>

                        </div>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}