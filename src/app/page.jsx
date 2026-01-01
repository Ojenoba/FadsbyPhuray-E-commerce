"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import Slideshow from "@/components/Slideshow";
import ProductsList from "@/components/ProductsList";
import FooterCTA from "@/components/FooterCTA";
import { api } from "@/utils/api";

export default function Home() {
  const [categories, setCategories] = useState(["All"]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(["All", ...data.data]); // prepend "All"
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Slideshow */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <Slideshow limit={5} />
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-8 font-sora text-center">
          Featured Products
        </h2>
        <ProductsList limit={6} category={selectedCategory} />
      </section>

      {/* Call to Action Footer */}
      <FooterCTA />
    </div>
  );
}