import CheckoutButton from "@/components/CheckoutButton";
import { PRICE_CURRENT, trustBadges } from "@/data/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[radial-gradient(circle_at_top,_#fff7ef_0%,_#ffe4ea_50%,_#fddbe5_100%)]"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#2c2929] shadow-sm">
            Mom Hustle Tees
          </p>
          <h1 className="font-serif text-4xl leading-tight text-[#161515] sm:text-5xl">
            Start Your T-Shirt Business From Home
          </h1>
          <p className="text-lg text-[#3f3b3b]">
            The complete guide for stay-at-home moms who want to turn creativity
            into cash.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <CheckoutButton
              label={`Get Instant Access - $${PRICE_CURRENT}`}
              source="hero"
              className="bg-[#d6ab42] text-black shadow-lg shadow-[#d6ab42]/30 hover:bg-[#e1ba57]"
            />
            <a
              href="#pricing"
              className="min-h-11 rounded-full border border-black/20 bg-white px-6 py-3 text-base font-semibold text-black transition hover:bg-black hover:text-white"
            >
              View Offer
            </a>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-[#342f2f]">
            {trustBadges.map((badge) => (
              <span key={badge} className="rounded-full bg-white px-3 py-1 shadow-sm">
                ✓ {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute -left-4 top-3 h-24 w-24 rounded-full bg-[#9caf88]/30 blur-xl" />
          <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-[#d6ab42]/40 blur-2xl" />
          <div className="relative w-full max-w-sm rounded-[2rem] bg-[#fffdf7]/90 p-5 shadow-2xl">
            <div className="rounded-2xl bg-[#1c1b1b] p-4 text-white">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ffd98f]">
                Ebook Mockup
              </p>
              <h3 className="mt-3 text-2xl font-bold">Mom Hustle Tees</h3>
              <p className="mt-2 text-sm text-zinc-200">
                The Stay-at-Home Mom&apos;s Guide to Starting a T-Shirt Business From
                Home
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="h-24 rounded-xl bg-[#f8d9e4]" />
              <div className="h-24 rounded-xl bg-[#d8e3cf]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
