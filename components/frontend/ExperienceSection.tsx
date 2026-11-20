"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, ArrowUpRight, X, Building2, Calendar, Target } from "lucide-react";

interface ExperienceProps {
  experiences: any[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  if (!experiences || experiences.length === 0) return null;

  return (
    <>
      <section id="experience" className="py-24 bg-page relative overflow-hidden">
        
        {/* Subtle Background glow */}
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-brass/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1.5 rounded-full bg-brass/10 border border-brass/20 text-brass font-medium text-xs tracking-wide flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              Career Trajectory
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-ink mb-12 tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass to-brass-light">Experience</span> & Roles
          </h2>

          {/* Grid of Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => {
              const isCurrent = exp.organization.toLowerCase().includes("cansoft") || exp.endDate.toLowerCase().includes("present");
              return (
                <motion.div
                  key={exp._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedExperience(exp)}
                  className={`rounded-3xl border ${
                    isCurrent 
                      ? "border-brass/30 bg-gradient-to-br from-parchment to-card-highlight shadow-xl shadow-brass/5" 
                      : "border-line bg-parchment hover:border-brass/30"
                  } p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition-all duration-300 relative overflow-hidden`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 right-0 px-5 py-1.5 bg-brass text-white font-sans text-[10px] font-bold rounded-bl-2xl uppercase tracking-widest shadow-md">
                      Current Role
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 font-sans font-medium text-xs text-brass-light mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.startDate} — {exp.endDate}</span>
                    </div>

                    <h3 className="font-sans text-xl md:text-2xl font-bold text-ink group-hover:text-brass transition-colors flex items-center gap-2 mb-2">
                      <Building2 className="w-5 h-5 text-slate/50 shrink-0" />
                      <span>{exp.organization}</span>
                    </h3>

                    <h4 className="font-sans text-sm md:text-base font-semibold text-brass mb-4">
                      {exp.role}
                    </h4>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <p className="font-sans text-sm text-slate line-clamp-2 leading-relaxed mb-6 font-light">
                        {exp.responsibilities[0]}
                      </p>
                    )}
                  </div>

                  <div className="pt-5 border-t border-line flex items-center justify-between font-sans text-sm font-medium text-slate group-hover:text-brass transition-colors">
                    <span>View full details</span>
                    <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center group-hover:bg-brass/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

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
              className="relative w-full max-w-2xl max-h-[90vh] bg-parchment border border-line-strong flex flex-col overflow-hidden shadow-2xl rounded-3xl z-10"
            >
              {/* Modal Window Header */}
              <div className="px-6 py-4 bg-surface-subtle border-b border-line flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-2 font-sans font-semibold text-sm text-ink">
                  <Briefcase className="w-4 h-4 text-brass" />
                  <span>Role Details</span>
                </div>
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="w-8 h-8 flex items-center justify-center bg-surface-subtle border border-line-strong text-slate hover:text-ink hover:bg-surface-hover transition-all rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto font-sans">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brass/10 border border-brass/20 font-medium text-xs text-brass mb-4">
                  <span>{selectedExperience.startDate} — {selectedExperience.endDate}</span>
                </div>
                
                <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-ink mb-2">
                  {selectedExperience.organization}
                </h3>
                
                <p className="font-sans text-base md:text-lg text-brass-light font-semibold mb-8">
                  {selectedExperience.role}
                </p>

                <div className="space-y-4 pt-6 border-t border-line">
                  <h4 className="font-sans text-xs uppercase tracking-widest text-slate font-bold mb-4 flex items-center gap-2">
                    <Target className="w-4 h-4 text-brass" /> Key Achievements & Responsibilities
                  </h4>
                  <ul className="space-y-4 font-sans text-sm md:text-base text-ink-2">
                    {selectedExperience.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start bg-surface-subtle p-4 rounded-xl border border-line">
                        <span className="w-2 h-2 rounded-full bg-brass mt-2 mr-4 shrink-0"></span>
                        <span className="leading-relaxed font-light">{resp}</span>
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
