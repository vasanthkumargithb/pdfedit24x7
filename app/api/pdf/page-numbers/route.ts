import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null
    const position = (formData.get('position') as string) || 'bottom-center'
    const startNum = parseInt((formData.get('startNum') as string) || '1')
    const fontSize = parseInt((formData.get('fontSize') as string) || '12')

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const pdfDoc = await PDFDocument.load(inputBuffer)
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
    const pages = pdfDoc.getPages()
    const margin = 30

    console.log(`Adding page numbers to ${pages.length} pages, position: ${position}, fontSize: ${fontSize}`)

    pages.forEach((page, i) => {
      const { width, height } = page.getSize()
      const label = String(startNum + i)
      const textWidth = font.widthOfTextAtSize(label, fontSize)

      let x: number
      let y: number

      switch (position) {
        case 'bottom-left':
          x = margin
          y = margin
          break
        case 'bottom-right':
          x = width - textWidth - margin
          y = margin
          break
        case 'top-left':
          x = margin
          y = height - margin - fontSize
          break
        case 'top-center':
          x = (width - textWidth) / 2
          y = height - margin - fontSize
          break
        case 'top-right':
          x = width - textWidth - margin
          y = height - margin - fontSize
          break
        default: // bottom-center
          x = (width - textWidth) / 2
          y = margin
      }

      // Clamp to page bounds just in case
      x = Math.max(5, Math.min(x, width - textWidth - 5))
      y = Math.max(5, Math.min(y, height - fontSize - 5))

      console.log(`Page ${i + 1}: label="${label}", x=${x.toFixed(1)}, y=${y.toFixed(1)}, pageSize=${width.toFixed(0)}x${height.toFixed(0)}`)

      page.drawText(label, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(0, 0, 0), // pure black
        opacity: 1,
      })
    })

    const pdfBytes = await pdfDoc.save()
    const outputBuffer = Buffer.from(pdfBytes)
    const outputName = file.name.replace(/\.pdf$/i, '-numbered.pdf')

    console.log(`Page numbers done, output: ${outputBuffer.length} bytes`)

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Page numbers error:', err)
    return NextResponse.json({ error: 'Failed to add page numbers.' }, { status: 500 })
  }
}
