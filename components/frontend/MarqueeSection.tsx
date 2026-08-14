"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface MarqueeProps {
  certifications: any[];
  achievements: any[];
}

export default function MarqueeSection({ certifications, achievements }: MarqueeProps) {
  const items = [...certifications, ...achievements];
  if (!items.length) return null;

  // Duplicate items for infinite scroll effect
  const marqueeItems = [...items, ...items, ...items];

  return (
    <section className="py-24 bg-page/50 overflow-hidden border-y border-line relative z-0">
      {/* Decorative text */}
      <div className="absolute top-8 left-12 text-brass/10 font-serif text-8xl md:text-9xl font-bold opacity-10 pointer-events-none whitespace-nowrap -z-10">
        RECOGNITIONS & AWARDS
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-12 relative z-10">
        <h2 className="font-mono text-sm uppercase tracking-widest text-brass mb-2">Milestones</h2>
        <h3 className="font-serif text-3xl md:text-4xl font-semibold text-ink">Certifications & Achievements.</h3>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-x-hidden group">
        <motion.div
          className="flex whitespace-nowrap gap-6 md:gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {marqueeItems.map((item, index) => {
            const isCert = 'issuer' in item;
            return (
              <div 
                key={`${item._id}-${index}`} 
                className="w-72 sm:w-80 md:w-96 shrink-0 bg-parchment p-4 border border-line flex flex-col hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative aspect-[4/3] w-full bg-page border-b border-line overflow-hidden mb-4">
                  {item.imageUrl ? (
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center font-mono text-xs uppercase text-slate">
                      No Image
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-brass text-page text-[10px] font-mono uppercase tracking-widest px-2 py-1 z-10">
                    {isCert ? 'Certification' : 'Achievement'}
                  </div>
                </div>
                
                <h4 className="font-serif text-lg font-semibold text-ink whitespace-normal line-clamp-2">
                  {item.title}
                </h4>
                {isCert && (
                  <p className="font-sans text-sm text-slate mt-1 flex justify-between">
                    <span>{item.issuer}</span>
                    <span className="font-mono text-[10px] uppercase text-brass">{item.date}</span>
                  </p>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
