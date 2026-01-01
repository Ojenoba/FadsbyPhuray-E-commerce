"use client";

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import useUser from "@/utils/useUser";

export default function OrderDetailPage({ params }) {
  const { data: user, loading: userLoading } = useUser();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showReturnForm, setShowReturnForm] = useState(false);
  const [returnItem, setReturnItem] = useState(null);
  const [returnData, setReturnData] = useState({
    reason: "",
    description: "",
  });

  useEffect(
    function fetchOrderEffect() {
      if (!userLoading && !user) {
        window.location.href = "/account/signin";
        return;
      }

      if (user) {
        fetchOrder();
      }
    },
    [user, userLoading, params.id],
  );

  const fetchOrder = async () => {
    try {
      const res = await fetch(`/api/orders/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReturn = async (e) => {
    e.preventDefault();
    if (!returnItem || !returnData.reason) {
      alert("Please select an item and reason");
      return;
    }

    try {
      const res = await fetch("/api/returns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: parseInt(params.id),
          order_item_id: returnItem.id,
          reason: returnData.reason,
          description: returnData.description,
        }),
      });

      if (res.ok) {
        alert("Return request submitted!");
        setShowReturnForm(false);
        setReturnItem(null);
        setReturnData({ reason: "", description: "" });
        fetchOrder();
      }
    } catch (error) {
      console.error("Error submitting return:", error);
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

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-[#666] mb-4">Order not found</p>
          <a href="/dashboard/orders" className="text-[#FF6B35] font-semibold">
            Back to Orders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <a
            href="/dashboard/orders"
            className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24] transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </a>
          <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
            Order #{order.id}
          </h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Order Status */}
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
            <div>
              <p className="text-sm text-[#999] mb-2">Order Date</p>
              <p className="text-lg font-bold text-[#8B4513]">
                {new Date(order.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#999] mb-2">Total Amount</p>
              <p className="text-3xl font-bold text-[#FF6B35]">
                ₦{parseFloat(order.total_amount).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-[#999] mb-2">Status</p>
              <span
                className={`inline-block px-6 py-2 rounded-full text-sm font-bold capitalize ${getStatusColor(order.order_status || order.status)}`}
              >
                {order.order_status || order.status}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="space-y-3">
            {order.status_history && order.status_history.length > 0 ? (
              <div>
                <p className="text-sm font-semibold text-[#8B4513] mb-4">
                  Order Timeline
                </p>
                {order.status_history.map((history, idx) => (
                  <div key={idx} className="flex items-start gap-4 mb-3">
                    <div className="w-4 h-4 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-[#8B4513] capitalize">
                        {history.status}
                      </p>
                      <p className="text-sm text-[#999]">
                        {new Date(history.changed_at).toLocaleDateString()} at{" "}
                        {new Date(history.changed_at).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        {/* Shipping Address */}
        {order.street_address && (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Shipping Address
            </h2>
            <p className="font-bold text-[#8B4513] mb-2">{order.full_name}</p>
            <p className="text-[#666] mb-1">{order.street_address}</p>
            <p className="text-[#666] mb-1">
              {order.city}
              {order.state ? `, ${order.state}` : ""}
            </p>
            {order.postal_code && (
              <p className="text-[#666] mb-3">{order.postal_code}</p>
            )}
            {order.phone_number && (
              <p className="text-[#666] text-sm">Phone: {order.phone_number}</p>
            )}
          </div>
        )}

        {/* Order Items */}
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
            Order Items
          </h2>

          {order.items && order.items.length > 0 ? (
            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b-2 border-[#E8D4C4] pb-4"
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold text-[#8B4513] mb-2">
                      {item.name}
                    </h3>
                    <p className="text-[#666] text-sm mb-3">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-lg font-bold text-[#FF6B35]">
                      ₦{parseFloat(item.price).toLocaleString()}
                    </p>
                  </div>

                  {(order.order_status === "delivered" ||
                    order.status === "completed") && (
                    <button
                      onClick={() => {
                        setReturnItem(item);
                        setShowReturnForm(true);
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                    >
                      Return Item
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#999]">No items in this order</p>
          )}
        </div>

        {/* Return Form */}
        {showReturnForm && returnItem && (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 mb-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Return Item
            </h2>
            <p className="text-[#666] mb-6">Item: {returnItem.name}</p>

            <form onSubmit={handleSubmitReturn} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Reason for Return *
                </label>
                <select
                  value={returnData.reason}
                  onChange={(e) =>
                    setReturnData({ ...returnData, reason: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                >
                  <option value="">Select a reason...</option>
                  <option value="defective">Defective</option>
                  <option value="wrong_item">Wrong Item Received</option>
                  <option value="not_as_described">Not as Described</option>
                  <option value="changed_mind">Changed Mind</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Description
                </label>
                <textarea
                  value={returnData.description}
                  onChange={(e) =>
                    setReturnData({
                      ...returnData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Please provide more details..."
                  rows="4"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Submit Return Request
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowReturnForm(false);
                    setReturnItem(null);
                  }}
                  className="px-6 py-2 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
