"use client";

interface TestimonialItem {
  _id?: string;
  name: string;
  role: string;
  feedback: string;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-page border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
            Endorsements
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
            What colleagues &amp; clients say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((test, index) => (
            <blockquote
              key={test._id || index}
              className="p-7 rounded-xl border border-line bg-parchment flex flex-col justify-between"
            >
              <p className="font-serif text-lg text-ink leading-relaxed mb-6">
                &ldquo;{test.feedback}&rdquo;
              </p>
              <footer className="pt-4 border-t border-line">
                <div className="font-sans text-sm font-semibold text-ink">{test.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-slate mt-0.5">
                  {test.role}
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
