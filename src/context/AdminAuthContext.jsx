"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "authenticated" | "unauthenticated"

  // ✅ Check if admin is logged in on mount
  useEffect(() => {
    checkAdminAuth();
  }, []);

  // 🔑 Call backend /api/admin/me to verify current admin
  const checkAdminAuth = async () => {
    try {
      const res = await fetch("/api/admin/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setAdmin(data.user); // ✅ backend returns { user }
        setStatus("authenticated");
      } else {
        setAdmin(null);
        setStatus("unauthenticated");
      }
    } catch {
      setAdmin(null);
      setStatus("unauthenticated");
    }
  };

  // 🔑 Admin login
  const loginAdmin = async (email, password) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ ensures cookie is saved
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setAdmin(data.user); // ✅ backend returns { user }
      setStatus("authenticated");
    } else {
      throw new Error(data.error || "Admin login failed");
    }
  };

  // 🔑 Admin logout
  const logoutAdmin = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
      credentials: "include",
    });
    setAdmin(null);
    setStatus("unauthenticated");
  };

  const isAdminLoggedIn = !!admin;

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        status,
        checkAdminAuth,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return context;
}