"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuOptions from "../homepage/edit";

const colorBoxs = {
    Teacher: 'bg-blue-500',
    Student: 'bg-green-500',
    Graduate: 'bg-red-500',
     default: 'bg-gray-50'
};

const item = {
  image: "/default_avatar.svg",
  name: "Celine Celine",
  course: "Computer Science",
  year: "Year 3",
  role: "Student",
  likes: 10,
  dislikes: 2
};

const CommentSidebar = () => {
    const router = useRouter();
    const [showOption, setShowOption] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isRepliesVisible, setIsRepliesVisible] = useState(true);

    // Comments data structure with main comments and their replies
    const [comments, setComments] = useState([
        {
        id: 1,
        author: "Zhang Linghe",
        role: "Teacher",
        time: "2h ago",
        content:
            "Excellent work on the composition! The use of color really brings out the main subject.",
        department: "ITE",
        isMainComment: true,
        replies: [
            {
            id: 11,
            author: "Pica Chu",
            role: "Student",
            time: "1h ago",
            content:
                "Thank you! I spent a lot of time working on the color balance.",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 12,
            author: "Sarah Johnson",
            role: "Teacher",
            time: "30m ago",
            content:
                "I agree with Zhang. The composition follows the rule of thirds perfectly!",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 13,
            author: "Pica Chu",
            role: "Student",
            time: "1h ago",
            content:
                "Thank you! I spent a lot of time working on the color balance.",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 14,
            author: "Sarah Johnson",
            role: "Teacher",
            time: "30m ago",
            content:
                "I agree with Zhang. The composition follows the rule of thirds perfectly!",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 15,
            author: "Pica Chu",
            role: "Student",
            time: "1h ago",
            content:
                "Thank you! I spent a lot of time working on the color balance.",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 16,
            author: "Sarah Johnson",
            role: "Teacher",
            time: "30m ago",
            content:
                "I agree with Zhang. The composition follows the rule of thirds perfectly!",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            },
            {
            id: 17,
            author: "Pica Chu",
            role: "Student",
            time: "1h ago",
            content:
                "Thank you! I spent a lot of time working on the color balance.",
            department: "ITE",
            isMainComment: false,
            parentId: 1,
            }
        ],
        },
        {
        id: 2,
        author: "Mike Chen",
        role: "Graduate",
        time: "1h ago",
        content:
            "I love how you've captured the lighting in this piece! The way the shadows fall creates such depth and dimension.",
        isMainComment: true,
        department: "ITE",
        replies: [
            {
            id: 21,
            author: "Alex Wong",
            role: "Student",
            time: "45m ago",
            content: "Amazing work! 🎨",
            isMainComment: false,
            parentId: 2,
            },
        ],
        },
    ]);

    // State to track which comment's replies are visible
    const [visibleReplies, setVisibleReplies] = useState({});

    const toggleReplies = () => {
        setIsRepliesVisible(!isRepliesVisible);
    };

    // Toggle replies for a specific comment
    const toggleCommentReplies = (commentId) => {
        setVisibleReplies((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
        }));
    };

    // Helper function to add a new main comment
    const addMainComment = (newComment) => {
        const comment = {
        ...newComment,
        id: Date.now(), // Simple ID generation
        isMainComment: true,
        replies: [],
        };
        setComments((prev) => [...prev, comment]);
    };

    // Helper function to add a reply to a specific comment
    const addReply = (parentCommentId, newReply) => {
        const reply = {
        ...newReply,
        id: Date.now(), // Simple ID generation
        isMainComment: false,
        parentId: parentCommentId,
        };

        setComments((prev) =>
        prev.map((comment) =>
            comment.id === parentCommentId
            ? { ...comment, replies: [...comment.replies, reply] }
            : comment
        )
        );
    };

    // Helper function to check if a comment is a main comment or reply
    const isMainComment = (comment) => {
        return comment.isMainComment === true;
    };

    // Helper function to get all replies for a specific comment
    const getRepliesForComment = (commentId) => {
        const comment = comments.find((c) => c.id === commentId);
        return comment ? comment.replies : [];
    };

    const getRoleStyle = (role) => {
        const styles = {
        Student: "bg-[#DBEAFE] text-[#2563EB]",
        Teacher: "bg-[#9A4AC2] text-white",
        Graduate: "bg-[#2ECC71] text-white",
        };
        return styles[role] || "bg-gray-100 text-gray-800";
    };

    const getBgStyle = (role) => {
        const styles = {
            Student: "bg-[#EFF6FF]",
            Teacher: "bg-[#E2D6E8]",
            Graduate: "bg-[#D8F6E5]",
        };
        return styles[role] || "bg-gray-100";
    };

  return (
    <div className="w-1/3 h-screen bg-white p-4 border-l shadow-lg border-gray-300 flex flex-col">
        <header>
            <title>S3TUDY | View Post</title>
        </header>

        {/* Back Button */}
        <div className="flex justify-end mb-8"> 
            <button onClick={() => router.back()} className="text-[#1E3A8A]">
                <img src="/favicon.ico" alt="S3TUDY" className="w-[55px] h-[55px]" />
                <p className="-ml-[145px] -mt-[42px] hover:cursor-pointer text-[20px]">
                    ← Back
                </p>
            </button>
        </div>

        <div className="flex-grow overflow-y-auto p-4 pt-0">
            {/* Info */}
            <div className="mb-4">
                <div className="flex items-center gap-x-3">
                    <div className="w-15 h-15 border-1 border-black-50 rounded-full overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        </div>

                        <div className="flex-1">
                        <p className="text-[20px] text-gray-500 font-bold">{item.name}</p>
                        <p className="text-[15px] text-gray-500">
                            {item.course} • {item.year || "N/A • N/A"}
                        </p>
                    </div>
                </div>

                {/* follow */}
                <div className="ml-100">
                    <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`flex items-center justify-center px-5 py-2 -ml-[60px] -mt-[50px] rounded-full text-white font-medium transition
                            ${
                                isFollowing
                                ? "bg-gray-300 text-gray-800"
                                : "bg-blue-500 hover:bg-blue-600"
                            }`}
                        >
                        {isFollowing ? "Following" : "+ Follow"}
                    </button>

                    <div className="position-absolute -mt-[35px] mb-[60px]">
                        {/* more option */}
                        <button
                            className="ml-22 hover:cursor-pointer "
                            onClick={() => setShowOption(!showOption)}
                        >
                            <svg
                                width="24"
                                height="8"
                                viewBox="0 0 14 4"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                >
                                <path
                                    d="M0.25 2C0.25 1.53587 0.434374 1.09075 0.762563 0.762563C1.09075 0.434375 1.53587 0.25 2 0.25C2.46413 0.25 2.90925 0.434375 3.23744 0.762563C3.56563 1.09075 3.75 1.53587 3.75 2C3.75 2.46413 3.56563 2.90925 3.23744 3.23744C2.90925 3.56563 2.46413 3.75 2 3.75C1.53587 3.75 1.09075 3.56563 0.762563 3.23744C0.434374 2.90925 0.25 2.46413 0.25 2ZM5.25 2C5.25 1.53587 5.43437 1.09075 5.76256 0.762563C6.09075 0.434375 6.53587 0.25 7 0.25C7.46413 0.25 7.90925 0.434375 8.23744 0.762563C8.56563 1.09075 8.75 1.53587 8.75 2C8.75 2.46413 8.56563 2.90925 8.23744 3.23744C7.90925 3.56563 7.46413 3.75 7 3.75C6.53587 3.75 6.09075 3.56563 5.76256 3.23744C5.43437 2.90925 5.25 2.46413 5.25 2ZM12 0.25C12.4641 0.25 12.9092 0.434375 13.2374 0.762563C13.5656 1.09075 13.75 1.53587 13.75 2C13.75 2.46413 13.5656 2.90925 13.2374 3.23744C12.9092 3.56563 12.4641 3.75 12 3.75C11.5359 3.75 11.0908 3.56563 10.7626 3.23744C10.4344 2.90925 10.25 2.46413 10.25 2C10.25 1.53587 10.4344 1.09075 10.7626 0.762563C11.0908 0.434375 11.5359 0.25 12 0.25Z"
                                    fill="black"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="relative right-[400px] z-999">
                        {showOption && <MenuOptions />}
                    </div>
                </div>

                <textarea
                    className="w-full h-[200px] border-2 border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 opacity-50 font-light text-[20px]"
                    placeholder="Write your caption here..."
                />
            
            </div>

            {/* profile */}
            <div className="flex items-center ">
                <div className="w-13 h-13 mr-3 border-1 border-gray-300 rounded-full">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="flex-1">
                    <p className="text-[20px] text-gray-500 font-bold">{item.name}</p>
                </div>
            </div>

            {/* Add a comment */}
            <div className="border-2 border-solid bg-white rounded-[15px] mt-4 p-2 shadow-2xs overflow-x-hidden mb-6">
                {/* input */}
                <div className="flex items-center w-full">
                    <input
                        className="opacity-50 font-light text-[20px] bg-transparent border-none outline-none w-full"
                        placeholder="Add a comment..."
                    />
                </div>

                {/* upload*/}
                <div className="ml-[450px] mt-[30px]">
                    <button className="hover:cursor-pointer">
                        <svg
                            width="50"
                            height="29"
                            viewBox="0 0 23 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g clipPath="url(#clip0_1665_405)">
                                <path
                                    d="M10.5014 9.99979H5.0014M4.91675 10.2913L2.58183 17.266C2.39839 17.8139 2.30668 18.0879 2.3725 18.2566C2.42966 18.4031 2.55242 18.5142 2.7039 18.5565C2.87834 18.6052 3.1418 18.4866 3.66874 18.2495L20.3802 10.7293C20.8945 10.4979 21.1517 10.3822 21.2312 10.2214C21.3002 10.0817 21.3002 9.91785 21.2312 9.77819C21.1517 9.61743 20.8945 9.5017 20.3802 9.27026L3.66291 1.74751C3.13757 1.51111 2.87489 1.39291 2.70063 1.4414C2.54929 1.48351 2.42654 1.59429 2.36918 1.74054C2.30314 1.90893 2.39388 2.18231 2.57535 2.72906L4.9174 9.78532C4.94857 9.87923 4.96415 9.92618 4.9703 9.9742C4.97576 10.0168 4.97571 10.0599 4.97014 10.1025C4.96386 10.1506 4.94816 10.1975 4.91675 10.2913Z"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_1665_405">
                                    <rect width="23" height="21" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </button>
                </div>

                {/* Attach */}
                <div className="w-full -mt-[35px]">
                    <button className="hover:cursor-pointer">
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 19 22"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.5 1H13.2C14.8802 1 15.7202 1 16.362 1.32698C16.9265 1.6146 17.3854 2.07354 17.673 2.63803C18 3.27976 18 4.11984 18 5.8V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V15.5M14 12H9.5M14 8H10.5M14 16H6M4 9V3.5C4 2.67157 4.67157 2 5.5 2C6.32843 2 7 2.67157 7 3.5V9C7 10.6569 5.65685 12 4 12C2.34315 12 1 10.6569 1 9V5"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <svg
                            className="ml-9 -mt-[29px]"
                            width="30"
                            height="33"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.2 21H6.93137C6.32555 21 6.02265 21 5.88238 20.8802C5.76068 20.7763 5.69609 20.6203 5.70865 20.4608C5.72312 20.2769 5.93731 20.0627 6.36569 19.6343L14.8686 11.1314C15.2646 10.7354 15.4627 10.5373 15.691 10.4632C15.8918 10.3979 16.1082 10.3979 16.309 10.4632C16.5373 10.5373 16.7354 10.7354 17.1314 11.1314L21 15V16.2M16.2 21C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2M16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V7.8C3 6.11984 3 5.27976 3.32698 4.63803C3.6146 4.07354 4.07354 3.6146 4.63803 3.32698C5.27976 3 6.11984 3 7.8 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11984 21 7.8V16.2M10.5 8.5C10.5 9.60457 9.60457 10.5 8.5 10.5C7.39543 10.5 6.5 9.60457 6.5 8.5C6.5 7.39543 7.39543 6.5 8.5 6.5C9.60457 6.5 10.5 7.39543 10.5 8.5Z"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Comments Session */}
            <div className="space-y-4 pb-10">
            {/* filter */}
            <div className=" flex items-center border-2 border-[#e8d3d3] text-[20px] gap-x-3 bg-[#FFE1E1] rounded-[10px] px-4 py-1 w-[100px] ml-[460px] hover:cursor-pointer">
                <p>Filter</p>
                <span>
                <svg
                    className="mt-[3px]"
                    width="10"
                    height="7"
                    viewBox="0 0 8 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    d="M7.5 3.25L4 0.75L0.5 3.25"
                    stroke="#1E1E1E"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    />
                </svg>
                </span>
            </div>

            {/* Dynamic Comments Section */}
            {comments.map((comment) => (
                <div key={comment.id} className="mb-6">
                {/* Main Comment */}
                <div className={`border-b-2 border-gray-200 p-4 mb-1 rounded-lg border hover:shadow-md transition-shadow duration-200 ${getBgStyle(comment.role)}`}>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center flex-wrap gap-2">

                            <div className="w-10 h-10 mr-3 border-1 border-gray-300 rounded-full">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>                            

                            <span className="font-bold text-gray-800">
                                {comment.author}
                            </span>

                            <span
                                className={`text-[15px] px-2 py-1 rounded-full ${getRoleStyle(
                                    comment.role
                                )}`}
                            >
                                {comment.role}
                            </span>

                            <div>
                                <span className="text-[16px] ml-20 text-gray-500">
                                    Department {comment.department}
                                </span>
                            </div>
                        </div>
                    </div>

                    <p className="mt-2 text-gray-700">{comment.content}</p>

                    {/* Main Comment Actions */}
                   <div className="flex items-center gap-6 mt-3 pt-2 border-gray-200">
                        {/* Likes button */}
                        <button className="flex items-center gap-2 hover:fill-blue-600 transition-colors">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 11L11 7M11 7L7 11M11 7V15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className="inline-flex items-center">
                                {item.likes}
                            </span>
                        </button>

                        {/* Reply button — pushed to the right */}
                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 11L11 15M11 15L15 11M11 15V7M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Reply</span>
                        </button>

                        <span className="text-sm text-gray-500">
                            {comment.time}
                        </span>
                    </div>

                </div>

                {/* Toggle Replies Button */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-12 mb-4 pb-4 border-b border-gray-100">
                        <button
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200"
                            onClick={() => toggleCommentReplies(comment.id)}
                        >
                            <span className="text-lg leading-none">
                                {visibleReplies[comment.id] ? "-" : "-"}
                            </span>

                            {visibleReplies[comment.id]
                            ? "Hide Replies"
                            : "View Replies"}

                            {!visibleReplies[comment.id] && (
                                <span className="text-xs text-gray-400 bg-yellow-100 px-2 py-1 rounded-full">
                                    {comment.replies.length}
                                </span>
                            )}
                        </button>
                    </div>
                )}

                {/* Replies */}
                {comment.replies &&
                    comment.replies.length > 0 && visibleReplies[comment.id] && (
                            <div className="ml-8 mt-4">
                                {/* Main vertical line connecting all replies */}
                                <div className="relative">
                                    <div className="space-y-6">
                                        {comment.replies.map((reply, index) => (
                                            <div key={reply.id} className="relative">                                    
                                                {index === 0 && (                                                
                                                    <div
                                                        className="absolute -left-4 -top-[56px] w-0.5 bg-gray-300"
                                                        style={{ height: "130px" }}
                                                    />
                                                )}

                                                {index === 1 && (
                                                    <div
                                                        className="absolute -left-4 -top-36 w-0.5 bg-gray-300"
                                                        style={{ height: "170px" }}
                                                    />
                                                )}

                                                {index > 1 && (                                       
                                                    <div
                                                        className="absolute -left-4 -top-44 w-0.5 bg-gray-300"
                                                        style={{ height: "250px" }}
                                                    />
                                                )}

                                                {/* Horizontal connector */}
                                                <div className="absolute -left-4 top-[72px] w-7 h-6 border-l-2 border-b-2 border-gray-300 rounded-bl-lg"></div>


                                                <div className={`ml-3 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200 ${getBgStyle(reply.role)}`}>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex items-center flex-wrap gap-2">

                                                             <div className="w-10 h-10 mr-3 border-1 border-gray-300 rounded-full">
                                                                <img
                                                                    src={item.image}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>                    
                            
                                                            <span className="font-bold text-gray-800">
                                                                {reply.author}
                                                            </span>

                                                            <span
                                                                    className={`text-[15px] px-2 py-1 rounded-full ${getRoleStyle(
                                                                    reply.role
                                                                )}`}
                                                            >
                                                                {reply.role}
                                                            </span>

                                                            <div>
                                                                <span className="text-[16px] ml-20 text-gray-500">
                                                                    Department {comment.department}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                                        {reply.content}
                                                    </p>

                                                    {/* Reply actions */}
                                                    <div className="flex items-center gap-6 mt-3 pt-2 border-gray-200">
                                                        {/* Likes button */}
                                                        <button className="flex items-center gap-2 hover:fill-blue-600 transition-colors">
                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M15 11L11 7M11 7L7 11M11 7V15M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                            <span className="inline-flex items-center">
                                                                {item.likes}
                                                            </span>
                                                        </button>

                                                        {/* Reply button — pushed to the right */}
                                                        <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors">
                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M7 11L11 15M11 15L15 11M11 15V7M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                            </svg>
                                                            <span>Reply</span>
                                                        </button>

                                                        <span className="text-sm text-gray-500">
                                                            {comment.time}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}

            </div>
        </div>
    </div>
  );
};

export default CommentSidebar;
