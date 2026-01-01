// src/components/CheckoutButton.jsx
"use client";
import { useState } from "react";

export default function CheckoutButton({ amount, email, name }) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!amount || amount <= 0) {
      alert("Your cart is empty or invalid amount.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, name }),
      });

      if (!res.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await res.json();

      if (data?.status === "success" && data?.data?.link) {
        // ✅ Redirect to Flutterwave checkout
        window.location.href = data.data.link;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Error initiating payment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`px-6 py-3 rounded-lg font-bold transition ${
        loading
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-[#FF6B35] text-white hover:bg-[#E55A24]"
      }`}
    >
      {loading ? "Processing..." : `Pay ₦${amount?.toLocaleString()}`}
    </button>
  );
}