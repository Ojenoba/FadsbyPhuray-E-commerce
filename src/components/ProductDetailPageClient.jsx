// src/components/ProductDetailPageClient.jsx
"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowLeft, Share2, Star } from "lucide-react";
import useUser from "@/utils/useUser";
import { useRecentlyViewed } from "@/utils/useRecentlyViewed";
import { api } from "@/utils/api";
import { useCart } from "@/context/CartContext";

export default function ProductDetailPageClient({
  product,
  reviews,
  relatedProducts,
  productId,
}) {
  const { data: user } = useUser();
  const { addViewed } = useRecentlyViewed();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [localReviews, setLocalReviews] = useState(Array.isArray(reviews) ? reviews : []);

  // Track recently viewed without re-run loops
  const lastViewedRef = useRef(null);
  useEffect(() => {
    const id = product?._id;
    if (!id) return;
    if (lastViewedRef.current === id) return;
    lastViewedRef.current = id;
    try {
      addViewed(id);
    } catch (e) {
      console.error("addViewed error:", e);
    }
  }, [product?._id]);

  const requireLogin = () => {
    if (!user) {
      window.location.href = "/account/signin?reason=not-logged-in";
      return false;
    }
    return true;
  };

  // Add to Cart via CartContext — includes size/color so lineKey is unique
  const handleAddToCart = () => {
    try {
      addToCart({
        ...product,
        quantity,
        size: selectedSize || null,
        color: selectedColor || null,
      });
      alert("Added to cart!");
      setQuantity(1);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleToggleWishlist = async () => {
    if (!requireLogin()) return;
    try {
      if (isInWishlist) {
        await api.removeFromWishlist(product._id);
        setIsInWishlist(false);
      } else {
        await api.addToWishlist(product._id);
        setIsInWishlist(true);
      }
    } catch (error) {
      console.error("Error toggling wishlist:", error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!requireLogin()) return;
    try {
      await api.submitReview({ productId: product._id, rating, reviewText });
      setRating(5);
      setReviewText("");
      setShowReviewForm(false);
      const refreshed = await api.getReviews(productId);
      setLocalReviews(refreshed?.data || []);
      alert("Review submitted!");
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Product not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/products" className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24]">
            <ArrowLeft size={24} />
            <span>Back</span>
          </a>
          {user && (
            <a href="/dashboard" className="text-[#8B4513] hover:text-[#FF6B35] font-semibold">
              Dashboard
            </a>
          )}
        </div>
      </header>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <img
            src={product.images?.[0] || product.image_url || "/placeholder.jpg"}
            alt={product.name || "Product image"}
            className="w-full h-96 object-cover rounded"
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description || "No description available."}</p>

            <div className="flex items-center gap-2 mb-2">
              <Star className="text-yellow-500" size={18} />
              <span className="text-sm text-gray-700">{product.rating ?? 0} / 5</span>
            </div>

            <p className="text-3xl font-bold text-[#FF6B35] mb-6">₦{product.price ?? 0}</p>

            {/* Size Selector */}
            {Array.isArray(product.sizes) && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Select size</option>
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Color Selector */}
            {Array.isArray(product.colors) && product.colors.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Color</label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="">Select color</option>
                  {product.colors.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3 mb-6">
              <label className="text-sm font-medium">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-20 border rounded px-2 py-1"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="bg-[#FF6B35] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#E55A24] transition"
              >
                Add to Cart
              </button>
              <button
                onClick={handleToggleWishlist}
                className={`px-6 py-3 rounded-lg font-bold transition ${
                  isInWishlist ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
              <button
                onClick={() => navigator.share?.({ title: product.name, url: window.location.href })}
                className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Share2 size={18} /> Share
              </button>
            </div>

            {/* Review form toggle */}
            <button
              onClick={() => setShowReviewForm((s) => !s)}
              className="text-[#8B4513] hover:text-[#FF6B35] font-semibold underline mb-4"
            >
              {showReviewForm ? "Hide review form" : "Write a review"}
            </button>

            {/* Review form */}
            {showReviewForm && (
              <form onSubmit={handleSubmitReview} className="mt-2 space-y-4">
                <label className="block">
                  <span className="text-sm font-medium">Rating (1–5)</span>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(Math.min(5, Math.max(1, Number(e.target.value))))}
                    className="border rounded px-2 py-1 ml-2"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-medium">Your review</span>
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={4}
                    className="w-full border rounded px-3 py-2"
                    placeholder="Share your thoughts..."
                  />
                </label>

                <button
                  type="submit"
                  className="bg-[#FF6B35] text-white px-5 py-2 rounded-lg font-bold hover:bg-[#E55A24] transition"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          {Array.isArray(localReviews) && localReviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {localReviews.map((r, index) => (
                <li
                  key={r._id || `${r.user || "anon"}-${r.createdAt || r.created_at || index}`}
                  className="border p-4 rounded"
                >
                  <p className="font-bold flex items-center gap-2">
                    Rating: {r.rating}
                    <Star className="text-yellow-500" size={16} />
                  </p>
                  <p className="mt-1">{r.reviewText}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(r.createdAt || r.created_at || Date.now()).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold mb-4">Related products</h3>
          {!Array.isArray(relatedProducts) || relatedProducts.length === 0 ? (
            <p>No related products available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((rp, index) => {
                const href = rp.slug ? `/products/${rp.slug}` : `/products/${rp._id}`;
                return (
                  <a
                    key={rp._id || rp.slug || `related-${index}`}
                    href={href}
                    className="border rounded-lg p-4 hover:shadow transition"
                  >
                    <img
                      src={rp.images?.[0] || rp.image_url || "/placeholder.jpg"}
                      alt={rp.name || "Product image"}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <p className="font-semibold">{rp.name}</p>
                    <p className="text-[#FF6B35] font-bold">₦{rp.price ?? 0}</p>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}