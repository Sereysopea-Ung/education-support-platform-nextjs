'use client';

import React from "react";
import { useSession } from "next-auth/react";
import SettingOptions from "@/components/SettingOptions";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    return (
        <main className="font-work-sans">
            <SettingOptions />
            {children}
        </main>
    );
}
