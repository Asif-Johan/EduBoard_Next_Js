// src/app/page.tsx
'use client'

import { login } from "@/lib/utils/actions.nextAuth"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold underline">
        You Are not signed in
      </h1>
      <p>
        <button onClick={() => login()}>
          Signin
        </button>
      </p>
    
    </main>
  )
}