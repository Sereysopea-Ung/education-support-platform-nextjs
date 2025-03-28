// app/verify/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const VerifyEmail = () => {
    const [message, setMessage] = useState('Verifying token...');
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams) {
            const token = searchParams.get('token');
            const email = searchParams.get('email');

            if (token && email) {
                fetch(`/api/verify?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`)
                    .then((res) => res.json())
                    .then((data) => setMessage(data.message))
                    .catch(() => setMessage('Error verifying token.'));
            } else {
                setMessage('Invalid verification link.');
            }
        }
    }, [searchParams]);

    return <div>{message}</div>;
};

export default VerifyEmail;
