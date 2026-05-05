import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Terms of Service | PDFPro',
  description: 'Read the PDFPro Terms of Service before using our free online PDF tools.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using PDFPro ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.',
  },
  {
    title: '2. Description of Service',
    body: 'PDFPro provides 20+ free, browser-based PDF processing tools including merging, splitting, compressing, rotating, converting, editing, signing, and watermarking PDF files. Additional tools include PDF to Word, Excel, PowerPoint, and Presentation Maker. The Service is provided "as is" without warranties of any kind.',
  },
  {
    title: '3. Acceptable Use',
    body: 'You agree not to upload files containing illegal content, malware, or content that infringes third-party intellectual property rights. You are solely responsible for the content of files you upload.',
  },
  {
    title: '4. File Privacy & Deletion',
    body: 'Files uploaded to PDFPro are processed for the sole purpose of performing the requested operation. All uploaded and processed files are automatically deleted from our servers immediately after download. We do not retain, read, store, or share your file contents with any third party.',
  },
  {
    title: '5. Intellectual Property',
    body: 'PDFPro and its original content, features, and functionality are owned by PDFPro and protected by international copyright and trademark laws. You retain full ownership of any files you upload and process.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'PDFPro shall not be liable for any indirect, incidental, special, or consequential damages resulting from your use of the Service. Always keep backups of your original files before processing.',
  },
  {
    title: '7. No Account Required',
    body: 'PDFPro does not require you to create an account or provide personal information to use any of its tools. All tools are available freely without registration.',
  },
  {
    title: '8. Changes to Terms',
    body: 'We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated revision date. Continued use of the Service constitutes acceptance of the revised Terms.',
  },
  {
    title: '9. Contact',
    body: 'For questions about these Terms, contact us at legal@pdfpro.app.',
  },
]

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              Legal
            </div>
            <h1 className="font-display font-700 text-4xl text-slate-900 mb-3">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-400">Last updated: May 1, 2025</p>
          </div>

          {/* Intro box */}
          <div className="bg-brand-50 border border-brand-100 rounded-2xl p-5 mb-10">
            <p className="text-sm text-brand-800 leading-relaxed">
              Please read these Terms carefully before using PDFPro. By using our tools,
              you agree to these terms. Our tools are 100% free, require no signup, and
              your files are never stored permanently.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map(({ title, body }) => (
              <section key={title} className="border-b border-surface-100 pb-8 last:border-0">
                <h2 className="font-display font-600 text-xl text-slate-900 mb-3">{title}</h2>
                <p className="text-slate-600 leading-relaxed">{body}</p>
              </section>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-12 p-5 bg-surface-50 rounded-2xl border border-surface-100 text-center">
            <p className="text-sm text-slate-500">
              Have questions? Contact us at{' '}
              <a href="mailto:legal@pdfpro.app" className="text-brand-600 hover:underline font-medium">
                legal@pdfpro.app
              </a>
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}