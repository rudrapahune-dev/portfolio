"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, BookOpen, Layers } from "lucide-react";
import { timeline } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const typeConfig = {
  education: {
    icon: <GraduationCap className="w-4 h-4" />,
    color: "text-accent",
    bg: "bg-accent-muted border-accent/30",
    dot: "bg-accent ring-4 ring-accent/20",
  },
  project: {
    icon: <Rocket className="w-4 h-4" />,
    color: "text-accent-secondary",
    bg: "bg-[#D98B5F]/15 border-[#D98B5F]/30",
    dot: "bg-accent-secondary ring-4 ring-accent-secondary/20",
  },
  learning: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    dot: "bg-blue-400 ring-4 ring-blue-500/20",
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

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line with subtle gradient */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-border to-transparent md:-translate-x-1/2" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const config = typeConfig[item.type];
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className={cn(
                    "relative flex items-start",
                    "pl-12 md:pl-0",
                    "md:justify-start",
                    !isLeft && "md:justify-end"
                  )}
                >
                  {/* Central Node marker */}
                  <div
                    className={cn(
                      "absolute left-4 md:left-1/2 top-4 w-4 h-4 rounded-full border-2 border-background z-10 -translate-x-1/2 transition-transform",
                      config.dot
                    )}
                  />

                  {/* Timeline Card */}
                  <div
                    className={cn(
                      "w-full md:w-[calc(50%-2.5rem)] editorial-card p-6 sm:p-7 rounded-2xl shadow-sm group hover:border-accent transition-all duration-300",
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border",
                          config.bg,
                          config.color
                        )}
                      >
                        {config.icon}
                        <span>{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</span>
                      </span>
                      <span className="text-xs sm:text-[13px] text-muted font-mono font-bold">
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-foreground text-lg sm:text-xl mb-2 group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
