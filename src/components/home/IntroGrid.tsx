import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import RatingSparkline from "@/components/home/RatingSparkline";
import { Backdrop, Chip, Tile, TileLabel } from "@/components/ui/Tile";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Istahak",
    path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-istahak-islam/",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
];

const buttonBase =
  "inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

const IntroGrid = () => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Tile className="sm:col-span-2 lg:row-span-2 lg:p-8">
        <Backdrop pattern="dots" glow="bg-indigo-400/25 dark:bg-indigo-500/20" />
        <TileLabel icon="pin">Dhaka, Bangladesh</TileLabel>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Istahak Islam
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-gray-600 dark:text-gray-300">
          Software engineer and competitive programmer. I build healthcare
          SaaS at Enosis Solutions BD and write about algorithms.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
          <Link
            href="/projects"
            className={`${buttonBase} bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200`}
          >
            View projects
          </Link>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonBase} border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/10`}
          >
            Resume
          </a>
          <Link
            href="/contact"
            className={`${buttonBase} border border-gray-300 text-gray-800 hover:bg-gray-100 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/10`}
          >
            Contact
          </Link>
          <div className="ml-1 flex items-center gap-1">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Tile>

      <Tile className="min-h-72 overflow-hidden p-0 lg:row-span-2">
        <Image
          src="/image/profile_pic.jpg"
          alt="Istahak Islam"
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </Tile>

      <Tile href="https://codeforces.com/profile/Istahak16" external tint="fuchsia">
        <div className="flex items-center justify-between">
          <TileLabel>Codeforces</TileLabel>
          <Image src="/icons/Codeforces.colored.svg" alt="" width={20} height={20} />
        </div>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-[#a0a] tabular-nums dark:text-[#e27ee2]">
          1938
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Max rating · Candidate Master
        </p>
        <RatingSparkline />
        <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
          now 1709 · Expert
        </p>
      </Tile>

      <Tile href="/achievements/icpc-dhaka-preliminary-2025" tint="amber">
        <Backdrop glow="bg-amber-300/30 dark:bg-amber-400/15" />
        <Icon
          name="trophy"
          className="absolute bottom-3 right-3 -z-10 h-20 w-20 text-amber-500/15 dark:text-amber-300/10"
        />
        <TileLabel icon="trophy">Best ICPC result</TileLabel>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
          5<span className="text-2xl">th</span>
          <span className="ml-2 text-lg font-normal text-gray-400">/ 1842</span>
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          ICPC Dhaka 2025 Preliminary
        </p>
        <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
          team DU_Odyssey
        </p>
      </Tile>

      <Tile className="sm:col-span-2">
        <TileLabel icon="briefcase">Currently</TileLabel>
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
          Software Engineer at Enosis Solutions BD
        </h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Since March 2026 · Dental practice management SaaS for a US
          healthcare client.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["C#", "ASP.NET Core", "Web Forms", "SQL Server", "AngularJS", "Claude Code"].map(
            (tech) => (
              <Chip key={tech}>{tech}</Chip>
            )
          )}
        </div>
      </Tile>

      <Tile className="sm:col-span-2">
        <TileLabel icon="flask">Research</TileLabel>
        <h2 className="mt-3 text-xl font-semibold text-gray-900 dark:text-white">
          Spatial-temporal Granger causality in event sequences
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Extending the Hawkes process with MLE-SGLP and event-region
          encoding. Validated on epidemic, crime, and social network data.
        </p>
        <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
          ongoing · University of Dhaka
        </p>
      </Tile>

      <Tile>
        <TileLabel icon="cap">Education</TileLabel>
        <p className="mt-3 font-semibold text-gray-900 dark:text-white">
          BSc in CSE, University of Dhaka
        </p>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
          Completed February 2026
        </p>
        <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
          CGPA 3.80 / 4.00
        </p>
      </Tile>

      <Tile>
        <TileLabel icon="target">Problems solved</TileLabel>
        <p className="mt-3 text-5xl font-semibold tracking-tight text-gray-900 tabular-nums dark:text-white">
          2000+
        </p>
        <p className="mt-auto pt-3 font-mono text-xs text-gray-500 dark:text-gray-400">
          across all judges
        </p>
      </Tile>

      <Tile className="sm:col-span-2">
        <TileLabel icon="chart">Other judges</TileLabel>
        <div className="mt-3 grid grid-cols-2 gap-4">
          <a
            href="https://www.codechef.com/users/istahak_27"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gray-50 p-4 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <p className="text-3xl font-semibold text-amber-700 tabular-nums dark:text-amber-400">
              2020
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              CodeChef · 5★ max
            </p>
          </a>
          <a
            href="https://atcoder.jp/users/istahak_0"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-gray-50 p-4 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <p className="text-3xl font-semibold text-cyan-700 tabular-nums dark:text-cyan-400">
              1571
            </p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              AtCoder · cyan max
            </p>
          </a>
        </div>
      </Tile>
    </section>
  );
};

export default IntroGrid;
