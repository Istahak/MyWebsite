import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { projects } from "@/data/projects";
import { achievements } from "@/data/achievements";
import { navItems } from "@/data/navigation";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    ...navItems.map((item) => ({ url: `${siteUrl}${item.href === "/" ? "" : item.href}` })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.date,
    })),
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}` })),
    ...achievements.map((achievement) => ({ url: `${siteUrl}/achievements/${achievement.id}` })),
  ];
}
