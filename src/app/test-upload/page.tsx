import StudentIdUpload from "@/components/StudentIdUpload";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function TestUploadPage() {
  const session = await getServerSession(authOptions);
  let initialIsVerified = false;
  let initialIdUrl = null;

  if (session?.user) {
    try {
      const client = await clientPromise;
      const db = client.db();
      // @ts-ignore
      const userId = session.user.id;
      const user = await db.collection("users").findOne({ 
        _id: new ObjectId(userId) 
      });
      
      if (user) {
        initialIsVerified = user.isVerified || false;
        initialIdUrl = user.studentIdUrl || null;
      }
    } catch (error) {
      console.error("Error fetching initial verification state:", error);
    }
  }

  return (
    <main className="relative min-h-screen py-24 px-6 overflow-hidden bg-slate-950 z-0 font-sans">
      {/* Background Flares */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Main Top Flare */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] max-w-3xl h-[300px] bg-blue-500/20 blur-[120px] rounded-full animate-float" />
        
        {/* Random Side Flares */}
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full animate-float [animation-delay:3s]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[50%] h-[500px] bg-blue-600/10 blur-[120px] rounded-full animate-float [animation-delay:6s]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[35%] h-[350px] bg-slate-500/10 blur-[90px] rounded-full animate-float [animation-delay:9s]" />
      </div>

      {/* Background Texture - Subtle Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tighter text-white mb-4 md:text-6xl">
          Verification Center
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto font-medium">
          Securely upload your student credentials to join the verified trade community on CampusKart.
        </p>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <StudentIdUpload 
          initialIsVerified={initialIsVerified} 
          initialIdUrl={initialIdUrl} 
        />
      </div>

      <div className="relative z-10 mt-20 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-7 rounded-3xl bg-black/40 border border-zinc-800 backdrop-blur-xl">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white mb-4">
            01
          </div>
          <h3 className="font-bold text-white mb-2 tracking-tight">Capture ID</h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            Take a clear, high-resolution photo of your front-side student ID card.
          </p>
        </div>
        <div className="p-7 rounded-3xl bg-black/40 border border-zinc-800 backdrop-blur-xl">
          <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-white mb-4">
            02
          </div>
          <h3 className="font-bold text-white mb-2 tracking-tight">Review & Post</h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium">
            Upload the file and wait for our team to verify your status within 24 hours.
          </p>
        </div>
      </div>
      
      {/* Bottom decorative text */}
      <div className="relative z-10 mt-24 text-center">
        <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
          CampusKart Security Protocol // Verified Student Access
        </span>
      </div>
    </main>
  );
}
