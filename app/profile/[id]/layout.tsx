
import React from "react";
import Quickstats from "@/components/Quickstats";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <main className="font-work-sans">
            <Navbar />
            <div className="hidden lg:flex"><Sidebar /></div>
            <div className="hidden lg:flex"><Quickstats /></div>
            {children}
        </main>
    );
}
