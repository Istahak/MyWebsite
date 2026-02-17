import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Istahak Islam",
  description:
    "Explore Istahak Islam's portfolio of web development projects, competitive programming tools, and educational applications.",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
