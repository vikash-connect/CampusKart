import React from "react";
import ProductCard from "@/components/ProductCard";

const mockListings = [
  {
    id: "1",
    title: "MacBook Air M1 - Pristine Condition",
    price: 55000,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80",
    whatsapp: "919876543210",
  },
  {
    id: "2",
    title: "Engineering Drawing Kit (Complete Set)",
    price: 800,
    category: "Books & Material",
    imageUrl: "https://images.unsplash.com/photo-1611244419377-b0a760c19719?q=80&w=800&auto=format&fit=crop",
    whatsapp: "919876543210",
  },
  {
    id: "3",
    title: "Mini Fridge 45L - Perfect for Hostel",
    price: 4500,
    category: "Hostel Essentials",
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=800&q=80",
    whatsapp: "919876543210",
  },
  {
    id: "4",
    title: "Sony WH-1000XM4 Noise Cancelling Headphones",
    price: 18000,
    category: "Gadgets",
    imageUrl: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80",
    whatsapp: "919876543210",
  },
  {
    id: "5",
    title: "Bicycle - Hero Sprint 21 Gear",
    price: 3200,
    category: "Other",
    imageUrl: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80",
    whatsapp: "919876543210",
  },
  {
    id: "6",
    title: "Calculus Early Transcendentals 8th Ed",
    price: 450,
    category: "Books & Material",
    imageUrl: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
    whatsapp: "919876543210",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-24">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <main className="max-w-7xl mx-auto px-6 pt-32 space-y-20">
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

        {/* Feed Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Latest Listings</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockListings.map((listing) => (
              <ProductCard key={listing.id} {...listing} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
