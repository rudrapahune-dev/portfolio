"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  Mail,
  Github,
  Linkedin,
  FileText,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background editorial grid & warm lighting */}
      <div className="absolute inset-0 editorial-grid opacity-35 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container-wide relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top meta badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3 mb-8"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-foreground/90 font-medium">{siteConfig.status.message}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/50 border border-border text-xs text-muted font-mono">
              <MapPin className="w-3 h-3 text-accent" />
              <span>Nagpur, India • B.Tech AI & Data Science</span>
            </div>
          </motion.div>

          {/* Intro line */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-mono text-sm uppercase tracking-widest text-accent mb-3 font-semibold"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Prominent Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight text-foreground leading-[1.05] mb-6"
          >
            Rudra Pahune<span className="text-accent">.</span>
          </motion.h1>

          {/* Dynamic Role Line with Reserved Space (Zero Layout Shift) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center gap-2 text-xl sm:text-2xl font-heading font-semibold text-foreground/80 mb-6"
          >
            <span className="text-muted font-normal">Specializing in</span>
            <div className="relative inline-block h-8 overflow-hidden min-w-[240px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 24, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 text-accent font-bold underline decoration-accent/40 underline-offset-4"
                >
                  {personalInfo.roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Carefully Crafted Narrative Description */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="space-y-3 mb-10 max-w-2xl"
          >
            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
              I&apos;m a developer interested in building intelligent software systems, scalable backend architectures and AI-powered applications.
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed font-mono">
              Primary focus: <span className="text-foreground">Backend Development</span>, <span className="text-foreground">Artificial Intelligence</span> & <span className="text-foreground">Full-Stack Engineering</span>.
            </p>
          </motion.div>

          {/* 5 CTAs with Real Profile Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            {/* 1. Explore My Work */}
            <button
              onClick={() => scrollTo("projects")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-[#141512] font-semibold text-sm hover:brightness-110 shadow-sm transition-all"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            {/* 2. Let's Connect */}
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface border border-border text-foreground font-medium text-sm hover:border-accent hover:bg-surface-secondary transition-all"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>Let&apos;s Connect</span>
            </button>

            {/* 3. GitHub Profile */}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border text-foreground font-medium text-sm hover:border-accent hover:bg-surface-secondary transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            {/* 4. LinkedIn Profile */}
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface border border-border text-foreground font-medium text-sm hover:border-accent hover:bg-surface-secondary transition-all"
            >
              <Linkedin className="w-4 h-4 text-[#0077B5]" />
              <span>LinkedIn</span>
            </a>

            {/* 5. Resume */}
            <a
              href={siteConfig.resume}
              download
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-surface/50 border border-border/80 text-muted font-medium text-sm hover:text-foreground hover:border-border transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </a>
          </motion.div>

          {/* Interactive terminal quick-bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-12 pt-8 border-t border-border/60 flex items-center justify-between text-xs text-muted font-mono"
          >
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-surface border border-border text-foreground font-semibold">Ctrl + K</kbd> to launch Command Palette</span>
            </div>
            <button
              onClick={() => scrollTo("terminal")}
              className="hidden sm:inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <Sparkles className="w-3 h-3" />
              <span>Try Interactive Terminal ↓</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
