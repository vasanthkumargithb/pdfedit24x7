import { MetadataRoute } from 'next'
import { tools } from '@/lib/tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://pdfedit24x7.com'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/about`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`,       lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${baseUrl}/privacy`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms`,         lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/cookies`,       lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ]

  const blogPosts: MetadataRoute.Sitemap = [
    'how-to-merge-pdf-files-free',
    'compress-pdf-without-losing-quality',
    'convert-pdf-to-word-free',
    'scan-document-with-phone-camscanner-alternative',
    'add-page-numbers-to-pdf',
    'protect-pdf-with-password',
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const toolPages: MetadataRoute.Sitemap = tools.map(tool => ({
    url: `${baseUrl}/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...blogPosts, ...toolPages]
}

