"use client";

import { motion } from "framer-motion";
import { BarChart, Zap } from "lucide-react";

interface ImpactStat {
  _id: string;
  value: string;
  label: string;
  order: number;
}

interface ImpactSectionProps {
  stats: ImpactStat[];
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  // We'll still use stats if they exist, but we highlight the 50% AI performance metric
  return (
    <section className="relative py-20 bg-page overflow-hidden border-t border-line z-0">
      
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1.5 rounded-full bg-brass/10 border border-brass/20 text-brass font-medium text-xs tracking-wide flex items-center gap-1.5">
                <BarChart className="w-3.5 h-3.5" />
                Measurable Outcomes
              </span>
            </div>
            <h3 className="font-sans text-3xl md:text-4xl font-extrabold text-ink">
              Business <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass to-brass-light">Impact</span> & Scale
            </h3>
          </div>
        </div>

        {/* Highlighted Primary Metric */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 p-8 md:p-10 rounded-3xl bg-gradient-to-br from-brass/20 via-parchment to-parchment border border-brass/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-brass/5"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4 text-brass-light font-semibold">
              <Zap className="w-6 h-6" />
              <span>Key Performance Initiative</span>
            </div>
            <h4 className="text-2xl md:text-3xl font-bold text-ink mb-2">
              AI-Powered Platform Optimization
            </h4>
            <p className="text-ink-2 font-light text-lg">
              Architected and delivered an AI-driven infrastructure upgrade that significantly reduced latency and improved user conversion rates.
            </p>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <div className="font-sans text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-ink to-brass-light mb-2 drop-shadow-sm">
              50%+
            </div>
            <div className="font-semibold text-brass tracking-wide uppercase text-sm">
              Performance Increase
            </div>
          </div>
        </motion.div>

        {/* Database Metrics Grid */}
        {stats && stats.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-parchment border border-line hover:border-brass/40 transition-all group shadow-lg"
              >
                <div className="font-sans text-4xl sm:text-5xl font-extrabold text-ink mb-2">
                  {stat.value}
                </div>
                <div className="font-sans text-xs text-slate group-hover:text-brass-light transition-colors uppercase tracking-wider font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
