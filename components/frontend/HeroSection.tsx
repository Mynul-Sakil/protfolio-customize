"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Download, MapPin, Building2, Clock, Layers } from "lucide-react";

interface ProfileData {
  name: string;
  title?: string;
  shortIntroduction?: string;
  linkedin?: string;
  resumeUrl?: string;
  photoUrl?: string;
  location?: string;
}

interface HeroProps {
  profile: ProfileData | null;
}

export default function HeroSection({ profile }: HeroProps) {
  if (!profile) return null;

  const linkedinHref = profile.linkedin
    ? profile.linkedin.startsWith("http")
      ? profile.linkedin
      : `https://${profile.linkedin}`
    : null;

  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 bg-page border-b border-line">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Executive Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7"
          >
            {/* Availability Status */}
            <div className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-widest text-slate mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
              <span>Open to Full-Time &amp; Technical Advisory · Remote</span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-ink leading-[1.12] mb-6">
              I build reliable software systems that help businesses scale without breaking.
            </h1>

            {/* Role Line */}
            <p className="font-sans text-base md:text-lg font-medium text-ink mb-4">
              {profile.name} — {profile.title}
            </p>

            {/* Plain-English Intro */}
            <p className="font-sans text-base md:text-lg text-ink-2 leading-relaxed max-w-2xl mb-9">
              {profile.shortIntroduction}
            </p>

            {/* Action Row */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-ink text-page font-sans text-sm font-medium hover:bg-brass hover:text-white transition-colors"
              >
                <span>Schedule a Conversation</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {linkedinHref && (
                <a
                  href={linkedinHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-line-strong bg-parchment text-ink font-sans text-sm font-medium hover:border-brass hover:text-brass transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              <a
                href="https://github.com/Mynul-Sakil"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-line-strong bg-parchment text-ink font-sans text-sm font-medium hover:border-brass hover:text-brass transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-lg border border-line-strong bg-parchment text-ink font-sans text-sm font-medium hover:border-brass hover:text-brass transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              )}
            </div>
          </motion.div>

          {/* Right Column: Portrait & Executive Fact Sheet */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl border border-line bg-parchment overflow-hidden shadow-sm">
              <div className="relative aspect-[4/4] sm:aspect-[5/4] lg:aspect-[4/4] w-full bg-surface-subtle overflow-hidden">
                {profile.photoUrl ? (
                  <Image
                    src={profile.photoUrl}
                    alt={profile.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                    className="object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                    <span className="font-serif text-2xl text-ink">{profile.name}</span>
                    <span className="text-sm text-slate mt-1">{profile.title}</span>
                  </div>
                )}
              </div>

              {/* Scannable Executive Fact Sheet */}
              <div className="p-5 grid grid-cols-2 gap-4 border-t border-line text-xs">
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase tracking-wider text-[10px] text-slate">Current Role</div>
                    <div className="font-sans font-medium text-ink mt-0.5">Cansoft Technology</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase tracking-wider text-[10px] text-slate">Experience</div>
                    <div className="font-sans font-medium text-ink mt-0.5">2+ Years Production</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase tracking-wider text-[10px] text-slate">Location</div>
                    <div className="font-sans font-medium text-ink mt-0.5">
                      {profile.location || "Noakhali, Bangladesh"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Layers className="w-4 h-4 text-brass shrink-0 mt-0.5" />
                  <div>
                    <div className="font-mono uppercase tracking-wider text-[10px] text-slate">Core Focus</div>
                    <div className="font-sans font-medium text-ink mt-0.5">SaaS · Backend · Full Stack</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
