"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { tagSlug } from "@/lib/tags";
import { Icon } from "@/components/ui/Icon";
import { Backdrop, Chip, Tile } from "@/components/ui/Tile";

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

  const pill = (active: boolean) =>
    `rounded-full px-3 py-1 text-sm transition-colors ${
      active
        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
        : "border border-gray-200 bg-white text-gray-600 hover:border-indigo-300 hover:text-indigo-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300 dark:hover:border-indigo-400/40 dark:hover:text-indigo-400"
    }`;

  return (
    <div className="space-y-8">
      <nav aria-label="Filter by tag" className="flex flex-wrap gap-2">
        <Link href="/blog" className={pill(!activeTag)}>
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog?tag=${tagSlug(tag)}`}
            className={pill(tagSlug(tag) === activeTag)}
          >
            {tag}
          </Link>
        ))}
      </nav>

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {visible.map((post, index) => {
          const lead = index === 0;
          return (
            <li key={post.slug} className={lead ? "md:col-span-2" : ""}>
              <Tile
                href={`/blog/${post.slug}`}
                tint={lead ? "sky" : "indigo"}
                className="h-full"
              >
                {lead && <Backdrop pattern="dots" glow="bg-sky-400/20 dark:bg-sky-500/15" />}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-gray-500 dark:text-gray-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="calendar" className="h-3.5 w-3.5" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="clock" className="h-3.5 w-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>
                <h2
                  className={`mt-3 font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 ${
                    lead ? "text-2xl" : "text-xl"
                  }`}
                >
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {post.tags.map((tag) => (
                    <Chip key={tag}>#{tagSlug(tag)}</Chip>
                  ))}
                </div>
              </Tile>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="text-gray-600 dark:text-gray-300">
          No posts with this tag yet.
        </p>
      )}
    </div>
  );
}
