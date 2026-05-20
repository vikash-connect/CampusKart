import React from "react";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";
import { IndianRupee, MessageCircle, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

function generateWhatsAppLink(phone: string, title: string) {
  let cleanNumber = phone.replace(/\D/g, "");
  if (cleanNumber.length === 10) {
    cleanNumber = "91" + cleanNumber;
  }
  const message = `Hi! I saw your listing for *${title}* on CampusKart. Is it still available?`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    return notFound();
  }

  const client = await clientPromise;
  const db = client.db();
  const listing = await db.collection("listings").findOne({ _id: new ObjectId(id) });

  if (!listing) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-24 pt-32">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[0%] right-[10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] left-[-10%] w-[30%] h-[30%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to Feed
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Image Gallery */}
          <div className="w-full">
            <ImageGallery images={listing.images || []} />
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col">
            <div className="space-y-6 flex-grow">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                <Tag size={12} className="text-emerald-500" />
                {listing.category}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                {listing.title}
              </h1>

              <div className="flex items-center text-3xl font-bold text-emerald-400">
                <IndianRupee size={28} className="mr-1" />
                {listing.price.toLocaleString("en-IN")}
              </div>

              <div className="h-px w-full bg-white/10 my-8" />

              <div>
                <h3 className="text-lg font-semibold mb-4 tracking-tight">Description</h3>
                <p className="text-zinc-400 leading-relaxed whitespace-pre-wrap">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <Link
                href={generateWhatsAppLink(listing.whatsapp, listing.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
              >
                <MessageCircle size={24} />
                Contact Seller on WhatsApp
              </Link>
              <p className="text-center text-xs text-zinc-500 mt-4">
                You will be redirected to WhatsApp to chat directly with the seller.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
