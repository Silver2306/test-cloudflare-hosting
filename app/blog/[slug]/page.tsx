import { notFound } from "next/navigation";
import { posts } from "../posts";

// Pre-render every post at build time (required for static export).
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <>
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">{post.body}</p>
    </>
  );
}
