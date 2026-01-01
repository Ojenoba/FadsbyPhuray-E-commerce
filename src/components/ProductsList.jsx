// src/components/ProductsList.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api";

export default function ProductsList({ limit, category, variant = "grid" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await api.getProducts();
        let fetched = Array.isArray(data) ? data : data?.data || [];

        // Apply category filter if provided
        if (category && category !== "All") {
          fetched = fetched.filter(
            (p) => p.category?.toLowerCase() === category.toLowerCase()
          );
        }

        // Apply limit if provided
        if (limit) {
          fetched = fetched.slice(0, limit);
        }

        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [limit, category]);

  if (loading)
    return <div className="text-center py-8 text-[#666]">Loading products...</div>;
  if (!products.length)
    return <p className="text-center py-8 text-[#666]">No products available.</p>;

  // Jewellery variant
  if (variant === "jewellery") {
    return (
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-lg shadow-sm">
        <h2 className="text-3xl font-bold text-[#8B4513] mb-8 text-center font-sora">
          Jewellery Collection
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => {
            const href = p.slug ? `/products/${p.slug}` : `/products/${p._id || p.id}`;
            return (
              <Link
                key={p._id || p.id}
                href={href}
                className="group bg-[#FFF5E6] rounded-xl overflow-hidden border border-[#E8D4C4] hover:shadow-xl transition-transform transform hover:-translate-y-1"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={p.image_url || p.images?.[0] || "/placeholder.jpg"}
                    alt={p.name || "Product image"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#8B4513] mb-1 font-sora group-hover:text-[#FF6B35] transition-colors">
                    {p.name}
                  </h3>
                  <span className="text-lg font-bold text-[#FF6B35]">
                    ₦{p.price?.toLocaleString() ?? 0}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    );
  }

  // Default grid variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {products.map((p) => {
        const href = p.slug ? `/products/${p.slug}` : `/products/${p._id || p.id}`;
        return (
          <div
            key={p._id || p.id}
            className="bg-white border border-[#E8D4C4] rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 flex flex-col"
          >
            <div className="h-56 overflow-hidden rounded-t-xl">
              <img
                src={p.image_url || p.images?.[0] || "/placeholder.jpg"}
                alt={p.name || "Product image"}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-[#8B4513] mb-2 font-sora hover:text-[#FF6B35] transition-colors">
                {p.name}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {p.description || "No description available."}
              </p>
              <p className="text-2xl font-bold text-[#FF6B35] mb-6">
                ₦{p.price?.toLocaleString() ?? 0}
              </p>
              <Link
                href={href}
                className="mt-auto bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white py-3 rounded-lg text-center font-bold hover:from-[#E55A24] hover:to-[#FF7542] transition-all shadow-md hover:shadow-lg"
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}