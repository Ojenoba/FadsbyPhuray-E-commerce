"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ admin context

export default function ProductsAdminPage() {
  const queryClient = useQueryClient();
  const { status } = useAdminAuth();
  const router = useRouter();

  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock_quantity: "",
    image_url: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ✅ Guard: redirect unauthenticated admins (does not change hook order)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login?reason=not-logged-in");
    }
  }, [status, router]);

  // ✅ Always call hooks; control query with `enabled`
  const {
    data: products = [],
    isLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const res = await fetch("/api/products", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const json = await res.json();
      // Backend returns { success, data } — normalize to array
      return Array.isArray(json) ? json : json.data || [];
    },
    enabled: status === "authenticated",
  });

  // ✅ Add/Update product mutation (unwrap backend response)
  const productMutation = useMutation({
    mutationFn: async (productData) => {
      const id = editingProduct?._id || editingProduct?.id;
      const url = editingProduct ? `/api/products/${id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(productData),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to save product");
      }
      return json.data; // unwrap product
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setSuccess(editingProduct ? "Product updated successfully!" : "Product added successfully!");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message || "Failed to save product"),
  });

  // ✅ Delete product mutation
  const deleteMutation = useMutation({
    mutationFn: async (productId) => {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to delete product");
      }
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      setSuccess("Product deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message || "Failed to delete product"),
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
      stock_quantity: "",
      image_url: "",
    });
    setIsAddingProduct(false);
    setEditingProduct(null);
    setError("");
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name ?? "",
      description: product.description ?? "",
      price: product.price ?? "",
      category: product.category ?? "",
      stock_quantity: product.stock_quantity ?? 0,
      image_url: product.image_url ?? "",
    });
    setIsAddingProduct(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required");
      return;
    }
    const priceVal = Number(formData.price);
    if (!priceVal || priceVal <= 0) {
      setError("Price must be greater than 0");
      return;
    }

    productMutation.mutate({
      ...formData,
      price: priceVal,
      stock_quantity: Number(formData.stock_quantity) || 0,
    });
  };

  // ✅ Render guards AFTER all hooks (keeps hook order stable)
  if (status === "loading") {
    return <div className="p-6">Checking admin authentication...</div>;
  }
  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#8B4513] font-sora">Manage Products</h1>
            <p className="text-[#666] mt-1">Add, edit, or remove products</p>
          </div>
          {!isAddingProduct && (
            <button
              onClick={() => setIsAddingProduct(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              <Plus size={20} />
              Add Product
            </button>
          )}
        </div>

        {/* Messages */}
        {(error || productsError) && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-sm text-red-700">{error || productsError?.message}</p>
            </div>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">{success}</p>
          </div>
        )}

        {/* Add/Edit Form */}
        {isAddingProduct && (
          <div className="mb-8 bg-white rounded-lg border-2 border-[#E8D4C4] p-6">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Leather Handbag"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="5000"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Accessories"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                  />
                </div>

                {/* Stock */}
                <div>
                  <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.stock_quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, stock_quantity: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Product details..."
                  rows={4}
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={productMutation.isPending}
                  className="flex-1 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors disabled:opacity-50"
                >
                  {productMutation.isPending
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden">
          {isLoading ? (
            <div className="p-8 text-center text-[#666]">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-8 text-center text-[#666]">No products yet. Add your first product!</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#FFF5E6] border-b-2 border-[#E8D4C4]">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-[#8B4513]">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#8B4513]">Price</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#8B4513]">Stock</th>
                    <th className="px-4 py-3 text-left font-semibold text-[#8B4513]">Category</th>
                    <th className="px-4 py-3 text-center font-semibold text-[#8B4513]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id || product.id}
                      className="border-b border-[#E8D4C4] hover:bg-[#FFF5E6] transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-semibold text-[#8B4513]">{product.name}</p>
                        <p className="text-xs text-[#666] mt-1">
                          {product.description ? `${String(product.description).substring(0, 50)}...` : ""}
                        </p>
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#FF6B35]">
                        ₦{Number(product.price).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-[#666]">{product.stock_quantity ?? 0}</td>
                      <td className="px-4 py-3 text-[#666]">{product.category || "-"}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => handleEditProduct(product)}
                            className="p-2 text-[#FF6B35] hover:bg-[#FFF5E6] rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => {
                              const id = product._id || product.id;
                              if (id && confirm("Are you sure you want to delete this product?")) {
                                deleteMutation.mutate(id);
                              }
                            }}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}