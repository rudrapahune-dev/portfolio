"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const name = "Rudra Pahune";
  const letters = name.split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#141512] text-[#F3F0E7]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex gap-0.5 items-baseline">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  delay: 0.2 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-4xl sm:text-6xl font-heading font-extrabold tracking-tight ${
                  letter === " " ? "mr-3" : ""
                }`}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
              className="text-accent text-5xl sm:text-7xl font-black ml-0.5"
            >
              .
            </motion.span>
          </div>

          <motion.div
            className="mt-6 flex items-center gap-2 text-xs font-mono text-muted tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>Backend & AI Systems</span>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 left-1/2 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "220px" }}
            transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
