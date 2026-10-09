"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-page overflow-hidden z-0">
      
      {/* Animated Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brass/10 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
      
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-10 -z-20" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="text-center px-6 z-10 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <h1 className="font-serif text-8xl md:text-9xl font-bold mb-4 bg-gradient-to-br from-brass via-brass-light to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-mono text-xl md:text-2xl text-ink uppercase tracking-widest mb-6">
            Lost in the digital void
          </h2>
          <p className="text-slate text-base md:text-lg mb-12 max-w-md mx-auto leading-relaxed">
            The page you&apos;re looking for has been moved, deleted, or possibly never existed in this timeline.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-parchment/50 backdrop-blur-sm border border-line text-ink px-8 py-4 font-mono text-xs uppercase tracking-widest hover:border-brass hover:text-brass transition-all rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
          
          <Link 
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brass to-brass-light text-page px-8 py-4 font-mono text-xs uppercase tracking-widest hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-brass/20 rounded-sm"
          >
            <Home className="w-4 h-4" />
            Return Home
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
