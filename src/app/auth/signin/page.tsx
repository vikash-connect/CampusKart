"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 font-sans">
      {/* Background Texture - Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Subtle Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[128px] -z-10 animate-pulse" />

      {/* Sign-In Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-black/40 p-10 shadow-2xl backdrop-blur-md">
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-3xl font-bold tracking-tighter text-white md:text-4xl">
              CampusKart
            </h1>
            <p className="text-sm font-medium text-zinc-400">
              The professional marketplace for students.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="group relative flex w-full items-center justify-center gap-3 rounded-lg bg-white px-4 py-3.5 text-sm font-bold text-black transition-all duration-200 hover:bg-zinc-200 active:scale-[0.98]"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-10 text-center text-[11px] text-zinc-500 uppercase tracking-widest font-semibold">
            <p>
              By signing in, you agree to our{" "}
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                Terms
              </a>{" "}
              &{" "}
              <a href="#" className="text-zinc-300 hover:text-white transition-colors">
                Privacy
              </a>
            </p>
          </div>
        </div>
        
        {/* Version / Bottom Text */}
        <div className="mt-8 text-center">
          <span className="text-[10px] text-zinc-600 font-mono tracking-tighter">
            CAMPUSKART.CORE.V1.0.4
          </span>
        </div>
      </div>
    </div>
  );
}
