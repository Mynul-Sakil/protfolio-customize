"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, Link as LinkIcon, Briefcase, TrendingUp, ChevronRight } from "lucide-react";

interface HeroProps {
  profile: any;
}

export default function HeroSection({ profile }: HeroProps) {
  if (!profile) return null;

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-page z-0">
      {/* Corporate Glow Background */}
      <div className="absolute top-1/4 left-1/6 w-[500px] h-[500px] bg-brass/10 rounded-full blur-[120px] animate-pulse -z-10"></div>
      <div className="absolute bottom-1/4 right-1/6 w-[500px] h-[500px] bg-brass-light/10 rounded-full blur-[120px] animate-pulse delay-1000 -z-10"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-white/5 bg-parchment/60 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          <div className="p-8 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-16">
            
            {/* Left Column: Executive Bio */}
            <div className="flex-1 max-w-2xl">
              
              {/* Professional Status Pill */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/10 border border-brass/20 text-brass-light font-medium text-xs md:text-sm mb-8 tracking-wide">
                <Briefcase className="w-4 h-4" />
                <span>Engineering Leadership & Delivery</span>
              </div>

              {/* Title & Headline */}
              <h1 className="font-sans text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-ink mb-6">
                Hi, I&apos;m <span className="text-transparent bg-clip-text bg-gradient-to-r from-brass via-brass-light to-blue-300">{profile.name}</span>
              </h1>

              <div className="text-xl md:text-2xl font-semibold text-ink-2 mb-6">
                {profile.title}
              </div>

              <p className="text-slate text-base md:text-lg mb-10 leading-relaxed font-sans font-light max-w-xl">
                {profile.shortIntroduction}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="flex items-center gap-2 bg-gradient-to-r from-brass to-brass-light text-page font-bold px-7 py-3.5 rounded-xl text-sm transition-all hover:shadow-lg hover:shadow-brass/25 hover:-translate-y-0.5"
                >
                  Connect with me
                  <ChevronRight className="w-4 h-4" />
                </a>

                {profile.linkedin && (
                  <a
                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-ink px-6 py-3.5 rounded-xl text-sm transition-all hover:bg-white/10 hover:border-brass-light hover:text-brass-light"
                  >
                    <LinkIcon className="w-4 h-4" />
                    LinkedIn
                  </a>
                )}

                {profile.resumeUrl && (
                  <a
                    href={profile.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 border border-white/10 text-ink px-6 py-3.5 rounded-xl text-sm transition-all hover:bg-white/10 hover:border-brass hover:text-brass"
                  >
                    <Download className="w-4 h-4" />
                    Resume
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Professional Portrait Frame */}
            <div className="relative w-64 h-64 md:w-[340px] md:h-[400px] shrink-0">
              <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/10 bg-page p-2 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-tr from-brass/20 to-brass-light/20 rounded-3xl blur-xl group-hover:opacity-100 transition-opacity"></div>
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-parchment flex items-center justify-center">
                  {profile.photoUrl ? (
                    <Image
                      src={profile.photoUrl}
                      alt={profile.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <TrendingUp className="w-12 h-12 text-brass mb-3 opacity-50" />
                      <span className="font-sans text-sm text-ink font-semibold">{profile.name}</span>
                      <span className="font-sans text-xs text-slate mt-1">{profile.title}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-page/90 via-transparent to-transparent"></div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
