import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "remark-github-blockquote-alert/alert.css";
import { getAllPosts, getPost, renderPost } from "@/lib/blog";
import { tagSlug } from "@/lib/tags";
import TableOfContents from "@/components/blog/TableOfContents";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Istahak Islam`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: "Istahak Islam" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: ["Istahak Islam"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const { content, headings } = await renderPost(post.body);
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  // Posts are sorted newest first, so the next post is the one before it.
  const newer = posts[index - 1];
  const older = posts[index + 1];

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-10 font-sans sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12 lg:px-8">
        <div className="mx-auto w-full max-w-[60rem]">
          <header className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            >
              ← All posts
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>
                Last update: <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span aria-hidden>·</span>
              <span>{post.readingMinutes} min read</span>
              <span className="rounded bg-gray-100 px-1.5 py-0.5 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                {post.category}
              </span>
            </div>

            <h1 className="mt-3 text-[2rem] leading-tight font-light text-gray-900 dark:text-white">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-sm">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tagSlug(tag)}`}
                  className="text-indigo-700 hover:underline dark:text-indigo-300"
                >
                  #{tagSlug(tag)}
                </Link>
              ))}
            </div>
          </header>

          {headings.length > 0 && (
            <details className="mb-10 rounded-lg border border-gray-200 p-4 lg:hidden dark:border-gray-700">
              <summary className="cursor-pointer text-sm font-semibold text-gray-900 dark:text-white">
                Table of contents
              </summary>
              <div className="mt-4">
                <TableOfContents headings={headings} />
              </div>
            </details>
          )}

          <article className="blog-prose prose prose-gray max-w-none dark:prose-invert">
            {content}
          </article>

          <nav className="mt-16 grid gap-4 border-t border-gray-200 pt-8 sm:grid-cols-2 dark:border-gray-700">
            {older ? (
              <Link
                href={`/blog/${older.slug}`}
                className="rounded-lg border border-gray-200 p-4 hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-400"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">← Older</span>
                <span className="mt-1 block font-medium text-gray-900 dark:text-white">
                  {older.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {newer && (
              <Link
                href={`/blog/${newer.slug}`}
                className="rounded-lg border border-gray-200 p-4 text-right hover:border-blue-500 dark:border-gray-700 dark:hover:border-blue-400"
              >
                <span className="text-sm text-gray-500 dark:text-gray-400">Newer →</span>
                <span className="mt-1 block font-medium text-gray-900 dark:text-white">
                  {newer.title}
                </span>
              </Link>
            )}
          </nav>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <p className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Table of contents
              </p>
              <TableOfContents headings={headings} />
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
