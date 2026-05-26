import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Convert PDF to JPG Without Losing Quality Free | PDFEdit24x7 Blog',
  description: 'Learn how to convert PDF pages to high-quality JPG images for free. Turn each page into a sharp image online, no signup needed.',
  alternates: { canonical: 'https://pdfedit24x7.com/blog/convert-pdf-to-jpg-high-quality' },
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
            <span className="text-slate-600">PDF to JPG</span>
          </nav>

          <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
            Convert PDF to JPG Without Losing Quality
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Need each page of your PDF as a separate image? Whether it's for a presentation, social media, or printing, here's how to turn your PDF into sharp JPG images for free.
          </p>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 text-center">
            <Link href="/pdf-to-jpg" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Convert PDF to JPG Free
            </Link>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-display font-700 text-2xl text-slate-900">Why Convert PDF to JPG?</h2>
            <p>JPG images are easy to share, upload, and view anywhere. Converting a PDF to JPG is useful when you want to post a page on social media, insert it into a slideshow, send a quick preview, or display a document where PDFs aren't supported. Each PDF page becomes its own image file.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Convert PDF to JPG</h2>
            <p>Open the PDF to JPG tool, upload your PDF, and the tool converts each page into a separate high-quality JPG image. Click convert, and download your images in seconds. Your file is automatically deleted within 1 hour.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Keep the Quality High</h2>
            <p>Quality depends on the resolution of the conversion. PDFEdit24x7 renders pages at a high resolution so text stays crisp and images stay clear. For best results, start with a good-quality PDF — the clearer the original, the sharper the JPG output.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is It Safe?</h2>
            <p>Yes. PDFEdit24x7 uses SSL encryption and deletes your files automatically within 1 hour. Nothing is stored or shared, and it works on any device with no app to install.</p>
          </div>

          <div className="mt-12 bg-brand-600 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-4">Ready to convert your PDF to JPG?</h3>
            <Link href="/pdf-to-jpg" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              Convert Now - Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}