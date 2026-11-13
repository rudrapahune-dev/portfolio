import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const username = siteConfig.github.username;

  if (!username) {
    return NextResponse.json(
      { error: "No GitHub username configured in site config" },
      { status: 400 }
    );
  }

  try {
    if (type === "profile") {
      const res = await fetch(`https://api.github.com/users/${username}`, {
        headers: {
          "User-Agent": "Rudra-Portfolio",
        },
        next: { revalidate: 3600 }, // Cache 1 hour
      });

      if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch profile" }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json({
        login: data.login,
        avatar_url: data.avatar_url,
        html_url: data.html_url,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        bio: data.bio,
      });
    }

    if (type === "repos") {
      const res = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
        {
          headers: {
            "User-Agent": "Rudra-Portfolio",
          },
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) {
        return NextResponse.json({ error: "Failed to fetch repositories" }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json(data);
    }

    return NextResponse.json({ error: "Invalid type parameter" }, { status: 400 });
  } catch (err) {
    console.error("GitHub API route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
