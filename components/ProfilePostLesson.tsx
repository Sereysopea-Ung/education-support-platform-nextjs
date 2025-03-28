import React from "react";

interface PostProps {
    username: string;
    date: string;
    time: string;
    content: string;
    comments: number;
    likes: number;
    type: string;
    img: string;
}

const UserPostL: React.FC<PostProps> = ({ username, date, time, content, comments, likes, type ,img}) => {
    return (
        <div className="bg-white p-4 shadow rounded-lg">
            <div className="flex items-center gap-3">
                <img src="/Default_pfp.jpg" alt="User" className="w-10 h-10 rounded-full" />
                <div className="flex items-center space-x-2">
                    <h2 className="font-normal">{username}</h2>
                    <p className="text-xs text-gray-500">{date} • {time}</p>
                </div>
                    <span className="ml-auto text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">{type}</span>
            </div>

            {/* Use the img prop as the src attribute value */}
            {img && <img src={img} alt="Post" className="mt-3 w-full rounded-lg" />}


            <p className="text-gray-700 mt-3">{content}</p>
            <div className="flex justify-items-start mt-3 text-gray-500 text-sm">
                <svg width="29" height="16" viewBox="0 0 29 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M29 16H-3V0H29V16Z" stroke="#E5E7EB"/>
                    <path d="M13.8 8L11 5.2M11 5.2L8.2 8M11 5.2V10.8M4 8C4 4.13401 7.13401 1 11 1C14.866 1 18 4.13401 18 8C18 11.866 14.866 15 11 15C7.13401 15 4 11.866 4 8Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="mr-3">{comments}</span>

                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.8385 5.85082H7.52551M4.8385 8.42435H9.54077M7.86139 13.5714C11.0149 13.5714 13.5713 10.7732 13.5713 7.32141C13.5713 3.86963 11.0149 1.07141 7.86139 1.07141C4.70789 1.07141 2.15148 3.86963 2.15148 7.32141C2.15148 8.01994 2.25618 8.6917 2.44932 9.31892C2.522 9.55495 2.55834 9.67297 2.5649 9.76364C2.57137 9.85318 2.56648 9.91595 2.54624 10.003C2.52575 10.0911 2.48051 10.1828 2.39002 10.3661L1.29126 12.5923C1.13453 12.9098 1.05617 13.0686 1.07371 13.1911C1.08898 13.2978 1.14637 13.3918 1.23063 13.4481C1.32736 13.5126 1.49135 13.4941 1.81933 13.457L5.25939 13.0677C5.36357 13.056 5.41566 13.0501 5.46313 13.0521C5.50983 13.054 5.54279 13.0588 5.58833 13.0703C5.63463 13.082 5.69285 13.1065 5.80928 13.1556C6.44614 13.4242 7.13806 13.5714 7.86139 13.5714Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span className="ml-1">{likes}</span>
            </div>
        </div>
    );

};

export default UserPostL;
