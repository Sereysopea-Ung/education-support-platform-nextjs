'use client';
import { useState } from "react";
import SaveChange from "@/components/saveChange";

export default function EditProfilePage() {
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");

    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const photoURL = URL.createObjectURL(file);
            setProfilePhoto(photoURL);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission (e.g., API call to save changes)
        console.log({
            username,
            bio,
            profilePhoto,
        });
    };

    // No dropdown options needed after removing Major/Year/Role

    return (
        <div className="w-full bg-gray-100">
            <div className="bg-gray-100 text-gray-700 w-full px-0 py-4 sm:py-6 md:py-8 xl:py-10 2xl:py-12 overflow-x-hidden">
                <div className="w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-800">Profile</h2>
                    <button className="text-[#1E3A8A] flex items-center gap-2 hover:underline">
                        <span aria-hidden>←</span>
                        <span className="text-base sm:text-lg">Back</span>
                    </button>                
                </div>

                <form onSubmit={handleSubmit} className="ml-0 text-left">
                    {/* Profile Photo */}
                    <div className="mb-10">
                        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">

                            <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 xl:w-36 xl:h-36 rounded-full bg-gray-200 overflow-hidden">
                                {profilePhoto ? (
                                    <img
                                        src={profilePhoto}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                    ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    No Photo
                                </div>
                                )}
                            </div>

                            <label className="ml-0 sm:ml-6 text-black cursor-pointer">
                                <div className="border-1 px-3 py-3 rounded-[10px] border-gray-400 hover:bg-gray-200 hover:cursor-pointer">
                                    <span>Change Photo</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handlePhotoChange}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Username only */}
                    <div className="mb-10">
                        <label className="block text-gray-700 mb-2">User Name</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your nickname"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Bio */}
                    <div className="mb-10">
                        <label className="block text-gray-700 mb-2">Bio</label>
                        <textarea
                            value={bio}
                            placeholder="Tell us about yourself"
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full p-3 border-gray-500 border-1 h-[150px] rounded-[10px] 
                                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                                      resize-none text-gray-900 placeholder-gray-400"
                            rows={3}
                        />
                    </div>

                    {/* Removed: Major, Academic Year, Role */}
                    
                    {/* Email Address, Phone Number */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                                />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                                />
                        </div>
                    </div>

                    {/* Telegram, Facebook */}
                    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6 2xl:gap-8 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">Telegram <span className="text-slate-600">(optional)</span></label>
                            <input
                                type="text"
                                placeholder="@yourusername"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">Facebook <span className="text-slate-600">(optional)</span></label>
                            <input
                                type="url"
                                placeholder="https://facebook.com/yourprofile"
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm 
                                            focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                            text-gray-900 placeholder-gray-400"
                                />
                        </div>
                    </div>

                    {/* Save Changes Button */}
                    <SaveChange />

                </form>
                </div>
            </div>
        </div>
    );
}

