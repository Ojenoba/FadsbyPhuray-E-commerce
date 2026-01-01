import { useApiClient } from "./apiClient";
import { mockProducts } from "./mockData";

export async function fetchProducts() {
  const { apiClient } = useApiClient();

  try {
    const products = await apiClient("/products"); // ✅ no /api here, base URL already includes it
    return Array.isArray(products) && products.length ? products : mockProducts;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return mockProducts;
  }
}