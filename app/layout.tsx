import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloudflare Hosting Test",
  description: "A tiny Next.js site for learning Cloudflare hosting",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10">{children}</main>
        <footer className="border-t border-zinc-200 py-4 text-center text-sm text-zinc-500 dark:border-zinc-800">
          Hosted on Cloudflare
        </footer>
      </body>
    </html>
  );
}
