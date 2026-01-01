import { apiClient } from "./apiClient";

export async function fetchWishlist() {
  try {
    const wishlist = await apiClient("/api/wishlist");
    return Array.isArray(wishlist) ? wishlist : [];
  } catch (error) {
    console.error("Failed to fetch wishlist:", error);
    return [];
  }
}