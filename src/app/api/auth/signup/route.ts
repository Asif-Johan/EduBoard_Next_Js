//src/app/api/auth/signup/route.ts
import { connectToDB } from "@/lib/utils/connectToDB";
import { User } from "@/lib/models/User";
import { ZodUserRegisterSchema } from "@/lib/validators/userValidator";
import bcrypt from "bcryptjs";
import { NextRequest ,NextResponse } from "next/server";
import { sendVerificationEmail } from "@/lib/utils/sendVerificationEmail";
import crypto from "crypto";


connectToDB();

export async function POST(req: Request) {
  try {
    const body = await req.json();

  const parsed = ZodUserRegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error }, { status: 400 });
  }

  const { name, email, password, role } = parsed.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    //return error and message of error
    return NextResponse.json({ error: "Email already registered" , message: "Email already registered"}, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  //token for email verification using crypto
  const verifyToken = crypto.randomBytes(32).toString("hex");

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    role,
    verified: false, // Email verification pending
    verifyToken: verifyToken,  
    verifyTokenExpiry: Date.now() + 24 * 60 * 60 * 1000,
  });

  const savedUser = await newUser.save();
  console.log("savedUser:", savedUser);
  

  // send email verification here
  //verification token with crypto then compare with the db to verify LATER
  //send email
  await sendVerificationEmail(savedUser.email, verifyToken);



  return NextResponse.json({ message: "User created. Verification email sent. Please verify your email." , isSuccess: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" , isSuccess: false }, { status: 500 });
  }
}
