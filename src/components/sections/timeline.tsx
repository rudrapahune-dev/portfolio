"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, BookOpen } from "lucide-react";
import { timeline } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const typeConfig = {
  education: {
    icon: <GraduationCap className="w-4 h-4" />,
    color: "text-accent",
    bg: "bg-accent-muted",
    border: "border-accent/40",
    dot: "bg-accent ring-4 ring-accent/20",
  },
  project: {
    icon: <Rocket className="w-4 h-4" />,
    color: "text-accent-secondary",
    bg: "bg-[#D98B5F]/15",
    border: "border-accent-secondary/40",
    dot: "bg-accent-secondary ring-4 ring-accent-secondary/20",
  },
  learning: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "text-foreground",
    bg: "bg-surface-secondary",
    border: "border-border",
    dot: "bg-foreground ring-4 ring-border",
  },
};

export function Timeline() {
  return (
    <section id="experience" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Milestones"
          title="Engineering & Learning Timeline"
          description="A chronological record of foundations built, architectures explored, and systems created."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-px" />

          {timeline.map((item, i) => {
            const config = typeConfig[item.type];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "relative flex items-start mb-10 last:mb-0",
                  "pl-12 md:pl-0",
                  "md:justify-start",
                  !isLeft && "md:justify-end"
                )}
              >
                {/* Dot on line */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 top-3 w-3.5 h-3.5 rounded-full border-2 border-background z-10 -translate-x-1/2 transition-transform",
                    config.dot
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-2rem)] editorial-card p-5 rounded-2xl shadow-xs group",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-medium",
                        config.bg,
                        config.color
                      )}
                    >
                      {config.icon}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <span className="text-xs text-muted font-mono">{item.year}</span>
                  </div>

                  <h3 className="font-heading font-bold text-foreground text-sm mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
