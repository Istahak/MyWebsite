"use client";

import { useRef, useState, type ComponentProps } from "react";

export default function CodeBlock(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    // rehype-pretty-code renders an empty line as a single space; copy it back as empty.
    await navigator.clipboard.writeText((preRef.current?.innerText ?? "").replace(/^ $/gm, ""));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group relative">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        onClick={copy}
        aria-label="Copy code"
        className="absolute right-2 top-2 rounded-md border border-gray-300 bg-white/80 px-2 py-1 text-xs font-medium text-gray-600 opacity-0 transition-opacity focus-visible:opacity-100 group-hover:opacity-100 dark:border-gray-600 dark:bg-gray-800/80 dark:text-gray-300"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
