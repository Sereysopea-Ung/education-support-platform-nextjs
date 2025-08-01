"use client";
import { useState } from 'react';
import React from 'react';
import { createClient } from '@sanity/client';
import { useRouter } from 'next/navigation';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    token: process.env.SANITY_API_TOKEN,
});

const checkIfUsernameExisted = async (username: string): Promise<boolean> => {
    try {
        const query = `*[_type == "user" && username == $username][0]`;
        const user = await client.fetch(query, { username });
        return !!user;
    } catch (e) {
        console.error(e);
        return false;
    }
};

const checkIfEmailExisted = async (email: string): Promise<boolean> => {
    try {
        const query = `*[_type == "user" && email == $email][0]`;
        const user = await client.fetch(query, { email });
        return Boolean(user);
    } catch (error) {
        console.error("Error checking if email exists:", error);
        return false;
    }
};

const isValidStudentEmail = (email: string): boolean => {
    const studentEmailRegex = /^[a-zA-Z]+\.[a-zA-Z]+\.\d{4}@rupp\.edu\.kh$/;
    return studentEmailRegex.test(email);
};

const isValidTeacherEmail = (email: string): boolean => {
    const teacherEmailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@rupp\.edu\.kh$/;
    return teacherEmailRegex.test(email);
};

const RegistrationForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        role: 'student', // Default role
        username: '',
        name: '',
        email: '',
        major: '',
        password: '',
        confirmPassword: '',
        year: 1,
        term: false,
        _type: 'user',
    });

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailFormatError, setEmailFormatError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { username, email, password, confirmPassword, role } = formData;

        // Validate Password Match
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        } else {
            setPasswordError('');
        }

        // Validate Email Format based on Role
        if (role === 'student' && !isValidStudentEmail(email)) {
            setEmailFormatError('Invalid RUPP student email format!');
            return;
        } else if (role === 'teacher' && !isValidTeacherEmail(email)) {
            setEmailFormatError('Invalid RUPP teacher email format!');
            return;
        } else {
            setEmailFormatError('');
        }

        // Check if Username Exists
        const isUsernameTaken = await checkIfUsernameExisted(username);
        if (isUsernameTaken) {
            setUsernameError('This username is taken, please choose another!');
            return;
        } else {
            setUsernameError('');
        }

        // Check if Email Exists
        const isEmailTaken = await checkIfEmailExisted(email);
        if (isEmailTaken) {
            setEmailError('This email is already registered!');
            return;
        } else {
            setEmailError('');
        }

        // Register User
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                router.push('/register/register-success');
            } else {
                router.push('/register/register-failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }

    };

    return (
        <div className="flex justify-center h-auto bg-gray-100 w-full text-gray-800">
            <div className="border border-gray-300 rounded-lg p-6 w-96 shadow-lg bg-white h-auto my-5 md:my-10">
                <h1 className="text-5xl font-semibold mb-4 text-center text-[#2563EB]"><FontAwesomeIcon icon={faUserGraduate} /></h1>
                <h2 className="text-2xl font-semibold mb-4 text-center">Student Registration</h2>
                <h2 className="text-3xs font-semibold mb-4 text-center text-[#4B5563]">Create your academic account</h2>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <label className="text-lg font-medium">Full Name
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full" />
                    </label>
                    <label className="text-lg font-medium">Username
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full" />
                    </label>
                    <label className="text-lg font-medium">School Email
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full" />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                        {emailFormatError && <p style={{ color: 'red' }}>{emailFormatError}</p>}
                    </label>
                    <label className="text-lg font-medium">Major
                        <input type="text" name="major" value={formData.major} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full" />
                    </label>
                    <label className="text-lg font-medium">
                        Academic Year
                        <div className="flex space-x-2 mt-2 text-sm w-full">
                            {[
                                { label: "Year 1", value: 1 },
                                { label: "Year 2", value: 2 },
                                { label: "Year 3", value: 3 },
                                { label: "Year 4", value: 4 },
                                { label: "Graduate", value: 5 },
                            ].map((option) => (
                                <label
                                    key={option.value}
                                    className={`p-2 border rounded-lg cursor-pointer flex items-center text-center ${
                                        formData.year === option.value ? "bg-blue-500 text-white" : "bg-white border-gray-300"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="year"
                                        value={option.value}
                                        checked={formData.year === option.value}
                                        onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                                        required
                                        className="hidden"
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </label>

                    <label className="text-lg font-medium">Password
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full" />
                    </label>
                    <label className="text-lg font-medium">Confirm Password
                        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="p-2 border border-gray-300 rounded-lg w-full"/>{passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </label>
                    <div className="w-full flex items-center">
                        <label className="text-lg font-medium">
                            <input type="checkbox" name="term" checked={formData.term} onChange={() => setFormData({ ...formData, term: !formData.term })} className="peer hidden" required/>
                            <span className="w-5 h-5 border-2 border-gray-500 rounded-sm flex items-center justify-center peer-checked:border-blue-500 peer-checked:bg-blue-500 text-white">
                            ✓ {/* Unicode checkmark (or use an SVG icon) */}
                        </span>
                        </label>
                        <span className="ml-2 text-[13px]">I agree to the
                            <Link href="/terms-of-service" className="text-[#2563EB] mx-1">Terms of Service</Link>
                            and
                            <Link href="/privacy-policy" className="text-[#2563EB] mx-1">Privacy Policy</Link>
                        </span>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded-lg text-lg hover:bg-blue-700 w-full">Register</button>
                </form>
                <div className="flex justify-center items-center w-full mt-2">
                    Already have an account? <Link href="/login" className="text-[#2563EB] ml-2">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationForm;
