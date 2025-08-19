import React from 'react'
import Image from "next/image";
import Link from "next/link";

const SuccessRegistration = () => {
    return (
        <section id="choose-role" className="bg-blue-200 flex justify-center items-center w-full h-dvh text-gray-800">
            <div className="bg-inherit w-11/12 md:w-6/12 sm:w-9/12">
                <div className="bg-white rounded-[10px] shadow-md h-100 items-center flex-col justify-center">
                    <div className="flex items-center justify-center gap-3 h-full flex-col">
                        <Image src="/check.svg" alt="Check" width={50} height={50} className="min-w-[60px]"/>
                        <div className="text-lg mx-2 font-bold">Registration successful</div>
                        <div className="text-lg mx-2">Your account has been created successfully.</div>
                        <div className="text-lg mx-2">Please check your email for verification.</div>
                        <Link
                          href="https://outlook.office.com/mail/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                        >
                          Open Outlook
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SuccessRegistration;
