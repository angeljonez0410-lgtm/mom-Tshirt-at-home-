import { problemPoints } from "@/data/content";

export default function Problem() {
  return (
    <section
      id="problem"
      className="bg-[#9caf88]/20 py-16"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          Tired of Asking for Money? Ready to Build Something of Your Own?
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {problemPoints.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl bg-white p-6 shadow-md transition hover:-translate-y-1"
            >
              <p className="text-3xl">{item.icon}</p>
              <p className="mt-4 text-base font-semibold text-[#2c2727]">
                {item.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
