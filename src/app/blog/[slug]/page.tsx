import SiteShell from "@/components/SiteShell";
import BlogPostPage from '../../[locale]/blog/[slug]/page';
import { getDictionary } from "@/lib/i18n";

export default async function BlogPostPageWrapper({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dict = await getDictionary("en");
  return (
    <SiteShell dictionary={dict}>
      <BlogPostPage params={Promise.resolve({ locale: 'en', slug })} />
    </SiteShell>
  );
}

import { getPosts } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(post => ({ slug: post.slug }));
}
