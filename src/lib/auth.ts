import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user && token) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.isOnboarded = token.isOnboarded || false;
        // @ts-ignore
        session.user.isVerified = token.isVerified || false;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        // @ts-ignore
        token.id = user.id;
        // @ts-ignore
        token.isOnboarded = user.isOnboarded || false;
        // @ts-ignore
        token.isVerified = user.isVerified || false;
      }
      if (trigger === "update" && session) {
        // @ts-ignore
        token.isOnboarded = session.isOnboarded ?? token.isOnboarded;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
