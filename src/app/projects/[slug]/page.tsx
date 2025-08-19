import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import type { Metadata } from "next";

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
  let projectDetails: any = null;
  try {
    if (project.detailsFile) {
      const detailsModule = await import(
        `@/data/project-details/${project.detailsFile}`
      );
      // Get the default export or the named export that matches the project
      projectDetails =
        detailsModule[
          `${project.detailsFile.replace(/-([a-z])/g, (g) =>
            g[1].toUpperCase()
          )}Details`
        ] ||
        detailsModule.default ||
        detailsModule[Object.keys(detailsModule)[0]];
    }
  } catch (error) {
    console.log(`Details file not found for project: ${project.detailsFile}`);
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link
              href="/projects"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Projects
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                View Code
              </a>
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {projectDetails ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Overview
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {projectDetails.overview}
                  </p>
                </div>
              </section>

              {/* Challenge */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  The Challenge
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {projectDetails.challenge}
                  </p>
                </div>
              </section>

              {/* Solution */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  The Solution
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                    {projectDetails.solution}
                  </p>
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Key Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {projectDetails.features.map(
                    (feature: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="text-gray-700 dark:text-gray-300">
                          {feature}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>

              {/* Lessons Learned */}
              <section>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Lessons Learned
                </h2>
                <div className="space-y-3">
                  {projectDetails.lessons.map(
                    (lesson: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500"
                      >
                        <div className="text-gray-700 dark:text-gray-300">
                          {lesson}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              {/* Project Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Project Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Status
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {project.status}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Category
                    </span>
                    <p className="text-gray-900 dark:text-white">
                      {project.category}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Links
                    </span>
                    <div className="space-y-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      >
                        GitHub Repository
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tech Stack */}
              {projectDetails.techStack && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Tech Stack
                  </h3>
                  <div className="space-y-4">
                    {projectDetails.techStack.map(
                      (category: any, index: number) => (
                        <div key={index}>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                            {category.category}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {category.technologies.map((tech: string) => (
                              <span
                                key={tech}
                                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Future Enhancements */}
              {projectDetails.futureEnhancements && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Future Enhancements
                  </h3>
                  <div className="space-y-2">
                    {projectDetails.futureEnhancements
                      .slice(0, 5)
                      .map((enhancement: string, index: number) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600 dark:text-gray-300"
                        >
                          {enhancement}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          // Fallback content when no detailed file exists
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                About This Project
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
                {project.longDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Project Status
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Status:</span>{" "}
                      {project.status}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Category:</span>{" "}
                      {project.category}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      <span className="font-medium">Featured:</span>{" "}
                      {project.featured ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
