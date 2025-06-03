// utils/actions.nextAuth.ts
"use server"
import { signOut, signIn } from "@/auth"

export const login = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
}

export const logout = async () => {
  const url =await signOut({redirect: false, redirectTo: "/" });
return url;
}
