import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "remark-github-blockquote-alert/alert.css";
import { getAllPosts, getPost, renderPost } from "@/lib/blog";
import { tagSlug } from "@/lib/tags";
import TableOfContents from "@/components/blog/TableOfContents";
import { Icon } from "@/components/ui/Icon";
import { Chip, PageShell, Tile, TileLabel } from "@/components/ui/Tile";
import JsonLd from "@/components/JsonLd";
import { siteUrl } from "@/lib/site";

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
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${slug}`,
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
    <PageShell width="max-w-7xl">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          keywords: post.tags.join(", "),
          url: `${siteUrl}/blog/${slug}`,
          image: `${siteUrl}/blog/${slug}/opengraph-image`,
          author: { "@type": "Person", name: "Istahak Islam", url: siteUrl },
        }}
      />
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <div className="mx-auto w-full max-w-[60rem]">
          <header className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <Icon name="arrowLeft" className="h-4 w-4" />
              All posts
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="calendar" className="h-3.5 w-3.5" />
                Last update: <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Icon name="clock" className="h-3.5 w-3.5" />
                {post.readingMinutes} min read
              </span>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600 dark:bg-white/10 dark:text-gray-300">
                {post.category}
              </span>
            </div>

            <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {post.title}
            </h1>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tagSlug(tag)}`}
                  className="hover:opacity-80"
                >
                  <Chip>#{tagSlug(tag)}</Chip>
                </Link>
              ))}
            </div>
          </header>

          {headings.length > 0 && (
            <details className="mb-10 rounded-3xl border border-gray-200/80 bg-white p-5 lg:hidden dark:border-white/10 dark:bg-white/[0.03]">
              <summary className="cursor-pointer font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
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

          <nav className="mt-16 grid gap-4 sm:grid-cols-2">
            {older ? (
              <Tile href={`/blog/${older.slug}`}>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  ← Older
                </span>
                <span className="mt-2 block font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {older.title}
                </span>
              </Tile>
            ) : (
              <span />
            )}
            {newer && (
              <Tile href={`/blog/${newer.slug}`} className="text-right">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  Newer →
                </span>
                <span className="mt-2 block font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {newer.title}
                </span>
              </Tile>
            )}
          </nav>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <Tile className="max-h-[calc(100vh-8rem)] overflow-y-auto p-5">
                <TileLabel icon="book">Table of contents</TileLabel>
                <div className="mt-4">
                  <TableOfContents headings={headings} />
                </div>
              </Tile>
            </div>
          </aside>
        )}
      </div>
    </PageShell>
  );
}
