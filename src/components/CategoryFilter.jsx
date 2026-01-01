"use client";

export default function CategoryFilter({ categories, selectedCategory, setSelectedCategory }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-[#8B4513] mb-8 font-sora">
        Shop by Category
      </h2>

      <div className="flex justify-center gap-3 flex-wrap">
        {["All", ...categories.filter((c) => c !== "All")].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 ease-in-out
              ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-[#FF6B35] to-[#FF8555] text-white shadow-lg scale-105"
                  : "bg-[#FFF5E6] text-[#8B4513] border border-[#E8D4C4] hover:bg-[#FFE8CC] hover:shadow-md"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}