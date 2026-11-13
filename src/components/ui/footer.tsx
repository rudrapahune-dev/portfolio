import { siteConfig } from "@/config/site";
import { personalInfo } from "@/config/portfolio";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface/40 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-muted">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-foreground">
            {siteConfig.name}
          </span>
          <span>•</span>
          <span>{personalInfo.headline}</span>
        </div>

        <div className="flex items-center gap-6">
          <p>© {currentYear} Rudra Pahune. Crafted with Next.js & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}
