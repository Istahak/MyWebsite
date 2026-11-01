import type { Metadata } from "next";
import {
  Backdrop,
  Chip,
  PageHeader,
  PageShell,
  SectionHeading,
  Tile,
  TileLabel,
} from "@/components/ui/Tile";
import { SkillChip } from "@/components/ui/SkillChip";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "About - Istahak Islam",
  description:
    "Learn more about Istahak Islam's background, completed CSE education, software engineering role at Enosis Solutions BD, and competitive programming journey.",
};

const currentStack = [
  "C# & ASP.NET Core",
  "ASP.NET Web Forms & MVC",
  "AngularJS & jQuery",
  "SQL Server (T-SQL)",
];

const coursework = [
  "Data Structures",
  "Algorithms",
  "Web Development",
  "Database Systems",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering",
  "Machine Learning",
];

const platforms = [
  {
    name: "Codeforces",
    rank: "Expert",
    meta: "Max 1938, Candidate Master",
    href: "https://codeforces.com/profile/Istahak16",
  },
  {
    name: "CodeChef",
    rank: "5 Star",
    meta: "Max 2020",
    href: "https://www.codechef.com/users/istahak_27",
  },
  {
    name: "AtCoder",
    rank: "Cyan",
    meta: "Max 1571",
    href: "https://atcoder.jp/users/istahak_0",
  },
];

const achievements = [
  "2000+ problems solved across all platforms",
  "Participated in 15+ contests",
  "Candidate Master peak on Codeforces",
  "5 Star rating on CodeChef",
  "5th, ICPC Dhaka Regional Preliminary 2025",
  "5th, IUT 12th ICT Fest IUPC 2026",
  "Top 10 in Different IUPC contests",
  "Active participant in university contests",
  "Growing competitive programming profile",
];

const enosisHighlights = [
  "Fixed production bugs in Reports, eSign, and Clinical Notes across UI, backend, and SQL Server stored procedures",
  "Built an AI-assisted bug-solving pipeline with Claude Code skills and subagents",
  "Use an AI-first workflow with MCP integrations for Jira and Azure DevOps",
  "Work across legacy ASP.NET Web Forms and ASP.NET Core, and write T-SQL in a HIPAA-compliant environment",
];

const otherExperience = [
  {
    title: "Competitive Programming Mentor",
    org: "University Programming Club",
    period: "2023 - Present",
    body: "Mentoring junior students in competitive programming, conducting workshops on algorithms and problem-solving techniques.",
    className: "",
  },
  {
    title: "Technical Writer",
    org: "Personal Blog",
    period: "2022 - Present",
    body: "Writing technical articles about competitive programming, algorithms, and software development.",
    className: "",
  },
  {
    title: "Problem Setter",
    org: "Programming Contests",
    period: "2023 - Present",
    body: "Setting problems for competitive programming contests, designing algorithmic challenges and preparing test cases for university and inter-university programming competitions.",
    className: "lg:col-span-2",
  },
  {
    title: "Math Olympiad Participant",
    org: "Junior Math Camp Training",
    period: "2018 - 2020",
    body: "Trained in junior math camp, participated in Math Olympiad competitions, developed strong foundation in mathematical problem-solving and logical reasoning.",
    className: "",
  },
];

const interests = [
  "Algorithmic Problem Solving",
  "Open Source Contributions",
  "Technical Writing & Blogging",
  "Learning New Technologies",
  "Mentoring Junior Developers",
  "Reading Tech Blogs & Research Papers",
];

const contactDetails = [
  { label: "Email", value: "istahakislam@gmail.com", href: "mailto:istahakislam@gmail.com" },
  { label: "Location", value: "Dhaka, Bangladesh" },
  { label: "Status", value: "Software Engineer at Enosis Solutions BD" },
  { label: "Languages", value: "Bengali, English" },
];

const bodyText = "leading-relaxed text-gray-600 dark:text-gray-300";
const tileTitle = "font-semibold tracking-tight text-gray-900 dark:text-white";
const metaText = "font-mono text-xs text-gray-500 dark:text-gray-400";
const bulletList =
  "list-disc space-y-2 pl-5 leading-relaxed text-gray-600 marker:text-gray-400 dark:text-gray-300 dark:marker:text-gray-500";

