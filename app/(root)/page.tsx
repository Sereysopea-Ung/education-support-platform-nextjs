'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import Arrow from "@/components/Arrow";
import {useState} from "react";
import UserPostQ from "@/components/ProfilePostQ";
import UserPostL from "@/components/ProfilePostLesson";


export default function LandingPage() {
    const { data: session, status } = useSession(); // Also getting the status of the session
    const [Mission, setMission] = useState(true);
    const [Team, setTeam] = useState(false);
    const [Value, setValue] = useState(false);

    const teamMembers = [
        {
            name: "Ung Sereysopea",
            role: "ITE Student",
            description: "Be graceful, lovely, and approachable",
            image: "/Sopea.jpg",
        },
        {
            name: "Seng Sengly",
            role: "ITE Student",
            description: "Went to bed by 2 and woke up by 5",
            image: "/Sengly.jpg",
        },
        {
            name: "Bun Seavlang",
            role: "ITE Student",
            description: "Creating beautiful and user-friendly designs",
            image: "/Seavlang.jpg",
        },
    ];

    const values = [
        { icon: "🎯", title: "Excellence", description: "Committed to delivering the highest quality educational experience" },
        { icon: "🤝", title: "Collaboration", description: "Fostering meaningful connections between students and educators" },
        { icon: "💡", title: "Innovation", description: "Continuously evolving our platform to meet learning needs" },
        { icon: "🌟", title: "Accessibility", description: "Making quality education available to everyone" },
        { icon: "🔄", title: "Growth", description: "Supporting continuous personal and professional development" },
        { icon: "⚖️", title: "Integrity", description: "Maintaining honest and ethical practices in all we do" },
    ];



    if (status === 'loading') {
        return <div className="mt-20">Loading...</div>; // Show loading while the session is being fetched
    }

    return (
        <div>
            {session?.user ? (
                <div className="grid grid-cols-12">
                    <div className="col-span-7 col-start-3 bg-[#F9FAFB] w-full h-dvh">

                    </div>
                    <div className="col-span-3 col-start-10 bg-white w-full h-dvh">

                    </div>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-white pl-8 pr-8 duration-300">
                        <div className="flex p-4 pt-20 w-full min-h-[300px] row-span-1 md:col-span-12 flex-col items-center justify-between">
                            <div className="flex gap-4 w-full">
                                <div className="flex-col flex-1 bg-white px-4 md:py-20 text-left">
                                    <div className="text-black pb-8 lg:text-5xl md:text-4xl sm:text-3xl w-full text-2xl">
                                        Empowering Students & Teachers to Connect, Learn, and Grow!
                                    </div>
                                    <div className="pb-8 text-[#4B5563] lg:text-3xl md:text-2xl sm:text-xl w-full text-3xs">
                                        A platform where students and teachers collaborate through Q&A, lessons, and career opportunities.
                                    </div>
                                    <div className="md:hidden flex-1 rounded-lg">
                                        <Image src="/landing.svg" alt="Landing" width={32} height={32} className="min-w-[300px] w-full h-full"/>
                                    </div>
                                    <div className="flex gap-4">
                                        <button className="bg-[#2D87F0] text-white lg:text-2xl md:text-xl sm:text-3xs text-2xs px-8 py-2 rounded-4xl  hover:bg-blue-700 transition cursor-pointer text-nowrap">
                                            Join Now
                                        </button>
                                        <button className="border-1 border-[#2D87F0] lg:text-2xl md:text-xl sm:text-3xs text-2xs text-[#2D87F0] px-8 py-2 rounded-4xl hover:bg-blue-600 hover:text-white transition cursor-pointer text-nowrap">
                                            Explore Community
                                        </button>
                                    </div>
                                </div>
                                <div className="hidden md:flex flex-1 rounded-lg">
                                    <Image src="/landing.svg" alt="Landing" width={32} height={32} className="w-full h-full"/>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 w-full min-h-[300px] row-span-1 md:col-span-12 flex flex-col items-center justify-between">
                            <div className="flex items-center justify-center w-full mb-4">
                                <h1 className="font-bold text-[#333333] lg:text-4xl md:text-3xl sm:text-2xl text-xl">Feature</h1>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full row-span-2 md:row-span-1 text-left">
                                <div className="pt-4 pl-4 pr-4 flex flex-col items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <Image src="/lesson.svg" alt="Lessons" width={32} height={32} className="flex min-w-[50px] min-h-[50px] pb-4"/>
                                    <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold">
                                        Lessons
                                    </div>
                                    <div className="text-[#6B7280] flex lg:text-3xs md:text-2xs w-full pb-2">
                                        Access curated educational content & tutorials.
                                    </div>
                                    <Arrow />
                                </div>

                                <div className="pt-4 pl-4 pr-4 flex-col flex items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <Image src="/discussion.svg" alt="Discussions" width={32} height={32} className="min-w-[52px] min-h-[52px] pb-3"/>
                                    <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold">
                                        Discussions
                                    </div>
                                    <div className="text-[#6B7280] flex lg:text-3xs md:text-2xs w-full pb-2">
                                        Join topic-based conversations with peers & faculty.
                                    </div>
                                    <Arrow />
                                </div>

                                <div className="pt-4 pl-4 pr-4 flex-col flex items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <Image src="/Q&A.svg" alt="Q&A" width={24} height={24} className="min-w-[24px] min-h-[24px] pb-4"/>
                                    <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold">
                                        Q&A
                                    </div>
                                    <div className="text-[#6B7280] flex lg:text-3xs md:text-2xs w-full pb-2">
                                        Ask & answer questions with upvote/downvote system.
                                    </div>
                                    <Arrow />
                                </div>

                                <div className="pt-4 pl-4 pr-4 flex-col flex items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <Image src="/job.svg" alt="Jobs & Scholarships" width={32} height={32} className="min-w-[40px] min-h-[40px] pb-4"/>
                                    <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold">
                                        Jobs & Scholarships
                                    </div>
                                    <div className="text-[#6B7280] flex lg:text-3xs md:text-2xs w-full pb-2">
                                        Stay updated on career opportunities & funding.
                                    </div>
                                    <Arrow />
                                </div>

                            </div>
                        </div>

                        <div className="pt-4 pl-4 w-full min-h-[300px] row-span-1 md:col-span-12 flex flex-col items-center justify-between rounded-lg">
                            <div className="flex items-center justify-center w-full mb-4">
                                <h1 className="font-bold text-[#333333] lg:text-4xl md:text-3xl sm:text-2xl text-xl">Trending Content</h1>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full row-span-2 md:row-span-1 text-left">
                                <div className="pt-4 pl-2 flex flex-col items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <div className="flex items-center justify-center w-full mb-4 gap-2">
                                        <Image src="/star.svg" alt="Lessons" width={16} height={16} className="pt-1 flex min-w-[24px] min-h-[24px] pb-4"/>
                                        <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold text-nowrap">
                                            Top Q&A
                                        </div>
                                    </div>
                                    <div>

                                    </div>

                                </div>

                                <div className="pt-4 pl-2 flex flex-col items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <div className="flex items-center justify-center w-full mb-4 gap-2">
                                        <Image src="/hot.svg" alt="Lessons" width={16} height={16} className="pt-1 flex min-w-[20px] min-h-[20px] pb-4"/>
                                        <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold text-nowrap">
                                            Hot Discussions
                                        </div>
                                    </div>


                                </div>

                                <div className="pt-4 pl-2 flex flex-col items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <div className="flex items-center justify-center w-full mb-4 gap-2">
                                        <Image src="/study.svg" alt="Lessons" width={16} height={16} className="pt-1 flex min-w-[24px] min-h-[24px] pb-4"/>
                                        <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs w-full font-bold text-nowrap">
                                            Popular Lessons
                                        </div>
                                    </div>


                                </div>

                                <div className="pt-4 pl-2 flex flex-col items-start rounded-xl border-b shadow-md border-gray-100 justify-left h-[250px] text-left min-w-[50px] w-full mb-4">
                                    <div className="flex items-center justify-center w-full mb-4 gap-2">
                                        <Image src="/job.svg" alt="Lessons" width={16} height={16} className="pt-1 flex min-w-[24px] min-h-[24px] pb-4"/>
                                        <div className="text-[#333333] flex pb-2 lg:text-xl md:text-3xs sm:2xs text-2xs w-full font-bold text-nowrap">
                                            Latest Jobs
                                        </div>
                                    </div>


                                </div>


                            </div>
                        </div>

                        <div className="p-2 w-full md:row-span-1 md:col-span-12 flex flex-col items-center justify-between mb-8">
                            <div className="flex items-center justify-center w-full mb-4">
                                <h1 className="font-bold text-[#333333] lg:text-4xl md:text-3xl sm:text-2xl text-xl">
                                    Latest Opportunities
                                </h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full row-span-1">
                                <div className="pt-4 pl-4 pr-4 flex flex-col items-start min-h-[300px] text-left w-full">
                                    <h1 className="text-black lg:text-2xl md:text-xl  sm:text-3xs text-2xs">Job Openings</h1>
                                    <div className="flex items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4"></div>
                                    <div className="flex items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4"></div>
                                </div>
                                <div className="pt-4 pl-4 pr-4 flex flex-col items-start min-h-[300px] text-left w-full">
                                    <h1 className="text-black lg:text-2xl md:text-xl sm:text-3xs text-2xs">Scholarships</h1>
                                    <div className="flex items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4"></div>
                                    <div className="flex items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4"></div>
                                </div>
                            </div>
                        </div>

                        <div className="p-2 w-full md:row-span-1 md:col-span-12 flex flex-col items-left justify-center mb-12 ml-2">
                            <h1 className="text-black pb-8 lg:text-5xl md:text-4xl sm:text-3xl w-full text-2xl font-bold">
                                About S3TUDY
                            </h1>
                            <div className={"group-[1] relative flex mb-8"}>
                                <div className="flex items-center justify-left w-full ">
                                    <button className="group relative p-1 lg:px-2 transition cursor-pointer"  onClick={() => { setMission(true); setTeam(false); setValue(false)}}>
                                        <span className="z-10 text-[#4B5563] lg:text-2xl md:text-xl sm:text-3xs w-full text-2xs">Our Mission</span>
                                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent z-6 group-hover:bg-blue-600 transition-all duration-300 rounded-lg" ></span>
                                    </button>
                                    <button className="group relative p-1 lg:px-2 transition cursor-pointer" onClick={() => { setMission(false); setTeam(true); setValue(false)}}>
                                        <span className="z-10 text-[#4B5563] lg:text-2xl md:text-xl sm:text-3xs w-full text-2xs">Our Team</span>
                                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent z-6  group-hover:bg-blue-600 transition-all duration-300 rounded-lg"></span>
                                    </button>
                                    <button className="group relative p-1 lg:px-2 transition cursor-pointer" onClick={() =>  { setMission(false); setTeam(false); setValue(true)}}>
                                        <span className="z-10 text-[#4B5563] lg:text-2xl md:text-xl sm:text-3xs w-full text-2xs">Our Value</span>
                                        <span className="absolute bottom-0 left-0 w-full h-[3px] bg-transparent z-6 group-hover:bg-blue-600 transition-all duration-300 rounded-lg"></span>
                                    </button>
                                </div>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4B5563] z-5"></span>
                            </div>
                            {Mission && (
                                <div className="flex flex-col items-center justify-between w-full mb-4 gap-2">
                                    <h1 className="font-bold lg:text-3xl md:text-2xl sm:text-xl w-full text-3xs mb-4">
                                        Empowering Student Success
                                    </h1>
                                    <div className="lg:text-2xl md:text-xl sm:text-3xs text-2xs w-full text-justify">
                                        At
                                        <span className="text-[#2563EB] lg:text-3xl md:text-2xl sm:text-xl w-full text-3xs"> S3TUDY </span>
                                        our mission is to empower students, educators, and professionals by creating a collaborative space where learning, mentorship, and career growth thrive. We believe that knowledge should be accessible to everyone, and we are committed to providing a dynamic platform where students can ask questions, access lessons, find scholarships, and explore job opportunities—all in one place. By fostering community-driven learning, we aim to bridge the gap between academic knowledge and real-world opportunities, ensuring that every learner has the tools, guidance, and support to succeed.
                                    </div>
                                </div>
                            )}
                            {Team && (
                                <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center place-items-center max-w-4xl mx-auto gap-10 md:gap-20 lg:gap-40 duration-300">
                                    {teamMembers.map((member, index) => (
                                        <div
                                            key={index}
                                            className="pt-4 text-left flex flex-col items-center justify-center rounded-xl border-b shadow-md border-gray-100 h-[350px] w-[250px] px-2"
                                        >
                                            <div className="flex items-center justify-center w-full">
                                                <Image
                                                    src={member.image}
                                                    alt={member.name}
                                                    width={700}
                                                    height={900}
                                                    className="min-h-[60px] min-w-[50px] max-h-[200px] max-w-[180px] border-1 border-black rounded-lg w-full h-full"
                                                />
                                            </div>
                                            <div className="text-nowrap w-full font-bold lg:text-3xl md:text-2xl sm:text-3xs text-2xs text-center">
                                                {member.name}
                                            </div>
                                            <div className="text-nowrap text-[#2563EB] w-full font-bold lg:text-2xl md:text-xl sm:text-3xs text-2xs text-center">
                                                {member.role}
                                            </div>
                                            <div className="text-[#4B5563] w-full lg:text-xl md:text-3xs sm:text-2xs text-xs text-center">
                                                {member.description}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {Value && (
                                <div className="flex flex-col items-center justify-center w-full">
                                    <div className="w-full min-w-[500px]">
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full max-w-7xl mx-auto ">
                                            {values.map((value, index) => (
                                                <div
                                                    key={index}
                                                    className="p-6 flex flex-col text-center justify-center rounded-xl border-2 shadow-md border-gray-300 bg-white"
                                                >
                                                    <div className="text-[40px]">{value.icon}</div>
                                                    <div className="font-bold lg:text-2xl md:text-xl sm:text-lg text-base mt-2">
                                                        {value.title}
                                                    </div>
                                                    <div className="lg:text-lg md:text-sm sm:text-xs text-xs text-gray-600 mt-2">
                                                        {value.description}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-4 pl-4 w-full min-h-[300px] row-span-1 md:col-span-12 flex flex-col items-center justify-between rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:gap-4 w-full row-span-1 text-left group relative ">

                                <div className="flex justify-center w-full mb-4 gap-2">
                                    <div className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        Empowering university communities to learn, connect, and grow together.
                                    </div>
                                </div>

                                <div className="flex flex-col ml-20 w-full mb-4">
                                    <Link href="/about-us" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> About Us </button>
                                    </Link>
                                    <Link href="/features" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> Features </button>
                                    </Link>
                                    <Link href="/contact-us" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> Contact Us </button>
                                    </Link>
                                </div>

                                <div className="md:hidden flex md:ml-20 w-full mb-4 gap-2 flex-col">
                                    <div className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm w-full sm:text-xs text-xs">
                                        Contact Us
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href="/">
                                            <Image src="X.svg" alt="X" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="facebook.svg" alt="Facebook" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="Insta.svg" alt="Instagram" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="Tele.svg" alt="Telegram" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                    </div>
                                </div>


                                <div className="flex flex-col ml-20 w-full mb-4">
                                    <Link href="/help-center" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> Help Center </button>
                                    </Link>
                                    <Link href="/terms-of-service" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> Terms of Service </button>
                                    </Link>
                                    <Link href="/privacy-policy" className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm sm:text-xs text-xs">
                                        <button className="hover:text-blue-600 hover:cursor-pointer"> Privacy Policy </button>
                                    </Link>
                                </div>

                                <div className="hidden md:flex ml-20 w-full mb-4 gap-2 flex-col">
                                    <div className="text-[#4B5563] flex pb-2 lg:text-lg md:text-sm w-full sm:text-xs text-xs">
                                        Contact Us
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href="/">
                                            <Image src="X.svg" alt="X" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="facebook.svg" alt="Facebook" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="Insta.svg" alt="Instagram" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                        <Link href="/">
                                            <Image src="Tele.svg" alt="Telegram" width={50} height={50} className="min-w-[16px] max-w-[24px]" />
                                        </Link>
                                    </div>
                                </div>
                                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#4B5563] z-5"></span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-full md:mt-[-120px] mt-[-60px] md:text-xl text-3xs">
                        © 2025 UniConnect. All rights reserved.
                    </div>
                </>
            )}
        </div>
    );
}
