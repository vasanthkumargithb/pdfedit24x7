import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'How to Password Protect a PDF File — Free Online | PDFEdit24x7 Blog',
  description: 'Learn how to add a password to your PDF file for free online. Protect sensitive documents with 128-bit encryption. No software needed.',
  keywords: ['password protect pdf', 'encrypt pdf online free', 'lock pdf with password', 'secure pdf online'],
  alternates: { canonical: 'https://pdfedit24x7.com/blog/protect-pdf-with-password' },
  openGraph: {
    title: 'How to Password Protect a PDF File — Free Online',
    description: 'Add a password to your PDF free online. 128-bit encryption, no software needed.',
    url: 'https://pdfedit24x7.com/blog/protect-pdf-with-password',
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
            <span className="text-slate-600">Protect PDF</span>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">Security</span>
              <span className="text-xs text-slate-400">March 5, 2026</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400">3 min read</span>
            </div>
            <h1 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 leading-tight mb-4">
              How to Password Protect a PDF File
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Sending sensitive documents by email or sharing them online? Adding a password to your PDF ensures only the right people can open it. Here's how to do it free, in seconds.
            </p>
          </div>

          {/* CTA Box */}
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-10 text-center">
            <p className="text-sm font-semibold text-red-700 mb-3">Protect your PDF with a password right now — free.</p>
            <Link
              href="/protect-pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
            >
              Protect PDF Free →
            </Link>
          </div>

          {/* Article Content */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-600 leading-relaxed">

            <h2 className="font-display font-700 text-2xl text-slate-900">Why Password Protect a PDF?</h2>
            <p>
              PDFs are widely used for sharing sensitive information — contracts, financial reports, medical records, legal documents. Without password protection, anyone who receives or intercepts the file can open it.
            </p>
            <p>
              Adding a password means the recipient must enter the correct password before they can view the document. This is especially important when sharing files over email, cloud storage, or messaging apps.
            </p>

            <h2 className="font-display font-700 text-2xl text-slate-900">How to Password Protect a PDF with PDFEdit24x7</h2>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Go to the Protect PDF tool', desc: 'Visit PDFEdit24x7\'s Protect PDF page. No account or signup needed.' },
                { step: '2', title: 'Upload your PDF', desc: 'Click "Choose File" or drag and drop your PDF. Files up to 100MB are supported.' },
                { step: '3', title: 'Set your password', desc: 'Enter a strong password. PDFEdit24x7 uses 128-bit AES encryption to protect your file.' },
                { step: '4', title: 'Click Protect PDF', desc: 'Your PDF will be encrypted and password protected instantly.' },
                { step: '5', title: 'Download and share securely', desc: 'Download your protected PDF and share it. Recipients will need the password to open it.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-800 mb-1">{title}</div>
                    <div className="text-sm text-slate-500">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">What Encryption Does PDFEdit24x7 Use?</h2>
            <p>
              PDFEdit24x7 uses <strong>128-bit AES encryption</strong> — the same standard used by banks and governments. This means the password protection is extremely strong and cannot be easily bypassed.
            </p>

            <div className="grid gap-3">
              {[
                { label: 'Encryption standard', value: '128-bit AES' },
                { label: 'Password length', value: 'Any length supported' },
                { label: 'Compatible with', value: 'Adobe Reader, Chrome, all PDF viewers' },
                { label: 'Works on', value: 'Windows, Mac, iPhone, Android' },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                  <span className="text-sm font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>

            <h2 className="font-display font-700 text-2xl text-slate-900">Tips for a Strong PDF Password</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li><strong>Use at least 8 characters</strong> — Longer passwords are much harder to crack.</li>
              <li><strong>Mix letters, numbers, symbols</strong> — Example: <code>Pdf@2026!</code> is stronger than <code>pdf2026</code>.</li>
              <li><strong>Don't use obvious words</strong> — Avoid names, birthdays, or dictionary words.</li>
              <li><strong>Share the password separately</strong> — Never send the password in the same email as the PDF. Use a different channel like SMS or phone call.</li>
              <li><strong>Save the password</strong> — If you forget the password, there is no way to recover it. Store it safely.</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">When Should You Password Protect PDFs?</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Sending contracts or legal agreements</li>
              <li>Sharing financial reports or invoices</li>
              <li>Sending medical records or personal information</li>
              <li>Sharing confidential business documents</li>
              <li>Submitting sensitive forms online</li>
            </ul>

            <h2 className="font-display font-700 text-2xl text-slate-900">Is My PDF Safe During Processing?</h2>
            <p>
              Yes. PDFEdit24x7 processes your file using SSL encryption. Your document is never read, stored permanently, or shared. It is automatically deleted from our servers within 1 hour of processing. Only you know the password you set.
            </p>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <p className="text-sm text-amber-800">
                <strong>Important:</strong> PDFEdit24x7 cannot recover lost passwords. If you forget your password, there is no way to unlock the file. Always store your password in a safe place.
              </p>
            </div>

          </div>

          {/* Bottom CTA */}
          <div className="mt-12 bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 rounded-2xl p-8 text-center">
            <h3 className="font-display font-700 text-xl text-slate-900 mb-2">Ready to protect your PDF?</h3>
            <p className="text-slate-500 text-sm mb-5">Free, instant, 128-bit encryption, no signup required.</p>
            <Link
              href="/protect-pdf"
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-sm"
            >
              Protect PDF Now — Free →
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

