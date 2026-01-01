"use client";

import Sidebar from "@/components/Sidebar";
import useUser from "@/utils/useUser";
import { ShoppingCart } from "lucide-react";
import CategoriesList from "@/components/CategoriesList";

export default function CategoriesPage() {
  const { data: user } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      <Sidebar />

      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#8B4513] font-playfair">
            Shop by Category
          </h1>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <a
                  href="/cart"
                  className="relative p-2 rounded-lg bg-[#FFF5E6] hover:bg-[#FFE8CC] transition-colors"
                >
                  <ShoppingCart size={24} className="text-[#FF6B35]" />
                </a>
                <a
                  href="/account/logout"
                  className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Sign Out
                </a>
              </>
            ) : (
              <>
                <a
                  href="/account/signin"
                  className="px-4 py-2 rounded-lg bg-[#8B4513] text-white font-semibold hover:bg-[#6B3410] transition-colors"
                >
                  Sign In
                </a>
                <a
                  href="/account/signup"
                  className="px-4 py-2 rounded-lg bg-[#FF6B35] text-white font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <CategoriesList />
      </main>

      <footer className="bg-[#8B4513] text-white mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-xs text-white/80">
            © {new Date().getFullYear()} Your Store. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}