import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Rotate PDF Pages and Save Permanently Free | PDFEdit24x7 Blog',
  description: 'Learn how to rotate PDF pages and save the change permanently for free. Fix sideways or upside-down pages online in seconds, no signup needed.',
  alternates: { canonical: 'https://pdfedit24x7.com/blog/how-to-rotate-pdf-pages' },
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
            <span className="text-slate-600">Rotate PDF</span>
          </nav>

          <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
            How to Rotate PDF Pages Permanently
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Scanned a document and the pages came out sideways or upside down? Annoyingly, rotating in a PDF viewer often doesn't save. Here's how to rotate your PDF and keep the change for good — free.
          </p>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 text-center">
            <Link href="/rotate-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Rotate PDF Free
            </Link>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-display font-700 text-2xl text-slate-900">Why Won't My Rotation Save?</h2>
            <p>Many PDF viewers (like the one in your browser or Adobe Reader's free version) let you rotate the view temporarily — but when you close and reopen the file, it snaps back to the original orientation. That's because viewing rotation isn't the same as saving the rotation into the file itself. To make it permanent, you need a tool that actually rewrites the PDF.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Rotate a PDF Permanently</h2>
            <p>Open the Rotate PDF tool, upload your file, and rotate the pages 90, 180, or 270 degrees until they're upright. Click apply, and download the corrected PDF. This time the rotation is baked into the file — it stays correct everywhere you open it. Your original is deleted automatically within 1 hour.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Rotating Only Some Pages</h2>
            <p>Sometimes only a few pages are sideways while the rest are fine. The tool lets you rotate specific pages so you only fix what's wrong, leaving the correct pages untouched.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is It Safe?</h2>
            <p>Yes. PDFEdit24x7 uses SSL encryption and deletes your files automatically within 1 hour. Nothing is stored or shared, and it works on any device with no app to install.</p>
          </div>

          <div className="mt-12 bg-brand-600 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-4">Ready to fix your PDF orientation?</h3>
            <Link href="/rotate-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              Rotate PDF Now - Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}