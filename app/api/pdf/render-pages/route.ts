export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readdir, readFile, rm } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { mkdirSync } from 'fs'

const execFileAsync = promisify(execFile)

const POPPLER_BIN = process.env.POPPLER_BIN_PATH || ''
const PDFTOPPM = POPPLER_BIN ? join(POPPLER_BIN, 'pdftoppm.exe') : 'pdftoppm'

export async function POST(request: NextRequest) {
  const unique = Date.now()
  const tmpIn = join(tmpdir(), `edit-in-${unique}.pdf`)
  const outDir = join(tmpdir(), `edit-pages-${unique}`)

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(tmpIn, buffer)
    mkdirSync(outDir, { recursive: true })

    await execFileAsync(PDFTOPPM, ['-png', '-r', '150', tmpIn, join(outDir, 'page')])

    const files = (await readdir(outDir))
      .filter(f => f.endsWith('.png'))
      .sort((a, b) => {
        const n = (s: string) => parseInt(s.replace(/\D+(\d+)\.png$/, '$1'), 10)
        return n(a) - n(b)
      })

    const pages = await Promise.all(
      files.map(async f => {
        const buf = await readFile(join(outDir, f))
        return `data:image/png;base64,${buf.toString('base64')}`
      })
    )

    return NextResponse.json({ pages })
  } catch (err) {
    console.error('render-pages error:', err)
    return NextResponse.json({ error: 'Failed to render PDF pages' }, { status: 500 })
  } finally {
    try { await rm(tmpIn) } catch {}
    try { await rm(outDir, { recursive: true }) } catch {}
  }
}
