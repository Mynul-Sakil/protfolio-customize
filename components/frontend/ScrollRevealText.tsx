"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealTextProps {
  text: string;
}

export default function ScrollRevealText({ text }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress within this container. 
  // Offset means: start animation when top of element hits bottom of viewport, 
  // end animation when bottom of element hits middle of viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const words = text.split(" ");

  return (
    <div
      ref={containerRef}
      className="leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-1"
    >
      {words.map((word, i) => {
        // Calculate the range for each word so they light up sequentially
        const start = i / words.length;
        const end = start + (1 / words.length);

        return (
          <Word
            key={i}
            word={word}
            progress={scrollYProgress}
            range={[start, end]}
          />
        );
      })}
    </div>
  );
}

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
}

function Word({ word, progress, range }: WordProps) {
  // Map the word's specific progress range to opacity
  const opacity = useTransform(progress, range, [0.15, 1]);
  // Map the word's specific progress range to color. 
  // Let's go from slate (rgba(148, 163, 184, 0.5)) to ink (white/black depending on theme) or brass.
  // Actually, opacity alone on solid ink text achieves the "dim to bright" beautifully and safely for dark/light modes.
  // But since the user wants a premium feel, let's just use opacity with text-ink for the cleanest effect,
  // or interpolate color from #475569 (slate-600) to #FFFFFF (white).
  // Using pure opacity on text-ink is the most reliable way to handle themes. Let's do opacity.

  return (
    <span className="relative">
      <span className="absolute opacity-10 text-slate">{word}</span>
      <motion.span
        style={{ opacity }}
        className="text-ink"
      >
        {word}
      </motion.span>
    </span>
  );
}
