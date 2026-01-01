"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Box, ClipboardList, Users, LogOut, Menu, X, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminNavbar() {
  const { status, logoutAdmin } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (status === "loading" || status === "unauthenticated") return null;

  const links = [
    { href: "/admin/products", label: "Products", icon: <Box size={18} /> },
    { href: "/admin/orders", label: "Orders", icon: <ClipboardList size={18} /> },
    { href: "/admin/users", label: "Users", icon: <Users size={18} /> },
  ];

  return (
    <nav className="w-full bg-[#1F2937] text-white px-6 py-4 flex justify-between items-center">
      {/* Back + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24] font-semibold"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <div className="font-bold text-lg">Admin Dashboard</div>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-6">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 hover:text-[#FF6B35] ${
                isActive ? "text-[#FF6B35] font-semibold" : ""
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          );
        })}
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-2 hover:text-red-400"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* Mobile Menu */}
      <button
        className="md:hidden flex items-center"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {mobileOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1F2937] flex flex-col gap-4 px-6 py-4 md:hidden">
          {links.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 hover:text-[#FF6B35] ${
                  isActive ? "text-[#FF6B35] font-semibold" : ""
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileOpen(false);
              logoutAdmin();
            }}
            className="flex items-center gap-2 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}