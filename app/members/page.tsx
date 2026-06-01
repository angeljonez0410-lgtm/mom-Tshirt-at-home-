"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getPurchaseByEmail } from "@/lib/purchases";

export default function MembersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
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

  const purchase = getPurchaseByEmail(session.user?.email || "");
  const ebookUrl =
    process.env.NEXT_PUBLIC_EBOOK_PDF_URL ||
    "/images/page-previews/preview-1.svg";

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#fff7ef] to-[#ffe4ea] px-4 py-16">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-4xl text-[#1a1717] sm:text-5xl mb-2">
            Welcome, {session.user?.name || session.user?.email}! 👋
          </h1>
          <p className="text-lg text-[#413c3c]">Your member dashboard</p>
        </div>

        {/* Purchase Status */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10 mb-6">
          <h2 className="text-2xl font-bold text-[#1a1717] mb-4">Purchase Status</h2>
          {purchase ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
                <p className="text-green-800 font-semibold">✓ Purchase Complete</p>
                <p className="text-green-700 text-sm mt-1">
                  Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-[#6b6565] font-semibold">Product</p>
                  <p className="text-[#1a1717]">{purchase.productName}</p>
                </div>
                <div>
                  <p className="text-[#6b6565] font-semibold">Amount Paid</p>
                  <p className="text-[#1a1717]">${(purchase.amount / 100).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-blue-800 font-semibold">No purchases yet</p>
              <p className="text-blue-700 text-sm mt-1">
                <a href="/#pricing" className="underline font-semibold">View our offers</a>
              </p>
            </div>
          )}
        </div>

        {/* Downloads */}
        {purchase && (
          <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10 mb-6">
            <h2 className="text-2xl font-bold text-[#1a1717] mb-4">Your Downloads</h2>
            <a
              href={ebookUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#d6ab42] px-8 py-3 text-base font-bold text-black shadow-lg shadow-[#d6ab42]/30 transition hover:bg-[#e1ba57]"
            >
              📖 Download Your Ebook (PDF)
            </a>
            <p className="text-sm text-[#6b6565] mt-4">
              Your download link is always available here. You can also check your email for a backup link.
            </p>
          </div>
        )}

        {/* Member Benefits */}
        <div className="bg-white rounded-[2rem] p-8 shadow-2xl shadow-black/10">
          <h2 className="text-2xl font-bold text-[#1a1717] mb-4">What's Included</h2>
          <ul className="space-y-3 text-[#3f3b3b]">
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>📖 14-page comprehensive ebook (PDF)</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>📋 Printable worksheets and checklists</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>💡 25 viral T-shirt design ideas</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>📱 TikTok content calendar</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>🏪 Supplier resource list</span>
            </li>
            <li className="flex items-start">
              <span className="mr-3 text-[#d6ab42] font-bold">✓</span>
              <span>💯 30-Day Money-Back Guarantee</span>
            </li>
          </ul>
        </div>

        {/* Account Info */}
        <div className="mt-6 text-center text-sm text-[#6b6565]">
          <p>Email: {session.user?.email}</p>
          {session.isAdmin && (
            <div className="mt-4">
              <a
                href="/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#d6ab42] text-black rounded-full font-semibold hover:bg-[#e1ba57] transition"
              >
                ⚙️ Admin Dashboard
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}