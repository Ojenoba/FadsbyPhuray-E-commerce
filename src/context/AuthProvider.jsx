"use client";

import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { api } from "@/utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔎 Check user session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await api.getSession(); // calls /auth/me
        console.log("✅ Session fetched:", data.user);
        setUser(data.user);
      } catch (err) {
        console.log("⚠️ Session check failed:", err.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  // 🔑 User login
  const login = async (email, password) => {
    try {
      console.log("🔄 Logging in with:", email);
      const loginRes = await api.login({ email, password });
      console.log("✅ Login response:", loginRes);
      
      const session = await api.getSession();
      console.log("✅ Session retrieved after login:", session.user);
      setUser(session.user);
      return session.user;
    } catch (err) {
      console.error("❌ Login error:", err.message);
      throw err;
    }
  };

  // 🔑 User logout
  const logout = async () => {
    await api.logout();
    setUser(null);
  };

  // 🔎 Optional: check admin session only when needed
  const checkAdminSession = async () => {
    try {
      const data = await api.getAdminSession(); // calls /admin/me
      setUser(data.user);
      return data.user;
    } catch {
      return null;
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
      checkAdminSession, // expose admin check separately
    };
  }, [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}