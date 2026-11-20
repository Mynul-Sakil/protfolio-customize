"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/frontend/ThemeToggle";

const navLinks = [
  { name: "Impact", href: "#impact" },
  { name: "Work", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Capabilities", href: "#services" },
  { name: "About", href: "#about" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? "bg-page/95 backdrop-blur-md border-line py-3"
          : "bg-page/80 backdrop-blur-sm border-transparent py-4"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex items-center justify-between gap-4">
        {/* Typographic Wordmark */}
        <Link
          href="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-serif text-lg md:text-xl font-semibold tracking-tight text-ink hover:text-brass transition-colors"
        >
          Mynul Islam
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="text-sm font-sans font-medium text-slate hover:text-ink transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle showLabel />
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, "#contact")}
            className="h-10 px-4 inline-flex items-center justify-center rounded-lg bg-ink text-page text-sm font-medium hover:bg-brass hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="h-10 w-10 rounded-lg border border-line bg-parchment text-ink flex items-center justify-center"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-parchment border-b border-line shadow-lg"
          >
            <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="py-2.5 px-3 rounded-lg text-sm font-medium text-ink hover:bg-surface-subtle transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => scrollTo(e, "#contact")}
                className="mt-2 py-2.5 px-4 rounded-lg bg-ink text-page text-center text-sm font-medium hover:bg-brass hover:text-white transition-colors"
              >
                Schedule a Conversation
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
