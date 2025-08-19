const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-white dark:bg-gray-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Passionate about solving complex problems and building innovative
            solutions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Hello, I'm Istahak Islam!
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I'm a final-year Computer Science and Engineering student at the
                University of Dhaka, with a deep passion for competitive
                programming and software development. Throughout my academic
                journey, I've solved over 2000+ programming problems across
                various platforms like Codeforces, AtCoder, CodeChef, and
                LeetCode, and participated in numerous programming contests.
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                I have a keen interest in Machine Learning and Cognitive Models,
                exploring how algorithms can learn from data to make intelligent
                decisions. My goal is to leverage technology to create impactful
                solutions that enhance user experiences and solve real-world
                problems.
              </p>
            </div>
            <div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                My expertise spans across algorithms, data structures, ML
                engineering, web development, and software engineering. I enjoy
                tackling challenging problems and finding efficient solutions.
                When I'm not coding, I love sharing my knowledge through
                technical blogs about competitive programming techniques and
                problem-solving strategies.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                What I'm Currently Up To:
              </h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completing my final semester at University of Dhaka
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Actively participating in competitive programming contests
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Exploring research opportunities in Machine Learning
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Looking for software engineering opportunities
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Writing technical blogs about programming
                </li>
              </ul>
            </div>
          </div>

          {/* Image/Stats Side */}
          <div className="space-y-8">
            {/* Education */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Education
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    Bachelor of Science in Computer Science and Engineering
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    University of Dhaka
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2021 - 2025 (Expected)
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Current CGPA: 3.82/4.00
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Achievements
              </h4>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  🏆 Solved 2000+ competitive programming problems
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  🥇 Participated in 15+ offline programming contests
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  📝 Active technical blogger
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  💻 Built 6+ software projects
                </p>
              </div>
            </div>

            {/* Competitive Programming Stats */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                CP Platforms
              </h4>
              <div className="space-y-3">
                <a
                  href="https://codeforces.com/profile/_0Istahak"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    Codeforces
                  </span>
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Expert • (Max Rating 1764)
                  </span>
                </a>
                <a
                  href="https://www.codechef.com/users/istahak_27"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    CodeChef
                  </span>
                  <span className="text-orange-600 dark:text-orange-400 font-medium">
                    5⭐ • (Max Rating 2020)
                  </span>
                </a>
                <a
                  href="https://atcoder.jp/users/istahak_0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer group"
                >
                  <span className="text-cyan-700 dark:text-cyan-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    AtCoder
                  </span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-medium">
                    Cyan • (Max Rating 1464)
                  </span>
                </a>
                <a
                  href="https://leetcode.com/u/Istahak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-between items-center p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors duration-200 cursor-pointer group"
                >
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-yellow-600 dark:group-hover:text-yellow-400">
                    LeetCode
                  </span>
                  <span className="text-yellow-600 dark:text-yellow-400 font-medium">
                    NaN • (Max Rating 0000)
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
