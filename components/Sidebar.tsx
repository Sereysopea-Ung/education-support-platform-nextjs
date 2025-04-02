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
    faUser,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import {createClient} from "@sanity/client";


interface User {
    username: string;
    profile_pic?: string;
    year?: string;
    major?: string;
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




const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const [user, setUser] = useState<User | null>(null)
    const [error, setError] = useState<string | null>(null);

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

    return (
        <div>
            <div className="lg:hidden flex flex-col md:px-5 md:w-8/12 border-black mt-20 w-full mb-5">
                <div className="top-0 bg-white w-full border-[#E5E7EB] border-1 rounded-lg flex">
                    <Link href='/profile/${id}' className="flex m-5 justify-between w-full items-center">
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

                            <div>
                                <h3 className="text-xl font-normal text-gray-800">{user?.username}</h3>
                                <p className="font-mono text-md text-gray-600">
                                    {user?.major} • year {user?.year}
                                </p>
                            </div>
                        </div>

                    </Link>
                </div>
            </div>

            <div className="hidden lg:flex flex-col lg:flex-row min-h-screen bg-white mt-16 w-2/12 border-[#E5E7EB] border-1 fixed top-0 left-0">
                <div className="top-0 h-screen w-full">
                    <Link href='/profile/${id}' className="flex items-center mb-8 pl-5 mt-5 w-full">
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
                            <h3 className="text-xl font-normal text-gray-800 w-full break-words lg:max-w-23 xl:max-w-full">{user?.username}</h3>
                            <p className="font-mono text-md text-gray-600">
                                {user?.major} <br /> • year {user?.year}
                            </p>
                        </div>
                    </Link>


            {/* Sidebar Links */}
                    <div className="flex mb-8 flex-col w-full">

                        <ul className="space-y-4">
                            <Link href="/" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                                <FontAwesomeIcon icon={faHome} size="lg" />
                                <span className="ml-1">Home</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/profile/{id}" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-6 hover:text-white">
                                <FontAwesomeIcon icon={faUser} size="lg" />
                                <span className="ml-1">My Network</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/collection" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                                <FontAwesomeIcon icon={faStar} size="lg" />
                                <span className="ml-1">Collection</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/jobs" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                                <FontAwesomeIcon icon={faBriefcase} size="lg" />
                                <span className="ml-1">Job</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/news" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                                <FontAwesomeIcon icon={faBullhorn} size="lg" />
                                <span className="ml-1">News</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/scholarships" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                                <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                                <span>Scholarship</span>
                            </Link>
                        </ul>

                        <ul className="space-y-4">
                            <Link href="/settings/edit-profile" className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-6 hover:text-white">
                                <FontAwesomeIcon icon={faGear} size="lg" />
                                <span >Settings</span>
                            </Link>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Sidebar;