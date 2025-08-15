'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import imageUrlBuilder from '@sanity/image-url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faBullhorn, faGear,
    faGraduationCap,
    faHome,
    faStar,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import { createClient } from "@sanity/client";

interface User {
    _id: string;
    username: string;
    profile_pic?: string;
    year?: string;
    major?: string;
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true, // safe for public reads
});

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source);
}

const Sidebar = () => {
    const { data: session } = useSession();
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/profileUser?email=${session?.user?.email}`);
                if (!res.ok) throw new Error('Failed to fetch user data');
                const data = await res.json();
                setUser(data);
            } catch (err) {
                setError('Error fetching user data');
                console.error(err);
            }
        };

        if (session?.user?.email) {
            fetchUser();
        }
    }, [session]);

    const profileLink = user?._id ? `/profile/${user._id}` : "#";

    return (
        <div>
            {/* Mobile Sidebar */}
            <div className="lg:hidden flex flex-col md:px-5 md:w-8/12 border-black mt-20 w-full mb-5">
                <div className="top-0 bg-white w-full border-[#E5E7EB] border rounded-lg flex">
                    <Link href={profileLink} className="flex m-5 justify-between w-full items-center">
                        <div className="flex items-center">
                            <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                                {user?.profile_pic && (
                                    <img
                                        src={urlFor(user.profile_pic).width(50).height(50).fit('crop').url()}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-xl font-normal text-gray-800">{user?.username}</h3>
                                <p className="font-mono text-md text-gray-600">
                                    {user?.major} • year {user?.year}
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex flex-col min-h-screen bg-white mt-16 w-2/12 border-[#E5E7EB] border fixed top-0 left-0">
                <div className="top-0 h-screen w-full">
                    <Link href={profileLink} className="flex items-center mb-8 pl-5 mt-5 w-full">
                        <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                            {user?.profile_pic && (
                                <img
                                    src={urlFor(user.profile_pic).width(50).height(50).fit('crop').url()}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <div className="flex-col w-full">
                            <h3 className="text-xl font-normal text-gray-800 w-full break-all">
                                {user?.username}
                            </h3>
                            <p className="font-mono text-md text-gray-600 break-words">
                                {user?.major} • year {user?.year}
                            </p>
                        </div>
                    </Link>

                    {/* Sidebar Links */}
                    <nav className="flex mb-8 flex-col w-full text-black">
                        <Link href="/" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faHome} size="lg" />
                            <span>Home</span>
                        </Link>
                        <Link href="/mynetwork" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-6 hover:text-white">
                            <FontAwesomeIcon icon={faUser} size="lg" />
                            <span>My Network</span>
                        </Link>
                        <Link href="/collection" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faStar} size="lg" />
                            <span>Collection</span>
                        </Link>
                        <Link href="/jobs" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faBriefcase} size="lg" />
                            <span>Job</span>
                        </Link>
                        <Link href="/news" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faBullhorn} size="lg" />
                            <span>News</span>
                        </Link>
                        <Link href="/scholarships" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                            <span>Scholarship</span>
                        </Link>
                        <Link href="/settings/edit-profile" className="flex items-center space-x-2 py-2 w-full hover:bg-[#2D87F0] pl-6 hover:text-white">
                            <FontAwesomeIcon icon={faGear} size="lg" />
                            <span>Settings</span>
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
