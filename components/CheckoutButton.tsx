"use client";

import { useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type CheckoutButtonProps = {
  label: string;
  className?: string;
  source?: string;
};

export default function CheckoutButton({
  label,
  className = "",
  source = "unknown",
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function onClick() {
    setLoading(true);

    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "cta_click", {
        source,
        label,
      });
      window.gtag("event", "checkout_initiated", {
        source,
      });
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ source }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert("Checkout is unavailable right now. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`min-h-11 rounded-full px-6 py-3 text-base font-bold transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
    >
      {loading ? "Preparing checkout..." : label}
    </button>
  );
}
