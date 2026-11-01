import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostList, { Posts } from "@/components/blog/PostList";
import { PageHeader, PageShell } from "@/components/ui/Tile";

export const metadata: Metadata = {
  title: "Blog - Istahak Islam",
  description:
    "Technical blog posts about competitive programming, algorithms, data structures, and software development.",
  alternates: {
    types: { "application/rss+xml": "/rss.xml" },
  },
};

export default function BlogPage() {
  const posts = getAllPosts().map(
    ({ slug, title, excerpt, date, tags, readingMinutes }) => ({
      slug,
      title,
      excerpt,
      date,
      tags,
      readingMinutes,
    })
  );

  return (
    <PageShell width="max-w-5xl">
      <PageHeader label="Writing" title="Blog" icon="book">
        Notes on competitive programming, algorithms, and software development.
      </PageHeader>

      {/* Static fallback shows every post until the client reads ?tag= */}
      <Suspense fallback={<Posts posts={posts} activeTag={null} />}>
        <PostList posts={posts} />
      </Suspense>
    </PageShell>
  );
}
