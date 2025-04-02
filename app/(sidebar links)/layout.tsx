'use client';

import Navbar from "@/components/Navbar";
import React from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import RightBar from "@/components/RightBar";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    return (
        <main className="font-work-sans">
            <Navbar />
            {session?.user ? (
                <Sidebar />
            ) : (<div></div>)}
            {children}
        </main>
    );
}
