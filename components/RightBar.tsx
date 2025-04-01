'use client';

const RightBar = () => {
    return (
        <div className="md:w-4/12 lg:w-3/12 md:absolute top-0 right-0 col-span-12 md:col-span-4 bg-white w-full border-1 h-auto border-gray-200 px-2 pt-3 rounded-lg md:mt-16 md:-mt-36 mt-10">
            <div className="flex border-1 border-[#DDE3EF] w-full rounded-xl px-2 py-2 flex-col gap-4">
                <div className="h-1/4 justify-between flex w-full items-center">
                    <div className="h-full flex text-md">
                        People to follow
                    </div>
                    <div className="h-full flex text-md text-[#1E3A8A]">
                        view more
                    </div>
                </div>

                <div className="h-1/3 justify-between flex items-center cursor-pointer">
                    <div className="flex h-full w-full">
                        <div id="profile" className="min-w-10 min-h-10 max-w-10 max-h-10 bg-gray-100 rounded-full mr-3 overflow-hidden border-1">
                        </div>

                        <div className="h-full flex-col w-full">
                            <div className="flex gap-4">
                                <h3 id="username" className="text-md font-normal text-gray-800">Name</h3>
                                <div id="famous?" className=" h-full flex">
                                    icon
                                </div>
                            </div>
                            <div className="flex gap-1 text-sm text-gray-600 w-full h-full flex-wrap">
                                <div className="flex items-center gap-2 text-nowrap ">
                                    <p id="major">
                                        Data Science
                                    </p>
                                    •
                                </div>
                                <div id="year" className="text-nowrap flex items-center">
                                    Year 3
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 items-center text-[#2563EB]">
                        follow
                    </div>
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
                    <div className="h-full flex text-md  text-[#1E3A8A] text-nowrap">
                        View All
                    </div>
                </div>

                <div className="h-1/4 justify-between flex items-center cursor-pointer">
                    <div className="flex-col">
                        <div className="w-full flex lg:text-[18px] items-center">
                            <div id="job-icon" className="min-w-8 min-h-8 max-w-8 max-h-8 bg-gray-100 mr-3 overflow-hidden border-1">
                            </div>
                            <h3 id="job-name" className="text-md font-normal text-gray-800">Name</h3>
                        </div>
                        <div className="h-full flex text-sm items-center text-gray-600 gap-1">
                            <p id="company" className="font-mono">
                                Google
                            </p>
                            •
                            <p id="type-of-job" className="font-mono">
                                Remote
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-1/4 justify-between flex items-center cursor-pointer">
                    <div className="flex-col">
                        <div className="w-full flex lg:text-[18px] items-center">
                            <div id="scholarship-icon" className="min-w-8 min-h-8 max-w-8 max-h-8 bg-gray-100 mr-3 overflow-hidden border-1">
                            </div>
                            <h3 id="Scholarship-name" className="text-md font-normal text-gray-800">Name</h3>
                        </div>
                        <div id="type-of-coverage" className="h-full flex text-sm items-center text-gray-600 gap-1">
                            Full tuition coverage
                        </div>
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
    );
};

export default RightBar;
