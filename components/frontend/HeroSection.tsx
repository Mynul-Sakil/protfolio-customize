"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, ArrowDownRight } from "lucide-react";

interface HeroProps {
  profile: any;
}

export default function HeroSection({ profile }: HeroProps) {
  if (!profile) return null;

  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-page z-0">
      
      {/* Animated Cyberpunk Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brass/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brass-light/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 -z-20" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 max-w-2xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold leading-[1.1] mb-6">
              I'm <span className="bg-gradient-to-r from-brass via-brass-light to-pink-400 bg-clip-text text-transparent">{profile.name}</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl text-slate font-sans font-light mb-8 max-w-xl">
              <span className="text-brass animate-pulse font-bold mr-2">|</span> {profile.title}
            </h2>
            <p className="text-ink-2 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              {profile.shortIntroduction}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#contact"
              className="flex items-center gap-2 bg-gradient-to-r from-brass to-brass-light text-page px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-brass/20"
            >
              Let's Talk
              <ArrowDownRight className="w-4 h-4" />
            </a>
            
            {profile.resumeUrl && (
              <a 
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-parchment/50 backdrop-blur-sm border border-line text-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:border-brass hover:text-brass transition-all"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            )}
          </motion.div>
        </div>

        {/* Profile Image with Neon Glow Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-64 h-64 md:w-80 md:h-96 lg:w-[400px] lg:h-[500px] shrink-0"
        >
          {profile.photoUrl ? (
            <div className="w-full h-full relative rounded-2xl overflow-hidden border-2 border-line bg-parchment/30 backdrop-blur-sm p-2 shadow-2xl group">
              <div className="absolute inset-0 bg-gradient-to-r from-brass/20 to-brass-light/20 rounded-2xl blur-xl transform scale-110 group-hover:scale-125 transition-transform duration-700"></div>
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image 
                  src={profile.photoUrl}
                  alt={profile.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-page/80 to-transparent"></div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-parchment border border-line rounded-2xl flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-slate">No Image</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
