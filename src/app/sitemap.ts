import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
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

  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: locale === 'en'
          ? `${baseUrl}${route.path}`
          : `${baseUrl}/${locale}${route.path}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: route.priority,
      })
    }
  }

  return entries
}
