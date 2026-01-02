"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ admin context

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const { loginAdmin } = useAdminAuth(); // ✅ calls api.adminLogin

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await loginAdmin(email, password);
      router.push("/admin"); // ✅ redirect to Admin Dashboard
    } catch (err) {
      setError(err.message || "Invalid admin credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35]"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-[#FF6B35] focus:border-[#FF6B35]"
        />
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="w-full bg-[#FF6B35] text-white py-2 rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
      >
        Sign In
      </button>
    </form>
  );
}