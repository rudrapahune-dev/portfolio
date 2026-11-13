"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Cpu, Bot, Sparkles, Server, Brain, Code2 } from "lucide-react";
import { personalInfo } from "@/config/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const exploringIcons: Record<string, React.ReactNode> = {
  Bot: <Bot className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Brain: <Brain className="w-5 h-5" />,
  Code2: <Code2 className="w-5 h-5" />,
};

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const paragraphs = personalInfo.fullBio.split("\n\n");

  return (
    <section id="about" className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          label="About"
          title="Get to Know Me"
          description="A developer driven by curiosity and a passion for building."
        />

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Bio Text - Left */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-3 space-y-5"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={itemVariants}
                className="text-muted leading-relaxed text-base sm:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* Info Cards - Right */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Education */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl border border-border bg-surface/50 hover:bg-surface hover:border-border/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/15 transition-colors">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">Education</h3>
                  <p className="text-muted text-sm">{personalInfo.education.degree}</p>
                  <p className="text-muted/70 text-xs mt-1">
                    {personalInfo.education.institution}
                  </p>
                  <p className="text-muted/70 text-xs">
                    Expected {personalInfo.education.expectedGraduation}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Location */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl border border-border bg-surface/50 hover:bg-surface hover:border-border/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/15 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">Location</h3>
                  <p className="text-muted text-sm">{personalInfo.education.location}</p>
                </div>
              </div>
            </motion.div>

            {/* Focus */}
            <motion.div
              variants={itemVariants}
              className="p-5 rounded-xl border border-border bg-surface/50 hover:bg-surface hover:border-border/80 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/15 transition-colors">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm mb-1">Focus Area</h3>
                  <p className="text-muted text-sm">Backend Development & AI Engineering</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Currently Exploring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-20"
        >
          <h3 className="text-xl sm:text-2xl font-heading font-semibold text-foreground mb-8 text-center">
            What I&apos;m Currently Exploring
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            {personalInfo.currentlyExploring.map((item, i) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group p-5 rounded-xl border border-border bg-surface/30 hover:bg-surface/60 hover:border-cyan-500/20 hover:shadow-lg hover:shadow-cyan-500/5 transition-all duration-300"
              >
                <div className="text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors">
                  {exploringIcons[item.icon] || <Code2 className="w-5 h-5" />}
                </div>
                <h4 className="font-semibold text-foreground text-sm mb-1.5">{item.title}</h4>
                <p className="text-muted text-xs leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
