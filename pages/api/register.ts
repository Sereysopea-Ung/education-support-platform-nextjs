import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/database/postRegister';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, password, username } = req.body || {};
    // Enforce role server-side
    const role = 'student';
    // Define document type for Sanity
    const _type = 'user';

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        await registerUser({ email, password, role, username, _type });
        return res.status(200).json({ message: 'Registration successful. Please check your email for verification.' });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Error during registration.' });
    }
}
