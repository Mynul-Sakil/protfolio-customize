"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

interface ExperienceItem {
  _id?: string;
  role: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate: string;
  responsibilities?: string[];
}

interface ExperienceProps {
  experiences: ExperienceItem[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  if (!experiences || experiences.length === 0) return null;

  return (
    <>
      <section id="experience" className="py-20 md:py-24 bg-page border-b border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="max-w-2xl mb-14">
            <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
              03 / Career History
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
              Where I have delivered in production.
            </h2>
          </div>

          {/* Editorial Vertical Timeline */}
          <div className="divide-y divide-line border-y border-line">
            {experiences.map((exp, index) => {
              const isCurrent = exp.endDate.toLowerCase().includes("present");
              const highlights = exp.responsibilities || [];
              const previewHighlights = highlights.slice(0, 3);
              const hasMore = highlights.length > 3;

              return (
                <motion.div
                  key={exp._id || `${exp.organization}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  className="py-9 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
                >
                  {/* Left: Dates & Location */}
                  <div className="md:col-span-4">
                    <div className="font-mono text-xs uppercase tracking-wider text-ink font-medium">
                      {exp.startDate} — {exp.endDate}
                    </div>
                    {exp.location && (
                      <div className="font-sans text-sm text-slate mt-1">
                        {exp.location}
                      </div>
                    )}
                    {isCurrent && (
                      <span className="inline-block mt-3 px-2.5 py-0.5 rounded-full text-[11px] font-mono uppercase tracking-wider bg-brass/10 text-brass border border-brass/20">
                        Current Role
                      </span>
                    )}
                  </div>

                  {/* Right: Role, Organization & Visible Highlights */}
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl font-medium text-ink">
                      {exp.role}
                    </h3>
                    <p className="font-sans text-sm font-medium text-brass mt-1 mb-5">
                      {exp.organization}
                    </p>

                    {previewHighlights.length > 0 && (
                      <ul className="space-y-3 mb-5">
                        {previewHighlights.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 font-sans text-sm md:text-[15px] text-ink-2 leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => setSelectedExperience(exp)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-ink hover:text-brass transition-colors cursor-pointer"
                      >
                        <span>View all {highlights.length} responsibilities</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full Role Details Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-parchment border border-line-strong rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="px-6 py-4 border-b border-line flex items-center justify-between sticky top-0 bg-parchment z-10">
                <span className="font-mono text-xs uppercase tracking-widest text-slate">
                  {selectedExperience.startDate} — {selectedExperience.endDate}
                </span>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setSelectedExperience(null)}
                  className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-slate hover:text-ink hover:bg-surface-subtle transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink">
                  {selectedExperience.role}
                </h3>
                <p className="font-sans text-sm font-medium text-brass mt-1 mb-6">
                  {selectedExperience.organization}
                  {selectedExperience.location ? ` · ${selectedExperience.location}` : ""}
                </p>

                <h4 className="font-mono text-[11px] uppercase tracking-widest text-slate mb-4">
                  Key Responsibilities &amp; Deliverables
                </h4>
                <ul className="space-y-3">
                  {(selectedExperience.responsibilities || []).map((resp, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-subtle border border-line font-sans text-sm text-ink-2 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-brass mt-2 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
