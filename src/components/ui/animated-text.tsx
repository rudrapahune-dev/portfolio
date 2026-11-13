"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function AnimatedText({
  text,
  className,
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay + i * 0.02,
      },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 20, stiffness: 100 },
    },
  };

  return (
    <motion.p
      className={cn("flex flex-wrap", className)}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {words.map((word, idx) => (
        <motion.span key={idx} variants={child} className="mr-[0.3em]">
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
}
