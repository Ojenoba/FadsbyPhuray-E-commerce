"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ admin context
import { BASE_URL } from "@/utils/api";

export default function OrdersAdminPage() {
  const queryClient = useQueryClient();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const { status } = useAdminAuth();

  // ✅ Guard: redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login?reason=not-logged-in");
    }
  }, [status, router]);

  // ✅ Fetch orders (always normalize to array)
  const {
    data: orders = [],
    isLoading,
    error: ordersError,
  } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/orders`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch orders");
      const data = await res.json();
      return Array.isArray(data) ? data : data.data || [];
    },
    enabled: status === "authenticated",
  });

  // ✅ Update order status
  const updateMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const endpoint =
        status === "shipped"
          ? `${BASE_URL}/orders/${id}/ship`
          : `${BASE_URL}/orders/${id}/status`;
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Failed to update order");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setSuccess("Order updated!");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message),
  });

  // ✅ Cancel order
  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${BASE_URL}/orders/${id}/cancel`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: "cancelled" }),
      });
      if (!res.ok) throw new Error("Failed to cancel order");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      setSuccess("Order cancelled!");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message),
  });

  if (status === "loading") {
    return <p>Checking admin authentication...</p>;
  }

  if (status === "unauthenticated") {
    return null; // redirect handled by useEffect
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Manage Orders</h1>

      {success && <div className="bg-green-100 p-2">{success}</div>}
      {(error || ordersError) && (
        <div className="bg-red-100 p-2 flex gap-2">
          <AlertCircle size={18} /> {error || ordersError?.message}
        </div>
      )}

      {isLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="mt-4 w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id || o.id}>
                <td>{o._id || o.id}</td>
                <td>{o.customer || o.customerName}</td>
                <td>₦{Number(o.total).toLocaleString()}</td>
                <td>{o.status}</td>
                <td>
                  {o.status !== "shipped" && o.status !== "cancelled" && (
                    <>
                      <button
                        onClick={() => updateMutation.mutate({ id: o._id || o.id, status: "shipped" })}
                        className="bg-green-600 text-white px-2 py-1 rounded"
                      >
                        Mark Shipped
                      </button>
                      <button
                        onClick={() => cancelMutation.mutate(o._id || o.id)}
                        className="bg-red-600 text-white px-2 py-1 rounded ml-2"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}