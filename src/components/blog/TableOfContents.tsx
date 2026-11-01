"use client";

import { useEffect, useState } from "react";
import type { Heading } from "@/lib/blog";

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      // A heading counts as current once it reaches the top fifth of the screen.
      { rootMargin: "0px 0px -80% 0px" }
    );
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [headings]);

  return (
    <ul className="space-y-2 text-sm">
      {headings.map(({ id, text, level }) => (
        <li key={id} className={level === 3 ? "pl-4" : undefined}>
          <a
            href={`#${id}`}
            className={`block leading-snug transition-colors ${
              activeId === id
                ? "font-medium text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            }`}
          >
            {text}
          </a>
        </li>
      ))}
    </ul>
  );
}
