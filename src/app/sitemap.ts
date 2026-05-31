import { MetadataRoute } from 'next'
import { getPosts } from '@/lib/blog'

export const dynamic = 'force-static'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sebastianweszler.com'
  const lastModified = new Date()

  const routes = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/projects', priority: 0.8 },
    { path: '/blog', priority: 0.7 },
    { path: '/contact', priority: 0.6 },
    { path: '/resume', priority: 0.6 },
  ]

  const locales = ['en', 'pl']
  const posts = await getPosts()

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: route.priority,
      })
    }
    for (const post of posts) {
      entries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }
  }

  return entries
}
