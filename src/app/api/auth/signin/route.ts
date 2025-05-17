// src/app/api/auth/signin/route.ts
import { connectToDB } from "@/lib/utils/connectToDB";
import { User } from "@/lib/models/User";
import { ZodUserLoginSchema } from "@/lib/validators/userValidator";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDB();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsed = ZodUserLoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found", message: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (!user.verified) {
      return NextResponse.json({ error: "Please verify your email first." }, { status: 403 });
    }

    // You can issue a session or JWT here later
    //create the tokenData
    const tokenData = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    //create the token
    const token = jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

    //use in browser cookie


    // Set HTTP-only cookie using NextResponse

    const response = NextResponse.json(
      { message: "Signin successful", user: tokenData },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "strict",
      maxAge: 86400, // 1 day (in seconds)
      path: "/", // Available on all routes
    });

    console.log(`User ${email} logged in successfully, response: ${response}`);
    
    return response;
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ error: "Error signing in" }, { status: 500 });
  }
}
