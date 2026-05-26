import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Cookie Policy | PDFEdit24x7',
  description: 'Learn about how PDFEdit24x7 uses cookies and how you can control them.',
}

export default function CookiesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 bg-white min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display font-700 text-4xl text-slate-900 mb-3">Cookie Policy</h1>
          <p className="text-sm text-slate-400 mb-10">Last updated: May 1, 2026</p>

          <div className="prose prose-slate max-w-none space-y-8">

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">1. What Are Cookies?</h2>
              <p className="text-slate-600 leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how you use the site. PDFEdit24x7 uses cookies minimally and only for essential functionality and anonymous analytics.
              </p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">2. Cookies We Use</h2>
              <p className="text-slate-600 leading-relaxed mb-4">PDFEdit24x7 uses the following types of cookies:</p>

              <div className="space-y-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-1">Essential Cookies</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    These cookies are required for the website to function. They do not collect any personal information. Examples include session cookies that keep your upload state during processing.
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Always active</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-1">Analytics Cookies</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    We use Google Analytics to understand how visitors use PDFEdit24x7 — which tools are most popular, how long people spend on each page, and where visitors come from. All data is anonymous and aggregated. No personally identifiable information is collected.
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Anonymous only</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-semibold text-slate-800 mb-1">No Tracking or Advertising Cookies</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    PDFEdit24x7 does not use advertising cookies, retargeting cookies, or any third-party tracking cookies. We do not sell your data or share cookie data with advertisers.
                  </p>
                  <span className="inline-block mt-2 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">Not used</span>
                </div>
              </div>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">3. How Long Do Cookies Last?</h2>
              <p className="text-slate-600 leading-relaxed">
                Session cookies are deleted automatically when you close your browser. Analytics cookies may persist for up to 2 years, but contain no personal information. You can delete all cookies at any time through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">4. How to Control Cookies</h2>
              <p className="text-slate-600 leading-relaxed mb-3">
                You can control and delete cookies through your browser settings. Here is how to do it in common browsers:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
                <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions</li>
              </ul>
              <p className="text-slate-600 leading-relaxed mt-3">
                Note: Disabling essential cookies may affect the functionality of PDFEdit24x7 tools.
              </p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">5. Third-Party Cookies</h2>
              <p className="text-slate-600 leading-relaxed">
                Some of our tools use third-party services (such as CloudConvert for file conversion). These services may set their own cookies governed by their own privacy and cookie policies. We recommend reviewing their policies for more information.
              </p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">6. Changes to This Policy</h2>
              <p className="text-slate-600 leading-relaxed">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of PDFEdit24x7 after changes are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-display font-600 text-xl text-slate-900 mb-3">7. Contact</h2>
              <p className="text-slate-600 leading-relaxed">
                For any questions about our cookie usage, contact us at{' '}
                <a href="mailto:support@tejdeal.com" className="text-brand-600 hover:underline">support@tejdeal.com</a>.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}


