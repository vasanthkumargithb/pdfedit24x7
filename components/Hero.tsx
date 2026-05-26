'use client'
import { Shield, Zap, Lock } from 'lucide-react'

const trust = [
  { icon: Shield, label: 'Files deleted after 1 hour' },
  { icon: Zap, label: 'Process in seconds' },
  { icon: Lock, label: 'SSL encrypted upload' },
]

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden pt-28 pb-5"
      style={{ background: 'linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #eff6ff 100%)' }}
    >
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Small title */}
        <h1 className="font-display font-800 text-2xl sm:text-3xl text-slate-900 leading-tight tracking-tight mb-2">
          Every PDF Tool You Need, <span className="text-brand-600">Free</span>
        </h1>

        {/* Short subtitle */}
        <p className="text-sm text-slate-500 max-w-xl mx-auto mb-4">
          Merge, split, compress and convert PDFs — fast, secure, no signup.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-2">
          {trust.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5 text-xs text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
              <Icon className="w-3.5 h-3.5 text-emerald-500" />
              <span>{label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
