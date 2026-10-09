"use client";

import { useState } from "react";
import { Database, AlertTriangle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function SyncDataButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="px-5 py-2.5 rounded-xl bg-brass text-white font-semibold hover:bg-brass-light transition-colors flex items-center gap-2 shadow-lg shadow-brass/20"
      >
        <Database className="w-4 h-4" />
        <span>Sync Demo Data</span>
      </button>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-page/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-parchment border border-white/10 p-6 sm:p-8 flex flex-col shadow-2xl rounded-3xl z-10 font-sans"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 border border-red-500/20">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink mb-1">Confirm Sync</h3>
                  <p className="text-sm text-slate">Warning: Destructive Action</p>
                </div>
              </div>
              
              <p className="text-ink-2 font-medium mb-8 leading-relaxed">
                Are you sure you want to Sync Demo Data? Old data will be <span className="text-red-400 font-bold">removed</span>.
              </p>
              
              <div className="flex flex-wrap justify-end gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-ink hover:bg-white/10 transition-colors font-semibold"
                >
                  No, Cancel
                </button>
                <a 
                  href="/api/seed-mynul"
                  target="_blank"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-400 transition-colors shadow-lg shadow-red-500/20 flex items-center justify-center"
                >
                  Yes, Sync Data
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
