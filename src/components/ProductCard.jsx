"use client";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // ✅ use slug if available, fallback to _id
  const href = product.slug ? `/products/${product.slug}` : `/products/${product._id}`;

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <a href={href}>
        <img
          src={product.image_url || product.images?.[0] || "/placeholder.jpg"}
          alt={product.name || "Product image"}
          className="w-full h-48 object-cover rounded-md"
        />
      </a>
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">₦{product.price?.toLocaleString() ?? 0}</p>
      <button
        onClick={() => addToCart(product)}
        className="bg-[#FF6B35] text-white px-4 py-2 mt-2 rounded hover:bg-[#E55A24]"
      >
        Add to Cart
      </button>
    </div>
  );
}