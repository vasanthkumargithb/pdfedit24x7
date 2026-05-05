'use client'

import { useState, useRef } from 'react'
import { Plus, Trash2, Download, ChevronUp, ChevronDown, Image, Type, Layout, Palette, FileText, Loader2, CheckCircle } from 'lucide-react'

type SlideLayout = 'title' | 'content' | 'image-left' | 'image-right'

interface Slide {
  id: string
  title: string
  content: string
  layout: SlideLayout
  imageBase64?: string
  imagePreview?: string
}

const THEMES = [
  { id: 'modern',    label: 'Modern',    bg: '#FFFFFF', accent: '#6366F1' },
  { id: 'dark',      label: 'Dark',      bg: '#0F172A', accent: '#818CF8' },
  { id: 'ocean',     label: 'Ocean',     bg: '#0C4A6E', accent: '#38BDF8' },
  { id: 'forest',    label: 'Forest',    bg: '#14532D', accent: '#4ADE80' },
  { id: 'sunset',    label: 'Sunset',    bg: '#FFF7ED', accent: '#F97316' },
  { id: 'corporate', label: 'Corporate', bg: '#F8FAFC', accent: '#0EA5E9' },
]

const LAYOUTS: { id: SlideLayout; label: string; icon: string }[] = [
  { id: 'title',       label: 'Title Slide',   icon: '⬛' },
  { id: 'content',     label: 'Content',       icon: '📄' },
  { id: 'image-left',  label: 'Image Left',    icon: '🖼️◀' },
  { id: 'image-right', label: 'Image Right',   icon: '▶🖼️' },
]

function uid() { return Math.random().toString(36).slice(2) }

