// src/app/api/me/route.ts

import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { error } from "console";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.log("No token provided");
      
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
      });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Decoded token from /api/me", decodedToken);

    return new Response(JSON.stringify(decodedToken), { status: 200 });
  } catch (error: any) {
    console.log("JWT verification error:", error.message);
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
    });
  }
}
