"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowUpRight, Cpu, Database, Server, Sparkles } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";

export function About() {
  return (
    <section id="about" className="section-padding relative border-t border-foreground/20">
      <div className="container-wide">
        <SectionHeading
          label="01 / Profile & Philosophy"
          title="About Me"
          description="A personal look at my engineering mindset, computer science foundations, and background."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column (5 cols): Highlights & Education */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground leading-tight tracking-tight">
              Understanding software from first principles—no magic, no black boxes.
            </h3>

            {/* Education Highlight Card */}
            <div className="editorial-card p-6 sm:p-7 rounded-2xl bg-surface border border-foreground/30 hover:border-cobalt hover:shadow-[4px_4px_0px_var(--cobalt)] transition-all duration-200 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cobalt font-bold">
                <GraduationCap className="w-4 h-4 text-cobalt" />
                <span>Formal Education</span>
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-foreground">
                  {personalInfo.education.degree}
                </h4>
                <p className="text-sm font-sans text-foreground/80 mt-1">
                  {personalInfo.education.institution}
                </p>
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-foreground/15 text-xs font-mono text-muted">
                  <span>{personalInfo.education.location}</span>
                  <span className="font-bold text-foreground">Graduating {personalInfo.education.expectedGraduation}</span>
                </div>
              </div>
            </div>

            {/* Core Tenets */}
            <div className="space-y-3 pt-2 font-mono text-xs text-foreground">
              <div className="p-3.5 rounded-xl border border-foreground/20 bg-background flex items-center justify-between hover:border-cobalt transition-colors">
                <div className="flex items-center gap-2.5">
                  <Server className="w-4 h-4 text-cobalt" />
                  <span className="font-bold">Backend Architecture</span>
                </div>
                <span className="text-muted">Modular REST & Microservices</span>
              </div>

              <div className="p-3.5 rounded-xl border border-foreground/20 bg-background flex items-center justify-between hover:border-cobalt transition-colors">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-cobalt" />
                  <span className="font-bold">Data Integrity</span>
                </div>
                <span className="text-muted">PostgreSQL & ACID Bounds</span>
              </div>

              <div className="p-3.5 rounded-xl border border-foreground/20 bg-background flex items-center justify-between hover:border-cobalt transition-colors">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-cobalt" />
                  <span className="font-bold">Applied AI Workflows</span>
                </div>
                <span className="text-muted">Agents & Structured LLMs</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column (7 cols): Editorial Narrative & Core Principles */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-foreground/90 font-sans leading-relaxed"
          >
            <p className="text-lg sm:text-xl font-medium text-foreground">
              I have always been driven by an obsession with what happens <strong className="underline decoration-foreground/40 underline-offset-4">under the hood</strong>. Rather than treating frameworks or APIs like black boxes, I enjoy deconstructing how requests navigate the asynchronous event loop, how relational schemas guarantee consistency under concurrency, and how modern AI models can be woven into predictable, resilient backend architectures.
            </p>

            <p className="text-base sm:text-lg text-muted">
              As an AI and Data Science engineering student at Yeshwantrao Chavan College of Engineering (YCCE), Nagpur, I bridge core computer science principles—data structures, system design, and algorithmic efficiency—with modern, pragmatic full-stack execution.
            </p>

            <p className="text-base sm:text-lg text-muted">
              Whether architecting modular REST APIs in Node.js, designing relational data schemas in PostgreSQL with Prisma ORM, or experimenting with autonomous multi-step agent loops, my priority is always engineering robust, clean, and maintainable software.
            </p>

            {/* Principles List */}
            <div className="pt-6 border-t border-foreground/20 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
                How I Think About Engineering
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-foreground/20 bg-surface">
                  <span className="font-mono text-xs font-bold text-muted block mb-1">01 / FIRST PRINCIPLES</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mb-1">Understand the Runtime</p>
                  <p className="text-xs text-muted leading-normal">
                    Know the event loop, network latency, and memory model before adopting abstractions.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-foreground/20 bg-surface">
                  <span className="font-mono text-xs font-bold text-muted block mb-1">02 / DATA FIRST</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mb-1">Strict Consistency</p>
                  <p className="text-xs text-muted leading-normal">
                    Design schemas with clear transaction boundaries and indexed access patterns.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-foreground/20 bg-surface">
                  <span className="font-mono text-xs font-bold text-muted block mb-1">03 / PRACTICAL AI</span>
                  <p className="text-xs sm:text-sm font-bold text-foreground mb-1">Reliable Integration</p>
                  <p className="text-xs text-muted leading-normal">
                    Turn stochastic LLM capabilities into deterministic, verified software features.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
