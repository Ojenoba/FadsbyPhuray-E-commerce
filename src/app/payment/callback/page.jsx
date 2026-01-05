// src/app/payment/callback/page.jsx
"use client";
import { useEffect, useState } from "react";
import { useApiClient } from "@/utils/apiClient";

export default function PaymentCallbackPage() {
  const [status, setStatus] = useState("loading");

  const { apiClient } = useApiClient();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("transaction_id");

    const verify = async () => {
      if (!transactionId) return setStatus("error");
      try {
        const data = await apiClient(`/api/payments/verify?transaction_id=${transactionId}`);
        if (data && data.status === "success") setStatus("success");
        else setStatus("error");
      } catch (e) {
        setStatus("error");
      }
    };

    verify();
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