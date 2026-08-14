"use client";

import { motion } from "framer-motion";

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
    <section className="py-24 bg-page overflow-hidden border-t border-line/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 border-l-2 border-brass pl-6 py-2"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-ink">
            Built through real-world experience
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col"
            >
              <span className="font-serif text-5xl md:text-6xl font-semibold text-ink mb-4">
                {stat.value}
              </span>
              <span className="font-sans text-lg md:text-xl text-slate">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
