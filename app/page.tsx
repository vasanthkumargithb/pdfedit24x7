import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToolGrid from '@/components/ToolGrid'
import Footer from '@/components/Footer'
import { Shield, Zap, Globe } from 'lucide-react'

const blocks = [
  {
    icon: Shield,
    title: '100% Secure & Private',
    desc: 'Your files are protected with SSL encryption and automatically deleted within 1 hour. We never store or share your documents.',
  },
  {
    icon: Zap,
    title: 'Fast & Completely Free',
    desc: 'No signup, no subscription, no hidden limits. Process your PDFs instantly, right in your browser, at no cost.',
  },
  {
    icon: Globe,
    title: 'Works on Any Device',
    desc: 'Use all our tools on your phone, tablet, or computer. No app to install — just open your browser and get started.',
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolGrid />

        {/* iLovePDF-style 3-block section */}
        <section className="bg-white py-16 lg:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display font-800 text-3xl sm:text-4xl text-slate-900 mb-3">
                Why Choose PDFEdit24x7
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                The simplest, fastest way to work with your PDF files online.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blocks.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="text-center p-6 rounded-2xl border border-slate-100 hover:border-brand-200 hover:shadow-card transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display font-700 text-xl text-slate-900 mb-3">{title}</h3>
                  <p className="text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Slim CTA Banner */}
        <section className="bg-brand-600 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-700 text-2xl sm:text-3xl text-white mb-3">
              All Your PDF Needs, One Place
            </h2>
            <p className="text-brand-100 text-base mb-6">
              25+ free tools. No signup. No watermarks. Works on any device.
            </p>
            <a href="/#tools" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg">
              Start Using PDF Tools — Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}