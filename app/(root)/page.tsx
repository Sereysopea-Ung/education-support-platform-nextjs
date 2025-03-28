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
                <div >
                    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 mt-16">

                    {/* Mobile Header (hidden on desktop) */}
                    <div className="lg:hidden bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-20">
                        <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                                <img src="/Default_pfp.jpg" alt="Profile" className="w-full h-full object-cover"/>
                            </div>
                            <h3 className="text-lg font-normal text-gray-800">Meow Meow</h3>
                            <span className="bg-amber-300 px-1.5 rounded-full text-white ml-4">★</span>
                        </div>

                        {/* Right Section: Menu Button and Edit Profile Button */}
                        <div className="flex items-center space-x-2">
                            <button className="relative w-6 h-6 p-1 bg-white-200 rounded-md hover:bg-gray-300">
                                {/* Simple hamburger icon using spans */}
                                <span className="block w-full h-0.5 bg-black mb-1"></span>
                                <span className="block w-full h-0.5 bg-black mb-1"></span>
                                <span className="block w-full h-0.5 bg-black"></span>
                            </button>

                            <button className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* left Sidebar */}
                    <div className="hidden lg:block md:w-64 bg-white-100 border-r-gray-200  p-5 sticky top-0 h-screen overflow-y-auto">
                        <div className="flex items-center mb-8">
                            <div className="w-10 h-10 bg-gray-100 rounded-full mr-3 overflow-hidden">
                                <img src="/Default_pfp.jpg" alt="Profile" className="w-full h-full object-cover"/>
                            </div>

                            <div>
                                <h3 className="text-lg font-normal text-gray-800">Meow Meow</h3>
                                <p className="font-mono text-sm text-gray-600">
                                    Computer Science <br /> • Year 3
                                </p>
                            </div>
                        </div>

                        {/*figma svg path*/}
                        <ul className="space-y-4">
                            {/*sidebar*/}
                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.9823 2.76424C12.631 2.49099 12.4553 2.35436 12.2613 2.30184C12.0902 2.2555 11.9098 2.2555 11.7387 2.30184C11.5447 2.35436 11.369 2.49099 11.0177 2.76424L4.23539 8.03937C3.78202 8.39199 3.55534 8.5683 3.39203 8.7891C3.24737 8.98469 3.1396 9.20503 3.07403 9.4393C3 9.70376 3 9.99094 3 10.5653V17.8002C3 18.9203 3 19.4804 3.21799 19.9082C3.40973 20.2845 3.71569 20.5905 4.09202 20.7822C4.51984 21.0002 5.0799 21.0002 6.2 21.0002H8.2C8.48003 21.0002 8.62004 21.0002 8.727 20.9457C8.82108 20.8978 8.89757 20.8213 8.9455 20.7272C9 20.6203 9 20.4803 9 20.2002V13.6002C9 13.0402 9 12.7601 9.10899 12.5462C9.20487 12.3581 9.35785 12.2051 9.54601 12.1092C9.75992 12.0002 10.0399 12.0002 10.6 12.0002H13.4C13.9601 12.0002 14.2401 12.0002 14.454 12.1092C14.6422 12.2051 14.7951 12.3581 14.891 12.5462C15 12.7601 15 13.0402 15 13.6002V20.2002C15 20.4803 15 20.6203 15.0545 20.7272C15.1024 20.8213 15.1789 20.8978 15.273 20.9457C15.38 21.0002 15.52 21.0002 15.8 21.0002H17.8C18.9201 21.0002 19.4802 21.0002 19.908 20.7822C20.2843 20.5905 20.5903 20.2845 20.782 19.9082C21 19.4804 21 18.9203 21 17.8002V10.5653C21 9.99094 21 9.70376 20.926 9.4393C20.8604 9.20503 20.7526 8.98469 20.608 8.7891C20.4447 8.5683 20.218 8.39199 19.7646 8.03937L12.9823 2.76424Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> Home</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 15.8369C19.4559 16.5683 20.7041 17.742 21.6152 19.2096C21.7956 19.5003 21.8858 19.6456 21.917 19.8468C21.9804 20.2558 21.7008 20.7585 21.3199 20.9204C21.1325 21 20.9216 21 20.5 21M16 11.5322C17.4817 10.7959 18.5 9.26686 18.5 7.5C18.5 5.73314 17.4817 4.20411 16 3.46776M14 7.5C14 9.98528 11.9852 12 9.49996 12C7.01468 12 4.99996 9.98528 4.99996 7.5C4.99996 5.01472 7.01468 3 9.49996 3C11.9852 3 14 5.01472 14 7.5ZM2.55919 18.9383C4.1535 16.5446 6.66933 15 9.49996 15C12.3306 15 14.8464 16.5446 16.4407 18.9383C16.79 19.4628 16.9646 19.725 16.9445 20.0599C16.9289 20.3207 16.7579 20.64 16.5495 20.7976C16.2819 21 15.9138 21 15.1776 21H3.82232C3.08613 21 2.71804 21 2.4504 20.7976C2.24201 20.64 2.07105 20.3207 2.05539 20.0599C2.03529 19.725 2.20992 19.4628 2.55919 18.9383Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>

                                <span className="ml-1"> My Network</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11.2827 3.45307C11.5131 2.98613 11.6284 2.75266 11.7848 2.67807C11.9209 2.61317 12.0791 2.61317 12.2152 2.67807C12.3717 2.75266 12.4869 2.98613 12.7174 3.45307L14.9041 7.88304C14.9721 8.02089 15.0061 8.08982 15.0558 8.14333C15.0999 8.19071 15.1527 8.22911 15.2113 8.25638C15.2776 8.28718 15.3536 8.2983 15.5057 8.32053L20.397 9.03546C20.9121 9.11075 21.1696 9.14839 21.2888 9.27419C21.3925 9.38365 21.4412 9.53405 21.4215 9.68353C21.3988 9.85533 21.2124 10.0369 20.8395 10.4001L17.3014 13.8462C17.1912 13.9536 17.136 14.0073 17.1004 14.0712C17.0689 14.1278 17.0487 14.19 17.0409 14.2543C17.0321 14.3269 17.0451 14.4027 17.0711 14.5545L17.906 19.4219C17.994 19.9352 18.038 20.1919 17.9553 20.3443C17.8833 20.4768 17.7554 20.5697 17.6071 20.5972C17.4366 20.6288 17.2061 20.5076 16.7451 20.2652L12.3724 17.9656C12.2361 17.8939 12.168 17.8581 12.0962 17.844C12.0327 17.8316 11.9673 17.8316 11.9038 17.844C11.832 17.8581 11.7639 17.8939 11.6277 17.9656L7.25492 20.2652C6.79392 20.5076 6.56341 20.6288 6.39297 20.5972C6.24468 20.5697 6.11672 20.4768 6.04474 20.3443C5.962 20.1919 6.00603 19.9352 6.09407 19.4219L6.92889 14.5545C6.95491 14.4027 6.96793 14.3269 6.95912 14.2543C6.95132 14.19 6.93111 14.1278 6.89961 14.0712C6.86402 14.0073 6.80888 13.9536 6.69859 13.8462L3.16056 10.4001C2.78766 10.0369 2.60121 9.85533 2.57853 9.68353C2.55879 9.53405 2.60755 9.38365 2.71125 9.27419C2.83044 9.14839 3.08797 9.11075 3.60304 9.03546L8.49431 8.32053C8.64642 8.2983 8.72248 8.28718 8.78872 8.25638C8.84736 8.22911 8.90016 8.19071 8.94419 8.14333C8.99391 8.08982 9.02793 8.02089 9.09597 7.88304L11.2827 3.45307Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> Collection</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 6.07003 16 5.60504 15.8978 5.22354C15.6204 4.18827 14.8117 3.37962 13.7765 3.10222C13.395 3 12.93 3 12 3C11.07 3 10.605 3 10.2235 3.10222C9.18827 3.37962 8.37962 4.18827 8.10222 5.22354C8 5.60504 8 6.07003 8 7M5.2 21H18.8C19.9201 21 20.4802 21 20.908 20.782C21.2843 20.5903 21.5903 20.2843 21.782 19.908C22 19.4802 22 18.9201 22 17.8V10.2C22 9.07989 22 8.51984 21.782 8.09202C21.5903 7.71569 21.2843 7.40973 20.908 7.21799C20.4802 7 19.9201 7 18.8 7H5.2C4.07989 7 3.51984 7 3.09202 7.21799C2.71569 7.40973 2.40973 7.71569 2.21799 8.09202C2 8.51984 2 9.07989 2 10.2V17.8C2 18.9201 2 19.4802 2.21799 19.908C2.40973 20.2843 2.71569 20.5903 3.09202 20.782C3.51984 21 4.0799 21 5.2 21Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> Job</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 13.9999L5.57465 20.2985C5.61893 20.4756 5.64107 20.5642 5.66727 20.6415C5.92317 21.397 6.60352 21.9282 7.39852 21.9933C7.4799 21.9999 7.5712 21.9999 7.75379 21.9999C7.98244 21.9999 8.09677 21.9999 8.19308 21.9906C9.145 21.8982 9.89834 21.1449 9.99066 20.193C10 20.0967 10 19.9823 10 19.7537V5.49991M18.5 13.4999C20.433 13.4999 22 11.9329 22 9.99991C22 8.06691 20.433 6.49991 18.5 6.49991M10.25 5.49991H6.5C4.01472 5.49991 2 7.51463 2 9.99991C2 12.4852 4.01472 14.4999 6.5 14.4999H10.25C12.0164 14.4999 14.1772 15.4468 15.8443 16.3556C16.8168 16.8857 17.3031 17.1508 17.6216 17.1118C17.9169 17.0756 18.1402 16.943 18.3133 16.701C18.5 16.4401 18.5 15.9179 18.5 14.8736V5.1262C18.5 4.08191 18.5 3.55976 18.3133 3.2988C18.1402 3.05681 17.9169 2.92421 17.6216 2.88804C17.3031 2.84903 16.8168 3.11411 15.8443 3.64427C14.1772 4.55302 12.0164 5.49991 10.25 5.49991Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> News</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 7.99958V14.0107C4 14.3697 4 14.5492 4.05465 14.7076C4.10299 14.8477 4.18187 14.9754 4.28558 15.0813C4.40287 15.201 4.5634 15.2813 4.88446 15.4418L10.2845 18.1418C10.5468 18.273 10.678 18.3386 10.8156 18.3644C10.9375 18.3873 11.0625 18.3873 11.1844 18.3644C11.322 18.3386 11.4532 18.273 11.7155 18.1418L17.1155 15.4418C17.4366 15.2813 17.5971 15.201 17.7144 15.0813C17.8181 14.9754 17.897 14.8477 17.9453 14.7076C18 14.5492 18 14.3697 18 14.0107V7.99958M1 6.49958L10.6422 1.67846C10.7734 1.61287 10.839 1.58008 10.9078 1.56717C10.9687 1.55574 11.0313 1.55574 11.0922 1.56717C11.161 1.58008 11.2266 1.61287 11.3578 1.67846L21 6.49958L11.3578 11.3207C11.2266 11.3863 11.161 11.4191 11.0922 11.432C11.0313 11.4434 10.9687 11.4434 10.9078 11.432C10.839 11.4191 10.7734 11.3863 10.6422 11.3207L1 6.49958Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> Scholarship</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 21V19C22 17.1362 20.7252 15.5701 19 15.126M15.5 3.29076C16.9659 3.88415 18 5.32131 18 7C18 8.67869 16.9659 10.1159 15.5 10.7092M17 21C17 19.1362 17 18.2044 16.6955 17.4693C16.2895 16.4892 15.5108 15.7105 14.5307 15.3045C13.7956 15 12.8638 15 11 15H8C6.13623 15 5.20435 15 4.46927 15.3045C3.48915 15.7105 2.71046 16.4892 2.30448 17.4693C2 18.2044 2 19.1362 2 21M13.5 7C13.5 9.20914 11.7091 11 9.5 11C7.29086 11 5.5 9.20914 5.5 7C5.5 4.79086 7.29086 3 9.5 3C11.7091 3 13.5 4.79086 13.5 7Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <span className="ml-1"> Community</span>
                            </div>
                        </ul>

                        {/*Quick stats*/}
                        <div className="mt-15">
                            <h4 className="text-sm font-extrabold bg-gray-100 text-gray-700">Quick Stats</h4>
                            <div className="flex justify-items-stretch mt-1 text-gray-600 text-sm border-b border-gray-100">
                                <menu className="w-full bg-gray-100">
                                    <p className="flex justify-between text-sm text-gray-600 mt-4">
                                        <span>Posts</span> <span className="text-black">89</span>
                                    </p>
                                    <p className="flex justify-between text-sm text-gray-600 mt-4">
                                        <span>Followers</span> <span className="text-black">156</span>
                                    </p>
                                    <p className="flex justify-between text-sm text-gray-600 mt-4">
                                        <span>Following</span> <span className="text-black">23</span>
                                    </p>
                                </menu>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-4 md:p-6 pb-20 md:pb-6">

                        {/* Profile Header - Hidden on mobile, shown on desktop */}
                        <div className="hidden lg:block bg-white shadow rounded-lg p-6 mb-6">
                            <div className="flex flex-col md:flex-row">
                                <div className="flex-shrink-0">
                                    <img
                                        src="/Default_pfp.jpg"
                                        alt="Profile"
                                        className="w-36 h-36 rounded-full border-4 border-white"
                                    />
                                </div>

                                {/* Name and Bio */}
                                <div className="mt-4 md:mt-0 md:ml-6">
                                    <h1 className="text-lg font-normal">
                                        Meow Meow
                                        <span className="bg-amber-300 px-1 rounded-full text-white ml-4">
                                    ★
                                </span>
                                    </h1>

                                    <p className="text-gray-600 text-sm mt-2">ITE, Student</p>

                                    <div className="flex space-x-4 mt-3">
                                        <span><span className="text-gray-900 font-medium">891</span> Following</span>
                                        <span><span className="text-gray-900 font-medium">156</span> Posts</span>
                                    </div>

                                    <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-xl">
                                        Edit Profile
                                    </button>
                                </div>

                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex overflow-x-auto pb-2 mb-6 border-b border-gray-300 ">
                            <div className="md:ml-8 flex md:gap-6 gap-2">
                                {['All Posts', 'Q&A', 'Lesson', 'Group', 'Collections'].map((tab, index) => (
                                    <button
                                        key={index}
                                        className="whitespace-nowrap text-gray-700 hover:text-blue-500 px-1 pb-1 lg:text-xl md:text-lg sm:text-md text-sm"
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                            <button className="ml-auto whitespace-nowrap text-gray-700 hover:text-blue-500 flex items-center bg-pink-100 rounded-xl px-3 py-1 lg:text-xl md:text-lg sm:text-md text-sm">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 ">
                                    <path d="M3.38589 5.66687C2.62955 4.82155 2.25138 4.39889 2.23712 4.03968C2.22473 3.72764 2.35882 3.42772 2.59963 3.22889C2.87684 3 3.44399 3 4.57828 3H19.4212C20.5555 3 21.1227 3 21.3999 3.22889C21.6407 3.42772 21.7748 3.72764 21.7624 4.03968C21.7481 4.39889 21.3699 4.82155 20.6136 5.66687L14.9074 12.0444C14.7566 12.2129 14.6812 12.2972 14.6275 12.3931C14.5798 12.4781 14.5448 12.5697 14.5236 12.6648C14.4997 12.7721 14.4997 12.8852 14.4997 13.1113V18.4584C14.4997 18.6539 14.4997 18.7517 14.4682 18.8363C14.4403 18.911 14.395 18.9779 14.336 19.0315C14.2692 19.0922 14.1784 19.1285 13.9969 19.2012L10.5969 20.5612C10.2293 20.7082 10.0455 20.7817 9.89802 20.751C9.76901 20.7242 9.6558 20.6476 9.583 20.5377C9.49975 20.4122 9.49975 20.2142 9.49975 19.8184V13.1113C9.49975 12.8852 9.49975 12.7721 9.47587 12.6648C9.45469 12.5697 9.41971 12.4781 9.37204 12.3931C9.31828 12.2972 9.2429 12.2129 9.09213 12.0444L3.38589 5.66687Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                Filter <span className="ml-1">▲</span>
                            </button>
                        </div>

                        {/* Posts Section */}
                        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 mb-30">

                            {/*Call Component*/}
                            <UserPostQ
                                username="Meow Meow"
                                date="20.7.2025"
                                time="2:35PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={18374}
                                likes={1200}
                                type="Q&A"
                                img="https://d1nslcd7m2225b.cloudfront.net/Pictures/1024x536/5/4/2/1315542_nezha_hires_dirjiaozi_518692_crop.jpg"
                            />

                            <UserPostL
                                username="Meow Meow"
                                date="20.7.2025"
                                time="11:11PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={83934}
                                likes={5739}
                                type="Lesson"
                                img="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMWFhUXGR0aGRgYGRodGxsdGhogGxoaHiAfHSggIBslHRgaITEhJSkrLi4uGx8zODMsNygtLisBCgoKDg0OGxAQGy8lICUtLS8rLS8tLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAK4BIgMBIgACEQEDEQH/xAAbAAADAQADAQAAAAAAAAAAAAAEBQYDAAIHAf/EAD0QAAECAwYDBwMCBQMEAwAAAAECEQADIQQFEjFBUSJhcQYTgZGhsfAywdFC4RQjUmLxFXKCBxaSojNTk//EABkBAAMBAQEAAAAAAAAAAAAAAAECAwQABf/EADARAAICAgECBAQGAQUAAAAAAAABAhEDIRIxQQQiUWETcaHwMoGRwdHh8QUUI1Kx/9oADAMBAAIRAxEAPwDzwT1FQDENT5zpFXZGIBWPjZHxiXs88lyokgjXeDplkUhGNwQQ5rl4feKkmkyhk2xBpiAH32chopLnvRQorI03d+bx51dklZIUlOIGiv3Dvl6iLPs9daFVQtSfF25EEVh6VE+j0XSLZLRLcpHI6ekYX2sGUCj9WY9KeMaXfY1FOFVUsA7QzN2BRAZwwbJqHPlEHSZpTbR51KsRUqYANRVtch7RS/w/dBJolIbNnGnryrDuy3MJdoJ/T9WEvnpuCKmO1/WdMwABLEKcEOa5EMAafiE5bKS3FJCa3S8WOrAlssiRnvEzeNzKUoGhTRiM1b0agFRFwqyuhlOQc2cP8aOKuwNiT9QGtTnpFFkSIOJLT0qkykpASFKIDmrUd28IDmzJiqqWpStCSX/YdIZXnK4JhNCFJbxJ/ECWYhS3FRptSJ6lN2Xlyhhg46tu/foEWGylamUTSr0ceJB1iqu+QZIQ6ipx+oIcHkQArzMCXfZsIKiOheGsq1oCapBLRKUI3pHLNNqpSv57F0m/sNq/h5jgksCTrQivMEQ8M36tGMQvb4pE+zTkGpSKjdC6ePER4RRW+0LQ5UzLLtCRj2L53HjGaXVDVFsSElTilfLP0jzy8L3BnFIXwgvTZLfcRned7K4UJLJJwt/uUQ55AJPnEvaLWgTZsxJ4Sos+oW9fARKUeTLYY8Y2+rPT7HYFFIUoYQQ4HIh6x3VZWyIMLuz9/mfLYlpUs8R/UpzmdkgNTlnSH5tSBUFxyisJ1oy5YNMAk2CYtTQ0kXasGqjhGbmBTe5Seu0YT7+IOE5KFPt7RTbI2qHylJAwJID5wrtNsQgDAmr/AFHOEYvjFiGrloAtF4ksxdjX94ooE3ksppV5KNCXEB3ocY2jGxJxMp/CNrbakIYYRk9amvwRzVA+bE0yUoF3NYZ2WxkBKi7ka6ARom80BLmWjxEdpd/iY5w/TtHNv0CuPqESLOpE0rKQpKvp8vT7wymJLYoUovcFy4bQGO14XuEpA5OekLxdleaoVHHaJpCTwhWF3ypUjnFR/DJlICEjCB9t48/ui+ky1KAP1KJYCoiwTeZUllR0os5ZF0F9sJUtj9LQNMsyRTOmsEGy4nxrAJyH58IU2uzLBYLcDoYoiUr6glpnKRiBIarHl+zxP2i1qLuaZ9ecH3qVl3bmQ9eTQDYbMgpdZoMi7aZGjawVHuLLJarsL++/tjkNzZpf93mPzHIeiHxGSlnsZNBmYobvsSVIdXT0/MdbNMRhCUIxLNCo5CuYA15wdYZJS+I0Jokda/OUOnSKS2ZXbZAhZCeEM4bln7xT3SkIOLCas538Nt+sZXHc6lFzkahtg1Pm0UQuUYaFRbJJJpzz9oWUkdGD6jyx24AVAY6D7ecEyp6Q2FWuRoPOEtnsVAATjGWgzyqdYT3jeMxDAhiFMoDRukR42VeTitldMSqZNLqAwkgBs9jH2Vbhj7tSRQ6QhNv4pfHhCku53NGP5gqyXkAkhSHIyY++4gODOWRD2XKSaBhnSOs+WwCkkUOWT+O9IW2W8Ug0DJbI+vwQTOvKUmUtQrhBUx5CkJVFI+bSIvtbaAq0dwgM1VgVq1fxGly2UBJB1PLIfBA1x2JSzOmzC8whJGlFFR9w3+Y2FpCVOQ3xobFG1fqW8bJRmsa6RX+WPpVtSslGoDAZPC68JpRSMLQtlpWkkc9tG9NY7TrT3iWUku2YHzbOH4mNuya7VTMcsLywK9FUPq0NJF6KXLSlRLsPavrGNssWNJS9CCPP7wFdcpSUJf6knCeoPtkYHBc/mivNvAl/1f0f9oS39MVLSpGIBQIKeYJLt0xM20Rcy0FJGLeLrtpYMScYyyUDmAP1DcDXaPP7ViCilQ5RLHGtGyc+STKK7b6Ulwk4UkVbzi/7NXh3ktKA5UCoqPg4PzaPIJCyPpPg/nFB2cvYyZstYJCcQChqIXJj1cR4T5akemrx5iuzfaMbcuZMCcSS4pi/MUUyQgAFIxE5DQQTYJCpgKSlgR4+cPCVqzDOFOiIkSilYOJjWu0Gplgqdqmp1rlDO13GoKLCnR46SbAah6NF00RqtGEqeUgJTAt4LK5g+Z1MGTbMElgW6/tHRE8Jfhc6GGo4WW1BargZAR2tEzu5TPUivzoIImOTjUOkKLxmkqq+cCjm1Rqm0KLMSwyOcFXrKJCUvXD88fzGN2jiR1c6dI+XveJx92gYUvxZOW56DptHIDVqxTYrOO9SCxOIPXnrFfPtASvJxt7RG3WsBSi7EZc6/wCIYG/qHvE1ehTy0z1g0TTpHe87avvXxMNB7+0G3HagolajTJuZiZtlsxrChRgC2vykFWSezJJarn8x0loWEqkO75lykA1JJGQ0iQnWghwMjD23zjNJI0DNq1YUzbtUTyJb8QYukLJ3Ol0AVTSKP6xyGn+mDXPpHI7kd8P3ApE0JLoBSB/VV+cE2SaVzEAksVDLnAgJw9TnG11KZYUxITt6RWlQeTbPULqaWEp2ygqfe6GxBYNWIp6+UKFcErEDiU1E0p66RDm1qClHJyXG1Yj8PkWnl4HoYtaQVqClOQRh1BH0nbOJ69Ji1LUpRDuCW6ZNoYGue0YUMT0JgiZIOLEQzmhBcGntDxhRCU+SOtntZKAhSqA8J1BZmPL5pB8mfRSKhQAI57keEJywW2SSMtv8M8M7KkHJXHL8yBrnlnDOIqYdItSQmpz+H2EdUTwCcT4TRXlX70j7JsAmglJYl8SNuY92jpa7tOEbh6HV8vaJtItFvsJbkvE2aesLxGWsDLYKJHliIPWGdqmGYygkDprTPbnC2bISeCZwl6K0B/HQiNP4g2OagKOJKikktw4SWNNxyiCbxuux6sow8WuSdTra9fv79RtKl1KFasU9fhg1MpUpPCkKJyJUEhOpJJ0DP5xpeFFhKkMHoR7a05xtIQFJwl1JGZ25H86w+WPOLR52OXCaYjtS0KSJiCOJ3agJGah/acwIGsywFgnJVCS+Yyfrl4CCLJYiJypK5oOMlSCfqJrQgUFKbcKWh5ZezGJJC8iG1fryMLH8CTe0WlSyOl5X9/2R/bWyp7s8QcBw2r08iPvHk1vm8T9PaPfLZYGH8Na2L0kz2osaJVXhmjZ2VmnUDyPt52Qm2RYJSTLX9C9+R2VyhY9bND/Co/bJWZ/UD1EbWecd9o+CzAy0ghmJKjqx9/2iq7E2SWbRLlFH8uYoJJNQoFyQeTBVcvOOnKkNGGz2vstKKrDZyp8Rlh/Ekj0IhqmWxZVBs9TtQVMJUW1Yw4KJSAABsKN5NBMu1hRB+lehNfHrCRg0jNPKpSbGFqtqCSlyWowH3hfabxCc8IDUGZHlAMslKi4Lu1K+Lj7Ry2WUqw1J1ACA46l6fKRZJIjcn1BZqjMcso7AloEVwkOwppU+sMBLVkApR1JoB4/iBVXeoOouWPT7Q6YKB7XPJFB4wtNnxKcs+g+7QbbJuEajp85QstNpUqiaOPnKGQG9H2fagiiTU+cLbWhVVH6l6bD57xomyF61J1+Zw4s9xLmBJB+onrTPpHOuoFvRNJszcOpqeXKMrTJchI+lOZ5xadpbqRKQgS2ck4m22hTZ7Bw0TTc6tygKV7R0sfHTEkixtxE/No1n2RaWYEkh6aA0r5Q4s9lT9aynCmrOxPRveML3taZynQkgVc5UOQYO3hnyhr2ScUkI5cyrBX+46fBBSrQSQ305Ex0mWauCXUan88oHM7CeGrUxbnlyeDonxfUf/wAfLFGFOf7RyEQA/wDsSOv+I5A4jcmBroz1O3LnBt3TU4SEnUat98oQmaTn8pBdgkkmhITqftFHsF0z0a6jjkn+YyikFyzhiXAL9K84lAk414quc/WOyb2AoBkGjb+MUoUYAnINoTnzYwEmhpSUkdpKThYGDbqSoEhiU6jUcwM/LYR0u6xzJmJQ0GWsE2ezTCeF6nIDbnBTTFcGqddehparMzJXR6y17toXyP4Efe6NCUlMxLBhQ/55xqJuJOCYktQZBs6cn0cQTOtcySkIlhwaOakdCSW6RzbAgy7VrSf5iVJ/vbLruIeLWkllSzX9dAC/T9jEhKvCeFEKWo8zU/iLW6VfywqY2XIfMolJdzTB2qEt+9nmSFpDn9QcuNKecRXamUQmSFAgCaA/Q4i/kYvb7vXCskBmAA51d4lr2un+KkK7tKwr63qcuvI+MTmnxNHhcijnRVTLejAAzh6k5Ny946WR1jEkjPTJ21BG0Kuz95pmyQJqAJqQEzAHDt+oB8i3m7wzlSAOOTNAYVSW2/EBO9kskHCbi+qAO0liIR3jFK5ZxAijp/V4hgr/AIw6sFvWpKFpUohQyqevkRGarSahQGWzuctzCS4pikKVZkqIZTy+YVkK+XhD1aOT8tDedKnz3BS6DRtD+YSdqbrmpss1KyqanCGq6pRBBCjukgM+Y1cEkUdkvkGbMkqLd1hFGYlQNepIMZWO24ZappdS5y2QltAWH3rzjDk8R2Rtw4HHb2eP3b2QtE6TMnoS4QrDhriJzLaUcRWdhey05KUT1JKcOLCgipCgUkl6prVtfGG9/WG0Wd51nIlod1STVJpVQybSgIyAjXs92jRMfGWVyqDzct5EA+8HFOMnt7NGfFkWNyxK49/VfNfutDkSKEVSRlQv6RolDF8OmZA84EnXm7kEsdGYejQFaJ6lVKjhHNhGs8kIvG81KIQijFyrnrVtI0lLVMSy1qYa0BPJ8zCcz1L0HU6fv+Y7WOzLnTAMZYgk1oAA+nSOaCn6jBN4IQc6DJI+8aS1qnKxKcI967fMoz/0ZnLhJAfD4Cj6GCShAzm5pAZOQJAxB9n9oFBez5bhJJcpJIphDOdydMonrfMQV4ZaGLs2Kj7Q7miUtBwlTpzPtrlyY9YDu64UpXimTEsKs9d+mphloRpt6MpFmmEhUxKFPklgCwyfZPrFOi7e9ArhYacsh4Rtd1llsV5vQPnSD7NNcsG5eEK2NGNCwXDKCSkpKyzuSxgL/QpakLCcQem7cniqmIoz5xhOlcBSC3SnjC3Q7Vnl99XMmUeFJX4U+ZwnmpWaGlMk09I9QkWYqxHCGycgEnXXSBplzSkJKlJTMWcgAEgeWg5xRTJPEeYizMD+kNXcjX2gC1pagHiPWLe8LIkl0y0UVhIyc6sOtISW6xoJOJJDblxQOwYnT2EOpCSVKiVwHf3/ABHIaqmF/pR5q/MchuRLiT1jY5loNNoBDAMnQQqs6XGbbc+UFLmuA8WQjDZKgcofWWYhIzL/AB4mbMC7DX48N7vRxFJZub6esGhW2iilXupDBAOVTlTqeogeVeC0LSsKUTRxiZ+UOrJdVnWAFkpZP1JUKjfCXpo7g8oJTdcgLSlQUoBgCmgAOuXrE3xKx+Jr2Fd2WqalQJW6XqCXI84bKnoU4wgl6P6j75wZMuYSZjPilqqAUjI8965x0/0vDOKEjgAxYszXIDmGPgH2gOSCoyR0RYQTiIPCHw+0F22eqgBYs4GVPVqCC7JYlpIUpIQnT9S222B59Y1tFjC6jhA8D13MTK8XQnmJlrpMOBTDiJfd/jR1sNtEt5aVYgQzpcecb3pZVTHYslIzb4K5NCDFg0AbRh60hkrQknUjpaFJUvE5SsUCwM+o1FIzM5YUAX6pyP3juLQFNj4eYy8vvHYgJIOJ0+hI+4gSx+mikMukpq0vX7/o6S7yw07xKK5KCk+4rHa9bYRLRaQtloWAk1GJJLE12OH/ANoOkKQRiYKOzFPqKekR/b+0KRPwFmQlkoDtk7c6mpjNllKFb+hu8NDFldRjTXe7+lDzs8gkzlrVxTHpzSc831IHjHLD2h7qzoUoKJTilhsgynPiaRtdtoErFLmAmgwtQO1H1bD6oVvEtOmdyqdLLKCnWku4B18W9ozZ8Ci7RqwZebcX+XyKTtlf6jZ5ZLgTZaVB82If7wVc0iWqxyZzsuUkhXQcWEjXhW4/eJ7tfPTNtaZCqIlhKQ2wp7Rr2WvSUZaLLLRjmzFkqLnCEkVUX1CQaCmVYXGknso+ajcO2/8AP5FrZZ6ML4CSNNHBavlnHDJMwYlAU0Hxo1TMlpBqH2eMZtqpw1PLIfcxuWjyJNNtroEWOwJWcDs4evlG95y02VBTL+tYSkN9VCfcN5GNbikU70qOLIuQGzAo1A7QjvOYSsuo0LDmQlnbWjQUrO9zK13klBAWymyAqkPyxAqJ3gdd/qw8ISOiQGAJ50+bQltK/wCYEltaqflT9xDG5ShKFKW7EMwzbX7axWXGK2CEJzdRBZt7uQSBnmAx846C9US1camDuWz/AHj5Ls67WrupMoJFXapqTV8gPlcopro/6fpSQqelKy74TVIbU/1HrTkIk8yl+FGl+E+FvLKn6Lr/AESi+1NunkixSViUMlFOLLV/pEFWS8r8lcakrws7GUhXokPHp8qwUALAaD2jsqzgHcxJ2+48c8Y9IKv1+p51/wB53mqndy//AMZhUx5P9oyt/aS9FJ4UrSwLuJQHSpKsukemzXI4shpEzfNmShCll2SCo00FTHNe53+5inqC/Pf8EVcXbq2d73M9sKlMElICknkQzjJwasX61X+vKKCKAP8AVqHyb1iM7KpRarRNXhZSC6UnR3c/bxi3l3CSmtB9s45CeKaU/Kq1sDu5RmqMwiiQQCcydz5vCbtDUgJd2BJB1yNeXzR69VmAl4EUb9gYkJ9lWVqJQpsqPT7eEVizBPQkZOqkv0Mcg4pApjTTmI+Q3Jeofg5P+r/RkLZUHx5xskARrJluQAcy3z5pHaYliwD609PnWNSZlfWjvZfqfLnFN2euibaVulgkHiUSwH5PIQruK6lWiclDMnU7AZ+Le8eucEiSlMtLABkJFOqjzNK84Sci2ON7YqmWNKVIlIPAgM5qVKL4ifP2gm3FEokhVBl4CAjMwYiWdvJzAEy2JbGur/SCfXpCpFGx5LvTGApdEJDDmdvSNp1692Ao0J+kGp8OURdqvhSlAAEnIBmAPIR3TZ5ylAqPHo7l/t+IVjKq2Vhv1ArMUSWyDeDn8DWNLHfiFkBlpO4r+8SSrqmJPEoFR5g15l6QWq6pyE4kqQT/AEpLnzyEK0NFlZaJXeM6lFIORokc66wNOFkyLAnf/MJZkufwIWr6wA2IFvUlo1mWUJopE5+QAFdajWArDLiNEXZJzCArpUdcxAN82MrARLQQBQKAYblm8qwTYrD+pKil8nVV25BoZTBPIY4SBmrl5+0MpCTgSCruXLSojiUkA4RQkipSCXALU6wp/h0z7XMmTylAklky8T4lu5VViojnlSPQZVmSQEIAJFVEuwarCPM02gLmTuBcyWpZUoihDksWB8WrGbM/Omb/AAzrFKN0vVdd/ft1G17DEHYgtnslwx6gt/7RMTJRs04mYEzJanIFHKiggBQpTEUvoRDZHZmWSFImrS4ejGmYzFc9YB7QgAS5ig6pMxKVKGocFBO7hxypC5VOUdov4aWKLUYSv5qv3/cTLtveLXMUePCXfN9PVhGVx3imQXwspJdKq14SMJ3S5B6phh23uoSrQoyyeIYlA8ySfz6xNItCJSwakguHZnBcRDH0NuXabjqL6nqF1dpEzAceGUtJZSVN4VaHMu9JLuZqT0Vi9EiPKRfk0rxpmKSVElTVZzkHLlJByereMW3/AGspcuXapc02iWriWAClxq1TXcZhou5ZEtff1PLngxRl5nX38v3K5V6SpX/yzAkKB4WOJumfnnCO8rQgErE1JTUiu4AYvtn8ptbbpsUlKJvdTClT17xSq0zqXFNDCu0XrZz3gTIWpYJ/md4UpzoyQ4oNGGUTjnnGTT/Wn9BoYcMknv8AKvr6Ak20pWXSFrOoSkn1YBm5xvYrDMmsZnBKBYoGfLkNTqaR1lqUr6cKfAnwpp0hvZbQZRGJQW5HAkDESzB30alTDfFx5NN2yssk8K/4oqK9er/Us7mkyUIR3SQhNOEZk6k7w+KqUhFd88Fj3a0A5YglhyoT1rDaUllEv4feKowyduzZSco6EAFznHQTwVDlC+32kJ4lFhVtzBoW0gq1TQNfKMJtlxpZTEGhBybUHwhTKtLqDmpLNDqVOSNmGXzaDxFU0zzm9/8Ap5MkzDNsUwpUKgOxH9oORHUiM5d83ugfzJBWEhnMol/FJaPTEgKcg5RO37eoRwpINf8AIgKHoaJeKqPnSfz6kfO7cWpIY2MuxBOCa4fkzP4wjtt93jaEqRJss1CT+rAUjPQqYDPUxdWW9T9Q+nk7ClcznH2XbVYVOebH0jnB+okfGQW4wVnlX/ZVsNSEPq80Z66R8j0JcxRJNfOPkdxQP99k9iTuSyATEFQw1/U2o5w1X2SnFRUBidyDuDUeZeFE5BSakqYgB9eXRzFjcN4TpYCV6Bynk7CmjmNTdIxKKcjnZyX3UpiGmOyujn9obW+3gMo1YcI3Pz3gC8JyRNFWTMDg7H/IgK02nC5WHwJondR+1IW7KVWga8bcoJxFypRoGp++sDSLHNm4ThJegJoOjnbfKpz00Xak4gqce8JGLDoP7aaMA8MLTe0yagKbBLFOEZADb8bxRL1JuXodlXauzqC1zJIegwkqI1eobxj5/FTe+BTaCpRH1LSyQBoGcwlvAyJmEm0zFnY0Yk6CtPF463hJs+HgmrSsgZkKB6ZNQxzQVZSWO0W9U2glzDuD3mAbmjAn7Rgu+iJihaZfEKYVcDNqWbrtExIvOckYJRWEgcSwT4udI+SbUVTAuaAQkNX9R0JOv7wko9ysJWq7lNdV7SVTFEhkDJJJz5kvw6ZQbY+0ErEVFJSQGCUEADR3+0Tib5E0pUtKEIDZIGQGg/MbTJ8ubMdIDJ1mEN0oAHyp1gWg8WV9kvmROGFWemJnpzFINs1lQtTS1lhVqg+EQc6YtZJMsMKulIT7UPlD+5rwCU4EqPMK22FcxCOPoOm72UJmTEOHA/3KPhmGiTuy5p8qYsYOA5LCkkUdgWLhwc2EVqbbLmpAFW/tPh0jK8JYSGKCU7pLnxhHHaY/Ooyj2ZPmWE8KQC2xYdH+0Jb5lBYOMMhYwLHjwltSDlzbaKqVY5ZS4bYueLyhT21sKU2MqlrCmUHDMw69SIebpEvDqXxERPaS1YiCv6+6ZTZYkhSF+GJNDEWmcn6Jj4dxmOY3i0vOSZkmzzqF8aFH+liAArQHioNm5xEWuyKQopWkpWksQfmVRXXxjJCK6Wes5yjTr79zabLwkkOUH6S705ls4uv+nXa9VkWmVNUVWeYQ4oyCRVY55ONanOPP5ClJ+lxuNIPu+3JxYVIBfSoOWih01Bii5LTX5izjjy96fo/2Z7jftmCaJ/8AimErCW+k/qw/2kF25kwsu69O4JQpBUAXDM7611HIiA+z3bOSJCZE9T4KJK9BoDsQKPSkPJ0mUJXepliYipzG+eTNzgRc4vyq16d1+pgyQ4up6fr2YfZplnngGWllGrFISTuHyelKwvvq7cI7xCQoYiSeTCnofOBZE04TMP8ALBYJSkDM5VIJh5c1jM1LqWriehWpjhzJrzh4traj/wCC5IpUnLqrALr7RJ4UqdvL5pFYqaMIKVODHnNosQTMVhqkOTlQO2/0843sdsUlIZyxyBi6ipbiR5OPVdS6lTsKXoSWBP2iX7T28qmJSDQlyDpANmtE6eG3Lg6cMG2S71YytaQMWYUIPGifJT0B2OVM70YiQBUGvp4RT2uzKSgJGSQCTuTG9gsUtSeEFxSpfyPOGFqIw92Gc/aJ231H4KNpdBHaLaZUkCpJS5YUr/mJldhWt1kEAJJfIvtvFZaLOlS2OTMebfU/JngmVIThxM4LBIOwOcddHOHLbZPXbcRTLRizPEoeoHtHy12Ihh9Ss1cmy584o1TgAV5qyCfV/m0AzlqwqUaly7DN9H9zCtthUUkTv8Kr+k+ccjkyeXPXTL3jkLQtkzct2TlCWuYlSyzy0Zk1oToEv+YsJF1iWhSlHFOWeIjKmQHIVbpHS0rEtZAoQyegzb19o2Ra3S4qWPnp85xfqMtC+8kpUCnC6gPIj9XpElfi1DAHoaFqvqw+axQWxM3u1EAAr1UWZzr0BNInbfZEqS+MnAwcb5q+3nDxWycno6Tb7aSZctkOMKmfEp9z9o+Waa1nXjQscLJ2JOo18473daZQBAloYks4Boda6wFarxJ/lvQFgPnKkUlDkqBDJwd1fzBZtjKSkYVMQC5bNsgxNOrRyVLUVAqcYcy/zzjvOt4Jc/1AuOWYHg8dZMlc2qQWIqfGp6UgPWjlctjBaxMT3aAUp6v1jrOsgQ6VcRSSGSeHNgaZvnBXcBA7sMpTAqPM6A+Dx8ExKan6hvkX3q/hCtDp09gUhLtiOEPlX/EEyZbkocNu+YbSCJqgtVSAol2H0l6tyhZOXxUop/WvrCoo1VPsOBaVBSEoWQk6bb/5g6VbUsz065Eewp6xNIdnxl3qdjygyXaEipq9XzjqOdrqVVjvQlnAS36k5kPRxl4w5k3wpBCGxE67jToYgZNpXiGBVCnVtHoYMsl5cKXFHYjd9QdDSA4nKWqLmapCnP0EM/j4b+8J+1SFGyrQMQBIchmIHPIB2rC6ReQNCtmyJrzAPKsY9tbUoyAAWSofSGYs4U7ahhTm8RzeWNepp8JHnkv0J6daEy7BJTLNVTFGYWBq5ASQoEMAh661EDWAom2+XiwqQtASpJSAGSjBgYBv0+o2ifBYqSXL1DGoUxb94pbhufvZ9jmpCsJUBNA/SqXxK6Y0h+rxKGOnyNmaXla+Z97TdkkSUGbJK1B/ooSkaF3rUN9zEWp6Ox2fp/iPUe3t4yZTSpCVg0JJJoT9IL1OUearQclZ/jONF7MUFJwTlsouzvdTlpTOqXFTqXAY9XIj0GzdmRJKlWafMkOCGfHLL5ulWYyGe8eV2GYMBBFcyRq5pHpl19oO9s4JPEkBJGrgZtudfGOioydMXxU8uOKnB67/ANruBXmJsjhmEEJqFocg1oSDUFwHo3OLns3bpc1DJJ4kkHk5Dt1DxIzbQJgKa5eOeUG3EJlkTMmBOKWleBYNCDm4PVvMeFJrjH2M+J/Ha1Uvo/4f09gW/wALRNxDhLOGyAc+jCvjAl0rdaQGxF6PQMCwGrZ0hh2ivFExEtSQC+Jxs5yI3zhVdM5AmJUrQUSHoQWBMUhtWiL1cWeh2EypEsAlKljM88ywyGcDWi8yo+2piflqUXVif4Xg+61gd0Spy5PKp/bWEce4HJ3Q+Rae6R3YPGanqf2gmXLWBk6yNDlyHT8QuUgFaSTmXVWo2zign8KX1+ViTKoETY8LlTqJpvTbpGqgRU15NSFlqtClDEFEAajlnGVjvAJYKUQ4yOtI6guVOjaalkqOpdjtyHSAJ0lkNnv+NshAl7XtUJdh8qYn7ReKioJCmDZuz1/zB4E/iqx2Vp/qR5E/eOQg/j7OKFRcU0jkHgDkMbYXSVNU186fb0EcsVqCUHEzJD/OdMukYWyaSimhxEdc/KFNvUcJbVz/AOIf5zh0h2wO/b3WoFWJk5JGtcjC2wPMHdvUh1Fsh9zHJc2WZbrBUcVK06dKQxsaUzEJKAQpKuNtRoPDLxMUqiTdg13WEDFjrm2wToerQJabvQAVjiJLCuR6RW2W7UCWFrLlQZnoHOXzeEN42AB8ILUIS2R+V8Y6xq7iNEipxZCpLeFOdYcJtiO6SgHClFGepevkCdtXhVal8A/qyP7wFaFEANm0c9nJ0x7MvRKaJro+Yfev+KwAm1Zk66tQ033hXJzq8MJTD6mL+kKPyNpE0oUlRBwhlHc/KQTe9plqX3ksM7OMq8tnzhbaZyyACThGQOmI16ZRhImEiv7xPinJSKqclBw7dQ7+MASUNV6E5jlH2RPwHJ6U5eBzpGKUA5ZZPy5ZRvZ0Mk0LamuUHoctjQT6JCQE8xQnro9D6x0mzGJFHxZV8Pz4CMphBAKRUa0YueIEfNYxlzsVC+JqUfKsLj2rKZnToYWUKUsgUH6n0bMnYUgTtFaMbDFQBKRthG2ufnBtyyO8nISSQ6kgjd1BMC3hYeKY2QUcOzYmH2iOeXmV9jb4GC4OurJ2akYmfP0iw7AW9SJzFTJWrA5yCiODzYh9gYEFyoIxMoOKKIpi2po4NX2j7YrKuX3kumGYkOU/pUk8CvA5jrEeSTNcsfKLWmd+29pK50wlJSQpiW/o4acqERH4C/CXckDcDX0j0W8rOu1hE4KCVYMKnphmILKFBmScXVR2hjIueXNsfdKQgWhCsQmBh3hdySoB+IFSeVC1BFYp2ZJTioqzy+zSSMVHfPbk/J/eKS4bSEowlGEuKtQ6denjBYuBMqY08p7tQIEzIjJqaGjHPXOKSXcryB/Plz5LsP6kO74k5tzzGbNlWOnaI5+MoU1a9hr2ZuZL99NolAcB/q18jtDm8pcsSxKIxO61D+orJxHnmK6MIXWFKZUoyQpSkirqNWqWdnI6uYWdoryx4MD4iCFeQr5e0V/EzAqxxpMkr4wocJX9SavSBrqUcYNABXwNPN/cxy9pJWCCakuBC25LSUr7tbgvhD6tRj0d/Bo6P/HLj27FcteIx/EX4l+L39y6tUxpQw7V5E5kmN+zt7y5iggpYpSNfqakLJssdwCSWKmUMvjsPhjXsmJX8QVVSnAUpejKNfEUz6bw8rsyJqi/mJS74Sdk7613Dxp2htLSVO4OEANv+0ZXZOQJb1Kg+enOEN7W4uU4swSmo0IDNpr5RFLZST0ZzLTMl2cJJD4SQM3iRTfyiohzhFaVZ8zWsfb5ta8YGIkMRrqG8qwhsMkqXgpXypUe0VUTO2yhtVsUrCsszffOFVttdThJY+VIYXhZvpSg4gE1bWuQ8j4QL/AklI+nEMmz8/eGoBimzlvpHpHyC0WAgAOfIRyOoJSWklLBO5B8K/aFt4SCUg7O3gOIeTw2mKfi2Ucq1+GMpuFSEpH1Yi4/3M7nZh7wEXZK2WwiWqcQMSQMSX05dQXHlBN0XsZSkqZhs1D1hpZG70giixh50P7wvny0YlyZiePNBdgRmPMD32hm9CJNvQdbSD3gkrbEoEI/3cVOYL05Qnva8qUU63rtmwr0EZzVJmKC5fAySEuaYhmSXzIhBaLQZkzflu1PWAnXUZq+h1kKruzttnX2j5NcqIGXnSMJ6iHahBqOX5yjJC3whnO2/L2jm9AS3sOw4Q5qOW+8YzLQA2Xl9soZ2e4ppDLIRUcJzGxpkeUGyuzKycCZiS9XUnUeLwvULaXcQBZUTVwd9Dm0aSAVHhDKAPjT8PDC23BMRXDyOEuX33heqWpKmLg5ahuvrCtFIyTN7IshqNXPRtPv6Q7sQKlAsanD/wCX+esJCp8wc/lfmcP7rlqWgkOagJ60falYzZ5uJ6fhMal8zC12IpWQORrkakOdvSOi5eJLjhUV0AL5g0GuYhvaZJKwgOVBCS46YjyzJjK2SAlKaA1ORqNXNMhHY8txSOz4EpuSCOyalptIx1wJUQTkMCCoe0EGyuc3dnpvRJ6EtHTs6eCcpi4ls+gKyAR4gHyMGJUQnJ9mAyDJqc3yiGV3Mv4fywvrYOlICe7INHyOpNKbfmM7ss47wgl0OVqGyUjErx4T4kRtbeFacQPMCj8gd2hjNXIlIwoCv5oHeLdzh/WkbAN4tDcopIRKcm7/AD/n5ie6xMUVJIP88Fbf0LFUPtiCiP8AkDpG9ntIlgFT1ej5EfaBlzVLUV5Yi42dP0DwZhB972dKiJiQ6Ztd2V+oPpm//IRphpqLMmXzRc0g+xX5JrilB9CWflG9ltUkAngBVmAmrDIZe8SgsYQXqSNBn7u3OCO7SGLkh+Lcemm8VUDJKbQ2tt9qWokABADaMB5ZmF82QqYHSxJzGrUy842FjU2uHQkUdjVxSGXZ8FKlFQYDOmWjDkz5mKqkiD29iD+BKVDIsMho7ZRK9rrMElJTucQbJRNCDsyUiKu9LdjmqCCQhy7Znp80hdNR32KWE0U4HLYk7u0DJHkqKeHyPFLmuncWy75M6QiWr6pZ4ju30nzp4RT9nLShBTiISr+onMM4DdQPE5GPOpjy5w3ScCk6GtfCKadaQQlYwgEE4ab5HlXLpEcU7XFmjxnhlB/Fh07+x6B3uKSFAsolyEnTMj5z2hPeajhddCBRgDkzE1hDdt8GXRQYepJ2Dbt4Ewbf9uBlYU8WI6bexaK0Y29EparYSpySWyL+sa2W0JSX+oqy5c/DeF9pFOesdJM0gYqcvzDkWWVmwkglZolzgSCHLMGLh3p94YWMJDKbCQeEqIKti4315RH3fa5gIUC3XJ94qZFunKSCvCA/1kAFgNNak6bQBkGGxk1xmv8AbHIXm1yt1nnijkLsahwzYgK1KvCBrGsqV1LeJ/y0aoS5Wjdw/mB7R8QMISdcZ9w0L0LdWL5s5STjGeIklshl+YGnzJajLmTasSPV/wAwxnIecZY/Uo194AvZKaJbhXMNNgjh8+KCpWBxpmFqsskpmCWsgu4JLulVfMZRFoUROUACVJUzenvFlPulPdBSFFKgVYhorAzcxnE9dtlEyeonfEc64Q5FCM3zgPzKmFPj5jouzGaQrJxU+Jpzhnc0mWngJ7sv9VfWD7TZhhBSaZAbNp0gN2ZRz6Q0YqKpEpzc5XIPqFKSTxA0LfVzg6yzwGUHfV9Dt0jCwDvH3DZ+XnHaVIImBJNHA8FNpyfeCxY23SQ2mK7wOBxCvUPp80gKbY0LKgtANHByNI3noMicZb4gGY5Z18DDTugpPeClMufKAmmrOcXGVd0RtvuJSTiS2Bquagc94YXFLJl9yFElSmBc0oD5V9oaWeTixEnLTfl82hxdEhK1FgApgpwAKhq9WLPHm+OtR12Pf/02fHzSXUWyruIk95NJCmUNv1Aga/3eBjKc0uieJX6mFKggZaMoeMUf8EkoKSSWdXiSz58hTlCdFnwzJiTVWFn0rUeAr5x52PO09noSgpql1O9rlos8gSgA6uNVMmyD5ks7+m5ClSSZMtSArExLtQCv7eUH31JUtAJVVMuvMlIrCi7LctOFBIKSlJTvxVD+beEXU3OLkutklFQcYtaa/gby0E4Es4CHWWGZDDp9Jy1MCWmzYJVTQpUSWeisVRzBPvDe7EhJJVkxFMwT9soUXx/KRhBOFRIbQPmw0cAvEYZfNXuW4WmvYWi0JSO7QrEAHK0gpxbZ1YQfds4TAuUKkjGj/ckVGeZTpqQIRzzhSW0r6sPT3jGyzSDiBIKFBYIzcbece1CKqzw5zakosJtloIFFeDO9cg+X7R8uu0AKrVzVnBo466mnOGNtky3E4JYLRjCRRiRUdHduTQvxBiciCBQM9I0JpIxTT577Dtc3uAlTvLWcq0Y086x9vO8AmWcD8Rpuw05R8Fm70IQo0+NCe9iUKAzw0Ht10gwakLlTh8gLvMZZmJDUq77+cMbru5nIGRcaksWzyAd6eMC2OyukrJ1qBqSaeAeDRa2XgA/SGfTLD71ihBvsSva26e5mAqOITQSTzGYp4esZXKtKcMpWbliTls/KmXOKa/7uCpKwpRK2JQTkCnPzr5x545IfIpq/J4w+Ig4ytHuf6dmjPG4TV9vyKYpJJJKdi9NWryglM0IQpI1q7fTyHM8oT2a0FaMe1Dz59YzVOUQa8+vXnF4vnG0eZnxvBkp7/gyXVTEnk+p8dY4mSScqD7xvMFHLHb2rHSQNBpFUZX1HlyJQElR4sBZjUP8AgfMoNnrWviJocg/2hVZZKiju0lsRJJ3o+1MoPu+zhDqVxMwAgMaPogglX9ZjkMk2dRALS61yMchL9i1L1P/Z"
                            />

                            <UserPostL
                                username="Meow Meow"
                                date="20.7.2025"
                                time="11:11PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={2449}
                                likes={1239}
                                type="Lesson"
                                img="data:image/jpeg;base64,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"
                            />

                            <UserPostQ
                                username="Meow Meow"
                                date="20.7.2025"
                                time="11:11PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={1}
                                likes={12}
                                type="Q&A"
                                img="data:image/jpeg;base64,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"
                            />

                            <UserPostQ
                                username="Meow Meow"
                                date="20.7.2025"
                                time="11:11PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={3430}
                                likes={5900}
                                type="Q&A"
                                img="data:image/jpeg;base64,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"
                            />

                            <UserPostL
                                username="Meow Meow"
                                date="20.7.2025"
                                time="11:11PM"
                                content="Lorem ipsum dolor sit amet consectetur..."
                                comments={134}
                                likes={15}
                                type="Lesson"
                                img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHyx2Z6VGO34a34ap320A7jVdiUWmDJ0kSnA&s"
                            />
                        </div>
                    </div>

                    {/* Right Sidebar - Mobile bottom bar, desktop sidebar */}
                    <div className="fixed bottom-0 left-0 right-0 lg:static lg:w-60 bg-white shadow-lg lg:shadow lg:rounded-lg lg:ml-4 lg:h-fit z-10" >
                        <div className="p-4">
                            <h3 className="text-lg font-semibold hidden lg:block">About</h3>
                            <div className="flex lg:block justify-around lg:space-y-2">

                                <div className="text-sm text-gray-600 ml-1 flex items-center space-x-2">
                                    <svg width="40" height="32" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg"  className="lg:w-10 md:w-8 sm:w-6 min-w-4 w-4">
                                        <g clip-path="url(#clip0_542_3783)">
                                            <path d="M20 1.99841C19.4937 1.99841 18.9937 2.08591 18.5187 2.25466L0.987485 8.58591C0.393735 8.80466 -1.45457e-05 9.36716 -1.45457e-05 9.99841C-1.45457e-05 10.6297 0.393735 11.1922 0.987485 11.4109L4.60623 12.7172C3.58123 14.3297 2.99998 16.2359 2.99998 18.2422V19.9984C2.99998 21.7734 2.32499 23.6047 1.60624 25.0484C1.19999 25.8609 0.737485 26.6609 0.199985 27.3984C-1.45436e-05 27.6672 -0.0562645 28.0172 0.0562354 28.3359C0.168735 28.6547 0.431235 28.8922 0.756235 28.9734L4.75623 29.9734C5.01873 30.0422 5.29998 29.9922 5.53123 29.8484C5.76248 29.7047 5.92498 29.4672 5.97498 29.1984C6.51248 26.5234 6.24373 24.1234 5.84373 22.4047C5.64373 21.5172 5.37498 20.6109 4.99998 19.7797V18.2422C4.99998 16.3547 5.63748 14.5734 6.74373 13.1484C7.54998 12.1797 8.59373 11.3984 9.81874 10.9172L19.6312 7.06091C20.1437 6.86091 20.725 7.11091 20.925 7.62341C21.125 8.13591 20.875 8.71716 20.3625 8.91716L10.55 12.7734C9.77498 13.0797 9.09373 13.5484 8.53749 14.1234L18.5125 17.7234C18.9875 17.8922 19.4875 17.9797 19.9937 17.9797C20.5 17.9797 21 17.8922 21.475 17.7234L39.0125 11.4109C39.6062 11.1984 40 10.6297 40 9.99841C40 9.36716 39.6062 8.80466 39.0125 8.58591L21.4812 2.25466C21.0062 2.08591 20.5062 1.99841 20 1.99841ZM7.99998 25.4984C7.99998 27.7047 13.375 29.9984 20 29.9984C26.625 29.9984 32 27.7047 32 25.4984L31.0437 16.4109L22.1562 19.6234C21.4625 19.8734 20.7312 19.9984 20 19.9984C19.2687 19.9984 18.5312 19.8734 17.8437 19.6234L8.95623 16.4109L7.99998 25.4984Z" fill="#6B7280" fill-opacity="0.99"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3783">
                                                <path d="M0 0H40V32H0V0Z" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="flex items-center space-x-3 lg:text-lg md:text-md sm:text-sm text-xs text-nowrap">Year 3</span>
                                </div>

                                <div className="text-sm text-gray-600 ml-1 flex items-center space-x-2">
                                    <svg width="36" height="29" viewBox="0 0 36 29" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-10 md:w-8 sm:w-6 min-w-4 w-4">
                                        <path d="M22.6082 0.168933C21.652 -0.106692 20.6564 0.450183 20.3807 1.40643L13.1807 26.6064C12.9051 27.5627 13.462 28.5583 14.4182 28.8339C15.3745 29.1096 16.3701 28.5527 16.6457 27.5964L23.8457 2.39643C24.1214 1.44018 23.5645 0.444558 22.6082 0.168933ZM27.142 6.92456C26.4389 7.62768 26.4389 8.76956 27.142 9.47268L32.1651 14.5014L27.1364 19.5302C26.4332 20.2333 26.4332 21.3752 27.1364 22.0783C27.8395 22.7814 28.9814 22.7814 29.6845 22.0783L35.9845 15.7783C36.6876 15.0752 36.6876 13.9333 35.9845 13.2302L29.6845 6.93018C28.9814 6.22706 27.8395 6.22706 27.1364 6.93018L27.142 6.92456ZM9.89012 6.92456C9.18699 6.22143 8.04512 6.22143 7.34199 6.92456L1.04199 13.2246C0.338867 13.9277 0.338867 15.0696 1.04199 15.7727L7.34199 22.0727C8.04512 22.7758 9.18699 22.7758 9.89012 22.0727C10.5932 21.3696 10.5932 20.2277 9.89012 19.5246L4.86137 14.5014L9.89012 9.47268C10.5932 8.76956 10.5932 7.62768 9.89012 6.92456Z" fill="#6B7280" fill-opacity="0.99"/>
                                    </svg>
                                    <span className="lg:text-lg md:text-md sm:text-sm text-xs">Computer Science</span>
                                </div>

                                <div className="text-sm text-gray-600 ml-2.5 flex items-center space-x-2">
                                    <svg width="23" height="32" viewBox="0 0 23 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-9 md:w-7 sm:w-5 min-w-3 w-3">
                                        <g clip-path="url(#clip0_542_3780)">
                                            <path d="M1.92871 0.5C0.272461 0.5 -1.07129 1.84375 -1.07129 3.5V29.5C-1.07129 31.1562 0.272461 32.5 1.92871 32.5H7.92871V27.5C7.92871 25.8438 9.27246 24.5 10.9287 24.5C12.585 24.5 13.9287 25.8438 13.9287 27.5V32.5H19.9287C21.585 32.5 22.9287 31.1562 22.9287 29.5V3.5C22.9287 1.84375 21.585 0.5 19.9287 0.5H1.92871ZM2.92871 15.5C2.92871 14.95 3.37871 14.5 3.92871 14.5H5.92871C6.47871 14.5 6.92871 14.95 6.92871 15.5V17.5C6.92871 18.05 6.47871 18.5 5.92871 18.5H3.92871C3.37871 18.5 2.92871 18.05 2.92871 17.5V15.5ZM9.92871 14.5H11.9287C12.4787 14.5 12.9287 14.95 12.9287 15.5V17.5C12.9287 18.05 12.4787 18.5 11.9287 18.5H9.92871C9.37871 18.5 8.92871 18.05 8.92871 17.5V15.5C8.92871 14.95 9.37871 14.5 9.92871 14.5ZM14.9287 15.5C14.9287 14.95 15.3787 14.5 15.9287 14.5H17.9287C18.4787 14.5 18.9287 14.95 18.9287 15.5V17.5C18.9287 18.05 18.4787 18.5 17.9287 18.5H15.9287C15.3787 18.5 14.9287 18.05 14.9287 17.5V15.5ZM3.92871 6.5H5.92871C6.47871 6.5 6.92871 6.95 6.92871 7.5V9.5C6.92871 10.05 6.47871 10.5 5.92871 10.5H3.92871C3.37871 10.5 2.92871 10.05 2.92871 9.5V7.5C2.92871 6.95 3.37871 6.5 3.92871 6.5ZM8.92871 7.5C8.92871 6.95 9.37871 6.5 9.92871 6.5H11.9287C12.4787 6.5 12.9287 6.95 12.9287 7.5V9.5C12.9287 10.05 12.4787 10.5 11.9287 10.5H9.92871C9.37871 10.5 8.92871 10.05 8.92871 9.5V7.5ZM15.9287 6.5H17.9287C18.4787 6.5 18.9287 6.95 18.9287 7.5V9.5C18.9287 10.05 18.4787 10.5 17.9287 10.5H15.9287C15.3787 10.5 14.9287 10.05 14.9287 9.5V7.5C14.9287 6.95 15.3787 6.5 15.9287 6.5Z" fill="#6B7280" fill-opacity="0.99"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3780">
                                                <path d="M-0.5 0H23.5V32H-0.5V0Z" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="lg:text-lg md:text-md sm:text-sm text-xs">School of Computing</span>
                                </div>

                                <div className="text-sm text-gray-600 ml-2.5 flex items-center space-x-2">
                                    <svg width="28" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-10 md:w-8 sm:w-6 min-w-4 w-4">
                                        <g clip-path="url(#clip0_542_3787)">
                                            <path d="M9.5 1.5C9.5 0.66875 8.83125 0 8 0C7.16875 0 6.5 0.66875 6.5 1.5V4H4C1.79375 4 0 5.79375 0 8V9V12V28C0 30.2062 1.79375 32 4 32H24C26.2062 32 28 30.2062 28 28V12V9V8C28 5.79375 26.2062 4 24 4H21.5V1.5C21.5 0.66875 20.8312 0 20 0C19.1688 0 18.5 0.66875 18.5 1.5V4H9.5V1.5ZM3 12H25V28C25 28.55 24.55 29 24 29H4C3.45 29 3 28.55 3 28V12Z" fill="#6B7280" fill-opacity="0.99"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3787">
                                                <path d="M0 0H28V32H0V0Z" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <span className="lg:text-lg md:text-md sm:text-sm text-xs">Joined Since September 2023</span>
                                </div>
                            </div>

                            <h3 className="text-lg font-semibold mt-6 hidden lg:block">Contact</h3>
                            <div className="flex justify-center lg:justify-start space-x-4 md:space-x-6 mt-2">
                                <a href="#">
                                    {/*phone*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8">
                                        <path d="M13.9671 14.7553C15.1271 17.1714 16.7084 19.4358 18.7111 21.4384C20.7137 23.441 22.9781 25.0224 25.3941 26.1823C25.602 26.2821 25.7059 26.332 25.8373 26.3703C26.3046 26.5065 26.8784 26.4087 27.2741 26.1254C27.3854 26.0456 27.4807 25.9504 27.6712 25.7598C28.2539 25.1772 28.5452 24.8858 28.8382 24.6954C29.943 23.977 31.3673 23.977 32.4721 24.6954C32.7651 24.8858 33.0564 25.1772 33.6391 25.7598L33.9639 26.0846C34.8496 26.9704 35.2925 27.4132 35.5331 27.8889C36.0115 28.8348 36.0115 29.9519 35.5331 30.8978C35.2925 31.3735 34.8496 31.8164 33.9639 32.7021L33.7012 32.9648C32.8185 33.8475 32.3771 34.2889 31.7771 34.6259C31.1112 35 30.0771 35.2689 29.3134 35.2667C28.6251 35.2646 28.1547 35.1311 27.214 34.8641C22.1583 33.4291 17.3877 30.7217 13.4078 26.7417C9.4278 22.7617 6.72034 17.9911 5.28539 12.9355C5.01838 11.9947 4.88487 11.5244 4.88283 10.8361C4.88055 10.0724 5.14949 9.03826 5.52352 8.37242C5.8606 7.77237 6.30196 7.33102 7.18466 6.44831L7.44739 6.18559C8.33312 5.29985 8.77599 4.85698 9.25163 4.61641C10.1976 4.13796 11.3147 4.13796 12.2606 4.61641C12.7362 4.85698 13.1791 5.29985 14.0648 6.18559L14.3896 6.51037C14.9723 7.09305 15.2636 7.38438 15.4541 7.67735C16.1724 8.78216 16.1724 10.2065 15.4541 11.3113C15.2636 11.6042 14.9723 11.8956 14.3896 12.4783C14.1991 12.6688 14.1038 12.764 14.0241 12.8754C13.7408 13.2711 13.6429 13.8449 13.7791 14.3121C13.8175 14.4436 13.8673 14.5475 13.9671 14.7553Z" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </a>
                                <a href="#">
                                    {/*twitter*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8">
                                        <path d="M30.5441 3.17322H36.1666L23.8832 17.2124L38.3337 36.3165H27.0191L18.157 24.7299L8.0169 36.3165H2.39105L15.5294 21.3L1.66699 3.17322H13.2688L21.2793 13.7638L30.5441 3.17322ZM28.5708 32.9512H31.6863L11.576 6.36177H8.23276L28.5708 32.9512Z" fill="black"/>
                                    </svg>
                                </a>
                                <a href="#">
                                    {/*google*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8 ml">
                                        <g clip-path="url(#clip0_542_3765)">
                                            <path d="M20 16.3635V24.109H30.7636C30.291 26.5999 28.8726 28.7091 26.7454 30.1272L33.2362 35.1636C37.0181 31.6728 39.1999 26.5455 39.1999 20.4546C39.1999 19.0365 39.0727 17.6727 38.8362 16.3637L20 16.3635Z" fill="#4285F4"/>
                                            <path d="M8.79135 23.8066L7.32741 24.9273L2.14551 28.9636C5.43641 35.4908 12.1814 39.9999 19.9995 39.9999C25.3993 39.9999 29.9266 38.2181 33.2357 35.1636L26.7449 30.1272C24.963 31.3272 22.6903 32.0546 19.9995 32.0546C14.7995 32.0546 10.3815 28.5455 8.79953 23.8182L8.79135 23.8066Z" fill="#34A853"/>
                                            <path d="M2.1453 11.0364C0.781737 13.7272 0 16.7636 0 19.9999C0 23.2362 0.781737 26.2726 2.1453 28.9634C2.1453 28.9815 8.79996 23.7998 8.79996 23.7998C8.39996 22.5998 8.16353 21.3271 8.16353 19.9997C8.16353 18.6722 8.39996 17.3996 8.79996 16.1996L2.1453 11.0364Z" fill="#FBBC05"/>
                                            <path d="M19.9999 7.96363C22.9454 7.96363 25.5635 8.98179 27.6544 10.9454L33.3816 5.21825C29.9089 1.98194 25.4 0 19.9999 0C12.1818 0 5.43641 4.4909 2.14551 11.0364L8.79996 16.2C10.3817 11.4727 14.7999 7.96363 19.9999 7.96363Z" fill="#EA4335"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3765">
                                                <rect width="40" height="40" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                                <a href="#">
                                    {/*facebook*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8">
                                        <g clip-path="url(#clip0_542_3766)">
                                            <path d="M40 20C40 8.9544 31.0456 0 20 0C8.9544 0 0 8.9544 0 20C0 29.3792 6.4576 37.2496 15.1688 39.4112V26.112H11.0448V20H15.1688V17.3664C15.1688 10.5592 18.2496 7.404 24.9328 7.404C26.2 7.404 28.3864 7.6528 29.2808 7.9008V13.4408C28.8088 13.3912 27.9888 13.3664 26.9704 13.3664C23.6912 13.3664 22.424 14.6088 22.424 17.8384V20H28.9568L27.8344 26.112H22.424V39.8536C32.3272 38.6576 40.0008 30.2256 40.0008 20H40Z" fill="#0866FF"/>
                                            <path d="M27.8335 26.1121L28.9559 20.0001H22.4231V17.8385C22.4231 14.6089 23.6903 13.3665 26.9695 13.3665C27.9879 13.3665 28.8079 13.3913 29.2799 13.4409V7.90085C28.3855 7.65205 26.1991 7.40405 24.9319 7.40405C18.2487 7.40405 15.1679 10.5593 15.1679 17.3665V20.0001H11.0439V26.1121H15.1679V39.4113C16.7151 39.7953 18.3335 40.0001 19.9991 40.0001C20.8191 40.0001 21.6279 39.9497 22.4223 39.8537V26.1121H27.8327H27.8335Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3766">
                                                <rect width="40" height="40" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                                <a href="#" >
                                    {/*messenger*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8">
                                        <path d="M20 0C8.735 0 0 8.25477 0 19.3995C0 25.2293 2.39 30.2692 6.28 33.7491C6.605 34.0391 6.805 34.4491 6.815 34.889L6.925 38.4489C6.93301 38.7109 7.00524 38.9668 7.13533 39.1943C7.26543 39.4218 7.44941 39.6138 7.67111 39.7536C7.89281 39.8933 8.14544 39.9764 8.40679 39.9957C8.66815 40.0149 8.93023 39.9697 9.17 39.8639L13.14 38.114C13.475 37.964 13.855 37.939 14.21 38.034C16.035 38.5339 17.975 38.8039 20 38.8039C31.265 38.8039 40 30.5492 40 19.4045C40 8.25977 31.265 0 20 0Z" fill="url(#paint0_radial_542_3767)"/>
                                        <path d="M7.9899 25.0743L13.8649 15.7546C14.0859 15.4037 14.3773 15.1024 14.7206 14.8698C15.0639 14.6372 15.4517 14.4783 15.8595 14.4031C16.2673 14.328 16.6863 14.3382 17.09 14.4331C17.4937 14.528 17.8733 14.7056 18.2049 14.9546L22.8799 18.4595C23.0886 18.6157 23.3425 18.6998 23.6032 18.6989C23.8639 18.698 24.1173 18.6122 24.3249 18.4545L30.6349 13.6646C31.4749 13.0246 32.5749 14.0346 32.0149 14.9296L26.1349 24.2443C25.9139 24.5952 25.6225 24.8965 25.2792 25.1291C24.9359 25.3617 24.5481 25.5206 24.1403 25.5958C23.7325 25.6709 23.3135 25.6607 22.9098 25.5658C22.5061 25.4709 22.1265 25.2933 21.7949 25.0443L17.1199 21.5394C16.9112 21.3832 16.6573 21.2991 16.3966 21.3C16.1358 21.3009 15.8825 21.3867 15.6749 21.5444L9.3649 26.3343C8.5249 26.9743 7.4249 25.9693 7.9899 25.0743Z" fill="white"/>
                                        <defs>
                                            <radialGradient id="paint0_radial_542_3767" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.7 39.9989) scale(44 43.9988)">
                                                <stop stop-color="#0099FF"/>
                                                <stop offset="0.6" stop-color="#A033FF"/>
                                                <stop offset="0.9" stop-color="#FF5280"/>
                                                <stop offset="1" stop-color="#FF7061"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </a>
                                <a href="#" >
                                    {/*telegram*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="lg:w-14 md:w-12 sm:w-10 w-8">
                                        <g clip-path="url(#clip0_542_3768)">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_542_3768)"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.05271 19.7889C14.8831 17.2487 18.771 15.574 20.7163 14.7649C26.2705 12.4547 27.4246 12.0534 28.1768 12.0402C28.3423 12.0373 28.7122 12.0783 28.9518 12.2727C29.1542 12.4369 29.2098 12.6587 29.2365 12.8143C29.2631 12.97 29.2963 13.3246 29.2699 13.6017C28.9689 16.7641 27.6666 24.4386 27.004 27.9806C26.7237 29.4794 26.1716 29.9819 25.6372 30.0311C24.4758 30.138 23.5938 29.2635 22.4689 28.5261C20.7086 27.3723 19.7142 26.654 18.0056 25.528C16.0309 24.2268 17.311 23.5116 18.4364 22.3428C18.7309 22.0369 23.8482 17.3823 23.9472 16.96C23.9596 16.9072 23.9711 16.7104 23.8542 16.6064C23.7372 16.5025 23.5646 16.5381 23.4401 16.5663C23.2635 16.6064 20.4515 18.465 15.004 22.1423C14.2058 22.6904 13.4828 22.9574 12.835 22.9434C12.1209 22.928 10.7473 22.5397 9.72611 22.2077C8.47361 21.8006 7.47815 21.5853 7.56483 20.8939C7.60998 20.5337 8.10594 20.1654 9.05271 19.7889Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_542_3768" x1="20" y1="0" x2="20" y2="39.7033" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2AABEE"/>
                                                <stop offset="1" stop-color="#229ED9"/>
                                            </linearGradient>
                                            <clipPath id="clip0_542_3768">
                                                <rect width="40" height="40" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>

                            <div className="hidden lg:flex justify-center lg:justify-start gap-4 lg:gap-10 mt-2 ml-2">
                                <a href="#">
                                    {/*facebook*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_542_3766)">
                                            <path d="M40 20C40 8.9544 31.0456 0 20 0C8.9544 0 0 8.9544 0 20C0 29.3792 6.4576 37.2496 15.1688 39.4112V26.112H11.0448V20H15.1688V17.3664C15.1688 10.5592 18.2496 7.404 24.9328 7.404C26.2 7.404 28.3864 7.6528 29.2808 7.9008V13.4408C28.8088 13.3912 27.9888 13.3664 26.9704 13.3664C23.6912 13.3664 22.424 14.6088 22.424 17.8384V20H28.9568L27.8344 26.112H22.424V39.8536C32.3272 38.6576 40.0008 30.2256 40.0008 20H40Z" fill="#0866FF"/>
                                            <path d="M27.8335 26.1121L28.9559 20.0001H22.4231V17.8385C22.4231 14.6089 23.6903 13.3665 26.9695 13.3665C27.9879 13.3665 28.8079 13.3913 29.2799 13.4409V7.90085C28.3855 7.65205 26.1991 7.40405 24.9319 7.40405C18.2487 7.40405 15.1679 10.5593 15.1679 17.3665V20.0001H11.0439V26.1121H15.1679V39.4113C16.7151 39.7953 18.3335 40.0001 19.9991 40.0001C20.8191 40.0001 21.6279 39.9497 22.4223 39.8537V26.1121H27.8327H27.8335Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_542_3766">
                                                <rect width="40" height="40" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>

                                <a href="#">
                                    {/*messenger*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 0C8.735 0 0 8.25477 0 19.3995C0 25.2293 2.39 30.2692 6.28 33.7491C6.605 34.0391 6.805 34.4491 6.815 34.889L6.925 38.4489C6.93301 38.7109 7.00524 38.9668 7.13533 39.1943C7.26543 39.4218 7.44941 39.6138 7.67111 39.7536C7.89281 39.8933 8.14544 39.9764 8.40679 39.9957C8.66815 40.0149 8.93023 39.9697 9.17 39.8639L13.14 38.114C13.475 37.964 13.855 37.939 14.21 38.034C16.035 38.5339 17.975 38.8039 20 38.8039C31.265 38.8039 40 30.5492 40 19.4045C40 8.25977 31.265 0 20 0Z" fill="url(#paint0_radial_542_3767)"/>
                                        <path d="M7.9899 25.0743L13.8649 15.7546C14.0859 15.4037 14.3773 15.1024 14.7206 14.8698C15.0639 14.6372 15.4517 14.4783 15.8595 14.4031C16.2673 14.328 16.6863 14.3382 17.09 14.4331C17.4937 14.528 17.8733 14.7056 18.2049 14.9546L22.8799 18.4595C23.0886 18.6157 23.3425 18.6998 23.6032 18.6989C23.8639 18.698 24.1173 18.6122 24.3249 18.4545L30.6349 13.6646C31.4749 13.0246 32.5749 14.0346 32.0149 14.9296L26.1349 24.2443C25.9139 24.5952 25.6225 24.8965 25.2792 25.1291C24.9359 25.3617 24.5481 25.5206 24.1403 25.5958C23.7325 25.6709 23.3135 25.6607 22.9098 25.5658C22.5061 25.4709 22.1265 25.2933 21.7949 25.0443L17.1199 21.5394C16.9112 21.3832 16.6573 21.2991 16.3966 21.3C16.1358 21.3009 15.8825 21.3867 15.6749 21.5444L9.3649 26.3343C8.5249 26.9743 7.4249 25.9693 7.9899 25.0743Z" fill="white"/>
                                        <defs>
                                            <radialGradient id="paint0_radial_542_3767" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(6.7 39.9989) scale(44 43.9988)">
                                                <stop stop-color="#0099FF"/>
                                                <stop offset="0.6" stop-color="#A033FF"/>
                                                <stop offset="0.9" stop-color="#FF5280"/>
                                                <stop offset="1" stop-color="#FF7061"/>
                                            </radialGradient>
                                        </defs>
                                    </svg>
                                </a>

                                <a href="#">
                                    {/*telegram*/}
                                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_542_3768)">
                                            <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20C0 31.0457 8.95431 40 20 40Z" fill="url(#paint0_linear_542_3768)"/>
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.05271 19.7889C14.8831 17.2487 18.771 15.574 20.7163 14.7649C26.2705 12.4547 27.4246 12.0534 28.1768 12.0402C28.3423 12.0373 28.7122 12.0783 28.9518 12.2727C29.1542 12.4369 29.2098 12.6587 29.2365 12.8143C29.2631 12.97 29.2963 13.3246 29.2699 13.6017C28.9689 16.7641 27.6666 24.4386 27.004 27.9806C26.7237 29.4794 26.1716 29.9819 25.6372 30.0311C24.4758 30.138 23.5938 29.2635 22.4689 28.5261C20.7086 27.3723 19.7142 26.654 18.0056 25.528C16.0309 24.2268 17.311 23.5116 18.4364 22.3428C18.7309 22.0369 23.8482 17.3823 23.9472 16.96C23.9596 16.9072 23.9711 16.7104 23.8542 16.6064C23.7372 16.5025 23.5646 16.5381 23.4401 16.5663C23.2635 16.6064 20.4515 18.465 15.004 22.1423C14.2058 22.6904 13.4828 22.9574 12.835 22.9434C12.1209 22.928 10.7473 22.5397 9.72611 22.2077C8.47361 21.8006 7.47815 21.5853 7.56483 20.8939C7.60998 20.5337 8.10594 20.1654 9.05271 19.7889Z" fill="white"/>
                                        </g>
                                        <defs>
                                            <linearGradient id="paint0_linear_542_3768" x1="20" y1="0" x2="20" y2="39.7033" gradientUnits="userSpaceOnUse">
                                                <stop stop-color="#2AABEE"/>
                                                <stop offset="1" stop-color="#229ED9"/>
                                            </linearGradient>
                                            <clipPath id="clip0_542_3768">
                                                <rect width="40" height="40" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
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
