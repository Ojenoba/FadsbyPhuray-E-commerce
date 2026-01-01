"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Box, ClipboardList, Truck, Megaphone, Mail, HelpCircle } from "lucide-react";

export default function AdminHome() {
  const { status } = useAdminAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Guard logic: only redirect when necessary
  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/admin/login") {
      router.replace("/admin/login?reason=not-logged-in");
    }
    if (status === "authenticated" && pathname === "/admin/login") {
      router.replace("/admin");
    }
  }, [status, pathname, router]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated" && pathname !== "/admin/login") return null;

  const links = [
    { name: "Products", path: "/admin/products", icon: <Box size={28} className="text-[#FF6B35]" /> },
    { name: "Orders", path: "/admin/orders", icon: <ClipboardList size={28} className="text-[#FF6B35]" /> },
    { name: "Shipping", path: "/admin/shipping", icon: <Truck size={28} className="text-[#FF6B35]" /> },
    { name: "Announcements", path: "/admin/announcements", icon: <Megaphone size={28} className="text-[#FF6B35]" /> },
    { name: "Emails", path: "/admin/emails", icon: <Mail size={28} className="text-[#FF6B35]" /> },
    { name: "How-To", path: "/admin/how-to", icon: <HelpCircle size={28} className="text-[#FF6B35]" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {links.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <div
              key={item.name}
              onClick={() => router.push(item.path)}
              className={`cursor-pointer shadow rounded-lg p-6 flex flex-col items-start gap-3 transition ${
                isActive
                  ? "bg-[#FF6B35] text-white font-semibold"
                  : "bg-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <h2 className="text-xl font-semibold">{item.name}</h2>
              </div>
              <p className={isActive ? "text-white/80" : "text-gray-500"}>
                Go to {item.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}