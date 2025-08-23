// app/verify/page.tsx
'use client'
export const dynamic = 'force-dynamic';
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";

const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying token...');

    useEffect(() => {
        // Run only on client
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const token = params.get('token');
        const email = params.get('email');

        if (token && email) {
            fetch(`/api/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
                .then((res) => res.json())
                .then((data) => setMessage(data.message))
                .catch(() => setMessage('Error verifying token.'));
        } else {
            setMessage('Invalid verification link.');
        }
    }, []);

    return (
        <section id="choose-role" className="bg-blue-200 flex justify-center items-center w-full h-dvh">
            <div className="bg-inherit w-11/12 md:w-6/12 sm:w-9/12">
                <div className="bg-white rounded-[10px] shadow-md h-100 items-center flex-col justify-center">
                    <div className="flex items-center justify-center gap-3 h-full flex-col">
                        <Image src="/check.svg" alt="Check" width={50} height={50} className="min-w-[60px]"/>
                        <div className="text-lg mx-2 font-bold">{message}</div>
                        <Link href="/">
                            <button className="rounded-lg bg-[#10B981] text-white h-[50px] px-20 hover:cursor-pointer hover:bg-green-200">
                                Continue to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>)
};

export default VerifyEmail;
