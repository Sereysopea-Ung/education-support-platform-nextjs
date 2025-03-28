import Sidebar from "@/components/Sidebar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="font-work-sans">
            <Sidebar />
            {children}
        </main>
    );
}
