'use client'
import { useState } from 'react';
import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGraduate,faChalkboardUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const RegistrationForm = () => {
    return (
        <div id="whole-page">
            <section id="choose-role" className="bg-blue-200 flex justify-center items-center w-full h-dvh">
                <div className="bg-inherit w-11/12 md:w-6/12">
                    <div className="flex justify-center h-[100px] items-center bg-inherit">
                        <span className="text-xl sm:text-2xl font-bold">Create Your Account</span>
                    </div>
                    <div className="bg-white rounded-[10px] shadow-md h-auto items-center flex-col justify-center">
                        <div className="flex justify-center items-center h-[50px]">
                            <span className="text-lg mt-20">Choose Your Role</span>
                        </div>
                        <div className="pt-[0px] pb-[70px] mt-20">
                            <div className="flex justify-around pl-0 pr-0 sm:pl-[50px] sm:pr-[50px] md:pl-[70px] md:pr-70px] lg:pl-[120px] lg:pr-[120px]">
                                <Link href="../register/student"><button className="hover:bg-blue-100 w-[100px] h-[100px] bg-white border border-blue-600 rounded-[10px]">
                                    <div><FontAwesomeIcon icon={faUserGraduate} size="2x" className="text-blue-600" /></div>
                                    <div className="text-blue-600 pt-[10px]">Student</div>
                                </button></Link>
                                <Link href="../register/teacher">
                                    <button className="hover:bg-blue-100 w-[100px] h-[100px] bg-white border border-blue-600 rounded-[10px]">
                                    <div><FontAwesomeIcon icon={faChalkboardUser} size="2x" className="text-blue-600" /></div>
                                    <div className="text-blue-600 pt-[10px]">Teacher</div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegistrationForm;
