"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, XCircle, Loader2, AlertCircle } from "lucide-react";

export default function AdminClient() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const res = await fetch("/api/admin/pending");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error("Failed to fetch pending users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (userId: string, action: "approve" | "reject") => {
    try {
      const res = await fetch("/api/admin/review", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action }),
      });

      if (res.ok) {
        // Remove the user from UI state instantly
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        alert("Failed to review user");
      }
    } catch (error) {
      console.error("Review action failed:", error);
      alert("Error performing action");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {users.length === 0 ? (
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
          <AlertCircle size={48} className="text-zinc-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No pending reviews</h3>
          <p className="text-zinc-400">All student IDs have been processed.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div
                className="relative aspect-[3/2] w-full bg-zinc-950 cursor-pointer group"
                onClick={() => setSelectedImage(user.studentIdUrl)}
              >
                {user.studentIdUrl ? (
                  <Image
                    src={user.studentIdUrl}
                    alt="Student ID"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold">
                  Click to Enlarge
                </div>
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white truncate">{user.fullName || user.name}</h3>
                <p className="text-sm text-zinc-400 mb-1 truncate">{user.email}</p>
                {user.collegeName && (
                  <p className="text-xs text-zinc-500 font-medium truncate">
                    {user.collegeName}
                  </p>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => handleReview(user._id, "approve")}
                    className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black py-2.5 rounded-xl font-semibold transition-all active:scale-95"
                  >
                    <CheckCircle size={18} />
                    Approve
                  </button>
                  <button
                    onClick={() => handleReview(user._id, "reject")}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-black py-2.5 rounded-xl font-semibold transition-all active:scale-95"
                  >
                    <XCircle size={18} />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 cursor-pointer"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src={selectedImage}
              alt="Enlarged Student ID"
              fill
              className="object-contain"
            />
          </div>
          <p className="absolute bottom-8 text-white/50 text-sm font-semibold">Click anywhere to close</p>
        </div>
      )}
    </div>
  );
}
