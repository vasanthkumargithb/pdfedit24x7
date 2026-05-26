import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | PDFEdit24x7 — PDF Tips, Guides & Tools',
  description: 'Learn how to work with PDFs faster. Free guides, tips, and tutorials from the PDFEdit24x7 team.',
}

const posts = [
  { slug: 'convert-pdf-to-excel-free', title: 'How to Convert PDF to Excel Free Online', date: 'May 25, 2026', readTime: '4 min read', category: 'Guide', excerpt: 'Got a PDF full of tables you need to edit? Learn how to convert any PDF into an editable Excel spreadsheet in seconds, completely free.', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { slug: 'reduce-pdf-file-size-for-email', title: 'How to Reduce PDF File Size for Email', date: 'May 25, 2026', readTime: '4 min read', category: 'Tips', excerpt: 'Email too big to send? Learn how to shrink your PDF in seconds so it fits email limits, without losing quality.', color: 'bg-violet-50', iconColor: 'text-violet-600' },
  { slug: 'convert-pdf-to-jpg-high-quality', title: 'Convert PDF to JPG Without Losing Quality', date: 'May 25, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Need each page of your PDF as a sharp image? Here is how to turn your PDF into high-quality JPG images for free.', color: 'bg-orange-50', iconColor: 'text-orange-600' },
  { slug: 'convert-word-to-pdf-free', title: 'How to Convert Word to PDF Free', date: 'May 25, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Lock in your formatting so it looks the same everywhere. Here is how to convert Word to PDF free in seconds.', color: 'bg-sky-50', iconColor: 'text-sky-600' },
  { slug: 'best-free-camscanner-alternatives', title: 'Best Free CamScanner Alternatives in 2026', date: 'May 25, 2026', readTime: '4 min read', category: 'Tips', excerpt: 'Tired of watermarks and ads? Here is how to scan documents for free in 2026 without installing any app.', color: 'bg-blue-50', iconColor: 'text-blue-600' },
  { slug: 'how-to-add-watermark-to-pdf', title: 'How to Add a Watermark to a PDF', date: 'May 25, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Mark a document as Confidential or add your brand to every page. Here is how to add a watermark to your PDF free.', color: 'bg-rose-50', iconColor: 'text-rose-600' },
  { slug: 'how-to-split-pdf', title: 'How to Split a PDF into Multiple Files', date: 'May 25, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Got one big PDF but only need a few pages? Here is how to split a PDF in seconds, for free.', color: 'bg-teal-50', iconColor: 'text-teal-600' },
  { slug: 'how-to-rotate-pdf-pages', title: 'How to Rotate PDF Pages Permanently', date: 'May 25, 2026', readTime: '3 min read', category: 'Tips', excerpt: 'Pages sideways or upside down? Here is how to rotate your PDF and save the change for good, free.', color: 'bg-amber-50', iconColor: 'text-amber-600' },
  { slug: 'how-to-merge-pdf-files-free', title: 'How to Merge PDF Files for Free Online', date: 'May 1, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Need to combine multiple PDFs into one? Learn how to merge PDF files in seconds, no software, no signup.', color: 'bg-violet-50', iconColor: 'text-violet-600' },
  { slug: 'compress-pdf-without-losing-quality', title: 'How to Compress a PDF Without Losing Quality', date: 'April 20, 2026', readTime: '4 min read', category: 'Tips', excerpt: 'Large PDF files are a pain to share. Here is how to reduce your PDF file size while keeping text and images sharp.', color: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  { slug: 'convert-pdf-to-word-free', title: 'Convert PDF to Word — The Easy Way', date: 'April 10, 2026', readTime: '3 min read', category: 'Guide', excerpt: 'Need to edit a PDF? Converting it to Word is the easiest way. Here is how to do it free, without losing formatting.', color: 'bg-sky-50', iconColor: 'text-sky-600' },
  { slug: 'scan-document-with-phone-camscanner-alternative', title: 'How to Scan Documents with Your Phone', date: 'March 28, 2026', readTime: '5 min read', category: 'Tips', excerpt: 'Scan documents right from your browser, no app download needed. A free CamScanner alternative.', color: 'bg-blue-50', iconColor: 'text-blue-600' },
  { slug: 'add-page-numbers-to-pdf', title: 'How to Add Page Numbers to a PDF Online', date: 'March 15, 2026', readTime: '2 min read', category: 'Guide', excerpt: 'Adding page numbers used to need expensive software. Now you can do it free in your browser in under a minute.', color: 'bg-teal-50', iconColor: 'text-teal-600' },
  { slug: 'protect-pdf-with-password', title: 'How to Protect a PDF with a Password', date: 'March 5, 2026', readTime: '3 min read', category: 'Security', excerpt: 'Keep your sensitive documents safe. Learn how to add password protection to any PDF file for free.', color: 'bg-rose-50', iconColor: 'text-rose-600' },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-surface-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display font-800 text-4xl sm:text-5xl text-slate-900 mb-4">PDF Tips & Guides</h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">Free tutorials and tips to help you work with PDFs faster and smarter.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl p-6 border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-semibold ${post.iconColor} ${post.color} px-3 py-1 rounded-full`}>{post.category}</span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <h2 className="font-display font-700 text-xl text-slate-900 mb-2 group-hover:text-brand-600 transition-colors">{post.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed">{post.excerpt}</p>
                <div className="mt-4 text-sm font-semibold text-brand-600">Read more →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}