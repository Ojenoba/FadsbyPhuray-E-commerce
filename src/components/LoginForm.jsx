"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthProvider"; // ✅ user context

export default function LoginForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { login } = useAuth(); // ✅ now calls api.login + api.getSession

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [errorType, setErrorType] = useState("");

  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "not-logged-in") {
      setError(isAdmin ? "You must log in as admin" : "You must be logged in to view this page");
      setErrorType("warning");
    }
    if (reason === "not-admin") {
      setError("Admins only — access denied");
      setErrorType("danger");
    }
  }, [searchParams, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // ✅ login now fetches session and sets user in context
      const user = await login(email, password);
      console.log("✅ User logged in, redirecting...", user);

      // Redirect based on role
      if (isAdmin && user.role !== "admin") {
        setError("Admins only — access denied");
        setErrorType("danger");
        return;
      }

      const redirectPath = isAdmin ? "/admin/dashboard" : "/dashboard";
      console.log("🔄 Redirecting to:", redirectPath);
      
      // Small delay to ensure context state updates
      setTimeout(() => {
        router.push(redirectPath);
      }, 100);
    } catch (err) {
      console.error("❌ Login form error:", err);
      setError(err.message || "Login failed");
      setErrorType("danger");
    }
  };

  const alertClass =
    errorType === "danger"
      ? "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      : errorType === "warning"
      ? "bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4"
      : "text-red-500 mb-4";

  return (
    <div className="signin-container flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6">Sign In</h1>

        {error && <div className={alertClass}>{error}</div>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}