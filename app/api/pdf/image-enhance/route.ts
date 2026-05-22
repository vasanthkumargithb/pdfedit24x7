export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null
    const mode = (formData.get('mode') as string) || 'auto'

    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    let pipeline = sharp(buffer)

    switch (mode) {
      case 'shadow':
         pipeline = pipeline
          .normalise()
          .modulate({ brightness: 1.3 })
          .linear(1.2, 20)
          .sharpen({ sigma: 1.5 })
       break
      case 'enhance':
        // Stronger color enhancement + brightness + sharp
        pipeline = pipeline
          .normalise()
          .sharpen({ sigma: 2 })
          .modulate({ saturation: 1.5, brightness: 1.15 })
          .linear(1.3, -20)
        break
      case 'bw':
        // Pure black and white — strong threshold
        pipeline = pipeline
          .grayscale()
          .normalise()
          .threshold(140)
        break
      default:
        // Auto — smart enhance with stronger settings
        pipeline = pipeline
          .normalise()
          .sharpen({ sigma: 2 })
          .linear(1.2, -15)
          .modulate({ brightness: 1.1 })
    }

    const outputBuffer = await pipeline.jpeg({ quality: 95 }).toBuffer()

    return new NextResponse(Buffer.from(outputBuffer), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'attachment; filename="enhanced.jpg"',
      },
    })
  } catch (err) {
    console.error('Image enhance error:', err)
    return NextResponse.json({ error: 'Enhancement failed.' }, { status: 500 })
  }
}
