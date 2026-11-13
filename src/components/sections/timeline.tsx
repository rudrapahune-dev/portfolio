"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, BookOpen } from "lucide-react";
import { timeline } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const typeConfig = {
  education: {
    icon: <GraduationCap className="w-4 h-4" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
  },
  project: {
    icon: <Rocket className="w-4 h-4" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  learning: {
    icon: <BookOpen className="w-4 h-4" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    dot: "bg-indigo-400",
  },
};

export function Timeline() {
  return (
    <section id="experience" className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          label="Journey"
          title="My Learning Path"
          description="Key milestones in my development journey."
        />

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-border via-cyan-500/20 to-border md:-translate-x-px" />

          {timeline.map((item, i) => {
            const config = typeConfig[item.type];
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn(
                  "relative flex items-start mb-12 last:mb-0",
                  "pl-12 md:pl-0",
                  // Desktop alternation
                  "md:justify-start",
                  !isLeft && "md:justify-end"
                )}
              >
                {/* Dot on the line */}
                <div
                  className={cn(
                    "absolute left-4 md:left-1/2 top-1 w-3 h-3 rounded-full border-2 border-background z-10 -translate-x-1/2",
                    config.dot
                  )}
                />

                {/* Card */}
                <div
                  className={cn(
                    "w-full md:w-[calc(50%-2rem)] p-5 rounded-xl border border-border bg-surface/30 hover:bg-surface/50 transition-all group",
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium",
                        config.bg,
                        config.color
                      )}
                    >
                      {config.icon}
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                    <span className="text-xs text-muted font-mono">{item.year}</span>
                  </div>

                  <h3 className="font-heading font-semibold text-foreground text-sm mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-muted text-xs leading-relaxed">
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
