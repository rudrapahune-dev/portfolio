"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

export function EasterEgg() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // Secret developer console greeting
    console.log(
      "%c🚀 Welcome to Rudra Pahune's Portfolio!%c\nBuilt with Next.js, TypeScript, Tailwind CSS & Framer Motion.\nTry the Konami code: ↑ ↑ ↓ ↓ ← → ← → B A",
      "color: #22d3ee; font-size: 16px; font-weight: bold;",
      "color: #a1a1aa; font-size: 12px;"
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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-[350] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
        >
          <div className="relative max-w-md w-full p-6 rounded-2xl glass border border-cyan-500/40 shadow-2xl text-center">
            <button
              onClick={() => setUnlocked(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-tr from-cyan-400 to-indigo-500 flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6 animate-spin-slow" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              🎮 Konami Code Activated!
            </h3>
            <p className="text-sm text-muted mb-4">
              You found the hidden developer easter egg. You have an eye for details!
            </p>
            <div className="p-3 rounded-lg bg-surface text-xs font-mono text-cyan-400 border border-border">
              Level: Tech Explorer · Buff: +100 Curiosity
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
