import { useState } from "react";
import MenuOptions from "./edit"
import { useRouter } from 'next/navigation';
export default function Content({items = {}, propertyNames = {}}) {
    const {
        username = 'name',
        profile = "img",
        year = 'year',
        role = 'role',
        type = 'type',
        date = 'date',  
        time = 'time',  
        caption = 'caption',  
        file = 'file',
        like = 'like',
        unlike = 'unlike',
        comment = 'comment',
    } = propertyNames;

    const isProfessor = (items[role] || "").toLowerCase() === "professor";
    const roleStyle = isProfessor ? "text-white bg-purple-700 w-[110px] ml-[25px]" : "text-blue-700 bg-blue-200 w-[100px]";
    const postTypeStyle = isProfessor ? "text-orange-400 bg-[#f4c6c3] w-[100px]" : "text-green-700 bg-green-200 w-[75px]";

    const [showOption, setShowOption] = useState(false);

    const Router = useRouter();
    const handleClickedComment = () => { 
        Router.push('/viewCommentPost');
    }

    const [showFullCaption, setShowFullCaption] = useState(false);


    return (
        <div className="bg-white border-1 shadow-[20px] border-solid ml-8 mb-7 mt-5 rounded-2xl overflow-hidden">
            {/* profile */}
            <div className="w-full h-[80px] p-3 flex items-center gap-x-3">
                <img 
                    src={items[profile]} 
                    alt="profile" 
                    className="w-15 h-15 border-1 border-solid rounded-full object-cover object-center hover:cursor-pointer"
                    onClick={() => {Router.push('/profileacc')}}
                /> 
                <div className="w-[30%]">
                    <p className="block">{items[username]}</p>
                    <p className="block text-gray-600">{items[year]}</p>
                </div>
                <div className="position-absolute w-[70%] mt-[5px]">
                    <div className="-ml-[105px]">
                        <p className={`px-5 py-2 rounded-[20px] ${roleStyle}`}>{isProfessor ? "Professor" : "Student"}</p>
                    </div>
                    <div className="ml-[500px] -mt-[40px] ">
                        <p className={`px-5 py-2 rounded-[20px] ${postTypeStyle}`}>{items[type]}</p>
                    </div>
                </div>
            </div>

            {/* content */}
            <div className="w-full h-[620px] overflow-hidden ">
                <div className="position-absolute w-[95%] h-[95%] ml-6 mt-4">
                    {items[file] ? 
                        (
                            <img
                                src={items[file]}
                                alt="Post media"
                                className="w-full h-full object-contain rounded-xl hover:cursor-pointer"
                                onClick = {() => window.open(items[file], '_blank')}
                            />
                        ) : 
                        (
                            <div className="position-absolute w-[95%] h-[95%] ml-6 mt-4 bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                                No media uploaded
                            </div>
                        )
                    }
                </div>
            </div>

            {/* description */}
            <div className="">
                <div className="ml-3 pt-1">
                    <p>{items[date]} • {items[time]}</p>
                </div>
                <div className="p-2 w-[80%] ml-5 mt-2">
                    <p className=" ml-2 text-justify">
                        {showFullCaption ? items[caption] : `${items[caption]?.slice(0, 100)}`}
                        {items[caption]?.length > 100 && (
                            <span
                            className="text-blue-500 cursor-pointer hover:underline"
                            onClick={() => setShowFullCaption(!showFullCaption)}
                            >
                            {showFullCaption ? " " : "... see more"}
                            </span>
                        )}
                    </p>
                </div>

                {/* like comment */}
                <div className="mt-3 mb-5">
                    {/* like */}
                    <button className="ml-4">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 11L11 7M11 7L7 11M11 7V15M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11Z" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="-mt-[22px] ml-7">{items[like]}</p>
                    </button>

                    {/* unlike */}
                    <button className="ml-6">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 11L11 15M11 15L15 11M11 15V7M1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p className="-mt-[22px] ml-7">{items[unlike]}</p>
                    </button>

                    {/* comment */}
                    <button className="ml-8 hover:cursor-pointer" onClick = {handleClickedComment}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.83197 16.0366C5.33574 15.617 5.98792 15.5099 6.57371 15.7509C7.60861 16.1794 8.76847 16.4249 10.0025 16.4249C14.8724 16.4249 18.1255 12.832 18.1255 9.28364C18.1255 5.73533 14.8724 2.14238 10.0025 2.14238C5.13267 2.14238 1.87959 5.73533 1.87959 9.28364C1.87959 10.7119 2.36384 12.0866 3.27377 13.2649C3.60962 13.6978 3.77364 14.2691 3.73459 14.8494C3.67991 15.6572 3.51199 16.3981 3.29329 17.0542C3.95719 16.7016 4.50783 16.3089 4.83197 16.0411V16.0366ZM0.832979 17.8487C0.903274 17.7282 0.969663 17.6077 1.03215 17.4872C1.42267 16.7463 1.79367 15.7733 1.86787 14.6798C0.696295 13.1578 0.00506337 11.2966 0.00506337 9.28364C0.00506337 4.15532 4.48049 0 10.0025 0C15.5246 0 20 4.15532 20 9.28364C20 14.412 15.5246 18.5673 10.0025 18.5673C8.55368 18.5673 7.17903 18.2816 5.93716 17.7684C5.47243 18.1567 4.71481 18.6878 3.8166 19.1341C3.2269 19.4287 2.5552 19.6965 1.86006 19.8527C1.82882 19.8616 1.79758 19.8661 1.76634 19.875C1.5945 19.9107 1.42658 19.942 1.25084 19.9598C1.24303 19.9598 1.23132 19.9643 1.2235 19.9643C1.02434 19.9866 0.825168 20 0.626 20C0.372158 20 0.145653 19.8259 0.0480212 19.5581C-0.0496103 19.2903 0.00506336 18.9868 0.1808 18.7815C0.340916 18.5941 0.485411 18.3932 0.622095 18.179C0.688484 18.0763 0.750968 17.9737 0.809547 17.871C0.813452 17.8621 0.817358 17.8576 0.821263 17.8487H0.832979Z" fill="#6B7280"/>
                        </svg>
                        <p className="-mt-[22px] ml-6.5">{items[comment]}</p>
                    </button>


                    {/* more option */}
                    <button className="ml-22 hover:cursor-pointer" onClick={() => setShowOption(!showOption)}>
                        <svg width="24" height="8" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 1.75C0 1.28587 0.184374 0.840752 0.512563 0.512563C0.840752 0.184375 1.28587 0 1.75 0C2.21413 0 2.65925 0.184375 2.98744 0.512563C3.31563 0.840752 3.5 1.28587 3.5 1.75C3.5 2.21413 3.31563 2.65925 2.98744 2.98744C2.65925 3.31563 2.21413 3.5 1.75 3.5C1.28587 3.5 0.840752 3.31563 0.512563 2.98744C0.184374 2.65925 0 2.21413 0 1.75ZM5 1.75C5 1.28587 5.18437 0.840752 5.51256 0.512563C5.84075 0.184375 6.28587 0 6.75 0C7.21413 0 7.65925 0.184375 7.98744 0.512563C8.31563 0.840752 8.5 1.28587 8.5 1.75C8.5 2.21413 8.31563 2.65925 7.98744 2.98744C7.65925 3.31563 7.21413 3.5 6.75 3.5C6.28587 3.5 5.84075 3.31563 5.51256 2.98744C5.18437 2.65925 5 2.21413 5 1.75ZM11.75 0C12.2141 0 12.6592 0.184375 12.9874 0.512563C13.3156 0.840752 13.5 1.28587 13.5 1.75C13.5 2.21413 13.3156 2.65925 12.9874 2.98744C12.6592 3.31563 12.2141 3.5 11.75 3.5C11.2859 3.5 10.8408 3.31563 10.5126 2.98744C10.1844 2.65925 10 2.21413 10 1.75C10 1.28587 10.1844 0.840752 10.5126 0.512563C10.8408 0.184375 11.2859 0 11.75 0Z" fill="#9CA3AF"/>
                        </svg>
                    </button>

                    <div >
                        {showOption && (
                            <MenuOptions/>
                        )}
                    </div>

                </div>
            </div>    
        </div>
    );
}
