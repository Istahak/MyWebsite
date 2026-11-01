import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Istahak Islam";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #312e81 100%)",
          color: "white",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#93c5fd" }}>
          {post?.tags.slice(0, 3).join("  ·  ")}
        </div>
        <div style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.15 }}>
          {post?.title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#cbd5e1" }}>
          <span>Istahak Islam</span>
          <span>{post ? `${post.readingMinutes} min read` : ""}</span>
        </div>
      </div>
    ),
    size
  );
}
