"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { api } from "@/utils/api";

export default function Slideshow({ limit = 5, category }) {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const data = await api.getProducts();
        let fetched = data.data || [];

        if (category && category !== "All") {
          fetched = fetched.filter((p) => p.category === category);
        }

        fetched = fetched.slice(0, limit);
        setSlides(fetched);
      } catch (err) {
        console.error("Error fetching slideshow products:", err);
      }
    };
    loadSlides();
  }, [limit, category]);

  if (!slides.length) return null;

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  const slide = slides[currentSlide];

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#8B4513] mb-8 text-center font-sora">
        Featured Slideshow
      </h2>

      <div className="relative bg-white rounded-xl border-2 border-[#E8D4C4] overflow-hidden shadow-lg">
        {/* Image area */}
        <div className="relative h-96 bg-[#FFF5E6]">
          {slide?.image_url || slide?.images?.[0] ? (
            <img
              src={slide.image_url || slide.images?.[0]}
              alt={slide.name}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#E8D4C4]">
              <Package size={48} className="text-gray-400" />
            </div>
          )}

          {/* Overlay caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
            <h4 className="font-bold text-lg font-sora mb-2">{slide?.name}</h4>
            <p className="text-sm mb-4 line-clamp-2">{slide?.description}</p>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-[#FF6B35] bg-white px-3 py-1 rounded">
                ₦{slide?.price?.toLocaleString()}
              </span>
              <Link
                href={`/products/${slide?._id}`}
                className="px-6 py-2 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg font-semibold hover:from-[#E55A24] hover:to-[#FF7542] transition-all shadow-md"
              >
                View Details
              </Link>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            <ChevronLeft size={24} className="text-[#FF6B35]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition"
          >
            <ChevronRight size={24} className="text-[#FF6B35]" />
          </button>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === idx ? "bg-[#FF6B35] scale-110" : "bg-[#E8D4C4] hover:bg-[#FF8555]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}