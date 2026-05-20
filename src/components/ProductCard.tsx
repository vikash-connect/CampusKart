import React from "react";
import Image from "next/image";
import { IndianRupee, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  whatsapp: string;
}

export default function ProductCard({
  id,
  title,
  price,
  category,
  imageUrl,
  whatsapp,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/5">
      {/* Image Container */}
      <Link href={`/product/${id}`} className="relative block aspect-square w-full bg-zinc-950 overflow-hidden cursor-pointer">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase text-zinc-300 pointer-events-none">
          {category}
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4">
        <div>
          <Link href={`/product/${id}`}>
            <h3 className="font-semibold text-lg text-white line-clamp-2 leading-snug hover:text-emerald-400 transition-colors" title={title}>
              {title}
            </h3>
          </Link>
          <div className="flex items-center text-emerald-400 font-bold mt-2 text-xl">
            <IndianRupee size={18} className="mr-0.5" />
            {price.toLocaleString("en-IN")}
          </div>
        </div>

        {/* Action Button */}
        <Link
          href={`https://wa.me/${whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-sm font-semibold text-zinc-300 hover:bg-white hover:text-black hover:border-white transition-all active:scale-95 mt-2"
        >
          <MessageCircle size={16} />
          Contact Seller
        </Link>
      </div>
    </div>
  );
}
