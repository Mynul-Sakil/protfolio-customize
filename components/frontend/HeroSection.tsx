"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Terminal, Link as LinkIcon, Code2, Cpu, CheckCircle2 } from "lucide-react";

interface HeroProps {
  profile: any;
}

export default function HeroSection({ profile }: HeroProps) {
  if (!profile) return null;

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-[#06090E] z-0">

      {/* Cyber Neon Background Gradients */}
      <div className="absolute top-1/4 left-1/6 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse -z-10"></div>
      <div className="absolute bottom-1/4 right-1/6 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000 -z-10"></div>

      {/* Code Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.04] -z-20" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        
        {/* IDE Terminal Outer Window Frame */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-2xl border border-white/10 bg-[#0D1117]/90 backdrop-blur-2xl shadow-2xl shadow-black/80 overflow-hidden"
        >
          {/* Terminal Window Header Bar */}
          <div className="px-5 py-3.5 bg-[#161B22] border-b border-white/10 flex items-center justify-between font-mono text-xs text-slate">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 text-slate/60 text-[11px] font-mono">~/mynul-portfolio/backend_v2.ts</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate/70">
              <span className="flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Node.js v22</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cansoft AI Active</span>
              </span>
            </div>
          </div>

          {/* Main IDE Content Area */}
          <div className="p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Column: Code Bio */}
            <div className="flex-1 max-w-2xl">
              
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs mb-6">
                <Code2 className="w-3.5 h-3.5" />
                <span>Full Stack & Backend Engineer</span>
              </div>

              {/* Title & Headline */}
              <h1 className="font-mono text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink mb-6">
                Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-300">{profile.name}</span>
              </h1>

              <div className="p-4 rounded-xl bg-[#06090E] border border-white/10 font-mono text-xs md:text-sm text-emerald-400/90 mb-8 shadow-inner">
                <div className="text-slate/60 mb-1">// Current Active Stack & Role</div>
                <div className="text-ink font-semibold">
                  <span className="text-cyan-400">const</span> status = <span className="text-emerald-400">"{profile.title}"</span>;
                </div>
              </div>

              <p className="text-slate text-base md:text-lg mb-10 leading-relaxed font-sans font-light">
                {profile.shortIntroduction}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-[#06090E] font-extrabold px-6 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  <Terminal className="w-4 h-4" />
                  $ contact --me
                </a>

                {profile.linkedin && (
                  <a
                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#161B22] border border-white/10 text-ink px-5 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider hover:border-cyan-400 hover:text-cyan-400 transition-all"
                  >
                    <LinkIcon className="w-4 h-4 text-cyan-400" />
                    LinkedIn
                  </a>
                )}

                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#161B22] border border-white/10 text-ink px-5 py-3.5 rounded-lg font-mono text-xs uppercase tracking-wider hover:border-emerald-400 hover:text-emerald-400 transition-all"
                  >
                    <Download className="w-4 h-4 text-emerald-400" />
                    Resume PDF
                  </a>
                )}
              </div>

            </div>

            {/* Right Column: HUD Profile Frame */}
            <div className="relative w-64 h-64 md:w-80 md:h-96 shrink-0">
              <div className="w-full h-full relative rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-[#06090E] p-2 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0D1117] border border-white/10 flex items-center justify-center">
                  {profile.photoUrl ? (
                    <Image
                      src={profile.photoUrl}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <Code2 className="w-12 h-12 text-emerald-400 mb-3 animate-pulse" />
                      <span className="font-mono text-xs text-ink font-bold">&lt;Mynul Islam /&gt;</span>
                      <span className="font-mono text-[11px] text-slate mt-1">Full Stack Developer</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06090E]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 p-2 bg-[#06090E]/80 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                    <span>[STATUS: ONLINE]</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

