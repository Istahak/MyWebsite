import Link from "next/link";
import { projects } from "@/data/projects";
import { Backdrop, Chip, SectionHeading, Tile, TileLabel } from "@/components/ui/Tile";

const ProjectsGrid = () => {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <section>
      <SectionHeading
        label="Work"
        title="Projects"
        href="/projects"
        linkText="All projects"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {featured.map((project, index) => {
          const isLead = index === 0;
          return (
            <Tile
              key={project.id}
              tint={isLead ? "fuchsia" : "indigo"}
              className={`group hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-400/40 ${
                isLead ? "md:col-span-2 lg:p-8" : ""
              }`}
            >
              {isLead && (
                <Backdrop pattern="grid" glow="bg-fuchsia-400/20 dark:bg-fuchsia-500/15" />
              )}
              <TileLabel>{project.category}</TileLabel>
              {/* The title link stretches over the whole tile; the GitHub link sits above it. */}
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:rounded-3xl"
              >
                <h3
                  className={`mt-3 font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 ${
                    isLead ? "text-2xl sm:text-3xl" : "text-xl"
                  }`}
                >
                  {project.title}
                </h3>
              </Link>
              <p
                className={`mt-2 leading-relaxed text-gray-600 dark:text-gray-300 ${
                  isLead ? "text-base" : "line-clamp-3 text-sm"
                }`}
              >
                {project.description}
              </p>
              {isLead && project.longDescription && (
                <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
                  {project.longDescription}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.slice(0, isLead ? 7 : 3).map((tech) => (
                  <Chip key={tech}>{tech}</Chip>
                ))}
              </div>
              <div className="mt-auto flex items-center gap-4 pt-6 text-sm font-medium">
                <span className="text-indigo-600 dark:text-indigo-400">Details →</span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  GitHub ↗
                </a>
              </div>
            </Tile>
          );
        })}
      </div>
    </section>
  );
};

export default ProjectsGrid;
