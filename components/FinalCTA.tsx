import CheckoutButton from "@/components/CheckoutButton";
import { PRICE_CURRENT } from "@/data/content";

export default function FinalCTA() {
  return (
    <section className="bg-[linear-gradient(120deg,_#ffdce7,_#fff7ef)] py-16">
      <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          Your Mom Hustle Starts Now
        </h2>
        <p className="mt-3 text-lg text-[#3d3838]">
          Join hundreds of moms building their T-shirt empire from home.
        </p>
        <div className="mt-8">
          <CheckoutButton
            label={`Get The Guide - $${PRICE_CURRENT}`}
            source="final-cta"
            className="bg-[#d6ab42] text-black shadow-lg shadow-[#d6ab42]/30 hover:bg-[#e1ba57]"
          />
        </div>
        <p className="mt-4 font-semibold text-[#9b5d2c]">
          ⏰ Launch price ends soon. Do not miss out.
        </p>
        <p className="mt-2 text-sm text-[#494343]">Instant access. Start today.</p>
      </div>
    </section>
  );
}
