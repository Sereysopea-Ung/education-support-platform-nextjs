import Link from "next/link";
import { ReactNode } from "react";

export default function SettingsLayout({ children }: { children: ReactNode }) {
    const sidebarLinks = [
        { name: "Profile", href: "/settings/edit-profile" },
        { name: "Account", href: "/settings/account" },
        { name: "Privacy", href: "/settings/privacy" },
        { name: "Notifications", href: "/settings/notifications" },
        { name: "Security", href: "/settings/security" },
        { name: "Preferences", href: "/settings/preferences" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800">SETTINGS</h2>
                </div>
                <nav className="mt-4">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-600 ${
                                link.href === "/settings/edit-profile" ? "bg-blue-50 text-blue-600" : ""
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">{children}</div>
        </div>
    );
}