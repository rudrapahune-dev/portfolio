"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <span className="inline-block text-sm font-medium tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 mb-4">
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-muted max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
