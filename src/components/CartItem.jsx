"use client";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        {item.image_url || item.image ? (
          <img
            src={item.image_url || item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 rounded" />
        )}
        <div>
          <h3 className="font-semibold text-[#8B4513]">{item.name}</h3>
          <p className="text-sm text-gray-600">
            ₦{Number(item.price).toLocaleString()} × {item.quantity}
          </p>
          {/* Optional: show variant info */}
          {(item.size || item.color) && (
            <p className="text-xs text-gray-500">
              {[item.size, item.color].filter(Boolean).join(" • ")}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item.lineKey)} // ✅ remove by lineKey
        className="text-red-600 hover:text-red-800 font-medium"
      >
        Remove
      </button>
    </div>
  );
}