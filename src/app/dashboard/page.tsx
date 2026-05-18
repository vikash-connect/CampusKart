import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {session.user?.name}!</h2>
          <p className="text-zinc-400">
            You have successfully completed the onboarding process.
          </p>
        </div>
      </div>
    </div>
  );
}
