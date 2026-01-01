"use client";

import { useAuth } from "@/context/AuthProvider";

export default function useUser() {
  const { user, isLoggedIn, loading } = useAuth();

  return {
    data: user || null,   // ✅ user object from your AuthProvider
    status: loading ? "loading" : isLoggedIn ? "authenticated" : "unauthenticated",
  };
}