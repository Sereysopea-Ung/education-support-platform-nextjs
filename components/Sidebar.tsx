"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Sidebar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return(
        <div className="grid grid-cols-12 flex-col">
            <div className="hidden md:grid col-span-2 border-2 border-[#E5E7EB] w-full h-auto items-start ">
                <div className="flex w-full gap-3 mt-20 pl-3 items-center justify-between max-h-[100px]">
                    <div className="flex rounded-4xl border-[#E5E7EB] border-1 min-w-[40px] min-h-[40px]"> </div>
                    <div className="flex flex-col w-full">
                        <div className="lg:text-xl md:text-lg sm:text-md text-sm w-full">Name</div>
                        <div className="lg:text-md md:text-sm sm:text-3xs text-2xs w-full">Computer Science</div>
                        <div className="lg:text-md md:text-sm sm:text-3xs text-2xs">• Year 3</div>
                    </div>
                </div>
                <div className="flex flex-col w-full mb-100">
                    <Link href="/" className="py-3 flex items-center gap-3 p-1 lg:px-2 transition cursor-pointer hover:text-white w-full bg-transparent hover:bg-blue-600 duration-300">
                        <Image src="/home.svg" alt="home" width={32} height={32} className="min-w-[16px] min-h-[16px] max-w-[32px] max-h-[32px] pb-1"/>
                        <h1 className="lg:text-xl md:text-lg sm:text-md text-sm">Home</h1>
                    </Link>
                    <Link href="/" className="py-3 flex items-center gap-3 p-1 lg:px-2 transition cursor-pointer hover:text-white w-full bg-transparent hover:bg-blue-600 duration-300">
                        <Image src="/people.svg" alt="team" width={32} height={32} className="min-w-[16px] min-h-[16px] max-w-[32px] max-h-[32px]"/>
                        <h1 className="lg:text-xl md:text-lg sm:text-md text-sm">My Network</h1>
                    </Link>
                    <Link href="/" className="py-3 flex items-center gap-3 p-1 lg:px-2 transition cursor-pointer hover:text-white w-full bg-transparent hover:bg-blue-600 duration-300">
                        <Image src="/darkstar.svg" alt="star" width={32} height={32} className="min-w-[16px] min-h-[16px] max-w-[32px] max-h-[32px]"/>
                        <h1 className="lg:text-xl md:text-lg sm:text-md text-sm">Collection</h1>
                    </Link>
                </div>
            </div>
            <div className="md:hidden flex absolute top-20 right-4">
                <button className="rounded-4xl border-[#E5E7EB] border-1 min-w-[40px] min-h-[40px] z-5" onClick={() => setMenuOpen(!menuOpen)}> </button>
            </div>
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white flex flex-col items-center shadow-lg md:hidden transition-all duration-300 z-50">
                    <div className="flex w-full gap-3 mt-5 pl-3 items-center justify-between h-auto">
                        <div className="rounded-4xl border-[#E5E7EB] border-1 min-w-[40px] min-h-[40px]"> </div>
                        <div className="flex flex-col w-full">
                            <div className="lg:text-xl md:text-lg sm:text-md text-sm w-full">Name</div>
                            <div className="lg:text-lg md:text-md sm:text-sm text-3xs w-full">Computer Science</div>
                            <div className="lg:text-lg md:text-md sm:text-sm text-3xs">• Year 3</div>
                        </div>
                    </div>
                    <Link href="/" className="py-3 flex items-center gap-3 p-1 lg:px-2 transition cursor-pointer hover:text-white w-full bg-transparent hover:bg-blue-600 duration-300">
                        <Image src="/people.svg" alt="team" width={32} height={32} className="min-w-[16px] min-h-[16px] max-w-[32px] max-h-[32px]"/>
                        <h1 className="lg:text-xl md:text-lg sm:text-md text-sm">My Network</h1>
                    </Link>
                    <Link href="/" className="py-3 flex items-center gap-3 p-1 lg:px-2 transition cursor-pointer hover:text-white w-full bg-transparent hover:bg-blue-600 duration-300">
                        <Image src="/darkstar.svg" alt="star" width={32} height={32} className="min-w-[16px] min-h-[16px] max-w-[32px] max-h-[32px]"/>
                        <h1 className="lg:text-xl md:text-lg sm:text-md text-sm">Collection</h1>
                    </Link>
                    <button className="absolute top-4 right-4 rounded-lg flex items-center justify-center w-8 h-8 gap-2 text-black text-2xl bg-gray-300 cursor-pointer hover:bg-white py-2 transition" onClick={() => setMenuOpen(false)}>
                        x
                    </button>
                </div>
            )}
        </div>
    )
}
export default Sidebar;