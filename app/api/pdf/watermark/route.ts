import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, degrees } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File
    const text = (formData.get('text') as string) || 'PDFPRO'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(bytes)

    const pages = pdfDoc.getPages()

    pages.forEach(page => {
      const { width, height } = page.getSize()

      page.drawText(text, {
        x: width / 4,
        y: height / 2,
        size: 40,
        rotate: degrees(45),
        color: rgb(0.7, 0.7, 0.7),
        opacity: 0.5,
      })
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
        headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="watermarked.pdf"',
        },
    })

  } catch (err) {
    console.error('Watermark error:', err)
    return NextResponse.json({ error: 'Watermark failed' }, { status: 500 })
  }
}