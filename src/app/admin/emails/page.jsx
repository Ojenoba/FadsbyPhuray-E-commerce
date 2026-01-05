"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Edit2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext"; // ✅ use your admin auth

export default function AdminEmailsPage() {
  const { status, admin } = useAdminAuth(); // ✅ replace useSession
  const router = useRouter();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ subject: "", body: "" });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const defaultTemplates = [
    {
      name: "order_confirmation",
      title: "Order Confirmation",
      subject: "Order Confirmation - FADs by PHURAY",
      body:
        "Thank you for your order! Order ID: {order_id}. Total: {total}. Your order will be processed shortly.",
    },
    {
      name: "order_shipped",
      title: "Order Shipped",
      subject: "Your Order Has Been Shipped!",
      body: "Great news! Your order {order_id} has been shipped. Tracking: {tracking_number}",
    },
    {
      name: "order_delivered",
      title: "Order Delivered",
      subject: "Order Delivered Successfully",
      body:
        "Your order {order_id} has been delivered. Thank you for shopping with FADs by PHURAY!",
    },
    {
      name: "password_reset",
      title: "Password Reset",
      subject: "Reset Your Password",
      body:
        "Click the link below to reset your password: {reset_link}. This link expires in 1 hour.",
    },
    {
      name: "review_request",
      title: "Review Request",
      subject: "Share Your Review!",
      body:
        "We would love to hear about your purchase! Product: {product_name}. Please share your thoughts.",
    },
  ];

  // ✅ Guard: wait for admin auth resolution
  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/admin/login?reason=not-logged-in");
      return;
    }
    if (admin?.role !== "admin") {
      router.push("/");
      return;
    }
    setTemplates(defaultTemplates);
    setLoading(false);
  }, [status, admin, router]);

  const handleEdit = (template) => {
    setEditingTemplate(template);
    setFormData({ subject: template.subject, body: template.body });
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingTemplate(null);
    setFormData({ subject: "", body: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.subject.trim() || !formData.body.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/emails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // ✅ if your AdminAuthContext provides a token, use it here
          Authorization: `Bearer ${admin?.token ?? ""}`,
        },
        body: JSON.stringify({
          templateName: editingTemplate.name,
          subject: formData.subject.trim(),
          body: formData.body.trim(),
        }),
        credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(text || "Error updating template");
      }

      setTemplates((prev) =>
        prev.map((t) =>
          t.name === editingTemplate.name
            ? { ...t, subject: formData.subject, body: formData.body }
            : t
        )
      );
      setSuccess("Email template updated!");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.message || "Error updating template");
    }
  };

  if (status === "loading") return <div className="p-6">Loading...</div>;
  if (status === "unauthenticated" || admin?.role !== "admin") return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
            >
              <ArrowLeft size={24} className="text-[#FF6B35]" />
            </a>
            <div className="flex items-center gap-2">
              <Mail size={28} className="text-[#FF6B35]" />
              <h1 className="text-2xl font-bold text-[#8B4513] font-sora">
                Email Templates
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <p className="text-red-700 font-semibold">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">{success}</p>
          </div>
        )}

        {/* Edit Form */}
        {showForm && editingTemplate && (
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-8">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              Edit: {editingTemplate.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">
                  Email Body *
                </label>
                <textarea
                  value={formData.body}
                  onChange={(e) =>
                    setFormData({ ...formData, body: e.target.value })
                  }
                  rows={8}
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:border-[#FF6B35] font-mono text-sm"
                  required
                />
                <p className="text-xs text-[#999] mt-2">
                  Use variables like {"{order_id}"}, {"{total}"}, {"{tracking_number}"},{" "}
                  {"{product_name}"}, {"{reset_link}"}, {"{customer_name}"}.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Save Template
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Templates List */}
        <div>
          <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
            Email Templates
          </h2>

          {loading ? (
            <div className="text-center py-8 text-[#666]">Loading templates...</div>
          ) : (
            <div className="space-y-4">
              {templates.map((template) => (
                <div
                  key={template.name}
                  className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#8B4513] font-sora">
                        {template.title}
                      </h3>
                      <p className="text-sm text-[#999] mb-3">
                        Template ID:{" "}
                        <code className="bg-[#FFF5E6] px-2 py-1 rounded">
                          {template.name}
                        </code>
                      </p>
                      <p className="text-sm font-semibold text-[#8B4513] mb-2">
                        Subject:
                      </p>
                      <p className="text-sm text-[#666] mb-3 bg-[#FFF5E6] p-2 rounded">
                        {template.subject}
                      </p>
                      <p className="text-sm font-semibold text-[#8B4513] mb-2">
                        Body:
                      </p>
                      <p className="text-sm text-[#666] bg-[#FFF5E6] p-2 rounded whitespace-pre-wrap">
                        {template.body}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E8D4C4]">
                    <button
                      onClick={() => handleEdit(template)}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit Template
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-[#FFF5E6] to-[#FFE8CC] rounded-lg border-2 border-[#E8D4C4] p-6">
          <h3 className="text-lg font-bold text-[#8B4513] mb-3 font-sora">
            📧 Email Template Variables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#666]">
            <div>
              <p className="font-semibold text-[#8B4513]">Order Emails:</p>
              <ul className="space-y-1 text-xs">
                <li>• {"{order_id}"} - Order ID</li>
                <li>• {"{total}"} - Order total amount</li>
                <li>• {"{tracking_number}"} - Tracking number</li>
                <li>• {"{customer_name}"} - Customer name</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#8B4513]">Account/Product:</p>
              <ul className="space-y-1 text-xs">
                <li>• {"{product_name}"} - Product name</li>
                <li>• {"{user_name}"} - User name</li>
                <li>• {"{reset_link}"} - Password reset link</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}