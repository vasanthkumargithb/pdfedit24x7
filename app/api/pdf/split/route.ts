import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File
    const rangeStr = (formData.get('range') as string) || 'all'

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const srcPdf = await PDFDocument.load(arrayBuffer)
    const totalPages = srcPdf.getPageCount()

    // Parse page range string like "1-3,5,7-9"
    let pageIndices: number[] = []
    if (rangeStr === 'all') {
      pageIndices = Array.from({ length: totalPages }, (_, i) => i)
    } else {
      const parts = rangeStr.split(',').map(s => s.trim())
      for (const part of parts) {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(n => parseInt(n) - 1)
          for (let i = start; i <= Math.min(end, totalPages - 1); i++) {
            if (!pageIndices.includes(i)) pageIndices.push(i)
          }
        } else {
          const idx = parseInt(part) - 1
          if (idx >= 0 && idx < totalPages && !pageIndices.includes(idx)) {
            pageIndices.push(idx)
          }
        }
      }
    }

    if (pageIndices.length === 0) {
      return NextResponse.json({ error: 'No valid pages in the specified range.' }, { status: 400 })
    }

    // If only one page or a sub-range, return a single PDF
    const newPdf = await PDFDocument.create()
    const copiedPages = await newPdf.copyPages(srcPdf, pageIndices)
    copiedPages.forEach(page => newPdf.addPage(page))
    const pdfBytes = await newPdf.save()

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="split.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    })
  } catch (err) {
    console.error('Split error:', err)
    return NextResponse.json({ error: 'Failed to split PDF. Please ensure the file is a valid PDF.' }, { status: 500 })
  }
}

