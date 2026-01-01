"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogoutPageContent() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const doLogout = async () => {
      try {
        await logout(); // ✅ call your AuthProvider logout
        router.push("/account/signin"); // redirect to login page
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    doLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-700 font-medium">Logging you out...</p>
    </div>
  );
}