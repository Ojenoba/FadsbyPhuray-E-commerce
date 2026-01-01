"use client";

import { useState, useEffect } from "react";
import { Package } from "lucide-react";
import useUser from "@/utils/useUser";
import Link from "next/link";
import { api } from "@/utils/api"; // ✅ use your api client

export default function CategoriesList() {
  const { data: user } = useUser();
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.getProducts(); // ✅ fetches { success, data }
        const products = Array.isArray(res.data) ? res.data : []; // ✅ use res.data

        // Group products by category

        const grouped = products.reduce((acc, product) => {
          const cat = product.category || "Uncategorized";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
      } catch (error) {
        console.error("Error fetching products:", error);
        setGroupedProducts({});
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    if (!user) {
      window.location.href = "/account/signin";
      return;
    }
    try {
      await api.addToCart({ productId, quantity: 1 }); // ✅ use api.addToCart
      alert("Added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p className="text-[#666]">Loading categories...</p>;

  const categories = Object.keys(groupedProducts);

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#8B4513] mb-6">Browse Categories</h2>
      {categories.length === 0 ? (
        <p>No categories available.</p>
      ) : (
        categories.map((cat) => (
          <div key={cat} className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#FF6B35]">{cat}</h3>
              <Link
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="text-sm font-semibold text-[#8B4513] hover:text-[#FF6B35] transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.isArray(groupedProducts[cat]) &&
                groupedProducts[cat].slice(0, 3).map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <a href={`/products/${product._id}`}>
                      <img
                        src={product.image_url || "/placeholder.jpg"}
                        alt={product.name}
                        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      />
                    </a>
                    <div className="p-4">
                      <a href={`/products/${product._id}`}>
                        <h4 className="font-bold text-[#8B4513] mb-2 font-sora hover:text-[#FF6B35] transition-colors">
                          {product.name}
                        </h4>
                      </a>
                      <p className="text-[#666] text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#FF6B35]">
                          ₦{Number(product.price).toLocaleString()}
                        </span>
                        <button
                          onClick={() => addToCart(product._id)}
                          className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}