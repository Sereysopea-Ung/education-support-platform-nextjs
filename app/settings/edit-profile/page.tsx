'use client';
import { useState } from "react";
import SaveChange from "@/components/saveChange";

export default function EditProfilePage() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [major, setMajor] = useState("");
    const [role, setRole] = useState("");
    const [academicYear, setAcademicYear] = useState("");

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
            fullName,
            username,
            bio,
            major,
            academicYear,
            role,
            profilePhoto,
        });
    };

    // Options for dropdowns
    const majorOptions = ["ITE", "Math", "IT", "Khmer", "English", "Physics"];
    const academicYearOptions = ["1", "2", "3", "4"];
    const roleOptions = ["Student", "Teacher"];

    return (
        <div className="grid grid-cols-12 h-full w-full">
            <div className="bg-white p-4 shadow-md lg:w-[1080px] md:w-[600px] sm:w-[480px] text-gray-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-[30px] text-gray-800 ml-4 mb-6">Profile</h2>
                    <button className="text-[#1E3A8A]">
                        <img src="/favicon.ico" alt="S3TUDY" className='w-[55px] h-[55px]' />
                        <p className='-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]'>← Back</p>
                    </button>                
                </div>

                <form onSubmit={handleSubmit} className="ml-4">
                    {/* Profile Photo */}
                    <div className="mb-10">
                        <div className="flex items-center">

                            <div className="w-35 h-35 rounded-full bg-gray-200 overflow-hidden">
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

                            <label className="ml-6 text-black cursor-pointer">
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

                    {/* Full Name and Username */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div>
                            <label className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">User Name</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your nickname"
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
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

                    {/* Major, Academic Year, Role */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-700 mb-2">MAJOR</label>
                            <select
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Major</option>
                                {majorOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">ACADEMIC YEAR</label>
                            <select
                                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                                    role === "Teacher" ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                                disabled={role === "Teacher"} // Disable if role is Teacher
                            >
                                <option value="">Select Year</option>
                                {academicYearOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-2">ROLE</label>
                            <select
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Role</option>
                                {roleOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
                    {/* Email Address, Phone Number */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
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
                    <div className="grid grid-cols-2 gap-4 mb-6">
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
    );
}

