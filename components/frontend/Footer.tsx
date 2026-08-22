"use client";

import { Terminal, ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#06090E] border-t border-white/10 py-10 text-slate z-10 relative font-mono text-xs">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-ink">
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>&lt;<span className="text-emerald-400">Mynul</span>.dev /&gt;</span>
        </div>
        
        {/* Status Line */}
        <div className="text-center md:text-left text-slate/70">
          <span className="text-emerald-400">[200 OK]</span> &copy; {currentYear} Mynul Islam • Built with Next.js 16 & MongoDB
        </div>
        
        {/* Back to Top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#0D1117] border border-white/10 text-emerald-400 hover:border-emerald-500/40 hover:text-ink transition-colors"
        >
          <span>$ cd ~</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
}

