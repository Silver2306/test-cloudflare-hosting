export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <h1 className="text-3xl font-bold">About</h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        This project exists to learn how to host a website on Cloudflare. It is
        built with Next.js and exported as static files.
      </p>
    </>
  );
}
