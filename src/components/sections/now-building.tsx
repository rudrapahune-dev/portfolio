"use client";

import { motion } from "framer-motion";
import {
  Server,
  Bot,
  Sparkles,
  Brain,
  Code2,
  Layers,
  ArrowUpRight,
  Activity,
  CheckCircle2,
} from "lucide-react";
import { buildingAndExploring, type ExploringItem } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<ExploringItem["icon"], React.ReactNode> = {
  Server: <Server className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
};

const statusStyles: Record<ExploringItem["status"], { bg: string; text: string; dot: string }> = {
  Building: {
    bg: "bg-accent-muted border-accent/30",
    text: "text-accent",
    dot: "bg-accent animate-pulse",
  },
  Exploring: {
    bg: "bg-[#D98B5F]/15 border-[#D98B5F]/30",
    text: "text-accent-secondary",
    dot: "bg-accent-secondary",
  },
  Learning: {
    bg: "bg-blue-500/10 border-blue-500/20",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  Improving: {
    bg: "bg-purple-500/10 border-purple-500/20",
    text: "text-purple-400",
    dot: "bg-purple-400",
  },
};

export function NowBuilding() {
  return (
    <section id="now-building" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Active Radar"
          title="What I'm Building & Exploring"
          description="A real-time window into my active research areas, architectural experiments, and deep learning focus."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {buildingAndExploring.map((item, idx) => {
            const status = statusStyles[item.status];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="editorial-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group shadow-sm transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Category + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-accent-muted text-accent group-hover:scale-105 transition-transform">
                        {iconMap[item.icon]}
                      </div>
                      <span className="font-mono text-xs sm:text-[13px] text-muted font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Status indicator */}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold border",
                        status.bg,
                        status.text
                      )}
                    >
                      <span className={cn("w-2 h-2 rounded-full", status.dot)} />
                      {item.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-extrabold text-lg sm:text-xl text-foreground mb-2.5 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-border/40 flex flex-wrap gap-2">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface-secondary border border-border text-foreground/80 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
