import Link from "next/link";
import type { Dict } from "@/lib/i18n-shared";
import { getT } from "@/lib/i18n-shared";

export default async function BlogPostContent({
  dictionary,
  locale,
  slug,
}: {
  dictionary?: Dict;
  locale?: string;
  slug: string;
}) {
  const t = dictionary ? getT(dictionary) : (s: string) => s;
  const prefix = locale && locale !== "en" ? `/${locale}` : "";

  const { default: Post } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      <Link
        href={`${prefix}/blog`}
        className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors flex items-center gap-2 text-sm font-medium"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {t("blog.backToBlog")}
      </Link>

      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <Post />
      </article>

      <div className="mt-12 pt-8 border-t border-zinc-100 dark:border-zinc-800">
        <p className="text-zinc-500 text-sm">
          {t("blog.thanksForReading")}
        </p>
      </div>
    </div>
  );
}
