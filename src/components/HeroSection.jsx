"use client";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-[#FF6B35] via-[#FF8555] to-[#FF6B35] text-white py-32 md:py-48">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Brand Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-sora leading-tight drop-shadow-lg">
          FADs by PHURAY
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl mb-10 text-[#FFE8CC] font-light italic max-w-2xl mx-auto">
          Fascinating & Trendy Fashion at Affordable Prices
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-10 py-4 text-white font-bold rounded-lg text-lg bg-gradient-to-r from-[#FF6B35] to-[#FF8555] hover:from-[#E55A24] hover:to-[#FF7542] transition-all shadow-lg hover:shadow-xl"
          >
            SHOP NOW
          </Link>
          <Link
            href="/categories"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg text-lg hover:bg-white hover:text-[#FF6B35] transition-all shadow-md hover:shadow-lg"
          >
            Browse Categories
          </Link>
        </div>
      </div>

      {/* Decorative background accents */}
      <div className="absolute inset-0 bg-[url('/patterns/fashion-bg.svg')] opacity-10 pointer-events-none"></div>
    </section>
  );
}