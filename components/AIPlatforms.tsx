import { aiPlatforms } from "@/data/content";

export default function AIPlatforms() {
  return (
    <section id="ai-platforms" className="bg-[#f3f7ef] py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          AI Power Hub: Claude, Gemini, and More
        </h2>
        <p className="mt-3 max-w-3xl text-[#3f3a3a]">
          Use your favorite AI platform from one place and move faster on design,
          marketing, customer support, and growth tasks.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {aiPlatforms.map((platform) => (
            <article
              key={platform.name}
              className="rounded-3xl bg-white p-6 shadow-md shadow-black/5"
            >
              <p className="inline-flex rounded-full bg-[#f8d9e4] px-3 py-1 text-xs font-bold tracking-[0.12em] text-[#3a3131]">
                {platform.badge}
              </p>
              <h3 className="mt-4 text-xl font-bold text-[#1c1818]">{platform.name}</h3>
              <p className="mt-2 text-sm text-[#4a4444]">{platform.description}</p>
              <a
                href={platform.url}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 px-4 py-2 text-sm font-semibold text-[#1f1b1b] transition hover:bg-black hover:text-white"
              >
                Open {platform.name}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
