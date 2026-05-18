"use client";

import React, { useState, useCallback } from "react";
import { Package, IndianRupee, Tags, AlignLeft, Phone, UploadCloud, ArrowRight } from "lucide-react";

export default function AddListingPage() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    whatsapp: "",
  });

  const [isDragging, setIsDragging] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    alert("Check console for form data. (UI-only mode)");
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Placeholder logic
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10 flex flex-col items-center justify-center p-6 relative overflow-hidden py-16">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="w-full max-w-2xl bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative">
        <div className="space-y-2 mb-10">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent">
            Sell an Item
          </h1>
          <p className="text-zinc-400">
            List your product on CampusKart. Fast, secure, and peer-to-peer.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid gap-6">
            
            {/* Product Title */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                Product Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Package size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. MacBook Air M1, Engineering Drawing Kit"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div className="space-y-2 group">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <IndianRupee size={18} />
                  </div>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="0.00"
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2 group">
                <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                  Category
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                    <Tags size={18} />
                  </div>
                  <select
                    required
                    className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="" disabled className="bg-zinc-900 text-zinc-500">Select Category</option>
                    <option value="Books" className="bg-zinc-900 text-white">Books & Material</option>
                    <option value="Electronics" className="bg-zinc-900 text-white">Electronics</option>
                    <option value="Gadgets" className="bg-zinc-900 text-white">Gadgets</option>
                    <option value="Essentials" className="bg-zinc-900 text-white">Hostel Essentials</option>
                    <option value="Other" className="bg-zinc-900 text-white">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                Description
              </label>
              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 flex items-start pointer-events-none text-zinc-500">
                  <AlignLeft size={18} />
                </div>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe the condition, age, and any accessories included..."
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="space-y-2 group">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-white">
                WhatsApp Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Phone size={18} />
                </div>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  pattern="[0-9]{10}"
                  className="w-full bg-black/40 border border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Image Upload Dropzone (UI Only) */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
              Product Images
            </label>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[200px] ${
                isDragging
                  ? "border-white/40 bg-white/5 scale-[1.01]"
                  : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 bg-black/20"
              }`}
            >
              <div className="mb-4 p-3 rounded-full bg-zinc-800/50 text-zinc-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                <UploadCloud size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                Upload Images
              </h3>
              <p className="text-zinc-400 text-center max-w-xs text-sm leading-relaxed mb-4">
                Drag & drop product images here, or click to browse. (Max 4 images)
              </p>
              <button
                type="button"
                className="px-6 py-2 bg-zinc-800 text-white rounded-lg font-semibold shadow-sm hover:bg-zinc-700 transition-all active:scale-95 text-xs"
              >
                Browse Files
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full relative group overflow-hidden bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-zinc-200 active:scale-[0.98] mt-4"
          >
            <div className="relative flex items-center justify-center gap-2">
              <span>Post Listing</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </form>

      </div>
    </div>
  );
}
