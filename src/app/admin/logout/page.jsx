"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ custom admin context

export default function AdminLogoutPage() {
  const { logoutAdmin } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await logoutAdmin(); // ✅ calls /api/admin/logout via context
      router.push("/admin/login"); // redirect to admin login page
    };

    doLogout();
  }, [logoutAdmin, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-700 font-medium">Logging you out...</p>
    </div>
  );
}