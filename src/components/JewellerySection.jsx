"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/utils/api"; // centralized API helper

export default function JewellerySection({ limit = 6 }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJewellery = async () => {
      try {
        const data = await api.getProducts();
        let fetched = data.data || [];

        // ✅ Filter only jewellery products
        fetched = fetched.filter((p) => p.category === "Jewellery");

        // ✅ Apply limit if provided
        fetched = fetched.slice(0, limit);

        setProducts(fetched);
      } catch (err) {
        console.error("Error fetching jewellery products:", err);
      } finally {
        setLoading(false);
      }
    };
    loadJewellery();
  }, [limit]);

  if (loading) {
    return <div className="text-center py-8">Loading jewellery...</div>;
  }

  if (!products.length) {
    return <p className="text-center py-8">No jewellery products available.</p>;
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 bg-white rounded-lg shadow-sm">
      <h2 className="text-3xl font-bold text-[#8B4513] mb-8 text-center font-sora">
        Jewellery Collection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <Link
            key={p._id || p.id}
            href={`/products/${p._id || p.id}`}
            className="group bg-[#FFF5E6] rounded-lg overflow-hidden border border-[#E8D4C4] hover:shadow-lg transition"
          >
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              <img
                src={p.image_url || p.images?.[0] || "/placeholder.jpg"}
                alt={p.name || "Product image"}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-[#8B4513] mb-1 font-sora">
                {p.name}
              </h3>
              <span className="text-lg font-bold text-[#FF6B35]">
                ₦{p.price?.toLocaleString() ?? 0}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}