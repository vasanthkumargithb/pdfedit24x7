import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import ToolGrid from '@/components/ToolGrid'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ToolGrid />

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