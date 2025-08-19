"use client";

import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react";
import RequirementsInput from "@/components/RequirementsInput";
import BenefitsInput from "@/components/BenefitsInput";

type FormDataType = {
  title: string;
  content: string;
  deadline: string;
  company: string;
  location: string;
  salary: string;
  requirements: string[];
  benefits: string[];
  images: string[];
  files: string[];
};

export default function AnnouncementPage() {
  const { data: session } = useSession();
  const [selectedCategory, setSelectedCategory] = useState("post");
  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    content: "",
    deadline: "",
    company: "",
    location: "",
    salary: "",
    requirements: [],
    benefits: [],
    images: [],
    files: [],
    typeofcoverage: "No Coverage",
    typeofjob: "Full Time",
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : [];
    const imgs = selected.filter((f) => f.type.startsWith("image/"));
    const nonImgs = selected.filter((f) => !f.type.startsWith("image/"));

    setImageFiles((prev) => [...prev, ...imgs]);
    setFiles((prev) => [...prev, ...nonImgs]);
    setImagePreviews((prev) => [...prev, ...imgs.map((img) => URL.createObjectURL(img))]);
  };

  const handleSaveDraft = async () => {
    try {
      const res = await fetch("/api/announcement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: selectedCategory,
          ...formData,
          authorEmail: session?.user?.email,
          status: "draft", // 👈 mark as draft
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert("Draft saved successfully!");
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Something went wrong while saving draft.");
      console.error(err);
    }
  };


  const handlePublish = async () => {
    try {
      // upload images
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

      // upload other files
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
          <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 z-10 text-[#374151]">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <FaArrowLeft className="text-xl cursor-pointer" />
            </Link>
            Create Announcement
          </div>

          {/* Main card */}
          <div className="bg-white mt-24 mx-3 rounded-lg">
            {/* Categories */}
            <div className="bg-gray flex gap-4 px-4 py-2 rounded-lg mt-2">
              {categories.map(({ label, value }) => {
                const isSelected = selectedCategory === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedCategory(value)}
                    className={`flex-col flex gap-2 cursor-pointer px-4 py-2 rounded-lg ${
                      isSelected ? "bg-[#EFF6FF] text-[#2563EB]" : "bg-[#F3F4F6] text-[#374151]"
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

            {/* Category specific fields */}
            <div className="px-4">
              {selectedCategory === "scholarship" && (
                <>
                  <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
                    Deadline
                  </label>
                  <input
                    type="date"
                    id="deadline"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                  />
                  <label htmlFor="typeofcoverage" className="block text-sm font-medium text-gray-700 mb-2 mt-4">
                    Type of Coverage
                  </label>
                  <select
                    id="typeofcoverage"
                    name="typeofcoverage"
                    value={formData.typeofcoverage || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                  >
                    <option value="">Select coverage</option>
                    <option value="Full Coverage">Full Coverage</option>
                    <option value="Partial Coverage">Partial Coverage</option>
                    <option value="No Coverage">No Coverage</option>
                  </select>
                  <RequirementsInput
                    onChange={(reqs: string[]) => setFormData((p) => ({ ...p, requirements: reqs }))}
                  />
                
                </>
              )}

              {selectedCategory === "job" && (
                <>
                  <div className="py-2">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Enter company name..."
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                        />
                      </div>
                      <div className="w-1/3">
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                          Type of Job
                      </label>
                      <select
                        id="typeofjob"
                        name="typeofjob"
                        value={formData.typeofjob || ""}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                      >
                        
                        <option value="">Select Type</option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part TIme">Part Time</option>
              
                      </select>
                      </div>
                      <div className="w-1/3">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          id="location"
                          name="location"
                          placeholder="Enter location..."
                          value={formData.location}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                        />
                      </div>
                    </div>
                  </div>

                  <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    placeholder="Enter salary..."
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-[#374151]"
                  />

                  <RequirementsInput
                    onChange={(reqs: string[]) => setFormData((p) => ({ ...p, requirements: reqs }))}
                  />
                  <BenefitsInput
                    onChange={(bens: string[]) => setFormData((p) => ({ ...p, benefits: bens }))}
                  />
                </>
              )}
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
            {selectedCategory === "post" && (
            <div className="px-4 py-2">
              <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
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
            )}

            {/* Footer */}
            <div className="w-full bg-[#F9FAFB] border-t border-gray-200 px-6 py-4 flex justify-between items-center rounded-b-lg">
              <div className="flex gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Save as Draft
                </button>

                {selectedCategory === "post" && (
                <button
                  onClick={() => setShowPreview(true)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                >
                  Preview
                </button>
                )}
              </div>
              <button
                onClick={handlePublish}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
              >
                Publish
              </button>
            </div>
          </div>

          {/* Preview Modal */}
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
