"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthProvider";

export default function LogoutPageContent() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await logout();
        router.push("/account/signin");
      } catch (err) {
        console.error("Logout failed:", err);
        router.push("/account/signin");
      }
    })();
  }, [logout, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-gray-700 font-medium">Logging you out...</p>
    </div>
  );
}