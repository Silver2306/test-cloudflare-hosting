import Link from "next/link";
import { posts } from "./posts";

export const metadata = { title: "Blog" };

export default function Blog() {
  return (
    <>
      <h1 className="text-3xl font-bold">Blog</h1>
      <ul className="mt-6 space-y-3">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className="text-blue-600 hover:underline dark:text-blue-400">
              {p.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
