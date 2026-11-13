"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
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

function RepoSkeleton() {
  return (
    <div className="p-5 rounded-xl border border-border bg-surface/30 animate-pulse">
      <div className="h-4 w-32 bg-white/5 rounded mb-3" />
      <div className="h-3 w-full bg-white/5 rounded mb-2" />
      <div className="h-3 w-2/3 bg-white/5 rounded mb-4" />
      <div className="flex gap-3">
        <div className="h-3 w-16 bg-white/5 rounded" />
        <div className="h-3 w-12 bg-white/5 rounded" />
      </div>
    </div>
  );
}

export function GitHubSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = siteConfig.github.username;

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchGitHub = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`/api/github?type=profile`),
          fetch(`/api/github?type=repos`),
        ]);

        if (profileRes.ok) {
          setProfile(await profileRes.json());
        }
        if (reposRes.ok) {
          setRepos(await reposRes.json());
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHub();
  }, [username]);

  if (!username) {
    return (
      <section className="section-padding">
        <div className="container-wide">
          <SectionHeading
            label="Open Source"
            title="GitHub Activity"
            description="Configure your GitHub username in site config to display your activity."
          />
          <div className="text-center py-12">
            <p className="text-muted text-sm">
              Add your GitHub username in{" "}
              <code className="text-xs px-2 py-0.5 rounded bg-white/5 font-mono">
                src/config/site.ts
              </code>{" "}
              to enable this section.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative">
      <div className="container-wide">
        <SectionHeading
          label="Open Source"
          title="GitHub Activity"
          description="My open-source contributions and public repositories."
        />

        {/* Profile summary */}
        {profile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center justify-center gap-6 mb-12"
          >
            <a
              href={profile.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-5 py-3 rounded-xl border border-border bg-surface/30 hover:bg-surface/50 transition-all group"
            >
              <Github className="w-5 h-5 text-foreground" />
              <span className="font-medium text-foreground text-sm">@{profile.login}</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-foreground transition-colors" />
            </a>
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-lg font-bold text-foreground">{profile.public_repos}</p>
                <p className="text-xs text-muted">Repos</p>
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">{profile.followers}</p>
                <p className="text-xs text-muted">Followers</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Repos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <RepoSkeleton key={i} />)
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-muted text-sm">Unable to load GitHub data. Try again later.</p>
            </div>
          ) : (
            repos.map((repo, i) => (
              <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group p-5 rounded-xl border border-border bg-surface/30 hover:bg-surface/50 hover:border-cyan-500/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground text-sm group-hover:text-cyan-400 transition-colors truncate">
                    {repo.name}
                  </h3>
                  <ExternalLink className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                </div>

                <p className="text-muted text-xs leading-relaxed mb-4 line-clamp-2">
                  {repo.description || "No description available."}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{
                          backgroundColor: langColors[repo.language] || "#888",
                        }}
                      />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3 h-3" />
                      {repo.forks_count}
                    </span>
                  )}
                </div>
              </motion.a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
