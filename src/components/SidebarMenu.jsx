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
} from "lucide-react";
import useUser from "@/utils/useUser";
import useAuth from "@/utils/useAuth";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Wallet, label: "Wallet", href: "/dashboard" },
    { icon: ShoppingBag, label: "Orders", href: "/dashboard" },
    { icon: Gift, label: "Referrals", href: "/dashboard" },
    { icon: Banknote, label: "Withdrawals", href: "/dashboard/withdrawal" },
    { icon: User, label: "Profile", href: "/dashboard" },
  ];

  if (!user) {
    return null;
  }

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors md:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={24} className="text-[#FF6B35]" />
        ) : (
          <Menu size={24} className="text-[#FF6B35]" />
        )}
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64 md:shadow-md border-r-2 border-[#E8D4C4]`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b-2 border-[#E8D4C4]">
          <h2 className="text-xl font-bold text-[#8B4513] font-sora">Menu</h2>
          {user && (
            <p className="text-sm text-[#666] mt-2">Welcome, {user.name}!</p>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-[#666] rounded-lg hover:bg-[#FFF5E6] hover:text-[#FF6B35] transition-colors font-medium"
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-[#E8D4C4]">
          <button
            onClick={() => {
              setIsOpen(false);
              handleSignOut();
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
