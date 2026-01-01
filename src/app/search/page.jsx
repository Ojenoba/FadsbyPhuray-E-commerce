"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Search, Filter } from "lucide-react";
import useUser from "@/utils/useUser";

export default function SearchPage() {
  const { data: user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get all categories
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/products");
        if (res.ok) {
          const data = await res.json();
          // Backend returns { success, data: [...] }
          const cats = [
            ...new Set((data.data || []).map((p) => p.category).filter(Boolean)),
          ];
          setCategories(cats);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (searchQuery) params.append("q", searchQuery);
        if (selectedCategory) params.append("category", selectedCategory);
        if (minPrice) params.append("minPrice", minPrice);
        if (maxPrice) params.append("maxPrice", maxPrice);
        if (sortBy) params.append("sort", sortBy);

        const res = await fetch(`/api/products/search?${params}`);
        if (res.ok) {
          const data = await res.json();
          // Backend returns { success, data: [...] }
          setProducts(data.data || []);
        } else {
          setProducts([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(performSearch, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, sortBy]);

  const handleAddToCart = async (productId) => {
    if (!user) {
      window.location.href = "/account/signin";
      return;
    }

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: productId, quantity: 1 }),
      });

      if (res.ok) {
        alert("Added to cart!");
      } else {
        alert("Failed to add to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart");
    }
  };

  const formatPrice = (value) => {
    try {
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0,
      }).format(Number(value || 0));
    } catch {
      return `₦${value}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5E6] to-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#FF6B35] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-[#FF6B35] hover:text-[#E55A24] transition-colors"
          >
            <ArrowLeft size={24} />
            <span>Back</span>
          </a>
          <h1 className="text-2xl font-bold text-[#8B4513] font-sora">Search</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Search Box */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search size={20} className="absolute left-4 top-3 text-[#FF6B35]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
              />
            </div>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35] bg-white text-[#8B4513]"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price_asc">Price (Low to High)</option>
            <option value="price_desc">Price (High to Low)</option>
            <option value="rating">Rating (Highest First)</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-6 h-fit">
            <h3 className="text-lg font-bold text-[#8B4513] mb-6 flex items-center gap-2 font-sora">
              <Filter size={20} />
              Filters
            </h3>

            {/* Category Filter */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#8B4513] mb-3">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35] bg-white text-[#8B4513]"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-[#8B4513] mb-3">
                Price Range (₦)
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg mb-2 focus:outline-none focus:border-[#FF6B35]"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-full px-4 py-2 border-2 border-[#E8D4C4] rounded-lg focus:outline-none focus:border-[#FF6B35]"
              />
            </div>

            {/* Reset Filters */}
            {(searchQuery || selectedCategory || minPrice || maxPrice) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setMinPrice("");
                  setMaxPrice("");
                }}
                className="w-full px-4 py-2 bg-[#E8D4C4] text-[#8B4513] rounded-lg font-semibold hover:bg-[#D9C4B4] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="text-center py-12 text-[#666]">Searching...</div>
            ) : products.length === 0 ? (
              <div className="bg-white rounded-lg border-2 border-[#E8D4C4] p-12 text-center">
                <p className="text-[#666] mb-4">No products found</p>
                <p className="text-sm text-[#999]">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg border-2 border-[#E8D4C4] overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <a href={`/products/${product._id}`}>
                      {product.image_url && (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
                        />
                      )}
                    </a>
                    <div className="p-4">
                      <a href={`/products/${product._id}`}>
                        <h3 className="font-bold text-[#8B4513] mb-2 font-sora hover:text-[#FF6B35] transition-colors">
                          {product.name}
                        </h3>
                      </a>

                      <p className="text-[#666] text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-[#FF6B35] font-semibold">
                          {"⭐".repeat(Math.round(product.average_rating || 0))}
                        </span>
                        <span className="text-xs text-[#999]">
                          ({product.rating_count || 0})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[#FF6B35]">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="px-4 py-2 bg-[#FF6B35] text-white rounded-lg font-semibold hover:bg-[#E55A24] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Results Counter */}
            {!loading && products.length > 0 && (
              <p className="text-center text-[#999] text-sm mt-8">
                Showing {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}