import { NextRequest, NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)
const GS_PATH = 'C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe'

export async function POST(request: NextRequest) {
  let tmpIn = ''
  let tmpOut = ''
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null
    const password = (formData.get('password') as string)?.trim() || ''

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())
    tmpIn = join(tmpdir(), `pdfpro-in-${Date.now()}.pdf`)
    tmpOut = join(tmpdir(), `pdfpro-out-${Date.now()}.pdf`)

    await writeFile(tmpIn, inputBuffer)

    await execFileAsync(GS_PATH, [
      '-sDEVICE=pdfwrite',
      '-dNOPAUSE',
      '-dBATCH',
      '-dQUIET',
      `-sPDFPassword=${password}`,
      '-dCompatibilityLevel=1.4',
      `-sOutputFile=${tmpOut}`,
      tmpIn,
    ])

    const outputBuffer = await readFile(tmpOut)
    const outputName = file.name.replace(/\.pdf$/i, '-unlocked.pdf')

    console.log(`Unlock PDF done: ${file.size} → ${outputBuffer.length} bytes`)

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Unlock error:', err)
    return NextResponse.json({ error: 'Failed to unlock PDF. Make sure the password is correct.' }, { status: 500 })
  } finally {
    if (tmpIn) await unlink(tmpIn).catch(() => {})
    if (tmpOut) await unlink(tmpOut).catch(() => {})
  }
}