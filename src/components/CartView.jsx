"use client";

import { Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthProvider";
import CheckoutButton from "@/components/CheckoutButton";

export default function CartView() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal } = useCart();
  const { user } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center">
        <ShoppingBag size={48} className="mx-auto text-[#CCC] mb-4" />
        <p className="text-[#666] mb-4">Your cart is empty</p>
        <a
          href="/products"
          className="inline-block px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={item.lineKey || item._id || `cart-${index}`}
            className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden"
          >
            <div className="flex gap-4 p-4">
              {item.image_url && (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-bold text-[#8B4513] mb-2 font-sora">
                  {item.name}
                </h3>
                <p className="text-[#FF6B35] font-bold mb-3">
                  ₦{Number(item.price).toLocaleString()}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.lineKey, item.quantity - 1)
                    }
                    className="px-3 py-1 bg-[#E8D4C4] rounded hover:bg-[#D9C4B4] transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.lineKey, parseInt(e.target.value))
                    }
                    className="w-12 px-2 py-1 border-2 border-[#E8D4C4] rounded text-center"
                  />
                  <button
                    onClick={() =>
                      updateQuantity(item.lineKey, item.quantity + 1)
                    }
                    className="px-3 py-1 bg-[#E8D4C4] rounded hover:bg-[#D9C4B4] transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-[#FF6B35] mb-4">
                  ₦{(Number(item.price) * item.quantity).toLocaleString()}
                </p>
                <button
                  onClick={() => removeFromCart(item.lineKey)}
                  className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 sticky top-24">
          <h3 className="text-xl font-bold text-[#8B4513] mb-6 font-sora">
            Order Summary
          </h3>
          <div className="flex justify-between text-[#666] mb-4">
            <span>Subtotal</span>
            <span>₦{cartTotal.toLocaleString()}</span>
          </div>
          <div className="bg-[#FFF5E6] rounded-lg p-4 mb-6 flex justify-between items-center">
            <span className="font-bold text-[#8B4513]">Total:</span>
            <span className="text-2xl font-bold text-[#FF6B35]">
              ₦{cartTotal.toLocaleString()}
            </span>
          </div>
          <CheckoutButton
            amount={cartTotal}
            email={user?.email || "guest@example.com"}
            name={user?.name || "Guest User"}
          />
        </div>
      </div>
    </div>
  );
}