"use client";

import { useSession } from "next-auth/react";
import { doLogout } from "@/pages/api/auth/loginAndLogout";
import { createClient } from "@sanity/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// ✅ Ensure environment variables exist before initializing the client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
});

const Navbar = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<{ username?: string } | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname(); // Get the current pathname
    const isHomePage = pathname === "/";
    const isQnAPage = pathname === "/q&a";
    const isLessonPage = pathname === "/lesson";
    const isCommunityPage = pathname === "/community";
    const isFollowingPage = pathname === "/following";
    const isJobsPage = pathname === "/jobs";
    const isNewsPage = pathname === "/news";
    const isScholarshipsPage = pathname === "/scholarships";

    useEffect(() => {
        if (!session?.user?.email) return;

        const query = `*[_type == "user" && email == $email][0]`;
        const params = { email: session.user.email };

        client.fetch(query, params)
            .then((userData) => setUser(userData))
            .catch((error) => console.error("Error fetching user data:", error));
    }, [session?.user?.email]);

    return (
        <header className="fixed top-0 left-0 w-full bg-white px-4 py-4 h-16 border-b border-gray-100 shadow-md z-50">
            <nav className="flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={32} height={32} className="min-w-[32px] min-h-[32px] " />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center justify-between text-black lg:text-md xl:text-xl text-2xs ">
                    {session?.user?.name ? (
                        <Link href="/" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isHomePage ? "text-blue-500" : ""
                        }`} >
                            <span className="z-10 hover:text-blue-600">Newsfeed</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300 "></span>
                        </Link>
                        ) : (
                        <Link href="/" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isHomePage ? "text-blue-500" : ""
                        }`} >
                            <span className="z-10 hover:text-blue-600">Home</span>
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                        </Link>
                    )}
                    <Link href="/q&a" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isQnAPage ? "text-blue-500" : ""
                    }`} >
                        <span className="z-10 hover:text-blue-600">Q&A</span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                    </Link>
                    <Link href="/lesson" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isLessonPage ? "text-blue-500" : ""
                    }`} >
                        <span className="z-10 hover:text-blue-600">Lesson</span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                    </Link>
                    <Link href="/community" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isCommunityPage ? "text-blue-500" : ""
                    }`} >
                        <span className="z-10 hover:text-blue-600">Community</span>
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                    </Link>
                    {session?.user?.name ? (
                        <div>
                            <Link href="/following" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isFollowingPage ? "text-blue-500" : ""
                            }`} >
                                <span className="z-10 hover:text-blue-600">Following</span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                            </Link>
                        </div>
                        ):(
                        <div>
                            <Link href="/news" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isNewsPage ? "text-blue-500" : ""
                            }`} >
                                <span className="z-10 hover:text-blue-600">News</span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                            </Link>
                            <Link href="/jobs" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isJobsPage ? "text-blue-500" : ""
                            }`} >
                                <span className="z-10 hover:text-blue-600">Jobs</span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                            </Link>
                            <Link href="/scholarships" className={`group relative p-1 lg:px-2  transition cursor-pointer ${isScholarshipsPage ? "text-blue-500" : ""
                            }`} >
                                <span className="z-10 hover:text-blue-600">Scholarships</span>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-blue-600 transition-all duration-300"></span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="absolute top-16 left-0 w-full bg-white flex text-center flex-col items-center shadow-lg lg:hidden transition-all duration-300 z-10">
                        <Link href="/" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Home</Link>
                        {session?.user?.name ? (
                            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Newsfeed</Link>
                        ):(<div></div>)}
                        <Link href="/q&a" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Q&A</Link>
                        <Link href="/lesson" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Lesson</Link>
                        <Link href="/community" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Community</Link>
                        <Link href="/news" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">News</Link>
                        <Link href="/jobs" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Jobs</Link>
                        <Link href="/scholarships" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Scholarships</Link>
                        <Link href="/profile/{id}" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">My Network</Link>
                        <Link href="/collection" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Collection</Link>
                        <Link href="/settings/edit-profile" onClick={() => setMenuOpen(false)} className="hover:bg-blue-600 w-full py-2 hover:text-white transition cursor-pointer">Settings</Link>
                    </div>
                )}

                {/* Mobile Menu Button */}
                <button className="lg:hidden rounded-lg flex items-center justify-center px-1 gap-2 text-black text-2xl transition z-5 hover:cursor-pointer hover:bg-gray-200" onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>

                {/* Search Bar */}
                <button className="flex border border-black rounded-4xl h-[30px] max-w-[250px] md:w-40 w-full lg:w-full items-center justify-left px-2 gap-2 mx-2">
                    <Image src="/Search.svg" alt="Search" width={8} height={8} className="max-w-[16px] max-h-[16px] w-full h-full" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="flex-1 outline-none text-black"
                    />
                </button>

                {/* Auth Buttons */}
                {session?.user?.name ? (
                    <Link href="/create-post">
                        <button className="border bg-blue-600 text-white px-6 py-1 rounded-4xl hover:bg-blue-700 transition cursor-pointer text-nowrap">
                            + Post
                        </button>
                    </Link>
                ) : (
                    <div className="flex lg:gap-4">
                        <Link href="/register">
                            <button className="hidden lg:flex bg-blue-600 text-white px-6 py-1 rounded-4xl hover:bg-blue-700 transition text-nowrap cursor-pointer">
                                Sign Up
                            </button>
                        </Link>
                        <Link href="/login">
                            <button className="border border-blue-600 text-gray-600 px-6 py-1 rounded-4xl hover:bg-blue-600 hover:text-white transition cursor-pointer text-nowrap">
                                Login
                            </button>
                        </Link>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
