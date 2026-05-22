import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { tools, categories, getToolsByCategory } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import { ToolIcon } from './Navbar'

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link href={`/${tool.slug}`} className="group block">
      <div className={`relative bg-white rounded-2xl p-5 border border-surface-100 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 h-full overflow-hidden`}>
        {/* Colored left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ backgroundColor: tool.iconColor }} />
        <div className={`w-11 h-11 rounded-xl ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
          <ToolIcon name={tool.icon} color={tool.iconColor} size={20} />
        </div>
        <h3 className="font-display font-600 text-[0.95rem] text-slate-900 mb-1.5">
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

// ✅ Ad placeholder — invisible until real AdSense code is added
function AdBox({ label }: { label: string }) {
  // Returns null (invisible) until you replace with real AdSense code
  return null

  /* 
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  REPLACE "return null" WITH THIS after Google AdSense approves you:

  return (
    <ins className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
      data-ad-slot="XXXXXXXXXX"
      data-ad-format="auto"
      data-full-width-responsive="true">
    </ins>
  )
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  */
}

export default function ToolGrid() {
  return (
    <section id="tools" className="bg-surface-50 py-20 lg:py-28">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            All PDF Tools
          </div>
          <h2 className="font-display font-700 text-3xl sm:text-4xl lg:text-5xl text-slate-900 mb-4">
            Everything You Need for PDFs
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A complete toolkit — no installation, no account. Works on any device.
          </p>
        </div>

        {/* ── 3-column layout: Left Ad | Tools | Right Ad ── */}
        <div className="flex gap-6">

          {/* Left Ad — hidden until AdSense is connected */}
          <div className="hidden xl:flex flex-col gap-4 w-36 flex-shrink-0">
            <AdBox label="Left Top" />
            <AdBox label="Left Mid" />
          </div>

          {/* Tool Grid — center */}
          <div className="flex-1 min-w-0">
            {(Object.entries(categories) as [keyof typeof categories, { label: string; description: string }][]).map(
              ([cat, { label, description }]) => {
                const catTools = getToolsByCategory(cat)
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
              }
            )}

            {/* Bottom ad — invisible until AdSense connected */}
            <div className="mt-12">
              <AdBox label="Bottom Banner" />
            </div>
          </div>

          {/* Right Ad — hidden until AdSense is connected */}
          <div className="hidden xl:flex flex-col gap-4 w-36 flex-shrink-0">
            <AdBox label="Right Top" />
            <AdBox label="Right Mid" />
          </div>

        </div>
      </div>
    </section>
  )
}
