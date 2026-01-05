"use client";

import { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // custom admin context

export default function AdminShippingPage() {
  const { status } = useAdminAuth();
  const router = useRouter();

  const [shippingRates, setShippingRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingRate, setEditingRate] = useState(null);
  const [formData, setFormData] = useState({
    region: "",
    rate_name: "",
    cost: "",
    description: "",
  });

  // Guard: redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login?reason=not-logged-in");
    } else if (status === "authenticated") {
      fetchShippingRates();
    }
  }, [status, router]);

  const fetchShippingRates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipping`, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch shipping rates");
      const data = await res.json();
      setShippingRates(data.rates || []);
    } catch (error) {
      console.error("Error fetching shipping rates:", error);
      setShippingRates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.region || !formData.rate_name || !formData.cost) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const method = editingRate ? "PUT" : "POST";
      const url = editingRate
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/${editingRate._id || editingRate.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/shipping`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          region: formData.region.trim(),
          rate_name: formData.rate_name.trim(),
          cost: parseFloat(formData.cost),
          description: formData.description.trim(),
          is_active: true,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Error saving shipping rate");
      }

      alert(editingRate ? "Shipping rate updated!" : "Shipping rate created!");
      setFormData({ region: "", rate_name: "", cost: "", description: "" });
      setEditingRate(null);
      setShowForm(false);
      fetchShippingRates();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error saving shipping rate");
    }
  };

  const handleEdit = (rate) => {
    setFormData({
      region: rate.region ?? "",
      rate_name: rate.rate_name ?? "",
      cost: String(rate.cost ?? ""),
      description: rate.description ?? "",
    });
    setEditingRate(rate);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this shipping rate?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/shipping/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Error deleting shipping rate");
      }
      alert("Shipping rate deleted!");
      fetchShippingRates();
    } catch (error) {
      console.error("Error:", error);
      alert(error.message || "Error deleting shipping rate");
    }
  };

  if (status === "loading") return <div className="px-4 py-8">Loading...</div>;
  if (status === "unauthenticated") return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#8B4513] flex items-center gap-2 mb-6">
        <Truck size={28} className="text-[#FF6B35]" />
        Shipping Rates
      </h1>

      {/* Add button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors mb-8"
        >
          <Plus size={20} />
          Add New Shipping Rate
        </button>
      )}

      {/* Add/Edit form */}
      {showForm && (
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
            {editingRate ? "Edit Shipping Rate" : "Add New Shipping Rate"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Region */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Region/Location *
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g., Lagos, Outside Lagos, Ikorodu"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                  required
                />
              </div>

              {/* Rate name */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Rate Name *
                </label>
                <input
                  type="text"
                  value={formData.rate_name}
                  onChange={(e) => setFormData({ ...formData, rate_name: e.target.value })}
                  placeholder="e.g., Within Lagos"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                  required
                />
              </div>

              {/* Cost */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Cost (₦) *
                </label>
                <input
                  type="number"
                  value={formData.cost}
                  onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  placeholder="e.g., 6000"
                  step="100"
                  min="0"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Delivery Time / Description (Optional)
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="e.g., 3-5 business days"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
              >
                {editingRate ? "Update Rate" : "Add Rate"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingRate(null);
                  setFormData({ region: "", rate_name: "", cost: "", description: "" });
                }}
                className="px-6 py-2 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="text-center py-8 text-[#666]">Loading shipping rates...</div>
      ) : shippingRates.length === 0 ? (
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center">
          <p className="text-[#666]">No shipping rates configured yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {shippingRates.map((rate) => (
            <div
              key={rate._id || rate.id}
              className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#8B4513] font-sora">
                    {rate.rate_name}
                  </h3>
                  <p className="text-sm text-[#999]">Region: {rate.region}</p>
                  {rate.description && (
                    <p className="text-sm text-[#666] mt-2">{rate.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#FF6B35]">
                    ₦{parseInt(rate.cost).toLocaleString()}
                  </p>
                  <p className="text-xs text-[#999] mt-1">
                    {rate.is_active ? "✓ Active" : "Inactive"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-[#E8D4C4]">
                <button
                  onClick={() => handleEdit(rate)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  <Edit2 size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(rate._id || rate.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}