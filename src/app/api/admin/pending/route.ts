import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Admin Security Check
    if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch users with pending verification status
    const pendingUsers = await db
      .collection("users")
      .find({ verificationStatus: "pending" })
      .project({ _id: 1, name: 1, email: 1, studentIdUrl: 1, fullName: 1, collegeName: 1 }) // Only fetch needed fields
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ users: pendingUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
