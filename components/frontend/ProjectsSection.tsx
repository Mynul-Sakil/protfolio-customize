"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (!projects || projects.length === 0) return null;

  const marqueeItems = [...projects, ...projects, ...projects];

  return (
    <>
      <section id="projects" className="py-24 bg-page overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">Featured Work</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-semibold text-ink">Projects.</h3>
          </motion.div>
        </div>

        {/* Marquee Container */}
        <div className="relative flex overflow-x-hidden group">
          <motion.div
            className="flex whitespace-nowrap gap-6 md:gap-8 px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
            }}
          >
            {marqueeItems.map((project, index) => (
              <div 
                key={`${project._id}-${index}`}
                className="w-72 sm:w-80 md:w-96 shrink-0 bg-parchment p-4 border border-line flex flex-col hover:-translate-y-2 transition-transform duration-300 group-hover:border-brass cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[4/3] w-full bg-ink/5 border-b border-line overflow-hidden mb-4">
                  {project.imageUrl ? (
                    <Image 
                      src={project.imageUrl} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase text-slate whitespace-normal text-center px-4">
                      No Image Provided
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-brass text-page text-[10px] font-mono uppercase tracking-widest px-2 py-1 z-10">
                    {project.category}
                  </div>
                </div>
                
                <h4 className="font-serif text-lg font-semibold text-ink whitespace-normal line-clamp-2 mb-2">
                  {project.title}
                </h4>
                
                <button 
                  className="mt-auto font-mono text-[10px] uppercase tracking-widest text-brass hover:text-ink transition-colors flex items-center gap-1 self-start"
                >
                  Show More <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-page border border-line flex flex-col overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-parchment border border-line text-slate hover:text-ink hover:border-brass transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-[16/9] w-full bg-ink/5 border-b border-line shrink-0">
                {selectedProject.imageUrl ? (
                  <Image 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center font-mono text-sm uppercase text-slate">
                    No Image Provided
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto">
                <span className="font-mono text-xs uppercase tracking-widest text-brass block mb-2">
                  {selectedProject.category}
                </span>
                <h4 className="font-serif text-3xl font-semibold text-ink mb-6">
                  {selectedProject.title}
                </h4>
                <p className="font-sans text-slate leading-relaxed text-base mb-8 whitespace-pre-wrap">
                  {selectedProject.description}
                </p>

                {selectedProject.link && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-page font-mono text-xs uppercase tracking-widest hover:bg-brass transition-colors"
                  >
                    Visit Project <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
