"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ImageGallery({ images }: { images: string[] }) {
  const [mainImage, setMainImage] = useState(images[0] || "");

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-zinc-900 border border-white/10 rounded-3xl flex items-center justify-center text-zinc-500">
        No Image Available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative w-full aspect-square bg-zinc-950 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-emerald-500/5">
        <Image
          src={mainImage}
          alt="Product Image"
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setMainImage(img)}
              className={`relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                mainImage === img ? "border-emerald-500 scale-105" : "border-transparent hover:border-white/30"
              }`}
            >
              <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
