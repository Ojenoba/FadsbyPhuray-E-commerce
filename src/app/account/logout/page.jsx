"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ custom context

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      await logout(); // ✅ calls /api/auth/logout via context
      router.push("/account/signin"); // redirect to login page
    };

    doLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-700 font-medium">Logging you out...</p>
    </div>
  );
}