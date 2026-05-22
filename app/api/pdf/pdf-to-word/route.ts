export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx'
import pdfParse from 'pdf-parse'

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())

    // ── Extract text from PDF ──────────────────────────────────────────────
    let extractedText = ''
    try {
      const data = await pdfParse(inputBuffer)
      extractedText = data.text || ''
    } catch (parseErr) {
      console.error('pdf-parse error:', parseErr)
      extractedText = ''
    }

    // ── Build DOCX from extracted text ─────────────────────────────────────
    const lines = extractedText
      .split('\n')
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 0)

    const paragraphs = lines.map((line: string) => {
      const isHeading = line.length < 80 && line === line.toUpperCase() && line.length > 3

      if (isHeading) {
        return new Paragraph({
          text: line,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
        })
      }

      return new Paragraph({
        children: [
          new TextRun({
            text: line,
            size: 24,
          }),
        ],
        spacing: { after: 120 },
      })
    })

    if (paragraphs.length === 0) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: 'No text could be extracted from this PDF.', size: 24 })],
        })
      )
    }

    const doc = new Document({
      sections: [{ properties: {}, children: paragraphs }],
    })

    const docxBuffer = Buffer.from(await Packer.toBuffer(doc))
    const outputName = file.name.replace(/\.pdf$/i, '.docx')

    return new NextResponse(docxBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': docxBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('PDF-to-Word error:', err)
    return NextResponse.json({ error: 'Conversion failed. Please try again.' }, { status: 500 })
  }
}
