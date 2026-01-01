"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/utils/api";
import { mockProducts } from "@/utils/mockData";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ["products", categoryParam],
    queryFn: async () => {
      try {
        const res = await api.getProducts();
        let fetched = Array.isArray(res) ? res : res.data || [];

        let combined = [...fetched, ...mockProducts];

        if (categoryParam && categoryParam !== "All") {
          combined = combined.filter(
            (p) => p.category?.toLowerCase() === categoryParam.toLowerCase()
          );
        }

        return combined;
      } catch (err) {
        console.error("Error fetching products:", err);
        return categoryParam && categoryParam !== "All"
          ? mockProducts.filter(
              (p) => p.category?.toLowerCase() === categoryParam.toLowerCase()
            )
          : mockProducts;
      }
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#8B4513] mb-8">
        {categoryParam ? `${categoryParam} Products` : "All Products"}
      </h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((p) => {
            // ✅ Always link to /products/[param]
            const href = `/products/${p.slug || p._id || p.id}`;
            return (
              <div key={p._id || p.id} className="bg-white rounded-lg border p-4">
                <a href={href}>
                  <img
                    src={p.image_url || p.images?.[0] || "/placeholder.jpg"}
                    alt={p.name}
                    className="w-full h-48 object-cover"
                  />
                </a>
                <h4 className="font-bold text-[#8B4513] mt-2">{p.name}</h4>
                <p className="text-[#666] text-sm">{p.description}</p>
                <span className="text-2xl font-bold text-[#FF6B35]">
                  ₦{p.price}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}