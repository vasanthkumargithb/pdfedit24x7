import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, Zap, Globe, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About PDFEdit24x7 – Our Mission',
  description: 'PDFEdit24x7 is a free online PDF toolkit built to make working with PDFs simple, fast, and private for everyone.',
}

const values = [
  {
    icon: Heart,
    title: 'Built for Humans',
    description: 'No dark patterns, no forced signups, no watermarks. We build tools we would want to use ourselves.',
    color: 'text-pink-500', bg: 'bg-pink-50',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files are processed in memory and automatically deleted within 1 hour. We never read or store your documents.',
    color: 'text-emerald-600', bg: 'bg-emerald-50',
  },
  {
    icon: Zap,
    title: 'Speed Obsessed',
    description: 'Every millisecond counts. Our infrastructure is optimised to process files as fast as possible.',
    color: 'text-amber-500', bg: 'bg-amber-50',
  },
  {
    icon: Globe,
    title: 'Free for Everyone',
    description: 'PDFEdit24x7 is free to use — for students, professionals, and businesses in any country.',
    color: 'text-brand-600', bg: 'bg-brand-50',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-white">

        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
          <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-5">About Us</div>
          <h1 className="font-display font-700 text-4xl sm:text-5xl text-slate-900 mb-6 leading-tight">
            Making PDF Tools Simple,<br />Fast, and Free
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
            PDFEdit24x7 started from a simple frustration: why do PDF tools have to be bloated, expensive, or filled with traps? We built the tool we always wanted — clean, instant, and honest.
          </p>
        </section>

        {/* Values */}
        <section className="bg-surface-50 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display font-700 text-3xl text-slate-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map(({ icon: Icon, title, description, color, bg }) => (
                <div key={title} className="bg-white rounded-2xl p-6 border border-surface-100 shadow-card">
                  <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className={`w-5 h-5 ${color}`} strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display font-600 text-[0.95rem] text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '12M+', label: 'PDFs Processed' },
                { value: '500K+', label: 'Monthly Users' },
                { value: '8', label: 'Free Tools' },
                { value: '190+', label: 'Countries Served' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <div className="font-display font-800 text-4xl text-brand-600 mb-1">{value}</div>
                  <div className="text-sm text-slate-500 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

