import Link from 'next/link'
import { FileText, Mail, Shield, Zap, Lock } from 'lucide-react'
import { tools } from '@/lib/tools'

const company = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
]

const trust = [
  { icon: Shield, label: 'Files deleted instantly' },
  { icon: Zap, label: 'Process in seconds' },
  { icon: Lock, label: 'SSL encrypted' },
]

export default function Footer() {
  const third = Math.ceil(tools.length / 3)
  const toolsCol1 = tools.slice(0, third)
  const toolsCol2 = tools.slice(third, third * 2)
  const toolsCol3 = tools.slice(third * 2)

  return (
    <footer className="bg-slate-900">

      {/* Trust bar */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-wrap justify-center gap-8">
            {trust.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                <Icon className="w-4 h-4 text-emerald-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-12">

          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg">
                <FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-700 text-xl text-white">
                PDF<span className="text-brand-400">Edit24x7</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              The simplest, fastest PDF toolkit on the web. 20+ free tools. No signup. No watermarks. Ever.
            </p>
            <a href="mailto:tejdeal.social@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
              <Mail className="w-4 h-4" />
              tejdeal.social@gmail.com
            </a>
          </div>

          {/* Tools heading + 3 cols */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-5">
              All Tools
            </h4>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2.5">
              {[...toolsCol1, ...toolsCol2, ...toolsCol3].map((t, i) => (
                <Link
                  key={t.slug}
                  href={`/${t.slug}`}
                  className="text-sm text-slate-400 hover:text-white transition-colors truncate"
                >
                  {t.shortTitle}
                </Link>
              ))}
            </div>
          </div>

          {/* Company + Legal */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-5">Company</h4>
              <ul className="space-y-3">
                {company.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-400 mb-5">Legal</h4>
              <ul className="space-y-3">
                {legal.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} PDFEdit24x7. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>

    </footer>
  )
}


