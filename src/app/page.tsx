import React from "react";
import ProductCard from "@/components/ProductCard";
import clientPromise from "@/lib/mongodb";
import { PackagePlus } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getListings() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const listings = await db
      .collection("listings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
      
    return listings.map(listing => ({
      id: listing._id.toString(),
      title: listing.title,
      price: listing.price,
      category: listing.category,
      imageUrl: listing.images && listing.images.length > 0 ? listing.images[0] : "",
      whatsapp: listing.whatsapp,
    }));
  } catch (error) {
    console.error("Failed to fetch listings directly:", error);
    return [];
  }
}

export default async function HomePage() {
  const listings = await getListings();

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
          
          {listings.length === 0 ? (
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center max-w-2xl mx-auto">
              <div className="bg-black/50 p-4 rounded-full mb-4">
                <PackagePlus size={32} className="text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No listings found</h3>
              <p className="text-zinc-400 mb-6">
                There are currently no items for sale. Be the first to post something!
              </p>
              <Link
                href="/add-listing"
                className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Post an Item
              </Link>
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
