"use client";

import { doCredentialLogin } from '@/pages/api/auth/loginAndLogout';
import { useRouter } from 'next/navigation';
import React from "react";
import Link from "next/link"; // Import the correct type

export default function LoginForm() {
    const router = useRouter();

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);

            if (response?.error) {
                console.error(response.error);
            } else {
                console.log("Login successful:", response);
                router.push("@/");
                // router.push('../admin/users?refresh=1');
            }

        } catch (e) {
            if (e instanceof Error) { 
                console.error("An error occurred:", e.message);
            } else {
                console.error("An unknown error occurred");
            }
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 w-full text-gray-800">
            <div className="border border-gray-300 rounded-lg p-6 w-96 shadow-lg bg-white">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
                    <label htmlFor="email" className="text-lg font-medium">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                    <label htmlFor="password" className="text-lg font-medium">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="p-2 border border-gray-300 rounded-lg w-full"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 w-full"
                    >
                        Login
                    </button>
                </form>
                <div className="flex justify-center items-center w-full">
                    Do not have an account? <Link href="/register" className="text-[#2563EB] ml-2">Sign up</Link>
                </div>
            </div>
        </div>
    );
}
