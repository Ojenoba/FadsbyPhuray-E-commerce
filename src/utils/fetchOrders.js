import { apiClient } from "./apiClient";

export async function fetchOrders() {
  try {
    const orders = await apiClient("/api/orders");
    return Array.isArray(orders) ? orders : [];
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}