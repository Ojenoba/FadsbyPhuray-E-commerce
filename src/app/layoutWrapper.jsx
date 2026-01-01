"use client";

import { usePathname } from "next/navigation";
import LayoutContent from "./LayoutContent";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return isAdminRoute ? (
    <main className="flex-1 relative z-10">{children}</main>
  ) : (
    <LayoutContent>
      <main className="flex-1 relative z-10">{children}</main>
    </LayoutContent>
  );
}