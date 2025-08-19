import React, { useState } from 'react';
import MenuOptions from './edit'

export default function EditDescriptionCard({onClose, onSave}) {

    const [description, setDescription] = useState('');

    const handleSave = () => {
        onSave(description);  
        onClose();
    };


    return (
        <div className="fixed inset-0 flex items-center justify-center h-full">
            <div
                className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"
            />
            <div className="w-[950px] h-[700px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border-1 flex flex-col md:flex-row gap-6 z-[9999]">
                {/* Left Panel */}
                <div className="flex-1">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.16927 3.16664H3.0026C2.56057 3.16664 2.13665 3.34224 1.82409 3.65479C1.51153 3.96736 1.33594 4.39128 1.33594 4.83331V14C1.33594 14.442 1.51153 14.866 1.82409 15.1785C2.13665 15.4911 2.56057 15.6666 3.0026 15.6666H12.1692C12.6114 15.6666 13.0352 15.4911 13.3477 15.1785C13.6604 14.866 13.836 14.442 13.836 14V9.83331M12.6576 1.98831C12.8114 1.82913 12.9952 1.70216 13.1986 1.61481C13.402 1.52746 13.6206 1.48148 13.842 1.47956C14.0632 1.47763 14.2827 1.51981 14.4875 1.60361C14.6924 1.68741 14.8785 1.81117 15.035 1.96766C15.1915 2.12414 15.3152 2.31023 15.399 2.51506C15.4827 2.71988 15.525 2.93934 15.523 3.16064C15.5211 3.38194 15.4751 3.60064 15.3877 3.80398C15.3005 4.00732 15.1735 4.19123 15.0142 4.34498L7.85927 11.5H5.5026V9.14331L12.6576 1.98831Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Edit Description
                    </h2>
                    <div className='mt-10 mb-2'>
                        <p>Description</p>
                    </div>
                    <textarea
                        className="w-[80%] h-[40%] border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="6"
                        maxLength={128}
                        placeholder="Enter your description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    
                    <div className="text-sm text-gray-500 mt-2">
                        Tip: Use clear and descriptive <br /> language <span className="float-right mr-[105px] -mt-5">{128 - description.length} characters</span>
                    </div>

                    <div className="mt-8 ml-5 flex gap-x-10">
                        <button className="bg-[#3763AE] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-[180px] flex items-center justify-center" onClick={handleSave}>
                            <svg width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.33398 5.66675L4.00065 8.33341L10.6673 1.66675" stroke="#F6F9FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className='ml-3'>Save Changes</span>
                        </button>
                        <button className="bg-[#6B7280] text-white px-4 py-2 rounded-md hover:bg-gray-600 transition w-[120px] flex items-center justify-center"  onClick={onClose}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 9L9 1M1 1L9 9" stroke="#FBFCFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span className='ml-3'>Cancel</span>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="hidden md:block w-[2px] bg-gray-200 -ml-[100px]"></div>

                {/* Right Panel */}
                <div className="w-[45%]">
                    <div className='bg-[#F3F4F6] w-[120px] px-3 py-2 mb-6 ml-[270px] border-1 rounded-md flex items-center justify-center'>
                        <svg width="20" height="20" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 4.33333V7L9 9M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className='ml-3 text-[20px]'>
                            History
                        </span>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 4.33333V7L9 9M13 7C13 7.78793 12.8448 8.56815 12.5433 9.2961C12.2417 10.0241 11.7998 10.6855 11.2426 11.2426C10.6855 11.7998 10.0241 12.2417 9.2961 12.5433C8.56815 12.8448 7.78793 13 7 13C6.21207 13 5.43185 12.8448 4.7039 12.5433C3.97595 12.2417 3.31451 11.7998 2.75736 11.2426C2.20021 10.6855 1.75825 10.0241 1.45672 9.2961C1.15519 8.56815 1 7.78793 1 7C1 5.4087 1.63214 3.88258 2.75736 2.75736C3.88258 1.63214 5.4087 1 7 1C8.5913 1 10.1174 1.63214 11.2426 2.75736C12.3679 3.88258 13 5.4087 13 7Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        Edit History</h3>
                    </div>

                    {/* History Item */}
                    <div className="flex items-start gap-3 border-1 bg-[#F3F4F6] p-3 rounded-md shadow-sm">
                        <img
                            src="https://scontent.fpnh1-1.fna.fbcdn.net/v/t39.30808-1/506094965_1506415967011960_7949380384331048764_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=100&ccb=1-7&_nc_sid=e99d92&_nc_ohc=VDcdodw-kzUQ7kNvwHfK4ym&_nc_oc=AdlameAAjMBFJKspOdWy0anr2mHd-L9xmyYH3G8SSCRe4CTsgA9jCBifvRl7hljBUq4&_nc_zt=24&_nc_ht=scontent.fpnh1-1.fna&_nc_gid=1dYc5G0wdKP5i53CvIDsPw&oh=00_AfRL7rlyITbVJSfEgf00nI-BpQxxJSoD37tL64y0J-qlcA&oe=688D6001"
                            alt="User avatar"
                            className="w-14 h-14 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <div className='mb-10'>
                                <div className="text-[18px] font-medium mt-[14px]">Maza Kalipzo</div>
                                <div className="text-[16px] text-gray-400 ml-[220px] -mt-[23px]">2 hours ago</div>
                            </div>
                            <div className="mt-2 text-sm bg-white p-2 border rounded-[10px]">
                                <textarea className='focus:outline-none resize-none w-full h-[80px]'
                                
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    );
}
