// src/app/helpers/forbiddenPage.tsx

// redirect to login page on click of a button

import Link from "next/link";
export default function ForbiddenPage() {
  return (
    <div className="text-center mt-20 text-red-600 text-xl font-semibold">
      🚫 Access Denied — You do not have permission to view this page.
      <br />
      <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><Link href="/signin">Go back to login</Link></button>
    </div>
  );
}
