import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('files') as File
    const pagesInput = formData.get('pages') as string

    const pagesToRemove = pagesInput
      .split(',')
      .map(p => parseInt(p.trim()) - 1)

    const bytes = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(bytes)

    const totalPages = pdfDoc.getPageCount()

    for (let i = pagesToRemove.length - 1; i >= 0; i--) {
      const pageIndex = pagesToRemove[i]
      if (pageIndex >= 0 && pageIndex < totalPages) {
        pdfDoc.removePage(pageIndex)
      }
    }

    const result = await pdfDoc.save()

    return new NextResponse(Buffer.from(result), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="updated.pdf"',
      },
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Remove pages failed' }, { status: 500 })
  }
}
