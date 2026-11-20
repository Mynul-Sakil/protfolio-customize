"use client";

interface ImpactStat {
  _id?: string;
  value: string;
  label: string;
  order: number;
}

interface ImpactSectionProps {
  stats: ImpactStat[];
}

const executivePillars = [
  {
    audience: "For CEOs & Founders",
    headline: "Faster Product Delivery, End to End",
    body: "I take complex business ideas—like multi-tenant SaaS platforms, booking systems, and customer portals—from database design all the way to live web and mobile products.",
  },
  {
    audience: "For CFOs & Operations",
    headline: "Lower Infrastructure Cost & Operational Risk",
    body: "I prevent expensive downtime and bottlenecks using Redis caching, background job queues (BullMQ), automated Stripe billing, and HIPAA/PIPEDA-ready audit logging.",
  },
  {
    audience: "For HR & Engineering Leads",
    headline: "Dependable Remote Ownership",
    body: "2+ years delivering production TypeScript, Node.js, Next.js, and PostgreSQL systems with remote North American and global teams—backed by CI/CD and automated testing.",
  },
];

export default function ImpactSection({ stats }: ImpactSectionProps) {
  return (
    <section id="impact" className="py-20 md:py-24 bg-page border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
            01 / Business Value
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink mb-4">
            What I deliver for leadership and hiring teams.
          </h2>
          <p className="font-sans text-base text-slate leading-relaxed">
            Clear outcomes in plain language—whether you are evaluating engineering ROI, system reliability, or team fit.
          </p>
        </div>

        {/* 3-Column Executive Value Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {executivePillars.map((pillar) => (
            <div
              key={pillar.audience}
              className="p-7 rounded-xl border border-line bg-parchment flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-brass mb-3">
                  {pillar.audience}
                </div>
                <h3 className="font-serif text-xl font-medium text-ink mb-3 leading-snug">
                  {pillar.headline}
                </h3>
                <p className="font-sans text-sm text-ink-2 leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hairline Key Metrics Strip (DB-driven) */}
        {stats && stats.length > 0 && (
          <div className="rounded-xl border border-line bg-parchment overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-line">
              {stats.map((stat, index) => (
                <div key={stat._id || index} className="p-6 md:p-7 flex flex-col justify-center">
                  <div
                    className={`font-serif font-medium text-ink mb-1.5 whitespace-nowrap ${
                      stat.value.length > 5 ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-slate">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
