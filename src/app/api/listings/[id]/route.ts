import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    if (!id || id === "undefined") {
      return NextResponse.json({ error: "Invalid listing ID" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // @ts-ignore
    const sellerId = session.user.id;

    // Verify ownership before deleting
    const listing = await db.collection("listings").findOne({
      _id: new ObjectId(id),
      sellerId: new ObjectId(sellerId),
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found or unauthorized." },
        { status: 403 }
      );
    }

    await db.collection("listings").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting listing:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
