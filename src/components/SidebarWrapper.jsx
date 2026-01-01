"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function SidebarWrapper() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  if (pathname === "/" || !session) return null;

  return (
    <>
      {/* Toggle button (you can put this in your header) */}
      <button
        onClick={() => setOpen(true)}
        className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
      >
        ☰ Menu
      </button>

      {/* Off-canvas sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-[#8B4513]">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-[#FF6B35] font-bold"
          >
            ✕
          </button>
        </div>
        {/* Sidebar menu items */}
        <Sidebar />
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
}