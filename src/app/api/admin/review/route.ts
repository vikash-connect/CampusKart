import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Admin Security Check
    if (!session || !session.user || session.user.email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    const data = await request.json();
    const { userId, action } = data;

    if (!userId || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const updateDoc: any = {
      $set: {
        verificationStatus: action === "approve" ? "approved" : "rejected",
        isVerified: action === "approve"
      }
    };

    // If rejected, optionally clear out the student ID to let them re-upload
    if (action === "reject") {
      updateDoc.$unset = { studentIdUrl: "" };
    }

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(userId) },
      updateDoc
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `User ${action}d successfully` }, { status: 200 });
  } catch (error) {
    console.error("Error updating user verification:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
