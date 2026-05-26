'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tools, categories, getToolsByCategory } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import { ToolIcon } from './Navbar'

type CatKey = keyof typeof categories
const CAT_ORDER: CatKey[] = ['organize', 'convert', 'optimize', 'create']

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/${tool.slug}`} className="group block">
      <div
        className="relative bg-white rounded-2xl p-6 border border-slate-200 shadow-card transition-all duration-200 h-full overflow-hidden hover:-translate-y-1.5"
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = tool.iconColor
          e.currentTarget.style.boxShadow = `0 12px 28px ${tool.iconColor}33`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#e2e8f0'
          e.currentTarget.style.boxShadow = ''
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200 shadow-md"
          style={{ backgroundColor: tool.iconColor, opacity: 0.92 }}
        >
          <ToolIcon name={tool.icon} color="#ffffff" size={22} />
        </div>
        <h3 className="font-display font-800 text-lg text-slate-900 mb-1.5 tracking-tight">
          {tool.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity">
          Open tool <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

function AdBox({ label }: { label: string }) {
  return null
}

export default function ToolGrid() {
  const [active, setActive] = useState<'all' | CatKey>('all')

  const visibleCats = active === 'all' ? CAT_ORDER : [active]

  return (
    <section id="tools" className="bg-slate-100 py-10 lg:py-14">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
              active === 'all'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-200'
                : 'bg-white text-slate-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600'
            }`}
          >
            All Tools
          </button>
          {CAT_ORDER.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-200'
                  : 'bg-white text-slate-600 border border-surface-200 hover:border-brand-300 hover:text-brand-600'
              }`}
            >
              {categories[cat].label}
            </button>
          ))}
        </div>

        <div className="flex gap-6">

          <div className="hidden xl:flex flex-col gap-4 w-36 flex-shrink-0">
            <AdBox label="Left Top" />
            <AdBox label="Left Mid" />
          </div>

          <div className="flex-1 min-w-0">
            {visibleCats.map(cat => {
              const { label, description } = categories[cat]
              const catTools = getToolsByCategory(cat)
              if (catTools.length === 0) return null
              return (
                <div key={cat} className="mb-12 last:mb-0">
                  <div className="flex items-baseline gap-3 mb-5">
                    <h3 className="font-display font-600 text-xl text-slate-800">{label}</h3>
                    <span className="text-sm text-slate-400">{description}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {catTools.map(tool => (
                      <ToolCard key={tool.slug} tool={tool} />
                    ))}
                  </div>
                </div>
              )
            })}

            <div className="mt-12">
              <AdBox label="Bottom Banner" />
            </div>
          </div>

          <div className="hidden xl:flex flex-col gap-4 w-36 flex-shrink-0">
            <AdBox label="Right Top" />
            <AdBox label="Right Mid" />
          </div>

        </div>
      </div>
    </section>
  )
}
