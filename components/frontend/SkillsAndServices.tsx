"use client";

import { motion } from "framer-motion";
import { Wrench, CheckCircle } from "lucide-react";

interface SkillsServicesProps {
  skills: any[];
  services: any[];
}

export default function SkillsAndServices({ skills, services }: SkillsServicesProps) {
  if (!skills.length && !services.length) return null;

  // Group skills by category
  const categories = Array.from(new Set(skills.map(s => s.category)));

  return (
    <section id="services" className="py-24 bg-parchment border-y border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Services Side */}
        {services.length > 0 && (
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">What I Do</h2>
              <h3 className="font-serif text-4xl font-semibold text-ink">Services.</h3>
            </motion.div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <motion.div 
                  key={service._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-page border border-line p-6 rounded-sm shadow-sm hover:border-brass transition-colors group"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <CheckCircle className="w-5 h-5 text-brass" />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-ink group-hover:text-brass transition-colors mb-2">
                        {service.title}
                      </h4>
                      {service.description && (
                        <p className="font-sans text-slate text-sm leading-relaxed">
                          {service.description}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Side */}
        {skills.length > 0 && (
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">My Toolkit</h2>
              <h3 className="font-serif text-4xl font-semibold text-ink">Skills.</h3>
            </motion.div>

            <div className="space-y-10">
              {categories.map((category, idx) => {
                const categorySkills = skills.filter(s => s.category === category);
                return (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                  >
                    <h4 className="font-mono text-xs uppercase tracking-widest text-slate mb-4 flex items-center gap-2">
                      <Wrench className="w-3 h-3 text-brass" /> {category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {categorySkills.map(skill => (
                        <span 
                          key={skill._id}
                          className="px-4 py-2 bg-page border border-line text-ink text-sm font-sans rounded-full hover:border-brass hover:text-brass transition-colors cursor-default shadow-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
