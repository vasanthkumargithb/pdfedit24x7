'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { Upload, Type, PenTool, Square, Download, Trash2, RotateCcw, Check, X, ChevronLeft, ChevronRight } from 'lucide-react'

type Tool = 'select' | 'text' | 'signature' | 'rectangle'

interface TextAnnotation {
  id: string
  type: 'text'
  x: number
  y: number
  text: string
  fontSize: number
  color: string
  pageIndex: number
}

interface SignatureAnnotation {
  id: string
  type: 'signature'
  x: number
  y: number
  width: number
  height: number
  dataUrl: string
  pageIndex: number
}

interface RectAnnotation {
  id: string
  type: 'rectangle'
  x: number
  y: number
  width: number
  height: number
  color: string
  pageIndex: number
}

type Annotation = TextAnnotation | SignatureAnnotation | RectAnnotation

export default function EditPDF() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pageImages, setPageImages] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(0)
  const [activeTool, setActiveTool] = useState<Tool>('select')
  const [annotations, setAnnotations] = useState<Annotation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [textInput, setTextInput] = useState('')
  const [textColor, setTextColor] = useState('#000000')
  const [fontSize, setFontSize] = useState(16)
  const [rectColor, setRectColor] = useState('#FF0000')
  const [showSignaturePad, setShowSignaturePad] = useState(false)
  const [pendingClick, setPendingClick] = useState<{ x: number; y: number } | null>(null)
  const [showTextInput, setShowTextInput] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sigCanvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isDrawing = useRef(false)
  const sigLastPos = useRef<{ x: number; y: number } | null>(null)
  const sigHasDrawn = useRef(false)
  const rectStart = useRef<{ x: number; y: number } | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const uid = () => Math.random().toString(36).slice(2)

  // Load PDF pages via API
  const loadPDF = async (file: File) => {
    setIsLoading(true)
    setAnnotations([])
    setCurrentPage(0)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/pdf/render-pages', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Failed to render PDF')
      const { pages } = await res.json()
      setPageImages(pages)
    } catch (e) {
      console.error(e)
      alert('Failed to load PDF. Please try another file.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setPdfFile(file)
    loadPDF(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file && file.type === 'application/pdf') {
      setPdfFile(file)
      loadPDF(file)
    }
  }

  // Canvas click handler
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pageImages.length) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    if (activeTool === 'text') {
      setPendingClick({ x, y })
      setShowTextInput(true)
      setTextInput('')
    } else if (activeTool === 'signature') {
      setPendingClick({ x, y })
      setShowSignaturePad(true)
    } else if (activeTool === 'select') {
      setSelectedId(null)
    }
  }

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool !== 'rectangle') return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    rectStart.current = { x, y }
  }

  const handleCanvasMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool !== 'rectangle' || !rectStart.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x2 = ((e.clientX - rect.left) / rect.width) * 100
    const y2 = ((e.clientY - rect.top) / rect.height) * 100
    const { x, y } = rectStart.current
    const width = Math.abs(x2 - x)
    const height = Math.abs(y2 - y)
    if (width < 1 || height < 1) return
    const annotation: RectAnnotation = {
      id: uid(), type: 'rectangle',
      x: Math.min(x, x2), y: Math.min(y, y2),
      width, height, color: rectColor,
      pageIndex: currentPage,
    }
    setAnnotations(prev => [...prev, annotation])
    rectStart.current = null
  }

  const addTextAnnotation = () => {
    if (!textInput.trim() || !pendingClick) return
    const annotation: TextAnnotation = {
      id: uid(), type: 'text',
      x: pendingClick.x, y: pendingClick.y,
      text: textInput, fontSize, color: textColor,
      pageIndex: currentPage,
    }
    setAnnotations(prev => [...prev, annotation])
    setShowTextInput(false)
    setPendingClick(null)
    setTextInput('')
  }

  // Signature canvas
  const initSigCanvas = useCallback(() => {
    const canvas = sigCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 2.5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    sigHasDrawn.current = false
  }, [])

  useEffect(() => { if (showSignaturePad) setTimeout(initSigCanvas, 50) }, [showSignaturePad, initSigCanvas])

  const getSigPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect()
    const client = 'touches' in e ? e.touches[0] : e
    return { x: client.clientX - rect.left, y: client.clientY - rect.top }
  }

  const sigMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true
    const canvas = sigCanvasRef.current!
    sigLastPos.current = getSigPos(e.nativeEvent as MouseEvent, canvas)
  }

  const sigMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || !sigLastPos.current) return
    const canvas = sigCanvasRef.current!
    const ctx = canvas.getContext('2d')!
    const pos = getSigPos(e.nativeEvent as MouseEvent, canvas)
    ctx.beginPath()
    ctx.moveTo(sigLastPos.current.x, sigLastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
    sigLastPos.current = pos
    sigHasDrawn.current = true
  }

  const sigMouseUp = () => { isDrawing.current = false; sigLastPos.current = null }

  const saveSignature = () => {
    if (!sigHasDrawn.current || !pendingClick) return
    const canvas = sigCanvasRef.current!
    const dataUrl = canvas.toDataURL('image/png')
    const annotation: SignatureAnnotation = {
      id: uid(), type: 'signature',
      x: pendingClick.x, y: pendingClick.y,
      width: 25, height: 10,
      dataUrl, pageIndex: currentPage,
    }
    setAnnotations(prev => [...prev, annotation])
    setShowSignaturePad(false)
    setPendingClick(null)
  }

  const deleteSelected = () => {
    if (!selectedId) return
    setAnnotations(prev => prev.filter(a => a.id !== selectedId))
    setSelectedId(null)
  }

  const currentAnnotations = annotations.filter(a => a.pageIndex === currentPage)

  // Download
  const handleDownload = async () => {
    if (!pdfFile) return
    setIsDownloading(true)
    try {
      const formData = new FormData()
      formData.append('file', pdfFile)
      formData.append('annotations', JSON.stringify(annotations))
      formData.append('pageCount', String(pageImages.length))
      const res = await fetch('/api/pdf/edit-apply', { method: 'POST', body: formData })
      if (!res.ok) throw new Error('Failed')
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = pdfFile.name.replace('.pdf', '-edited.pdf')
      a.click()
    } catch {
      alert('Download failed. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const tools = [
    { id: 'select' as Tool, icon: <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 3l14 9-7 1-4 7z"/></svg>, label: 'Select' },
    { id: 'text' as Tool, icon: <Type className="w-4 h-4" />, label: 'Text' },
    { id: 'signature' as Tool, icon: <PenTool className="w-4 h-4" />, label: 'Sign' },
    { id: 'rectangle' as Tool, icon: <Square className="w-4 h-4" />, label: 'Shape' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col" style={{ fontFamily: 'system-ui, sans-serif' }}>

      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-3 flex items-center justify-between bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-sm font-bold">E</div>
          <div>
            <h1 className="font-bold text-base leading-none">Edit PDF</h1>
            <p className="text-xs text-slate-400 mt-0.5">Add text, signatures & shapes</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {selectedId && (
            <button onClick={deleteSelected} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-medium transition-colors">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          )}
          {pageImages.length > 0 && (
            <button onClick={handleDownload} disabled={isDownloading}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded-lg text-sm font-semibold transition-colors">
              <Download className="w-4 h-4" />
              {isDownloading ? 'Saving...' : 'Download PDF'}
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Toolbar */}
        {pageImages.length > 0 && (
          <aside className="w-48 border-r border-slate-800 bg-slate-900 flex flex-col p-3 gap-2">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Tools</p>
            {tools.map(t => (
              <button key={t.id} onClick={() => setActiveTool(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTool === t.id ? 'bg-violet-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}>
                {t.icon} {t.label}
              </button>
            ))}

            <div className="border-t border-slate-700 mt-2 pt-3 space-y-3">
              {activeTool === 'text' && (
                <>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Color</label>
                    <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                      className="w-full h-8 rounded cursor-pointer bg-slate-800 border border-slate-700" />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 block mb-1">Size: {fontSize}px</label>
                    <input type="range" min="10" max="48" value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                      className="w-full accent-violet-500" />
                  </div>
                </>
              )}
              {activeTool === 'rectangle' && (
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Color</label>
                  <input type="color" value={rectColor} onChange={e => setRectColor(e.target.value)}
                    className="w-full h-8 rounded cursor-pointer bg-slate-800 border border-slate-700" />
                </div>
              )}
              {activeTool === 'text' && <p className="text-xs text-slate-500">Click on the PDF to add text</p>}
              {activeTool === 'signature' && <p className="text-xs text-slate-500">Click on the PDF to place your signature</p>}
              {activeTool === 'rectangle' && <p className="text-xs text-slate-500">Click and drag on the PDF to draw a rectangle</p>}
            </div>

            {/* Page navigation */}
            {pageImages.length > 1 && (
              <div className="mt-auto border-t border-slate-700 pt-3">
                <p className="text-xs text-slate-400 mb-2">Page {currentPage + 1} of {pageImages.length}</p>
                <div className="flex gap-1">
                  <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded text-xs flex items-center justify-center">
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => setCurrentPage(p => Math.min(pageImages.length - 1, p + 1))} disabled={currentPage === pageImages.length - 1}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded text-xs flex items-center justify-center">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </aside>
        )}

        {/* Main canvas area */}
        <main className="flex-1 overflow-auto bg-slate-950 flex items-start justify-center p-8">
          {!pageImages.length ? (
            // Upload area
            <div
              onDrop={handleDrop}
              onDragOver={e => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
              className="w-full max-w-lg mt-16 border-2 border-dashed border-slate-700 hover:border-violet-500 rounded-2xl p-16 flex flex-col items-center gap-4 cursor-pointer transition-colors group"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800 group-hover:bg-violet-600/20 flex items-center justify-center transition-colors">
                <Upload className="w-7 h-7 text-slate-400 group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="text-center">
                <p className="font-semibold text-slate-200">Upload a PDF to edit</p>
                <p className="text-sm text-slate-500 mt-1">Drag & drop or click to browse</p>
              </div>
              {isLoading && <p className="text-sm text-violet-400 animate-pulse">Loading PDF pages...</p>}
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
            </div>
          ) : (
            // PDF canvas
            <div className="relative shadow-2xl"
              style={{ cursor: activeTool === 'text' ? 'text' : activeTool === 'signature' ? 'crosshair' : activeTool === 'rectangle' ? 'crosshair' : 'default' }}
              onClick={handleCanvasClick}
              onMouseDown={handleCanvasMouseDown}
              onMouseUp={handleCanvasMouseUp}
            >
              {/* PDF page image */}
              <img
                src={pageImages[currentPage]}
                alt={`Page ${currentPage + 1}`}
                className="block max-w-3xl w-full"
                draggable={false}
              />

              {/* Annotations overlay */}
              <div ref={overlayRef} className="absolute inset-0 pointer-events-none">
                {currentAnnotations.map(ann => {
                  if (ann.type === 'text') {
                    return (
                      <div key={ann.id}
                        className={`absolute pointer-events-auto cursor-pointer select-none px-1 rounded ${selectedId === ann.id ? 'ring-2 ring-violet-400' : 'hover:ring-1 hover:ring-violet-300'}`}
                        style={{ left: `${ann.x}%`, top: `${ann.y}%`, fontSize: ann.fontSize, color: ann.color, transform: 'translateY(-50%)' }}
                        onClick={e => { e.stopPropagation(); setSelectedId(ann.id) }}
                      >
                        {ann.text}
                      </div>
                    )
                  }
                  if (ann.type === 'signature') {
                    return (
                      <img key={ann.id} src={ann.dataUrl} alt="signature"
                        className={`absolute pointer-events-auto cursor-pointer ${selectedId === ann.id ? 'ring-2 ring-violet-400' : 'hover:ring-1 hover:ring-violet-300'}`}
                        style={{ left: `${ann.x}%`, top: `${ann.y}%`, width: `${ann.width}%`, height: `${ann.height}%` }}
                        onClick={e => { e.stopPropagation(); setSelectedId(ann.id) }}
                      />
                    )
                  }
                  if (ann.type === 'rectangle') {
                    return (
                      <div key={ann.id}
                        className={`absolute pointer-events-auto cursor-pointer ${selectedId === ann.id ? 'ring-2 ring-violet-400' : 'hover:ring-1 hover:ring-violet-300'}`}
                        style={{ left: `${ann.x}%`, top: `${ann.y}%`, width: `${ann.width}%`, height: `${ann.height}%`, border: `2px solid ${ann.color}`, backgroundColor: `${ann.color}22` }}
                        onClick={e => { e.stopPropagation(); setSelectedId(ann.id) }}
                      />
                    )
                  }
                  return null
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Text input modal */}
      {showTextInput && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-96 shadow-2xl border border-slate-700">
            <h3 className="font-bold text-lg mb-4">Add Text</h3>
            <textarea
              autoFocus
              value={textInput}
              onChange={e => setTextInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); addTextAnnotation() } }}
              placeholder="Type your text here..."
              rows={3}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 resize-none"
            />
            <div className="flex gap-2 mt-4">
              <button onClick={addTextAnnotation} className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Check className="w-4 h-4" /> Add Text
              </button>
              <button onClick={() => { setShowTextInput(false); setPendingClick(null) }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature pad modal */}
      {showSignaturePad && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 rounded-2xl p-6 w-[480px] shadow-2xl border border-slate-700">
            <h3 className="font-bold text-lg mb-3">Draw Signature</h3>
            <canvas
              ref={sigCanvasRef}
              width={420} height={180}
              className="w-full rounded-lg border-2 border-slate-600 bg-white cursor-crosshair"
              onMouseDown={sigMouseDown}
              onMouseMove={sigMouseMove}
              onMouseUp={sigMouseUp}
              onMouseLeave={sigMouseUp}
              onTouchStart={sigMouseDown}
              onTouchMove={sigMouseMove}
              onTouchEnd={sigMouseUp}
            />
            <div className="flex gap-2 mt-4">
              <button onClick={saveSignature} className="flex-1 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
                <Check className="w-4 h-4" /> Place Signature
              </button>
              <button onClick={initSigCanvas} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors flex items-center gap-1.5">
                <RotateCcw className="w-3.5 h-3.5" /> Clear
              </button>
              <button onClick={() => { setShowSignaturePad(false); setPendingClick(null) }}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
