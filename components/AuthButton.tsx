"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <button className="text-sm text-[#2c2929]">Loading...</button>;
  }

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <Link
          href="/members"
          className="text-sm font-semibold text-[#2c2929] hover:text-[#d6ab42] transition"
        >
          👤 {session.user?.email?.split("@")[0]}
        </Link>
        {session.isAdmin && (
          <Link
            href="/dashboard"
            className="text-sm font-semibold px-3 py-1 rounded-full bg-[#d6ab42] text-black hover:bg-[#e1ba57]"
          >
            Admin
          </Link>
        )}
        <button
          onClick={() => signOut()}
          className="text-sm font-semibold text-red-600 hover:text-red-800 transition"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/auth/login"
      className="text-sm font-semibold px-4 py-2 rounded-full bg-[#d6ab42] text-black hover:bg-[#e1ba57] transition"
    >
      Sign In / Sign Up
    </Link>
  );
}