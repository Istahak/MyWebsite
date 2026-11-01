import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { remarkAlert } from "remark-github-blockquote-alert";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { toString } from "hast-util-to-string";
import type { Root, RootContent } from "hast";
import CodeBlock from "@/components/blog/CodeBlock";

const POSTS_DIR = path.join(process.cwd(), "content/blog");
const WORDS_PER_MINUTE = 220;

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  body: string;
}

export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export const getAllPosts = cache((): Post[] => {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => ({
      slug: file.replace(/\.md$/, ""),
      ...matter(fs.readFileSync(path.join(POSTS_DIR, file), "utf8")),
    }))
    .filter(({ data }) => data.published !== false)
    .map(({ slug, data, content }) => ({
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      tags: data.tags ?? [],
      readingMinutes: Math.max(
        1,
        Math.round(content.split(/\s+/).length / WORDS_PER_MINUTE)
      ),
      body: content,
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
});

export function getPost(slug: string) {
  return getAllPosts().find((post) => post.slug === slug);
}

// Runs after rehype-slug and before the autolink "#" is appended, so ids and
// text match what the reader sees.
function collectHeadings(headings: Heading[]) {
  return () => (tree: Root) => {
    const walk = (node: Root | RootContent) => {
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        headings.push({
          id: String(node.properties.id),
          text: toString(node),
          level: node.tagName === "h2" ? 2 : 3,
        });
        return;
      }
      if ("children" in node) node.children.forEach(walk);
    };
    walk(tree);
  };
}

export async function renderPost(body: string) {
  const headings: Heading[] = [];
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkAlert)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeSlug)
    .use(collectHeadings(headings))
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { className: ["heading-anchor"], ariaLabel: "Link to this section" },
      content: { type: "text", value: "#" },
    })
    .use(rehypePrettyCode, {
      theme: { light: "github-light", dark: "github-dark" },
      keepBackground: false,
      defaultLang: { block: "plaintext" },
    });

  const tree = (await processor.run(processor.parse(body))) as Root;
  const content = toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    components: { pre: CodeBlock },
  });

  return { content, headings };
}
