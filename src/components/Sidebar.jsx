// src/components/Sidebar.jsx
"use client";

import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Wallet,
  ShoppingBag,
  Gift,
  Banknote,
  User,
  LogOut,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthProvider";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();

  if (!isLoggedIn) return null;

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Search, label: "Search Products", href: "/search" },
    { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
    { icon: ShoppingBag, label: "Orders", href: "/dashboard/orders" },
    { icon: Gift, label: "Referrals", href: "/dashboard/referrals" },
    { icon: Banknote, label: "Withdrawals", href: "/dashboard/withdrawal" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <>
      {/* Toggle Button (mobile only) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 rounded-lg bg-white border-2 border-[#FF6B35] hover:bg-[#FFF5E6] transition-colors shadow-lg md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} className="text-[#FF6B35]" /> : <Menu size={24} className="text-[#FF6B35]" />}
      </button>

      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static md:translate-x-0 top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b-2 border-[#E8D4C4] mt-16 md:mt-0">
          <h2 className="text-xl font-bold text-[#8B4513] font-sora">Menu</h2>
          {user && <p className="text-sm text-[#666] mt-2">Welcome, {user.name}!</p>}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-[#666] rounded-lg hover:bg-[#FFF5E6] hover:text-[#FF6B35] transition-colors font-medium"
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#E8D4C4]">
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium"
          >
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}