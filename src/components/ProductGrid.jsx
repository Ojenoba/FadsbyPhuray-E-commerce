"use client";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
  if (!products?.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          // Use MongoDB's _id as the unique key
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}