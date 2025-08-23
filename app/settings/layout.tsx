'use client';

import React from "react";
import { useSession } from "next-auth/react";
import SettingOptions from "@/components/SettingOptions";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: _session } = useSession();

    return (
        <main className="font-work-sans bg-gray-100 min-h-screen w-full">
            <div className="flex min-h-screen w-full">
                <SettingOptions />
                <div className="flex-1 w-full p-0">
                    {children}
                </div>
            </div>
        </main>
    );
}
