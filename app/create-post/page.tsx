"use client";

import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";

interface User {
    username: string;
    profile_pic?: string;
    year?: string;
    major?: string;
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

export default function CreatePost() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [postText, setPostText] = useState<string>("");
    const [files, setFiles] = useState<File[]>([]);  // Changed to array to store multiple files
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);  // Store image previews for grid display

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/profileUser?email=${session?.user?.email}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch posts');
                }
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError('Error fetching posts');
                console.error(err);
            }
        };

        if (session?.user?.email) {
            fetchUser();
        } else {
            setError('No session found');
        }
    }, [session]);

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;  // Type assertion: we are asserting that `files` is not null
        if (files) {
            setFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
            console.log("File change " + files);
        }
    };

// Handle image input change
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files as FileList;  // Type assertion: we are asserting that `files` is not null
        if (files) {
            const selectedImages = Array.from(files);
            setImagePreviews(prevPreviews => [
                ...prevPreviews,
                ...selectedImages.map(image => URL.createObjectURL(image))
            ]);
        }
    };


    // Handle form submission (upload files and images)
    const handlePostSubmit = async () => {
        if (files.length === 0 && imagePreviews.length === 0) {
            console.log('No file or image selected');
            return;
        }

        // Here you can add logic to upload the files and images to a server or cloud service
        const formData = new FormData();
        files.forEach(file => {
            formData.append("files", file);
        });

        try {
            const res = await fetch("/api/uploadFile", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Failed to upload file/image");
            }

            console.log("Files uploaded successfully!");
        } catch (err) {
            console.error("Error uploading files:", err);
        }
    };

    // Remove a specific file from the list
    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    // Remove a specific image preview
    const removeImagePreview = (imagePreviewToRemove: string) => {
        setImagePreviews(imagePreviews.filter(preview => preview !== imagePreviewToRemove));
    };

    const [selectedMajors, setSelectedMajors] = useState<string[]>([]);

    // List of available majors
    const availableMajors = ["ITE", "IT", "SCA", "TEED", "BIOE", "Biology", "Math", "Physics", "English", "DMC", "Chemistry", "Chinese", "Sociology"];

    // Handle click event on a major
    const handleMajorClick = (major: string) => {
        // Check if the major is already selected
        if (selectedMajors.includes(major)) {
            // If selected, remove it
            setSelectedMajors(prevMajors => prevMajors.filter(m => m !== major));
        } else {
            // If not selected and max 2 majors, add it
            if (selectedMajors.length < 2) {
                setSelectedMajors(prevMajors => [...prevMajors, major]);
            }
        }
    };

    // State to hold the selected subjects
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

    // List of available subjects
    const availableSubjects = [
        "Linear Algebra", "Database", "Artificial Intelligence", "English",
        "Calculus", "C++", "JAVA", "Computer Fundamental", "Label"
    ];

    // Handle click event on a subject
    const handleSubjectClick = (subject: string) => {
        // Check if the subject is already selected
        if (selectedSubjects.includes(subject)) {
            // If selected, remove it
            setSelectedSubjects(prevSubjects => prevSubjects.filter(s => s !== subject));
        } else {
            // If not selected and max 2 subjects, add it
            if (selectedSubjects.length < 2) {
                setSelectedSubjects(prevSubjects => [...prevSubjects, subject]);
            }
        }
    };

    // Default state is set to "Question"
    const [selectedOption, setSelectedOption] = useState<string>("Question");

    const handleOptionClick = (option: string) => {
        // Toggle between "Question" and "Lesson"
        setSelectedOption(option);
    };

    return (
        <div className="w-full items-center flex justify-center py-10 px-5">
            <div className="h-full w-100 sm:w-120 md:w-140 lg:w-160 border-[#434343] border-1 rounded-lg p-5">
                <div className="w-full flex text-3xl">
                    <Link href="/">
                        X
                    </Link>
                    <div className="text-center w-full text-bold">
                        Create Post
                    </div>
                </div>
                <div className="w-full flex text-xl justify-center items-center gap-10 mt-3">
                    <div
                        onClick={() => handleOptionClick("Question")}
                        className={`cursor-pointer ${selectedOption === "Question" ? "text-blue-500 underline" : "text-gray-500"}`}
                    >
                        Question
                    </div>
                    <div
                        onClick={() => handleOptionClick("Lesson")}
                        className={`cursor-pointer ${selectedOption === "Lesson" ? "text-blue-500 underline" : "text-gray-500"}`}
                    >
                        Lesson
                    </div>
                </div>
                <div className="w-full flex-col text-sm items-center justify-start text-[#2563EB] mt-3">
                    <div className="text-lg font-bold">
                        Tips:
                    </div>
                    <div>
                        _ Be respectful and polite, discuss without hash words
                    </div>
                    <div>
                        _ Follow the community guidelines
                    </div>
                </div>
                <div className="w-full flex text-xl items-center mt-3">
                    <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                        {user?.profile_pic && (
                            <img
                                src={urlFor(user.profile_pic).width(50).height(50).fit('crop').url()}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        )}
                    </div>
                    <h3 className="text-xl text-[#757575] font-normal">{user?.username}</h3>
                </div>
                <div className="w-full mt-3 px-5">
                    <div className="w-full">
                        <textarea
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                            placeholder="Write your post here..."
                            rows={3}
                            className="w-full p-3 border rounded-md resize-none"
                        />
                    </div>
                    <div className="w-full flex gap-1 items-center mt-3">
                        <label htmlFor="file-input" className="hover:cursor-pointer">
                            <Image src="/file.svg" alt="file" width={20} height={20} />
                        </label>
                        <input
                            id="file-input"
                            type="file"
                            accept=".jpg, .jpeg, .png, .pdf, .docx, .txt"
                            onChange={handleFileChange}
                            multiple  // Allows multiple file selection
                            className="hidden"
                        />
                        <label htmlFor="image-input" className="hover:cursor-pointer">
                            <Image src="/image.svg" alt="image" width={20} height={20} />
                        </label>
                        <input
                            id="image-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                            multiple  // Allows multiple image selection
                        />
                    </div>

                    {/* Display image previews in a 2-column grid */}
                    {imagePreviews.length > 0 && (
                        <div className="mt-5 grid grid-cols-2 gap-4">
                            {imagePreviews.map((imagePreview, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={imagePreview}
                                        alt={`Image ${index}`}
                                        className="w-full h-auto object-cover border-1 rounded-md border-gray-600"
                                    />
                                    <button
                                        onClick={() => removeImagePreview(imagePreview)}
                                        className="absolute top-1 right-1 text-red-500 font-bold hover:cursor-pointer"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Display selected files */}
                    {files.length > 0 && (
                        <div className="mt-3">
                            {files.map((file, index) => (
                                <div key={index} className="mt-2 border-1 rounded-md border-gray-600 px-2 flex items-center justify-between">
                                    <p>{file.name}</p>
                                    <button
                                        onClick={() => removeFile(file)}
                                        className="text-red-500 font-bold hover:cursor-pointer"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="w-full mt-3">
                    <div>
                        Major
                        <span className="ml-1 text-[#757575]">
                            • (Maximum 2 labels)
                        </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {availableMajors.map((major, index) => (
                            <button
                                key={index}
                                onClick={() => handleMajorClick(major)}
                                className={`px-3 py-1 text-md rounded-lg border-2 ${selectedMajors.includes(major) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} flex items-center gap-2`}
                            >
                                {selectedMajors.includes(major) && <span className="text-white">✔</span>}
                                {major}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full mt-3">
                    <div>
                        Subject
                        <span className="ml-1 text-[#757575]">
                            • (Maximum 2 labels)
                        </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {availableSubjects.map((subject, index) => (
                            <button
                                key={index}
                                onClick={() => handleSubjectClick(subject)}
                                className={`px-4 py-2 rounded-lg border-2 ${selectedSubjects.includes(subject) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'} flex items-center gap-2`}
                            >
                                {selectedSubjects.includes(subject) && <span className="text-white">✔</span>}
                                {subject}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full mt-3 flex justify-end items-center gap-2">
                    Post
                    <button onClick={handlePostSubmit} className="rounded-md mr-3 hover:cursor-pointer">
                        <Image src="/go.svg" alt="image" width={20} height={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
