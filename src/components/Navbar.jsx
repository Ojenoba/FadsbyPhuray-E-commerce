// src/components/Navbar.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, Heart, Search } from "lucide-react";
import { useAuth } from "@/context/AuthProvider";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartRef = useRef(null);

  const { isLoggedIn, user, logout, loading } = useAuth();
  const { cartItems, cartCount, cartTotal } = useCart();

  // Close mini cart when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Wishlist", href: "/wishlist" },
  ];

  return (
    <nav className="w-full bg-white border-b-2 border-[#FF6B35] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#FF6B35] font-sora">
          FADs by PHURAY
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {menuItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[#8B4513] hover:text-[#FF6B35] font-medium transition"
            >
              {label}
            </Link>
          ))}

          {/* Search */}
          <Link href="/search" className="text-[#8B4513] hover:text-[#FF6B35] transition">
            <Search size={20} />
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="text-[#8B4513] hover:text-[#FF6B35] transition">
            <Heart size={20} />
          </Link>

          {/* Cart with mini dropdown */}
          <div className="relative" ref={cartRef}>
            <button
              onClick={() => setCartOpen((v) => !v)}
              className="relative text-[#8B4513] hover:text-[#FF6B35] transition"
              aria-expanded={cartOpen}
              aria-haspopup="true"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B35] text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {cartOpen && (
              <div
                className="absolute right-0 mt-3 w-80 bg-white border border-[#E8D4C4] rounded-lg shadow-xl z-50"
                role="dialog"
                aria-label="Mini cart"
              >
                <div className="p-4 max-h-64 overflow-y-auto">
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between mb-4">
                        <img
                          src={item.image_url || "/placeholder.jpg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 px-3">
                          <h4 className="text-sm font-semibold text-[#8B4513]">{item.name}</h4>
                          <p className="text-xs text-gray-600">
                            {item.quantity} × ₦{Number(item.price).toLocaleString()}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-[#FF6B35]">
                          ₦{(Number(item.price) * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-gray-500">Your cart is empty.</p>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-[#E8D4C4] p-4">
                    <div className="flex justify-between mb-4">
                      <span className="font-semibold text-[#8B4513]">Subtotal:</span>
                      <span className="font-bold text-[#FF6B35]">₦{cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href="/cart"
                        className="flex-1 px-4 py-2 bg-gray-200 text-[#8B4513] rounded-lg text-center hover:bg-gray-300 transition"
                        onClick={() => setCartOpen(false)}
                      >
                        View Cart
                      </Link>
                      <Link
                        href="/checkout"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg text-center font-bold hover:from-[#E55A24] hover:to-[#FF7542] transition"
                        onClick={() => setCartOpen(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Auth */}
          {loading ? (
            <span className="text-gray-500">Loading...</span>
          ) : isLoggedIn ? (
            <>
              {user?.role === "admin" && (
                <Link href="/admin" className="text-[#8B4513] hover:text-[#FF6B35] font-medium">
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Sign Out
              </button>
            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/account/signin" className="text-[#8B4513] hover:text-[#FF6B35] font-medium">
                Login
              </Link>
              <Link href="/account/signup" className="text-[#8B4513] hover:text-[#FF6B35] font-medium">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Toggle menu"
          className="md:hidden p-2 rounded-lg border-2 border-[#FF6B35] text-[#FF6B35]"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t-2 border-[#E8D4C4] shadow-lg">
          <div className="flex flex-col p-4 space-y-4">
            {menuItems.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setIsOpen(false)}
                className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
              >
                {label}
              </Link>
            ))}

            <Link
              href="/search"
              onClick={() => setIsOpen(false)}
              className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
            >
              Search
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
            >
              Wishlist
            </Link>

            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="relative text-[#8B4513] hover:text-[#FF6B35] font-medium"
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-[#FF6B35] text-white text-xs rounded-full px-2">
                  {cartCount}
                </span>
              )}
            </Link>

            {loading ? (
              <span className="text-gray-500">Loading...</span>
            ) : isLoggedIn ? (
              <>
                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => {
                    setIsOpen(false);
                    logout();
                  }}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/account/signin"
                  onClick={() => setIsOpen(false)}
                  className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/account/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-[#8B4513] hover:text-[#FF6B35] font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}