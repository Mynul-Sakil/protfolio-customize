"use client";

import { motion } from "framer-motion";
import { User, Award, Zap } from "lucide-react";

interface AboutProps {
  profile: any;
}

export default function AboutSection({ profile }: AboutProps) {
  if (!profile?.professionalSummary) return null;

  return (
    <section id="about" className="py-24 bg-page border-y border-white/5 relative overflow-hidden">
      {/* Subtle Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-brass/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Section Badge */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-brass/10 border border-brass/20 text-brass font-medium text-sm tracking-wide flex items-center gap-2">
              <User className="w-4 h-4" />
              Professional Overview
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-ink text-center mb-16 tracking-tight">
            Strategic <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass to-brass-light">Engineering & Leadership</span>
          </h2>

          {/* Premium Bio Card */}
          <div className="rounded-3xl border border-white/10 bg-parchment/80 backdrop-blur-xl shadow-xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-brass to-brass-light"></div>
            
            <div className="p-8 md:p-12">
              <div className="flex items-start gap-6">
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-white/5 border border-white/10 items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-brass-light" />
                </div>
                <div>
                  <p className="text-ink-2 font-sans text-lg md:text-xl leading-relaxed font-light">
                    {profile.professionalSummary}
                  </p>
                </div>
              </div>

              {/* Extra business focus stats/points below bio */}
              <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brass/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-brass" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">Performance Optimized</div>
                    <div className="text-xs text-slate mt-0.5">Scalable architecture</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-brass-light/10 flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5 text-brass-light" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">Business Value</div>
                    <div className="text-xs text-slate mt-0.5">ROI focused delivery</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-ink">Team Leadership</div>
                    <div className="text-xs text-slate mt-0.5">Cross-functional collaboration</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
