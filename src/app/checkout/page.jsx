"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import useUser from "@/utils/useUser";

export default function CheckoutPage() {
  const { data: user, loading } = useUser();
  const [searchParams, setSearchParams] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    address: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
      return;
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams({
        total: parseFloat(params.get("total")) || 0,
      });

      if (user) {
        setFormData({
          email: user.email || "",
          phone: "",
          fullName: user.name || "",
          address: "",
        });
      }
    }
  }, [user, loading]);

  const handlePayment = async () => {
    try {
      setError("");
      const res = await fetch("http://localhost:5000/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: searchParams.total,
          email: formData.email,
          name: formData.fullName,
        }),
      });

      const data = await res.json();

      if (data?.status === "success" && data?.data?.link) {
        window.location.href = data.data.link; // redirect to Flutterwave checkout
      } else {
        setError("Payment initiation failed");
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Error initiating payment");
    }
  };

  if (loading || !searchParams) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white">
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <a href="/cart" className="p-2 rounded-lg hover:bg-[#FFF5E6]">
            <ArrowLeft size={24} className="text-[#FF6B35]" />
          </a>
          <h1 className="text-2xl font-bold text-[#8B4513] font-sora">Checkout</h1>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex gap-3">
            <AlertCircle size={20} className="text-red-600" />
            <div>
              <p className="font-semibold text-red-900">Payment Error</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Payment Details</h2>

          {/* Inputs for name, email, phone, address */}
          {/* ... keep your existing form fields ... */}

          <button
            onClick={handlePayment}
            className="w-full px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg font-semibold hover:from-[#E55A24] hover:to-[#FF7542] transition-all"
          >
            Proceed to Payment (₦{searchParams.total.toLocaleString()})
          </button>
        </div>
      </div>
    </div>
  );
}