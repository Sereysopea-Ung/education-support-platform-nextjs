'use client';

import { FaFileAlt, FaFlag , FaChartLine } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoMegaphoneOutline } from "react-icons/io5";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';

// ✅ Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// ✅ Sanity image helper
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [profilePic, setProfilePic] = useState(null);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalReports, setTotalReports] = useState(0);
  const [newUsers, setNewUsers] = useState(0);
  const [activityType, setActivityType] = useState("All Activities");
  const [_error, setError] = useState(null);
  const [fetchAllPosts, setFetchAllPosts] = useState([]);


  // ✅ Fetch profile pic
  useEffect(() => {
    if (session?.user?.email) {
      client
        .fetch(`*[_type == "user" && email == $email][0]{ profile_pic }`, {
          email: session.user.email,
        })
        .then((user) => {
          if (user?.profile_pic) {
            setProfilePic(urlFor(user.profile_pic).width(50).height(50).url());
          }
        });
    }
  }, [session]);

  // ✅ Fetch counts
  useEffect(() => {
    async function fetchCounts() {
      try {
        const total = await client.fetch(`count(*[_type == "user"])`);
        setTotalUsers(total);

        const students = await client.fetch(`count(*[_type == "user" && role == "student"])`);
        setTotalStudents(students);

        const teachers = await client.fetch(`count(*[_type == "user" && role == "teacher"])`);
        setTotalTeachers(teachers);

        // Posts in the last 7 days
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
        const posts = await client.fetch(
          `count(*[_type == "post" && _createdAt >= $since])`,
          { since: sevenDaysAgo }
        );
        setTotalPosts(posts);

        // Pending reports
        const reports = await client.fetch(`count(*[_type == "report" && status == "pending"])`);
        setTotalReports(reports);

        // New users in the last 24 hours
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
        const newUsersCount = await client.fetch(
          `count(*[_type == "user" && _createdAt >= $since])`,
          { since: oneDayAgo }
        );
        setNewUsers(newUsersCount);

      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    }

    fetchCounts();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
        try {
            const res = await fetch('/api/getAllTypePosts');
            if (!res.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await res.json();
            setFetchAllPosts(data);
        } catch (err) {
            setError('Error fetching posts');
            console.error(err);
        }
    };

    fetchAllPosts();
  }, []);

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>You are not logged in.</p>;

  return (
    <div className="w-full h-screen bg-[#F9FAFB]">
      <div className="grid grid-cols-12 w-full">

        {/* Top bar */}
        <div className="fixed top-0 right-0 h-20 flex items-center pr-8 gap-2 z-1 text-[#374151]">	
          <div className="p-4 flex items-center gap-4">
            {profilePic && (
              <Image
                src={profilePic}
                alt={session.user.name || 'User profile'}
                width={50}
                height={50}
                className="rounded-full border-2"
              />
            )}
            <p className="font-bold">{session.user.name}</p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="col-start-3 mt-24 px-4 mb-2 flex text-[#6B7280] col-span-10 gap-4">
          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Total Users
              <div className="text-2xl text-[#2563EB]">{totalUsers}</div>
              <div>{totalStudents} Students, {totalTeachers} Teachers</div>
            </div>
            <div className="flex text-4xl text-[#BFDBFE]"><FaUsers /></div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Active Posts
              <div className="text-2xl text-[#2563EB]">{totalPosts}</div>
              <div>Last 7 days</div>
            </div>
            <div className="flex text-4xl text-[#BFDBFE]"><FaFileAlt /></div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Pending Reports
              <div className="text-2xl text-[#EF4444]">{totalReports}</div>
              <div>Requires attention</div>
            </div>
            <div className="flex text-4xl text-[#FECACA]"><FaFlag /></div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              User Growth
              <div className="text-2xl text-[#10B981]">{newUsers}</div>
              <div>Last 24 hours</div>
            </div>
            <div className="flex text-4xl text-[#A7F3D0]"><FaChartLine /></div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-start-3 mt-4 px-4 mb-2 flex text-black col-span-10 gap-1 flex-col">
          <div className="bg-white flex gap-2 p-4 w-full rounded-t-lg">
            <div className="flex justify-between w-full">
              <div className="flex font-bold text-2xl">Recent Activity</div>
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="flex cursor-pointer items-center gap-2 border rounded-lg p-2 bg-white text-[#374151] text-base"
              >
                <option value="All Activities">All Activities</option>
                <option value="User">User</option>
                <option value="Post">Post</option>
                <option value="Report">Report</option>
              </select>
            </div>
          </div>
          <div className="bg-white flex gap-2 p-4 w-full rounded-b-lg">
            {/* Example row */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-3">
                {fetchAllPosts
                ?.filter((post) => {
                  if (activityType === "All Activities") return true;
                  if (activityType === "User") return post._type === "user";
                  if (activityType === "Post")
                    return post._type === "post" || post._type === "job" || post._type === "scholarship";
                  if (activityType === "Report") return post._type === "report";
                  return true;
                })
                .map((post) => (
                  <li key={post._id} className="flex gap-2 items-center">
                    {/* Avatar */}
                    <div>
                      {post?.author?.profile_pic ? (
                        <Image
                          className="rounded-full object-cover w-10 h-10 bg-gray-200 overflow-hidden"
                          src={urlFor(post.author.profile_pic).width(40).height(40).fit("crop").url()}
                          alt={post?.author?.name || "Profile"}
                          width={40}
                          height={40}
                        />
                      ) : (
                        <div className="">
                          
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                      <div className="flex flex-wrap gap-1">
                        {/* Author / Company / Scholarship */}
                        {post?.author?.name || post?.companyName || post?.scholarshipTitle ? (
                          <div className="font-semibold">
                            {post?.author?.name || post?.companyName || post?.scholarshipTitle}
                          </div>
                        ) : null}

                        {/* Activity verb */}
                        <div>
                          {post?._type === "user" && "New user registered:"}
                          {post?._type === "post" && "posted"}
                          {post?._type === "job" && "hired for"}
                          {post?._type === "scholarship" && "provided"}
                          {post?._type === "report" && "reported"}
                        </div>

                        {/* Target / Title */}
                        <div className="text-blue-500">
                          {post?.title ||
                            post?.jobTitle ||
                            post?.typeofcoverage ||
                            post?.reporttype ||
                            post?.name ||
                            post?._id}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div className="text-xs text-gray-500">
                        {post?._createdAt
                          ? post._createdAt.replace("T", " • ").replace("Z", "")
                          : ""}
                      </div>
                    </div>
                  </li>
                ))}

                
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="col-start-3 mt-4 px-4 mb-2 flex text-black col-span-10 gap-5">
          <Link href="/admin/dashboard/announcement" className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2563EB] rounded hover:bg-white hover:text-[#2563EB] transition duration-300 border-1">
            <IoMegaphoneOutline /> Create Announcement
          </Link>
          <Link href="/admin/reports" className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2563EB] rounded hover:bg-white hover:text-[#2563EB] transition duration-300 border-1">
            <FaFlag /> View Reports
          </Link>
        </div>

      </div>
    </div>
  );
}
