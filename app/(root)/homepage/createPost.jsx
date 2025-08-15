import {useState, useEffect} from 'react'
import ModalLayout from './modalLayout';
import QuestionPanel from './questionPanel';
import LessonPanel from './lessonPanel';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChalkboardUser, faCheckCircle, faCircleDown, faCircleUp, faComment} from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/util/date"


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default function CreatePost({items = {}, propertyNames = {}}) {

    const [profilePic, setProfilePic] = useState(null);
    const { data: session} = useSession();
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');

    useEffect(() => {
    if (session?.user?.email) {
        client
        .fetch(`*[_type == "user" && email == $email][0]{ profile_pic, major, year }`, {
            email: session.user.email,
        })
        .then((user) => {
            if (user?.profile_pic) {
            setProfilePic(urlFor(user.profile_pic).width(50).height(50).url());
            }
            if (user?.major) setMajor(user.major);
            if (user?.year) setYear(user.year);
        });
    }
    }, [session]);

    const [showPostPanel, setShowPostPanel] = useState(false);
    const togglePostPanel = () => setShowPostPanel(!showPostPanel);
    const router = useRouter();

    // Q&A Lesson Choice
    const [postType, setPostType] = useState("question");
    const postTypes = ["question", "lesson"];

    return (
        <div className="position-absolute overflow-hidden">
            <div className="border-2 border-solid bg-white ml-8 border-blue-100 rounded-[15px] mt-4 p-5 shadow-2xs">
                {/* input */}
                <div className="flex items-center w-full">
                    {profilePic && (
                    <Image
                        src={profilePic}
                        alt={session.user.name || 'User profile'}
                        width={50}
                        height={50}
                        className="rounded-full border-2"
                    />
                    )}
                    <input
                        onClick={togglePostPanel}
                        className="opacity-50 font-light ml-3 text-[20px] bg-transparent border-none outline-none w-full"
                        placeholder="Share something with your community..."
                    />
                </div>

                {/* upload*/}
                <div className="position-absolute ml-200 -mt-[35px]">
                    <button onClick = {togglePostPanel} className="hover:cursor-pointer">
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
                <div className="w-full mt-5 ml-16 ">
                    <button onClick={togglePostPanel} className="hover:cursor-pointer">
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

                {/* Conditional Panel */}
                {showPostPanel && (
                    <ModalLayout
                        title="Create Post"
                        onClose={() => setShowPostPanel(false)}
                    >
                                    
                    <div className="flex flex-rol justify-evenly text-base font-medium mb-5">
                        {postTypes.map((type) => (
                            <p
                                key={type}
                                onClick={() => setPostType(type)}
                                className={`text-[25px] capitalize cursor-pointer transition-colors duration-200 
                                        ${
                                            postType === type
                                            ? "text-black underline"
                                            : "text-black hover:underline transition duration-1000 ease-in-out"
                                        }`}
                                    >
                                {type}
                            </p>
                        ))}
                    </div>                                

                    {/* Content per postType */}
                        {postType === "question" 
                            && 
                                <QuestionPanel 
                                    items = {items} 
                                />
                            }

                        {postType === "lesson" 
                            && 
                                <LessonPanel 
                                    items = {items} 
                                />
                            }
                    </ModalLayout>
                )}              
            </div>
        </div>
    )
}