"use client";

import { useState, FormEvent } from "react";
import { Send, Github, Linkedin, Mail, CheckCircle2, Loader2, ArrowUpRight } from "lucide-react";
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
    <section id="contact" className="section-padding py-20 md:py-28 border-b border-foreground/20">
      <div className="container-wide max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeading
          number="07"
          title="CONTACT"
          description="Interested in collaborating, backend engineering roles, or technical architecture discussions? My inbox is open."
        />

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Editorial Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted mb-2 font-bold">
                Don&apos;t be shy
              </p>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-foreground tracking-tight leading-none mb-6">
                Drop me a message.
              </h3>
              <p className="text-base sm:text-[17px] text-muted leading-relaxed font-sans mb-6">
                Whether you have an inquiry about a project, distributed backend designs, or potential opportunities, feel free to reach out via the form or my verified profiles.
              </p>
              <a
                href="mailto:rudrapahune@gmail.com"
                className="editorial-btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-bold min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>rudrapahune@gmail.com</span>
              </a>
            </div>

            {/* Verified Social Connect List */}
            <div className="border-t border-foreground/20 pt-6 space-y-4">
              <p className="font-mono text-xs uppercase tracking-wider text-muted font-bold">
                Direct Channels
              </p>

              <div className="space-y-3 font-mono text-sm">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-foreground/10 group hover:border-foreground transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-bold text-foreground">
                    <Github className="w-4 h-4" />
                    GitHub
                  </span>
                  <span className="text-xs text-muted group-hover:text-foreground flex items-center gap-1 transition-colors">
                    @rudrapahune-dev <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between py-2 border-b border-foreground/10 group hover:border-foreground transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-bold text-foreground">
                    <Linkedin className="w-4 h-4" />
                    LinkedIn
                  </span>
                  <span className="text-xs text-muted group-hover:text-foreground flex items-center gap-1 transition-colors">
                    Rudra Pahune <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>

                <a
                  href="mailto:rudrapahune@gmail.com"
                  className="flex items-center justify-between py-2 border-b border-foreground/10 group hover:border-foreground transition-colors"
                >
                  <span className="flex items-center gap-2.5 font-bold text-foreground">
                    <Mail className="w-4 h-4" />
                    Email
                  </span>
                  <span className="text-xs text-muted group-hover:text-foreground flex items-center gap-1 transition-colors">
                    rudrapahune@gmail.com <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="editorial-card p-7 sm:p-9 rounded-2xl shadow-[5px_5px_0px_#080808]">
              <h4 className="text-xl font-heading font-black text-foreground mb-1">
                Send a Message
              </h4>
              <p className="text-xs font-mono text-muted mb-6">
                Direct dispatch via Resend API • Typically responds within 24h
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field for anti-bot protection */}
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
                    <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-1.5">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/30 bg-background text-foreground text-sm focus:border-foreground focus:outline-none transition-all font-sans min-h-[44px]"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-foreground/30 bg-background text-foreground text-sm focus:border-foreground focus:outline-none transition-all font-sans min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Engineering Collaboration / Architecture Discussion"
                    className="w-full px-4 py-3 rounded-xl border border-foreground/30 bg-background text-foreground text-sm focus:border-foreground focus:outline-none transition-all font-sans min-h-[44px]"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-foreground uppercase tracking-wider mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Hello Rudra, I came across your portfolio and wanted to discuss..."
                    className="w-full px-4 py-3 rounded-xl border border-foreground/30 bg-background text-foreground text-sm focus:border-foreground focus:outline-none transition-all resize-none font-sans"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={status === "sending" || status === "success"}
                    className="editorial-btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
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
                    Direct delivery via Resend
                  </span>
                </div>

                {status === "success" && (
                  <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/30 text-xs font-mono leading-relaxed flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-foreground flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-foreground">Message Dispatched</p>
                      <p className="text-muted text-xs mt-0.5">{feedbackMessage}</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-mono leading-relaxed space-y-2">
                    <p className="font-bold">Transmission Notice:</p>
                    <p className="text-xs leading-relaxed">{feedbackMessage}</p>
                    <a
                      href="mailto:rudrapahune@gmail.com"
                      className="inline-flex items-center gap-1.5 underline font-bold text-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Open mail client directly (rudrapahune@gmail.com)</span>
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
