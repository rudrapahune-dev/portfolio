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
  ArrowUpRight,
} from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { siteConfig } from "@/config/site";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3200);

    return () => clearInterval(roleTimer);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-14 md:pt-40 md:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 w-full">
        {/* Top Status & Context Bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-3 pb-6 md:pb-8 font-mono text-xs sm:text-[13px] text-foreground/80 border-b border-foreground/15"
        >
          <div className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
            </span>
            <span className="font-semibold uppercase tracking-wider text-foreground">
              {siteConfig.status.message}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 text-muted">
            <MapPin className="w-3.5 h-3.5 text-foreground" />
            <span>Nagpur, India • B.Tech AI & Data Science (YCCE)</span>
          </div>
        </motion.div>

        {/* DOMINANT OVERSIZED NAME (Inspired by Reference "Noa Wynn") */}
        <div className="pt-6 md:pt-8 pb-4 md:pb-6 select-none overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="editorial-hero-title text-foreground tracking-[-0.04em] leading-[0.88] uppercase"
          >
            Rudra Pahune
          </motion.h1>
        </div>

        {/* Crisp Thin Black Divider Line */}
        <div className="w-full h-[1px] bg-foreground/25 my-4 md:my-6" />

        {/* Asymmetric Editorial Sub-Grid (Matching Reference Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-2 items-start">
          {/* Left Column: Roles, CTAs & Social Profiles (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 space-y-6"
          >
            {/* Dynamic Role Line */}
            <div className="flex flex-wrap items-center gap-2 text-lg sm:text-xl md:text-2xl font-heading font-extrabold text-foreground">
              <span className="text-muted font-normal">Specializing in</span>
              <div className="relative inline-block h-8 overflow-hidden min-w-[260px] sm:min-w-[310px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIndex}
                    initial={{ y: 22, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -22, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-0 top-0 text-foreground font-black underline decoration-foreground/30 underline-offset-4"
                  >
                    {personalInfo.roles[roleIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            {/* CTAs matching the minimal pill button aesthetic */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Primary Pill Button */}
              <button
                onClick={() => scrollTo("projects")}
                className="editorial-btn-primary cursor-pointer shadow-xs"
              >
                <span>Explore Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              {/* Secondary Pill Button */}
              <button
                onClick={() => scrollTo("contact")}
                className="editorial-btn-secondary cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Get in Touch</span>
              </button>

              {/* GitHub */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/40 hover:border-foreground text-foreground text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                title="GitHub Profile"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/40 hover:border-foreground text-foreground text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                title="LinkedIn Network"
              >
                <Linkedin className="w-4 h-4 text-[#0077B5]" />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-muted" />
              </a>

              {/* Resume Button with disabled / Soon logic */}
              {siteConfig.resume.available ? (
                <a
                  href={siteConfig.resume.url}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/40 hover:border-foreground text-foreground text-xs sm:text-sm font-semibold transition-all min-h-[44px]"
                >
                  <FileText className="w-4 h-4" />
                  <span>Resume</span>
                </a>
              ) : (
                <span
                  title="Resume PDF will be made available upon update."
                  aria-disabled="true"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-border/30 text-muted/60 text-xs sm:text-sm font-semibold cursor-not-allowed select-none min-h-[44px]"
                >
                  <FileText className="w-4 h-4 opacity-50" />
                  <span>Resume</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-black/5 text-muted">
                    Soon
                  </span>
                </span>
              )}
            </div>
          </motion.div>

          {/* Right Column: Editorial Bio Paragraph (5 cols, matching reference) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-5 space-y-4 font-sans text-base sm:text-lg text-foreground/90 leading-relaxed"
          >
            <p className="font-medium text-foreground">
              {personalInfo.shortBio}
            </p>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Passionate about understanding what happens <em className="text-foreground not-italic font-semibold">under the hood</em>—architecting modular, resilient backend services, investigating autonomous AI agent workflows, and designing ACID-compliant databases with Node.js and PostgreSQL.
            </p>

            {/* Quick Command Palette Prompt */}
            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-muted">
              <Terminal className="w-3.5 h-3.5 text-foreground" />
              <span>Press <kbd className="px-1.5 py-0.5 rounded bg-black/10 text-foreground font-bold">Ctrl + K</kbd> for Command Shell</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Horizontal Divider */}
        <div className="w-full h-[1px] bg-foreground/20 mt-10 md:mt-14" />
      </div>
    </section>
  );
}
