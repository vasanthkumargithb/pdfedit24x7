import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Scan Documents with Your Phone — Free CamScanner Alternative | PDFEdit24x7 Blog',
  description: 'Scan documents with your phone for free — no app download needed. PDFEdit24x7\'s Doc Scanner works like CamScanner, right in your browser.',
  keywords: ['scan document phone', 'camscanner alternative free', 'scan document online', 'phone document scanner free'],
  alternates: { canonical: 'https://pdfedit24x7.com/blog/scan-document-with-phone-camscanner-alternative' },
  openGraph: {
    title: 'How to Scan Documents with Your Phone — Free CamScanner Alternative',
    description: 'Scan documents free in your browser — no app needed. Works like CamScanner.',
    url: 'https://pdfedit24x7.com/blog/scan-document-with-phone-camscanner-alternative',
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
            <span className="text-slate-600">Doc Scanner</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Tips</span>
              <span className="text-xs text-slate-400">March 28, 2026</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">5 min read</span>
            </div>
            <h1 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
              How to Scan Documents with Your Phone — Free CamScanner Alternative
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Did you know you can scan documents right from your browser — no app download needed? PDFEdit24x7's free Doc Scanner tool automatically detects document edges and creates a clean scanned PDF. Just like CamScanner, but free and without the watermarks.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-10 text-center">
            <p className="text-sm font-semibold text-blue-700 mb-3">Try our free Doc Scanner — no app download needed.</p>
            <Link
              href="/auto-edge-detect"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Scan Document Free →
            </Link>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

            <h2 className="font-display font-700 text-2xl text-slate-900">Why Use a Document Scanner?</h2>
            <p>
              Whether you need to digitize a contract, send a handwritten note, or submit a paper form online — scanning documents with your phone has become an essential skill. A good scanner app automatically detects the document edges, corrects the perspective, and produces a clean, readable PDF.
            </p>
            <p>
              CamScanner is the most popular app for this — but it requires a download, an account, and shows watermarks on free scans. PDFEdit24x7's Doc Scanner does the same thing, completely free, right in your browser.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">PDFEdit24x7 vs CamScanner</h2>
            <div className="grid gap-3">
              {[
                { feature: 'App download required', PDFEdit24x7: '❌ No download', camscanner: '✅ Required' },
                { feature: 'Account/signup', PDFEdit24x7: '❌ No signup', camscanner: '✅ Required' },
                { feature: 'Watermarks on free plan', PDFEdit24x7: '❌ No watermarks', camscanner: '✅ On free plan' },
                { feature: 'Auto edge detection', PDFEdit24x7: '✅ Yes', camscanner: '✅ Yes' },
                { feature: 'Export to PDF', PDFEdit24x7: '✅ Yes', camscanner: '✅ Yes' },
                { feature: 'Multiple pages', PDFEdit24x7: '✅ Up to 20 pages', camscanner: '✅ Yes' },
                { feature: 'Price', PDFEdit24x7: '✅ 100% Free', camscanner: '⚠️ Freemium' },
              ].map(({ feature, PDFEdit24x7, camscanner }) => (
                <div key={feature} className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-xs font-medium text-slate-600">{feature}</span>
                  <span className="text-xs text-center font-semibold text-emerald-700">{PDFEdit24x7}</span>
                  <span className="text-xs text-center text-slate-500">{camscanner}</span>
                </div>
              ))}
              <div className="grid grid-cols-3 gap-2 px-3">
                <span className="text-xs text-slate-400"></span>
                <span className="text-xs text-center font-bold text-blue-600">PDFEdit24x7</span>
                <span className="text-xs text-center text-slate-400">CamScanner</span>
              </div>
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Scan a Document with PDFEdit24x7</h2>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Take a photo of your document', desc: 'Use your phone camera to take a clear photo of the document. Make sure the lighting is good and the full document is visible.' },
                { step: '2', title: 'Go to PDFEdit24x7 Doc Scanner', desc: 'Open your browser and go to PDFEdit24x7\'s Doc Scanner tool. No app download or account needed.' },
                { step: '3', title: 'Upload your photo', desc: 'Click "Choose Files" and select your photo. You can upload up to 20 photos at once for multi-page documents.' },
                { step: '4', title: 'Auto edge detection runs', desc: 'PDFEdit24x7 automatically detects the document edges, corrects the perspective, and straightens the image.' },
                { step: '5', title: 'Download your scanned PDF', desc: 'Your clean, scanned PDF is ready. All pages are combined into a single PDF file.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">Tips for Better Scan Quality</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong>Good lighting</strong> — Natural daylight gives the best results. Avoid shadows across the document.</li>
              <li><strong>Flat surface</strong> — Place the document on a flat, contrasting surface (dark table for white paper works well).</li>
              <li><strong>Straight angle</strong> — Try to hold your phone directly above the document, not at an angle.</li>
              <li><strong>Clear background</strong> — Make sure the document edges are clearly visible against the background.</li>
              <li><strong>Avoid glare</strong> — If scanning glossy documents, avoid direct light sources that cause glare.</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">What Documents Can You Scan?</h2>
            <p>PDFEdit24x7's Doc Scanner works great for:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Contracts and agreements</li>
              <li>Receipts and invoices</li>
              <li>Handwritten notes</li>
              <li>ID documents and certificates</li>
              <li>Books and printed pages</li>
              <li>Whiteboards and notes</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is My Data Safe?</h2>
            <p>
              Yes. PDFEdit24x7 processes your photos securely and deletes them automatically within 1 hour. We never store or share your document contents. All transfers use SSL encryption.
            </p>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-100 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-slate-900 mb-2">Ready to scan your document?</h3>
            <p className="text-slate-500 text-sm mb-5">Free, no app download, no signup required.</p>
            <Link
              href="/auto-edge-detect"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Scan Document Now — Free →
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
              <Link href="/blog/compress-pdf-without-losing-quality" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                <div className="text-sm font-semibold text-slate-700">How to Compress a PDF Without Losing Quality</div>
                <div className="text-xs text-slate-400 mt-1">4 min read</div>
              </Link>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

