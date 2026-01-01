"use client";

import { AuthProvider } from "@/context/AuthProvider";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientProviders({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <AdminAuthProvider>
            {children}
          </AdminAuthProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}