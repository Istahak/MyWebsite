import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { achievements } from "@/data/achievements";

export const metadata: Metadata = {
  title: "Achievements - Istahak Islam",
  description:
    "Explore Istahak Islam's competitive programming achievements, contest performances, and awards from various national and international competitions.",
};

export default function AchievementsPage() {
  const featuredAchievements = achievements.filter((a) => a.featured);
  const otherAchievements = achievements.filter((a) => !a.featured);

  // Get all unique categories (for future filtering functionality)
  // const categories = Array.from(new Set(achievements.map((a) => a.category)));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Achievements & Awards
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A collection of my competitive programming achievements, contest
            performances, and recognitions from various national and
            international competitions.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {achievements.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Total Achievements
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {featuredAchievements.length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Featured Contests
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {achievements.filter((a) => a.rank <= 10).length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Top 10 Finishes
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {
                new Set(achievements.map((a) => a.teamName).filter(Boolean))
                  .size
              }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Teams Represented
            </div>
          </div>
        </div>

        {/* Featured Achievements */}
        {featuredAchievements.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Featured Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </section>
        )}

        {/* Other Achievements */}
        {otherAchievements.length > 0 && (
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              All Achievements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherAchievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function AchievementCard({
  achievement,
}: {
  achievement: (typeof achievements)[0];
}) {
  return (
    <Link href={`/achievements/${achievement.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
        {/* Achievement Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
          <Image
            src={achievement.image}
            alt={achievement.title}
            fill
            className="object-cover"
          />
          {/* Rank Badge */}
          <div className="absolute top-4 right-4 bg-white dark:bg-gray-900 px-3 py-1 rounded-full shadow-lg">
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              Rank #{achievement.rank}
            </span>
          </div>
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              {achievement.category}
            </span>
          </div>
        </div>

        {/* Achievement Info */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
            {achievement.title}
          </h3>

          {/* Team Name */}
          {achievement.teamName && (
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="font-medium">{achievement.teamName}</span>
            </div>
          )}

          {/* Date and Location */}
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>
              {new Date(achievement.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
            {achievement.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {achievement.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* View Details Button */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
            <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
              View Details →
            </span>
            {achievement.officialLink && (
              <span className="text-xs text-gray-500 dark:text-gray-500">
                Official Results
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
