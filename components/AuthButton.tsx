"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">{session.user?.email}</span>
        {session.user?.email === "angeljonez0410@gmail.com" && (
          <Link href="/dashboard" className="bg-green-600 text-white px-3 py-1 rounded">Dashboard</Link>
        )}
        <button
          className="bg-gray-200 px-3 py-1 rounded"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Log Out
        </button>
      </div>
    );
  }
  return (
    <div className="flex gap-2">
      <Link href="/login" className="bg-blue-600 text-white px-3 py-1 rounded">Log In</Link>
      <Link href="/signup" className="bg-gray-200 px-3 py-1 rounded">Sign Up</Link>
    </div>
  );
}
