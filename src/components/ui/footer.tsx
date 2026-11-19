"use client";

import { ArrowUp, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navItems } from "@/config/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-background text-foreground pt-12 pb-10 px-4 sm:px-6 lg:px-8 relative font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Giant Editorial Brand Typography */}
        <div className="py-8 sm:py-12 border-b border-foreground/20 overflow-hidden">
          <h2 className="text-[13vw] font-heading font-black tracking-tighter leading-none text-foreground select-none uppercase pointer-events-none">
            RUDRA PAHUNE
          </h2>
        </div>

        {/* Footer Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b border-foreground/20 text-sm">
          {/* Brand & Focus (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-heading font-black text-xl text-foreground tracking-tight">
                r<span className="text-muted">•</span>p
              </span>
              <span className="font-mono text-xs text-muted uppercase">/ portfolio</span>
            </div>
            <p className="text-sm text-muted max-w-sm leading-relaxed font-sans">
              AI & Data Science engineering student at YCCE Nagpur. Dedicated to building robust backend architectures, distributed event systems, and intelligent applications.
            </p>
          </div>

          {/* Quick Navigation (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-bold">
              Index
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted font-sans">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Direct Profiles (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-foreground font-bold">
              Connect
            </h4>
            <ul className="space-y-2 text-sm text-muted font-mono">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rudrapahune@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <div>
            © {currentYear} Rudra Pahune • All systems operational.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-foreground/30 bg-surface hover:bg-foreground hover:text-background text-foreground transition-all shadow-xs"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
