import Link from "next/link";

const AdminNavbar = () => {
    return (
        <div className="fixed top-0 left-0 h-20 w-full border-[#E5E7EB] border-2 flex bg-white z-1">
                <Link href="/" className="items-center flex ml-6 text-2xl font-bold text-gray-800 cursor-pointer">
                    S3TUDY
                </Link>
        </div>

    );
}

export default AdminNavbar;
