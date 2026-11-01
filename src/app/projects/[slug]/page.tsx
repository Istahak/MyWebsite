import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/projects";
import { renderPost } from "@/lib/blog";
import TableOfContents from "@/components/blog/TableOfContents";
import { Icon } from "@/components/ui/Icon";
import { Chip, PageShell, Tile, TileLabel } from "@/components/ui/Tile";
import type { Metadata } from "next";

interface ProjectDetail {
  slug: string;
  title: string;
  content: string;
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} - Istahak Islam`,
    description: project.description,
    keywords: project.tech.join(", "),
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Dynamically import project details
  let projectDetail: ProjectDetail | null = null;
  try {
    if (project.detailsFile) {
      const detailsModule = await import(
        `@/data/project-details/${project.detailsFile}`
      );
      // Get the default export or any named export
      projectDetail = detailsModule.default || detailsModule[Object.keys(detailsModule)[0]];
    }
  } catch {
    console.log(`Details file not found for project: ${project.detailsFile}`);
  }

  // Project write-ups are markdown, so they share the blog's renderer and reading layout.
  const { content, headings } = await renderPost(
    projectDetail?.content ?? project.longDescription ?? project.description
  );
  const index = projects.findIndex((p) => p.slug === slug);
  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <PageShell width="max-w-7xl">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-12">
        <div className="mx-auto w-full max-w-[60rem]">
          <header className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              <Icon name="arrowLeft" className="h-4 w-4" />
              All projects
            </Link>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <Icon name="folder" className="h-3.5 w-3.5" />
                {project.category}
              </span>
              <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-gray-600 dark:bg-white/10 dark:text-gray-300">
                {project.status}
              </span>
            </div>

            <h1 className="mt-3 text-3xl leading-tight font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {project.title}
            </h1>
            <p className="mt-3 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <Icon name="code" className="h-4 w-4" />
                Source on GitHub
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-gray-700 hover:border-indigo-300 dark:border-white/10 dark:text-gray-200 dark:hover:border-indigo-400/40"
                >
                  <Icon name="external" className="h-4 w-4" />
                  Live demo
                </a>
              )}
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
            {previous ? (
              <Tile href={`/projects/${previous.slug}`}>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  ← Previous
                </span>
                <span className="mt-2 block font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {previous.title}
                </span>
              </Tile>
            ) : (
              <span />
            )}
            {next && (
              <Tile href={`/projects/${next.slug}`} className="text-right">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
                  Next →
                </span>
                <span className="mt-2 block font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                  {next.title}
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
