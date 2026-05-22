import { NextRequest, NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readdir, readFile, unlink, mkdir, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)
const GS_PATH = 'C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe'

export async function POST(request: NextRequest) {
  const tmpDir = join(tmpdir(), `PDFEdit24x7-jpg-${Date.now()}`)

  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null
    const dpi = parseInt((formData.get('dpi') as string) || '150')

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    const tmpIn = join(tmpdir(), `PDFEdit24x7-in-${Date.now()}.pdf`)
    await mkdir(tmpDir, { recursive: true })
    await writeFile(tmpIn, inputBuffer)

    // Use Ghostscript to convert each PDF page to a JPG
    await execFileAsync(GS_PATH, [
      '-sDEVICE=jpeg',
      `-r${dpi}`,
      '-dNOPAUSE',
      '-dBATCH',
      '-dQUIET',
      '-dJPEGQ=92',
      `-sOutputFile=${join(tmpDir, 'page-%03d.jpg')}`,
      tmpIn,
    ])

    await unlink(tmpIn).catch(() => {})

    // Read all generated JPG files
    const allFiles = await readdir(tmpDir)
    const jpgFiles = allFiles.filter(f => f.endsWith('.jpg')).sort()

    if (jpgFiles.length === 0) {
      throw new Error('No images were generated')
    }

    const pages = await Promise.all(
      jpgFiles.map(async (filename, i) => {
        const buf = await readFile(join(tmpDir, filename))
        return {
          filename: jpgFiles.length === 1 ? 'page.jpg' : `page-${i + 1}.jpg`,
          data: buf.toString('base64'),
        }
      })
    )

    await rm(tmpDir, { recursive: true, force: true }).catch(() => {})

    console.log(`PDF-to-JPG done: ${jpgFiles.length} pages at ${dpi} DPI`)

    return NextResponse.json({ pages })

  } catch (err) {
    await rm(tmpDir, { recursive: true, force: true }).catch(() => {})
    console.error('PDF-to-JPG error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'PDF to JPG conversion failed.' },
      { status: 500 }
    )
  }
}
