import { Metadata } from "next";
import Link from "next/link";
import { achievements, type Achievement } from "@/data/achievements";
import { Icon } from "@/components/ui/Icon";
import {
  Backdrop,
  PageHeader,
  PageShell,
  SectionHeading,
  Tile,
  TileLabel,
} from "@/components/ui/Tile";

export const metadata: Metadata = {
  title: "Achievements - Istahak Islam",
  description:
    "Explore Istahak Islam's competitive programming achievements, contest performances, and awards from various national and international competitions.",
};

const RING_RADIUS = 26;

function suffix(n: number) {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return "th";
  return ["th", "st", "nd", "rd"][n % 10] ?? "th";
}

const ordinal = (n: number) => `${n}${suffix(n)}`;

const formatMonth = (date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });

// A track for the whole field, rank 1 at the left, with a dot where the team finished.
function FieldPosition({ rank, total }: { rank: number; total: number }) {
  const topPercent = Math.ceil((rank / total) * 100);
  return (
    <span title={`${ordinal(rank)} of ${total} teams`} className="hidden w-28 shrink-0 sm:block">
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
        top {topPercent}% of {total}
      </span>
    </span>
  );
}

function ResultList({ items }: { items: Achievement[] }) {
  return (
    <Tile className="p-2">
      <ul className="divide-y divide-gray-100 dark:divide-white/5">
        {items.map((achievement) => (
          <li key={achievement.id}>
            <Link
              href={`/achievements/${achievement.id}`}
              className="flex items-center gap-4 rounded-2xl px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5"
            >
              <span
                className={`w-14 shrink-0 font-mono text-lg font-semibold tabular-nums ${
                  achievement.rank <= 10
                    ? "text-indigo-600 dark:text-indigo-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {ordinal(achievement.rank)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2 font-medium text-gray-900 dark:text-white">
                  {achievement.title}
                </span>
                <span className="block break-words font-mono text-xs text-gray-500 dark:text-gray-400">
                  {achievement.teamName ? `${achievement.teamName} · ` : ""}
                  {formatMonth(achievement.date)} · {achievement.category}
                </span>
              </span>
              {achievement.totalTeams && (
                <FieldPosition rank={achievement.rank} total={achievement.totalTeams} />
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Tile>
  );
}

export default function AchievementsPage() {
  const featuredAchievements = achievements.filter((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);

  const topTen = achievements.filter((a) => a.rank <= 10).length;
  const teamCount = new Set(achievements.map((a) => a.teamName).filter(Boolean)).size;
  const best = [...achievements].sort((a, b) => a.rank - b.rank)[0];
  const ringLength = 2 * Math.PI * RING_RADIUS;

  return (
    <PageShell>
      <PageHeader label="Contests" title="Achievements" icon="trophy">
        A collection of my competitive programming achievements, contest
        performances, and recognitions from various national and international
        competitions.
      </PageHeader>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Tile>
          <TileLabel icon="trophy">Total achievements</TileLabel>
          <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
            {achievements.length}
          </p>
          <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
            {featuredAchievements.length} featured contests
          </p>
        </Tile>

        <Tile>
          <TileLabel icon="award">Top-10 finishes</TileLabel>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
              {topTen}
              <span className="ml-2 text-lg font-normal text-gray-400">/ {achievements.length}</span>
            </p>
            <svg viewBox="0 0 64 64" aria-hidden className="h-16 w-16 shrink-0 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={RING_RADIUS}
                fill="none"
                strokeWidth="8"
                className="stroke-gray-100 dark:stroke-white/10"
              />
              <circle
                cx="32"
                cy="32"
                r={RING_RADIUS}
                fill="none"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(topTen / achievements.length) * ringLength} ${ringLength}`}
                className="stroke-indigo-500 dark:stroke-indigo-400"
              />
            </svg>
          </div>
        </Tile>

        <Tile href={`/achievements/${best.id}`} tint="amber">
          <Backdrop glow="bg-amber-300/30 dark:bg-amber-400/15" />
          <Icon
            name="trophy"
            className="absolute bottom-3 right-3 -z-10 h-20 w-20 text-amber-500/15 dark:text-amber-300/10"
          />
          <TileLabel icon="trophy">Best rank</TileLabel>
          <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
            {best.rank}
            <span className="text-2xl">{suffix(best.rank)}</span>
            {best.totalTeams && (
              <span className="ml-2 text-lg font-normal text-gray-400">/ {best.totalTeams}</span>
            )}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{best.title}</p>
        </Tile>

        <Tile>
          <TileLabel icon="users">Teams represented</TileLabel>
          <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
            {teamCount}
          </p>
          <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
            across {achievements.length} contests
          </p>
        </Tile>
      </section>

      {featuredAchievements.length > 0 && (
        <section>
          <SectionHeading label="Highlights" title="Featured achievements" />
          <ResultList items={featuredAchievements} />
        </section>
      )}

      {otherAchievements.length > 0 && (
        <section>
          <SectionHeading label="More" title="All achievements" />
          <ResultList items={otherAchievements} />
        </section>
      )}
    </PageShell>
  );
}
