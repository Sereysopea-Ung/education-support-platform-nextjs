'use client'

import { doCredentialLogin } from '@/pages/api/auth/loginAndLogout';
import { useRouter } from 'next/navigation';
import { SignInResponse } from "next-auth/react";
import React from "react"; // Import the correct type

export default function LoginForm() {
    const router = useRouter();

    async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);

            console.log(response);

            if (response?.error) {
                console.error(response.error);
            } else {
                router.push('../'); // Navigate to the parent directory
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
        <div>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required />
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
