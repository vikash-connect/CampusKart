"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { Search, Loader2 } from "lucide-react";

const categories = ["All", "Books", "Electronics", "Gadgets", "Hostel Essentials", "Other"];

export default function HomePage() {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchListings(searchQuery, activeCategory);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, activeCategory]);

  const fetchListings = async (search: string, category: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (category && category !== "All") params.append("category", category);

      const res = await fetch(`/api/listings?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        const formattedListings = data.listings.map((listing: any) => ({
          id: listing._id,
          title: listing.title,
          price: listing.price,
          category: listing.category,
          imageUrl: listing.images && listing.images.length > 0 ? listing.images[0] : "",
          whatsapp: listing.whatsapp,
        }));
        setListings(formattedListings);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-24">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Campus Marketplace
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter">
            Discover Campus <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Essentials.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            The exclusive peer-to-peer marketplace for students. Buy, sell, and trade safely within your college community.
          </p>
        </section>

        {/* Search & Filters */}
        <section className="space-y-6 max-w-4xl mx-auto">
          {/* Search Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search for laptops, textbooks, bicycles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-transparent transition-all shadow-xl"
            />
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold transition-all snap-start ${
                  activeCategory === category
                    ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] scale-105"
                    : "bg-zinc-900/50 border border-white/10 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Feed Section */}
        <section>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
          ) : listings.length === 0 ? (
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center max-w-2xl mx-auto">
              <div className="bg-black/50 p-4 rounded-full mb-4">
                <Search size={32} className="text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No items match your search</h3>
              <p className="text-zinc-400 mb-6">
                Try adjusting your search query or selecting a different category.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {listings.map((listing) => (
                <ProductCard key={listing.id} {...listing} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
