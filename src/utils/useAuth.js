// src/utils/useAuth.js
"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email, password) => {
    try {
      // NextAuth credentials provider
      const result = await signIn("credentials", {
        redirect: false, // prevent auto redirect
        email,
        password,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      // ✅ NextAuth automatically stores the token in the session
      // You can access it via session.accessToken
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: "/account/signin" });
  };

  return {
    loggedIn: status === "authenticated",
    user: session?.user || null,
    token: session?.accessToken || null,
    login,
    logout,
  };
}