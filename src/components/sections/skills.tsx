"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  Layout,
  Server,
  Database,
  Wrench,
  Brain,
} from "lucide-react";
import { skills } from "@/config/portfolio";
import { TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const categoryIcons: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
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
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="section-padding relative border-t border-border/40">
      <div className="container-wide relative">
        <SectionHeading
          label="Toolbox"
          title="Technologies I Work With"
          description="Proven engineering tools and foundational frameworks I use to construct reliable systems."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skills.categories.map((category) => (
            <motion.div
              key={category.name}
              variants={itemVariants}
              className="editorial-card p-6 rounded-2xl group shadow-xs hover:border-accent/80 transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/60">
                <div className="p-2.5 rounded-xl bg-accent-muted text-accent">
                  {categoryIcons[category.icon] || <Terminal className="w-5 h-5" />}
                </div>
                <h3 className="font-heading font-bold text-foreground text-sm tracking-tight">
                  {category.name}
                </h3>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.04, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/80 bg-surface-secondary/40 hover:border-accent/40 hover:bg-surface-secondary text-foreground transition-all duration-200 cursor-default"
                  >
                    <TechIcon name={item.icon} className="w-4 h-4 text-accent" />
                    <span className="text-xs font-mono font-medium text-foreground/90">{item.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
