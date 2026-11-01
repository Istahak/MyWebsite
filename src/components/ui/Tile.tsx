import Link from "next/link";
import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";

// `isolate` lets a Backdrop sit at -z-10 above the tile background but below its content.
const tileBase =
  "relative isolate flex flex-col rounded-3xl border border-gray-200/80 bg-white bg-linear-to-br p-6 transition duration-200 dark:border-white/10 dark:bg-gray-950";
const tileHover =
  "hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-400/40";

// Each tint pairs a diagonal wash of the accent color with a matching drop shadow; both are brighter in dark mode, where gray shadows vanish.
const tints = {
  indigo:
    "from-white via-white to-indigo-50 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-indigo-500/[0.10] shadow-[0_1px_2px_rgb(15_23_42/0.05),0_14px_32px_-14px_rgb(79_70_229/0.35)] dark:shadow-[0_14px_36px_-14px_rgb(99_102_241/0.45)]",
  fuchsia:
    "from-white via-white to-fuchsia-50 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-fuchsia-500/[0.10] shadow-[0_1px_2px_rgb(15_23_42/0.05),0_14px_32px_-14px_rgb(170_0_170/0.32)] dark:shadow-[0_14px_36px_-14px_rgb(217_70_239/0.4)]",
  amber:
    "from-white via-white to-amber-50 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-amber-400/[0.09] shadow-[0_1px_2px_rgb(15_23_42/0.05),0_14px_32px_-14px_rgb(217_119_6/0.38)] dark:shadow-[0_14px_36px_-14px_rgb(251_191_36/0.3)]",
  sky:
    "from-white via-white to-sky-50 dark:from-white/[0.05] dark:via-white/[0.02] dark:to-sky-400/[0.09] shadow-[0_1px_2px_rgb(15_23_42/0.05),0_14px_32px_-14px_rgb(2_132_199/0.35)] dark:shadow-[0_14px_36px_-14px_rgb(56_189_248/0.35)]",
};

interface TileProps {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  tint?: keyof typeof tints;
}

export function Tile({ children, className = "", href, external, tint = "indigo" }: TileProps) {
  const classes = `${tileBase} ${tints[tint]} ${href ? `group ${tileHover}` : ""} ${className}`;

  if (!href) return <div className={classes}>{children}</div>;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}

export function TileLabel({ children, icon }: { children: ReactNode; icon?: IconName }) {
  return (
    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-gray-500 dark:text-gray-400">
      {icon && <Icon name={icon} className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />}
      {children}
    </p>
  );
}

const patterns = {
  dots: "bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:18px_18px] opacity-25 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]",
  grid: "bg-[linear-gradient(to_right,#6366f1_1px,transparent_1px),linear-gradient(to_bottom,#6366f1_1px,transparent_1px)] [background-size:32px_32px] opacity-15 [mask-image:linear-gradient(to_left,black,transparent_65%)]",
};

interface BackdropProps {
  pattern?: keyof typeof patterns;
  glow: string;
}

export function Backdrop({ pattern, glow }: BackdropProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl">
      {pattern && <div className={`absolute inset-0 ${patterns[pattern]}`} />}
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl ${glow}`} />
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm shadow-[0_1px_2px_rgb(15_23_42/0.06)] text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
      {children}
    </span>
  );
}

// Standard page container: matches the home page width, gutters and section rhythm.
export function PageShell({ children, width = "max-w-6xl" }: { children: ReactNode; width?: string }) {
  return (
    <div className={`mx-auto space-y-16 px-4 py-10 font-sans sm:px-6 lg:px-8 lg:py-14 ${width}`}>
      {children}
    </div>
  );
}

interface PageHeaderProps {
  label: string;
  title: string;
  icon?: IconName;
  children?: ReactNode;
}

export function PageHeader({ label, title, icon, children }: PageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <TileLabel icon={icon}>{label}</TileLabel>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
        {title}
      </h1>
      {children && (
        <p className="mt-4 text-lg leading-relaxed text-gray-600 dark:text-gray-300">{children}</p>
      )}
    </header>
  );
}

interface SectionHeadingProps {
  label: string;
  title: string;
  href?: string;
  linkText?: string;
}

export function SectionHeading({ label, title, href, linkText }: SectionHeadingProps) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <TileLabel>{label}</TileLabel>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
