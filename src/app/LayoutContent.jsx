"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";
import Navbar from "@/components/Navbar";

export default function LayoutContent({ children }) {
  const pathname = usePathname();
  const { isLoggedIn } = useAuth(); // ✅ now safe because AuthProvider wraps RootLayout
  const isHomepage = pathname === "/";

  return (
    <>
      {/* Show Navbar on homepage or when not logged in */}
      {(isHomepage || !isLoggedIn) && <Navbar />}

      {/* Main content */}
      <main className="flex-1 relative z-10">{children}</main>
    </>
  );
}