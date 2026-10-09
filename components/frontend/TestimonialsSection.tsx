"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface TestimonialsProps {
  testimonials: any[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsProps) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-sans text-xs font-bold uppercase tracking-widest text-brass mb-3">Words of Trust</h2>
          <h3 className="font-sans text-4xl md:text-5xl font-extrabold text-ink">Client Endorsements</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div 
              key={test._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-parchment border border-white/5 p-8 relative hover:border-brass/30 transition-all rounded-3xl shadow-lg"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brass/20" />
              <p className="font-sans text-lg text-ink-2 font-light italic mb-8 relative z-10 leading-relaxed">
                &quot;{test.feedback}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-[2px] bg-brass/50 rounded-full"></div>
                <div>
                  <h4 className="font-sans font-bold text-ink">{test.name}</h4>
                  <p className="font-sans text-xs uppercase tracking-widest text-slate mt-1 font-semibold">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
