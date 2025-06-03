//src/app/dashboard/page.tsx
"use client"
import React from 'react'
import { logout } from '@/lib/utils/actions.nextAuth'
import { useRouter } from 'next/navigation'

const page = () => {
const router = useRouter();

    const handleLogout = async () => {
       const url = await logout();
       console.log("url", url);
       
       if (url) {
        router.push(url);
       } else{router.push("/");
}
    };

  return (
    <div>
      Dashboard
      <p>
        <button onClick={
            async() => {
                await logout();
                router.push("/");
            }
        }>Logout</button>
      </p>
    </div>
  )
}

export default page
