"use client";

import { motion } from "framer-motion";
import { Terminal, FileCode, Server } from "lucide-react";

interface AboutProps {
  profile: any;
}

export default function AboutSection({ profile }: AboutProps) {
  if (!profile?.professionalSummary) return null;

  return (
    <section id="about" className="py-24 bg-[#06090E] border-y border-white/10 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5" />
              // ABOUT_THE_ENGINEER.ts
            </span>
          </div>

          <h2 className="font-mono text-3xl md:text-5xl font-extrabold text-ink text-center mb-12 tracking-tight">
            Developer <span className="text-emerald-400">Architecture</span> & Vision
          </h2>

          {/* IDE Snippet Box */}
          <div className="rounded-2xl border border-white/10 bg-[#0D1117] shadow-2xl overflow-hidden text-left font-mono text-sm">
            {/* Header */}
            <div className="px-5 py-3 bg-[#161B22] border-b border-white/10 flex items-center justify-between text-xs text-slate">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="text-ink">MynulIslam.class.ts</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-emerald-400">
                <Server className="w-3.5 h-3.5" />
                <span>Backend Focused</span>
              </div>
            </div>

            {/* Code Body */}
            <div className="p-6 md:p-8 font-mono leading-relaxed overflow-x-auto">
              <div className="text-slate/40 text-xs mb-4">// System Summary & Bio</div>
              
              <div className="text-cyan-400 font-semibold mb-2">
                <span className="text-purple-400">export default class</span> <span className="text-emerald-400">FullStackEngineer</span> &#123;
              </div>

              <div className="pl-4 md:pl-6 space-y-2 border-l border-white/10 my-3">
                <p className="text-slate font-sans text-base md:text-lg leading-relaxed text-ink-2">
                  "{profile.professionalSummary}"
                </p>
              </div>

              <div className="text-cyan-400 font-semibold mt-4">
                &#125;
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

