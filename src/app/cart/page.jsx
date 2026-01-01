"use client";

import { useAuth } from "../../context/AuthProvider";
import { useCart } from "../../context/CartContext";
import { ArrowLeft, Trash2 } from "lucide-react";
import CheckoutButton from "@/components/CheckoutButton"; // ✅ import reusable button

export default function CartPage() {
  const { user, loading } = useAuth();
  const { cartItems, removeFromCart, cartTotal } = useCart();

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
            My Cart ({cartItems.length})
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-12 text-center">
            <p className="text-[#666] mb-4">Your cart is empty</p>
            <a
              href="/search"
              className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {cartItems.map((item, index) => (
                <div
                  key={item.lineKey || item._id || item.id}
                  className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <a href={`/products/${item.id}`}>
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                      />
                    )}
                  </a>

                  <div className="p-4">
                    <a href={`/products/${item.id}`}>
                      <h3 className="font-bold text-[#8B4513] mb-2 font-sora hover:text-[#FF6B35] transition-colors">
                        {item.name}
                      </h3>
                    </a>

                    <p className="text-[#666] text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-[#FF6B35]">
                        ₦{Number(item.price).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => removeFromCart(item.lineKey)}
                        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Section */}
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 text-right">
              <h2 className="text-xl font-bold text-[#8B4513] mb-4">
                Total: ₦{cartTotal.toLocaleString()}
              </h2>
              <CheckoutButton
                amount={cartTotal}
                email={user?.email || "guest@example.com"}
                name={user?.name || "Guest User"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}