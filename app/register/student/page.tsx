import React from 'react'
import {createClient} from "@sanity/client";

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

const StudentRegistration = () => {
    return (
        <div id="main" className="bg-blue-200 flex justify-center items-center w-full h-dvh">
            <div id="student-card" className="bg-white rounded-[10px] shadow-md">Hello</div>
        </div>
    )
}
export default StudentRegistration;
