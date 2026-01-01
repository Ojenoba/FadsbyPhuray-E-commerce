import { useAuth } from "@/context/AuthProvider";

export function useApiClient() {
  const { token } = useAuth();
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

  const apiClient = async (endpoint, options = {}) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };

      // ✅ Attach Authorization header if token exists
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        credentials: "include", // important if you rely on cookies
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error.message);
      return { success: false, error: error.message };
    }
  };

  return { apiClient };
}