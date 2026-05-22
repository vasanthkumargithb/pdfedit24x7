export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import Tesseract from 'tesseract.js'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No image provided.' }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const { data: { text } } = await Tesseract.recognize(buffer, 'eng', {
      logger: () => {},
    })

    if (!text.trim()) {
      return NextResponse.json({ error: 'No text found in image.' }, { status: 400 })
    }

    // Return as plain text file
    return new NextResponse(text, {
      headers: {
        'Content-Type': 'text/plain',
        'Content-Disposition': 'attachment; filename="extracted-text.txt"',
      },
    })
  } catch (err) {
    console.error('OCR error:', err)
    return NextResponse.json({ error: 'OCR failed. Please try a clearer image.' }, { status: 500 })
  }
}
