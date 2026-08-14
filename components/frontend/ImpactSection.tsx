"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus } from "lucide-react";

interface ImpactStat {
  _id: string;
  value: string;
  label: string;
  order: number;
}

interface ImpactSectionProps {
  stats: ImpactStat[];
}

export default function ImpactSection({ stats }: ImpactSectionProps) {
  const [showAllModal, setShowAllModal] = useState(false);

  if (!stats || stats.length === 0) return null;

  const displayedStats = stats.slice(0, 4);
  const hasMore = stats.length > 4;

  return (
    <>
      <section className="relative py-16 md:py-20 bg-page overflow-hidden border-t border-line/30 z-0">
        
        {/* Subtle grid background matching Hero Section */}
        <div className="absolute inset-0 opacity-10 -z-20" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>

        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-mono text-xs md:text-sm uppercase tracking-widest text-brass mb-3 block">Impact</h2>
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-ink max-w-2xl leading-tight">
              Built through real-world experience.
            </h3>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {displayedStats.map((stat, index) => (
              <motion.div
                key={stat._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col border-t border-line/50 pt-4 md:pt-6"
              >
                <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 md:mb-4 block bg-gradient-to-r from-brass via-brass-light to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
                <span className="font-sans text-sm md:text-base text-slate font-medium leading-snug">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

          {hasMore && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center"
            >
              <button 
                onClick={() => setShowAllModal(true)}
                className="flex items-center gap-2 bg-parchment border border-line text-ink px-6 py-3 font-mono text-xs uppercase tracking-widest hover:border-brass hover:text-brass transition-colors rounded-full shadow-sm"
              >
                <Plus className="w-4 h-4" /> Show all {stats.length} stats
              </button>
            </motion.div>
          )}

        </div>
      </section>

      {/* Modal for All Stats */}
      <AnimatePresence>
        {showAllModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllModal(false)}
              className="absolute inset-0 bg-page/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-page border border-line shadow-2xl rounded-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 md:p-8 border-b border-line flex justify-between items-center bg-parchment/50">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-ink">
                  All Impact Stats
                </h3>
                <button 
                  onClick={() => setShowAllModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-page border border-line text-slate hover:text-ink hover:border-brass transition-all rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-10 overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-10">
                  {stats.map((stat) => (
                    <div key={stat._id} className="flex flex-col border-t border-line/50 pt-4">
                      <span className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-2 block bg-gradient-to-r from-brass via-brass-light to-pink-400 bg-clip-text text-transparent">
                        {stat.value}
                      </span>
                      <span className="font-sans text-sm md:text-base text-slate font-medium leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
