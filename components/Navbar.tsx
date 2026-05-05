'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, FileText, ChevronDown } from 'lucide-react'
import { tools } from '@/lib/tools'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
              <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="font-display font-700 text-[1.15rem] text-slate-900">
              PDF<span className="text-brand-600">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Tools Dropdown */}
            <div className="relative" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all">
                All Tools
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              {toolsOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-card-hover border border-surface-100 p-2 z-50 max-h-[80vh] overflow-y-auto">
                  {tools.map(tool => (
                    <Link
                      key={tool.slug}
                      href={tool.slug === 'presentation-maker' ? '/presentation-maker' : `/${tool.slug}`}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-surface-50 transition-colors"
                    >
                      <div className={`w-7 h-7 rounded-lg ${tool.color} flex items-center justify-center flex-shrink-0`}>
                        <ToolIcon name={tool.icon} color={tool.iconColor} size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-700">{tool.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all">
              About
            </Link>
            <Link href="/contact" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all">
              Contact
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#tools"
              className="px-4 py-2 text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
            >
              Get Started — Free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-surface-50 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-surface-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {tools.map(tool => (
            <Link
              key={tool.slug}
              href={tool.slug === 'presentation-maker' ? '/presentation-maker' : `/${tool.slug}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-50 transition-colors"
            >
              <div className={`w-7 h-7 rounded-lg ${tool.color} flex items-center justify-center`}>
                <ToolIcon name={tool.icon} color={tool.iconColor} size={14} />
              </div>
              <span className="text-sm font-medium text-slate-700">{tool.title}</span>
            </Link>
          ))}
          <div className="pt-2 border-t border-surface-100 flex flex-col gap-1">
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-surface-50 rounded-xl">About</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-surface-50 rounded-xl">Contact</Link>
            <Link href="/#tools" onClick={() => setOpen(false)} className="mt-1 px-4 py-2.5 text-sm font-semibold text-center bg-brand-600 text-white rounded-xl">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  )
}

// Inline SVG icon switcher — no external deps
function ToolIcon({ name, color, size = 18 }: { name: string; color: string; size?: number }) {
  const props = {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
    stroke: color, strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (name) {
    case 'merge':       return <svg {...props}><path d="M8 6H3v12h5M16 6h5v12h-5M12 3v18M8 12h8" /></svg>
    case 'split':       return <svg {...props}><path d="M12 3v18M3 6h4l5 6-5 6H3M21 6h-4l-5 6 5 6h4" /></svg>
    case 'compress':    return <svg {...props}><path d="M12 2v10M12 2l-3 3M12 2l3 3M12 22v-10M12 22l-3-3M12 22l3-3M2 12h10M22 12h-10" /></svg>
    case 'pdf-word':    return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="17" y2="17"/></svg>
    case 'word-pdf':    return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg>
    case 'image-pdf':   return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
    case 'rotate':      return <svg {...props}><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
    case 'pdf-jpg':     return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M10 12.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5"/><path d="M14.5 13l3 4.5"/></svg>
    case 'protect':     return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'page-numbers':return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>
    case 'watermark':   return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    case 'extract':     return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
    case 'image':       return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    case 'ppt':         return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="14" r="3"/><path d="M13 14h4"/></svg>
    case 'remove':      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
    case 'excel':       return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="14" y2="9"/></svg>
    case 'edit':        return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    default:            return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  }
}

export { ToolIcon }