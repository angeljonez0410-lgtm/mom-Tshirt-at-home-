import { whatsInsideCards } from "@/data/content";

export default function WhatsInside() {
  return (
    <section id="inside" className="bg-[#fff7ef] py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          What You'll Learn Inside
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {whatsInsideCards.map((card) => (
            <article
              key={card.number}
              className="rounded-3xl bg-white p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{card.icon}</span>
                <span className="rounded-full bg-[#f8d9e4] px-3 py-1 text-xs font-bold tracking-[0.12em] text-[#382f2f]">
                  {card.number}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-[#1f1c1c]">{card.title}</h3>
              <p className="mt-2 text-sm text-[#454040]">{card.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
