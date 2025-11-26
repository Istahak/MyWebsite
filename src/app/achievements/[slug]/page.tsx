import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { achievements } from "@/data/achievements";

interface AchievementDetailsProps {
  overview?: string;
  challenges?: string[];
  highlights?: string[];
  teamMembers?: string[];
  problemsAttempted?: number;
  problemsSolved?: number;
  contestDuration?: string;
  reflection?: string;
  [key: string]: unknown;
}

export async function generateStaticParams() {
  return achievements.map((achievement) => ({
    slug: achievement.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const achievement = achievements.find((a) => a.id === slug);

  if (!achievement) {
    return {
      title: "Achievement Not Found",
    };
  }

  return {
    title: `${achievement.title} - Istahak Islam`,
    description: achievement.description,
  };
}

export default async function AchievementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const achievement = achievements.find((a) => a.id === slug);

  if (!achievement) {
    notFound();
  }

  // Dynamically import achievement details if available
  let achievementDetails: AchievementDetailsProps | null = null;
  try {
    if (achievement.detailsFile) {
      const detailsModule = await import(
        `@/data/achievement-details/${achievement.detailsFile}`
      );
      achievementDetails = detailsModule.default || detailsModule;
    }
  } catch {
    console.log(
      `Details file not found for achievement: ${achievement.detailsFile}`
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-8">
          {/* Achievement Image */}
          <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-500 to-purple-600">
            <Image
              src={achievement.image}
              alt={achievement.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                  {achievement.category}
                </span>
                {achievement.teamName && (
                  <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                    Team: {achievement.teamName}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {achievement.title}
              </h1>
              <div className="flex items-center gap-4 text-sm">
                <span>{achievement.organizer}</span>
                <span>•</span>
                <span>
                  {new Date(achievement.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                #{achievement.rank}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Rank
              </div>
            </div>
            {achievement.problemsSolved && (
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {achievement.problemsSolved}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Problems Solved
                </div>
              </div>
            )}
            {achievement.location && (
              <div className="text-center col-span-2">
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {achievement.location}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Location
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              About This Achievement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {achievement.description}
            </p>
          </section>

          {/* Additional Details */}
          {achievementDetails && (
            <>
              {achievementDetails.overview && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Overview
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {achievementDetails.overview}
                  </p>
                </section>
              )}

              {achievementDetails.highlights &&
                achievementDetails.highlights.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Highlights
                    </h2>
                    <ul className="space-y-3">
                      {achievementDetails.highlights.map(
                        (highlight: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                          >
                            <svg
                              className="w-6 h-6 text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                              {highlight}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </section>
                )}

              {achievementDetails.challenges &&
                achievementDetails.challenges.length > 0 && (
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Challenges Faced
                    </h2>
                    <ul className="space-y-3">
                      {achievementDetails.challenges.map(
                        (challenge: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-start p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"
                          >
                            <svg
                              className="w-6 h-6 text-orange-600 dark:text-orange-400 mr-3 flex-shrink-0 mt-0.5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-gray-700 dark:text-gray-300">
                              {challenge}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </section>
                )}

              {achievementDetails.reflection && (
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Reflection
                  </h2>
                  <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-l-4 border-purple-600">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                      {achievementDetails.reflection}
                    </p>
                  </div>
                </section>
              )}
            </>
          )}

          {/* Tags */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {achievement.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Official Link */}
          {achievement.officialLink && (
            <section>
              <a
                href={achievement.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                View Official Results
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </section>
          )}
        </div>

        {/* Back to Achievements Link */}
        <div className="mt-8">
          <Link
            href="/achievements"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back to All Achievements
          </Link>
        </div>
      </article>
    </div>
  );
}
