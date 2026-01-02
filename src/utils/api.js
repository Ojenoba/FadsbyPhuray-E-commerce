const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const api = {
  // 🛍 Products
  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  getProductById: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  getRelatedProducts: async (id) => {
    const res = await fetch(`${BASE_URL}/products/related/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch related products");
    return res.json();
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  // ⭐ Reviews
  getReviews: async (productId) => {
    const res = await fetch(`${BASE_URL}/reviews?productId=${productId}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  },

  submitReview: async ({ productId, rating, reviewText }) => {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, rating, reviewText }),
      credentials: "include", // 🔑 include cookies if needed
    });
    if (!res.ok) throw new Error("Failed to submit review");
    return res.json();
  },

  // 🛒 Cart
  addToCart: async ({ productId, quantity }) => {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId, quantity }),
      credentials: "include", // 🔑 ensures JWT cookie is sent
    });
    if (!res.ok) throw new Error("Failed to add to cart");
    return res.json();
  },

  // 💖 Wishlist
  addToWishlist: async (productId) => {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_id: productId }),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to add to wishlist");
    return res.json();
  },

  removeFromWishlist: async (productId) => {
    const res = await fetch(`${BASE_URL}/wishlist/${productId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to remove from wishlist");
    return res.json();
  },

  // 🔑 Auth (Users)
  login: async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  },

  register: async ({ username, email, password }) => {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },

  logout: async () => {
    const res = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Logout failed");
    return res.json();
  },

  getSession: async () => {
    const res = await fetch(`${BASE_URL}/auth/me`, { credentials: "include" });
    if (!res.ok) throw new Error("Session check failed");
    return res.json();
  },

  // 🔑 Admin
  adminLogin: async ({ email, password }) => {
    const res = await fetch(`${BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });
    if (!res.ok) throw new Error("Admin login failed");
    return res.json();
  },

  adminLogout: async () => {
    const res = await fetch(`${BASE_URL}/admin/logout`, {
      method: "POST",
      credentials: "include",
    });
    if (!res.ok) throw new Error("Admin logout failed");
    return res.json();
  },

  getAdminSession: async () => {
    const res = await fetch(`${BASE_URL}/admin/me`, { credentials: "include" });
    if (!res.ok) throw new Error("Admin session check failed");
    return res.json();
  },
};