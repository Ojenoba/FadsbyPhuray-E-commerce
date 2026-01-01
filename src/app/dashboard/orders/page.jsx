"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import useUser from "@/utils/useUser";

export default function OrdersPage() {
  const { data: user, loading } = useUser();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
      return;
    }

    if (user) {
      fetchOrders();
    }
  }, [user, loading]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setOrdersLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/dashboard"
            className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24] transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </a>
          <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
            My Orders
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {ordersLoading ? (
          <div className="text-center py-12 text-[#666]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-12 text-center">
            <p className="text-[#666] mb-4">
              You haven't placed any orders yet
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-[#8B4513] font-sora">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-[#999]">
                      Placed on{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-[#999]">Total Amount</p>
                      <p className="text-2xl font-bold text-[#FF6B35]">
                        ₦{parseFloat(order.total_amount).toLocaleString()}
                      </p>
                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-bold capitalize ${getStatusColor(order.order_status || order.status)}`}
                    >
                      {order.order_status || order.status}
                    </span>

                    <a
                      href={`/dashboard/orders/${order.id}`}
                      className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                    >
                      <Eye size={16} />
                      View Details
                    </a>
                  </div>
                </div>

                {/* Order Items Preview */}
                {order.items && order.items.length > 0 && (
                  <div className="border-t-2 border-[#E8D4C4] pt-4">
                    <p className="text-sm font-semibold text-[#8B4513] mb-3">
                      Items ({order.items.length})
                    </p>
                    <div className="space-y-2">
                      {order.items.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm text-[#666]"
                        >
                          <span>
                            {item.name} x{item.quantity}
                          </span>
                          <span>
                            ₦{parseFloat(item.price).toLocaleString()}
                          </span>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <p className="text-sm text-[#999]">
                          +{order.items.length - 3} more item
                          {order.items.length - 3 > 1 ? "s" : ""}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
