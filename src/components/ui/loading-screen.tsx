"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2400);
    return () => clearTimeout(timer);
  }, []);

  const name = "Rudra";
  const letters = name.split("");

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#0a0a0b]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        >
          <div className="flex gap-1">
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.3 + i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-5xl sm:text-7xl font-heading font-bold text-foreground"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtle line animation */}
          <motion.div
            className="absolute bottom-1/3 left-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "200px" }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