export default function AboutPage() {
  return (
    <PageShell>
      <PageHeader label="About" title="About Me" icon="users">
        Software Engineer at Enosis Solutions BD, competitive programmer, and
        CSE graduate of the University of Dhaka.
      </PageHeader>

      <section>
        <SectionHeading label="Background" title="My Journey" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tile className="lg:col-span-2 lg:p-8">
            <Backdrop pattern="dots" glow="bg-indigo-400/25 dark:bg-indigo-500/20" />
            <TileLabel icon="sparkles">Journey</TileLabel>
            <p className={`mt-4 ${bodyText}`}>
              I&apos;m Istahak Islam, a Computer Science and Engineering
              graduate from the University of Dhaka, one of the most
              prestigious institutions in Bangladesh. I am currently working as
              a Software Engineer at Enosis Solutions BD, where I am working
              with modern web and backend technologies in a professional
              environment.
            </p>
            <p className={`mt-4 ${bodyText}`}>
              What started as curiosity about how computers work has evolved
              into a deep love for competitive programming, algorithm design,
              Machine Learning and software development. Over the years,
              I&apos;ve dedicated countless hours to solving complex problems,
              participating in programming contests, and building meaningful
              projects.
            </p>
          </Tile>

          <Tile>
            <TileLabel icon="cap">Education</TileLabel>
            <h3 className={`mt-4 text-lg ${tileTitle}`}>
              Bachelor of Science in Computer Science and Engineering
            </h3>
            <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              University of Dhaka
            </p>
            <p className={`mt-1 ${metaText}`}>Completed February 2026</p>
            <p className={`mt-1 ${metaText}`}>CGPA: 3.80/4.00</p>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Relevant Coursework
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {coursework.map((course) => (
                <Chip key={course}>{course}</Chip>
              ))}
            </div>
          </Tile>
        </div>
      </section>

      <section>
        <SectionHeading label="Now" title="Current Role & Research" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tile className="lg:col-span-2">
            <TileLabel icon="briefcase">Current Role</TileLabel>
            <h3 className={`mt-4 text-xl ${tileTitle}`}>Software Engineer</h3>
            <p className="mt-1 font-medium text-indigo-600 dark:text-indigo-400">
              Enosis Solutions BD
            </p>
            <p className={`mt-1 ${metaText}`}>March 2026 - Present · Hybrid</p>
            <p className={`mt-4 ${bodyText}`}>
              Building and maintaining a dental practice management SaaS
              platform for a US healthcare client, across UI, backend, and SQL
              Server.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {currentStack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </Tile>

          <Tile tint="amber">
            <Backdrop glow="bg-amber-300/30 dark:bg-amber-400/15" />
            <TileLabel icon="flask">Research</TileLabel>
            <h3 className={`mt-4 text-xl ${tileTitle}`}>
              Spatial-Temporal Granger Causality in Event Sequences
            </h3>
            <p className="mt-1 font-medium text-amber-700 dark:text-amber-400">
              Undergraduate Researcher, University of Dhaka
            </p>
            <p className={`mt-1 ${metaText}`}>Ongoing</p>
            <p className={`mt-4 text-sm ${bodyText}`}>
              Extending the Hawkes process to capture spatial and temporal
              Granger causality in event sequences, using MLE-SGLP and
              event-region encoding. Validated on epidemic, crime, and social
              network data.
            </p>
          </Tile>
        </div>
      </section>

      <section>
        <SectionHeading label="Contests" title="Competitive Programming Journey" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tile className="lg:col-span-2">
            <TileLabel icon="code">Overview</TileLabel>
            <p className={`mt-4 ${bodyText}`}>
              Competitive programming has been more than just a hobby for me.
              It&apos;s been a journey of continuous learning and
              self-improvement. Over the years, I&apos;ve solved 2000+ problems
              across various platforms and have participated in 15+ contests.
            </p>
          </Tile>

          <Tile tint="fuchsia" className="lg:row-span-2">
            <Backdrop pattern="grid" glow="bg-fuchsia-400/20 dark:bg-fuchsia-500/15" />
            <TileLabel icon="trophy">Achievements</TileLabel>
            <ul className={`mt-4 ${bulletList}`}>
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Tile>

          <Tile className="lg:col-span-2">
            <TileLabel icon="chart">Platforms</TileLabel>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {platforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-gray-50 p-4 hover:bg-gray-100 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <p className={metaText}>{platform.name}</p>
                  <p className={`mt-2 text-2xl ${tileTitle}`}>{platform.rank}</p>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                    {platform.meta}
                  </p>
                </a>
              ))}
            </div>
          </Tile>
        </div>
      </section>

      <section>
        <SectionHeading label="Timeline" title="Experience" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tile className="lg:col-span-2 lg:row-span-2">
            <TileLabel icon="briefcase">Experience</TileLabel>
            <h3 className={`mt-4 text-xl ${tileTitle}`}>Software Engineer</h3>
            <p className="mt-1 font-medium text-indigo-600 dark:text-indigo-400">
              Enosis Solutions BD
            </p>
            <p className={`mt-1 ${metaText}`}>March 2026 - Present</p>
            <p className={`mt-4 ${bodyText}`}>
              Dental practice management SaaS for a US healthcare client.
            </p>
            <ul className={`mt-3 ${bulletList}`}>
              {enosisHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Tile>

          {otherExperience.map((entry) => (
            <Tile key={entry.title} className={entry.className}>
              <h3 className={`text-lg ${tileTitle}`}>{entry.title}</h3>
              <p className="mt-1 font-medium text-indigo-600 dark:text-indigo-400">
                {entry.org}
              </p>
              <p className={`mt-1 ${metaText}`}>{entry.period}</p>
              <p className={`mt-3 text-sm ${bodyText}`}>{entry.body}</p>
            </Tile>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading label="Toolbox" title="Skills & Interests" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, index) => (
            <Tile
              key={group.title}
              className={index === skillGroups.length - 1 ? "sm:col-span-2 lg:col-span-3" : ""}
            >
              <TileLabel icon={group.icon}>{group.title}</TileLabel>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillChip key={skill.name} skill={skill} />
                ))}
              </div>
            </Tile>
          ))}

          <Tile className="sm:col-span-2 lg:col-span-3">
            <TileLabel icon="star">Interests & Hobbies</TileLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {interests.map((item) => (
                <Chip key={item}>{item}</Chip>
              ))}
            </div>
          </Tile>
        </div>
      </section>

      <section>
        <SectionHeading label="Next" title="Goals & Vision" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Tile className="lg:col-span-2">
            <TileLabel icon="target">Goals & Vision</TileLabel>
            <p className={`mt-4 ${bodyText}`}>
              Having completed my degree in February 2026, I&apos;m now growing
              as a software engineer at Enosis Solutions BD. My goal is to keep
              applying my problem-solving skills and passion for technology to
              build meaningful products that make a positive impact.
              I&apos;m particularly drawn to the intersection of algorithms,
              machine learning, and software engineering.
            </p>
            <p className={`mt-4 ${bodyText}`}>
              I&apos;m particularly interested in roles that involve
              algorithmic challenges, system design, full-stack development,
              and machine learning engineering. I also have a growing interest
              in ML research, especially in areas that leverage my strong
              mathematical foundation from competitive programming and Math
              Olympiad background. Additionally, I want to continue
              contributing to the competitive programming community through
              mentoring and sharing knowledge via blogs and tutorials, while
              continuously improving my competitive programming profile.
            </p>
          </Tile>

          <Tile>
            <TileLabel icon="mail">Contact</TileLabel>
            <h3 className={`mt-4 text-xl ${tileTitle}`}>Let&apos;s Connect</h3>
            <p className={`mt-2 text-sm ${bodyText}`}>
              I&apos;m always excited to connect with fellow developers,
              competitive programmers, ML researchers, and anyone interested in
              technology. Feel free to reach out!
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              {contactDetails.map((detail) => (
                <div key={detail.label}>
                  <dt className={metaText}>{detail.label}</dt>
                  <dd className="mt-0.5 break-words text-gray-700 dark:text-gray-300">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Tile>
        </div>
      </section>
    </PageShell>
  );
}
