"use client";

import { useAuth } from "../../context/AuthProvider";
import { useState, useEffect } from "react";
import { ArrowLeft, Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { user, isLoggedIn, token, loading } = useAuth();
  const router = useRouter();

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(true);

  useEffect(() => {
    if (loading) return;

    if (isLoggedIn && user?.id) {
      fetchWishlist();
    } else {
      // Guests: load wishlist from localStorage
      const stored = localStorage.getItem("guest_wishlist");
      setWishlist(stored ? JSON.parse(stored) : []);
      setWishlistLoading(false);
    }
  }, [isLoggedIn, user, loading]);

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (isLoggedIn && user?.id) {
      try {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify({ product_id: productId, quantity: 1 }),
          credentials: "include",
        });
        if (res.ok) alert("Added to cart!");
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Guest: store in localStorage
      const stored = localStorage.getItem("guest_cart");
      const guestCart = stored ? JSON.parse(stored) : [];
      const updated = [...guestCart, { id: productId, quantity: 1 }];
      localStorage.setItem("guest_cart", JSON.stringify(updated));
      alert("Added to cart!");
    }
  };

  const handleRemoveFromWishlist = async (itemId) => {
    if (isLoggedIn && user?.id) {
      try {
        const res = await fetch(`/api/wishlist/${itemId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          credentials: "include",
        });
        if (res.ok) {
          setWishlist(wishlist.filter((item) => item.id !== itemId));
        }
      } catch (error) {
        console.error("Error removing from wishlist:", error);
      }
    } else {
      // Guest: update localStorage
      const updated = wishlist.filter((item) => item.id !== itemId);
      setWishlist(updated);
      localStorage.setItem("guest_wishlist", JSON.stringify(updated));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24] transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </a>
          <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
            My Wishlist ({wishlist.length})
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {wishlistLoading ? (
          <div className="text-center py-12 text-[#666]">
            Loading wishlist...
          </div>
        ) : wishlist.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-12 text-center">
            <Heart size={48} className="mx-auto text-[#E8D4C4] mb-4" />
            <p className="text-[#666] mb-4">Your wishlist is empty</p>
            <a
              href="/search"
              className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
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
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm text-[#FF6B35] font-semibold">
                      {"⭐".repeat(Math.round(item.average_rating || 0))}
                    </span>
                    <span className="text-xs text-[#999]">
                      ({item.rating_count || 0})
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#FF6B35]">
                      ₦{item.price}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAddToCart(item.product_id)}
                      className="flex-1 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}