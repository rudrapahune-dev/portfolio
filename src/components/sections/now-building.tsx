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
    bg: "bg-accent-muted",
    text: "text-accent",
    dot: "bg-accent animate-pulse",
  },
  Exploring: {
    bg: "bg-[#D98B5F]/15",
    text: "text-accent-secondary",
    dot: "bg-accent-secondary",
  },
  Learning: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  Improving: {
    bg: "bg-purple-500/10",
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
          description="A real-time snapshot of technical domains, architectures, and concepts I am actively expanding."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {buildingAndExploring.map((item, idx) => {
            const status = statusStyles[item.status];

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -4 }}
                className="editorial-card p-6 rounded-2xl flex flex-col justify-between group shadow-sm transition-all duration-300"
              >
                <div>
                  {/* Top Bar: Icon + Category + Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-accent-muted text-accent group-hover:scale-105 transition-transform">
                        {iconMap[item.icon]}
                      </div>
                      <span className="font-mono text-xs text-muted font-medium">
                        {item.category}
                      </span>
                    </div>

                    {/* Status indicator (Building, Exploring, Learning, Improving) */}
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold",
                        status.bg,
                        status.text
                      )}
                    >
                      <span className={cn("w-1.5 h-1.5 rounded-full", status.dot)} />
                      {item.status}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-sans mb-5">
                    {item.description}
                  </p>
                </div>

                {/* Tech Pills */}
                <div className="pt-3 border-t border-border/40 flex flex-wrap gap-1.5">
                  {item.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-surface-secondary border border-border text-foreground/80"
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
