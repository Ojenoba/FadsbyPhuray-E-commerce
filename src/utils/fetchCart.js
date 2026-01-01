import { apiClient } from "./apiClient";

export async function fetchCart() {
  try {
    const cart = await apiClient("/api/cart");
    return Array.isArray(cart) ? cart : [];
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return [];
  }
}