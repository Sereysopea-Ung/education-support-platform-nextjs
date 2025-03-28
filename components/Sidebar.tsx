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
        <div className="hidden lg:flex flex-col lg:flex-row min-h-screen bg-white mt-16 w-2/12 border-[#E5E7EB] border-1 fixed top-0 left-0">
            <div className="block md:w-64 sticky  top-0 h-screen">
                <Link href='/profile/${id}' className="flex items-center mb-8 ml-5 mt-5">
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

                        <h3 className="text-md font-normal text-gray-800">Meow Meow</h3>
                        <p className="font-mono text-xs text-gray-600">
                            Computer Science <br /> • Year 3
=======
                        <h3 className="text-md font-normal text-gray-800">{user?.username}</h3>
                        <p className="font-mono text-[10px] text-gray-600">
                            {user?.major} <br /> • year {user?.year}

                        </p>
                    </div>
                </Link>

                {/* Sidebar Links */}
                <div className="flex mb-8 flex-col w-full">

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faHome} size="lg" />
                            <span className="ml-1">Home</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-6 hover:text-white">
                            <FontAwesomeIcon icon={faUser} size="lg" />
                            <span className="ml-1">My Network</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faStar} size="lg" />
                            <span className="ml-1">Collection</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faBriefcase} size="lg" />
                            <span className="ml-1">Job</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faBullhorn} size="lg" />
                            <span className="ml-1">News</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-5 hover:text-white">
                            <FontAwesomeIcon icon={faGraduationCap} size="lg" />
                            <span>Scholarship</span>
                        </div>
                    </ul>

                    <ul className="space-y-4">
                        <div className="flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] pl-6 hover:text-white">
                            <FontAwesomeIcon icon={faGear} size="lg" />
                            <span >Setting</span>
                        </div>
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default Sidebar;