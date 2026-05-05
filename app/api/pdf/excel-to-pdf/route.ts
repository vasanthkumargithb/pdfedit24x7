export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink, mkdir } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'

const execFileAsync = promisify(execFile)

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
  let tmpFixed = ''
  let pyScript = ''
  const outDir = join(tmpdir(), `excel-out-${Date.now()}`)

  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No Excel file provided.' }, { status: 400 })
    }

    const ext = file.name.endsWith('.xls') ? '.xls' : '.xlsx'
    const baseName = `pdfpro-excel-${Date.now()}`
    tmpIn    = join(tmpdir(), `${baseName}${ext}`)
    tmpFixed = join(tmpdir(), `${baseName}-fixed.xlsx`)
    pyScript = join(tmpdir(), `${baseName}-fix.py`)

    await mkdir(outDir, { recursive: true })
    await writeFile(tmpIn, Buffer.from(await file.arrayBuffer()))

    // ✅ Python script — sets fit_to_width=1 on ALL sheets
    const script = `
import openpyxl
from openpyxl.worksheet.page import PageMargins

wb = openpyxl.load_workbook(r"${tmpIn}")
for ws in wb.worksheets:
    ws.page_setup.fitToPage = True
    ws.page_setup.fitToWidth = 1
    ws.page_setup.fitToHeight = 0
    ws.sheet_properties.pageSetUpPr.fitToPage = True
    ws.page_margins = PageMargins(left=0.25, right=0.25, top=0.5, bottom=0.5)
wb.save(r"${tmpFixed}")
print("done")
`
    await writeFile(pyScript, script)

    // Run the Python fix script
    try {
      await execFileAsync('python', [pyScript])
    } catch {
      // If Python fails, use original file
      await writeFile(tmpFixed, await readFile(tmpIn))
    }

    const sofficePath = await findLibreOffice()
    if (!sofficePath) {
      return NextResponse.json({ error: 'LibreOffice is not installed.' }, { status: 500 })
    }

    // Convert the fixed file to PDF
    await execFileAsync(sofficePath, [
      '--headless',
      '--convert-to', 'pdf',
      '--outdir', outDir,
      tmpFixed,
    ])

    // LibreOffice names output after input filename
    const pdfName = `${baseName}-fixed.pdf`
    const outputBuffer = await readFile(join(outDir, pdfName))
    const outputName = file.name.replace(/\.xlsx?$/i, '.pdf')

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('Excel-to-PDF error:', err)
    return NextResponse.json({ error: 'Conversion failed. Please try again.' }, { status: 500 })
  } finally {
    try { if (tmpIn)    await unlink(tmpIn)    } catch {}
    try { if (tmpFixed) await unlink(tmpFixed) } catch {}
    try { if (pyScript) await unlink(pyScript) } catch {}
  }
}