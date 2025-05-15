// src/app/api/test-db/route.ts
import { connectToDB } from "@/lib/utils/connectToDB";
import { NextResponse } from "next/server";


connectToDB();

export async function GET() {
  try {
    return NextResponse.json({ message: "✅ DB connected successfully!" });
  } catch (error) {
    return NextResponse.json({ message: "❌ DB connection error!" });
  }
}
