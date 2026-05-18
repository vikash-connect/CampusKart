"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IndianRupee, Trash2, Loader2, PackagePlus } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchListings();
    }
  }, [status]);

  const fetchListings = async () => {
    try {
      const res = await fetch("/api/listings/me");
      if (res.ok) {
        const data = await res.json();
        setListings(data.listings);
      }
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/listings/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove from UI state
        setListings((prev) => prev.filter((listing) => listing._id !== id));
      } else {
        alert("Failed to delete listing.");
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("An error occurred while deleting.");
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="animate-spin text-zinc-500" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 py-24 relative overflow-hidden">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[0%] left-[20%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-zinc-400 mt-2">
              Welcome back, {session?.user?.name}! Manage your active listings below.
            </p>
          </div>
          <Link
            href="/add-listing"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-zinc-200 transition-colors active:scale-95"
          >
            <PackagePlus size={18} />
            Post New Item
          </Link>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight border-b border-white/10 pb-4">
            My Active Listings
          </h2>

          {listings.length === 0 ? (
            <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
              <div className="bg-black/50 p-4 rounded-full mb-4">
                <PackagePlus size={32} className="text-zinc-500" />
              </div>
              <h3 className="text-xl font-medium text-white mb-2">No listings yet</h3>
              <p className="text-zinc-400 max-w-sm mb-6">
                You haven't posted any items for sale. Click the button above to create your first listing.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div
                  key={listing._id}
                  className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden group hover:border-white/20 transition-all flex flex-col"
                >
                  <div className="relative aspect-video w-full bg-zinc-950 flex-shrink-0">
                    {listing.images && listing.images.length > 0 ? (
                      <Image
                        src={listing.images[0]}
                        alt={listing.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-sm">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-lg text-white line-clamp-2 leading-snug" title={listing.title}>
                        {listing.title}
                      </h3>
                      <div className="flex items-center text-emerald-400 font-bold mt-2">
                        <IndianRupee size={16} className="mr-0.5" />
                        {listing.price.toLocaleString("en-IN")}
                      </div>
                    </div>
                    <div className="flex justify-end pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleDelete(listing._id)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
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
