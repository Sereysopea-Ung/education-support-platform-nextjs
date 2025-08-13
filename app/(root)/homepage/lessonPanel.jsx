import React, { useState } from "react";

export default function LessonPanel({ items }) {

    const majors = ['ITE', 'SCA', 'TEED', 'BIOE', 'Biology', 'Math', 'Physics', 'IT', 'English', 'DMC', 'Chemistry', 'Chinese', 'Sociology'];
    const subjects = ['Linear Algebra', 'Database', 'Artificial Intelligence', 'English', 'Calculus', 'C++', 'JAVA', 'Computer Fundamental', 'Label'];


    const [selectedMajors, setSelectedMajors] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const toggleSelection = (label, type) => {
        const selected = type === 'major' ? selectedMajors : selectedSubjects;
        const setSelected = type === 'major' ? setSelectedMajors : setSelectedSubjects;

        if (selected.includes(label)) {
        setSelected(selected.filter(item => item !== label));
        } else if (selected.length < 2) {
        setSelected([...selected, label]);
        }
    };

  return (
    <>
        <div className="mb-10">
            <p className="text-[15px] font-semibold text-blue-500">Tips:</p>
            <ul className="text-[15px] list-disc list-inside text-blue-500 space-y-2 ml-2">
                <li>Be respectful and polite, discuss without hash words</li>
                <li>Follow the <a href="#" className="underline">community guidelines</a></li>
            </ul>
        </div>
       
        <div className="mb-3">
            <div className='flex items-center'>
                <img src={items.img} className="border-1 border-solid w-10 h-10 rounded-full object-cover" />
                <p className='ml-2 text-gray-500 font-bold -mt-[10px]'>{items.name}</p>
            </div>

            <div className='w-full mt-2'>
                <input type="text"
                    placeholder="Share something with your community..."
                    className="w-full bg-[#E5E7EB] text-gray-[#ADAEBC] p-3 rounded-lg noborder focus:outline-none"
                    />
            </div>
        </div>

        <div className="flex items-center space-x-1 mb-14 ml-2">
            <button className="text-xl hover:cursor-pointer">
                <svg 
                    width="24"
                    height="24"
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
            </button>

            <button className="text-xl hover:cursor-pointer">
                <svg
                    className="ml-1"
                    width="24"
                    height="24"
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

        <div className="mb-4">
            <p className="text-sm font-medium mb-2">Major ・<span className="text-gray-400">(Maximum 2 labels)</span></p>
            <div className="flex flex-wrap gap-2">
                {majors.map((label, i) => (
                    <button
                    key={i}
                    onClick={() => toggleSelection(label, 'major')}
                    className={`px-3 py-1 rounded-full text-sm 
                        ${selectedMajors.includes(label) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                    {label}
                    </button>
                ))}          
            </div>
        </div>

        <div className="mb-4">
            <p className="text-sm font-medium mb-2">Subject ・<span className="text-gray-400">(Maximum 2 labels)</span></p>
            <div className="flex flex-wrap gap-2">
                {subjects.map((label, i) => (
                    <button
                    key={i}
                    onClick={() => toggleSelection(label, 'subject')}
                    className={`px-3 py-1 rounded-full text-sm 
                        ${selectedSubjects.includes(label) ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    >
                    {label}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex justify-end">
            <button className="flex items-center gap-4 px-4 py-2 text-[20px] group text-black hover:text-blue-500 transition-colors">
                Post
                <svg className="stroke-current transition-colors duration-350 ease-in-out" width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.5014 10H4.0014M3.91675 10.2915L1.58183 17.2662C1.39839 17.8142 1.30668 18.0881 1.3725 18.2569C1.42966 18.4034 1.55242 18.5145 1.7039 18.5567C1.87834 18.6054 2.1418 18.4869 2.66874 18.2497L19.3802 10.7296C19.8945 10.4981 20.1517 10.3824 20.2312 10.2216C20.3002 10.082 20.3002 9.9181 20.2312 9.77843C20.1517 9.61767 19.8945 9.50195 19.3802 9.2705L2.66291 1.74776C2.13757 1.51135 1.87489 1.39315 1.70063 1.44164C1.54929 1.48375 1.42654 1.59454 1.36918 1.74078C1.30314 1.90917 1.39388 2.18255 1.57535 2.72931L3.9174 9.78556C3.94857 9.87947 3.96415 9.92642 3.9703 9.97444C3.97576 10.0171 3.97571 10.0602 3.97014 10.1028C3.96386 10.1508 3.94816 10.1977 3.91675 10.2915Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
        </div>
    </>
  );
}
