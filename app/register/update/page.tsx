'use client'
import { useState } from 'react';
import React from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        role:'student',
        username: '',
        name: '',
        email: '',
        major: '',
        password: '',
        _type: 'user'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Registration successful. Please check your email for verification.');
            } else {
                alert('Registration failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }
    };

    return (
        <div id="whole-page">
            <div id="choose-role" className="bg-amber-300">

            </div>
            <div id="student-registration" className="bg-purple-300">

            </div>
            <div id="teacher-registration" className="bg-blue-300">

            </div>
        </div>
    );
};

export default RegistrationForm;
