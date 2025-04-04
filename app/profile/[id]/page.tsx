'use client';

import Link from "next/link";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import imageUrlBuilder from "@sanity/image-url";
import {createClient} from "@sanity/client";
import { useSession } from "next-auth/react";
import QuickStats from "@/components/Quickstats";
import {
    faAngleDown,
    faAngleUp,
    faBuilding,
    faCalendarDays,
    faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface User {
    username: string;
    profile_pic?: string;
    bio?: string;
}
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

function urlFor(source:any) {
    return builder.image(source);
}

export default function Profile() {
    const [isOpen, setIsOpen] = useState(false);  // State to track if filter is open or not
    const [selectedFilter, setSelectedFilter] = useState(""); // State to track selected filter option
    const [user, setUser] = useState<User | null>(null)
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);  // Toggle the filter dropdown
    };

    const handleSelectFilter = (filter: string) => {
        setSelectedFilter(filter);  // Set the selected filter option
        setIsOpen(false);  // Close the dropdown after selection
    };
    const [selectedTab, setSelectedTab] = useState('All Posts');

    // Array of tab names
    const tabs = ['All Posts', 'Q&A', 'Lesson', 'Group'];


    useEffect(() => {
        const fetchUser = async () => {
            try {
                // Correct way to interpolate session.email into the URL
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

    const [posts, setPosts] = useState([]);  // Add posts state

    useEffect(() => {
        const fetchUserPosts = async () => {
            if (!session?.user?.email) return;

            try {
                const res = await fetch(`/api/getUserPosts?email=${session.user.email}`);
                if (!res.ok) throw new Error("Failed to fetch user posts");

                const data = await res.json();
                setPosts(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUserPosts();
    }, [session]);


    return (
        <div className="grid grid-cols-12 w-full min-h-screen justify-center">
            <div className="lg:col-start-3 lg:col-span-8 col-span-12 lg:mt-16 w-full">
                {/* Main Content */}

                <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6 w-full">

                    {/* Profile Header - Hidden on mobile, shown on desktop */}
                    <div className="bg-white shadow rounded-lg lg:p-6 p-2 mb-6 w-full lg:mt-0 mt-16 flex justify-between">
                        <div className="flex">
                            <div className="lg:min-w-30 lg:min-h-30 lg:max-w-30 lg:max-h-30 min-w-10 min-h-10 max-w-10 max-h-10 md:min-w-20 md:min-h-20 md:max-w-20 md:max-h-20 bg-gray-100 rounded-full mr-3 overflow-hidden">
                                {user?.profile_pic && (
                                    <img
                                        src={urlFor(user.profile_pic).width(250).height(250).fit('crop').url()}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex-col justify-between flex gap-3">
                                    <div>
                                        <h3 className="lg:text-xl md:text-lg sm:text-md text-sm font-normal text-gray-800">{user?.username}</h3>
                                        <p className="font-mono text-md text-gray-600 lg:text-lg md:text-md sm:text-sm text-xs">
                                            {user?.bio}
                                        </p>
                                    </div>
                                    <Link href="/settings/edit-profile" className="bg-blue-500 text-white px-4 py-2 max-w-30 text-center rounded-xl border-black lg:text-lg md:text-md sm:text-sm text-xs">
                                        Edit Profile
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="lg:hidden items-end">
                            <QuickStats />
                        </div>
                    </div>

                    <div className="flex pb-2 mb-6 border-b border-gray-300 w-full">
                        <div className="md:ml-8 flex md:gap-6 gap-2 w-full">
                            {tabs.map((tab, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedTab(tab)}
                                    className={`relative pb-2 whitespace-nowrap px-2 lg:text-xl md:text-lg sm:text-md text-sm transition-colors duration-200
                                    ${selectedTab === tab
                                            ? 'text-blue-500 font-bold after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-500'
                                            : 'text-gray-700 hover:text-blue-500'}
                                    `}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="relative z-20">
                            <button
                                className="ml-auto whitespace-nowrap text-gray-700 hover:text-blue-500 flex items-center bg-pink-100 rounded-xl px-3 py-1 lg:text-xl md:text-lg sm:text-md text-sm"
                                onClick={handleToggle}
                            >
                                Filter
                                <span className="ml-2">
                                    <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
                                </span>
                            </button>
                            {isOpen && (
                                <div className="absolute top-8 right-0 bg-white shadow-lg rounded-xl mt-2 text-sm w-full z-20">
                                    <div className="cursor-pointer hover:bg-blue-600 hover:text-white transition w-full py-2 px-4 lg:text-xl md:text-lg sm:text-md text-sm rounded-t-xl" onClick={() => handleSelectFilter("Popular")}>
                                        Popular
                                    </div>
                                    <div className="cursor-pointer hover:bg-blue-600 hover:text-white transition w-full py-2 px-4 lg:text-xl md:text-lg sm:text-md text-sm" onClick={() => handleSelectFilter("Recent")}>
                                        Recent
                                    </div>
                                    <div className="cursor-pointer hover:bg-blue-600 hover:text-white transition w-full py-2 px-4 lg:text-xl md:text-lg sm:text-md text-sm rounded-b-xl" onClick={() => handleSelectFilter("Oldest")}>
                                        Oldest mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-30 z-10
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Posts Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-30 z-10">
                        {(posts as any[]).map((post) => (
                            <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
                                <h3 className="font-bold text-lg">{post.title}</h3>
                                <p className="text-gray-600">{post.pitch}</p>
                                {post.postImage && (
                                    <img
                                        src={urlFor(post.postImage).width(400).height(300).url()}
                                        alt="Post Image"
                                        className="w-full mt-2 rounded-md"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

                {/* Right Sidebar*/}
                <div className="lg:top-16 lg:right-0 bottom-0 fixed lg:w-2/12 w-full shadow-lg flex-col rounded-lg h-fit z-10 bg-white" >
                    <div className="p-4">
                        <h3 className="text-lg font-semibold hidden lg:block">About</h3>
                        <div className="flex lg:block justify-around lg:space-y-2 gap-1">

                            <div className="lg:text-lg md:text-md sm:text-sm text-xs text-gray-600 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faGraduationCap} />
                                <span className="flex items-center space-x-3 lg:text-lg md:text-md sm:text-sm text-xs text-nowrap">Year 3</span>
                            </div>

                            <div className="lg:text-lg md:text-md sm:text-sm text-xs text-gray-600 flex items-center space-x-2">
                                {"</>"}
                                <span className="lg:text-lg md:text-md sm:text-sm text-xs ml-1">Computer Science</span>
                            </div>

                            <div className="ml-1 lg:text-lg md:text-md sm:text-sm text-xs text-gray-600 flex items-center space-x-2">
                                <FontAwesomeIcon icon={faBuilding} />
                                <span className="lg:text-lg md:text-md sm:text-sm text-xs ml-1">School of Computing</span>
                            </div>

                            <div className="ml-1 text-gray-600 flex items-center space-x-2 lg:text-lg md:text-md sm:text-sm text-xs">
                                <FontAwesomeIcon icon={faCalendarDays} />
                                <span className="lg:text-lg md:text-md sm:text-sm text-xs ml-1">Joined Since September 2023</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mt-6 hidden lg:block">Contact</h3>
                        <div className="flex items-center justify-center lg:justify-start mt-2 row-span-1 lg:flex-col gap-6">
                            <div className="flex lg:w-full justify-center gap-6">
                                <Link href="/">
                                    <Image src="/phone.svg" alt="Phone number" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                                <Link href="/">
                                    <Image src="/X.svg" alt="X" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                                <Link href="/">
                                    <Image src="/google.svg" alt="Google" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                            </div>
                            <div className="flex lg:w-full justify-center gap-6">
                                <Link href="/">
                                    <Image src="/facebook.svg" alt="Facebook" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                                <Link href="/">
                                    <Image src="/messager.svg" alt="Messager" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                                <Link href="/">
                                    <Image src="/tele.svg" alt="Telegram" width={50} height={50} className={"lg:w-12 md:w-10 sm:w-8 w-6 max-w-10"}/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
