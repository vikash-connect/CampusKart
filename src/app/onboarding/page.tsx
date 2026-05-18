"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import StudentIdUpload from "@/components/StudentIdUpload";
import { User, School, Home, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { update } = useSession();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    hostelDetails: "",
    studentIdUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentIdUrl) {
      alert("Please upload your Student ID first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/onboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        await update({ isOnboarded: true });
        router.push("/dashboard");
      } else {
        const error = await res.json();
        alert(error.error || "Onboarding failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Complete Your Profile
          </h1>
          <p className="text-zinc-400">
            Join the CampusKart community. Verified students only.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6">
            {/* Full Name */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            {/* College Name */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                College Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <School size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="IIT Delhi"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={formData.collegeName}
                  onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
                />
              </div>
            </div>

            {/* Hostel Details */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                Hostel / Room Details
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Home size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Nilgiri Hostel, Room 204"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={formData.hostelDetails}
                  onChange={(e) => setFormData({ ...formData, hostelDetails: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Student ID Upload */}
          <div className="space-y-4">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
              Student ID Verification
            </label>
            <StudentIdUpload 
              onUploadSuccess={(url) => setFormData({ ...formData, studentIdUrl: url })}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.studentIdUrl}
            className="w-full relative group overflow-hidden bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 mt-4"
          >
            <div className="relative flex items-center justify-center gap-2">
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Finalizing Setup...</span>
                </>
              ) : formData.studentIdUrl ? (
                <>
                  <span>Complete Onboarding</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              ) : (
                <span>Upload ID to Continue</span>
              )}
            </div>
          </button>
        </form>

        <p className="mt-8 text-center text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
          Powered by CampusKart Verification Engine
        </p>
      </div>
    </div>
  );
}
