import { FaFileAlt, FaFlag , FaChartLine} from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoMegaphoneOutline } from "react-icons/io5";
import Link from "next/link";

export default function Dashboard() {
  return (
  <div className = "w-full h-screen bg-[#F9FAFB]">
    <div className = "grid grid-cols-12 w-full">

        <div className = "fixed top-0 right-0 h-20 flex items-center pr-8 gap-2 z-1 text-[#374151]">	
          {/* Need admin Profile from database */}
          <div className="w-10 h-10 rounded-full border-1 text-[#374151]" />
          Admin Profile
        </div>

        <div className = "col-start-3 mt-24 px-4 mb-2 flex text-[#6B7280] col-span-10 gap-4">

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Total Users
              <div className="text-2xl text-[#2563EB]">
                {/* All users combine */}
                Number of users
              </div>
              <div>
                {/* Data of student */}
                Number of students,
              </div>
              <div>
                {/* Data of teacher */}
                Number of teachers
              </div>
            </div>
            <div className="flex text-4xl text-[#BFDBFE]">
              <FaUsers />
            </div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Active Posts
              <div className="text-2xl text-[#2563EB]">
                {/* Posts in the last 7 days */}
                Number of posts
              </div>
              <div>
                Last 7 days
              </div>
            </div>
            <div className="flex text-4xl text-[#BFDBFE]">
              <FaFileAlt />
            </div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Active Posts
              <div className="text-2xl text-[#EF4444]">
                {/* Reports yet to be read */}
                Number of reports
              </div>
              <div>
                Requires attention
              </div>
            </div>
            <div className="flex text-4xl text-[#FECACA]">
              <FaFlag />
            </div>
          </div>

          <div className="bg-white w-1/4 flex justify-between gap-2 p-4 rounded-lg">
            <div className="flex-col flex gap-2">
              Active Posts
              <div className="text-2xl text-[#10B981]">
                {/* Numbers of new users */}
                Number of users
              </div>
              <div>
                LAst 24 hours
              </div>
            </div>
            <div className="flex text-4xl text-[#A7F3D0]">
              <FaChartLine />
            </div>
          </div>

        </div>

        <div className="col-start-3 mt-4 px-4 mb-2 flex text-black col-span-10 gap-1 flex-col">

          <div className="bg-white flex gap-2 p-4 w-full rounded-t-lg">
            <div className="flex justify-between w-full">
              <div className="flex font-bold text-2xl">
                Recent Activity
              </div>
              <button className="flex cursor-pointer items-center gap-2 border-1 rounded-lg p-2">
                {/* Not sure what all the options are */}
                All Activities
                <IoIosArrowDown />
              </button>
            </div>
          </div>

          <div className="bg-white flex gap-2 p-4 w-full rounded-b-lg">

            {/* Use as map */}
            <div className="flex items-center gap-2">
              <div>
                {/* User Avatar */}
                <div className="w-10 h-10 rounded-full border-1" />
              </div>
              <div className="flex flex-col">
                <div>
                  {/* User Name */}
                  User Name
                  {/* Activity Description */}
                  Posted a new article
                </div>
                <div className="text-[#6B7280]">
                  {/* Timestamp */}
                  2 hours ago
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="col-start-3 mt-4 px-4 mb-2 flex text-black col-span-10 gap-5">
          <Link href="/admin/dashboard/announcement" className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2563EB] rounded hover:bg-white hover:text-[#2563EB] transition duration-300 border-1">
            <IoMegaphoneOutline />
            Create Announcement
          </Link>
          <Link href="/admin/reports" className="inline-flex items-center gap-2 px-4 py-2 text-white bg-[#2563EB] rounded hover:bg-white hover:text-[#2563EB] transition duration-300 border-1">
            <FaFlag />
            View Reports
          </Link>
        </div>

    </div>
  </div>
  );
}
