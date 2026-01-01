import { apiClient } from "./apiClient";

export async function fetchReviews(productId) {
  try {
    const reviews = await apiClient(`/api/reviews?productId=${productId}`);
    return Array.isArray(reviews) ? reviews : [];
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return [];
  }
}