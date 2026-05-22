import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Merge PDF Files for Free Online | PDFEdit24x7 Blog',
  description: 'Learn how to merge multiple PDF files into one document in seconds — no software, no signup, completely free. Step-by-step guide.',
  keywords: ['merge pdf', 'combine pdf files', 'join pdf online free', 'merge pdf without software'],
  alternates: { canonical: 'https://pdfedit24x7.com/blog/how-to-merge-pdf-files-free' },
  openGraph: {
    title: 'How to Merge PDF Files for Free Online',
    description: 'Combine multiple PDFs into one in seconds — no software, no signup required.',
    url: 'https://pdfedit24x7.com/blog/how-to-merge-pdf-files-free',
  },
}

export default function Article() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav className="text-sm text-slate-400 mb-8">
            <Link href="/" className="hover:text-slate-600">Home</Link>
            <span className="mx-2">→</span>
            <Link href="/blog" className="hover:text-slate-600">Blog</Link>
            <span className="mx-2">→</span>
            <span className="text-slate-600">Merge PDF</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">Guide</span>
              <span className="text-xs text-slate-400">May 1, 2026</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">3 min read</span>
            </div>
            <h1 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
              How to Merge PDF Files for Free Online
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Need to combine multiple PDFs into one? Whether it's reports, invoices, or scanned documents — merging PDFs is one of the most common tasks people need. Here's how to do it in seconds, completely free.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-6 mb-10 text-center">
            <p className="text-sm font-semibold text-violet-700 mb-3">Ready to merge your PDFs right now?</p>
            <Link
              href="/merge-pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm"
            >
              Merge PDF Free →
            </Link>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

            <h2 className="font-display font-700 text-2xl text-slate-900">Why Merge PDFs?</h2>
            <p>
              Merging PDF files is useful in many situations. You might have a multi-page report split across several files, or you need to combine scanned documents into a single file to email someone. Instead of sending 10 separate attachments, you can merge them into one clean PDF.
            </p>
            <p>
              In the past, you needed expensive software like Adobe Acrobat to merge PDFs. Today, you can do it completely free in your browser — no installation needed.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Merge PDFs with PDFEdit24x7</h2>
            <p>Follow these simple steps to combine your PDF files:</p>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Go to the Merge PDF tool', desc: 'Visit PDFEdit24x7\'s Merge PDF page. No account or signup needed.' },
                { step: '2', title: 'Upload your PDF files', desc: 'Click "Choose Files" or drag and drop your PDFs into the upload area. You can upload up to 20 files at once.' },
                { step: '3', title: 'Arrange the order', desc: 'Drag and drop the files to reorder them exactly how you want them in the final document.' },
                { step: '4', title: 'Click Merge PDF', desc: 'Hit the merge button and your combined PDF will be ready in seconds.' },
                { step: '5', title: 'Download your file', desc: 'Click Download to save your merged PDF. The file is automatically deleted from our servers within 1 hour.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">Tips for Merging PDFs</h2>
            <p>Here are a few tips to get the best results:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong>Check the order first</strong> — Make sure your files are in the right sequence before merging. It's easier to reorder before merging than after.</li>
              <li><strong>File size limits</strong> — PDFEdit24x7 supports files up to 100MB each. If your files are larger, try compressing them first.</li>
              <li><strong>Multiple formats</strong> — Only PDF files can be merged. If you have Word or image files, convert them to PDF first.</li>
              <li><strong>Secure files</strong> — If your PDFs are password protected, you'll need to remove the password before merging.</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is It Safe to Merge PDFs Online?</h2>
            <p>
              Yes. PDFEdit24x7 processes your files securely using SSL encryption. Your files are never read, shared, or stored permanently. They are automatically deleted within 1 hour of processing. We never see the contents of your documents.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Does It Work on Mobile?</h2>
            <p>
              Yes! PDFEdit24x7 works on any device — iPhone, Android, Windows, Mac, or tablet. No app download needed. Just open your browser, go to PDFEdit24x7, and merge your files.
            </p>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-slate-900 mb-2">Ready to merge your PDFs?</h3>
            <p className="text-slate-500 text-sm mb-5">Free, instant, no signup required.</p>
            <Link
              href="/merge-pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-sm"
            >
              Merge PDF Now — Free →
            </Link>
          </div>

          {/* Related articles */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Related Articles</h3>
            <div className="space-y-3">
              <Link href="/blog/compress-pdf-without-losing-quality" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-sm font-semibold text-slate-700">How to Compress a PDF Without Losing Quality</div>
                <div className="text-xs text-slate-400 mt-1">4 min read</div>
              </Link>
              <Link href="/blog/convert-pdf-to-word-free" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-sm font-semibold text-slate-700">Convert PDF to Word — The Easy Way</div>
                <div className="text-xs text-slate-400 mt-1">3 min read</div>
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

