'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, FileText, ChevronDown, Search, ArrowRight } from 'lucide-react'
import { tools } from '@/lib/tools'

function SearchModal({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const results = query.trim().length > 0
    ? tools.filter(t =>
        t.title.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase()) ||
        t.keywords.some(k => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 8)
    : []

  return (
    <>
      {/* Full screen backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        style={{ zIndex: 9998 }}
        onClick={onClose}
      />

      {/* Search modal — top center */}
      <div
        className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
        style={{ zIndex: 9999 }}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 bg-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-200">
          <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder='Search tools... e.g. "compress", "merge", "scan"'
            className="flex-1 text-slate-700 placeholder-slate-400 text-base outline-none bg-transparent"
          />
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            {results.map(tool => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 px-5 py-3.5 hover:bg-brand-50 transition-colors group border-b border-slate-50 last:border-0"
              >
                <div className={`w-9 h-9 rounded-xl ${tool.color} flex items-center justify-center flex-shrink-0`}>
                  <ToolIcon name={tool.icon} color={tool.iconColor} size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800">{tool.title}</div>
                  <div className="text-xs text-slate-400 truncate">{tool.description}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}

        {/* No results */}
        {query.trim().length > 0 && results.length === 0 && (
          <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 px-5 py-6 text-center">
            <p className="text-sm text-slate-400">No tools found for &quot;{query}&quot;</p>
          </div>
        )}

        {/* Quick suggestions when empty */}
        {query.trim().length === 0 && (
          <div className="mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">Popular Tools</p>
            <div className="flex flex-wrap gap-2">
              {['Merge PDF', 'Compress PDF', 'PDF to Word', 'Split PDF', 'PDF to JPG', 'Word to PDF'].map(name => {
                const tool = tools.find(t => t.title === name)
                return tool ? (
                  <Link
                    key={tool.slug}
                    href={`/${tool.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 rounded-lg text-sm text-slate-600 transition-colors border border-slate-100"
                  >
                    {tool.title}
                  </Link>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}

      <header
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-100' : 'bg-transparent'
        }`}
        style={{ zIndex: 9997 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
                <FileText className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display font-700 text-[1.15rem] text-slate-900">
                PDF<span className="text-brand-600">Edit24x7</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
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
                        href={`/${tool.slug}`}
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
              <Link href="/about" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all">About</Link>
              <Link href="/contact" className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all">Contact</Link>
            </nav>

            {/* Right — Search + CTA */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-900 rounded-lg hover:bg-surface-50 transition-all border border-slate-200 hover:border-slate-300"
              >
                <Search className="w-4 h-4" />
                <span className="text-sm">Search tools...</span>
              </button>
              <Link href="/#tools" className="px-4 py-2 text-sm font-semibold bg-brand-600 text-white rounded-xl hover:bg-brand-700 transition-colors shadow-sm">
                Get Started — Free
              </Link>
            </div>

            {/* Mobile */}
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-surface-50 transition-colors">
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-white border-t border-surface-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {tools.map(tool => (
              <Link key={tool.slug} href={`/${tool.slug}`} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-50 transition-colors">
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
    </>
  )
}

function ToolIcon({ name, color, size = 18 }: { name: string; color: string; size?: number }) {
  const props = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'merge':        return <svg {...props}><path d="M8 6H3v12h5M16 6h5v12h-5M12 3v18M8 12h8" /></svg>
    case 'split':        return <svg {...props}><path d="M12 3v18M3 6h4l5 6-5 6H3M21 6h-4l-5 6 5 6h4" /></svg>
    case 'compress':     return <svg {...props}><path d="M12 2v10M12 2l-3 3M12 2l3 3M12 22v-10M12 22l-3-3M12 22l3-3M2 12h10M22 12h-10" /></svg>
    case 'pdf-word':     return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="7" y1="13" x2="17" y2="13"/><line x1="7" y1="17" x2="17" y2="17"/></svg>
    case 'word-pdf':     return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/></svg>
    case 'image-pdf':    return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
    case 'rotate':       return <svg {...props}><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
    case 'pdf-jpg':      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><path d="M10 12.5a2.5 2.5 0 0 1 0 5 2.5 2.5 0 0 1 0-5"/><path d="M14.5 13l3 4.5"/></svg>
    case 'protect':      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'page-numbers': return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="12" y2="17"/></svg>
    case 'watermark':    return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
    case 'extract':      return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
    case 'image':        return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    case 'ppt':          return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="14" r="3"/><path d="M13 14h4"/></svg>
    case 'remove':       return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/></svg>
    case 'excel':        return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="10" y1="9" x2="14" y2="9"/></svg>
    case 'edit':         return <svg {...props}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
    default:             return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
  }
}

export { ToolIcon }

