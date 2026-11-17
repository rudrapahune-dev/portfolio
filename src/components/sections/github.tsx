"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Star,
  GitFork,
  ExternalLink,
  RotateCw,
  BookOpen,
  Users,
  Code2,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

interface GitHubProfile {
  login: string;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
}

const langColors: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  C: "#555555",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function GitHubSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchGitHub = useCallback(async () => {
    try {
      const [profileRes, reposRes] = await Promise.all([
        fetch("/api/github?type=profile"),
        fetch("/api/github?type=repos"),
      ]);

      if (profileRes.ok) {
        setProfile(await profileRes.json());
      }
      if (reposRes.ok) {
        setRepos(await reposRes.json());
      }
    } catch (e) {
      console.error("Error loading GitHub data:", e);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchGitHub();
  }, [fetchGitHub]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchGitHub();
  };

  return (
    <section id="github" className="section-padding relative border-t border-border/40">
      <div className="container-wide">
        <SectionHeading
          label="Open Source & Repositories"
          title="GitHub Engineering Activity"
          description="Public repositories, source code, and verified contributions on GitHub."
        />

        {/* Profile Card Banner */}
        <div className="editorial-card rounded-3xl p-6 sm:p-8 lg:p-9 mb-10 max-w-5xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Profile Avatar */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-border bg-surface-secondary flex-shrink-0 shadow-sm">
                {profile?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.avatar_url}
                    alt={profile.login}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-secondary">
                    <Github className="w-8 h-8 text-accent" />
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-foreground">
                    {profile?.login || "rudrapahune-dev"}
                  </h3>
                  <span className="editorial-tag text-xs font-semibold">Active Developer</span>
                </div>
                <p className="text-sm sm:text-base text-muted font-sans mb-3.5 max-w-md">
                  {profile?.bio || "Backend Developer & AI Engineering Student building scalable systems."}
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-4 text-xs sm:text-sm font-mono text-muted">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-accent" />
                    <strong className="text-foreground">{profile?.public_repos ?? "—"}</strong> Repositories
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-accent" />
                    <strong className="text-foreground">{profile?.followers ?? "—"}</strong> Followers
                  </span>
                </div>
              </div>
            </div>

            {/* Profile CTA buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="p-3 rounded-xl border border-border bg-surface-secondary hover:border-accent text-muted hover:text-foreground transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                title="Refresh GitHub Data"
                aria-label="Refresh GitHub Data"
              >
                <RotateCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-accent" : ""}`} />
              </button>

              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-[#141512] font-semibold text-xs sm:text-sm hover:brightness-110 transition-all shadow-sm min-h-[44px]"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="editorial-card p-6 sm:p-7 rounded-2xl space-y-4 animate-pulse border border-border"
                >
                  <div className="h-4 w-32 bg-border/80 rounded" />
                  <div className="h-10 w-full bg-border/40 rounded" />
                  <div className="h-3 w-24 bg-border/60 rounded" />
                </div>
              ))
            : repos.map((repo) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -4 }}
                  className="editorial-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between group shadow-sm transition-all duration-300"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <h4 className="font-heading font-extrabold text-base sm:text-lg text-foreground group-hover:text-accent transition-colors">
                          {repo.name}
                        </h4>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted group-hover:text-foreground transition-colors flex-shrink-0" />
                    </div>

                    <p className="text-[14px] sm:text-[15px] text-muted leading-relaxed font-sans line-clamp-3 mb-5">
                      {repo.description || "Public repository and code exploration by Rudra Pahune."}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-border/50 flex items-center justify-between text-xs sm:text-[13px] font-mono text-muted">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: langColors[repo.language] || "#C5E86C" }}
                        />
                        <span className="text-foreground/90 font-medium">{repo.language}</span>
                      </span>
                    )}

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-accent" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{repo.forks_count}</span>
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
        </div>
      </div>
    </section>
  );
}
