"use client";

import { motion } from "framer-motion";

interface ExperienceProps {
  experiences: any[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-page">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">My Journey</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Experience.</h3>
        </motion.div>

        <div className="relative border-l border-line ml-3 md:ml-6 space-y-12">
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <span className="absolute left-[-5px] top-1.5 w-[9px] h-[9px] rounded-full bg-brass ring-4 ring-page"></span>

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                <div>
                  <h4 className="font-serif text-2xl font-semibold text-ink">{exp.role}</h4>
                  <p className="font-sans text-lg text-slate mt-1">{exp.organization}</p>
                </div>
                <div className="mt-2 md:mt-0 font-mono text-xs uppercase tracking-widest text-brass bg-brass/10 px-3 py-1.5 rounded-sm inline-block self-start">
                  {exp.startDate} - {exp.endDate}
                </div>
              </div>

              <ul className="space-y-3 mt-4">
                {exp.responsibilities.map((resp: string, i: number) => (
                  <li key={i} className="flex items-start text-ink-2 font-sans text-base">
                    <span className="text-brass mr-3 mt-1.5 opacity-60">▹</span>
                    <span className="leading-relaxed">{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
