"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);
    return () => clearTimeout(timer);
  }, []);

  const name = "RUDRA PAHUNE";
  const letters = name.split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background text-foreground pointer-events-none select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            animation: "loaderFadeOut 2.0s ease-in-out forwards",
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
                  delay: 0.1 + i * 0.03,
                  ease: "easeOut",
                }}
                className={`text-4xl sm:text-6xl lg:text-7xl font-heading font-black tracking-tighter ${
                  letter === " " ? "mr-4" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted tracking-widest uppercase font-bold">
            <span>Systems • Backends • Applied AI</span>
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
