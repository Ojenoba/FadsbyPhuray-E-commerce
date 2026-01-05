"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import useUser from "@/utils/useUser";
import { useApiClient } from "@/utils/apiClient";

export default function WithdrawalPage() {
  const { data: user, loading } = useUser();
  const [wallet, setWallet] = useState(null);
  const [withdrawals, setWithdrawals] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    bank_account_number: "",
    bank_code: "",
    bank_name: "",
    account_holder_name: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
      return;
    }

    if (user) {
      fetchWallet();
      fetchWithdrawals();
    }
  }, [user, loading]);

  const fetchWallet = async () => {
    try {
      const { apiClient } = useApiClient();
      const data = await apiClient("/wallet");
      setWallet(data?.wallet || null);
    } catch (error) {
      console.error("Error fetching wallet:", error);
    }
  };

  const fetchWithdrawals = async () => {
    try {
      const { apiClient } = useApiClient();
      const data = await apiClient("/withdrawals");
      setWithdrawals(data?.withdrawals || data?.data || []);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.amount ||
      !formData.bank_account_number ||
      !formData.bank_code ||
      !formData.bank_name ||
      !formData.account_holder_name
    ) {
      alert("All fields are required!");
      return;
    }

    const amount = parseFloat(formData.amount);
    if (amount <= 0 || amount > (wallet?.balance || 0)) {
      alert("Invalid amount!");
      return;
    }

    setIsSubmitting(true);

    try {
      const { apiClient } = useApiClient();
      const resp = await apiClient("/withdrawals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          bank_account_number: formData.bank_account_number,
          bank_code: formData.bank_code,
          bank_name: formData.bank_name,
          account_holder_name: formData.account_holder_name,
        }),
      });

      if (resp && resp.success) {
        alert("Withdrawal request submitted successfully!");
        setFormData({
          amount: "",
          bank_account_number: "",
          bank_code: "",
          bank_name: "",
          account_holder_name: "",
        });
        setShowForm(false);
        fetchWallet();
        fetchWithdrawals();
      } else {
        alert(resp.error || "Error submitting withdrawal request");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting withdrawal request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/dashboard"
              className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
            >
              <ArrowLeft size={24} className="text-[#FF6B35]" />
            </a>
            <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
              Withdrawal Requests
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Wallet Balance */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#8B4513] text-white rounded-lg p-8 mb-8 shadow-lg">
          <p className="text-[#FFE8CC] mb-2">Available Balance</p>
          <h2 className="text-5xl font-bold font-sora">
            ₦
            {(wallet?.balance || 0).toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </h2>
        </div>

        {/* Withdrawal Form */}
        {!showForm ? (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors mb-8"
          >
            <Send size={20} />
            Request Withdrawal
          </button>
        ) : (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-8">
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Submit Withdrawal Request
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Amount (₦) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  placeholder={`Max: ₦${(wallet?.balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  max={wallet?.balance || 0}
                  required
                />
                <p className="text-xs text-[#666] mt-1">
                  Available: ₦
                  {(wallet?.balance || 0).toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.account_holder_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        account_holder_name: e.target.value,
                      })
                    }
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Bank Code *
                  </label>
                  <input
                    type="text"
                    value={formData.bank_code}
                    onChange={(e) =>
                      setFormData({ ...formData, bank_code: e.target.value })
                    }
                    placeholder="e.g., 033"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Bank Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.bank_account_number}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        bank_account_number: e.target.value,
                      })
                    }
                    placeholder="10 digits"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    maxLength="20"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bank_name}
                    onChange={(e) =>
                      setFormData({ ...formData, bank_name: e.target.value })
                    }
                    placeholder="e.g., GTBank, Access Bank"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <p className="text-sm text-yellow-700">
                  <strong>Note:</strong> Withdrawals are processed within 24-48
                  hours. Please ensure your bank details are correct.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white rounded-lg font-semibold hover:from-[#E55A24] hover:to-[#FF7542] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Processing..." : "Submit Withdrawal"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData({
                      amount: "",
                      bank_account_number: "",
                      bank_code: "",
                      bank_name: "",
                      account_holder_name: "",
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Previous Withdrawals */}
        <div>
          <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
            Withdrawal History
          </h3>
          {withdrawals.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center">
              <p className="text-[#666]">No withdrawal requests yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {withdrawals.map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-sm text-[#666]">
                        Request ID: {withdrawal.id}
                      </p>
                      <p className="text-sm text-[#666]">
                        {new Date(withdrawal.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        withdrawal.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : withdrawal.status === "approved"
                            ? "bg-blue-100 text-blue-700"
                            : withdrawal.status === "rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {withdrawal.status.charAt(0).toUpperCase() +
                        withdrawal.status.slice(1)}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#666]">Amount</p>
                      <p className="font-bold text-[#FF6B35]">
                        ₦
                        {withdrawal.amount.toLocaleString("en-NG", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#666]">Account</p>
                      <p className="font-bold text-[#8B4513]">
                        {withdrawal.bank_account_number}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-[#666]">
                    {withdrawal.bank_name} • {withdrawal.account_holder_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
