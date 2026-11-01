"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { tagSlug } from "@/lib/tags";

export interface PostSummary {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingMinutes: number;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function PostList({ posts }: { posts: PostSummary[] }) {
  const activeTag = useSearchParams().get("tag");
  return <Posts posts={posts} activeTag={activeTag} />;
}

export function Posts({
  posts,
  activeTag,
}: {
  posts: PostSummary[];
  activeTag: string | null;
}) {
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
  const visible = activeTag
    ? posts.filter((post) => post.tags.some((tag) => tagSlug(tag) === activeTag))
    : posts;

  const chip = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm transition-colors ${
      active
        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
        : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    }`;

  return (
    <>
      <nav aria-label="Filter by tag" className="mb-12 flex flex-wrap gap-2">
        <Link href="/blog" className={chip(!activeTag)}>
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tagSlug(tag)}`}
            className={chip(tagSlug(tag) === activeTag)}
          >
            {tag}
          </Link>
        ))}
      </nav>

      <ul className="divide-y divide-gray-200 dark:divide-gray-800">
        {visible.map((post) => (
          <li key={post.slug} className="py-8 first:pt-0">
            <article>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden> · </span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                {post.excerpt}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs text-gray-500 dark:text-gray-400"
                  >
                    #{tagSlug(tag)}
                  </span>
                ))}
              </div>
            </article>
          </li>
        ))}
      </ul>

      {visible.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No posts with this tag yet.
        </p>
      )}
    </>
  );
}
