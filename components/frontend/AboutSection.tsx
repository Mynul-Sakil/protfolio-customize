"use client";

import { motion } from "framer-motion";
import ScrollRevealText from "./ScrollRevealText";

interface AboutProps {
  profile: any;
}

export default function AboutSection({ profile }: AboutProps) {
  if (!profile?.professionalSummary) return null;

  return (
    <section id="about" className="py-24 bg-parchment border-y border-line">
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-ink mb-10 relative inline-block">
            About Me
            <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-brass"></span>
          </h2>

          <div className="mt-8 ">
            <ScrollRevealText text={profile.professionalSummary} />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
