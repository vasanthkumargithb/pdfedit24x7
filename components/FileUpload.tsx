'use client'
import { useCallback, useState, useRef } from 'react'
import { Upload, X, File, CheckCircle, AlertCircle, Download, Loader2, GripVertical } from 'lucide-react'
import { formatBytes } from '@/lib/tools'
import type { Tool } from '@/lib/tools'
import ToolOptions from './ToolOptions'

type Status = 'idle' | 'uploading' | 'processing' | 'done' | 'error'

interface UploadedFile {
  file: File
  id: string
  preview?: string
}

interface FileUploadProps {
  tool: Tool
}

export default function FileUpload({ tool }: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [status, setStatus] = useState<Status>('idle')
  const [progress, setProgress] = useState(0)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)
  const [downloadName, setDownloadName] = useState('processed.pdf')
  const [multiDownloads, setMultiDownloads] = useState<{ url: string; name: string }[]>([])
  const [errorMsg, setErrorMsg] = useState('')
  const [originalSize, setOriginalSize] = useState<string | null>(null)
  const [newSize, setNewSize] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [options, setOptions] = useState<Record<string, string>>({})
  const [reorderFrom, setReorderFrom] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOptionChange = (key: string, value: string) => {
    setOptions(prev => ({ ...prev, [key]: value }))
  }

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles)
    const validFiles: UploadedFile[] = []
    let err = ''

    for (const file of arr) {
      if (file.size > tool.maxSize) {
        err = `"${file.name}" is too large. Max size: ${formatBytes(tool.maxSize)}`
        continue
      }
      if (files.length + validFiles.length >= tool.maxFiles) {
        err = `Max ${tool.maxFiles} file(s) allowed`
        break
      }
      validFiles.push({
        file,
        id: Math.random().toString(36).slice(2),
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      })
    }

    if (err) setErrorMsg(err)
    setFiles(prev => [...prev, ...validFiles])
    setStatus('idle')
    setDownloadUrl(null)
  }, [files.length, tool])

  const removeFile = (id: string) => {
    setFiles(prev => {
      const f = prev.find(f => f.id === id)
      if (f?.preview) URL.revokeObjectURL(f.preview)
      return prev.filter(f => f.id !== id)
    })
  }

  const handleFileDrop = (targetId: string) => {
    if (!reorderFrom || reorderFrom === targetId) return
    setFiles(prev => {
      const arr = [...prev]
      const fromIdx = arr.findIndex(f => f.id === reorderFrom)
      const toIdx = arr.findIndex(f => f.id === targetId)
      const [moved] = arr.splice(fromIdx, 1)
      arr.splice(toIdx, 0, moved)
      return arr
    })
    setReorderFrom(null)
  }

  const handleZoneDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    addFiles(e.dataTransfer.files)
  }, [addFiles])

  const getOutputMeta = () => {
  switch (tool.slug) {
    case 'pdf-to-jpg':   return { name: 'converted.jpg',  mime: 'image/jpeg' }
    case 'pdf-to-word':  return { name: 'converted.docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
    case 'pdf-to-ppt':   return { name: 'converted.pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
    case 'pdf-to-excel': return { name: 'converted.xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    case 'ppt-to-pdf':   return { name: 'converted.pdf',  mime: 'application/pdf' }
    case 'excel-to-pdf': return { name: 'converted.pdf',  mime: 'application/pdf' }
    case 'word-to-pdf':  return { name: 'converted.pdf',  mime: 'application/pdf' }
    default:             return { name: `${tool.slug}.pdf`, mime: 'application/pdf' }
  }
}

  const handleProcess = async () => {
    if (files.length === 0) return
    setStatus('uploading')
    setProgress(10)
    setErrorMsg('')

    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f.file))
      Object.entries(options).forEach(([k, v]) => formData.append(k, v))

      const tick = setInterval(() => setProgress(p => p >= 85 ? 85 : p + Math.random() * 12), 350)
      setStatus('processing')

      const res = await fetch(`/api/pdf/${tool.action}`, { method: 'POST', body: formData })
      setOriginalSize(res.headers.get("X-Original-Size"))
      setNewSize(res.headers.get("X-New-Size"))
      clearInterval(tick)
      setProgress(100)

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Processing failed. Please try again.')
      }

      const contentType = res.headers.get('content-type') || ''

      // PDF→JPG returns JSON with all pages as base64
      if (contentType.includes('application/json')) {
        const data = await res.json()
        if (data.pages) {
          const downloads = data.pages.map((p: { filename: string; data: string }) => ({
            url: `data:image/jpeg;base64,${p.data}`,
            name: p.filename,
          }))
          setMultiDownloads(downloads)
          setStatus('done')
          return
        }
      }

      const blob = await res.blob()
      const { name } = getOutputMeta()
      setDownloadUrl(URL.createObjectURL(blob))
      setDownloadName(name)
      setStatus('done')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Unexpected error occurred.')
      setProgress(0)
    }
  }

  const reset = () => {
    files.forEach(f => f.preview && URL.revokeObjectURL(f.preview))
    if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    setFiles([])
    setStatus('idle')
    setProgress(0)
    setDownloadUrl(null)
    setMultiDownloads([])
    setErrorMsg('')
    setOptions({})
  }

  const isProcessing = status === 'uploading' || status === 'processing'
  const canAddMore = tool.maxFiles > 1 && files.length < tool.maxFiles && !isProcessing

  return (
    <div className="w-full">

      {/* Empty Drop Zone */}
      {files.length === 0 && (
        <div
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={e => e.preventDefault()}
          onDrop={handleZoneDrop}
          onClick={() => inputRef.current?.click()}
          className={`cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-200 p-12 text-center select-none
            ${isDragging
              ? 'border-brand-400 bg-brand-50 scale-[1.01] shadow-glow'
              : 'border-surface-200 bg-surface-50 hover:border-brand-300 hover:bg-brand-50/40'}`}
        >
          <input ref={inputRef} type="file" accept={tool.accept} multiple={tool.maxFiles > 1}
            onChange={e => e.target.files && addFiles(e.target.files)} />
          <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-all
            ${isDragging ? 'bg-brand-100 scale-110' : 'bg-white border border-surface-200 shadow-card'}`}>
            <Upload className={`w-7 h-7 ${isDragging ? 'text-brand-600' : 'text-slate-400'}`} />
          </div>
          <h3 className="font-display font-600 text-lg text-slate-800 mb-2">
            {isDragging ? 'Drop your file here' : 'Select or drop files here'}
          </h3>
          <p className="text-sm text-slate-400 mb-5">
            {tool.accept.split(',').map(t => t.split('/').pop()?.toUpperCase()).filter(Boolean).join(', ')} · up to {formatBytes(tool.maxSize)}
            {tool.maxFiles > 1 ? ` · max ${tool.maxFiles} files` : ''}
          </p>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors shadow-sm">
            <Upload className="w-3.5 h-3.5" />
            Choose File{tool.maxFiles > 1 ? 's' : ''}
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && status !== 'done' && (
        <div className="mb-5 space-y-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {files.length} file{files.length > 1 ? 's' : ''} selected
              {tool.maxFiles > 1 && ' · drag to reorder'}
            </span>
            {!isProcessing && (
              <button onClick={reset} className="text-xs text-slate-400 hover:text-red-500 transition-colors">Clear all</button>
            )}
          </div>

          {files.map(f => (
            <div
              key={f.id}
              draggable={tool.maxFiles > 1 && !isProcessing}
              onDragStart={() => setReorderFrom(f.id)}
              onDragOver={e => e.preventDefault()}
              onDrop={() => handleFileDrop(f.id)}
              className={`flex items-center gap-3 p-3 bg-white border rounded-xl shadow-card transition-all
                ${reorderFrom === f.id ? 'opacity-50' : ''}
                ${tool.maxFiles > 1 && !isProcessing ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{ borderColor: reorderFrom && reorderFrom !== f.id ? '#bbd5ff' : '' }}
            >
              {tool.maxFiles > 1 && <GripVertical className="w-4 h-4 text-slate-300 flex-shrink-0" />}
              {f.preview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={f.preview} alt="" className="w-10 h-10 rounded-lg object-cover border border-surface-100 flex-shrink-0" />
                : <div className="w-10 h-10 bg-surface-50 rounded-lg border border-surface-100 flex items-center justify-center flex-shrink-0">
                    <File className="w-5 h-5 text-slate-300" />
                  </div>
              }
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-slate-800 truncate">{f.file.name}</div>
                <div className="text-xs text-slate-400">{formatBytes(f.file.size)}</div>
              </div>
              {!isProcessing && (
                <button onClick={() => removeFile(f.id)} className="p-1.5 rounded-lg hover:bg-surface-50 transition-colors">
                  <X className="w-4 h-4 text-slate-300 hover:text-slate-500" />
                </button>
              )}
            </div>
          ))}

          {canAddMore && (
            <>
              <button
                onClick={() => inputRef.current?.click()}
                className="w-full p-3 border border-dashed border-surface-200 rounded-xl text-sm text-slate-400 hover:border-brand-300 hover:text-brand-600 hover:bg-brand-50/30 transition-all"
              >
                + Add more files
              </button>
              <input ref={inputRef} type="file" accept={tool.accept} multiple
                onChange={e => e.target.files && addFiles(e.target.files)} />
            </>
          )}
        </div>
      )}

      {/* Tool-specific Options */}
      {files.length > 0 && !isProcessing && status !== 'done' && (
        <ToolOptions tool={tool} options={options} onChange={handleOptionChange} />
      )}

      {/* Progress Bar */}
      {isProcessing && (
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              {status === 'uploading' ? 'Uploading...' : 'Processing your file...'}
            </div>
            <span className="text-sm font-semibold text-brand-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
            <div className="h-full bg-brand-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-slate-400 mt-1.5">Processed securely — deleted automatically after 1 hour.</p>
        </div>
      )}

      {/* Success — single file */}
      {status === 'done' && downloadUrl && (
        <div className="text-center py-8 animate-fade-up">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="font-display font-600 text-xl text-slate-900 mb-1">Done! Your file is ready.</h3>
          <p className="text-sm text-slate-500 mb-6">The file will be removed from our servers within 1 hour.</p>
          {originalSize && newSize && (
            <div className="text-sm text-slate-400 mb-4">
            <p>Original: {formatBytes(Number(originalSize))}</p>
            <p>Processed: {formatBytes(Number(newSize))}</p>
          </div>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={downloadUrl}
              download={downloadName}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
            >
              <Download className="w-4 h-4" />
              Download {downloadName}
            </a>
            <button
              onClick={reset}
              className="px-6 py-3 bg-white text-slate-600 font-semibold rounded-xl border border-surface-200 hover:bg-surface-50 transition-colors"
            >
              Process Another File
            </button>
          </div>
        </div>
      )}

      {/* Success — multi-page (PDF to JPG) */}
      {status === 'done' && multiDownloads.length > 0 && (
        <div className="py-6 animate-fade-up">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="font-display font-600 text-lg text-slate-900">Done! {multiDownloads.length} page{multiDownloads.length > 1 ? 's' : ''} ready.</h3>
              <p className="text-xs text-slate-400">Click each page to download individually.</p>
            </div>
          </div>
          <div className="space-y-2 mb-5">
            {multiDownloads.map(({ url, name }) => (
              <a
                key={name}
                href={url}
                download={name}
                className="flex items-center gap-3 p-3 bg-white border border-surface-100 rounded-xl hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
              >
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Download className="w-4 h-4 text-amber-600 group-hover:text-emerald-600 transition-colors" />
                </div>
                <span className="text-sm font-medium text-slate-700">{name}</span>
                <span className="ml-auto text-xs text-emerald-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Download</span>
              </a>
            ))}
          </div>
          <button
            onClick={reset}
            className="w-full px-6 py-3 bg-white text-slate-600 font-semibold rounded-xl border border-surface-200 hover:bg-surface-50 transition-colors"
          >
            Process Another File
          </button>
        </div>
      )}

      {/* Error / Warning */}
      {errorMsg && (
        <div className={`mb-4 p-4 rounded-xl flex items-start gap-3 ${
          status === 'error' ? 'bg-red-50 border border-red-100' : 'bg-amber-50 border border-amber-100'
        }`}>
          <AlertCircle className={`w-5 h-5 flex-shrink-0 mt-0.5 ${status === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
          <div className="flex-1 text-sm">
            <div className={`font-semibold ${status === 'error' ? 'text-red-800' : 'text-amber-800'}`}>
              {status === 'error' ? 'Something went wrong' : 'Warning'}
            </div>
            <div className={status === 'error' ? 'text-red-600' : 'text-amber-700'}>{errorMsg}</div>
          </div>
          <button onClick={() => { setErrorMsg(''); if (status === 'error') setStatus('idle') }}>
            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      )}

      {/* Action Button */}
      {files.length > 0 && !isProcessing && status !== 'done' && (
        <button
          onClick={handleProcess}
          className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 active:scale-[0.99] transition-all shadow-sm"
        >
          {tool.title}
        </button>
      )}
    </div>
  )
}