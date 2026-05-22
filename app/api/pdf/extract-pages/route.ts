import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('files') as File
    const pagesInput = formData.get('pages') as string

    const pageNumbers = pagesInput
      .split(',')
      .map(p => parseInt(p.trim()) - 1)
      .filter(n => !isNaN(n))

    const bytes = await file.arrayBuffer()
    const srcPdf = await PDFDocument.load(bytes)
    const newPdf = await PDFDocument.create()

    const pages = await newPdf.copyPages(srcPdf, pageNumbers)

    pages.forEach(p => newPdf.addPage(p))

    const result = await newPdf.save()

    return new NextResponse(Buffer.from(result), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="extracted.pdf"',
      },
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Extract failed' }, { status: 500 })
  }
}
