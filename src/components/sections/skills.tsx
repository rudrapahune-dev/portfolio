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
    <section id="skills" className="section-padding relative">
      {/* Subtle background accent */}
      <div className="absolute inset-0 dot-pattern opacity-20 pointer-events-none" />

      <div className="container-wide relative">
        <SectionHeading
          label="Skills"
          title="Technologies I Work With"
          description="Tools and technologies I use to bring ideas to life."
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
              className="group p-6 rounded-xl border border-border bg-surface/30 hover:bg-surface/60 hover:border-border/80 transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 text-cyan-400">
                  {categoryIcons[category.icon] || <Terminal className="w-5 h-5" />}
                </div>
                <h3 className="font-heading font-semibold text-foreground text-sm">
                  {category.name}
                </h3>
              </div>

              {/* Tech items */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-background/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 cursor-default"
                  >
                    <TechIcon name={item.icon} className="w-4 h-4 text-muted group-hover:text-foreground" />
                    <span className="text-xs font-medium text-muted">{item.name}</span>
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
