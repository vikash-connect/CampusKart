import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";
import { ShieldAlert } from "lucide-react";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden pb-24 pt-32">
      {/* Background flares */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[10%] w-[40%] h-[40%] bg-red-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] bg-orange-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <main className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-semibold text-red-400 mb-4">
            <ShieldAlert size={14} />
            Restricted Access
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">
            Admin Dashboard
          </h1>
          <p className="text-zinc-400">
            Review pending student IDs to approve or reject marketplace access.
          </p>
        </div>

        <AdminClient />
      </main>
    </div>
  );
}
