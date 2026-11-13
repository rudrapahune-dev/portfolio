"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Terminal } from "lucide-react";

export function EasterEgg() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Secret developer console greeting matching Warm Editorial identity
    console.log(
      "%c✦ Welcome to Rudra Pahune's Portfolio!%c\nBuilt with Next.js, TypeScript, Tailwind CSS & Framer Motion.\nTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #C5E86C; font-size: 15px; font-weight: bold; font-family: monospace;",
      "color: #AAA99D; font-size: 12px; font-family: monospace;"
    );

    const konamiCode = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let currentIndex = 0;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === konamiCode[currentIndex].toLowerCase()) {
        currentIndex++;
        if (currentIndex === konamiCode.length) {
          setUnlocked(true);
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          className="fixed inset-0 z-[350] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full p-6 sm:p-8 rounded-2xl bg-surface border border-accent/40 shadow-2xl text-center font-sans">
            <button
              onClick={() => setUnlocked(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface-secondary transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-accent-muted text-accent flex items-center justify-center border border-accent/30 shadow-lg shadow-accent/10">
              <Sparkles className="w-7 h-7" />
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-muted text-accent text-[11px] font-mono mb-3">
              <Terminal className="w-3.5 h-3.5" />
              KONAMI_CODE_UNLOCKED
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Developer Easter Egg Unlocked
            </h3>
            <p className="text-sm text-muted mb-5 leading-relaxed">
              You found the hidden keystroke sequence! Thanks for exploring the portfolio so thoroughly.
            </p>
            <div className="p-3.5 rounded-xl bg-surface-secondary text-xs font-mono text-accent border border-border flex items-center justify-between">
              <span>EXPLORER_STATUS: VERIFIED</span>
              <span className="text-secondary-accent font-bold">+100 CURIOSITY</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
