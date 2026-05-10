import Link from "next/link";
import { getPosts } from "@/lib/blog";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

export default async function BlogContent({ dictionary, locale }: { dictionary?: Dict; locale?: string }) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const posts = await getPosts();
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t("blog.title")}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t("blog.description")}
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post.slug}
              href={`${prefix}/blog/${post.slug}`}
              className="group flex flex-col gap-2 p-6 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <time className="text-sm text-zinc-500">{post.date}</time>
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {post.description}
              </p>
              <div className="flex items-center gap-2 mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                {t("blog.readMore")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-zinc-500 italic">{t("blog.noPosts")}</p>
        )}
      </div>
    </div>
  );
}
