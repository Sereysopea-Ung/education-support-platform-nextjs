'use client'
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate,faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const RegistrationForm = () => {
    return (
        <div id="whole-page">
            <section id="choose-role" className="bg-blue-200 flex justify-center items-center min-w-screen h-dvh ">
                <div className="bg-inherit w-11/12 sm:w-8/12 mt-[-300px]">
                    <div className="flex justify-center h-[100px] items-center bg-inherit">
                        <span className="text-xl sm:text-2xl font-bold text-black">Create Your Account</span>
                    </div>
                    <div className="bg-white rounded-[10px] shadow-md">
                        <div className="flex justify-center items-center h-[50px]">
                            <span className="text-lg text-gray-500 pt-5">Choose Your Role</span>
                        </div>
                        <div className="pt-[0px] pb-[30px]">
                            <div className="flex justify-around pl-0 pr-0 sm:pl-[50px] sm:pr-[50px] md:pl-[120px] md:pr-[120px] lg:pl-[230px] lg:pr-[230px] py-10">
                                <Link href="../register/student"><button className="hover:bg-blue-100 w-[100px] h-[100px] bg-white border border-blue-600 rounded-[10px]">
                                    <div><FontAwesomeIcon icon={faUserGraduate} size="2x" className="text-blue-600" /></div>
                                    <div className="text-blue-600 pt-[10px]">Student</div>
                                </button></Link>
                                <Link href="../register/teacher"><button className="hover:bg-blue-100 w-[100px] h-[100px] bg-white border border-blue-600 rounded-[10px]">
                                    <div><FontAwesomeIcon icon={faChalkboardUser} size="2x" className="text-blue-600" /></div>
                                    <div className="text-blue-600 pt-[10px]">Teacher</div>
                                </button></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationForm;
