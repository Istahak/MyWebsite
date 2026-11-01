import IntroGrid from "@/components/home/IntroGrid";
import RecentResults from "@/components/home/RecentResults";
import SkillsGrid from "@/components/home/SkillsGrid";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import LatestWriting from "@/components/home/LatestWriting";

export default function Home() {
  return (
    <div className="font-sans">
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
