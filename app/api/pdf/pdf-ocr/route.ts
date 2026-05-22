export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import pdfParse from 'pdf-parse'

// Strip characters WinAnsi/Helvetica can't encode (Kannada, Hindi, Arabic, etc.)
function sanitizeText(text: string): string {
  return text
    .split('')
    .filter(ch => {
      const code = ch.charCodeAt(0)
      // Only allow printable ASCII (32–126) + common Latin extended (160–255)
      // Block control chars (0–31), DEL (127), and anything above 255
      return (code >= 32 && code <= 126) || (code >= 160 && code <= 255)
    })
    .join('')
    .replace(/\s+/g, ' ')
    .trim()
}
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No PDF provided.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const data = await pdfParse(buffer)
    const text = data.text || ''

    if (!text.trim()) {
      return NextResponse.json({ error: 'No text found in PDF.' }, { status: 400 })
    }

    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const lines = text.split('\n').filter((l: string) => l.trim())
    const linesPerPage = 45
    const chunks = []

    for (let i = 0; i < lines.length; i += linesPerPage) {
      chunks.push(lines.slice(i, i + linesPerPage))
    }

    for (const chunk of chunks) {
      const page = pdfDoc.addPage([595, 842])
      let y = 800
      for (const line of chunk) {
        const safeLine = sanitizeText(line.slice(0, 100))
        if (!safeLine) { y -= 16; continue }
        page.drawText(safeLine, {
          x: 30, y,
          size: 11, font,
          color: rgb(0, 0, 0),
        })
        y -= 16
      }
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="searchable.pdf"',
      },
    })
  } catch (err) {
    console.error('PDF OCR error:', err)
    return NextResponse.json({ error: 'Failed. Please try again.' }, { status: 500 })
  }
}
