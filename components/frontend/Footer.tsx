"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-page border-t border-line py-10 text-slate font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-serif text-base font-medium text-ink">
          Mynul Islam
        </div>

        <div className="text-xs font-mono text-slate">
          &copy; {currentYear} Mynul Islam. All rights reserved.
        </div>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-line bg-parchment text-xs font-mono uppercase tracking-wider text-ink hover:border-brass hover:text-brass transition-colors cursor-pointer"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
