import CheckoutButton from "@/components/CheckoutButton";
import { PRICE_CURRENT } from "@/data/content";
import { ebookBulletPoints } from "@/lib/constants";

export default function Solution() {
  return (
    <section id="solution" className="py-16">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="rounded-3xl bg-[#fff7ef] p-6 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 rounded-2xl bg-[#1c1b1b] p-4 text-white shadow-md">
              <p className="text-xs uppercase tracking-[0.16em] text-[#ffd98f]">
                Cover
              </p>
              <h3 className="mt-3 text-xl font-bold">Mom Hustle Tees</h3>
            </div>
            <div className="space-y-4">
              <div className="h-30 rounded-2xl bg-[#fce1ea]" />
              <div className="h-30 rounded-2xl bg-[#dbe8d1]" />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
            Introducing: Your Step-by-Step T-Shirt Business Blueprint
          </h2>
          <ul className="mt-6 space-y-4">
            {ebookBulletPoints.map((item) => (
              <li key={item} className="flex gap-3 text-[#302b2b]">
                <span className="mt-1">✅</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <CheckoutButton
              label={`Get The Guide - $${PRICE_CURRENT}`}
              source="solution"
              className="bg-[#d6ab42] text-black shadow-lg shadow-[#d6ab42]/30 hover:bg-[#e1ba57]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
