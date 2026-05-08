"use client";

import confetti from "canvas-confetti";
import { useEffect } from "react";

const ebookUrl =
  process.env.NEXT_PUBLIC_EBOOK_PDF_URL ||
  process.env.EBOOK_PDF_URL ||
  "/images/page-previews/preview-1.svg";

export default function SuccessPage() {
  useEffect(() => {
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
    });

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "purchase_completed", { value: 37, currency: "USD" });
    }
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#fff7ef_0%,_#ffe4ea_60%,_#fddbe5_100%)] px-4 py-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-2xl shadow-black/10 sm:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7a6d6d]">
          Purchase Complete
        </p>
        <h1 className="mt-3 font-serif text-4xl text-[#1a1717] sm:text-5xl">
          Welcome to Your Mom Hustle! 🎉
        </h1>
        <p className="mt-4 text-lg text-[#413c3c]">Your ebook is ready to download.</p>

        <a
          href={ebookUrl}
          target="_blank"
          rel="noreferrer"
          className="mx-auto mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-[#d6ab42] px-8 py-3 text-base font-bold text-black shadow-lg shadow-[#d6ab42]/30 transition hover:bg-[#e1ba57]"
        >
          Download Your Ebook (PDF)
        </a>

        <div className="mt-8 space-y-2 text-sm text-[#4a4343]">
          <p>Check your email for a backup download link.</p>
          <p>Follow us on TikTok for more tips: @momhustletees</p>
          <p>
            <a href="https://www.tiktok.com/@momhustletees" className="font-semibold underline">
              TikTok
            </a>{" "}
            |{" "}
            <a href="https://www.instagram.com/momhustletees" className="font-semibold underline">
              Instagram
            </a>{" "}
            |{" "}
            <a href="https://www.pinterest.com/momhustletees" className="font-semibold underline">
              Pinterest
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
