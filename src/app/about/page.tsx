import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Istahak Islam",
  description:
    "Learn more about Istahak Islam's background, education, and journey in Computer Science and competitive programming at University of Dhaka.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Computer Science & Engineering Student at University of Dhaka |
            Competitive Programmer | Software Engineer | ML Engineer
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              My Journey
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              I'm Istahak Islam, currently in my final year studying Computer
              Science and Engineering at the University of Dhaka, one of the
              most prestigious institutions in Bangladesh. My academic journey
              has been filled with challenges, learning experiences, and a
              growing passion for technology and problem-solving.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              What started as curiosity about how computers work has evolved
              into a deep love for competitive programming, algorithm design,
              Machine Learning and software development. Over the past 2 years,
              I've dedicated countless hours to solving complex problems,
              participating in programming contests, and building meaningful
              projects.
            </p>
          </div>

          {/* Education */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Education
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bachelor of Science in Computer Science and Engineering
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium">
                  University of Dhaka
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  2021 - 2025 (Expected)
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  CGPA: 3.80/4.00
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Relevant Coursework: Data Structures & Algorithms, Database
                  Systems, Software Engineering, Computer Networks, Operating
                  Systems, Artificial Intelligence, Machine Learning, Web
                  Technologies
                </p>
              </div>
            </div>
          </div>

          {/* Competitive Programming */}
          <div className="bg-green-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Competitive Programming Journey
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Competitive programming has been more than just a hobby for
              me—it's been a journey of continuous learning and
              self-improvement. Over the past 2 years, I've solved 2000+
              problems across various platforms and have participated in 15+
              contests.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Platforms
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Codeforces - Expert Level</li>
                  <li>• CodeChef - 5 Star</li>
                  <li>• AtCoder - Cyan</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Achievements
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• 2000+ problems solved across all platforms</li>
                  <li>• Participated in 15+ contests</li>
                  <li>• Expert rating on Codeforces</li>
                  <li>• 5 Star rating on CodeChef</li>
                  <li>• Top 10 in Different IUPC contests</li>
                  <li>• Active participant in university contests</li>
                  <li>• Growing competitive programming profile</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="bg-teal-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Competitive Programming Mentor
                </h3>
                <p className="text-teal-600 dark:text-teal-400 font-medium">
                  University Programming Club
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  2023 - Present
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Mentoring junior students in competitive programming,
                  conducting workshops on algorithms and problem-solving
                  techniques.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Technical Writer
                </h3>
                <p className="text-teal-600 dark:text-teal-400 font-medium">
                  Personal Blog
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  2022 - Present
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Writing technical articles about competitive programming,
                  algorithms, and software development.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Problem Setter
                </h3>
                <p className="text-teal-600 dark:text-teal-400 font-medium">
                  Programming Contests
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  2023 - Present
                </p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Setting problems for competitive programming contests,
                  designing algorithmic challenges and preparing test cases for
                  university and inter-university programming competitions.
                </p>
              </div>
              <div className="border-l-4 border-teal-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Math Olympiad Participant
                </h3>
                <p className="text-teal-600 dark:text-teal-400 font-medium">
                  Junior Math Camp Training
                </p>
                <p className="text-gray-600 dark:text-gray-300">2018 - 2020</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  Trained in junior math camp, participated in Math Olympiad
                  competitions, developed strong foundation in mathematical
                  problem-solving and logical reasoning.
                </p>
              </div>
            </div>
          </div>

          {/* Skills & Interests */}
          <div className="bg-purple-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Skills & Interests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Skills
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Programming Languages
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      C++, Python, JavaScript, Java, TypeScript
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Web Technologies
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      React, Next.js, Node.js, Express, MongoDB
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      Tools & Technologies
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Git, Docker, AWS, PostgreSQL, Linux
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Interests & Hobbies
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Algorithmic Problem Solving</li>
                  <li>• Open Source Contributions</li>
                  <li>• Technical Writing & Blogging</li>
                  <li>• Learning New Technologies</li>
                  <li>• Mentoring Junior Developers</li>
                  <li>• Reading Tech Blogs & Research Papers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Goals & Vision */}
          <div className="bg-orange-50 dark:bg-gray-800 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Goals & Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              As I approach graduation in 2025, I'm excited about the
              opportunities that lie ahead. My goal is to work as a software
              engineer or ML engineer where I can apply my problem-solving
              skills and passion for technology to build meaningful products
              that make a positive impact. I'm particularly drawn to the
              intersection of algorithms, machine learning, and software
              engineering.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I'm particularly interested in roles that involve algorithmic
              challenges, system design, full-stack development, and machine
              learning engineering. I also have a growing interest in ML
              research, especially in areas that leverage my strong mathematical
              foundation from competitive programming and Math Olympiad
              background. Additionally, I want to continue contributing to the
              competitive programming community through mentoring and sharing
              knowledge via blogs and tutorials, while continuously improving my
              competitive programming profile.
            </p>
          </div>

          {/* Contact & Connect */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Let's Connect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              I'm always excited to connect with fellow developers, competitive
              programmers, ML researchers, and anyone interested in technology.
              Feel free to reach out!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Email:{" "}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    sistahak900@gmail.com
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Location:{" "}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Dhaka, Bangladesh
                  </span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Status:{" "}
                  </span>
                  <span className="text-green-600 dark:text-green-400">
                    Looking for ML Engineer or Software Engineering
                    Opportunities
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    Languages:{" "}
                  </span>
                  <span className="text-gray-700 dark:text-gray-300">
                    Bengali, English
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
