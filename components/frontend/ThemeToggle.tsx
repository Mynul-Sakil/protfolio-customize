"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface ThemeToggleProps {
  showLabel?: boolean;
}

export default function ThemeToggle({ showLabel = false }: ThemeToggleProps) {
  const { theme, mounted, toggleTheme } = useTheme();
  const isLight = theme === "light";

  if (!mounted) {
    return (
      <div
        aria-hidden="true"
        className={`h-10 rounded-xl bg-parchment/80 border border-line ${
          showLabel ? "w-[92px]" : "w-10"
        }`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      className="inline-flex items-center justify-center gap-2 h-10 px-3 rounded-xl bg-parchment/80 border border-line hover:border-brass/40 hover:bg-surface-hover text-ink backdrop-blur-md transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass"
    >
      <span className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <motion.span
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-brass"
            >
              <Moon className="w-4 h-4" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-amber-400"
            >
              <Sun className="w-4 h-4" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
      {showLabel && (
        <span className="text-xs font-sans font-semibold tracking-wide">
          {isLight ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
