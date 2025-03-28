import { createClient } from '@sanity/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Create a Sanity client instance
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: true,
    token: process.env.SANITY_API_TOKEN
});

interface RegistrationData {
    _type: string;
    username: string;
    role: string;
    name: string;
    email: string;
    major: string;
    password: string;
}

export async function registerUser(registrationData: Omit<RegistrationData, 'password'> & { password: string }) {
    try {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const registrationDataWithHashedPassword = {
            ...registrationData,
            password: hashedPassword,
            verificationToken,
            _type:'user'
        };

        const res = await client.create(registrationDataWithHashedPassword);
        console.log('User registered:', res);

        await sendVerificationEmail(registrationData.email, verificationToken);
    } catch (err) {
        console.error('Error registering user:', err);
    }
}

export async function sendVerificationEmail(userEmail: string, verificationToken: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,  // Allow self-signed certificates
        },
    });

    const verificationLink = `http://localhost:3000/verify?token=${verificationToken}&email=${encodeURIComponent(userEmail)}`;


    const mailOptions = {
        from: `"education-support-platform" <${process.env.EMAIL}>`,
        to: userEmail,  // Recipient's email
        subject: 'Please Verify Your Email Address',
        text: `Click this link to verify your email: ${verificationLink}`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}
