export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { tmpdir } from 'os'
import { join } from 'path'
import fs from 'fs'
import PptxGenJS from 'pptxgenjs'

const execFileAsync = promisify(execFile)

// ─── Poppler binary path ───────────────────────────────────────────────────
// On Windows: set POPPLER_BIN_PATH in .env.local to your Poppler bin folder
//   e.g.  POPPLER_BIN_PATH=C:\Users\vasuv\Downloads\poppler-25.12.0\Library\bin
// On Linux/Mac: leave it unset — pdftoppm will be found on PATH automatically
const POPPLER_BIN = process.env.POPPLER_BIN_PATH || ''
const PDFTOPPM = POPPLER_BIN
  ? join(POPPLER_BIN, 'pdftoppm.exe')   // Windows explicit path
  : 'pdftoppm'                           // Linux / Mac — found via PATH

export async function POST(req: NextRequest) {
  let inputPath = ''
  let outputDir = ''

  try {
    const formData = await req.formData()
    const file = formData.get('files') || formData.get('file')

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 })
    }

    const unique = Date.now()
    inputPath  = join(tmpdir(), `input-${unique}.pdf`)
    outputDir  = join(tmpdir(), `ppt-${unique}`)

    fs.mkdirSync(outputDir, { recursive: true })

    const buffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(inputPath, buffer)

    if (buffer.length < 1000) {
      throw new Error('Uploaded file is invalid or empty')
    }

    // Convert PDF → PNG images (one per page)
    await execFileAsync(PDFTOPPM, [
      '-png',
      '-r', '150',
      inputPath,
      join(outputDir, 'page'),
    ])

    const files = fs.readdirSync(outputDir).filter((f) => f.endsWith('.png'))

    if (!files.length) {
      throw new Error(
        'No images generated. ' +
        'On Windows: make sure POPPLER_BIN_PATH is set in .env.local. ' +
        'On Linux: run  sudo apt install poppler-utils'
      )
    }

    // Sort pages numerically
    files.sort((a, b) => {
      const n = (s: string) => parseInt(s.replace(/\D+(\d+)\.png$/, '$1'), 10)
      return n(a) - n(b)
    })

    const pptx = new PptxGenJS()
    pptx.layout = 'LAYOUT_WIDE'

    for (const fileName of files) {
      const slide = pptx.addSlide()
      slide.addImage({ path: join(outputDir, fileName), x: 0, y: 0, w: '100%', h: '100%' })
    }

    // Pass base name WITHOUT .pptx — pptxgenjs appends it automatically
    const pptBase = join(tmpdir(), `output-${unique}`)
    await pptx.writeFile({ fileName: pptBase })

    const pptBuffer = fs.readFileSync(`${pptBase}.pptx`)

    return new NextResponse(pptBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="converted.pptx"',
      },
    })

  } catch (err: unknown) {
    console.error('PPT error:', err)
    const message = err instanceof Error ? err.message : 'Conversion failed.'
    return NextResponse.json({ error: message }, { status: 500 })

  } finally {
    try {
      if (inputPath && fs.existsSync(inputPath)) fs.unlinkSync(inputPath)
      if (outputDir  && fs.existsSync(outputDir)) {
        fs.readdirSync(outputDir).forEach((f) => fs.unlinkSync(join(outputDir, f)))
        fs.rmdirSync(outputDir)
      }
    } catch { /* ignore cleanup errors */ }
  }
}