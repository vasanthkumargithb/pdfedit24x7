import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Add Page Numbers to a PDF Online — Free | PDFEdit24x7 Blog',
  description: 'Learn how to add page numbers to any PDF online for free. Choose position, font size, and starting number. No software needed.',
  keywords: ['add page numbers to pdf', 'pdf page numbers online free', 'number pdf pages', 'stamp page numbers pdf'],
  alternates: { canonical: 'https://pdfedit24x7.com/blog/add-page-numbers-to-pdf' },
  openGraph: {
    title: 'How to Add Page Numbers to a PDF Online — Free',
    description: 'Add page numbers to any PDF free online. No software needed.',
    url: 'https://pdfedit24x7.com/blog/add-page-numbers-to-pdf',
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
            <span className="text-slate-600">Page Numbers</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Guide</span>
              <span className="text-xs text-slate-400">March 15, 2026</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">2 min read</span>
            </div>
            <h1 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
              How to Add Page Numbers to a PDF Online
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Adding page numbers to a PDF used to require expensive software like Adobe Acrobat. Now you can do it free in your browser in under a minute — with full control over position, font size, and starting number.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-teal-50 border border-teal-100 rounded-2xl p-6 mb-10 text-center">
            <p className="text-sm font-semibold text-teal-700 mb-3">Add page numbers to your PDF right now — free.</p>
            <Link
              href="/page-numbers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
            >
              Add Page Numbers Free →
            </Link>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

            <h2 className="font-display font-700 text-2xl text-slate-900">Why Add Page Numbers to a PDF?</h2>
            <p>
              Page numbers make documents much easier to navigate and reference. Whether you're submitting a report, sharing a contract, or preparing a presentation — numbered pages look professional and help readers find specific sections quickly.
            </p>
            <p>
              Many official documents — legal contracts, academic papers, government forms — require page numbers as a standard formatting requirement.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Add Page Numbers with PDFEdit24x7</h2>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Go to the Page Numbers tool', desc: 'Visit PDFEdit24x7\'s Add Page Numbers page. No signup or account needed.' },
                { step: '2', title: 'Upload your PDF', desc: 'Click "Choose File" or drag and drop your PDF. Files up to 100MB are supported.' },
                { step: '3', title: 'Choose your settings', desc: 'Select position (top/bottom, left/center/right), starting page number, and font size.' },
                { step: '4', title: 'Click Add Page Numbers', desc: 'PDFEdit24x7 stamps page numbers on every page of your PDF instantly.' },
                { step: '5', title: 'Download your PDF', desc: 'Your numbered PDF is ready to download immediately.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">Page Number Position Options</h2>
            <p>PDFEdit24x7 gives you full control over where page numbers appear:</p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { pos: 'Top Left', desc: 'Common for academic papers' },
                { pos: 'Top Center', desc: 'Clean, centered look' },
                { pos: 'Top Right', desc: 'Standard for reports' },
                { pos: 'Bottom Left', desc: 'Subtle placement' },
                { pos: 'Bottom Center', desc: 'Most common position' },
                { pos: 'Bottom Right', desc: 'Professional documents' },
              ].map(({ pos, desc }) => (
                <div key={pos} className="p-3 bg-teal-50 border border-teal-100 rounded-xl">
                  <div className="text-sm font-semibold text-teal-700">{pos}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{desc}</div>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">Can I Start from a Specific Number?</h2>
            <p>
              Yes! PDFEdit24x7 lets you set any starting number. This is useful when your PDF is part of a larger document — for example, if it's chapter 3 of a report that starts at page 45, you can set the starting number to 45.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Tips for Professional Page Numbers</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong>Skip the cover page</strong> — If your PDF has a cover page, start numbering from page 2 by setting the starting number to 0 or using the offset option.</li>
              <li><strong>Font size</strong> — For A4 documents, font size 10-12 is standard. Larger sizes work well for presentations.</li>
              <li><strong>Bottom center</strong> — The most universally accepted position for page numbers in formal documents.</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">Does It Work on All PDFs?</h2>
            <p>
              Yes — PDFEdit24x7 adds page numbers to any PDF regardless of its content. Text documents, scanned PDFs, image PDFs, presentations — all are supported.
            </p>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-slate-900 mb-2">Ready to number your PDF?</h3>
            <p className="text-slate-500 text-sm mb-5">Free, instant, no signup required.</p>
            <Link
              href="/page-numbers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white font-semibold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
            >
              Add Page Numbers Now — Free →
            </Link>
          </div>

          {/* Related articles */}
          <div className="mt-12 pt-8 border-t border-slate-100">
            <h3 className="font-semibold text-slate-800 mb-4">Related Articles</h3>
            <div className="space-y-3">
              <Link href="/blog/how-to-merge-pdf-files-free" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-sm font-semibold text-slate-700">How to Merge PDF Files for Free Online</div>
                <div className="text-xs text-slate-400 mt-1">3 min read</div>
              </Link>
              <Link href="/blog/protect-pdf-with-password" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-sm font-semibold text-slate-700">How to Password Protect a PDF File</div>
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

