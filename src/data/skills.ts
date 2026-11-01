import type { IconName } from "@/components/ui/Icon";

// `logo` is a file in public/icons/tech; skills with no brand logo use a line `icon`.
export interface Skill {
  name: string;
  logo?: string;
  icon?: IconName;
}

export const skillGroups: { title: string; icon: IconName; skills: Skill[] }[] = [
  {
    title: "Languages",
    icon: "code",
    skills: [
      { name: "C#", logo: "csharp" },
      { name: "C++", logo: "cplusplus" },
      { name: "C", logo: "c" },
      { name: "Python", logo: "python" },
      { name: "Java", logo: "java" },
      { name: "JavaScript", logo: "javascript" },
      { name: "TypeScript", logo: "typescript" },
      { name: "T-SQL", logo: "microsoftsqlserver" },
    ],
  },
  {
    title: "Frameworks",
    icon: "layers",
    skills: [
      { name: "ASP.NET Core", logo: "dotnetcore" },
      { name: "ASP.NET MVC", logo: "dot-net" },
      { name: "ASP.NET Web Forms", logo: "dot-net" },
      { name: "AngularJS", logo: "angularjs" },
      { name: "React.js", logo: "react" },
      { name: "Node.js", logo: "nodejs" },
      { name: "Spring Boot", logo: "spring" },
      { name: "FastAPI", logo: "fastapi" },
    ],
  },
  {
    title: "Web",
    icon: "globe",
    skills: [
      { name: "HTML5", logo: "html5" },
      { name: "CSS3", logo: "css3" },
      { name: "jQuery", logo: "jquery" },
      { name: "Bootstrap", logo: "bootstrap" },
      { name: "Razor", logo: "dot-net" },
      { name: "AJAX", icon: "code" },
      { name: "REST APIs", icon: "globe" },
    ],
  },
  {
    title: "Tools",
    icon: "wrench",
    skills: [
      { name: "Git", logo: "git" },
      { name: "Azure DevOps", logo: "azuredevops" },
      { name: "Jira", logo: "jira" },
      { name: "Visual Studio", logo: "visualstudio" },
      { name: "VS Code", logo: "vscode" },
      { name: "SSMS", logo: "microsoftsqlserver" },
      { name: "Firebase", logo: "firebase" },
      { name: "Linux", logo: "linux" },
    ],
  },
  {
    title: "Databases",
    icon: "database",
    skills: [
      { name: "SQL Server", logo: "microsoftsqlserver" },
      { name: "MySQL", logo: "mysql" },
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "SQLite", logo: "sqlite" },
    ],
  },
  {
    title: "Foundations",
    icon: "cpu",
    skills: [
      { name: "Data structures", icon: "layers" },
      { name: "Algorithms", icon: "chart" },
      { name: "Machine learning", icon: "cpu" },
      { name: "TensorFlow", logo: "tensorflow" },
    ],
  },
  {
    title: "AI-first development",
    icon: "sparkles",
    skills: [
      { name: "Claude Code", logo: "claude" },
      { name: "Agentic workflows", icon: "sparkles" },
      { name: "Skills and subagents", icon: "layers" },
      { name: "MCP", icon: "cpu" },
      { name: "Prompt engineering", icon: "code" },
    ],
  },
];
