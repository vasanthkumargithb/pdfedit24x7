import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Add a Watermark to a PDF Free | PDFEdit24x7 Blog',
  description: 'Learn how to add a text or image watermark to your PDF for free. Protect and brand your documents online in seconds, no signup needed.',
  alternates: { canonical: 'https://pdfedit24x7.com/blog/how-to-add-watermark-to-pdf' },
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
            <span className="text-slate-600">Watermark PDF</span>
          </nav>

          <h1 className="font-display font-800 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
            How to Add a Watermark to a PDF
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed mb-8">
            Want to mark a document as "Confidential", "Draft", or add your company name across every page? A watermark does exactly that. Here's how to add one to your PDF for free.
          </p>

          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-6 mb-10 text-center">
            <Link href="/watermark-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors">
              Add Watermark Free
            </Link>
          </div>

          <div className="space-y-6 text-slate-600 leading-relaxed">
            <h2 className="font-display font-700 text-2xl text-slate-900">Why Add a Watermark?</h2>
            <p>Watermarks help protect and label your documents. Businesses use them to brand reports with a logo, mark drafts so they aren't mistaken for final versions, or stamp "Confidential" on sensitive files. A watermark appears on every page, making it clear who owns the document and what its status is.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Add a Text Watermark</h2>
            <p>Open the Watermark PDF tool, upload your file, and type the text you want — like "Confidential" or your company name. You can adjust the position and transparency, then click apply. Download your watermarked PDF in seconds.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Adding an Image or Logo Watermark</h2>
            <p>If you want to stamp your logo instead of text, use the Image Watermark tool. Upload your PDF and your logo image, position it where you want, and apply. This is perfect for branding proposals, invoices, and reports.</p>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is It Safe?</h2>
            <p>Yes. PDFEdit24x7 uses SSL encryption and deletes your files automatically within 1 hour. Nothing is stored or shared, and it works on any device with no app to install.</p>
          </div>

          <div className="mt-12 bg-brand-600 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-white mb-4">Ready to watermark your PDF?</h3>
            <Link href="/watermark-pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors">
              Add Watermark Now - Free
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}