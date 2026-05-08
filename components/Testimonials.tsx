import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#f8d9e4]/40 py-16">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl text-[#1f1c1c] sm:text-4xl">
          What Moms Are Saying
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-3xl bg-white p-6 shadow-md">
              <div className="mb-4 h-12 w-12 rounded-full bg-[#dbe8d1]" />
              <p className="text-sm text-[#2f2b2b]">&ldquo;{item.quote}&rdquo;</p>
              <p className="mt-4 font-semibold text-[#181616]">{item.name}</p>
              <p className="mt-2 text-[#d6ab42]">⭐⭐⭐⭐⭐</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
