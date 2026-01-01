"use client";

import ClientProviders from "../ClientProviders";
import LayoutWrapper from "../layoutWrapper";
import { usePathname } from "next/navigation";
import AdminNavbar from "./AdminNavbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  return (
    <ClientProviders>
      <div className="flex flex-col min-h-screen">
        {!isLoginPage && <AdminNavbar />}
        <main className="flex-1 relative z-10">{children}</main>
      </div>
    </ClientProviders>
  );
}