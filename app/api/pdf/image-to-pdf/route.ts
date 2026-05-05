import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import sharp from 'sharp'

const SUPPORTED = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff']

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const pageSize = (formData.get('pageSize') as string) || 'fit'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No image files provided.' }, { status: 400 })
    }

    const pdfDoc = await PDFDocument.create()

    for (const file of files) {
      if (!SUPPORTED.includes(file.type)) {
        return NextResponse.json(
          { error: `Unsupported image type: ${file.type}. Use JPG, PNG, WebP, or TIFF.` },
          { status: 400 }
        )
      }

      const rawBytes = Buffer.from(await file.arrayBuffer())

      // pdf-lib only supports JPEG and PNG natively — convert everything else via sharp
      let image
      if (file.type === 'image/jpeg') {
        image = await pdfDoc.embedJpg(new Uint8Array(rawBytes))
      } else {
        const pngBytes = await sharp(rawBytes).png().toBuffer()
        image = await pdfDoc.embedPng(new Uint8Array(pngBytes))
      }

      const { width: imgW, height: imgH } = image

      let pageW: number
      let pageH: number

      if (pageSize === 'a4') {
        pageW = 595
        pageH = 842
      } else if (pageSize === 'letter') {
        pageW = 612
        pageH = 792
      } else {
        // 'fit' — page matches image dimensions exactly
        pageW = imgW
        pageH = imgH
      }

      const page = pdfDoc.addPage([pageW, pageH])
      const scale = Math.min(pageW / imgW, pageH / imgH)
      const scaledW = imgW * scale
      const scaledH = imgH * scale
      const x = (pageW - scaledW) / 2
      const y = (pageH - scaledH) / 2

      page.drawImage(image, { x, y, width: scaledW, height: scaledH })
    }

    const pdfBytes = await pdfDoc.save()
    const outputBuffer = Buffer.from(pdfBytes)

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="images.pdf"',
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Image-to-PDF error:', err)
    return NextResponse.json({ error: 'Failed to convert images to PDF.' }, { status: 500 })
  }
}