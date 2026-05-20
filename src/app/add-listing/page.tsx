"use client";

import React, { useState, useCallback, useRef } from "react";
import { Package, IndianRupee, Tags, AlignLeft, Phone, UploadCloud, ArrowRight, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AddListingPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    whatsapp: "",
  });

  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [accessDeniedError, setAccessDeniedError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter((file) => file.type.startsWith("image/"));

    if (files.length + validFiles.length > 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }

    const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file));

    setFiles((prev) => [...prev, ...validFiles]);
    setPreviewUrls((prev) => [...prev, ...newPreviewUrls]);
  };

  const removeImage = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async () => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const response = await fetch("/api/upload-listing-image", {
        method: "POST",
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      uploadedUrls.push(data.secure_url);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAccessDeniedError(null);
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }

    setIsUploading(true);
    try {
      const cloudinaryUrls = await uploadImages();

      const finalPayload = {
        ...formData,
        price: parseFloat(formData.price),
        images: cloudinaryUrls,
      };

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      if (response.status === 403) {
        setAccessDeniedError("Access Denied: Your account is awaiting admin approval.");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save listing");
      }

      router.push("/dashboard");
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(error.message || "Failed to post listing. Please try again.");
    } finally {
      setIsUploading(false);
    }
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
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [files]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

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

        {accessDeniedError && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3">
            <div className="p-1 bg-red-500/20 rounded-full mt-0.5">
              <X size={16} className="text-red-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-red-400">Action Not Allowed</h3>
              <p className="text-sm text-red-400/80 mt-1">{accessDeniedError}</p>
            </div>
          </div>
        )}

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

          {/* Image Upload Dropzone */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-widest ml-1">
                Product Images
              </label>
              <span className="text-xs text-zinc-500 font-medium">
                {files.length} / 4
              </span>
            </div>
            
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[200px] ${
                isDragging
                  ? "border-white/40 bg-white/5 scale-[1.01]"
                  : files.length >= 4 
                    ? "border-zinc-800 bg-zinc-900/50 opacity-50 cursor-not-allowed"
                    : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50 bg-black/20"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                ref={fileInputRef}
                onChange={onFileSelect}
                disabled={files.length >= 4 || isUploading}
                className="hidden"
              />
              <div className="mb-4 p-3 rounded-full bg-zinc-800/50 text-zinc-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
                <UploadCloud size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1 tracking-tight">
                {files.length >= 4 ? "Max Images Reached" : "Upload Images"}
              </h3>
              <p className="text-zinc-400 text-center max-w-xs text-sm leading-relaxed mb-4">
                Drag & drop product images here, or click to browse. (Max 4 images)
              </p>
            </div>

            {/* Image Previews */}
            {previewUrls.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800 group bg-zinc-950">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      disabled={isUploading}
                      className="absolute top-2 right-2 p-1.5 bg-red-500/80 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-red-500 hover:scale-110 transition-all duration-300 disabled:opacity-0"
                    >
                      <X size={14} strokeWidth={3} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isUploading || files.length === 0}
            className="w-full relative group overflow-hidden bg-white text-black font-bold py-4 rounded-xl transition-all hover:bg-zinc-200 active:scale-[0.98] mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            <div className="relative flex items-center justify-center gap-2">
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <span>Post Listing</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </div>
          </button>
        </form>

      </div>
    </div>
  );
}
