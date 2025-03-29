'use client';

import { useEffect, useState } from "react";
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

const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="hidden lg:flex flex-col lg:flex-row min-h-screen bg-white mt-16 w-2/12 border-[#E5E7EB] border-1 fixed top-0 left-0">
            <div className="block md:w-64 sticky  top-0 h-screen">
                <Link href='/profile/${id}' className="flex items-center mb-8 ml-5 mt-5">
                    <div className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                        <img src="/Default_pfp.jpg" alt="Profile" className="w-full h-full object-cover" />
                    </div>

                    <div>
                        <h3 className="text-md font-normal text-gray-800">Meow Meow</h3>
                        <p className="font-mono text-xs text-gray-600">
                            Computer Science <br /> • Year 3
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