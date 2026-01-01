"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AnnouncementsAdminPage() {
  const queryClient = useQueryClient();
  const [isAddingAnnouncement, setIsAddingAnnouncement] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [formData, setFormData] = useState({ title: "", content: "", is_active: true });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const { status } = useAdminAuth();

  // Guard: redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/admin/login?reason=not-logged-in");
    }
  }, [status, router]);

  // Fetch announcements (unwrap backend response to always return an array)
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["admin-announcements"],
    queryFn: async () => {
      const res = await fetch("/api/announcements", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch announcements");
      const json = await res.json();
      return Array.isArray(json) ? json : json.data || [];
    },
    enabled: status === "authenticated",
  });

  // Add or update announcement
  const announcementMutation = useMutation({
    mutationFn: async (announcementData) => {
      const url = editingAnnouncement
        ? `/api/announcements/${editingAnnouncement.id}`
        : "/api/announcements";
      const method = editingAnnouncement ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(announcementData),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save announcement");
      return json.data || json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setSuccess(editingAnnouncement ? "Announcement updated successfully!" : "Announcement added successfully!");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message || "Failed to save announcement"),
  });

  // Delete announcement
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/announcements/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to delete announcement");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
      setSuccess("Announcement deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    },
    onError: (err) => setError(err.message || "Failed to delete announcement"),
  });

  // Toggle active status
  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }) => {
      const res = await fetch(`/api/announcements/${id}/toggle`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ is_active: !is_active }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to toggle announcement");
      return json.data || json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-announcements"] });
    },
    onError: (err) => setError(err.message || "Failed to toggle announcement"),
  });

  const resetForm = () => {
    setFormData({ title: "", content: "", is_active: true });
    setIsAddingAnnouncement(false);
    setEditingAnnouncement(null);
    setError("");
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      is_active: announcement.is_active,
    });
    setIsAddingAnnouncement(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) return setError("Announcement title is required");
    if (!formData.content.trim()) return setError("Announcement content is required");

    announcementMutation.mutate(formData);
  };

  if (status === "loading") return <p>Checking admin authentication...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white p-4 pt-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#8B4513] font-sora">Manage Announcements</h1>
            <p className="text-[#666] mt-1">Create and manage site announcements</p>
          </div>
          {!isAddingAnnouncement && (
            <button
              onClick={() => setIsAddingAnnouncement(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
            >
              <Plus size={20} />
              New Announcement
            </button>
          )}
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded flex gap-3">
            <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-red-700">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-green-700 font-semibold">{success}</p>
          </div>
        )}

        {/* Add/Edit Form */}
        {isAddingAnnouncement && (
          <div className="mb-8 bg-white rounded-lg border-2 border-[#E8D4C4] p-6">
            <h2 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">
              {editingAnnouncement ? "Edit Announcement" : "Create New Announcement"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., New Collection Available"
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#8B4513] mb-2">Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="What do you want to announce?"
                  rows={6}
                  className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
                  required
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#FFF5E6] rounded-lg">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="is_active" className="text-sm font-medium text-[#8B4513] cursor-pointer">
                  Show this announcement on the site
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={announcementMutation.isPending}
                  className="flex-1 px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors disabled:opacity-50"
                >
                  {announcementMutation.isPending
                    ? "Saving..."
                    : editingAnnouncement
                    ? "Update Announcement"
                    : "Create Announcement"}
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

        {/* Announcements List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center text-[#666]">
              Loading announcements...
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center text-[#666]">
              No announcements yet. Create your first one!
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id || announcement._id}
                className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 hover:border-[#FF6B35] transition-colors"
              >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-[#8B4513]">{announcement.title}</h3>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          announcement.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {announcement.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <p className="text-[#666] mb-2">{announcement.content}</p>
                    <p className="text-xs text-[#999]">
                      Created: {new Date(announcement.created_at || announcement.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2 w-full md:w-auto">
                    <button
                      onClick={() =>
                        toggleActiveMutation.mutate({
                          id: announcement.id || announcement._id,
                          is_active: announcement.is_active,
                        })
                      }
                      className={`flex-1 md:flex-none p-2 rounded-lg transition-colors ${
                        announcement.is_active ? "text-gray-600 hover:bg-gray-100" : "text-green-600 hover:bg-green-100"
                      }`}
                      title={announcement.is_active ? "Hide announcement" : "Show announcement"}
                    >
                      {announcement.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>

                    <button
                      onClick={() => handleEditAnnouncement(announcement)}
                      className="flex-1 md:flex-none p-2 text-[#FF6B35] hover:bg-[#FFF5E6] rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={18} />
                    </button>

                    <button
                      onClick={() => {
                        const id = announcement.id || announcement._id;
                        if (id && confirm("Are you sure you want to delete this announcement?")) {
                          deleteMutation.mutate(id);
                        }
                      }}
                      className="flex-1 md:flex-none p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}