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
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-page">
      {/* Abstract Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-parchment/50 clip-diagonal -z-10"></div>
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* Text Content */}
        <div className="flex-1 max-w-2xl z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-sm uppercase tracking-widest text-brass mb-4">
              Hello, I am
            </p>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-semibold text-ink leading-[1.1] mb-6">
              {profile.name}
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl text-slate font-sans font-light mb-8 max-w-xl">
              {profile.title}
            </h2>
            <p className="text-ink-2 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
              {profile.shortIntroduction}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a 
              href="#contact"
              className="flex items-center gap-2 bg-ink text-page px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:bg-brass transition-colors group"
            >
              Let's Talk
              <ArrowDownRight className="w-4 h-4 group-hover:-rotate-45 transition-transform" />
            </a>
            
            {profile.resumeUrl && (
              <a 
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-transparent border border-line text-ink px-6 py-3.5 font-mono text-xs uppercase tracking-widest hover:border-brass hover:text-brass transition-colors"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            )}
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-64 h-64 md:w-80 md:h-96 lg:w-[450px] lg:h-[550px] shrink-0"
        >
          {profile.photoUrl ? (
            <div className="w-full h-full relative">
              <div className="absolute inset-0 border border-brass translate-x-4 translate-y-4 -z-10"></div>
              <Image 
                src={profile.photoUrl}
                alt={profile.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-parchment border border-line flex items-center justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-slate">No Image</span>
            </div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
