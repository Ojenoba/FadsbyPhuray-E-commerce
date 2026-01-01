"use client";

import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";

export default function CheckoutFailurePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Failure Icon */}
        <div className="mb-6 flex justify-center">
          <AlertCircle size={80} className="text-red-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-600 mb-3 font-sora">
          Payment Failed
        </h1>

        {/* Message */}
        <p className="text-[#666] mb-6">
          We could not verify your payment. Please try again or contact support
          if the issue persists.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push("/checkout")}
            className="block w-full px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
          >
            Retry Payment
          </button>

          <button
            onClick={() => router.push("/contact")}
            className="block w-full px-6 py-3 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}