"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FolderGit2, Terminal, ArrowUpRight, X, ExternalLink, Code2 } from "lucide-react";

interface ProjectsProps {
  projects: any[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section id="projects" className="py-24 bg-[#06090E] relative overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          {/* Section Badge */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest flex items-center gap-1.5">
              <FolderGit2 className="w-3.5 h-3.5" />
              // FEATURED_REPOSITORIES.ts
            </span>
          </div>

          <h2 className="font-mono text-3xl md:text-5xl font-extrabold text-ink mb-12 tracking-tight">
            Software <span className="text-cyan-400">Projects</span> & Systems
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
                className="rounded-2xl border border-white/10 bg-[#0D1117] p-6 shadow-xl hover:border-cyan-400/40 hover:shadow-cyan-500/10 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top Repo Header */}
                  <div className="flex items-center justify-between font-mono text-xs text-slate mb-4 pb-3 border-b border-white/10">
                    <div className="flex items-center gap-2 text-cyan-400 font-bold">
                      <Code2 className="w-4 h-4" />
                      <span>{project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.repo</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[10px] text-cyan-400 font-bold">
                      {project.category}
                    </span>
                  </div>

                  {project.imageUrl ? (
                    <div className="relative aspect-[16/9] w-full bg-[#06090E] border border-white/10 rounded-xl overflow-hidden mb-6">
                      <Image 
                        src={project.imageUrl} 
                        alt={project.title} 
                        fill 
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : null}

                  <h3 className="font-mono text-xl font-bold text-ink group-hover:text-cyan-400 transition-colors mb-3">
                    {project.title}
                  </h3>

                  <p className="font-sans text-xs md:text-sm text-slate line-clamp-3 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-slate group-hover:text-cyan-400 transition-colors">
                  <span className="flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>$ inspect-architecture</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
              className="absolute inset-0 bg-[#06090E]/90 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-[#0D1117] border border-cyan-500/30 flex flex-col overflow-hidden shadow-2xl rounded-2xl z-10"
            >
              <div className="px-5 py-3.5 bg-[#161B22] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate">
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <Terminal className="w-4 h-4" />
                  <span>repository --inspect</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="w-7 h-7 flex items-center justify-center bg-[#06090E] border border-white/10 text-slate hover:text-ink hover:border-rose-500 transition-all rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {selectedProject.imageUrl && (
                <div className="relative aspect-[16/9] w-full bg-[#06090E] border-b border-white/10 shrink-0 overflow-hidden">
                  <Image 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover"
                  />
                </div>
              )}

              <div className="p-6 sm:p-10 overflow-y-auto">
                <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold inline-block mb-3">
                  {selectedProject.category}
                </span>
                
                <h3 className="font-mono text-2xl font-bold text-ink mb-4">
                  {selectedProject.title}
                </h3>
                
                <p className="font-sans text-slate text-sm leading-relaxed mb-8 whitespace-pre-wrap">
                  {selectedProject.description}
                </p>

                {selectedProject.link && (
                  <a 
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-[#06090E] font-mono text-xs uppercase font-extrabold tracking-wider hover:brightness-110 transition-all rounded-xl shadow-lg shadow-cyan-500/20"
                  >
                    <span>View Repository / Demo</span>
                    <ExternalLink className="w-4 h-4" />
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

