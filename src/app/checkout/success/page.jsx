"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import useUser from "@/utils/useUser";

export default function CheckoutSuccessPage() {
  const { data: user, loading } = useUser();
  const [txRef, setTxRef] = useState(null);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/account/signin");
      return;
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const txRefParam = params.get("tx_ref");
      const transactionId = params.get("transaction_id");

      if (txRefParam && transactionId) {
        setTxRef(txRefParam);

        // ✅ Call backend verification route
        fetch(
          `http://localhost:5000/api/payments/verify?tx_ref=${txRefParam}&transaction_id=${transactionId}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              setVerified(true);
            } else {
              setError(
                "Payment could not be verified. Please contact support."
              );
            }
          })
          .catch(() => setError("Verification request failed."));
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {verified ? (
          <>
            <div className="mb-6 flex justify-center">
              <CheckCircle size={80} className="text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-[#8B4513] mb-3 font-sora">
              Order Confirmed!
            </h1>
            <p className="text-[#666] mb-2">
              Thank you for your purchase, {user.name}!
            </p>
            <p className="text-[#666] mb-6">
              Your payment has been verified successfully. You will receive an
              email confirmation shortly.
            </p>
            {txRef && (
              <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-4 mb-6">
                <p className="text-sm text-[#666] mb-1">
                  Transaction Reference:
                </p>
                <p className="font-mono font-bold text-[#FF6B35]">#{txRef}</p>
              </div>
            )}
            <div className="space-y-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="block w-full px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg font-semibold hover:from-[#E55A24] hover:to-[#FF7542] transition-all"
              >
                View Order Details
              </button>
              <button
                onClick={() => router.push("/")}
                className="block w-full px-6 py-3 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <AlertCircle size={80} className="text-red-500" />
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-3">
              Payment Verification Failed
            </h1>
            <p className="text-[#666] mb-6">
              {error ||
                "We could not verify your payment. Please try again or contact support."}
            </p>
            <button
              onClick={() => router.push("/checkout")}
              className="block w-full px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Retry Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
}