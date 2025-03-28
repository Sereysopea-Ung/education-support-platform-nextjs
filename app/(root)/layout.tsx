import Navbar from "@/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
            <main className="font-work-sans">
                <Navbar />
                {children}
            </main>
    );
}
