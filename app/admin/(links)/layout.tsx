import AdminNavbar from "@/components/AdminNavbar";
import AdminSidebar from "@/components/AdminSidebar";
import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="w-full h-full bg-white flex"
      >
        <AdminNavbar/>
        <AdminSidebar/> 
        {children}
      </body>
    </html>
  );
}
