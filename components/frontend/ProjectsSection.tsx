"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FolderKanban, ArrowUpRight, X, ExternalLink, Briefcase } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section id="projects" className="py-24 bg-page relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[400px] bg-brass-light/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1.5 rounded-full bg-brass-light/10 border border-brass-light/20 text-brass-light font-medium text-xs tracking-wide flex items-center gap-1.5">
              <FolderKanban className="w-3.5 h-3.5" />
              Strategic Initiatives
            </span>
          </div>

          <h2 className="font-sans text-3xl md:text-5xl font-extrabold text-ink mb-12 tracking-tight">
            Key <span className="text-brass-light">Case Studies</span>
          </h2>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedProject(project)}
                className="rounded-3xl border border-line bg-parchment p-6 md:p-8 shadow-xl hover:border-brass-light/30 hover:shadow-brass-light/5 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-center justify-between font-sans text-xs text-slate mb-6 pb-4 border-b border-line">
                    <div className="flex items-center gap-2 text-brass-light font-bold uppercase tracking-wider">
                      <Briefcase className="w-4 h-4" />
                      <span>Featured Delivery</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-subtle border border-line-strong text-[10px] text-ink font-semibold uppercase tracking-widest">
                      {project.category}
                    </span>
                  </div>

                  {project.imageUrl ? (
                    <div className="relative aspect-[16/9] w-full bg-page border border-line rounded-2xl overflow-hidden mb-6 shadow-md">
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  ) : null}

                  <h3 className="font-sans text-2xl font-bold text-ink group-hover:text-brass-light transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="font-sans text-sm md:text-base text-slate font-light line-clamp-3 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-line flex items-center justify-between font-sans text-sm font-medium text-slate group-hover:text-brass-light transition-colors">
                  <span>Explore Case Study</span>
                  <div className="w-8 h-8 rounded-full bg-surface-subtle flex items-center justify-center group-hover:bg-brass-light/10 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
              className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-parchment border border-line-strong flex flex-col overflow-hidden shadow-2xl rounded-3xl z-10"
            >
              <div className="px-6 py-4 bg-surface-subtle border-b border-line flex items-center justify-between font-sans text-sm text-ink backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-2 text-brass-light font-bold">
                  <FolderKanban className="w-4 h-4" />
                  <span>Project Overview</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 flex items-center justify-center bg-surface-subtle border border-line-strong text-slate hover:text-ink hover:bg-surface-hover transition-all rounded-full"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto">
                {selectedProject.imageUrl && (
                  <div className="relative aspect-[16/9] w-full bg-page border-b border-line shrink-0 overflow-hidden">
                    <Image 
                      src={selectedProject.imageUrl} 
                      alt={selectedProject.title} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-10">
                  <span className="px-3 py-1.5 rounded-full bg-brass-light/10 border border-brass-light/20 text-brass-light font-sans text-xs font-semibold tracking-wide inline-block mb-4">
                    {selectedProject.category}
                  </span>
                  
                  <h3 className="font-sans text-3xl font-bold text-ink mb-4">
                    {selectedProject.title}
                  </h3>
                  
                  <p className="font-sans text-slate text-base font-light leading-relaxed mb-10 whitespace-pre-wrap">
                    {selectedProject.description}
                  </p>

                  {selectedProject.link && (
                    <a 
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-brass to-brass-light text-white font-sans text-sm font-bold tracking-wide hover:shadow-lg hover:shadow-brass/25 hover:-translate-y-0.5 transition-all rounded-xl"
                    >
                      <span>View Live Implementation</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
