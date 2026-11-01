import { getAllPosts } from "@/lib/blog";
import { Backdrop, SectionHeading, Tile } from "@/components/ui/Tile";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const LatestWriting = () => {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section>
      <SectionHeading
        label="Writing"
        title="Latest posts"
        href="/blog"
        linkText="All posts"
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {posts.map((post, index) => (
          <Tile
            key={post.slug}
            href={`/blog/${post.slug}`}
            tint={index === 0 ? "sky" : "indigo"}
            className={index === 0 ? "lg:col-span-2" : ""}
          >
            {index === 0 && (
              <Backdrop pattern="dots" glow="bg-sky-400/20 dark:bg-sky-500/15" />
            )}
            <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
              {formatDate(post.date)} · {post.readingMinutes} min read
            </p>
            <h3
              className={`mt-3 font-semibold tracking-tight text-gray-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400 ${
                index === 0 ? "text-2xl" : "text-lg"
              }`}
            >
              {post.title}
            </h3>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              {post.excerpt}
            </p>
            <p className="mt-auto pt-4 font-mono text-xs text-indigo-600 dark:text-indigo-400">
              {post.tags.slice(0, 3).map((tag) => `#${tag}`).join("  ")}
            </p>
          </Tile>
        ))}
      </div>
    </section>
  );
};

export default LatestWriting;
