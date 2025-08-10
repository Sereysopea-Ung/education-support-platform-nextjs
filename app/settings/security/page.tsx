"use client"; // Mark as a client-side component

import { doLogout } from "@/pages/api/auth/loginAndLogout"; // Import your doLogout function
import { useRouter } from "next/navigation"; // Import useRouter for navigation

export default function SecurityPage() {
    const router = useRouter();

    const handleLogout = async () => {
        await doLogout(); // Call the logout function
        router.push("/"); // Navigate to the homepage after logout
    };

    return (
        <div className="grid grid-cols-12 bg-white min-h-screen w-screen text-black">
            <div className="col-span-8 col-start-4 ">
                <div>Security</div>
                <button
                    className="border bg-blue-600 text-white px-6 py-1 rounded-4xl hover:bg-blue-700 transition cursor-pointer text-nowrap col-end-12"
                    onClick={handleLogout} // Trigger logout and then navigate
                >
                    Log out
                </button>
            </div>
        </div>
    );
}
