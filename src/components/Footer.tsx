import Image from "next/image";
import Link from "next/link";
import { navItems } from "@/data/navigation";
import { Icon } from "@/components/ui/Icon";
import { Backdrop, Tile, TileLabel } from "@/components/ui/Tile";

// `invert` marks black logos that need flipping on dark backgrounds.
const profiles = [
  { name: "GitHub", href: "https://github.com/Istahak", logo: "/icons/tech/github.svg", invert: true },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/md-istahak-islam/",
    logo: "/icons/tech/linkedin.svg",
  },
  {
    name: "Codeforces",
    href: "https://codeforces.com/profile/Istahak16",
    logo: "/icons/Codeforces.colored.svg",
  },
  {
    name: "CodeChef",
    href: "https://www.codechef.com/users/istahak_27",
    logo: "/icons/tech/codechef.svg",
    invert: true,
  },
  {
    name: "AtCoder",
    href: "https://atcoder.jp/users/istahak_0",
    logo: "/icons/tech/atcoder.png",
    invert: true,
  },
];

const linkClass =
  "text-sm text-gray-600 transition-colors hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 font-sans dark:border-white/10 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Tile className="sm:col-span-2 lg:p-8">
            <Backdrop pattern="dots" glow="bg-indigo-400/25 dark:bg-indigo-500/20" />
            <TileLabel icon="mail">Get in touch</TileLabel>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Have a problem worth solving?
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              A project, a contest, or a question about something I wrote. My inbox is open.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="mailto:istahakislam@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                <Icon name="mail" className="h-4 w-4" />
                istahakislam@gmail.com
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-800 transition-colors hover:bg-gray-100 dark:border-white/20 dark:text-gray-100 dark:hover:bg-white/10"
              >
                Contact page
              </Link>
            </div>
          </Tile>

          <Tile>
            <TileLabel icon="layers">Explore</TileLabel>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={linkClass}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile>
            <TileLabel icon="globe">Elsewhere</TileLabel>
            <ul className="mt-4 space-y-2.5">
              {profiles.map((profile) => (
                <li key={profile.name}>
                  <a
                    href={profile.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group inline-flex items-center gap-2.5 ${linkClass}`}
                  >
                    <Image
                      src={profile.logo}
                      alt=""
                      width={18}
                      height={18}
                      className={profile.invert ? "dark:invert" : ""}
                    />
                    {profile.name}
                    <span className="text-gray-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>
        </div>

        <div className="mt-8 flex flex-col gap-3 font-mono text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Istahak Islam · Dhaka, Bangladesh
          </p>
          <div className="flex items-center gap-4">
            <p>Built with Next.js &amp; Tailwind CSS</p>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Back to top ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