export default function PresentationMaker() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: uid(), title: 'My Presentation', content: 'A great story starts here', layout: 'title' },
    { id: uid(), title: 'Introduction',    content: 'Add your content here...',  layout: 'content' },
  ])
  const [activeId, setActiveId]   = useState(slides[0].id)
  const [theme, setTheme]         = useState('modern')
  const [status, setStatus]       = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const active = slides.find(s => s.id === activeId) || slides[0]

  const update = (id: string, patch: Partial<Slide>) =>
    setSlides(prev => prev.map(s => s.id === id ? { ...s, ...patch } : s))

  const addSlide = () => {
    const s: Slide = { id: uid(), title: 'New Slide', content: '', layout: 'content' }
    setSlides(prev => [...prev, s])
    setActiveId(s.id)
  }

  const removeSlide = (id: string) => {
    if (slides.length === 1) return
    const idx = slides.findIndex(s => s.id === id)
    const next = slides[idx === 0 ? 1 : idx - 1]
    setSlides(prev => prev.filter(s => s.id !== id))
    setActiveId(next.id)
  }

  const moveSlide = (id: string, dir: -1 | 1) => {
    setSlides(prev => {
      const arr = [...prev]
      const i = arr.findIndex(s => s.id === id)
      const j = i + dir
      if (j < 0 || j >= arr.length) return arr
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
      return arr
    })
  }

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => {
      const b64 = ev.target?.result as string
      update(activeId, { imageBase64: b64, imagePreview: b64 })
    }
    reader.readAsDataURL(file)
  }

  const generate = async () => {
    setStatus('loading')
    setDownloadUrl(null)
    try {
      const formData = new FormData()
      formData.append('theme', theme)
      formData.append('slides', JSON.stringify(
        slides.map(s => ({
          title: s.title,
          content: s.content,
          layout: s.layout,
          imageBase64: s.imageBase64,
        }))
      ))

      const res = await fetch('/api/presentation/create', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Failed')

      const blob = await res.blob()
      setDownloadUrl(URL.createObjectURL(blob))
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  const selectedTheme = THEMES.find(t => t.id === theme)!

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">

      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none">Presentation Maker</h1>
            <p className="text-xs text-slate-400 mt-0.5">Build slides · Download PPTX</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {status === 'done' && downloadUrl && (
            <a
              href={downloadUrl}
              download="presentation.pptx"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 rounded-lg text-sm font-semibold transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              Download PPTX
            </a>
          )}
          <button
            onClick={generate}
            disabled={status === 'loading'}
            className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-colors"
          >
            {status === 'loading'
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</>
              : <><Download className="w-4 h-4" /> Generate PPTX</>}
          </button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-65px)]">

        {/* Slide Panel */}
        <aside className="w-56 border-r border-slate-800 flex flex-col bg-slate-900">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slides</span>
            <button onClick={addSlide} className="w-6 h-6 rounded bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center transition-colors">
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {slides.map((s, i) => (
              <div
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`group relative rounded-lg p-2.5 cursor-pointer transition-all ${
                  s.id === activeId
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-1">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold truncate">{i + 1}. {s.title || 'Untitled'}</p>
                    <p className={`text-xs truncate mt-0.5 ${s.id === activeId ? 'text-indigo-200' : 'text-slate-500'}`}>
                      {s.layout}
                    </p>
                  </div>
                  <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={e => { e.stopPropagation(); moveSlide(s.id, -1) }} className="p-0.5 hover:text-white">
                      <ChevronUp className="w-3 h-3" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); moveSlide(s.id, 1) }} className="p-0.5 hover:text-white">
                      <ChevronDown className="w-3 h-3" />
                    </button>
                    <button onClick={e => { e.stopPropagation(); removeSlide(s.id) }} className="p-0.5 hover:text-red-400">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Editor */}
        <main className="flex-1 flex flex-col overflow-hidden">

          {/* Preview */}
          <div className="flex-1 flex items-center justify-center p-8 bg-slate-950">
            <div
              className="w-full max-w-2xl aspect-video rounded-xl shadow-2xl overflow-hidden relative flex flex-col"
              style={{ backgroundColor: selectedTheme.bg }}
            >
              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-2" style={{ backgroundColor: selectedTheme.accent }} />

              {active.layout === 'title' ? (
                <div className="flex-1 flex flex-col items-center justify-center px-12 text-center">
                  <div className="w-16 h-0.5 mb-6 rounded" style={{ backgroundColor: selectedTheme.accent }} />
                  <h2 className="text-3xl font-bold mb-4" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#F1F5F9' : '#1E293B' }}>
                    {active.title || 'Slide Title'}
                  </h2>
                  <div className="w-16 h-0.5 mb-6 rounded" style={{ backgroundColor: selectedTheme.accent }} />
                  <p className="text-sm opacity-70" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#CBD5E1' : '#475569' }}>
                    {active.content}
                  </p>
                </div>
              ) : active.layout === 'image-right' ? (
                <div className="flex-1 flex pl-6 pr-4 py-5 gap-4">
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-3" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#F1F5F9' : '#1E293B' }}>
                      {active.title}
                    </h2>
                    <p className="text-xs leading-relaxed opacity-70" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#CBD5E1' : '#475569' }}>
                      {active.content}
                    </p>
                  </div>
                  <div className="w-2/5 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center">
                    {active.imagePreview
                      ? <img src={active.imagePreview} alt="" className="w-full h-full object-cover" />
                      : <Image className="w-8 h-8 text-slate-400" />}
                  </div>
                </div>
              ) : active.layout === 'image-left' ? (
                <div className="flex-1 flex pl-6 pr-4 py-5 gap-4">
                  <div className="w-2/5 rounded-lg overflow-hidden bg-slate-200 flex items-center justify-center">
                    {active.imagePreview
                      ? <img src={active.imagePreview} alt="" className="w-full h-full object-cover" />
                      : <Image className="w-8 h-8 text-slate-400" />}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h2 className="text-xl font-bold mb-3" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#F1F5F9' : '#1E293B' }}>
                      {active.title}
                    </h2>
                    <p className="text-xs leading-relaxed opacity-70" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#CBD5E1' : '#475569' }}>
                      {active.content}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col pl-8 pr-6 py-5">
                  <h2 className="text-xl font-bold mb-2" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#F1F5F9' : '#1E293B' }}>
                    {active.title}
                  </h2>
                  <div className="w-10 h-0.5 mb-3 rounded" style={{ backgroundColor: selectedTheme.accent }} />
                  <p className="text-xs leading-relaxed opacity-70 flex-1" style={{ color: theme === 'dark' || theme === 'ocean' || theme === 'forest' ? '#CBD5E1' : '#475569' }}>
                    {active.content}
                  </p>
                  {active.imagePreview && (
                    <img src={active.imagePreview} alt="" className="mt-3 h-24 w-auto rounded object-cover" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-slate-800 bg-slate-900 p-4 space-y-4">

            {/* Title & Content */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Type className="w-3 h-3" /> Title
                </label>
                <input
                  value={active.title}
                  onChange={e => update(activeId, { title: e.target.value })}
                  placeholder="Slide title..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <FileText className="w-3 h-3" /> Content
                </label>
                <textarea
                  value={active.content}
                  onChange={e => update(activeId, { content: e.target.value })}
                  placeholder="Slide content..."
                  rows={2}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Layout */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Layout className="w-3 h-3" /> Layout
                </label>
                <div className="grid grid-cols-2 gap-1">
                  {LAYOUTS.map(l => (
                    <button
                      key={l.id}
                      onClick={() => update(activeId, { layout: l.id })}
                      className={`px-2 py-1.5 rounded text-xs font-medium transition-colors ${
                        active.layout === l.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Palette className="w-3 h-3" /> Theme
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      title={t.label}
                      className={`h-7 rounded flex items-center justify-center gap-1 text-xs transition-all border ${
                        theme === t.id ? 'border-indigo-500 scale-105' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: t.bg === '#FFFFFF' || t.bg === '#F8FAFC' || t.bg === '#FFF7ED' ? '#1e293b' : t.bg }}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.accent }} />
                      <span className="text-slate-300 text-[10px]">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5">
                  <Image className="w-3 h-3" /> Image
                </label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full py-2 rounded-lg border border-dashed border-slate-600 hover:border-indigo-500 text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                >
                  {active.imagePreview ? '✅ Image added — click to change' : '+ Upload image'}
                </button>
                {active.imagePreview && (
                  <button onClick={() => update(activeId, { imageBase64: undefined, imagePreview: undefined })}
                    className="mt-1 text-xs text-red-400 hover:text-red-300">
                    Remove image
                  </button>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}