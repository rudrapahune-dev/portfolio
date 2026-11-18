"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Github, Linkedin, Mail, CheckCircle2, Loader2, ArrowUpRight, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // Honeypot field for anti-bot protection
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedbackMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        setStatus("success");
        setFeedbackMessage(data.message || "Your message was delivered successfully to Rudra's inbox!");
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        setTimeout(() => {
          setStatus("idle");
          setFeedbackMessage("");
        }, 7000);
      } else {
        setStatus("error");
        setFeedbackMessage(data.error || "Failed to transmit message. Please send an email directly to rudrapahune@gmail.com.");
      }
    } catch {
      setStatus("error");
      setFeedbackMessage("Network connection error. Please email rudrapahune@gmail.com directly.");
    }
  };

  return (
    <section id="contact" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Direct Communication"
          title="Let's Connect & Build"
          description="Interested in collaborating, backend engineering roles, or technical architecture discussions? My inbox is open."
        />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl mx-auto items-start">
          {/* Left Column: Direct Links & Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground">
                Get in Touch Directly
              </h3>
              <p className="text-[15px] sm:text-[16px] text-muted leading-relaxed font-sans">
                Whether you have an inquiry about a project, distributed backend designs, or potential opportunities, feel free to reach out via the form or my verified profiles.
              </p>
            </div>

            {/* Verified Social Connect Cards */}
            <div className="space-y-3 pt-2">
              {/* GitHub */}
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-card flex items-center justify-between p-4 sm:p-5 rounded-2xl group hover:border-accent transition-all duration-300 shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-surface-secondary text-foreground group-hover:text-accent transition-colors">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-heading font-bold text-foreground">GitHub Profile</h4>
                    <p className="text-xs sm:text-[13px] font-mono text-muted">@rudrapahune-dev</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-card flex items-center justify-between p-4 sm:p-5 rounded-2xl group hover:border-accent transition-all duration-300 shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-surface-secondary text-[#0077B5]">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-heading font-bold text-foreground">LinkedIn Network</h4>
                    <p className="text-xs sm:text-[13px] font-mono text-muted">Rudra Pahune</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* Email Direct */}
              <a
                href="mailto:rudrapahune@gmail.com"
                className="editorial-card flex items-center justify-between p-4 sm:p-5 rounded-2xl group hover:border-accent transition-all duration-300 shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-3 rounded-xl bg-surface-secondary text-accent">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-heading font-bold text-foreground">Direct Email</h4>
                    <p className="text-xs sm:text-[13px] font-mono text-muted">rudrapahune@gmail.com</p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-6 sm:p-8 lg:p-9 rounded-3xl border border-border shadow-xl">
              <h3 className="text-lg sm:text-xl font-heading font-extrabold text-foreground mb-4">
                Send a Structured Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-bot protection (hidden from humans, filled by bots) */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <label htmlFor="website-hp">Website</label>
                  <input
                    id="website-hp"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label htmlFor="contact-name" className="block text-xs sm:text-[13px] font-mono font-medium text-foreground mb-1.5">
                      Your Name <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-all font-sans min-h-[44px]"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs sm:text-[13px] font-mono font-medium text-foreground mb-1.5">
                      Your Email <span className="text-accent">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-all font-sans min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs sm:text-[13px] font-mono font-medium text-foreground mb-1.5">
                    Subject / Discussion Topic <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Project Inquiry / Backend Collaboration"
                    className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-all font-sans min-h-[44px]"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs sm:text-[13px] font-mono font-medium text-foreground mb-1.5">
                    Message Body <span className="text-accent">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rudra, I came across your portfolio and wanted to discuss..."
                    className="w-full px-4 py-3 rounded-xl border text-sm sm:text-base transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-[#141512] font-semibold text-sm sm:text-base hover:brightness-110 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
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

                  <span className="text-xs font-mono text-muted">
                    Response time: Usually within 24 hours
                  </span>
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-accent-muted border border-accent/40 text-accent text-xs sm:text-[13px] font-mono leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">Message Dispatched</p>
                      <p className="text-muted text-xs mt-0.5">{feedbackMessage}</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-[13px] font-mono leading-relaxed space-y-2">
                    <p className="font-semibold text-red-300">Notice:</p>
                    <p className="text-muted text-xs leading-relaxed">{feedbackMessage}</p>
                    <a
                      href="mailto:rudrapahune@gmail.com"
                      className="inline-flex items-center gap-1.5 text-accent hover:underline font-bold text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open email client directly (rudrapahune@gmail.com)</span>
                    </a>
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
