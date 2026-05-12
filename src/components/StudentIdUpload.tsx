"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, IdCard, X, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function StudentIdUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setIsUploading(true);
      setIsUploaded(false);

      try {
        const formData = new FormData();
        formData.append("file", selectedFile);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const data = await response.json();
        console.log("Cloudinary URL:", data.secure_url);

        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setPreviewUrl(url);
        setIsUploaded(true);
      } catch (error) {
        console.error("Upload error:", error);
        alert("Failed to upload image. Please try again.");
      } finally {
        setIsUploading(false);
      }
    } else {
      alert("Please upload a valid image file (JPG, PNG).");
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) handleFileChange(selectedFile);
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
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) handleFileChange(droppedFile);
  }, []);

  const removeFile = () => {
    setFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setIsUploaded(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[280px] ${
          isDragging
            ? "border-white/40 bg-white/5 scale-[1.01]"
            : "border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/50"
        } ${file ? "border-emerald-500/30 bg-emerald-500/5" : "bg-black/20"}`}
      >
        {!file ? (
          <>
            <div className="mb-5 p-4 rounded-full bg-zinc-800/50 text-zinc-300 transition-transform duration-300 group-hover:scale-110 group-hover:text-white">
              <UploadCloud size={40} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
              Upload Student ID
            </h3>
            <p className="text-zinc-400 text-center mb-6 max-w-xs text-sm leading-relaxed">
              Drag and drop your student ID card here, or click to browse files.
            </p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-8 py-2.5 bg-white text-black rounded-lg font-bold shadow-lg hover:bg-zinc-200 transition-all active:scale-95 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Browse Files"}
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-video max-h-[220px] rounded-xl overflow-hidden border border-zinc-800 shadow-2xl mb-5 bg-zinc-950">
              {previewUrl && (
                <Image
                  src={previewUrl}
                  alt="Student ID Preview"
                  fill
                  className="object-contain"
                />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="absolute top-3 right-3 p-1.5 bg-zinc-900/80 text-white rounded-full backdrop-blur-md border border-white/10 hover:bg-zinc-800 transition-all hover:scale-110"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
              <CheckCircle2 size={18} />
              <span>{isUploaded ? "Verification Successful" : file.name}</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-widest">
              {(file.size / 1024 / 1024).toFixed(2)} MB • {isUploaded ? "VERIFIED" : "READY"}
            </p>
          </div>
        )}
      </div>

      {/* Trust Badge / Disclaimer */}
      <div className="flex items-start gap-4 p-5 rounded-2xl bg-black/40 border border-zinc-800 backdrop-blur-md">
        <div className="mt-1 text-zinc-400">
          <IdCard size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-bold text-white tracking-tight">
            Identity Verification
          </p>
          <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
            Your ID is used strictly for internal verification purposes. It is encrypted, never shared with other users, and deleted after validation.
          </p>
        </div>
      </div>
    </div>
  );
}
