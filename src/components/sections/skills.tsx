"use client";

import { motion } from "framer-motion";
import { Terminal, Server, Database, Brain, Wrench, Layout, ArrowUpRight } from "lucide-react";
import { skills } from "@/config/portfolio";
import { TechIcon } from "@/lib/tech-icons";
import { SectionHeading } from "@/components/ui/section-heading";

export function Skills() {
  return (
    <section id="skills" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide">
        <SectionHeading
          label="02 / Technical Competencies"
          title="Skills & Technologies"
          description="Verified programming languages, backend systems, databases, and AI frameworks I work with."
        />

        {/* 3-Column Editorial Typography Grid (Inspired by Reference Skills/Clients layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {skills.categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="space-y-4 pb-6 border-b border-foreground/15 sm:border-b-0 sm:pr-4"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-3 border-b border-foreground/30">
                <h3 className="font-heading font-black text-xl text-foreground tracking-tight">
                  {category.name}
                </h3>
                <span className="font-mono text-xs text-muted font-bold">
                  0{idx + 1}
                </span>
              </div>

              {/* Items List (Clean Typography with Icon) */}
              <ul className="space-y-3 font-sans">
                {category.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-center justify-between group py-1.5 px-2 -mx-2 rounded-lg hover:bg-black/5 transition-colors cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-md bg-foreground/5 flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                        <TechIcon name={item.icon} className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-base sm:text-lg font-semibold text-foreground/90 group-hover:text-foreground group-hover:translate-x-1 transition-all">
                        {item.name}
                      </span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-12 pt-6 border-t border-foreground/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-xs text-muted">
          <span>Core focus: High concurrency, resilient schema design, and deterministic AI agents.</span>
          <span className="font-bold text-foreground">Java • Python • Node.js • PostgreSQL • Next.js</span>
        </div>
      </div>
    </section>
  );
}
