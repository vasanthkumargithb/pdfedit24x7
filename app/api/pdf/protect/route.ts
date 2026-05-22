import { NextRequest, NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)

const GS_PATH = 'C:\\Program Files\\gs\\gs10.07.0\\bin\\gswin64c.exe'

export async function POST(request: NextRequest) {
  let inputPath = ''
  let outputPath = ''

  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null
    const password = (formData.get('password') as string)?.trim()

    if (!file) {
      return NextResponse.json({ error: 'No PDF uploaded' }, { status: 400 })
    }

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 })
    }

    const unique = Date.now()
    inputPath = join(tmpdir(), `input-${unique}.pdf`)
    outputPath = join(tmpdir(), `output-${unique}.pdf`)

    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(inputPath, buffer)

    await execFileAsync(
      GS_PATH,
      [
        '-sDEVICE=pdfwrite',
        '-dNOPAUSE',
        '-dBATCH',
        '-dQUIET',

        '-dEncryptionR=3',
        '-dKeyLength=128',
        '-dPermissions=4',
        '-dEncryptMetadata=true',

        `-sOwnerPassword=${password}`,
        `-sUserPassword=${password}`,

        '-dCompatibilityLevel=1.4',

        `-sOutputFile=${outputPath}`,
        inputPath,
      ],
      { timeout: 60000 }
    )

    const outputBuffer = await readFile(outputPath)

    // ✅ UPDATED PART (size info added)
    return new NextResponse(outputBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="protected.pdf"',
        'X-Original-Size': buffer.length.toString(),
        'X-New-Size': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Protect error:', err)

    return NextResponse.json(
      { error: 'Failed to protect PDF' },
      { status: 500 }
    )
  } finally {
    if (inputPath) await unlink(inputPath).catch(() => {})
    if (outputPath) await unlink(outputPath).catch(() => {})
  }
}
