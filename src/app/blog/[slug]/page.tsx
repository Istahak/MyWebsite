import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import MarkdownContent from "@/components/MarkdownContent";

// Define the BlogDetail interface here since it's used across multiple files
export interface BlogDetail {
  slug: string;
  title: string;
  content: string;
  tableOfContents?: {
    title: string;
    anchor: string;
    level: number;
  }[];
  codeExamples?: {
    title: string;
    language: string;
    code: string;
    explanation?: string;
  }[];
  relatedTopics?: string[];
  practiceProblems?: {
    title: string;
    platform: string;
    difficulty: string;
    link: string;
  }[];
  references?: {
    title: string;
    url: string;
  }[];
}

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: `${post.title} | Istahak Islam`,
    description: post.excerpt,
    keywords: post.tags?.join(", "),
    authors: [{ name: post.author || "Istahak Islam" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Istahak Islam"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPost({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Dynamically import the blog detail
  let blogDetail: BlogDetail | null = null;

  if (post.detailsFile) {
    try {
      const detailModule = await import(
        `@/data/blog-details/${post.detailsFile}`
      );

      // Get the correct export based on the filename
      const exportName = Object.keys(detailModule).find(
        (key) =>
          key.toLowerCase().includes("details") ||
          key.toLowerCase().includes(post.detailsFile?.replace(/-/g, "") || "")
      );

      if (exportName) {
        blogDetail = detailModule[exportName];
      }
    } catch (error) {
      console.error(
        `Failed to load blog details for ${post.detailsFile}:`,
        error
      );
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Blog Header */}
        <header className="mb-8">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
              {post.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>By {post.author || "Istahak Islam"}</span>
            </div>
            <div className="flex items-center gap-2">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <span>{post.readTime}</span>
            </div>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Blog Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none">
          {blogDetail ? (
            <div>
              {/* Table of Contents */}
              {blogDetail.tableOfContents &&
                blogDetail.tableOfContents.length > 0 && (
                  <div className="mb-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                      Table of Contents
                    </h2>
                    <ul className="space-y-2">
                      {blogDetail.tableOfContents.map((item, index) => (
                        <li
                          key={index}
                          className={`ml-${(item.level - 2) * 4}`}
                        >
                          <a
                            href={`#${item.anchor}`}
                            className="text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

              {/* Main Content */}
              <div className="mb-8">
                <MarkdownContent content={blogDetail.content} />
              </div>

              {/* Code Examples */}
              {blogDetail.codeExamples &&
                blogDetail.codeExamples.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Code Examples
                    </h2>
                    <div className="space-y-6">
                      {blogDetail.codeExamples.map((example, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
                        >
                          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                            {example.title}
                          </h3>
                          <pre className="bg-gray-900 dark:bg-gray-950 text-green-400 p-4 rounded-lg overflow-x-auto">
                            <code className={`language-${example.language}`}>
                              {example.code}
                            </code>
                          </pre>
                          {example.explanation && (
                            <p className="text-gray-600 dark:text-gray-300 mt-3">
                              {example.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Practice Problems */}
              {blogDetail.practiceProblems &&
                blogDetail.practiceProblems.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Practice Problems
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {blogDetail.practiceProblems.map((problem, index) => (
                        <a
                          key={index}
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {problem.title}
                          </h3>
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-blue-600 dark:text-blue-400">
                              {problem.platform}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${
                                problem.difficulty === "Easy"
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                  : problem.difficulty === "Medium"
                                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

              {/* Related Topics */}
              {blogDetail.relatedTopics &&
                blogDetail.relatedTopics.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                      Related Topics
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {blogDetail.relatedTopics.map((topic, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* References */}
              {blogDetail.references && blogDetail.references.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                    References
                  </h2>
                  <ul className="space-y-2">
                    {blogDetail.references.map((reference, index) => (
                      <li key={index}>
                        <a
                          href={reference.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {reference.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">
                Blog content is being updated. Please check back soon!
              </p>
            </div>
          )}
        </article>

        {/* Back to Blog Link */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/blog"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
