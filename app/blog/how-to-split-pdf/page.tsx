import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Split a PDF into Multiple Files Free | PDFEdit24x7 Blog',
  description: 'Learn how to split a PDF into separate files or extract specific pages for free. Divide large PDFs online in seconds, no signup needed.',
  alternates: { canonical: 'https://pdfedit24x7.com/blog/how-to-split-pdf' },
}

export default function Article() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-slate-600">Blog</Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">Split PDF</span>
          </nav>

          <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
            How to Split a PDF into Multiple Files
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Got one big PDF but only need a few pages? Or want to break a large document into separate files? Here's how to split a PDF in seconds — for free, with no software.
          </p>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 text-center">
            <Link href="/split-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Split PDF Free
            </Link>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-display font-700 text-2xl text-slate-900">Why Split a PDF?</h2>
            <p>Sometimes you only need one chapter from a long report, a single invoice from a batch, or you want to share just a few pages instead of the whole document. Splitting a PDF lets you break a large file into smaller, more manageable pieces — so you send exactly what's needed and nothing more.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Split a PDF</h2>
            <p>Open the Split PDF tool, upload your file, and choose how you want to split it — by page range, or into individual pages. Click split, and download your separate files in seconds. Your original file is deleted automatically within 1 hour.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Extracting Just a Few Pages</h2>
            <p>If you only need specific pages, the Extract Pages tool is perfect — pick the exact pages you want and pull them into a new PDF. And if you want to delete unwanted pages instead, the Remove Pages tool does the opposite.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is It Safe?</h2>
            <p>Yes. PDFEdit24x7 uses SSL encryption and deletes your files automatically within 1 hour. Nothing is stored or shared, and it works on any device with no app to install.</p>
          </div>

          <div className="mt-12 bg-brand-600 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-4">Ready to split your PDF?</h3>
            <Link href="/split-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              Split PDF Now - Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}