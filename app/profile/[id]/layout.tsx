
import React from "react";
import Quickstats from "@/components/Quickstats";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <main className="font-work-sans">
            <Navbar />
            <Sidebar />
            <Quickstats />
            {children}
        </main>
    );
}
