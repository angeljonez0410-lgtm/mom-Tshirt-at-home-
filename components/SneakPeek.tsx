"use client";

import Image from "next/image";
import { useRef } from "react";
import { previewImages } from "@/data/content";

export default function SneakPeek() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  function scrollByAmount(amount: number) {
    containerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section id="sneak-peek" className="py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
            Sneak Peek Inside
          </h2>
          <div className="hidden gap-2 md:flex">
            <button
              type="button"
              onClick={() => scrollByAmount(-320)}
              className="rounded-full border border-black/20 bg-white px-4 py-2 font-semibold"
              aria-label="Scroll previews left"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount(320)}
              className="rounded-full border border-black/20 bg-white px-4 py-2 font-semibold"
              aria-label="Scroll previews right"
            >
              →
            </button>
          </div>
        </div>
        <div
          ref={containerRef}
          className="mt-8 flex snap-x gap-4 overflow-x-auto pb-2"
        >
          {previewImages.map((src, idx) => (
            <div
              key={src}
              className="min-w-[260px] snap-start overflow-hidden rounded-3xl border border-[#eadfd5] bg-white shadow-md"
            >
              <Image
                src={src}
                alt={`Ebook preview page ${idx + 1}`}
                width={360}
                height={480}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
