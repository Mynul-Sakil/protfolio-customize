"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 bg-page">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">Featured Work</h2>
          <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Projects.</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-parchment border border-line rounded-sm overflow-hidden flex flex-col h-full hover:border-brass transition-colors"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
                {project.imageUrl ? (
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase text-slate">
                    No Image Provided
                  </div>
                )}
                
                {/* Hover overlay link */}
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10"
                  >
                    <span className="bg-page text-ink px-4 py-2 font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:bg-brass transition-colors">
                      View Project <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </a>
                )}
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-widest text-brass block mb-3">
                  {project.category}
                </span>
                <h4 className="font-serif text-2xl font-semibold text-ink mb-3 group-hover:text-brass transition-colors">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
                  ) : (
                    project.title
                  )}
                </h4>
                <p className="font-sans text-slate leading-relaxed text-sm flex-1">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
