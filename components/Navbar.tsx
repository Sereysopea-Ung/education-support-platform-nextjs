"use client";

import { useSession } from "next-auth/react";
import { doLogout } from "@/pages/api/auth/loginAndLogout";
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation"; // Import useRouter for navigation


const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    useCdn: false,
});

// Image URL builder for Sanity images
const builder = imageUrlBuilder(client);
function urlFor(source: any) {
    try {
        return builder.image(source).width(64).height(64).fit("crop").url();
    } catch {
        return "/Default_pfp.jpg";
    }
}

const Navbar = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<{ _id?: string; username?: string; following?: string[] } | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname(); // Get the current pathname
    const isHomePage = pathname === "/";
    const isQnAPage = pathname === "/q&a";
    const isLessonPage = pathname === "/lesson";
    const isFollowingPage = pathname === "/following";
    const isJobsPage = pathname === "/jobs";
    const isNewsPage = pathname === "/news";
    const isScholarshipsPage = pathname === "/scholarships";

    // Notifications state
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState<Array<{ _id: string; pitch: string; _createdAt: string; author?: { username?: string; profile_pic?: any; profile_pic_from_cloudinary?: string } }>>([]);
    const [hasUnread, setHasUnread] = useState(false);
    const notifRef = useRef<HTMLDivElement | null>(null);

    // Fetch current user with following list
    useEffect(() => {
        if (!session?.user?.email) return;
        const query = `*[_type == "user" && email == $email][0]{ _id, username, following }`;
        const params = { email: session.user.email };
        client
            .fetch(query, params)
            .then((userData) => setUser(userData))
            .catch((error) => console.error("Error fetching user data:", error));
    }, [session?.user?.email]);

    // Fetch notifications (recent posts by followings)
    const fetchNotifications = async () => {
        try {
            const following = Array.isArray(user?.following) ? user!.following! : [];
            if (!user?._id || following.length === 0) {
                setNotifications([]);
                setHasUnread(false);
                return;
            }
            const posts = await client.fetch(
                `*[_type == "post" && defined(author._ref) && author._ref in $following] | order(_createdAt desc)[0...10]{ _id, pitch, _createdAt, author->{ username, profile_pic, profile_pic_from_cloudinary } }`,
                { following }
            );
            setNotifications(Array.isArray(posts) ? posts : []);
            // unread detection via localStorage timestamp
            const lastSeenStr = typeof window !== 'undefined' ? localStorage.getItem('notif_last_seen') : null;
            const lastSeen = lastSeenStr ? new Date(lastSeenStr).getTime() : 0;
            const anyNew = (posts || []).some((p: any) => new Date(p?._createdAt || 0).getTime() > lastSeen);
            setHasUnread(anyNew);
        } catch (e) {
            console.error('Failed to fetch notifications:', e);
        }
    };

    useEffect(() => {
        fetchNotifications();
        // re-check on window focus/visibility
        const onFocus = () => fetchNotifications();
        const onVisibility = () => { if (document.visibilityState === 'visible') fetchNotifications(); };
        window.addEventListener('focus', onFocus);
        document.addEventListener('visibilitychange', onVisibility);
        return () => {
            window.removeEventListener('focus', onFocus);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [user?._id, JSON.stringify(user?.following)]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const onDocClick = (e: MouseEvent) => {
            if (!notifOpen) return;
            const target = e.target as Node;
            if (notifRef.current && !notifRef.current.contains(target)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', onDocClick);
        return () => document.removeEventListener('mousedown', onDocClick);
    }, [notifOpen]);

    const router = useRouter();
    
        const handleLogout = async () => {
            await doLogout(); // Call the logout function
            router.push("/"); // Navigate to the homepage after logout
        };

    return (
        <header className="fixed top-0 left-0 w-full bg-white px-4 py-4 h-16 border-b border-gray-100 shadow-md z-50">
            <nav className="flex justify-between items-center">

                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image src="/logo.png" alt="logo" width={32} height={32} className="min-w-[32px] min-h-[32px] " />
                    <span className="text-2xl font-bold ml-2 text-[#0092C6]">S3TUDY</span>
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
                <div>

                </div>

                {/* Auth Buttons */}
                {session?.user?.name ? (
                    <div className="flex lg:gap-4 items-center">
                        {/* Notification Bell */}
                        <div className="relative" ref={notifRef}>
                            <button
                                aria-label="Notifications"
                                className="relative p-2 rounded-full hover:bg-gray-100 text-gray-700"
                                onClick={() => {
                                    setNotifOpen((o) => !o);
                                    if (!notifOpen) {
                                        // mark as read on open
                                        try { localStorage.setItem('notif_last_seen', new Date().toISOString()); } catch {}
                                        setHasUnread(false);
                                    }
                                }}
                            >
                                {/* Bell Icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path d="M12 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 006 14h12a1 1 0 00.707-1.707L18 11.586V8a6 6 0 00-6-6z" />
                                    <path d="M8 16a4 4 0 008 0H8z" />
                                </svg>
                                {/* Red dot */}
                                {hasUnread && (
                                    <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-600"></span>
                                )}
                            </button>
                            {/* Dropdown */}
                            {notifOpen && (
                                <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg">
                                    <div className="px-3 py-2 border-b text-sm font-semibold text-gray-800">Notifications</div>
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-6 text-sm text-gray-600">No recent posts from your followings.</div>
                                    ) : (
                                        <ul className="divide-y divide-gray-100">
                                            {notifications.map((n) => (
                                                <li key={n._id}>
                                                    <Link
                                                        href={`/post/${n._id}`}
                                                        className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50"
                                                        onClick={() => setNotifOpen(false)}
                                                    >
                                                        {/* Avatar */}
                                                        <img
                                                            src={n.author?.profile_pic_from_cloudinary
                                                                    ? n.author.profile_pic_from_cloudinary
                                                                    : (n.author?.profile_pic ? urlFor(n.author.profile_pic) : '/Default_pfp.jpg')}
                                                            alt={n.author?.username || 'Author'}
                                                            className="w-8 h-8 rounded-full object-cover"
                                                            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/Default_pfp.jpg'; }}
                                                        />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm text-gray-800"><span className="font-medium">{n.author?.username || 'Someone'}</span> posted</p>
                                                            <p className="text-sm text-gray-600 line-clamp-2 truncate">{n.pitch || 'New post'}</p>
                                                            <span className="text-xs text-gray-500">{new Date(n._createdAt).toLocaleString()}</span>
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            className="border bg-red-600 text-white px-6 py-1 rounded-4xl hover:bg-red-700 transition cursor-pointer text-nowrap col-end-12"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                        <Link href="/create-post">
                            <button className="border bg-blue-600 text-white px-6 py-1 rounded-4xl hover:bg-blue-700 transition cursor-pointer text-nowrap">
                                + Post
                            </button>
                        </Link>
                    </div>
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
