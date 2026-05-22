export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

interface TextAnnotation {
  type: 'text'
  x: number; y: number
  text: string; fontSize: number; color: string
  pageIndex: number
}

interface SignatureAnnotation {
  type: 'signature'
  x: number; y: number
  width: number; height: number
  dataUrl: string
  pageIndex: number
}

interface RectAnnotation {
  type: 'rectangle'
  x: number; y: number
  width: number; height: number
  color: string
  pageIndex: number
}

type Annotation = TextAnnotation | SignatureAnnotation | RectAnnotation

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  return rgb(r, g, b)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const annotationsRaw = formData.get('annotations') as string

    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const annotations: Annotation[] = JSON.parse(annotationsRaw || '[]')
    const buffer = Buffer.from(await file.arrayBuffer())
    const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true })
    const pages = pdfDoc.getPages()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    for (const ann of annotations) {
      const page = pages[ann.pageIndex]
      if (!page) continue
      const { width: pw, height: ph } = page.getSize()

      if (ann.type === 'text') {
        const x = (ann.x / 100) * pw
        const y = ph - (ann.y / 100) * ph
        page.drawText(ann.text, {
          x, y,
          size: ann.fontSize,
          font,
          color: hexToRgb(ann.color),
        })
      }

      if (ann.type === 'rectangle') {
        const x = (ann.x / 100) * pw
        const y = ph - ((ann.y + ann.height) / 100) * ph
        const w = (ann.width / 100) * pw
        const h = (ann.height / 100) * ph
        const c = hexToRgb(ann.color)
        page.drawRectangle({
          x, y, width: w, height: h,
          borderColor: c,
          borderWidth: 1.5,
          color: rgb(c.red, c.green, c.blue),
          opacity: 0.15,
        })
      }

      if (ann.type === 'signature') {
        const base64 = ann.dataUrl.replace(/^data:image\/png;base64,/, '')
        const imgBytes = Buffer.from(base64, 'base64')
        const img = await pdfDoc.embedPng(imgBytes)
        const x = (ann.x / 100) * pw
        const y = ph - ((ann.y + ann.height) / 100) * ph
        const w = (ann.width / 100) * pw
        const h = (ann.height / 100) * ph
        page.drawImage(img, { x, y, width: w, height: h })
      }
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="edited.pdf"',
      },
    })
  } catch (err) {
    console.error('edit-apply error:', err)
    return NextResponse.json({ error: 'Failed to apply edits' }, { status: 500 })
  }
}
