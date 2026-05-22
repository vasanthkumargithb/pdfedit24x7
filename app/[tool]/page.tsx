import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { tools, getToolBySlug } from '@/lib/tools'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FileUpload from '@/components/FileUpload'
import { ToolIcon } from '@/components/Navbar'
import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'

interface Props {
  params: { tool: string }
}

export async function generateStaticParams() {
  return tools.map(t => ({ tool: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getToolBySlug(params.tool)
  if (!tool) return {}

  const description = `${tool.longDescription} 100% free, no signup required, no watermarks. Works on any device — Windows, Mac, iPhone, Android.`

  return {
    title: `${tool.title} Online – Free, Fast, No Signup`,
    description,
    keywords: [
      ...tool.keywords,
      'free online',
      'no signup',
      'no watermark',
      'pdf tool',
      'PDFEdit24x7',
    ],
    alternates: { canonical: `https://pdfedit24x7.com/${tool.slug}` },
    openGraph: {
      title: `${tool.title} Online — Free | PDFEdit24x7`,
      description,
      url: `https://pdfedit24x7.com/${tool.slug}`,
      siteName: 'PDFEdit24x7',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${tool.title} Online — Free | PDFEdit24x7`,
      description,
    },
  }
}

// Tool-specific FAQs for SEO rich results
function getToolFAQ(slug: string): { q: string; a: string }[] {
  const common = [
    { q: 'Is this tool completely free?', a: 'Yes, PDFEdit24x7 is 100% free. No signup, no subscription, no hidden fees.' },
    { q: 'How long are my files stored?', a: 'Your files are automatically and permanently deleted from our servers within 1 hour of processing.' },
    { q: 'Is it safe to upload my files?', a: 'Yes. All file transfers are SSL encrypted. We never read, share, or store your file contents.' },
  ]

  const specific: Record<string, { q: string; a: string }[]> = {
    'merge-pdf': [
      { q: 'How many PDFs can I merge at once?', a: 'You can merge up to 20 PDF files at once with PDFEdit24x7.' },
      { q: 'Can I rearrange pages before merging?', a: 'Yes, you can drag and drop files to reorder them before merging.' },
      ...common,
    ],
    'split-pdf': [
      { q: 'Can I split specific pages from a PDF?', a: 'Yes, you can extract any range of pages or split into individual pages.' },
      { q: 'Will the quality be affected when splitting?', a: 'No, splitting does not affect the quality of your PDF.' },
      ...common,
    ],
    'compress-pdf': [
      { q: 'How much will my PDF be compressed?', a: 'Compression varies by file, but most PDFs are reduced by 30-70% while maintaining readability.' },
      { q: 'Will compression affect image quality?', a: 'We use smart compression that balances file size and visual quality.' },
      ...common,
    ],
    'pdf-to-word': [
      { q: 'Will the formatting be preserved?', a: 'Yes, PDFEdit24x7 preserves fonts, layouts, and formatting when converting to Word.' },
      { q: 'What Word format does it convert to?', a: 'Files are converted to .docx format, compatible with Microsoft Word 2007 and later.' },
      ...common,
    ],
    'word-to-pdf': [
      { q: 'What Word file types are supported?', a: 'Both .doc and .docx formats are supported.' },
      { q: 'Will my Word formatting be kept in the PDF?', a: 'Yes, all formatting, images, and layouts are preserved in the output PDF.' },
      ...common,
    ],
    'pdf-to-jpg': [
      { q: 'What resolution are the output images?', a: 'You can choose from 72 DPI to 300 DPI depending on your needs.' },
      { q: 'Can I convert all pages at once?', a: 'Yes, all pages are converted and available for individual download.' },
      ...common,
    ],
    'image-to-pdf': [
      { q: 'What image formats are supported?', a: 'JPG, PNG, WebP, and TIFF images are supported.' },
      { q: 'Can I combine multiple images into one PDF?', a: 'Yes, upload multiple images and they will be combined into a single PDF.' },
      ...common,
    ],
    'protect-pdf': [
      { q: 'What type of encryption is used?', a: 'PDFEdit24x7 uses 128-bit AES encryption to protect your PDF.' },
      { q: 'Can I remove the password later?', a: 'Yes, you can use a PDF unlock tool with the correct password to remove protection.' },
      ...common,
    ],
  }

  return specific[slug] || common
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.tool)
  if (!tool) notFound()

  const otherTools = tools.filter(t => t.slug !== tool.slug).slice(0, 4)
  const faqs = getToolFAQ(tool.slug)

  // FAQ Schema for Google rich results
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }

  return (
    <>
      <Navbar />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-surface-50">

        {/* Hero Section */}
        <section className="relative bg-white pt-28 pb-16 lg:pt-32 lg:pb-20 overflow-hidden">
          <div className={`absolute inset-0 pointer-events-none ${tool.color} opacity-20`} />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-surface-50/60 to-transparent rounded-b-full" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-slate-600 flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> Home
              </Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-slate-700 font-medium">{tool.title}</span>
            </nav>

            {/* Header */}
            <div className="flex items-start gap-4 mb-8">
              <div className={`w-14 h-14 rounded-2xl ${tool.color} flex items-center justify-center border border-white shadow-card`}>
                <ToolIcon name={tool.icon} color={tool.iconColor} size={24} />
              </div>
              <div>
                <h1 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 mb-2">
                  {tool.title} Online
                </h1>
                <p className="text-slate-500 text-lg">{tool.longDescription}</p>
              </div>
            </div>

            {/* Upload Box */}
            <div className="bg-white rounded-3xl shadow-card border border-surface-100 p-6 sm:p-8">
              <FileUpload tool={tool} />
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display font-700 text-2xl text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="grid gap-4">
              {faqs.map(({ q, a }) => (
                <div key={q} className="bg-white p-5 rounded-xl border border-surface-100 shadow-sm">
                  <h3 className="font-semibold text-slate-800 mb-1">{q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Tools */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="font-display font-600 text-lg text-slate-800 mb-5">More PDF Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherTools.map(t => (
                <Link key={t.slug} href={`/${t.slug}`}
                  className="p-4 bg-white border border-surface-100 rounded-xl text-center hover:shadow-md hover:border-brand-200 transition-all">
                  <div className={`w-9 h-9 mx-auto mb-2 rounded-lg ${t.color} flex items-center justify-center`}>
                    <ToolIcon name={t.icon} color={t.iconColor} size={16} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">{t.shortTitle}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}


