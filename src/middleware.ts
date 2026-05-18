import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname } = req.nextUrl;

    // @ts-ignore
    const isOnboarded = token?.isOnboarded;

    // 1. If not onboarded and trying to access protected routes (excluding API and root), redirect to /onboarding
    if (token && !isOnboarded && pathname !== "/onboarding" && !pathname.startsWith("/api") && pathname !== "/") {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // 2. If already onboarded and trying to access /onboarding or /, redirect to /dashboard
    if (token && isOnboarded && (pathname === "/onboarding" || pathname === "/")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        // Allow public access to root path
        if (req.nextUrl.pathname === "/") {
          return true;
        }
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*", 
    "/onboarding", 
    "/home/:path*",
    // Add other protected routes here
  ],
};
