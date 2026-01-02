"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { api } from "@/utils/api"; // ✅ use central api.js

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "authenticated" | "unauthenticated"

  // ✅ Check if admin is logged in on mount
  useEffect(() => {
    checkAdminAuth();
  }, []);

  // 🔎 Verify current admin session
  const checkAdminAuth = async () => {
    try {
      const data = await api.getAdminSession(); // ✅ calls /admin/me
      setAdmin(data.user);
      setStatus("authenticated");
    } catch {
      setAdmin(null);
      setStatus("unauthenticated");
    }
  };

  // 🔑 Admin login
  const loginAdmin = async (email, password) => {
    const data = await api.adminLogin({ email, password }); // ✅ calls /admin/login
    setAdmin(data.user);
    setStatus("authenticated");
    return data.user;
  };

  // 🔑 Admin logout
  const logoutAdmin = async () => {
    await api.adminLogout(); // ✅ calls /admin/logout
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