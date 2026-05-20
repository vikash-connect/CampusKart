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

    const data = await request.json();
    const { title, price, category, description, whatsapp, images } = data;

    if (!title || price === undefined || !category || !description || !whatsapp || !images || images.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // @ts-ignore
    const sellerId = session.user.id;

    const newListing = {
      title,
      price: parseFloat(price),
      category,
      description,
      whatsapp,
      images,
      sellerId: new ObjectId(sellerId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("listings").insertOne(newListing);

    return NextResponse.json({ success: true, listingId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Listing creation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const listings = await db
      .collection("listings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ listings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
