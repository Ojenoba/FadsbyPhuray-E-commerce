// API Configuration
// Update the BASE_URL to match your backend server address
export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Orders endpoints
export const ORDERS_API = {
  LIST: "/orders", // just the endpoint, fetchAPI will prepend API_BASE_URL
  UPDATE: (id) => `/orders/${id}`,
  CANCEL: (id) => `/orders/${id}/cancel`,
  MARK_SHIPPED: (id) => `/orders/${id}/ship`,
};

// Export helper to fetch with error handling
export const fetchAPI = async (endpoint, options = {}) => {
  const token = localStorage.getItem("fads_admin_token"); // or sessionStorage if you prefer

  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid JSON response from API");
  }

  if (!res.ok) {
    throw new Error(data.error || `API Error: ${res.status} ${res.statusText}`);
  }

  return data;
};