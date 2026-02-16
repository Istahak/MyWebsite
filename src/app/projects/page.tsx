import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects - Istahak Islam",
  description:
    "Explore Istahak Islam's portfolio of web development projects, competitive programming tools, and educational applications.",
};

export default function ProjectsPage() {

  // These are placeholders for future filtering functionality
  // const categories = [
  //   "All",
  //   "Web Development",
  //   "Educational",
  //   "Competitive Programming",
  //   "Productivity",
  //   "Automation",
  //   "Blogging",
  // ];
  // const statuses = ["All", "Completed", "In Progress", "Planning"];

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            My Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collection of web applications, competitive programming tools, and
            educational projects that showcase my skills and passion for
            technology.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {projects.length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">
              Total Projects
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              {projects.filter(p => p.status === "Completed").length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Completed</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
              {[...new Set(projects.flatMap(p => p.tech))].length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Technologies</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
              {[...new Set(projects.map(p => p.category))].length}
            </div>
            <div className="text-gray-600 dark:text-gray-300">Categories</div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 block"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-white text-center">
                    <svg
                      className="w-16 h-16 mx-auto mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <p className="text-sm">Project Screenshot</p>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {project.category}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === "Completed"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                            : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                    {project.longDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Other Projects */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Other Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 block"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                      {project.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        project.status === "Completed"
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{project.tech.length - 4} more
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
