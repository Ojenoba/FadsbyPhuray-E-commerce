"use client";

import { useEffect, useState } from "react";
import { useApiClient } from "@/utils/apiClient";
import { useAuth } from "@/context/AuthProvider";
import {
  ArrowLeft,
  Wallet,
  ShoppingBag,
  Share2,
  LogOut,
  User,
  Search,
  Menu,
  Grid,
  Heart,
  ShoppingCart,
  Package,
} from "lucide-react";

import ProductsList from "@/components/ProductsList";
import CategoriesList from "@/components/CategoriesList";
import CartView from "@/components/CartView";
import WishlistView from "@/components/WishlistView";

export default function DashboardPage() {
  const { user, isLoggedIn, loading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dashboard data
  const [wallet, setWallet] = useState(null);
  const [orders, setOrders] = useState([]);
  const [referrals, setReferrals] = useState(null);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Search
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  // Redirect to signin if not logged in (only after loading finishes)
  useEffect(() => {
    console.log("🔍 Dashboard check - loading:", loading, "isLoggedIn:", isLoggedIn, "user:", user);
    if (!loading && !isLoggedIn) {
      console.log("❌ User not logged in, redirecting to signin");
      if (typeof window !== "undefined") {
        window.location.href = "/account/signin";
      }
    }
  }, [loading, isLoggedIn, user]);

  // Load dashboard data when logged in
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { apiClient } = useApiClient();
        const walletData = await apiClient("/wallet");
        setWallet(walletData?.wallet || null);

        const ordersData = await apiClient("/orders");
        setOrders(ordersData?.data || ordersData?.orders || []);

        const referralsData = await apiClient("/referrals");
        setReferrals(referralsData || null);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (isLoggedIn) fetchData();
  }, [isLoggedIn]);

  // Search handler
  const handleSearch = async (e) => {
    e?.preventDefault?.();
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      setSearchLoading(true);
      const { apiClient } = useApiClient();
      const data = await apiClient(`/products/search/${encodeURIComponent(searchQuery)}`);
      setSearchResults(data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setSearchLoading(false);
    }
  };

  // Handle loading state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Handle unauthenticated state
  if (!isLoggedIn) {
    return null; // redirect already fired
  }

  const handleSignOut = async () => {
    try {
      await logout();
    } finally {
      window.location.href = "/account/signin";
    }
  };

  const menuItems = [
    { key: "overview", label: "Overview", icon: null },
    { key: "products", label: "All Products", icon: <Package className="inline mr-2" size={18} /> },
    { key: "categories", label: "Categories", icon: <Grid className="inline mr-2" size={18} /> },
    { key: "cart", label: "Cart", icon: <ShoppingCart className="inline mr-2" size={18} /> },
    { key: "wishlist", label: "Wishlist", icon: <Heart className="inline mr-2" size={18} /> },
    { key: "orders", label: "Orders", icon: <ShoppingBag className="inline mr-2" size={18} /> },
    { key: "wallet", label: "Wallet", icon: <Wallet className="inline mr-2" size={18} /> },
    { key: "referrals", label: "Referrals", icon: <Share2 className="inline mr-2" size={18} /> },
    { key: "search", label: "Search Products", icon: <Search className="inline mr-2" size={18} /> },
    { key: "profile", label: "Profile", icon: <User className="inline mr-2" size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E6] to-white relative">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} className="text-[#FF6B35]" />
            </button>
            <a href="/" className="p-2 rounded-lg hover:bg-[#FFF5E6] transition-colors" aria-label="Back">
              <ArrowLeft size={24} className="text-[#FF6B35]" />
            </a>
            <h1 className="text-2xl font-bold text-[#8B4513] font-sora">My Dashboard</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-[#8B4513]">Menu</h2>
            <button onClick={() => setSidebarOpen(false)} className="text-[#FF6B35] font-bold" aria-label="Close">
              ✕
            </button>
          </div>
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  setSidebarOpen(false);
                }}
                className={`text-left px-4 py-2 rounded ${
                  activeTab === item.key ? "bg-[#FFF0E6]" : "hover:bg-[#FFF5E6]"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </aside>
      )}

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-40 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {/* User card */}
        <div className="bg-gradient-to-r from-[#FF6B35] to-[#8B4513] text-white rounded-lg p-6 mb-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-2 font-sora">Welcome, {user?.username}!</h2>
          <p className="text-[#FFE8CC]">{user?.email}</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b-2 border-[#E8D4C4] flex-wrap">
          {menuItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === item.key
                  ? "text-[#FF6B35] border-b-2 border-[#FF6B35]"
                  : "text-[#666] hover:text-[#FF6B35]"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 shadow-md">
              <p className="text-[#666] text-sm mb-2">Wallet Balance</p>
              <h3 className="text-3xl font-bold text-[#FF6B35] font-sora">
                ₦{(wallet?.balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </h3>
            </div>
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 shadow-md">
              <p className="text-[#666] text-sm mb-2">Total Orders</p>
              <h3 className="text-3xl font-bold text-[#8B4513] font-sora">{orders.length}</h3>
            </div>
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 shadow-md">
              <p className="text-[#666] text-sm mb-2">Referrals Made</p>
              <h3 className="text-3xl font-bold text-[#8B4513] font-sora">{referrals?.referrals?.length || 0}</h3>
            </div>
          </div>
        )}

        {/* Products */}
        {activeTab === "products" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">All Products</h3>
            <ProductsList />
          </section>
        )}

        {/* Categories */}
        {activeTab === "categories" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Categories</h3>
            <CategoriesList />
          </section>
        )}

        {/* Cart */}
        {activeTab === "cart" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Your Cart</h3>
            <CartView />
          </section>
        )}

        {/* Wishlist */}
        {activeTab === "wishlist" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">My Wishlist</h3>
            <WishlistView />
          </section>
        )}

        {/* Orders */}
        {activeTab === "orders" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Order History</h3>
            {ordersLoading ? (
              <div className="text-center py-8 text-[#666]">Loading orders...</div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center">
                <ShoppingBag size={48} className="mx-auto text-[#CCC] mb-4" />
                <p className="text-[#666]">No orders yet. Start shopping!</p>
                <button
                  onClick={() => setActiveTab("products")}
                  className="inline-block mt-4 px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id || order.id} className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-[#666]">Order ID: {order._id || order.id}</p>
                        <p className="text-sm text-[#666]">
                          {new Date(order.created_at || order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === "completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.status
                          ? order.status.charAt(0).toUpperCase() + order.status.slice(1)
                          : "Unknown"}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-[#FF6B35]">
                      ₦{(order.total_amount ?? order.totalAmount ?? 0).toLocaleString("en-NG", {
                        minimumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Wallet */}
        {activeTab === "wallet" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">My Wallet</h3>
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#8B4513] text-white rounded-lg p-8 mb-8 shadow-lg">
              <p className="text-[#FFE8CC] mb-2">Available Balance</p>
              <h2 className="text-5xl font-bold font-sora">
                ₦{(wallet?.balance || 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6">
              <h4 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">Withdraw Your Balance</h4>
              <a
                href="/dashboard/withdrawal"
                className="inline-block px-6 py-3 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
              >
                Request Withdrawal
              </a>
            </div>
          </section>
        )}

        {/* Referrals */}
        {activeTab === "referrals" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Referral Program</h3>
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-8">
              <p className="text-[#666] mb-2">Your Referral Code</p>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  value={referrals?.referralCode || ""}
                  readOnly
                  className="flex-1 px-4 py-2 bg-[#FFF5E6] border border-[#E8D4C4] rounded-lg font-mono font-bold text-[#FF6B35]"
                />
                <button
                  onClick={() => {
                    if (referrals?.referralCode) {
                      navigator.clipboard.writeText(referrals.referralCode);
                      alert("Copied to clipboard!");
                    }
                  }}
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Copy
                </button>
              </div>
              <p className="text-sm text-[#666] mt-2">
                Share this code with friends to earn ₦500 for each successful referral!
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-[#8B4513] mb-4 font-sora">Your Referrals</h4>
              {!referrals || referrals.referrals?.length === 0 ? (
                <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-8 text-center">
                  <Share2 size={48} className="mx-auto text-[#CCC] mb-4" />
                  <p className="text-[#666]">No referrals yet. Share your code to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {referrals.referrals.map((ref) => (
                    <div key={ref._id || ref.id} className="bg-white rounded-lg border border-[#E8D4C4] p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-[#8B4513]">
                            {ref.referred_user_name || ref.name || "Pending"}
                          </p>
                          <p className="text-sm text-[#666]">
                            {ref.referred_user_email || ref.email || "Awaiting signup"}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            ref.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {ref.status ? ref.status.charAt(0).toUpperCase() + ref.status.slice(1) : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Search */}
        {activeTab === "search" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">Search Products</h3>
            <form onSubmit={handleSearch} className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>

            {searchLoading ? (
              <div className="text-center py-6">Searching...</div>
            ) : searchResults.length === 0 ? (
              <p className="text-[#666]">No results yet. Try a query.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((p) => (
                  <div key={p._id} className="bg-white rounded-lg border-2 border-[#E8D4C4] p-4 shadow-sm">
                    <img
                      src={p.image_url || p.images?.[0] || "/placeholder.jpg"}
                      alt={p.name || "Product image"}
                      className="w-full h-40 object-cover rounded mb-4"
                    />
                    <h4 className="font-semibold text-[#8B4513]">{p.name}</h4>
                    <p className="text-sm text-[#666] line-clamp-3 mb-2">{p.description || ""}</p>
                    <p className="text-lg font-bold text-[#FF6B35] mb-3">
                      ₦{(p.price ?? 0).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                    </p>
                    <a
                      href={`/products/${p._id}`}
                      className="inline-block px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                    >
                      View Details
                    </a>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Profile */}
        {activeTab === "profile" && (
          <section>
            <h3 className="text-2xl font-bold text-[#8B4513] mb-6 font-sora">My Profile</h3>
            <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 space-y-2">
              <p className="text-[#666]">
                <span className="font-semibold text-[#8B4513]">Name:</span> {user?.username}
              </p>
              <p className="text-[#666]">
                <span className="font-semibold text-[#8B4513]">Email:</span> {user?.email}
              </p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}