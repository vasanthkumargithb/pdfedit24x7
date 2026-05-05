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

  return {
    title: `${tool.title} Online – Free, Fast, No Signup`,
    description: tool.longDescription,
    keywords: tool.keywords,
    alternates: { canonical: `https://pdfpro.app/${tool.slug}` },
    openGraph: {
      title: `${tool.title} Online | PDFPro`,
      description: tool.longDescription,
      url: `https://pdfpro.app/${tool.slug}`,
    },
  }
}

export default function ToolPage({ params }: Props) {
  const tool = getToolBySlug(params.tool)
  if (!tool) notFound()

  const otherTools = tools.filter(t => t.slug !== tool.slug).slice(0, 4)

  return (
    <>
      <Navbar />
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
                <p className="text-slate-500 text-lg">
                  {tool.longDescription}
                </p>
              </div>
            </div>

            {/* Upload Box — all tools now active */}
            <div className="bg-white rounded-3xl shadow-card border border-surface-100 p-6 sm:p-8">
              <FileUpload tool={tool} />
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">About This Tool</h2>
            <div className="grid gap-4">
              {toolFAQ(tool.slug).map(({ q, a }) => (
                <div key={q} className="bg-white p-5 rounded-xl border">
                  <h3 className="font-semibold">{q}</h3>
                  <p className="text-sm text-gray-500">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* More Tools */}
        <section className="py-12">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-lg font-semibold mb-5">More PDF Tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {otherTools.map(t => (
                <Link key={t.slug} href={`/${t.slug}`} className="p-4 border rounded-xl text-center hover:shadow">
                  <div className={`w-9 h-9 mx-auto mb-2 rounded-lg ${t.color} flex items-center justify-center`}>
                    <ToolIcon name={t.icon} color={t.iconColor} size={16} />
                  </div>
                  <span className="text-xs font-semibold">{t.shortTitle}</span>
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

function toolFAQ(slug: string) {
  return [
    { q: 'Is this tool free?', a: 'Yes, completely free.' },
    { q: 'How long are files stored?', a: 'Files are deleted within 1 hour.' },
    { q: 'Is it safe?', a: 'Yes, secure processing with encryption.' },
  ]
}