import { codeforcesRatings } from "@/data/codeforcesRating";

const WIDTH = 100;
const HEIGHT = 40;
const CANDIDATE_MASTER = 1900;

const RatingSparkline = () => {
  const min = Math.min(...codeforcesRatings);
  const max = Math.max(...codeforcesRatings);
  const x = (i: number) => (i / (codeforcesRatings.length - 1)) * WIDTH;
  // Keep 2 units of headroom so the peak stroke is not clipped.
  const y = (rating: number) => HEIGHT - 2 - ((rating - min) / (max - min)) * (HEIGHT - 4);

  const line = codeforcesRatings.map((rating, i) => `${x(i)},${y(rating)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`Codeforces rating history over ${codeforcesRatings.length} contests, from ${codeforcesRatings[0]} to a peak of ${max}`}
      className="mt-4 h-14 w-full text-[#a0a] dark:text-[#e27ee2]"
    >
      <defs>
        <linearGradient id="cf-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity={0.25} />
          <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <line
        x1={0}
        x2={WIDTH}
        y1={y(CANDIDATE_MASTER)}
        y2={y(CANDIDATE_MASTER)}
        stroke="currentColor"
        strokeOpacity={0.4}
        strokeDasharray="2 2"
        vectorEffect="non-scaling-stroke"
      />
      <polygon points={`0,${HEIGHT} ${line} ${WIDTH},${HEIGHT}`} fill="url(#cf-area)" />
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

export default RatingSparkline;
