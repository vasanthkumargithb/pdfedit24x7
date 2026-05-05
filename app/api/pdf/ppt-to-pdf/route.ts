export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)

// Same LibreOffice paths used by word-to-pdf
const SOFFICE_PATHS = [
  'C:\\Program Files\\LibreOffice\\program\\soffice.exe',
  'C:\\Program Files (x86)\\LibreOffice\\program\\soffice.exe',
]

async function findLibreOffice(): Promise<string | null> {
  for (const p of SOFFICE_PATHS) {
    try { await readFile(p); return p } catch {}
  }
  return null
}

export async function POST(request: NextRequest) {
  let tmpIn = ''
  let tmpOut = ''

  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No PowerPoint file provided.' }, { status: 400 })
    }

    const ext = file.name.endsWith('.ppt') ? '.ppt' : '.pptx'
    tmpIn  = join(tmpdir(), `pdfpro-ppt-${Date.now()}${ext}`)
    tmpOut = tmpIn.replace(/\.pptx?$/i, '.pdf')

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    await writeFile(tmpIn, inputBuffer)

    // Try LibreOffice
    const sofficePath = await findLibreOffice()

    if (!sofficePath) {
      return NextResponse.json(
        { error: 'LibreOffice is not installed on this server. Please install it to convert PowerPoint to PDF.' },
        { status: 500 }
      )
    }

    await execFileAsync(sofficePath, [
      '--headless',
      '--convert-to', 'pdf',
      '--outdir', tmpdir(),
      tmpIn,
    ])

    const outputBuffer = await readFile(tmpOut)
    const outputName = file.name.replace(/\.pptx?$/i, '.pdf')

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('PPT-to-PDF error:', err)
    return NextResponse.json({ error: 'Conversion failed. Please try again.' }, { status: 500 })
  } finally {
    try { if (tmpIn)  await unlink(tmpIn)  } catch {}
    try { if (tmpOut) await unlink(tmpOut) } catch {}
  }
}