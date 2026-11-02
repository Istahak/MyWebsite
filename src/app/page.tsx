import type { Metadata } from "next";
import IntroGrid from "@/components/home/IntroGrid";
import RecentResults from "@/components/home/RecentResults";
import SkillsGrid from "@/components/home/SkillsGrid";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import LatestWriting from "@/components/home/LatestWriting";
import JsonLd from "@/components/JsonLd";
import { personalInfo } from "@/data/personal";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.name,
  alternateName: "Istahak Islam",
  url: siteUrl,
  jobTitle: personalInfo.title,
  worksFor: { "@type": "Organization", name: "Enosis Solutions BD" },
  alumniOf: { "@type": "CollegeOrUniversity", name: personalInfo.university },
  sameAs: [
    personalInfo.github,
    personalInfo.linkedin,
    personalInfo.codeforces,
    personalInfo.leetcode,
    "https://www.codechef.com/users/istahak_27",
    "https://atcoder.jp/users/istahak_0",
  ],
};

export default function Home() {
  return (
    <div className="font-sans">
      <JsonLd data={person} />
      <div className="mx-auto max-w-6xl space-y-20 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <IntroGrid />
        <RecentResults />
        <SkillsGrid />
        <ProjectsGrid />
        <LatestWriting />
      </div>
    </div>
  );
}
