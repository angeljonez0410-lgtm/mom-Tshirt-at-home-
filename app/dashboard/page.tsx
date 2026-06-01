"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAllPurchases } from "@/lib/purchases";

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
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea]">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  const purchases = getAllPurchases();
  const totalRevenue = purchases.reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea] px-4 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#1a1717] sm:text-5xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-lg text-[#413c3c]">Welcome, {session.user?.email}!</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-black/10">
            <p className="text-[#6b6565] text-sm font-semibold mb-2">Total Sales</p>
            <p className="text-3xl font-bold text-[#1a1717]">{purchases.length}</p>
          </div>
          <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-black/10">
            <p className="text-[#6b6565] text-sm font-semibold mb-2">Total Revenue</p>
            <p className="text-3xl font-bold text-[#1a1717]">${(totalRevenue / 100).toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-[2rem] p-6 shadow-lg shadow-black/10">
            <p className="text-[#6b6565] text-sm font-semibold mb-2">Unique Customers</p>
            <p className="text-3xl font-bold text-[#1a1717]">{new Set(purchases.map(p => p.email)).size}</p>
          </div>
        </div>

        {/* Purchases Table */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10">
          <h2 className="text-2xl font-bold text-[#1a1717] mb-4">Recent Purchases</h2>
          {purchases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b-2 border-[#e0dada]">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold text-[#6b6565]">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#6b6565]">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#6b6565]">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#6b6565]">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-[#6b6565]">Session ID</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map((purchase) => (
                    <tr key={purchase.id} className="border-b border-[#f0eded]">
                      <td className="py-3 px-4 text-[#1a1717]">{purchase.email}</td>
                      <td className="py-3 px-4 text-[#1a1717]">{purchase.productName}</td>
                      <td className="py-3 px-4 text-[#1a1717]">${(purchase.amount / 100).toFixed(2)}</td>
                      <td className="py-3 px-4 text-[#6b6565] text-xs">
                        {new Date(purchase.purchasedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-[#6b6565] text-xs">
                        {purchase.stripeSessionId.substring(0, 20)}...
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-[#6b6565] text-center py-8">No purchases yet</p>
          )}
        </div>

        {/* Admin Links */}
        <div className="mt-8 text-center">
          <a
            href="/members"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#d6ab42] text-black rounded-full font-semibold hover:bg-[#e1ba57] transition"
          >
            ← Back to Members
          </a>
        </div>
      </div>
    </main>
  );
}