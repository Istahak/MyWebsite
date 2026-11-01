import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import PostList, { Posts } from "@/components/blog/PostList";

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
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-3xl px-4 py-16 font-sans sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Blog
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Notes on competitive programming, algorithms, and software
            development.
          </p>
        </header>

        {/* Static fallback shows every post until the client reads ?tag= */}
        <Suspense fallback={<Posts posts={posts} activeTag={null} />}>
          <PostList posts={posts} />
        </Suspense>
      </div>
    </div>
  );
}
