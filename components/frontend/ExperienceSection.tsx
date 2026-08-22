"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Terminal, ArrowUpRight, X, GitCommit, Building2, Calendar } from "lucide-react";

interface ExperienceProps {
  experiences: any[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  const [selectedExperience, setSelectedExperience] = useState<any | null>(null);

  if (!experiences || experiences.length === 0) return null;

  return (
    <>
      <section id="experience" className="py-24 bg-[#06090E] relative overflow-hidden">
        
        {/* Glow */}
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5" />
              // DEPLOYMENT_HISTORY.log
            </span>
          </div>

          <h2 className="font-mono text-3xl md:text-5xl font-extrabold text-ink mb-12 tracking-tight">
            Work <span className="text-emerald-400">Experience</span> & Roles
          </h2>

          {/* Grid of Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experiences.map((exp, index) => {
              const isCansoft = exp.organization.toLowerCase().includes("cansoft");
              return (
                <motion.div
                  key={exp._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedExperience(exp)}
                  className={`rounded-2xl border ${
                    isCansoft 
                      ? "border-emerald-500/40 bg-[#0D1117] glow-emerald" 
                      : "border-white/10 bg-[#0D1117]/80 hover:border-emerald-500/30"
                  } p-6 sm:p-8 flex flex-col justify-between cursor-pointer group transition-all duration-300 relative overflow-hidden`}
                >
                  {isCansoft && (
                    <div className="absolute top-0 right-0 px-4 py-1 bg-emerald-500 text-[#06090E] font-mono text-[10px] font-extrabold rounded-bl-xl uppercase tracking-wider">
                      Current Position
                    </div>
                  )}

                  <div>
                    <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 mb-4">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.startDate} — {exp.endDate}</span>
                    </div>

                    <h3 className="font-mono text-xl font-bold text-ink group-hover:text-emerald-400 transition-colors flex items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-slate/60 shrink-0" />
                      <span>{exp.organization}</span>
                    </h3>

                    <h4 className="font-sans text-sm font-semibold text-cyan-400 mb-4">
                      {exp.role}
                    </h4>

                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <p className="font-sans text-xs text-slate line-clamp-2 leading-relaxed mb-6">
                        {exp.responsibilities[0]}
                      </p>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate group-hover:text-emerald-400 transition-colors">
                    <span className="flex items-center gap-1.5">
                      <GitCommit className="w-3.5 h-3.5 text-emerald-400" />
                      <span>$ view-log --details</span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="absolute inset-0 bg-[#06090E]/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-[#0D1117] border border-emerald-500/30 flex flex-col overflow-hidden shadow-2xl rounded-2xl z-10"
            >
              {/* Modal Window Header */}
              <div className="px-5 py-3.5 bg-[#161B22] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-slate">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>git log --show-commit</span>
                </div>
                <button 
                  onClick={() => setSelectedExperience(null)}
                  className="w-7 h-7 flex items-center justify-center bg-[#06090E] border border-white/10 text-slate hover:text-ink hover:border-rose-500 transition-all rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 sm:p-10 overflow-y-auto font-sans">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 font-mono text-xs text-emerald-400 mb-3">
                  <span>{selectedExperience.startDate} — {selectedExperience.endDate}</span>
                </div>
                
                <h3 className="font-mono text-2xl font-bold text-ink mb-1">
                  {selectedExperience.organization}
                </h3>
                
                <p className="font-mono text-sm text-cyan-400 font-semibold mb-6">
                  {selectedExperience.role}
                </p>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-bold">
                    Key Execution & Responsibilities:
                  </h4>
                  <ul className="space-y-3 font-sans text-sm text-slate">
                    {selectedExperience.responsibilities.map((resp: string, i: number) => (
                      <li key={i} className="flex items-start">
                        <span className="text-emerald-400 font-mono font-bold mr-3 shrink-0">➔</span>
                        <span className="leading-relaxed text-ink-2">{resp}</span>
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

