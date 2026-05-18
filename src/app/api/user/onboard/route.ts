import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fullName, collegeName, hostelDetails, studentIdUrl } = await request.json();

    if (!fullName || !collegeName || !hostelDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // @ts-ignore
    const userId = session.user.id;

    await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          fullName,
          collegeName,
          hostelDetails,
          studentIdUrl, // Optional if already set by /api/upload
          isOnboarded: true,
          updatedAt: new Date(),
        },
      }
    );

    return NextResponse.json({ message: "Onboarding successful", success: true });
  } catch (error) {
    console.error("Onboarding API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
