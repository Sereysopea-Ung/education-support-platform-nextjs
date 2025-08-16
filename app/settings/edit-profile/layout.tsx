import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 lg:ml-[480px] md:ml-[240px] sm:ml-[165px] bg-white">{children}</div>
        </div>
    );
}