import Link from "next/link";
import { projects, type Project } from "@/data/projects";
import {
  Backdrop,
  Chip,
  PageHeader,
  PageShell,
  SectionHeading,
  Tile,
  TileLabel,
} from "@/components/ui/Tile";

const stats = [
  { label: "Total projects", value: projects.length },
  { label: "Completed", value: projects.filter((p) => p.status === "Completed").length },
  { label: "Technologies", value: new Set(projects.flatMap((p) => p.tech)).size },
  { label: "Categories", value: new Set(projects.map((p) => p.category)).size },
];

function ProjectCard({ project, lead = false }: { project: Project; lead?: boolean }) {
  return (
    <Tile
      tint={lead ? "fuchsia" : "indigo"}
      className={`group hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-400/40 ${
        lead ? "md:col-span-2 lg:p-8" : ""
      }`}
    >
      {lead && <Backdrop pattern="grid" glow="bg-fuchsia-400/20 dark:bg-fuchsia-500/15" />}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <TileLabel>{project.category}</TileLabel>
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{project.status}</span>
      </div>
      <Link
        href={`/projects/${project.slug}`}
        className="after:absolute after:inset-0 after:rounded-3xl"
      >
        <h3
          className={`mt-3 font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 ${
            lead ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>
      </Link>
      <p
        className={`mt-2 leading-relaxed text-gray-600 dark:text-gray-300 ${
          lead ? "text-base" : "line-clamp-3 text-sm"
        }`}
      >
        {project.description}
      </p>
      {lead && project.longDescription && (
        <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
          {project.longDescription}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        {(lead ? project.tech : project.tech.slice(0, 4)).map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
        {!lead && project.tech.length > 4 && (
          <span className="self-center font-mono text-xs text-gray-500 dark:text-gray-400">
            +{project.tech.length - 4} more
          </span>
        )}
      </div>
      <div className="mt-auto flex items-center gap-4 pt-6 text-sm font-medium">
        <span className="text-indigo-600 dark:text-indigo-400">Details →</span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${project.title} GitHub repository`}
          className="relative z-10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          GitHub ↗
        </a>
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live site`}
            className="relative z-10 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            Live ↗
          </a>
        )}
      </div>
    </Tile>
  );
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <PageShell>
      <PageHeader label="Work" title="Projects" icon="folder">
        A collection of web applications, competitive programming tools, and educational
        projects that showcase my skills and passion for technology.
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((stat) => (
          <Tile key={stat.label} className="p-5">
            <p className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {stat.value}
            </p>
            <p className="mt-1 font-mono text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
          </Tile>
        ))}
      </div>

      <section>
        <SectionHeading label="Highlights" title="Featured Projects" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} lead={index === 0} />
          ))}
        </div>
      </section>

      {otherProjects.length > 0 && (
        <section>
          <SectionHeading label="More" title="Other Projects" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
