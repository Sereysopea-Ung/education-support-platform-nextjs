import { NextApiRequest, NextApiResponse } from 'next';
import { registerUser } from '@/database/postRegister';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const registrationData = req.body;

        try {
            await registerUser(registrationData);
            res.status(200).json({ message: 'Registration successful. Please check your email for verification.' });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Error during registration.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
