"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, ExternalLink, X } from "lucide-react";

interface ProjectItem {
  _id?: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  link?: string;
}

interface ProjectsProps {
  projects: ProjectItem[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <>
      <section id="projects" className="py-20 md:py-24 bg-page border-b border-line">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div className="max-w-2xl">
              <p className="font-mono text-xs uppercase tracking-widest text-brass mb-3">
                02 / Selected Work
              </p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight text-ink">
                Production systems &amp; case studies.
              </h2>
            </div>
            <a
              href="https://github.com/Mynul-Sakil"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate hover:text-brass transition-colors"
            >
              <span>Explore more on GitHub</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* 2-Column Editorial Case Study Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <article
                key={project._id || project.title}
                onClick={() => setSelectedProject(project)}
                className="rounded-xl border border-line bg-parchment p-6 md:p-7 hover:border-line-strong transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-brass">
                      {project.category}
                    </span>
                    <span className="font-mono text-[11px] text-slate">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {project.imageUrl && (
                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-line bg-surface-subtle mb-5">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                  )}

                  <h3 className="font-serif text-xl md:text-2xl font-medium text-ink group-hover:text-brass transition-colors mb-3 leading-snug">
                    {project.title}
                  </h3>

                  <p className="font-sans text-sm md:text-[15px] text-ink-2 leading-relaxed line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-line flex items-center justify-between text-sm">
                  <span className="font-medium text-ink group-hover:text-brass transition-colors inline-flex items-center gap-1">
                    Read overview
                    <ArrowUpRight className="w-4 h-4" />
                  </span>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-slate hover:text-brass transition-colors"
                    >
                      <span>Live</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/50 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ duration: 0.18 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-parchment border border-line-strong rounded-xl shadow-2xl flex flex-col overflow-hidden z-10"
            >
              <div className="px-6 py-4 border-b border-line flex items-center justify-between sticky top-0 bg-parchment z-10">
                <span className="font-mono text-xs uppercase tracking-widest text-brass">
                  {selectedProject.category}
                </span>
                <button
                  type="button"
                  aria-label="Close modal"
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-lg border border-line flex items-center justify-center text-slate hover:text-ink hover:bg-surface-subtle transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto">
                {selectedProject.imageUrl && (
                  <div className="relative aspect-[16/9] w-full bg-surface-subtle border-b border-line overflow-hidden">
                    <Image
                      src={selectedProject.imageUrl}
                      alt={selectedProject.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6 sm:p-8">
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium text-ink mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="font-sans text-base text-ink-2 leading-relaxed whitespace-pre-wrap mb-8">
                    {selectedProject.description}
                  </p>

                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-ink text-page text-sm font-medium hover:bg-brass hover:text-white transition-colors"
                    >
                      <span>Visit Live Project</span>
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
