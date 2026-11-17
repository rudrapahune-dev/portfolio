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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "mb-14 md:mb-20",
        align === "center" ? "text-center max-w-3xl mx-auto" : "max-w-3xl",
        className
      )}
    >
      <div className={cn("flex items-center gap-2 mb-3.5", align === "center" && "justify-center")}>
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-mono text-xs sm:text-[13px] uppercase tracking-widest text-accent font-semibold">
          {label}
        </span>
      </div>
      <h2 className="fluid-section-heading font-heading font-extrabold text-foreground tracking-tight mb-4 text-balance">
        {title}
      </h2>
      {description && (
        <p className="text-muted text-[17px] sm:text-[19px] leading-relaxed max-w-2xl mx-auto font-sans">
          {description}
        </p>
      )}
    </motion.div>
  );
}
