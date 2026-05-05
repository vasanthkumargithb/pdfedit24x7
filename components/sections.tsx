import { Upload, Cog, Download, Shield, Zap, Globe, Star } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    title: 'Upload Your File',
    description: 'Drag & drop your PDF or click to browse. We accept files up to 100 MB.',
    color: 'text-brand-600',
    bg: 'bg-brand-50',
  },
  {
    icon: Cog,
    title: 'We Process It',
    description: 'Our servers handle your file instantly — merge, compress, convert in seconds.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Download,
    title: 'Download & Done',
    description: 'Your processed file is ready. Download it and your file is deleted from our servers.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
]

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Files processed in seconds, not minutes. Our infrastructure is built for speed.',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'SSL encryption on all uploads. Files are automatically deleted after 1 hour.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Globe,
    title: 'Works Everywhere',
    description: 'Browser-based — works on Mac, Windows, iOS, and Android. No install needed.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Star,
    title: 'Always Free',
    description: 'All tools are completely free. No signup, no watermarks, no hidden limits.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            How It Works
          </div>
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 mb-4">
            Process Your PDF in 3 Simple Steps
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            No learning curve. No account. Just results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative text-center">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] right-0 h-px bg-surface-200 z-0" />
                )}
                <div className={`relative z-10 w-16 h-16 ${step.bg} rounded-2xl mx-auto mb-5 flex items-center justify-center`}>
                  <Icon className={`w-7 h-7 ${step.color}`} strokeWidth={1.75} />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-slate-900 text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-display font-600 text-lg text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function Features() {
  return (
    <section className="bg-surface-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-14">
          <h2 className="font-display font-700 text-3xl sm:text-4xl text-slate-900 mb-4">
            Why Thousands Choose PDFPro
          </h2>
          <p className="text-lg text-slate-500 max-w-lg mx-auto">
            Built for professionals, accessible to everyone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description, color, bg }) => (
            <div key={title} className="bg-white rounded-2xl p-6 border border-surface-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200">
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
  )
}
