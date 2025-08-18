"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import RequirementsInput from "@/components/RequirementsInput";
import BenefitsInput from "@/components/BenefitsInput";

export default function AnnouncementPage() {
  const { data: session } = useSession();

  const [selectedCategory, setSelectedCategory] = useState("post");
  const [formData, setFormData] = useState<any>({
    title: "",
    content: "",
    deadline: "",
    company: "",
    location: "",
    salary: "",
    requirements: [],
    benefits: [],
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  const categories = [
    { label: "Announcement", value: "post" },
    { label: "Scholarship", value: "scholarship" },
    { label: "Job Opportunity", value: "job" },
    { label: "School News", value: "news" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];

    const imgs = selected.filter(f => f.type.startsWith("image/"));
    const nonImgs = selected.filter(f => !f.type.startsWith("image/"));

    setImageFiles(prev => [...prev, ...imgs]);
    setFiles(prev => [...prev, ...nonImgs]);
    setImagePreviews(prev => [...prev, ...imgs.map(img => URL.createObjectURL(img))]);
  };

  const handlePublish = async () => {
    try {
      // Upload images to Cloudinary
      const uploadedImageUrls: string[] = [];
      for (const img of imageFiles) {
        const form = new FormData();
        form.append("file", img);
        form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: "POST", body: form }
        );
        const data = await res.json();
        if (data.secure_url) uploadedImageUrls.push(data.secure_url);
      }

      // Upload other files to Cloudinary
      const uploadedFileUrls: string[] = [];
      for (const file of files) {
        const form = new FormData();
        form.append("file", file);
        form.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
          { method: "POST", body: form }
        );
        const data = await res.json();
        if (data.secure_url) uploadedFileUrls.push(data.secure_url);
      }

      const res = await fetch("/api/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          ...formData,
          images: uploadedImageUrls,
          files: uploadedFileUrls,
          authorEmail: session?.user?.email,
        }),
      });

      const result = await res.json();
      if (result.success) {
        alert("Announcement published successfully!");
        setImageFiles([]); 
        setFiles([]); 
        setImagePreviews([]); 
        setShowPreview(false);
      } else {
        alert("Error: " + result.error);
      }
    } catch (err) {
      alert("Something went wrong.");
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full bg-[#F9FAFB]">
      <div className="grid grid-cols-12 w-full">
        <div className="grid col-start-3 col-span-10">
          <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-1 text-[#374151]">
            <Link href="/admin/dashboard" className="flex items-center gap-2 ">
              <FaArrowLeft className="text-xl cursor-pointer" />
            </Link>
            Create Announcement
          </div>

          {/* Main card */}
          <div className="bg-white mt-25 mx-3 rounded-lg">
            {/* Categories */}
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

            {/* Title */}
            <div className="px-4 py-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter title..."
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
              />
            </div>

            {/* Content */}
            <div className="px-4 py-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Enter content..."
                rows={6}
                value={formData.content}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
              ></textarea>
            </div>

            {/* Attachments */}
            <div className="px-4 py-2">
              <label htmlFor="files" className="block text-sm font-medium text-gray-700 mb-2">
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
                <input id="file-upload" type="file" multiple onChange={handleFileSelect} className="hidden" />
              </label>
            </div>

            {/* Footer buttons */}
            <div className="w-full bg-[#F9FAFB] border-t border-gray-200 px-6 py-4 flex justify-between items-center rounded-b-lg">
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                  Save as Draft
                </button>
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Preview
                </button>
              </div>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Publish
              </button>
            </div>
          </div>

          {/* Preview Modal/Section */}
          {showPreview && (
            <div className="mt-6 bg-white shadow rounded-lg p-4">
              <h2 className="text-lg font-bold mb-3">Preview</h2>
              <p className="font-semibold">Title: {formData.title}</p>
              <p className="mb-3">{formData.content}</p>

              {imagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt={`preview-${idx}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              {files.length > 0 && (
                <ul className="mt-3 list-disc pl-5">
                  {files.map((f, idx) => (
                    <li key={idx}>{f.name}</li>
                  ))}
                </ul>
              )}

              <button
                onClick={() => setShowPreview(false)}
                className="mt-4 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Close Preview
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
