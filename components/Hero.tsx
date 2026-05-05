'use client'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Lock } from 'lucide-react'

const stats = [
  { label: 'PDF Tools Available', value: '20+' },
  { label: 'Files Processed', value: '10K+' },
  { label: 'Always Free', value: '100%' },
]

const trust = [
  { icon: Shield, label: 'Files deleted after 1 hour' },
  { icon: Zap, label: 'Process in seconds' },
  { icon: Lock, label: 'SSL encrypted upload' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-brand-50/80 to-transparent rounded-b-[50%]" />
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-violet-50 rounded-full blur-3xl opacity-60" />
        <div className="absolute top-40 left-[8%] w-48 h-48 bg-sky-50 rounded-full blur-3xl opacity-70" />
        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1440e1" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50 border border-brand-100 rounded-full mb-6 animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
          <span className="text-xs font-semibold text-brand-700 tracking-wide uppercase">100% Free · No Signup Required</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-slate-900 leading-[1.1] tracking-tight mb-6 animate-fade-up">
          20+ PDF Tools,
          <br />
          <span className="relative inline-block text-brand-600">
            All Completely Free
            <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 400 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8 Q100 2 200 8 Q300 14 398 6" stroke="#3670ff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.4"/>
            </svg>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up" style={{ animationDelay: '100ms' }}>
          Merge, split, compress, convert, edit and sign PDFs — all in your browser.
          Fast, secure, and always free. No signup needed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <Link
            href="/#tools"
            className="group flex items-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-all shadow-lg shadow-brand-200 hover:shadow-brand-300"
          >
            Explore All Tools
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/compress-pdf"
            className="px-6 py-3.5 bg-white text-slate-700 font-semibold rounded-xl border border-surface-200 hover:border-surface-300 hover:bg-surface-50 transition-all shadow-card"
          >
            Compress PDF — Start Now
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-16 animate-fade-up" style={{ animationDelay: '200ms' }}>
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-500">
              <Icon className="w-4 h-4 text-emerald-500" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 lg:gap-16 animate-fade-up" style={{ animationDelay: '250ms' }}>
          {stats.map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-display font-800 text-3xl text-slate-900">{value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}