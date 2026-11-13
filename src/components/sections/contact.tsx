"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle2, Loader2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const socials = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      href: siteConfig.links.github,
      show: !!siteConfig.links.github && siteConfig.links.github !== "https://github.com/",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      href: siteConfig.links.linkedin,
      show: !!siteConfig.links.linkedin && siteConfig.links.linkedin !== "https://linkedin.com/in/",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: siteConfig.links.email,
      show: !!siteConfig.links.email && siteConfig.links.email !== "mailto:",
    },
  ].filter((s) => s.show);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          label="Contact"
          title="Get in Touch"
          description="Have a project idea or just want to say hello? I'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Left - Contact info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <motion.p variants={itemVariants} className="text-muted leading-relaxed">
              Whether you want to discuss a project, collaboration, or just chat about
              technology — feel free to reach out.
            </motion.p>

            {/* Social links */}
            {socials.length > 0 && (
              <motion.div variants={itemVariants} className="space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-surface/50 hover:border-cyan-500/20 transition-all group"
                  >
                    <span className="text-muted group-hover:text-cyan-400 transition-colors">
                      {social.icon}
                    </span>
                    <span className="text-sm text-foreground">{social.name}</span>
                  </a>
                ))}
              </motion.div>
            )}

            {socials.length === 0 && (
              <motion.p variants={itemVariants} className="text-muted text-sm italic">
                Add your social links in{" "}
                <code className="text-xs px-1.5 py-0.5 rounded bg-white/5 font-mono">
                  src/config/site.ts
                </code>
              </motion.p>
            )}
          </motion.div>

          {/* Right - Contact form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface/50 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-muted mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface/50 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-muted mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface/50 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-medium text-muted mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-surface/50 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "success"}
              className="w-full sm:w-auto px-8 py-3 rounded-lg font-medium text-sm bg-gradient-to-r from-cyan-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Sent!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-red-400 text-xs">
                Failed to send. Please try again or reach out directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
