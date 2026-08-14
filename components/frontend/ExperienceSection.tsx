"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

interface ExperienceProps {
  experiences: any[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  if (!experiences || experiences.length === 0) return null;

  const marqueeItems = [...experiences, ...experiences, ...experiences];

  return (
    <>
      <section id="experience" className="py-24 bg-page overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">My Journey</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Experience.</h3>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          <motion.div
            className="flex whitespace-nowrap gap-6 md:gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {marqueeItems.map((exp, index) => (
              <div 
                key={`${exp._id}-${index}`}
                className="w-72 sm:w-80 md:w-96 shrink-0 bg-parchment p-6 border border-line flex flex-col hover:-translate-y-2 transition-transform duration-300 group-hover:border-brass cursor-pointer"
                onClick={() => setSelectedExperience(exp)}
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-brass block mb-3 bg-brass/10 px-2 py-1 inline-block self-start">
                  {exp.startDate} - {exp.endDate}
                </span>
                
                <h4 className="font-serif text-xl font-semibold text-ink whitespace-normal line-clamp-2 mb-1">
                  {exp.role}
                </h4>
                
                <p className="font-sans text-sm text-slate whitespace-normal line-clamp-2 mb-6">
                  {exp.organization}
                </p>
                
                <button 
                  className="mt-auto font-mono text-[10px] uppercase tracking-widest text-brass hover:text-ink transition-colors flex items-center gap-1 self-start"
                >
                  Show Details <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedExperience && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExperience(null)}
              className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-page border border-line flex flex-col overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-parchment border border-line text-slate hover:text-ink hover:border-brass transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-brass block mb-2">
                  {selectedExperience.startDate} - {selectedExperience.endDate}
                </span>
                
                <h4 className="font-serif text-3xl font-semibold text-ink mb-2">
                  {selectedExperience.role}
                </h4>
                
                <p className="font-sans text-lg text-slate mb-8">
                  {selectedExperience.organization}
                </p>

                <div className="space-y-4">
                  <h5 className="font-mono text-xs uppercase tracking-widest text-brass mb-4 border-b border-line pb-2">
                    Key Responsibilities
                  </h5>
                  <ul className="space-y-3">
                    {selectedExperience.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start text-ink-2 font-sans text-base">
                        <span className="text-brass mr-3 mt-1.5 opacity-60">▹</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
