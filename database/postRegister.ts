import { createClient } from '@sanity/client';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import {department} from '../helper-files/department';

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
    email: string;
    password: string;
}

function getMajor(registerData : RegistrationData){
    return department[parseInt(registerData.email.split('@')[0].split('.')[2].slice(0,2))];
}

function getFirstName(registerData : RegistrationData){
    return registerData.email.split('.')[1];
}

function getLastName(registerData : RegistrationData){
    return registerData.email.split('.')[0];
}

function getYear(registerData : RegistrationData){
    return registerData.email.split('.')[2].split('@')[0].slice(2,4);
}

export async function registerUser(registrationData: RegistrationData) {
    try {
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);

        const verificationToken = crypto.randomBytes(32).toString('hex');

        const registrationDataWithHashedPassword = {
            _type: 'user',
            role: registrationData.role,
            email: registrationData.email,
            password: hashedPassword,
            verificationToken,
            major: getMajor(registrationData),
            firstName: getFirstName(registrationData),
            lastName: getLastName(registrationData),
            enroll_year: getYear(registrationData),
            username: registrationData.username,
            isVerified: false,
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
        subject: 'Verify your email for Education Support Platform',
        text: `Please verify your email by visiting: ${verificationLink}`, // plaintext fallback
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Verify Your Email</title>
            <style>
              /* Client-safe inline styles are primarily used below */
              @media (prefers-color-scheme: dark) {
                .card { background: #0f172a !important; }
                .text { color: #e5e7eb !important; }
                .muted { color: #94a3b8 !important; }
              }
            </style>
          </head>
          <body style="margin:0;padding:0;background:white;font-family:Arial,Helvetica,sans-serif;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:white;padding:24px;">
              <tr>
                <td align="center">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:12px;border:1px solid #e5e7eb;overflow:hidden;" class="card">
                    <tr>
                      <td style="padding:24px 24px 8px 24px;text-align:center;">
                        <div style="font-size:24px;line-height:32px;font-weight:700;color:#2563eb;">Education Support Platform</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 24px 8px 24px;text-align:center;">
                        <div style="font-size:20px;line-height:28px;font-weight:600;color:#111827;" class="text">Verify your email address</div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 24px 16px 24px;text-align:center;">
                        <div style="font-size:14px;line-height:22px;color:#4b5563;" class="muted">
                          Thanks for signing up! Please confirm this is your email address by clicking the button below.
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center" style="padding:8px 24px 24px 24px;">
                        <a href="${verificationLink}"
                           style="display:inline-block;text-decoration:none;background:#2563eb;color:#ffffff;padding:12px 20px;border-radius:8px;font-weight:600;font-size:14px;"
                           target="_blank" rel="noopener noreferrer">
                          Verify Email
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 24px 16px 24px;">
                        <div style="font-size:12px;line-height:18px;color:#6b7280;" class="muted">
                          If the button doesn’t work, copy and paste this URL into your browser:
                          <br />
                          <a href="${verificationLink}" style="color:#2563eb;word-break:break-all;">${verificationLink}</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:0 24px 24px 24px;">
                        <div style="font-size:12px;line-height:18px;color:#9ca3af;" class="muted">
                          If you did not create an account, you can safely ignore this email.
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Verification email sent:', info.messageId);
    } catch (error) {
        console.error('Error sending verification email:', error);
    }
}
