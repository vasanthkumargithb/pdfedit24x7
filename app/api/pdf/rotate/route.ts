import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, degrees } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File
    // degrees to rotate: 90, 180, 270 (clockwise)
    const rotation = parseInt((formData.get('rotation') as string) || '90')

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    if (![90, 180, 270].includes(rotation)) {
      return NextResponse.json({ error: 'Rotation must be 90, 180, or 270 degrees.' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const pdfDoc = await PDFDocument.load(arrayBuffer)
    const pages = pdfDoc.getPages()

    pages.forEach(page => {
      const currentRotation = page.getRotation().angle
      page.setRotation(degrees((currentRotation + rotation) % 360))
    })

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="rotated.pdf"',
        'Content-Length': pdfBytes.length.toString(),
      },
    })
  } catch (err) {
    console.error('Rotate error:', err)
    return NextResponse.json({ error: 'Failed to rotate PDF.' }, { status: 500 })
  }
}

