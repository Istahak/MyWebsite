const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: [
        { name: "C++", level: 95, color: "bg-blue-500" },
        { name: "Python", level: 90, color: "bg-green-500" },
        { name: "JavaScript", level: 85, color: "bg-yellow-500" },
        { name: "Java", level: 80, color: "bg-red-500" },
        { name: "TypeScript", level: 85, color: "bg-blue-600" },
      ],
    },
    {
      title: "Web Development",
      skills: [
        { name: "React.js", level: 90, color: "bg-cyan-500" },
        { name: "Next.js", level: 85, color: "bg-gray-900" },
        { name: "Node.js", level: 80, color: "bg-green-600" },
        { name: "Express.js", level: 75, color: "bg-gray-600" },
        { name: "HTML/CSS", level: 90, color: "bg-orange-500" },
      ],
    },
    {
      title: "Algorithms & Data Structures",
      skills: [
        { name: "Dynamic Programming", level: 90, color: "bg-purple-500" },
        { name: "Graph Algorithms", level: 85, color: "bg-indigo-500" },
        { name: "Tree Algorithms", level: 88, color: "bg-green-500" },
        { name: "String Algorithms", level: 80, color: "bg-pink-500" },
        { name: "Number Theory", level: 75, color: "bg-red-500" },
      ],
    },
    {
      title: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90, color: "bg-orange-600" },
        { name: "Docker", level: 70, color: "bg-blue-400" },
        { name: "MongoDB", level: 80, color: "bg-green-700" },
        { name: "PostgreSQL", level: 75, color: "bg-blue-700" },
        { name: "AWS", level: 65, color: "bg-orange-400" },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and competitive
            programming expertise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
                        style={{
                          width: `${skill.level}%`,
                          animationDelay: `${
                            categoryIndex * 200 + skillIndex * 100
                          }ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Competitive Programming Achievements */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Competitive Programming Journey
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                2000+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Problems Solved
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Across all platforms
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                15+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Onsite Contests
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Participated
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                Expert
              </div>
              <div className="text-gray-600 dark:text-gray-300">Codeforces</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Highest Rating (1764)
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                3
              </div>
              <div className="text-gray-600 dark:text-gray-300">Years</div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Experience
              </div>
            </div>
          </div>
        </div>

        {/* Certifications or Learning */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Always exploring new technologies and improving my skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Data Structures & Algorithms
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Advanced problem-solving techniques
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Full Stack Development
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Modern web application development
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                System Design
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Scalable architecture patterns
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600 dark:text-orange-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Machine Learning
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                AI algorithms and cognitive models
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
