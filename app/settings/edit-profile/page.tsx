"use client";

import { useState } from "react";

export default function EditProfilePage() {
    const [fullName, setFullName] = useState("Seawlang");
    const [username, setUsername] = useState("MEOOW MEOOW16");
    const [bio, setBio] = useState("Passionate about physics and teaching");
    const [major, setMajor] = useState("ITE");
    const [academicYear, setAcademicYear] = useState("");
    const [role, setRole] = useState("");
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
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile</h2>
            <form onSubmit={handleSubmit}>
                {/* Profile Photo */}
                <div className="mb-6">
                    <div className="flex items-center">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
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
                        <label className="ml-4 text-blue-600 cursor-pointer">
                            <span>CHANGE PHOTO</span>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Full Name and Username */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-700 mb-2">FULL NAME</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">USER NAME</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <label className="block text-gray-700 mb-2">BIO</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                    />
                </div>

                {/* Major, Academic Year, Role */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-gray-700 mb-2">MAJOR</label>
                        <select
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
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
                            value={academicYear}
                            onChange={(e) => setAcademicYear(e.target.value)}
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
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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

                {/* Save Changes Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                >
                    SAVE CHANGES
                </button>
            </form>
        </div>
    );
}