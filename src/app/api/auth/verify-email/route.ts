// src/app/api/auth/verify-email/route.ts
import { connectToDB } from "@/lib/utils/connectToDB";
import { User } from "@/lib/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
// import react hot toast
import toast, { Toaster } from "react-hot-toast";

connectToDB();

export async function GET(req: NextRequest) {
  const EmailVerifyToken = req.nextUrl.searchParams.get("token");

  if (!EmailVerifyToken) {
    return NextResponse.json({ error: "Token is missing" }, { status: 400 });
  }

  try {
    const user = await User.findOne({
  verifyToken: EmailVerifyToken,
  verifyTokenExpiry: { $gt: Date.now() },
});

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    user.verified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
     
console.log("✅ Email verified successfully, redirecting to signin...");
return NextResponse.redirect(`${process.env.DOMAIN}/signin?verified=success`);


    // you can add a redirect here and return later, but you need to create the route: 
    // ${process.env.DOMAIN}/verify-email/success

    // return NextResponse.redirect(`${process.env.DOMAIN}/verify-email/success`);

    
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({ error: "Email verification failed" }, { status: 500 });
  }
}
