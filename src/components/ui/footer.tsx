"use client";

import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";
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
    <footer className="border-t border-border bg-surface/50 text-foreground pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border/80">
          {/* Brand & Mission (6 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-accent text-[#141512] font-heading font-black text-sm flex items-center justify-center">
                RP
              </span>
              <span className="font-heading font-bold text-xl text-foreground tracking-tight">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-muted max-w-md leading-relaxed font-sans">
              Developer dedicated to building robust backend architectures, intelligent AI systems, and high-quality full-stack applications.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span>B.Tech AI & Data Science • YCCE Nagpur (2029)</span>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Profiles (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-mono text-xs uppercase tracking-wider text-accent font-semibold">
              Direct Profiles
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4 text-accent" />
                  <span>GitHub (@rudrapahune-dev)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:rudrapahune@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent-secondary" />
                  <span>rudrapahune@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted">
          <div>
            © {currentYear} Rudra Pahune. Engineered with Next.js 15, TypeScript & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-surface hover:border-accent hover:text-foreground transition-all"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
}
