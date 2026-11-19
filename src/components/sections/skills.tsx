"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { skills, skillUrls } from "@/config/portfolio";
import { TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/section-heading";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function Skills() {
  return (
    <section id="skills" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide">
        <SectionHeading
          number="02"
          label="Technical Competencies"
          title="Skills & Technologies"
          description="Click any technology to explore its official documentation. Verified languages, backend systems, databases, and AI frameworks."
        />

        {/* 3-Column Editorial Grid with Individual Bordered Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {skills.categories.map((category, catIdx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: catIdx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col space-y-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-foreground/30">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
                  <h3 className="font-heading font-black text-xl text-foreground tracking-tight">
                    {category.name}
                  </h3>
                </div>
                <span className="font-mono text-xs text-muted font-bold tracking-wider">
                  0{catIdx + 1}
                </span>
              </div>

              {/* Staggered Interactive Cards Grid */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20px" }}
                className="space-y-2.5"
              >
                {category.items.map((item) => {
                  const destinationUrl = item.url || skillUrls[item.name] || "https://github.com";

                  return (
                    <motion.a
                      key={item.name}
                      href={destinationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={cardVariants}
                      whileTap={{ scale: 0.98 }}
                      className="editorial-skill-card group"
                      title={`Visit official documentation for ${item.name}`}
                      aria-label={`${item.name} (opens official website in new tab)`}
                    >
                      {/* Left: Tech Icon & Title */}
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-foreground/5 dark:bg-foreground/10 flex items-center justify-center text-foreground group-hover:text-cobalt group-hover:bg-cobalt/10 group-hover:rotate-6 group-hover:scale-110 transition-all duration-200 flex-shrink-0">
                          <TechIcon name={item.icon} className="w-4 h-4" />
                        </div>
                        <span className="text-[15px] sm:text-[16px] font-semibold text-foreground tracking-tight truncate group-hover:text-cobalt transition-colors duration-150">
                          {item.name}
                        </span>
                      </div>

                      {/* Right: Appearing Arrow Indicator */}
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <span className="text-[10px] font-mono text-cobalt font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden sm:inline">
                          DOCS
                        </span>
                        <div className="w-5 h-5 rounded flex items-center justify-center text-muted group-hover:text-cobalt group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Callout with Cobalt Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-12 pt-6 border-t border-foreground/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cobalt animate-pulse" />
            <span>Click any technology card to inspect its official documentation & specification.</span>
          </div>
          <span className="font-bold text-foreground">
            Java • Python • Node.js • PostgreSQL • Next.js • AI Agents
          </span>
        </motion.div>
      </div>
    </section>
  );
}
