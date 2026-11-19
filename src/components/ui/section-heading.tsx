"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  number?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  number,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const displayLabel = number ? `${number} / ${label || "INDEX"}` : label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn("mb-12 md:mb-16", className)}
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-foreground/20">
        <div>
          {displayLabel && (
            <span className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-muted font-bold block mb-2">
              {displayLabel}
            </span>
          )}
          <h2 className="editorial-section-title text-foreground tracking-[-0.03em] uppercase">
            {title}
          </h2>
        </div>

        {description && (
          <p className="text-muted text-sm sm:text-base max-w-md font-sans leading-relaxed sm:text-right">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}
