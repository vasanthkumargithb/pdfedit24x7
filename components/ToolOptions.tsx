'use client'

/**
 * ToolOptions — renders tool-specific controls that appear above the action button.
 * Merge: file reorder hint
 * Split: page range input
 * Rotate: degree selector
 * Image-to-PDF: page size selector
 * Compress: quality level radio
 */

import type { Tool } from '@/lib/tools'

interface ToolOptionsProps {
  tool: Tool
  options: Record<string, string>
  onChange: (key: string, value: string) => void
}

export default function ToolOptions({ tool, options, onChange }: ToolOptionsProps) {
  switch (tool.slug) {
    case 'split-pdf':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Pages to Extract
          </label>
          <input
            type="text"
            value={options.range ?? 'all'}
            onChange={e => onChange('range', e.target.value)}
            placeholder="all  or  1-3,5,8-10"
            className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all font-mono"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Examples: <code className="bg-surface-100 px-1 rounded">all</code> · <code className="bg-surface-100 px-1 rounded">1-5</code> · <code className="bg-surface-100 px-1 rounded">2,4,6</code> · <code className="bg-surface-100 px-1 rounded">1-3,7,10-12</code>
          </p>
        </div>
      )

    case 'rotate-pdf':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-3">Rotation</label>
          <div className="flex gap-2">
            {[
              { value: '90', label: '90° →', icon: '↻' },
              { value: '180', label: '180°', icon: '↺↺' },
              { value: '270', label: '90° ←', icon: '↺' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange('rotation', opt.value)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-semibold border transition-all ${
                  (options.rotation ?? '90') === opt.value
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300 hover:text-brand-600'
                }`}
              >
                <span className="block text-base leading-none mb-0.5">{opt.icon}</span>
                <span className="text-xs">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )

    case 'image-to-pdf':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-3">Page Size</label>
          <div className="flex gap-2">
            {[
              { value: 'fit', label: 'Fit Image', desc: 'Page = image size' },
              { value: 'a4', label: 'A4', desc: '210 × 297 mm' },
              { value: 'letter', label: 'Letter', desc: '8.5 × 11 in' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange('pageSize', opt.value)}
                className={`flex-1 py-2.5 px-2 rounded-lg text-center border transition-all ${
                  (options.pageSize ?? 'fit') === opt.value
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300'
                }`}
              >
                <div className="text-sm font-semibold">{opt.label}</div>
                <div className={`text-xs mt-0.5 ${(options.pageSize ?? 'fit') === opt.value ? 'text-brand-200' : 'text-slate-400'}`}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )

    case 'compress-pdf':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-3">Compression Level</label>
          <div className="space-y-2">
            {[
              { value: 'low', label: 'Low Compression', desc: 'Best quality, slightly smaller file' },
              { value: 'medium', label: 'Medium (Recommended)', desc: 'Good balance of size and quality' },
              { value: 'high', label: 'High Compression', desc: 'Smallest file size, slightly reduced quality' },
            ].map(opt => (
              <label
                key={opt.value}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  (options.quality ?? 'medium') === opt.value
                    ? 'bg-brand-50 border-brand-200'
                    : 'bg-white border-surface-200 hover:border-surface-300'
                }`}
              >
                <input
                  type="radio"
                  name="quality"
                  value={opt.value}
                  checked={(options.quality ?? 'medium') === opt.value}
                  onChange={() => onChange('quality', opt.value)}
                  className="mt-0.5 accent-brand-600"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-800">{opt.label}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )

    case 'pdf-to-jpg':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-3">Image Quality (DPI)</label>
          <div className="flex gap-2">
            {[
              { value: '72', label: '72 DPI', desc: 'Web' },
              { value: '150', label: '150 DPI', desc: 'Standard' },
              { value: '300', label: '300 DPI', desc: 'Print' },
            ].map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange('dpi', opt.value)}
                className={`flex-1 py-2.5 px-2 rounded-lg text-center border transition-all ${
                  (options.dpi ?? '150') === opt.value
                    ? 'bg-brand-600 text-white border-brand-600'
                    : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300'
                }`}
              >
                <div className="text-sm font-semibold">{opt.label}</div>
                <div className={`text-xs mt-0.5 ${(options.dpi ?? '150') === opt.value ? 'text-brand-200' : 'text-slate-400'}`}>
                  {opt.desc}
                </div>
              </button>
            ))}
          </div>
        </div>
      )

    case 'protect-pdf':
      return (
        <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-2">
            Password
          </label>
          <input
            type="password"
            value={options.password ?? ''}
            onChange={e => onChange('password', e.target.value)}
            placeholder="Enter a password"
            className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            Anyone opening this PDF will need this password.
          </p>
        </div>
      )
       case 'watermark-pdf':
        return (
          <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
          <label className="block text-xs font-semibold text-slate-600 mb-2">
           Watermark Text
          </label>
          <input
            type="text"
            value={options.text ?? ''}
            onChange={(e) => onChange('text', e.target.value)}
            placeholder="Enter watermark text"
            className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
          />
          <p className="mt-1.5 text-xs text-slate-400">
            This text will appear on all pages.
          </p>
        </div>
      )

      case 'remove-pages':
       return (
        <div className="mb-4">
        <label className="block text-sm mb-1">Pages to remove</label>
        <input
         type="text"
         placeholder="Example: 1,3,5"
          className="w-full border p-2 rounded"
          onChange={(e) => onChange('pages', e.target.value)}
         />
        </div>
      )

      case 'image-watermark':
        return (
         <div className="mb-4 text-sm text-gray-600">
          Upload a PDF and an image (logo).
        </div>
     )

      case 'extract-pages':
        return (
        <div className="mb-4">
         <label className="block text-sm mb-1">Pages to extract</label>
         <input
         type="text"
         placeholder="Example: 1,3,5"
         className="w-full border p-2 rounded"
         onChange={(e) => onChange('pages', e.target.value)}
        />
        </div>
     )

      
    case 'page-numbers':
      return (
        <div className="mb-5 space-y-4">
          <div className="p-4 bg-surface-50 rounded-xl border border-surface-100">
            <label className="block text-xs font-semibold text-slate-600 mb-3">Position</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'top-left', label: 'Top Left' },
                { value: 'top-center', label: 'Top Center' },
                { value: 'top-right', label: 'Top Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
                { value: 'bottom-center', label: 'Bottom Center' },
                { value: 'bottom-right', label: 'Bottom Right' },
              ].map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange('position', opt.value)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                    (options.position ?? 'bottom-center') === opt.value
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-surface-50 rounded-xl border border-surface-100">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Start at</label>
              <input
                type="number"
                min="0"
                value={options.startNum ?? '1'}
                onChange={e => onChange('startNum', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:border-brand-400 transition-all"
              />
            </div>
            <div className="p-4 bg-surface-50 rounded-xl border border-surface-100">
              <label className="block text-xs font-semibold text-slate-600 mb-2">Font size</label>
              <input
                type="number"
                min="8"
                max="24"
                value={options.fontSize ?? '12'}
                onChange={e => onChange('fontSize', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-surface-200 rounded-lg focus:outline-none focus:border-brand-400 transition-all"
              />
            </div>
          </div>
        </div>
      )

      case 'image-enhance':
  return (
    <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
      <label className="block text-xs font-semibold text-slate-600 mb-3">Enhancement Mode</label>
      <div className="grid grid-cols-2 gap-2">
        {[
          { value: 'auto',    label: '⚡ Auto Fix',        desc: 'Smart document fix' },
          { value: 'shadow', label: '🌟 Remove Shadow', desc: 'Remove dark edges & shadows' },
          { value: 'enhance', label: '🔆 High Contrast',   desc: 'Darker text, whiter background' },
          { value: 'bw',      label: '⬛ Black & White',   desc: 'Pure B&W document' },
        ].map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange('mode', opt.value)}
            className={`p-3 rounded-lg border text-left transition-all ${
              (options.mode ?? 'auto') === opt.value
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300'
            }`}
          >
            <div className="text-sm font-semibold">{opt.label}</div>
            <div className={`text-xs mt-0.5 ${(options.mode ?? 'auto') === opt.value ? 'text-brand-200' : 'text-slate-400'}`}>
              {opt.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

  // Add this case to ToolOptions.tsx before default: return null

case 'auto-edge-detect':
  return (
    <div className="mb-5 p-4 bg-surface-50 rounded-xl border border-surface-100">
      <label className="block text-xs font-semibold text-slate-600 mb-3">Output Format</label>
      <div className="flex gap-3">
        {[
          { value: 'pdf', label: '📄 Save as PDF', desc: 'Best for documents' },
          { value: 'jpg', label: '🖼️ Save as JPG', desc: 'Best for images' },
        ].map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange('output', opt.value)}
            className={`flex-1 p-3 rounded-lg border text-left transition-all ${
              (options.output ?? 'pdf') === opt.value
                ? 'bg-brand-600 text-white border-brand-600'
                : 'bg-white text-slate-600 border-surface-200 hover:border-brand-300'
            }`}
          >
            <div className="text-sm font-semibold">{opt.label}</div>
            <div className={`text-xs mt-0.5 ${(options.output ?? 'pdf') === opt.value ? 'text-brand-200' : 'text-slate-400'}`}>
              {opt.desc}
            </div>
          </button>
        ))}
      </div>
    </div>
  )

    default:
      return null
  }
}
