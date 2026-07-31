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
          <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">Words of Trust</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Testimonials.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <motion.div 
              key={test._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-parchment border border-line p-8 relative hover:border-brass transition-colors"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-brass/20" />
              <p className="font-serif text-lg text-ink-2 italic mb-6 relative z-10 leading-relaxed">
                "{test.feedback}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-[1px] bg-brass"></div>
                <div>
                  <h4 className="font-serif font-semibold text-ink">{test.name}</h4>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
