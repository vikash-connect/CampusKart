import StudentIdUpload from "@/components/StudentIdUpload";

export default function TestUploadPage() {
  return (
    <main className="min-h-screen bg-zinc-950 py-24 px-6 relative overflow-hidden font-sans">
      {/* Background Texture - Subtle Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
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
        <StudentIdUpload />
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
