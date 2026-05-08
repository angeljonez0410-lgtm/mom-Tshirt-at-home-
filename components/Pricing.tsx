import CheckoutButton from "@/components/CheckoutButton";
import { PRICE_COMPARE_AT, PRICE_CURRENT } from "@/data/content";

export default function Pricing() {
  return (
    <section id="pricing" className="py-16">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          Start Your Mom Hustle Today
        </h2>
        <div className="mt-8 rounded-[2rem] bg-white p-8 text-center shadow-2xl shadow-[#000]/10">
          <p className="inline-flex rounded-full bg-[#f8d9e4] px-4 py-1 text-xs font-extrabold tracking-[0.15em] text-[#372f2f]">
            LIMITED TIME LAUNCH PRICE
          </p>
          <p className="mt-6 text-lg text-[#555] line-through">${PRICE_COMPARE_AT}</p>
          <p className="text-6xl font-black text-[#181616]">${PRICE_CURRENT}</p>
          <ul className="mx-auto mt-6 max-w-md space-y-2 text-left text-[#2e2929]">
            <li>📖 14-page comprehensive ebook (PDF)</li>
            <li>📋 Printable worksheets and checklists</li>
            <li>💡 25 viral T-shirt design ideas</li>
            <li>📱 TikTok content calendar</li>
            <li>🎯 Supplier resource list</li>
          </ul>
          <div className="mt-8">
            <CheckoutButton
              label={`Get Instant Access - $${PRICE_CURRENT}`}
              source="pricing"
              className="w-full bg-[#d6ab42] text-black shadow-lg shadow-[#d6ab42]/30 hover:bg-[#e1ba57]"
            />
          </div>
          <p className="mt-4 text-sm text-[#484141]">
            🔒 Secure Checkout | ⚡ Instant Download | 💯 30-Day Money-Back
            Guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
