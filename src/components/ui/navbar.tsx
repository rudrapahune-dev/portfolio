"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin } from "lucide-react";
import { navItems } from "@/config/portfolio";
import { siteConfig } from "@/config/site";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    // Reset scroll to top on clean reload if no hash is present
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
        setActiveSection("home");
      }
    }

    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (window.scrollY < 120 && !window.location.hash) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px", threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[90] transition-all duration-300",
          scrolled
            ? "bg-surface/85 backdrop-blur-md border-b border-border shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group text-left"
            >
              <span className="w-8 h-8 rounded-lg bg-surface border border-border group-hover:border-accent text-accent font-heading font-black text-sm flex items-center justify-center transition-colors">
                RP
              </span>
              <span className="font-heading font-extrabold text-base tracking-tight text-foreground">
                Rudra Pahune<span className="text-accent">.</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-surface/60 border border-border/80">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-mono font-medium transition-all rounded-lg",
                      isActive
                        ? "text-accent bg-accent-muted shadow-xs font-semibold"
                        : "text-muted hover:text-foreground"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right side: Profiles & Theme */}
            <div className="flex items-center gap-2">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hidden sm:inline-flex p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hidden sm:inline-flex p-2 rounded-lg text-muted hover:text-[#0077B5] hover:bg-surface border border-transparent hover:border-border transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border transition-all"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-accent" />
                ) : (
                  <Moon className="w-4 h-4 text-accent" />
                )}
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-muted hover:text-foreground bg-surface border border-border"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[85] md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />

            {/* Menu Drawer */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-surface border-l border-border p-6 pt-20 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <p className="font-mono text-xs uppercase tracking-wider text-accent mb-3 font-semibold">
                  Navigation
                </p>
                {navItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-mono transition-colors",
                      activeSection === item.href.replace("#", "")
                        ? "text-accent bg-accent-muted font-bold"
                        : "text-muted hover:text-foreground hover:bg-surface-secondary"
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Mobile Socials */}
              <div className="pt-6 border-t border-border space-y-3 font-mono text-xs">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted hover:text-foreground"
                >
                  <Github className="w-4 h-4 text-accent" />
                  <span>GitHub Profile</span>
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-muted hover:text-foreground"
                >
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
