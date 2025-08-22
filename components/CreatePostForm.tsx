"use client";

import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  profile_pic?: string;
  year?: string;
  major?: string;
}

interface CreatePostFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
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

export default function CreatePostForm({ onClose, onSuccess }: CreatePostFormProps) {
  const { data: session } = useSession();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [postText, setPostText] = useState<string>("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedMajors, setSelectedMajors] = useState<string[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("Q&A");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/profileUser?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError("Error fetching user");
        console.error(err);
      }
    };

    if (session?.user?.email) fetchUser();
    else setError("No session found");
  }, [session]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    if (files) {
      const selectedImages = Array.from(files);
      setImageFiles((prev) => [...prev, ...selectedImages]);
      setImagePreviews((prev) => [
        ...prev,
        ...selectedImages.map((image) => URL.createObjectURL(image)),
      ]);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files as FileList;
    if (files) {
      const selectedFiles = Array.from(files).filter(
        (file) => !file.type.startsWith("image/")
      );
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handlePostSubmit = async () => {
    setError(null);
    setLoading(true);

    if (!postText.trim()) {
      setError("Post text is required");
      setLoading(false);
      return;
    }

    const uploadedImageUrls: string[] = [];
    for (const imageFile of imageFiles) {
      const imageForm = new FormData();
      imageForm.append("file", imageFile);
      imageForm.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: imageForm }
      );
      const data = await res.json();
      if (data.secure_url) uploadedImageUrls.push(data.secure_url);
    }

    const uploadedFileUrls: string[] = [];
    for (const file of files) {
      const fileForm = new FormData();
      fileForm.append("file", file);
      fileForm.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
      );

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        { method: "POST", body: fileForm }
      );
      const data = await res.json();
      if (data.secure_url) uploadedFileUrls.push(data.secure_url);
    }

    const postPayload = {
      postText,
      major: selectedMajors,
      subject: selectedSubjects,
      typePost: selectedOption,
      authorEmail: session?.user?.email,
      images: uploadedImageUrls,
      files: uploadedFileUrls,
    };

    try {
      const res = await fetch("/api/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postPayload),
      });
      setLoading(false);
      if (!res.ok) throw new Error("Failed to create post");

      // cleanup
      setPostText("");
      setFiles([]);
      setImageFiles([]);
      setImagePreviews([]);
      setSelectedMajors([]);
      setSelectedSubjects([]);

      if (onSuccess) onSuccess();
      else router.push("/homepage");
    } catch (err) {
      setError("Error creating post");
      setLoading(false);
      console.error(err);
    }
  };

  const availableMajors = [
    "ITE",
    "IT",
    "SCA",
    "TEED",
    "BIOE",
    "Biology",
    "Math",
    "Physics",
    "English",
    "DMC",
    "Chemistry",
    "Chinese",
    "Sociology",
  ];

  const handleMajorClick = (major: string) => {
    if (selectedMajors.includes(major)) {
      setSelectedMajors((prev) => prev.filter((m) => m !== major));
    } else if (selectedMajors.length < 2) {
      setSelectedMajors((prev) => [...prev, major]);
    }
  };

  const availableSubjects = [
    "Linear Algebra",
    "Database",
    "Artificial Intelligence",
    "English",
    "Calculus",
    "C++",
    "JAVA",
    "Computer Fundamental",
    "Label",
  ];

  const handleSubjectClick = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects((prev) => prev.filter((s) => s !== subject));
    } else if (selectedSubjects.length < 2) {
      setSelectedSubjects((prev) => [...prev, subject]);
    }
  };

  return (
    <div className="w-full items-center flex justify-center py-2 px-5 bg-transparent text-black">
      <div className="h-full w-100 sm:w-120 md:w-140 lg:w-160 border-[#434343] border-1 rounded-lg p-5 bg-white">
        <div className="w-full flex text-3xl">
          {onClose ? (
            <button onClick={onClose} aria-label="Close" className="px-2 hover:text-red-500 cursor-pointer">X</button>
          ) : null}
          <div className="text-center w-full font-semibold">Create Post</div>
        </div>

        <div className="w-full flex text-xl justify-center items-center gap-10 mt-3">
          <div
            onClick={() => setSelectedOption("Q&A")}
            className={`cursor-pointer ${selectedOption === "Q&A" ? "text-blue-500 underline" : "text-gray-500"}`}
          >
            Q&A
          </div>
          <div
            onClick={() => setSelectedOption("Lesson")}
            className={`cursor-pointer ${selectedOption === "Lesson" ? "text-blue-500 underline" : "text-gray-500"}`}
          >
            Lesson
          </div>
        </div>

        <div className="w-full flex-col text-sm items-center justify-start text-[#2563EB] mt-3">
          <div className="text-lg font-bold">Tips:</div>
          <div>_ Be respectful and polite, discuss without hash words</div>
          <div>_ Follow the community guidelines</div>
        </div>

        <div className="w-full flex text-xl items-center mt-3">
          <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
            {user?.profile_pic && (
              <img
                src={urlFor(user.profile_pic).width(50).height(50).fit("crop").url()}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h3 className="text-xl text-[#757575] font-normal">{user?.username}</h3>
        </div>

        {error && <div className="text-red-600 mt-2 text-sm">{error}</div>}

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
              multiple
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
              multiple
            />
          </div>

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
                    onClick={() =>
                      setImagePreviews((prev) => prev.filter((p) => p !== imagePreview))
                    }
                    className="absolute top-1 right-1 text-red-500 font-bold hover:cursor-pointer"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )} 

          {files.length > 0 && (
            <div className="mt-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="mt-2 border-1 rounded-md border-gray-600 px-2 flex items-center justify-between"
                >
                  <p>{file.name}</p>
                  <button
                    onClick={() => setFiles((prev) => prev.filter((f) => f !== file))}
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
            <span className="ml-1 text-[#757575]">• (Maximum 2 labels)</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableMajors.map((major, index) => (
              <button
                key={index}
                onClick={() => handleMajorClick(major)}
                className={`px-3 py-1 text-md rounded-lg border-2 cursor-pointer ${
                  selectedMajors.includes(major)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } flex items-center gap-2`}
              >
                {major}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mt-3">
          <div>
            Subject
            <span className="ml-1 text-[#757575]">• (Maximum 2 labels)</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {availableSubjects.map((subject, index) => (
              <button
                key={index}
                onClick={() => handleSubjectClick(subject)}
                className={`px-4 py-2 rounded-lg border-2 cursor-pointer ${
                  selectedSubjects.includes(subject)
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } flex items-center gap-2`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        <div className="w-full mt-3 flex justify-end items-center gap-2">
          {loading ? (
            <span className="text-blue-500 font-bold mr-3">Uploading...</span>
          ) : (
            <>
              Post
              <button onClick={handlePostSubmit} className="rounded-md mr-3 hover:cursor-pointer">
                <Image src="/go.svg" alt="image" width={20} height={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
