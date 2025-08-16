// import { getUserByEmail } from '@/database/getUserByEmail';
import { signIn, signOut } from 'next-auth/react';

export async function doLogout(){
    await signOut({
        redirect: true,
        callbackUrl: "/"
    });
}

export async function doCredentialLogin(formData: FormData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false
        });
        return response;
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message);
        } else {
            throw new Error("An unknown error occurred");
        }
    }
}
