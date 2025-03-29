
import React from "react";
import Quickstats from "@/components/Quickstats";

export default function Layout({ children }: { children: React.ReactNode }) {

    return (
        <main className="font-work-sans">
            <Quickstats />
            {children}
        </main>
    );
}
