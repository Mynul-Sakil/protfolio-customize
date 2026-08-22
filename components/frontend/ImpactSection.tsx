"use client";

import { motion } from "framer-motion";
import { Cpu, Activity } from "lucide-react";

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
  if (!stats || stats.length === 0) return null;

  return (
    <section className="relative py-20 bg-[#06090E] overflow-hidden border-t border-white/10 z-0">
      
      {/* Background Code Grid */}
      <div className="absolute inset-0 opacity-[0.04] -z-20" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                // SYSTEM_METRICS.log
              </span>
            </div>
            <h3 className="font-mono text-2xl md:text-3xl font-extrabold text-ink">
              Engineering <span className="text-emerald-400">Impact</span> & Benchmarks
            </h3>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D1117] border border-white/10 text-xs font-mono text-emerald-400">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Server Uptime: 99.99%</span>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat._id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#0D1117] border border-white/10 hover:border-emerald-500/40 transition-all group"
            >
              <div className="font-mono text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300 mb-2">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-slate group-hover:text-ink transition-colors uppercase tracking-wider font-semibold">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

