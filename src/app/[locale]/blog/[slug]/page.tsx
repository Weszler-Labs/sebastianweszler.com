import { getPosts } from "@/lib/blog";
import BlogPostContent from "@/components/pages/BlogPostContent";
import { getDictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n-config";

export async function generateStaticParams() {
  const posts = await getPosts();
  const locales = ["en", "pl"];
  const params = [];

  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: post.slug });
    }
  }

  return params;
}

export default async function LocaleBlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const dict = await getDictionary(locale as Locale);

  return <BlogPostContent dictionary={dict} locale={locale} slug={slug} />;
}
