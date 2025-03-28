import React from 'react'
import Image from "next/image";
import Link from "next/link";

const SuccessRegistration = () => {
    return (
        <section id="choose-role" className="bg-blue-200 flex justify-center items-center w-full h-dvh">
            <div className="bg-inherit w-11/12 md:w-6/12 sm:w-9/12">
                <div className="bg-white rounded-[10px] shadow-md h-100 items-center flex-col justify-center">
                    <div className="flex items-center justify-center gap-3 h-full flex-col">
                        <Image src="/check.svg" alt="Check" width={50} height={50} className="min-w-[60px]"/>
                        <div className="text-lg mx-2 font-bold">Registration successful</div>
                        <div className="text-lg mx-2">Your account has been created successfully.</div>
                        <div className="text-lg mx-2">Please check your email for verification.</div>
                        <Link href="/">
                            <button className="rounded-lg bg-[#10B981] text-white h-[50px] px-20 hover:cursor-pointer hover:bg-green-200">
                                Continue to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SuccessRegistration;
