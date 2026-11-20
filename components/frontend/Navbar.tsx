"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Hexagon } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/frontend/ThemeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
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
          ? "bg-page/90 backdrop-blur-xl border-b border-line shadow-lg shadow-black/10 py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex justify-between items-center">
        
        {/* Brand / Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2.5 font-sans text-lg font-bold text-ink tracking-tight hover:opacity-90 transition-opacity group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-8 h-8 rounded-lg bg-brass/10 border border-brass/20 flex items-center justify-center text-brass group-hover:border-brass-light transition-colors">
            <Hexagon className="w-4 h-4" />
          </div>
          <span>Mynul<span className="text-brass">.</span>Islam</span>
        </Link>

        {/* Desktop Nav & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <nav className="flex gap-1.5 bg-parchment/80 p-1.5 rounded-xl border border-line backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="px-4 py-1.5 text-sm font-sans font-medium text-slate hover:text-ink hover:bg-surface-subtle rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>
          <ThemeToggle showLabel />
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-brass-light p-2 rounded-xl bg-parchment border border-line-strong h-10 w-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-parchment border-b border-line shadow-2xl md:hidden"
          >
            <nav className="flex flex-col py-4 px-6 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="py-3 px-4 rounded-xl bg-page border border-line text-sm font-sans font-medium text-ink hover:text-brass hover:border-brass/30 transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
