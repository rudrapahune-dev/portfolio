"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin, ArrowUpRight } from "lucide-react";
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
      setScrolled(window.scrollY > 30);
      if (window.scrollY < 120 && !window.location.hash) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section observer
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
      { rootMargin: "-120px 0px -50% 0px", threshold: 0 }
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[90] transition-all duration-300",
          scrolled
            ? "bg-background/92 backdrop-blur-md border-b border-border py-3 shadow-xs"
            : "bg-transparent py-5"
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Minimal Brand Mark (r•p) */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center gap-2 group text-left cursor-pointer select-none"
            >
              <span className="font-heading font-black text-2xl tracking-tighter text-foreground hover:opacity-75 transition-opacity">
                r<span className="text-foreground/40">•</span>p
              </span>
            </button>

            {/* Desktop Editorial Navigation Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8 font-sans text-sm font-semibold text-foreground">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      "relative py-1 transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-foreground font-black underline decoration-2 underline-offset-8"
                        : "text-foreground/75 hover:text-foreground hover:underline underline-offset-8"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right Actions: Social Links, Theme Toggle, and "EMAIL ME" Pill */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hidden sm:inline-flex p-2 rounded-full hover:bg-black/5 text-foreground transition-colors"
                title="GitHub @rudrapahune-dev"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hidden sm:inline-flex p-2 rounded-full hover:bg-black/5 text-foreground transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-black/5 text-foreground transition-colors cursor-pointer"
                aria-label="Toggle theme"
                title="Toggle Dark/Light Theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Minimal "EMAIL ME" Pill Button inspired by reference */}
              <button
                onClick={() => scrollTo("#contact")}
                className="hidden xs:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider hover:opacity-85 transition-all shadow-xs cursor-pointer min-h-[38px]"
              >
                <span>Email Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-foreground hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
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
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-out Menu Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-0 bottom-0 w-[82%] max-w-sm bg-background border-l border-border p-6 pt-24 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-wider text-muted font-bold pb-2 border-b border-border/20">
                  Navigation
                </p>
                <div className="flex flex-col space-y-3 font-heading font-extrabold text-xl">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.replace("#", "");
                    return (
                      <button
                        key={item.href}
                        onClick={() => scrollTo(item.href)}
                        className={cn(
                          "text-left py-1.5 transition-colors cursor-pointer",
                          isActive
                            ? "text-foreground underline decoration-2 underline-offset-6"
                            : "text-foreground/70 hover:text-foreground"
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Drawer Actions */}
              <div className="space-y-4 pt-6 border-t border-border/30">
                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-foreground text-background font-mono text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  <span>Drop Me a Message</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-between pt-2 text-xs font-mono text-muted">
                  <a
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    GitHub
                  </a>
                  <span>•</span>
                  <a
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    LinkedIn
                  </a>
                  <span>•</span>
                  <a
                    href="mailto:rudrapahune@gmail.com"
                    className="hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
