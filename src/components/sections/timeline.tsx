"use client";

import { motion } from "framer-motion";
import { GraduationCap, Rocket, BookOpen, ArrowUpRight } from "lucide-react";
import { timeline } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const typeConfig = {
  education: {
    icon: <GraduationCap className="w-3.5 h-3.5" />,
    label: "Education",
  },
  project: {
    icon: <Rocket className="w-3.5 h-3.5" />,
    label: "Architecture",
  },
  learning: {
    icon: <BookOpen className="w-3.5 h-3.5" />,
    label: "Deep Dive",
  },
};

export function Timeline() {
  return (
    <section id="experience" className="section-padding py-20 md:py-28 border-b border-foreground/20">
      <div className="container-wide max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          number="05"
          title="EXPERIENCE & MILESTONES"
          description="A chronological record of foundations built, architectures explored, and systems created."
        />

        {/* Editorial Horizontal-Ruled Timeline Table */}
        <div className="border-t border-foreground/20">
          {timeline.map((item, i) => {
            const config = typeConfig[item.type];

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group border-b border-foreground/20 py-8 sm:py-10 transition-colors duration-200 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
                  {/* Left: Year & Category pill (3 cols) */}
                  <div className="md:col-span-3 space-y-2">
                    <span className="font-mono text-2xl sm:text-3xl font-black text-foreground group-hover:text-cobalt tracking-tight block transition-colors">
                      {item.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-foreground text-background group-hover:bg-cobalt group-hover:text-white transition-colors">
                      {config.icon}
                      <span>{config.label}</span>
                    </span>
                  </div>

                  {/* Middle: Title & Story (8 cols) */}
                  <div className="md:col-span-8 space-y-2.5">
                    <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-foreground group-hover:text-cobalt group-hover:translate-x-1 transition-all duration-200">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-[17px] text-muted leading-relaxed font-sans max-w-2xl">
                      {item.description}
                    </p>
                  </div>

                  {/* Far right arrow (1 col) */}
                  <div className="hidden md:flex md:col-span-1 justify-end pt-2">
                    <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center text-muted group-hover:text-white group-hover:border-cobalt group-hover:bg-cobalt transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
