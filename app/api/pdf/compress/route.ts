import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument } from 'pdf-lib'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)

// Ghostscript executable path on Windows
const GS_PATH = 'C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('files') as File | null
    const quality = (formData.get('quality') as string) || 'medium'

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    // ── Option A: Ghostscript (local, best compression) ───────────────────
    try {
      const presetMap: Record<string, string> = {
        low: '/printer',  // ~300 dpi, best quality
        medium: '/ebook', // ~150 dpi, balanced
        high: '/screen',  // ~72 dpi, smallest size
      }
      const preset = presetMap[quality] ?? '/ebook'

      // Write input to temp file
      const tmpIn = join(tmpdir(), `pdfpro-in-${Date.now()}.pdf`)
      const tmpOut = join(tmpdir(), `pdfpro-out-${Date.now()}.pdf`)

      await writeFile(tmpIn, Buffer.from(await file.arrayBuffer()))

      await execFileAsync(GS_PATH, [
        '-sDEVICE=pdfwrite',
        '-dCompatibilityLevel=1.4',
        `-dPDFSETTINGS=${preset}`,
        '-dNOPAUSE',
        '-dQUIET',
        '-dBATCH',
        `-sOutputFile=${tmpOut}`,
        tmpIn,
      ])

      const outputBuffer = await readFile(tmpOut)

      // Clean up temp files
      await unlink(tmpIn).catch(() => {})
      await unlink(tmpOut).catch(() => {})

      console.log(`Ghostscript compression done: ${file.size} → ${outputBuffer.length} bytes`)

      return new NextResponse(outputBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="compressed.pdf"',
          'Content-Length': outputBuffer.length.toString(),
        },
      })

    } catch (gsErr) {
      console.error('Ghostscript failed, falling back to pdf-lib:', gsErr)
      // Fall through to pdf-lib
    }

    // ── Option B: pdf-lib fallback ─────────────────────────────────────────
    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const pdfDoc = await PDFDocument.load(inputBuffer)
    const pdfBytes = await pdfDoc.save({ useObjectStreams: true, addDefaultPage: false })
    const outputBuffer = Buffer.from(pdfBytes)

    console.log(`pdf-lib compression done: ${file.size} → ${outputBuffer.length} bytes`)

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="compressed.pdf"',
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (error) {
    console.error('Compress error:', error)
    return NextResponse.json({ error: 'Compression failed. Please try again.' }, { status: 500 })
  }
}