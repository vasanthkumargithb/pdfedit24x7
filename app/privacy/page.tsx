import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | PDFEdit24x7',
  description: 'Learn how PDFEdit24x7 handles your data and protects your privacy.',
}

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-700 text-4xl text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-sm text-slate-400 mb-10">Last updated: January 1, 2025</p>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">1. Data We Collect</h2>
              <p className="text-slate-600 leading-relaxed">PDFEdit24x7 does not require account creation. When you use our tools, we temporarily process your uploaded files on our servers to perform the requested operation. We do not store, read, or analyze the content of your documents.</p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">2. File Handling</h2>
              <p className="text-slate-600 leading-relaxed">All uploaded files are stored temporarily in memory or on a secure server for the duration of processing. Files are automatically and permanently deleted within <strong>1 hour</strong> of upload. We use SSL/TLS encryption for all file transfers.</p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">3. Cookies & Analytics</h2>
              <p className="text-slate-600 leading-relaxed">We use anonymous usage analytics (page views, feature usage) to improve the product. No personally identifiable information is collected. We use essential session cookies only.</p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">4. Third-Party Services</h2>
              <p className="text-slate-600 leading-relaxed">Some conversion operations (Word to PDF, PDF to JPG) may use third-party processing APIs such as CloudConvert. These services have their own privacy policies and operate under strict data processing agreements.</p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">5. Contact</h2>
              <p className="text-slate-600 leading-relaxed">For any privacy-related questions, contact us at <a href="mailto:support@tejdeal.com" className="text-brand-600 hover:underline">support@tejdeal.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


