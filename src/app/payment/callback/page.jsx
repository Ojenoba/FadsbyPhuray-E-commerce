// src/app/payment/callback/page.jsx
"use client";
import { useEffect, useState } from "react";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("transaction_id");

    if (transactionId) {
      fetch(`/api/payments/verify?transaction_id=${transactionId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            setStatus("success");
          } else {
            setStatus("error");
          }
        })
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF5E6]">
      {status === "loading" && <p>Verifying payment...</p>}
      {status === "success" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">Payment Successful 🎉</h1>
          <p className="mt-4">Thank you for your purchase!</p>
          <a href="/products" className="mt-6 inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg">
            Continue Shopping
          </a>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Payment Failed ❌</h1>
          <p className="mt-4">Something went wrong verifying your payment.</p>
          <a href="/cart" className="mt-6 inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg">
            Back to Cart
          </a>
        </div>
      )}
    </div>
  );
}