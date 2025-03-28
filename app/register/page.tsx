'use client';
import { useState } from 'react';
import React from 'react';
import { createClient } from '@sanity/client';
import { useRouter } from 'next/navigation';

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
        <form onSubmit={handleSubmit}>
            <label>
                Role:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </label>
            <label>
                Username:
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                {usernameError && <p style={{ color: 'red' }}>{usernameError}</p>}
            </label>
            <label>
                Name:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                {emailFormatError && <p style={{ color: 'red' }}>{emailFormatError}</p>}
            </label>
            <label>
                Major:
                <input
                    type="text"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Confirm Password:
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
