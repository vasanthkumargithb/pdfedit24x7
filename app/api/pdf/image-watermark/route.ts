import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]

    if (files.length < 2) {
      return NextResponse.json({ error: 'Upload PDF + Image' }, { status: 400 })
    }

    const pdfFile = files.find(f => f.type === 'application/pdf')
    const imageFile = files.find(f => f.type.startsWith('image/'))

    if (!pdfFile || !imageFile) {
      return NextResponse.json({ error: 'Missing PDF or Image' }, { status: 400 })
    }

    const pdfBytes = await pdfFile.arrayBuffer()
    const imgBytes = await imageFile.arrayBuffer()

    const pdfDoc = await PDFDocument.load(pdfBytes)

    let image
    if (imageFile.type === 'image/png') {
      image = await pdfDoc.embedPng(imgBytes)
    } else {
      image = await pdfDoc.embedJpg(imgBytes)
    }

    const pages = pdfDoc.getPages()

    pages.forEach(page => {
      const { width, height } = page.getSize()

      page.drawImage(image, {
        x: width / 2 - 50,
        y: height / 2 - 50,
        width: 100,
        height: 100,
        opacity: 0.3,
      })
    })

    const result = await pdfDoc.save()

    return new NextResponse(Buffer.from(result), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="image-watermark.pdf"',
      },
    })

  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Image watermark failed' }, { status: 500 })
  }
}