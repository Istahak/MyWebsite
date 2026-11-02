import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { achievements } from "@/data/achievements";
import { Icon } from "@/components/ui/Icon";
import { Backdrop, Chip, PageShell, Tile, TileLabel } from "@/components/ui/Tile";

interface AchievementDetailsProps {
  overview?: string;
  challenges?: string[];
  highlights?: string[];
  teamMembers?: string[];
  problemsAttempted?: number;
  problemsSolved?: number;
  contestDuration?: string;
  reflection?: string;
  [key: string]: unknown;
}

function suffix(n: number) {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export async function generateStaticParams() {
  return achievements.map((achievement) => ({
    slug: achievement.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const achievement = achievements.find((a) => a.id === slug);

  if (!achievement) {
    return {
      title: "Achievement Not Found",
    };
  }

  return {
    title: `${achievement.title} - Istahak Islam`,
    description: achievement.description,
    alternates: { canonical: `/achievements/${slug}` },
  };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const achievement = achievements.find((a) => a.id === slug);

  if (!achievement) {
    notFound();
  }

  // Dynamically import achievement details if available
  let achievementDetails: AchievementDetailsProps | null = null;
  try {
    if (achievement.detailsFile) {
      const detailsModule = await import(
        `@/data/achievement-details/${achievement.detailsFile}`
      );
      achievementDetails = detailsModule.default || detailsModule;
    }
  } catch {
    console.log(
      `Details file not found for achievement: ${achievement.detailsFile}`
    );
  }

  const solved = achievement.problemsSolved ?? achievementDetails?.problemsSolved;
  const attempted = achievementDetails?.problemsAttempted;
  const memberCount = achievementDetails?.teamMembers?.length;
  const topPercent = achievement.totalTeams
    ? Math.ceil((achievement.rank / achievement.totalTeams) * 100)
    : null;
  const isTopTen = achievement.rank <= 10;
  const highlights = achievementDetails?.highlights ?? [];
  const challenges = achievementDetails?.challenges ?? [];

  return (
    <PageShell width="max-w-4xl">
      <article className="space-y-8">
        <header>
          <Link
            href="/achievements"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            All achievements
          </Link>
          <div className="mt-8">
            <TileLabel icon="calendar">{formatDate(achievement.date)}</TileLabel>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              {achievement.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              <Chip>{achievement.category}</Chip>
              {achievement.teamName && <Chip>Team: {achievement.teamName}</Chip>}
            </div>
            <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {achievement.description}
            </p>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Tile tint={isTopTen ? "amber" : "indigo"}>
            {isTopTen && (
              <>
                <Backdrop glow="bg-amber-300/30 dark:bg-amber-400/15" />
                <Icon
                  name="trophy"
                  className="absolute bottom-3 right-3 -z-10 h-20 w-20 text-amber-500/15 dark:text-amber-300/10"
                />
              </>
            )}
            <TileLabel icon="trophy">Rank</TileLabel>
            <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
              {achievement.rank}
              <span className="text-2xl">{suffix(achievement.rank)}</span>
              {achievement.totalTeams && (
                <span className="ml-2 text-lg font-normal text-gray-400">
                  / {achievement.totalTeams}
                </span>
              )}
            </p>
            {topPercent !== null && (
              <div className="mt-auto pt-4">
                <span className="relative block h-1.5 rounded-full bg-gray-100 dark:bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full bg-indigo-500/40"
                    style={{ width: `${topPercent}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-indigo-500 dark:border-gray-950 dark:bg-indigo-400"
                    style={{ left: `${topPercent}%` }}
                  />
                </span>
                <span className="mt-1.5 block text-right font-mono text-xs text-gray-500 tabular-nums dark:text-gray-400">
                  top {topPercent}% of {achievement.totalTeams}
                </span>
              </div>
            )}
          </Tile>

          {solved !== undefined && (
            <Tile>
              <TileLabel icon="target">Problems solved</TileLabel>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
                {solved}
                {attempted !== undefined && (
                  <span className="ml-2 text-lg font-normal text-gray-400">/ {attempted}</span>
                )}
              </p>
              {attempted !== undefined && (
                <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                  attempted {attempted}
                </p>
              )}
            </Tile>
          )}

          {(achievement.teamName || memberCount) && (
            <Tile>
              <TileLabel icon="users">Team</TileLabel>
              {achievement.teamName && (
                <p className="mt-3 break-words font-mono text-lg font-semibold text-gray-900 dark:text-white">
                  {achievement.teamName}
                </p>
              )}
              {memberCount ? (
                <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {memberCount} members
                </p>
              ) : null}
            </Tile>
          )}

          <Tile>
            <TileLabel icon="calendar">Date</TileLabel>
            <p className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {formatDate(achievement.date)}
            </p>
            {achievementDetails?.contestDuration && (
              <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                {achievementDetails.contestDuration} contest
              </p>
            )}
          </Tile>

          <Tile className="sm:col-span-2">
            <TileLabel icon="pin">{achievement.location ? "Location" : "Organizer"}</TileLabel>
            <p className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              {achievement.location ?? achievement.organizer}
            </p>
            {achievement.location && (
              <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
                organized by {achievement.organizer}
              </p>
            )}
          </Tile>
        </section>

        <Tile className="h-64 overflow-hidden bg-gray-100 p-0 md:h-96 dark:bg-white/5">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-contain"
            priority
          />
        </Tile>

        {achievementDetails?.overview && (
          <Tile>
            <TileLabel icon="book">Overview</TileLabel>
            <p className="mt-3 leading-relaxed text-gray-600 dark:text-gray-300">
              {achievementDetails.overview}
            </p>
          </Tile>
        )}

        {(highlights.length > 0 || challenges.length > 0) && (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {highlights.length > 0 && (
              <Tile>
                <TileLabel icon="sparkles">Highlights</TileLabel>
                <ul className="mt-4 space-y-3">
                  {highlights.map((highlight, index) => (
                    <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500 dark:bg-indigo-400"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </Tile>
            )}
            {challenges.length > 0 && (
              <Tile>
                <TileLabel icon="wrench">Challenges faced</TileLabel>
                <ul className="mt-4 space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex gap-3 text-gray-600 dark:text-gray-300">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400 dark:bg-gray-500"
                      />
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </Tile>
            )}
          </div>
        )}

        {achievementDetails?.reflection && (
          <Tile>
            <TileLabel icon="star">Reflection</TileLabel>
            <blockquote className="mt-4 border-l-2 border-indigo-500 pl-4 italic leading-relaxed text-gray-600 dark:border-indigo-400 dark:text-gray-300">
              {achievementDetails.reflection}
            </blockquote>
          </Tile>
        )}

        <Tile>
          <TileLabel icon="tag">Tags</TileLabel>
          <div className="mt-4 flex flex-wrap gap-2">
            {achievement.tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
          {achievement.officialLink && (
            <a
              href={achievement.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              View official results
              <Icon name="external" className="h-4 w-4" />
            </a>
          )}
        </Tile>
      </article>
    </PageShell>
  );
}
