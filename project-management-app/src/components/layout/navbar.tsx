"use client";

import { signOut } from "next-auth/react";

export default function Navbar({ session }: { session: any }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow">
      <div className="text-lg font-bold">Dashboard</div>
      <div className="flex items-center gap-4">
        <span>{session?.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
