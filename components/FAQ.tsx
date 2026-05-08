"use client";

import { useState } from "react";
import { faqs } from "@/data/content";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#fff7ef] py-16">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-4">
          {faqs.map((faq, idx) => {
            const open = openIndex === idx;
            return (
              <article key={faq.question} className="rounded-2xl bg-white p-5 shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                  aria-expanded={open}
                >
                  <span className="font-semibold text-[#1d1a1a]">{faq.question}</span>
                  <span className="text-2xl">{open ? "−" : "+"}</span>
                </button>
                {open ? <p className="mt-3 text-sm text-[#4b4545]">{faq.answer}</p> : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
