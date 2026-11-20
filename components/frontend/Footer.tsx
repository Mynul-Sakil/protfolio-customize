"use client";

import { Hexagon, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-page border-t border-line py-12 text-slate z-10 relative font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-ink">
          <Hexagon className="w-5 h-5 text-brass" />
          <span>Mynul<span className="text-brass">.</span>Islam</span>
        </div>
        
        {/* Status Line */}
        <div className="text-center md:text-left text-slate font-light text-sm">
          &copy; {currentYear} Mynul Islam • Designed for scale and performance.
        </div>
        
        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-subtle border border-line-strong text-slate hover:border-brass hover:text-ink transition-colors text-sm font-semibold"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>

      </div>
    </footer>
  );
}
