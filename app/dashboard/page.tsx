"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.email !== "angeljonez0410@gmail.com") {
      router.replace("/");
    }
  }, [session, status, router]);

  if (status === "loading" || !session) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Welcome, {session.user?.email}!</p>
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-2">Site Overview</h2>
        <ul className="list-disc pl-6">
          <li>View and manage users (future feature)</li>
          <li>See sales and analytics (future feature)</li>
          <li>Edit content and offers (future feature)</li>
        </ul>
        <p className="mt-4 text-gray-500 text-sm">(This is a starter dashboard. Expand as needed!)</p>
      </div>
    </div>
  );
}
