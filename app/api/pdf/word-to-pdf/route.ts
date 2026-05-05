/**
 * Word → PDF  (POST /api/pdf/word-to-pdf)
 * Uses LibreOffice if available, otherwise mammoth + pdf-lib fallback
 */

import { NextRequest, NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import mammoth from 'mammoth'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const execFileAsync = promisify(execFile)

const SOFFICE_PATHS = [
  'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
  'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
]

async function findLibreOffice(): Promise<string | null> {
  for (const p of SOFFICE_PATHS) {
    try { await readFile(p); return p } catch { }
  }
  return null
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No Word document provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())

    // ── Option A: LibreOffice ──────────────────────────────────────────────
    const sofficePath = await findLibreOffice()
    if (sofficePath) {
      try {
        const tmpIn = join(tmpdir(), `pdfpro-${Date.now()}.docx`)
        await writeFile(tmpIn, inputBuffer)
        await execFileAsync(sofficePath, ['--headless', '--convert-to', 'pdf', '--outdir', tmpdir(), tmpIn])
        const tmpOut = tmpIn.replace(/\.docx$/i, '.pdf')
        const outputBuffer = await readFile(tmpOut)
        await unlink(tmpIn).catch(() => {})
        await unlink(tmpOut).catch(() => {})
        const outputName = file.name.replace(/\.(doc|docx)$/i, '.pdf')
        return new NextResponse(outputBuffer, {
          status: 200,
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename="${outputName}"`,
            'Content-Length': outputBuffer.length.toString(),
          },
        })
      } catch (libreErr) {
        console.error('LibreOffice failed, falling back:', libreErr)
      }
    }

    // ── Option B: mammoth + pdf-lib fallback ───────────────────────────────
    const { value: html } = await mammoth.convertToHtml({ buffer: inputBuffer })

    const plainText = html
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/p>/gi, '\n')
      .replace(/<\/h[1-6]>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')

    const lines = plainText.split('\n').map((l: string) => l.trim())

    const pdfDoc = await PDFDocument.create()
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const pageWidth = 595
    const pageHeight = 842
    const margin = 50
    const lineHeight = 16
    const fontSize = 11
    const maxWidth = pageWidth - margin * 2

    let page = pdfDoc.addPage([pageWidth, pageHeight])
    let y = pageHeight - margin

    function wrapText(text: string, maxW: number, fSize: number, f: typeof font): string[] {
      const words = text.split(' ')
      const wrapped: string[] = []
      let current = ''
      for (const word of words) {
        const test = current ? `${current} ${word}` : word
        if (f.widthOfTextAtSize(test, fSize) > maxW) {
          if (current) wrapped.push(current)
          current = word
        } else {
          current = test
        }
      }
      if (current) wrapped.push(current)
      return wrapped.length ? wrapped : ['']
    }

    for (const line of lines) {
      if (!line) {
        y -= lineHeight / 2
        if (y < margin) { page = pdfDoc.addPage([pageWidth, pageHeight]); y = pageHeight - margin }
        continue
      }
      const isHeading = line.length < 100 && line === line.toUpperCase() && line.length > 2
      const currentFont = isHeading ? boldFont : font
      const currentSize = isHeading ? 13 : fontSize
      const wrapped = wrapText(line, maxWidth, currentSize, currentFont)
      for (const wLine of wrapped) {
        if (y < margin + lineHeight) { page = pdfDoc.addPage([pageWidth, pageHeight]); y = pageHeight - margin }
        page.drawText(wLine, { x: margin, y, size: currentSize, font: currentFont, color: rgb(0, 0, 0) })
        y -= lineHeight
      }
      if (isHeading) y -= 4
    }

    const pdfBytes = await pdfDoc.save()
    const outputBuffer = Buffer.from(pdfBytes)
    const outputName = file.name.replace(/\.(doc|docx)$/i, '.pdf')

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Word-to-PDF error:', err)
    return NextResponse.json({ error: 'Conversion failed. Please try again.' }, { status: 500 })
  }
}