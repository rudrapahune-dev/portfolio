"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, MessageSquare, Terminal, Code2, Braces } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % personalInfo.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for gradient
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Mouse-following gradient */}
      <div
        className="absolute inset-0 opacity-30 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(34, 211, 238, 0.08), transparent 60%)`,
        }}
      />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-[10%] hidden lg:block"
      >
        <div className="glass rounded-lg px-4 py-3 text-xs font-mono text-muted opacity-40">
          <div className="flex items-center gap-2 mb-1">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-400/60">terminal</span>
          </div>
          <span className="text-emerald-400">→</span> npm run dev
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-[8%] hidden lg:block"
      >
        <div className="glass rounded-lg px-4 py-3 text-xs font-mono text-muted opacity-40">
          <div className="flex items-center gap-2 mb-1">
            <Braces className="w-3 h-3 text-indigo-400" />
            <span className="text-indigo-400/60">api</span>
          </div>
          <span className="text-emerald-400">200</span> /api/data
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [-5, 10, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 left-[15%] hidden xl:block"
      >
        <div className="glass rounded-lg px-3 py-2 text-xs font-mono text-muted opacity-30">
          <Code2 className="w-3.5 h-3.5 text-cyan-400/50" />
        </div>
      </motion.div>

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Availability badge */}
        {siteConfig.status.available && (
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium glass">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              {siteConfig.status.message}
            </span>
          </motion.div>
        )}

        {/* Intro */}
        <motion.p
          variants={itemVariants}
          className="text-muted text-base sm:text-lg mb-4 font-medium"
        >
          Hi, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 tracking-tight"
        >
          <span className="gradient-text">{personalInfo.name}</span>
        </motion.h1>

        {/* Role cycling */}
        <motion.div variants={itemVariants} className="h-10 sm:h-12 mb-6 flex items-center justify-center">
          <span className="text-muted text-lg sm:text-xl mr-2">I&apos;m a</span>
          <div className="relative h-8 sm:h-10 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="inline-block text-lg sm:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400"
              >
                {personalInfo.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          variants={itemVariants}
          className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.shortBio}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("projects")}
            className="group relative px-6 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              Explore My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </button>

          <button
            onClick={() => scrollTo("contact")}
            className="group px-6 py-3 rounded-lg font-medium text-sm border border-border text-foreground hover:bg-white/5 hover:border-white/20 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Let&apos;s Connect
            </span>
          </button>

          <a
            href={siteConfig.resume}
            download
            className="group px-6 py-3 rounded-lg font-medium text-sm text-muted hover:text-foreground transition-colors"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Resume
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted/30 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
