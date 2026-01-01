"use client";

import { useState, useEffect } from "react";
import { Heart, Trash2 } from "lucide-react";
import useUser from "@/utils/useUser";

export default function WishlistView() {
  const { data: user, loading } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
      return;
    }
    if (user) fetchWishlist();
  }, [user, loading]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.data || []); // ✅ use data.data
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });
      if (res.ok) {
        alert("Added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      const res = await fetch(`/api/wishlist/${itemId}`, { method: "DELETE" });
      if (res.ok) {
        setWishlist(wishlist.filter((item) => item._id !== itemId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return null;

  if (wishlistLoading) {
    return <div className="text-center py-12 text-[#666]">Loading wishlist...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-12 text-center">
        <Heart size={48} className="mx-auto text-[#E8D4C4] mb-4" />
        <p className="text-[#666] mb-4">Your wishlist is empty</p>
        <button
          onClick={() => (window.location.href = "/products")}
          className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div
          key={item._id} // ✅ use MongoDB _id
          className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden hover:shadow-lg transition-shadow"
        >
          <a href={`/products/${item.product_id}`}>
            {item.image_url && (
              <img
                src={item.image_url}
                alt={item.name}
                className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
              />
            )}
          </a>
          <div className="p-4">
            <a href={`/products/${item.product_id}`}>
              <h3 className="font-bold text-[#8B4513] mb-2 font-sora hover:text-[#FF6B35] transition-colors">
                {item.name}
              </h3>
            </a>
            <p className="text-[#666] text-sm mb-3 line-clamp-2">
              {item.description || "No description available."}
            </p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-[#FF6B35] font-semibold">
                {"⭐".repeat(Math.round(item.average_rating || 0))}
              </span>
              <span className="text-xs text-[#999]">({item.rating_count || 0})</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-[#FF6B35]">₦{item.price ?? 0}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleAddToCart(item.product_id)}
                className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => handleRemoveFromWishlist(item._id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}