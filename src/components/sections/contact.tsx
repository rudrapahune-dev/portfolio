"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
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
        setTimeout(() => setStatus("idle"), 3500);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3500);
    }
  };

  return (
    <section id="contact" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Direct Line"
          title="Let's Connect & Build"
          description="Interested in collaborating, backend engineering roles, or technical discussions? My inbox is open."
        />

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl font-heading font-bold text-foreground">
                Get in Touch Directly
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Whether you have an inquiry about a project, backend design discussions, or potential opportunities, feel free to reach out via the form or my verified profiles below.
              </p>
            </div>

            {/* Verified Social Connect Cards */}
            <div className="space-y-3 pt-2">
              {/* GitHub */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-card flex items-center justify-between p-4 rounded-xl group hover:border-accent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-secondary text-foreground group-hover:text-accent transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">GitHub Profile</h4>
                    <p className="text-xs font-mono text-muted">@rudrapahune-dev</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-card flex items-center justify-between p-4 rounded-xl group hover:border-accent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-secondary text-[#0077B5]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">LinkedIn Connection</h4>
                    <p className="text-xs font-mono text-muted">Rudra Pahune</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email Direct */}
              <a
                href="mailto:rudrapahune@gmail.com"
                className="editorial-card flex items-center justify-between p-4 rounded-xl group hover:border-accent transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-surface-secondary text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">Direct Email</h4>
                    <p className="text-xs font-mono text-muted">rudrapahune@gmail.com</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form with Guaranteed High-Contrast Theme Visibility (7 cols) */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-6 sm:p-8 rounded-2xl border border-border shadow-lg">
              <h3 className="text-lg font-heading font-bold text-foreground mb-4">
                Send a Structured Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-foreground mb-1.5">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all font-sans"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-foreground mb-1.5">
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all font-sans"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-foreground mb-1.5">
                    Subject / Discussion Topic <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Backend Collaboration"
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all font-sans"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-foreground mb-1.5">
                    Message Body <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rudra, I came across your portfolio and wanted to discuss..."
                    className="w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-[#141512] font-semibold text-sm hover:brightness-110 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Message...</span>
                      </>
                    ) : status === "success" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Message Dispatched!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-muted">
                    Response time: Usually within 24 hours
                  </span>
                </div>

                {status === "success" && (
                  <div className="p-3 rounded-xl bg-accent-muted border border-accent/30 text-accent text-xs font-mono">
                    ✓ Your message was validated and recorded successfully.
                  </div>
                )}

                {status === "error" && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono">
                    ⚠️ Failed to transmit message. Please send an email directly to rudrapahune@gmail.com.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
