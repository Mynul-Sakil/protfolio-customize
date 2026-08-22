"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, GitBranch } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "About", href: "#about", file: "about.ts" },
  { name: "Experience", href: "#experience", file: "experience.rs" },
  { name: "Services", href: "#services", file: "services.go" },
  { name: "Projects", href: "#projects", file: "projects.tsx" },
  { name: "Contact", href: "#contact", file: "contact.sh" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#06090E]/90 backdrop-blur-xl border-b border-emerald-500/20 shadow-lg shadow-black/50 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 font-mono text-lg font-bold text-ink tracking-tight hover:opacity-90 transition-opacity group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:border-emerald-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span>&lt;<span className="text-emerald-400 font-extrabold">Mynul</span>.dev /&gt;</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
            v2.6
          </span>
        </Link>

        {/* Git Branch Tag & Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0D1117] border border-white/10 font-mono text-xs text-slate">
            <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-emerald-400">git:(</span>
            <span className="text-ink">main</span>
            <span className="text-emerald-400">)</span>
          </div>

          <nav className="flex gap-1.5 bg-[#0D1117]/80 p-1 rounded-lg border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="px-3.5 py-1.5 text-xs font-mono text-slate hover:text-emerald-400 hover:bg-emerald-500/10 rounded transition-all flex items-center gap-1.5 group"
              >
                <span className="text-slate/40 group-hover:text-emerald-500/50">#</span>
                {link.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="md:hidden text-ink p-2 rounded-lg bg-[#0D1117] border border-white/10 text-emerald-400"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0D1117] border-b border-emerald-500/20 shadow-2xl md:hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-2">
              <div className="flex items-center gap-2 pb-3 mb-1 border-b border-white/10 font-mono text-xs text-emerald-400">
                <GitBranch className="w-4 h-4" />
                <span>git:(main) • IDE Navigation</span>
              </div>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="py-3 px-4 rounded bg-[#06090E] border border-white/5 text-xs font-mono text-ink hover:text-emerald-400 hover:border-emerald-500/30 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-slate/50 text-[10px]">{link.file}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

