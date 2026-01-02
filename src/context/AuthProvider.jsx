"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { api } from "@/utils/api"; // ✅ central api.js

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔎 Check session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await api.getSession(); // ✅ calls /auth/me
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  // 🔑 User login
  const login = async (email, password) => {
    // Step 1: perform login (sets cookie)
    await api.login({ email, password });

    // Step 2: immediately fetch session to confirm cookie and get user
    const session = await api.getSession();
    setUser(session.user);

    return session.user;
  };

  // 🔑 User logout
  const logout = async () => {
    try {
      await api.logout(); // ✅ clears cookie
    } finally {
      setUser(null);
    }
  };

  const value = useMemo(() => {
    const role = user?.role || "guest";
    return {
      user,
      role,
      isLoggedIn: !!user,
      isAdmin: role === "admin",
      loading,
      login,
      logout,
    };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}