"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  Layout,
  Server,
  Database,
  Wrench,
  Brain,
  Code2,
  Sparkles,
} from "lucide-react";
import { skills } from "@/config/portfolio";
import { TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const categoryMeta: Record<string, { icon: React.ReactNode; subtitle: string; tag: string; accentColor: string }> = {
  "Programming Languages": {
    icon: <Terminal className="w-5 h-5" />,
    subtitle: "Core runtime environments for writing algorithmic, structured, and performant code.",
    tag: "Core Syntax",
    accentColor: "text-accent border-accent/20 bg-accent-muted",
  },
  "Frontend Development": {
    icon: <Layout className="w-5 h-5" />,
    subtitle: "Modern typed interfaces prioritizing accessibility, responsive layouts, and smooth motion.",
    tag: "User Experience",
    accentColor: "text-amber-400 border-amber-400/20 bg-amber-400/10",
  },
  "Backend Development": {
    icon: <Server className="w-5 h-5" />,
    subtitle: "Server architecture, modular routing, middleware pipelines, and secure authentication.",
    tag: "Server Systems",
    accentColor: "text-accent border-accent/20 bg-accent-muted",
  },
  "Databases": {
    icon: <Database className="w-5 h-5" />,
    subtitle: "Relational modeling, transaction isolation, indexed queries, and type-safe migrations.",
    tag: "Persistence",
    accentColor: "text-accent-secondary border-accent-secondary/20 bg-accent-secondary/10",
  },
  "Tools & Platforms": {
    icon: <Wrench className="w-5 h-5" />,
    subtitle: "Production deployment, automated version control, and API testing workflows.",
    tag: "Infrastructure",
    accentColor: "text-blue-400 border-blue-400/20 bg-blue-400/10",
  },
  "AI & Machine Learning": {
    icon: <Brain className="w-5 h-5" />,
    subtitle: "Prompt engineering, autonomous agent loops, context augmentation, and ML fundamentals.",
    tag: "Applied AI",
    accentColor: "text-purple-400 border-purple-400/20 bg-purple-400/10",
  },
};

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" className="section-padding relative border-t border-border/40">
      <div className="container-wide relative">
        <SectionHeading
          label="Toolbox & Architecture"
          title="Technologies I Work With"
          description="Proven engineering tools and foundational frameworks I use to construct reliable systems."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          {skills.categories.map((category) => {
            const meta = categoryMeta[category.name] || {
              icon: <Terminal className="w-5 h-5" />,
              subtitle: "Foundational tooling and engineering frameworks.",
              tag: "Engineering",
              accentColor: "text-accent border-accent/20 bg-accent-muted",
            };

            return (
              <motion.div
                key={category.name}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="editorial-card p-6 sm:p-7 rounded-2xl group shadow-sm hover:border-accent/80 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Category header */}
                  <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-border/60">
                    <div className="flex items-center gap-3">
                      <div className={cn("p-2.5 rounded-xl border transition-transform group-hover:scale-105", meta.accentColor)}>
                        {meta.icon}
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-foreground text-base sm:text-lg tracking-tight">
                          {category.name}
                        </h3>
                        <span className="text-[11px] font-mono text-muted uppercase tracking-wider">
                          {meta.tag}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Category description */}
                  <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-sans mb-5">
                    {meta.subtitle}
                  </p>
                </div>

                {/* Tech items */}
                <div className="pt-3 border-t border-border/40 flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border/80 bg-surface-secondary/50 hover:border-accent hover:bg-surface-secondary text-foreground transition-all duration-200 cursor-default shadow-xs"
                    >
                      <TechIcon name={item.icon} className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-xs sm:text-[13px] font-mono font-medium text-foreground/90">
                        {item.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
