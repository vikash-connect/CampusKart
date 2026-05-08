"use client";

import React, { useState, useRef, useCallback } from "react";
import { UploadCloud, IdCard, X, FileText, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function StudentIdUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (selectedFile: File) => {
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
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
  };

  return (
    <div className="w-full max-w-xl mx-auto space-y-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-8 flex flex-col items-center justify-center min-h-[260px] ${
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-muted-foreground/20 hover:border-primary/50 hover:bg-muted/30"
        } ${file ? "border-green-500/50 bg-green-500/5" : ""}`}
      >
        {!file ? (
          <>
            <div className="mb-4 p-4 rounded-full bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
              <UploadCloud size={40} />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Upload Student ID
            </h3>
            <p className="text-muted-foreground text-center mb-6 max-w-xs">
              Drag and drop your student ID card here, or click to browse.
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
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
            >
              Browse Files
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-video max-h-[200px] rounded-xl overflow-hidden border border-border shadow-md mb-4 bg-muted">
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
                className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full shadow-lg hover:scale-110 transition-transform"
                title="Remove image"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium">
              <CheckCircle2 size={18} />
              <span>{file.name}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>
        )}
      </div>

      {/* Trust Badge / Disclaimer */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-muted/50 border border-border">
        <div className="mt-0.5 text-primary">
          <IdCard size={20} />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">
            Verification Required
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            Your ID is used only for verification and is never shared with other
            users. It helps maintain a safe community for everyone.
          </p>
        </div>
      </div>
    </div>
  );
}
