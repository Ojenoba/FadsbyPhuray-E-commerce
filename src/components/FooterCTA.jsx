"use client";
import Link from "next/link";
import {
  ShoppingBag,
  Heart,
  ShoppingBasket,
  Phone,
  FileText,
  Truck,
  User,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { useCart } from "@/context/CartContext"; // ✅ connect to cart

export default function Footer() {
  const { cartCount } = useCart(); // ✅ get live cart count

  return (
    <footer className="bg-[#FFF5E6] border-t-2 border-[#FF6B35] mt-16">
      {/* Top Sections */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-bold text-[#8B4513] mb-4">Shop</h3>
          <ul className="space-y-2 text-[#8B4513] font-medium">
            <li>
              <Link
                href="/products"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <ShoppingBag size={16} /> Products
              </Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-[#FF6B35]">
                Categories
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <Heart size={16} /> Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="/cart"
                className="relative hover:text-[#FF6B35] flex items-center gap-2"
              >
                <ShoppingBasket size={16} /> Cart
                {cartCount > 0 && (
                  <span className="ml-2 bg-[#FF6B35] text-white text-xs rounded-full px-2">
                    {cartCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-bold text-[#8B4513] mb-4">Company</h3>
          <ul className="space-y-2 text-[#8B4513] font-medium">
            <li>
              <Link href="/about" className="hover:text-[#FF6B35]">
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <Phone size={16} /> Contact
              </Link>
            </li>
            <li>
              <Link
                href="/faq"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <FileText size={16} /> FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="text-lg font-bold text-[#8B4513] mb-4">Legal</h3>
          <ul className="space-y-2 text-[#8B4513] font-medium">
            <li>
              <Link
                href="/terms"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <FileText size={16} /> Terms
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <User size={16} /> Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="hover:text-[#FF6B35] flex items-center gap-2"
              >
                <Truck size={16} /> Shipping
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Brand + CTA */}
      <div className="bg-gradient-to-r from-[#FF6B35] via-[#FF8555] to-[#FF6B35] text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-sora">
          FADs by PHURAY
        </h2>
        <p className="text-[#FFE8CC] mb-6">
          Fascinating & Trendy Fashion at Affordable Prices
        </p>
        <Link
          href="/products"
          className="inline-block px-8 py-3 bg-white text-[#FF6B35] font-bold rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Start Shopping Now
        </Link>
      </div>

      {/* Bottom Utility with Social Media */}
      <div className="bg-white text-center py-6 border-t border-[#E8D4C4]">
        <div className="flex justify-center gap-6 mb-4">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="text-[#8B4513] hover:text-[#FF6B35] transition"
          >
            <Instagram size={22} />
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="text-[#8B4513] hover:text-[#FF6B35] transition"
          >
            <Facebook size={22} />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="text-[#8B4513] hover:text-[#FF6B35] transition"
          >
            <Twitter size={22} />
          </Link>
        </div>
        <p className="text-sm text-[#8B4513]">
          &copy; {new Date().getFullYear()} FADs by PHURAY. All rights reserved.
        </p>
      </div>
    </footer>
  );
}