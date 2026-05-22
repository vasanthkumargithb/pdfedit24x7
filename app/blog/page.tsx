import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Blog | PDFEdit24x7 — PDF Tips, Guides & Tools',
  description: 'Learn how to work with PDFs faster. Free guides, tips, and tutorials from the PDFEdit24x7 team.',
}

const posts = [
  {
    slug: 'how-to-merge-pdf-files-free',
    title: 'How to Merge PDF Files for Free Online',
    date: 'May 1, 2026',
    readTime: '3 min read',
    category: 'Guide',
    excerpt: 'Need to combine multiple PDFs into one? Learn how to merge PDF files in seconds — no software, no signup, completely free.',
    color: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
  {
    slug: 'compress-pdf-without-losing-quality',
    title: 'How to Compress a PDF Without Losing Quality',
    date: 'April 20, 2026',
    readTime: '4 min read',
    category: 'Tips',
    excerpt: 'Large PDF files can be a pain to share by email. Here is how to reduce your PDF file size while keeping text and images sharp.',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    slug: 'convert-pdf-to-word-free',
    title: 'Convert PDF to Word — The Easy Way',
    date: 'April 10, 2026',
    readTime: '3 min read',
    category: 'Guide',
    excerpt: 'Need to edit a PDF? Converting it to a Word document is the easiest way. Here is how to do it free, without losing your formatting.',
    color: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    slug: 'scan-document-with-phone-camscanner-alternative',
    title: 'How to Scan Documents with Your Phone — Free CamScanner Alternative',
    date: 'March 28, 2026',
    readTime: '5 min read',
    category: 'Tips',
    excerpt: 'Did you know you can scan documents right from your browser? No app download needed. Our free Doc Scanner tool works just like CamScanner.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    slug: 'add-page-numbers-to-pdf',
    title: 'How to Add Page Numbers to a PDF Online',
    date: 'March 15, 2026',
    readTime: '2 min read',
    category: 'Guide',
    excerpt: 'Adding page numbers to a PDF used to require expensive software. Now you can do it free in your browser in under a minute.',
    color: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    slug: 'protect-pdf-with-password',
    title: 'How to Password Protect a PDF File',
    date: 'March 5, 2026',
    readTime: '3 min read',
    category: 'Security',
    excerpt: 'Sending sensitive documents? Learn how to add a password to your PDF so only the right people can open it.',
    color: 'bg-red-50',
    iconColor: 'text-red-600',
  },
]

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-12">
            <h1 className="font-display font-700 text-4xl text-slate-900 mb-3">PDFEdit24x7 Blog</h1>
            <p className="text-lg text-slate-500">Tips, guides, and tutorials for working with PDFs faster and smarter.</p>
          </div>

          {/* Featured post */}
          <div className="mb-10 p-8 bg-gradient-to-br from-violet-50 to-blue-50 rounded-2xl border border-violet-100">
            <span className="inline-block text-xs font-semibold text-violet-600 bg-violet-100 px-3 py-1 rounded-full mb-4">Featured</span>
            <h2 className="font-display font-700 text-2xl text-slate-900 mb-3">{posts[0].title}</h2>
            <p className="text-slate-600 leading-relaxed mb-5">{posts[0].excerpt}</p>
            <div className="flex items-center gap-4">
              <span className="text-xs text-slate-400">{posts[0].date}</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">{posts[0].readTime}</span>
              <Link
                href={`/blog/${posts[0].slug}`}
                className="ml-auto text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors"
              >
                Read article →
              </Link>
            </div>
          </div>

          {/* Post grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {posts.slice(1).map(post => (
              <div key={post.slug} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-200 transition-all">
                <div className="flex items-center gap-2 mb-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${post.color} ${post.iconColor}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-slate-400">{post.readTime}</span>
                </div>
                <h2 className="font-display font-600 text-lg text-slate-900 mb-2 leading-snug">{post.title}</h2>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{post.date}</span>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Read →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Coming soon note */}
          <div className="mt-12 text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
            <p className="text-slate-500 text-sm">More articles coming soon. Have a topic you want us to cover?</p>
            <a
              href="mailto:tejdeal.social@gmail.com"
              className="inline-block mt-3 text-sm font-semibold text-brand-600 hover:underline"
            >
              Let us know →
            </a>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}
