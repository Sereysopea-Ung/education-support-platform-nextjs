import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

export default function SettingPage(){
    return (
        <div className="w-full h-full min-h-screen relative bg-white">
            <div className="grid grid-cols-12 w-full">
                <div className="grid col-start-3 col-span-10 flex-col z-1  text-[#374151]">
                    
                    {/* Save the Setting */}
                    <div className="fixed top-0 h-20 flex items-center pr-8 gap-4 text-2xl font-bold ml-5 text-[#374151]">
                        <Link href="/admin/dashboard" className="flex items-center gap-2 text-gray-800">
                            <FaArrowLeft className="text-xl cursor-pointer" />
                        </Link>
                        Settings
                    </div>

                    <details className="mt-24 shadow-2xl rounded-lg bg-white my-4 mx-16">
                        <summary className="p-4 flex justify-between items-center cursor-pointer list-none">
                            <div>General Settings</div>
                            <div className="transition-transform duration-300 group-open:rotate-180">
                            <IoIosArrowDown className="text-xl" />
                            </div>
                        </summary>
 
                        <div className="px-4 pb-4 border-t-2 border-[#E5E7EB] flex flex-col text-[#333333] gap-2">
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2">
                                    Platform Name
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter platform name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2">
                                    Logo Update
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block w-full text-sm text-gray-900 border border-[#E5E7EB] cursor-pointer bg-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    aria-label="Upload logo image"
                                />
                            </div>

                            <div className="flex gap-2 mb-1 mt-2 items-center">
                                <input type="checkbox" />
                                <div>
                                    Maintenace Mode
                                </div>
                            </div>

                        </div>
                    </details>

                    <details className="shadow-2xl rounded-lg bg-white my-4 mx-16">
                        <summary className="p-4 flex justify-between items-center cursor-pointer list-none">
                            <div>User Management</div>
                            <div className="transition-transform duration-300 group-open:rotate-180">
                            <IoIosArrowDown className="text-xl" />
                            </div>
                        </summary>
 
                        <div className="px-4 pb-4 border-t-2 border-[#E5E7EB] flex flex-col text-[#333333] gap-2">
                            <div className="flex gap-2">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    Require Email Verification
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    Admins can ban users
                                </div>
                            </div>

                        </div>
                    </details>

                    <details className="shadow-2xl rounded-lg bg-white my-4 mx-16">
                        <summary className="p-4 flex justify-between items-center cursor-pointer list-none">
                            <div>Content Moderation</div>
                            <div className="transition-transform duration-300 group-open:rotate-180">
                            <IoIosArrowDown className="text-xl" />
                            </div>
                        </summary>
 
                        <div className="px-4 pb-4 border-t-2 border-[#E5E7EB] flex flex-col text-[#333333] gap-2">
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2">
                                    Banned Word
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a ban word"
                                />
                            </div>

                            <div className="flex gap-2">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    Auto-flag suspicious content
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2">
                                    Daily Post Limit
                                </label>
                                <input
                                    type="number"
                                    className="w-full border border-[#E5E7EB] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Add a limit"
                                />
                            </div>

                        </div>
                    </details>

                    <details className="shadow-2xl rounded-lg bg-white my-4 mx-16">
                        <summary className="p-4 flex justify-between items-center cursor-pointer list-none">
                            <div>Notifications</div>
                            <div className="transition-transform duration-300 group-open:rotate-180">
                            <IoIosArrowDown className="text-xl" />
                            </div>
                        </summary>
 
                        <div className="px-4 pb-4 border-t-2 border-[#E5E7EB] flex flex-col text-[#333333] gap-2">
                            <div className="flex gap-2">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    Email notifications for new reports
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <input type="checkbox" defaultChecked/>
                                <div>
                                    Email notifications for new registrations
                                </div>
                            </div>

                        </div>
                    </details>

                    <div className="flex justify-end mt-4 mx-16 mb-10">
                        <button className="bg-[#3498DB] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                            Save Changes
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}