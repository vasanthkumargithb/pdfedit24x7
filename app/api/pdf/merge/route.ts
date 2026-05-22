import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

// ✅ Removed deprecated `export const config` — not needed in App Router

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (!files || files.length < 2) {
      return NextResponse.json(
        { error: 'Please upload at least 2 PDF files to merge.' },
        { status: 400 }
      )
    }

    const mergedPdf = await PDFDocument.create()

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      // ✅ Validate each file is actually a PDF before trying to parse
      const arrayBuffer = await file.arrayBuffer()
      const bytes = new Uint8Array(arrayBuffer)
      const header = String.fromCharCode(...bytes.slice(0, 5))

      if (header !== '%PDF-') {
        return NextResponse.json(
          { error: `File "${file.name}" is not a valid PDF.` },
          { status: 400 }
        )
      }

      // ✅ ignoreEncryption handles password-protected PDFs gracefully
      const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true })
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach(page => mergedPdf.addPage(page))
    }

    const pdfBytes = await mergedPdf.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="merged.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    })
  } catch (err) {
    console.error('Merge error:', err)
    return NextResponse.json(
      { error: 'Failed to merge PDFs. Please ensure all files are valid PDFs.' },
      { status: 500 }
    )
  }
}
