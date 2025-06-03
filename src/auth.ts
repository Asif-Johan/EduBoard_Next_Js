// src/auth.ts
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const google_client_ID = process.env.AUTH_GOOGLE_CLIENT_ID;
const google_client_secret = process.env.AUTH_GOOGLE_CLIENT_SECRET;



export const {auth, handlers, signIn, signOut} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!
  })],
  callbacks:{
    async redirect({ url, baseUrl }) {
        return "/dashboard"
    }
  }
})