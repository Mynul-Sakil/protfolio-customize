"use client";

import { motion } from "framer-motion";

interface AboutProps {
  profile: {
    professionalSummary?: string;
  } | null;
}

const workingPrinciples = [
  {
    title: "Reliability Under Real Traffic",
    description:
      "Every API and database schema is designed with indexing, caching, and background queues so systems stay fast as users grow.",
  },
  {
    title: "Security & Compliance Built In",
    description:
      "Experience implementing granular RBAC (CASL, JWT), multi-tenant data isolation, and automated audit trails for sensitive domains.",
  },
  {
    title: "Clear, Asynchronous Communication",
    description:
      "Used to working directly with founders, product managers, and remote engineering teams—surfacing tradeoffs early and shipping on schedule.",
  },
];

export default function AboutSection({ profile }: AboutProps) {
  if (!profile?.professionalSummary) return null;

  return (
    <section id="about" className="py-20 md:py-24 bg-page border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Executive Summary */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
              05 / Background
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink mb-6">
              Engineering grounded in business outcomes.
            </h2>
            <p className="font-sans text-base md:text-lg text-ink-2 leading-relaxed">
              {profile.professionalSummary}
            </p>
          </div>

          {/* Right: Working Principles */}
          <div className="lg:col-span-5 space-y-6 lg:pt-8">
            {workingPrinciples.map((item) => (
              <div
                key={item.title}
                className="pl-5 border-l-2 border-line-strong hover:border-brass transition-colors"
              >
                <h3 className="font-sans text-sm font-semibold text-ink mb-1">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-slate leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
