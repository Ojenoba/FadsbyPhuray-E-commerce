"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Edit2, Trash2 } from "lucide-react";
import useUser from "@/utils/useUser";
import { useApiClient } from "@/utils/apiClient";

export default function ProfilePage() {
  const { data: user, loading, refetch } = useUser();
  const { apiClient } = useApiClient();
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    full_name: "",
    phone_number: "",
    street_address: "",
    city: "",
    state: "",
    postal_code: "",
    is_default: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/account/signin";
      return;
    }

    if (user) {
      fetchAddresses();
    }
  }, [user, loading]);

  const fetchAddresses = async () => {
    try {
      const data = await apiClient("/api/addresses");
      if (data && !data.error) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    if (!formData.full_name || !formData.street_address || !formData.city) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const method = editingAddress ? "PUT" : "POST";
      const endpoint = editingAddress ? `/api/addresses/${editingAddress.id}` : "/api/addresses";

      const data = await apiClient(endpoint, { method, body: JSON.stringify(formData) });

      if (data && !data.error) {
        alert(editingAddress ? "Address updated!" : "Address added!");
        setFormData({
          full_name: "",
          phone_number: "",
          street_address: "",
          city: "",
          state: "",
          postal_code: "",
          is_default: false,
        });
        setEditingAddress(null);
        setShowAddressForm(false);
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error saving address");
    }
  };

  const handleEditAddress = (address) => {
    setFormData({
      full_name: address.full_name,
      phone_number: address.phone_number || "",
      street_address: address.street_address,
      city: address.city,
      state: address.state || "",
      postal_code: address.postal_code || "",
      is_default: address.is_default,
    });
    setEditingAddress(address);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id) => {
    if (!confirm("Are you sure you want to delete this address?")) return;

    try {
      const data = await apiClient(`/api/addresses/${id}`, { method: "DELETE" });
      if (data && !data.error) {
        alert("Address deleted!");
        fetchAddresses();
      }
    } catch (error) {
      console.error("Error:", error);
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
            My Profile
          </h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* User Info */}
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
            Account Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-[#999] mb-2">
                Name
              </label>
              <p className="text-lg text-[#8B4513] font-semibold">
                {user.name || "Not set"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#999] mb-2">
                Email
              </label>
              <p className="text-lg text-[#8B4513] font-semibold">
                {user.email}
              </p>
            </div>
          </div>
          <p className="text-sm text-[#999] mt-6">
            Member since {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#8B4513] font-sora">
              Saved Addresses
            </h2>
            <button
              onClick={() => {
                setShowAddressForm(!showAddressForm);
                setEditingAddress(null);
                setFormData({
                  full_name: "",
                  phone_number: "",
                  street_address: "",
                  city: "",
                  state: "",
                  postal_code: "",
                  is_default: false,
                });
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              <Plus size={20} />
              Add Address
            </button>
          </div>

          {showAddressForm && (
            <form
              onSubmit={handleAddressSubmit}
              className="mb-8 p-6 bg-[#FFF5E6] rounded-lg"
            >
              <h3 className="text-xl font-bold text-[#8B4513] mb-4">
                {editingAddress ? "Edit Address" : "Add New Address"}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street_address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        street_address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    value={formData.postal_code}
                    onChange={(e) =>
                      setFormData({ ...formData, postal_code: e.target.value })
                    }
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <input
                  type="checkbox"
                  checked={formData.is_default}
                  onChange={(e) =>
                    setFormData({ ...formData, is_default: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <label className="text-sm font-semibold text-[#8B4513]">
                  Set as default address
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  {editingAddress ? "Update Address" : "Save Address"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddressForm(false);
                    setEditingAddress(null);
                  }}
                  className="px-6 py-2 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {addresses.length === 0 ? (
            <p className="text-[#999] text-center py-8">
              No saved addresses yet. Add your first address!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="border-2 border-[#E8D4C4] rounded-lg p-6"
                >
                  {address.is_default && (
                    <span className="inline-block px-3 py-1 bg-[#FF6B35] text-white text-xs font-bold rounded-full mb-3">
                      Default
                    </span>
                  )}
                  <p className="font-bold text-[#8B4513] mb-2">
                    {address.full_name}
                  </p>
                  <p className="text-[#666] text-sm mb-1">
                    {address.street_address}
                  </p>
                  <p className="text-[#666] text-sm mb-1">
                    {address.city}
                    {address.state ? `, ${address.state}` : ""}
                  </p>
                  {address.postal_code && (
                    <p className="text-[#666] text-sm mb-3">
                      {address.postal_code}
                    </p>
                  )}
                  {address.phone_number && (
                    <p className="text-[#666] text-sm mb-4">
                      Phone: {address.phone_number}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAddress(address)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
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
      </div>
    </div>
  );
}
