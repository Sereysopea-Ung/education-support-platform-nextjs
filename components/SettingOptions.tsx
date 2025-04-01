"use client"; // Mark the component as a client component

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBell,
    faCircleUser,
    faGear,
    faLock,
    faShieldHalved,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Client-side hook
import Image from "next/image";

const SettingOptions = () => {
    const pathname = usePathname(); // Get the current pathname
    const isProfilePage = pathname === "/settings/edit-profile"; // Check if we're on the Profile page
    const isAccountPage = pathname === "/settings/account";
    const isNotificationPage = pathname === "/settings/notifications";
    const isPreferencePage = pathname === "/settings/preferences";
    const isPrivacyPage = pathname === "/settings/privacy";
    const isSecurityPage = pathname === "/settings/security";

    return (
        <div className="bg-white h-screen fixed top-0 left-0 w-3/12">
            <div className="border-[#CED4DA] h-full border-1 rounded-l-lg flex-col">
                <div className="md:text-3xl text-xl pt-5 md:pl-5 pl-2 flex gap-2">
                    <Link href="/">
                        <Image src="/logo.png" alt="logo" width={32} height={32} className="md:min-w-[32px] md:min-h-[32px] min-w-[10px] min-h-[10px]" />
                    </Link>
                    Settings
                </div>
                <div className="flex-col gap-10">
                    {/* Profile Option */}
                    <Link href="/settings/edit-profile"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                            isProfilePage ? "text-blue-500" : ""
                        }`}
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Profile</span>
                    </Link>

                    {/* Account Option */}
                    <Link href="/settings/account"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                        isAccountPage ? "text-blue-500" : ""
                    }`}>
                        <FontAwesomeIcon
                            icon={faCircleUser}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Account</span>
                    </Link>

                    {/* Privacy Option */}
                    <Link href="/settings/privacy"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                        isPrivacyPage ? "text-blue-500" : ""
                    }`}>
                        <FontAwesomeIcon
                            icon={faShieldHalved}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Privacy</span>
                    </Link>

                    {/* Notifications Option */}
                    <Link href="/settings/notifications"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                        isNotificationPage ? "text-blue-500" : ""
                    }`}>
                        <FontAwesomeIcon
                            icon={faBell}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Notifications</span>
                    </Link>

                    {/* Security Option */}
                    <Link href="/settings/security"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                        isSecurityPage ? "text-blue-500" : ""
                    }`}>
                        <FontAwesomeIcon
                            icon={faLock}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Security</span>
                    </Link>

                    {/* Preferences Option */}
                    <Link href="/settings/preferences"
                        className={`flex items-center space-x-2 py-2 w-full hover:cursor-pointer hover:bg-[#2D87F0] md:pl-5 pl-2 hover:text-white text-lg ${
                        isPreferencePage ? "text-blue-500" : ""
                    }`}>
                        <FontAwesomeIcon
                            icon={faGear}
                            className="md:h-5 md:w-5 md:min-h-5 md:min-w-5 h-3 w-3 min-h-3 min-w-3"
                        />
                        <span className="text-sm md:text-xl">Preferences</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SettingOptions;
