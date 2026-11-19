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
} from "lucide-react";
import { buildingAndExploring, type ExploringItem } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";

const iconMap: Record<ExploringItem["icon"], React.ReactNode> = {
  Server: <Server className="w-4 h-4" />,
  Bot: <Bot className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Brain: <Brain className="w-4 h-4" />,
  Code2: <Code2 className="w-4 h-4" />,
  Layers: <Layers className="w-4 h-4" />,
};

export function NowBuilding() {
  return (
    <section id="now-building" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide">
        <SectionHeading
          label="03 / Active Radar"
          title="Currently Exploring & Building"
          description="Active engineering tracks, architectural prototypes, and deep learning focus areas."
        />

        {/* 2-Column Editorial Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buildingAndExploring.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="editorial-card p-6 sm:p-7 rounded-2xl bg-surface border border-foreground flex flex-col justify-between group"
            >
              <div>
                {/* Card Top: Category and Status Badge */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-foreground/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-foreground/30 bg-background font-mono text-[11px] font-bold text-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-foreground animate-pulse" />
                    <span>{item.status}</span>
                  </div>
                </div>

                {/* Card Title with Icon */}
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="p-2 rounded-lg bg-foreground text-background">
                    {iconMap[item.icon]}
                  </div>
                  <h3 className="font-heading font-black text-xl text-foreground group-hover:underline underline-offset-4 transition-all">
                    {item.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm font-sans text-muted leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Technologies Pills */}
              <div className="pt-4 border-t border-foreground/15 flex flex-wrap gap-1.5 font-mono text-xs">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-black/5 text-foreground/80 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
