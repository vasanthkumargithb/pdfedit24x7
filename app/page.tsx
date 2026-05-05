import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToolGrid from '@/components/ToolGrid'
import { HowItWorks, Features } from '@/components/sections'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolGrid />
        <HowItWorks />
        <Features />

        {/* CTA Banner */}
        <section className="bg-brand-600 py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display font-700 text-3xl sm:text-4xl text-white mb-4">
              All Your PDF Needs, One Place
            </h2>
            <p className="text-brand-200 text-lg mb-8">
              20+ free tools. No signup. No watermarks. Works on any device.
            </p>
            <a
              href="/#tools"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-brand-700 font-semibold rounded-xl hover:bg-brand-50 transition-colors shadow-lg"
            >
              Start Using PDF Tools — Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}