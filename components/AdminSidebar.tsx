import Link from "next/link";
import { IoMdHome } from "react-icons/io";
import { FaFileAlt, FaFlag, FaChartLine, FaCog } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

const AdminSidebar = () => {
  return (
    <div className="flex fixed top-20 left-0 h-full w-1/6 border-[#E5E7EB] border-2 flex-col pl-4 pt-2 text-xl text-gray-800 bg-white z-1">
      <Link
        href="/admin/dashboard"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <IoMdHome className="text-2xl" />
        Dashboard
      </Link>
      <Link
        href="/admin/users"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <FaUsers className="text-2xl"/>
        Users
      </Link>
      <Link
        href="/admin/content"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <FaFileAlt className="text-2xl"/>
        Content
      </Link>
      <Link
        href="/admin/reports"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <FaFlag className="text-2xl" />
        Reports
      </Link>
      <Link
        href="/admin/feedbacks"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <FaChartLine className="text-2xl" />
        Feedback
      </Link>
      <Link
        href="/admin/settings"
        className="flex hover:bg-[#EFF6FF] hover:text-[#2563EB] mr-4 p-2 hover:rounded items-center gap-2"
      >
        <FaCog className="text-2xl" />
        Settings
      </Link>
    </div>
  );
};

export default AdminSidebar;
