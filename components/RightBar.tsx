'use client';

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {setUser} from "@sentry/core";
import imageUrlBuilder from "@sanity/image-url";
import {createClient} from "@sanity/client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGraduationCap, faSuitcase} from "@fortawesome/free-solid-svg-icons";

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

const RightBar = () => {
    const [error, setError] = useState<string | null>(null);
    const {data: session, status} = useSession();
    const [posts, setPosts] = useState<any[]>([]);
    const [jobs, setjobs] = useState<any[]>([]);
    const [scholarships, setscholarships] = useState<any[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/getUserByFollower');
                if (!res.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await res.json();
                setPosts(data);
            } catch (err) {
                setError('Error fetching users');
                console.error(err);
            }
        };
        const fetchJobs = async () => {
            try {
                const res = await fetch('/api/getTopJob');
                if (!res.ok) {
                    throw new Error('Failed to fetch Jobs');
                }
                const data = await res.json();
                setjobs(data);
            } catch (err) {
                setError('Error fetching Jobs');
                console.error(err);
            }
        };
        const fetchScholarship = async () => {
            try {
                const res = await fetch('/api/getTopScholarship');
                if (!res.ok) {
                    throw new Error('Failed to fetch Scholarships');
                }
                const data = await res.json();
                setscholarships(data);
            } catch (err) {
                setError('Error fetching Scholarships');
                console.error(err);
            }
        };
        fetchUsers();
        fetchJobs();
        fetchScholarship();
    }, []);

    return (

        <div className="md:w-4/12 lg:w-3/12 md:absolute top-0 right-0 col-span-12 md:col-span-4 bg-white w-full border-1 border-gray-200 px-2 pt-3 rounded-lg md:mt-16 mt-10">
            <div className="flex border-1 border-[#DDE3EF] w-full rounded-xl px-2 py-2 flex-col">

                <div className="justify-between flex-col w-full items-center border-1 border-[#DDE3EF] rounded-xl p-2">
                    <div className="justify-between flex">
                        <div className="h-full flex text-md">
                            People to follow
                        </div>
                        <div className="h-full flex text-md text-[#1E3A8A]">
                            view more
                        </div>
                    </div>
                    <div className="flex-col h-full w-full">
                        {posts.map((user:any)=>(
                            <li key={user._id || user.username} className="flex w-full rounded-xl py-2">
                                <div className="flex justify-between w-full gap-2 items-center">
                                    <div className="h-full flex">
                                        <div
                                            id="profile_picture"
                                            className="rounded-4xl max-w-10 max-h-10 min-w-10 min-h-10 flex"
                                        >
                                            {user?.profile_pic ? (
                                                <img
                                                    src={urlFor(user.profile_pic).width(50).height(50).fit('crop').url()}
                                                    className="rounded-full"
                                                    alt="Profile"
                                                />
                                            ) : (
                                                <img
                                                    src="/Default_pfp.jpg" // Replace with your default image path
                                                    className="rounded-full"
                                                    alt="Default Profile"
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex-col flex">
                                        <div className="flex">
                                            <h3 id="username" className="text-md text-nowrap text-gray-800 ">
                                                {user?.username}
                                            </h3>
                                            <div id="famous?" className="h-full flex">
                                                {/* You can add a "famous" icon if needed */}
                                                {user?.followers?.length > 2 && <span>🌟</span>}
                                            </div>
                                        </div>
                                        <div className="flex text-sm text-gray-600 h-full flex-wrap">
                                            <div className="flex items-center gap-2 text-nowrap">
                                                <p id="major">{user?.major}</p> • year
                                                <p id="year">{user?.year}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="flex items-center text-[#2563EB] justify-end w-full">
                                        {/* Handle follow button click logic */}
                                        <button
                                            onClick={() => {
                                                // Add follow functionality here
                                            }}
                                        >
                                            Follow
                                        </button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </div>
                </div>

                <div className="flex border-1 border-[#DDE3EF] w-full rounded-xl px-2 py-2 flex-col gap-4 mt-5">
                    <div className="h-1/2 justify-between flex w-full items-center">
                        <div className="h-full flex text-md">
                            Popular Communities
                        </div>
                        <div className="h-full flex text-md  text-[#1E3A8A] text-nowrap">
                            View All
                        </div>
                    </div>

                    <div className="h-1/3 justify-between flex cursor-pointer flex-col">
                        <div className="flex items-center justify-between">
                            <div className="h-full flex text-lg">
                                <div id="community-profile" className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden border-1">
                                </div>
                                <div>
                                    <h3 id="community-name" className="text-md font-normal text-gray-800">Community Name</h3>
                                    <div className="h-full flex gap-2">
                                        <div className="h-8 flex">
                                            <div id="member-1" className="min-w-4 min-h-4 max-w-4 max-h-4 bg-gray-100 rounded-full overflow-hidden border-1 mr-[-4px]">
                                            </div>
                                            <div id="member-2" className="min-w-4 min-h-4 max-w-4 max-h-4 bg-gray-100 rounded-full overflow-hidden border-1 mr-[-4px]">
                                            </div>
                                            <div id="member-3" className="min-w-4 min-h-4 max-w-4 max-h-4 bg-gray-100 rounded-full overflow-hidden border-1 mr-[-4px]">
                                            </div>
                                        </div>
                                        <p className="font-mono text-sm text-gray-600">
                                            members
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-3 items-center text-[#2563EB]">
                                join
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex border-1 border-[#DDE3EF] w-full rounded-xl px-2 py-2 flex-col gap-4 mt-5">
                    <div className="h-1/2 justify-between flex w-full items-center">
                        <div className="h-full flex text-md">
                            Latest Opportunities
                        </div>
                    </div>

                    <div className="justify-between flex items-center">
                        <div className="flex w-full">
                            <div className="w-full flex-row text-sm items-center">
                                {jobs.map((job: any) => (
                                    <li
                                        key={job._id}
                                        className="flex justify-between items-start rounded-xl border shadow-md border-gray-100 w-full mb-2 p-5"
                                    >
                                        <div className="flex w-full justify-between">
                                            <div className="flex flex-col">
                                                <div className="flex gap-2 items-center">
                                                    <FontAwesomeIcon icon={faSuitcase} className="text-blue-500" />
                                                    <div className="font-bold">{job.jobTitle}</div>
                                                </div>
                                                <div className="text-gray-600">{job.companyName} • {job.typeofjob}</div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="justify-between flex items-center">
                        <div className="flex-col">
                            {scholarships.map((scholarship: any) => (
                                <li
                                    key={scholarship._id}
                                    className="flex flex-col justify-between items-start rounded-xl border shadow-md border-gray-100 h-full w-full mb-4 p-5"
                                >
                                    <div className="flex w-full justify-between">
                                        <div className="flex flex-col text-sm">
                                            <div className="flex gap-2 items-center">
                                                <FontAwesomeIcon icon={faGraduationCap} className="text-green-500" />
                                                <div className="font-bold">{scholarship.scholarshipTitle}</div>
                                            </div>
                                            <div className="text-gray-600">{scholarship.typeofcoverage}</div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex border-1 border-[#DDE3EF] w-full h-auto rounded-xl px-2 py-2 flex-col gap-2 mt-5 ">

                    <div className="h-1/2 justify-between flex w-full items-center">
                        <div className="h-full flex text-md">
                            Trending News
                        </div>
                        <div className="h-full flex text-md  text-[#1E3A8A]">
                            View All
                        </div>
                    </div>

                    <div className="h-1/2 justify-between flex items-center cursor-pointer">
                        <div className="flex-col">
                            <div className="w-full flex lg:text-[18px] items-center">
                                <div id="school-logo" className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 mr-3 overflow-hidden border-1 rounded-4xl">
                                </div>
                                <h3 id="university" className="text-md font-normal text-gray-800">Royal University</h3>
                            </div>
                            <div className="h-full flex text-sm gap-1 pl-13 flex-col">
                                <div id="news">
                                    សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញជ្រើសរើស និស្សិតស្ម័គ្រចិត្តក្នុងកម្មវិធីសង្រ្កាន RUPP។
                                </div>
                                <div className="text-gray-600 flex gap-5">
                                    <div id="date">
                                        11.feb.2025• 11:11PM
                                    </div>
                                    <div id="read">
                                        234 reads
                                    </div>
                                </div>
                            </div>
                            <div className="text-lg text-center">
                                See more
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RightBar;
