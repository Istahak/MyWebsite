import Link from "next/link";
import { achievements } from "@/data/achievements";
import { SectionHeading, Tile, TileLabel } from "@/components/ui/Tile";

function ordinal(n: number) {
  const tens = n % 100;
  if (tens >= 11 && tens <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10] ?? "th"}`;
}

const RING_RADIUS = 26;

const formatMonth =(date: string) =>
  new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });

// A track for the whole field, rank 1 at the left, with a dot where the team finished.
function FieldPosition({ rank, total }: { rank: number; total: number }) {
  const topPercent = Math.ceil((rank / total) * 100);
  return (
    <span
      title={`${ordinal(rank)} of ${total} teams`}
      className="hidden w-28 shrink-0 sm:block"
    >
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

const RecentResults = () => {
  const recent = [...achievements]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);
  const topTen = achievements.filter((a) => a.rank <= 10).length;
  const ringLength = 2 * Math.PI * RING_RADIUS;

  return (
    <section>
      <SectionHeading
        label="Contests"
        title="Recent results"
        href="/achievements"
        linkText="All achievements"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Tile className="p-2 lg:col-span-2 lg:row-span-2">
          <ul className="divide-y divide-gray-100 dark:divide-white/5">
            {recent.map((achievement) => (
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
                    <span className="line-clamp-2 font-medium text-gray-900 sm:line-clamp-1 dark:text-white">
                      {achievement.title}
                    </span>
                    <span className="block font-mono text-xs text-gray-500 dark:text-gray-400">
                      {achievement.teamName} · {formatMonth(achievement.date)}
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

        <Tile>
          <TileLabel icon="award">Top-10 finishes</TileLabel>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
              {topTen}
              <span className="ml-2 text-lg font-normal text-gray-400">/ {achievements.length}</span>
            </p>
            <svg viewBox="0 0 64 64" aria-hidden className="h-16 w-16 -rotate-90">
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
          <p className="mt-auto pt-3 text-sm text-gray-600 dark:text-gray-300">
            in national and inter-university contests
          </p>
        </Tile>

        <Tile>
          <TileLabel icon="users">Teams</TileLabel>
          <p className="mt-3 font-mono text-sm leading-7 text-gray-800 dark:text-gray-200">
            DU_Artemis
            <br />
            DU_Odyssey
            <br />
            DU_Oblivion
          </p>
          <p className="mt-auto pt-3 text-sm text-gray-600 dark:text-gray-300">
            {achievements.length} contests listed
          </p>
        </Tile>
      </div>
    </section>
  );
};

export default RecentResults;
