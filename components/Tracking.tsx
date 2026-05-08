"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function sendEvent(name: string, params: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", name, params);
  }
}

export default function Tracking() {
  const maxDepth = useRef(0);
  const start = useRef<number>(Date.now());

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const pageHeight = document.body.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;

      const depth = Math.round((scrollTop / pageHeight) * 100);
      if (depth >= maxDepth.current + 25) {
        maxDepth.current = depth;
        sendEvent("scroll_depth", { depth });
      }
    }

    function onUnload() {
      const seconds = Math.round((Date.now() - start.current) / 1000);
      sendEvent("time_on_page", { seconds });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  return null;
}
