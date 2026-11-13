"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dismiss after 1.6s
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1600);
    return () => clearTimeout(timer);
  }, []);

  const name = "Rudra Pahune";
  const letters = name.split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#141512] text-[#F3F0E7] pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            animation: "loaderFadeOut 2.2s ease-in-out forwards",
          }}
        >
          <div className="flex gap-0.5 items-baseline">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.15 + i * 0.04,
                  ease: "easeOut",
                }}
                className={`text-4xl sm:text-6xl font-heading font-extrabold tracking-tight ${
                  letter === " " ? "mr-3" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
            <span className="text-accent text-5xl sm:text-7xl font-black ml-0.5">
              .
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted tracking-widest uppercase">
            <span>Backend & AI Systems</span>
          </div>

          <style jsx>{`
            @keyframes loaderFadeOut {
              0%, 75% {
                opacity: 1;
                visibility: visible;
              }
              100% {
                opacity: 0;
                visibility: hidden;
                display: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
