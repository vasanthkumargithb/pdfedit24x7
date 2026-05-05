export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import pdfParse from 'pdf-parse'
import ExcelJS from 'exceljs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('files') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No PDF file provided.' }, { status: 400 })
    }

    const inputBuffer = Buffer.from(await file.arrayBuffer())

    // ── Extract text from PDF ──────────────────────────────────────────────
    const data = await pdfParse(inputBuffer)
    const text = data.text || ''

    // ── Parse lines into rows ──────────────────────────────────────────────
    const lines = text
      .split('\n')
      .map((l: string) => l.trim())
      .filter((l: string) => l.length > 0)

    // Try to detect columns by splitting on 2+ spaces
    const rows = lines.map((line: string) => {
      const cells = line.split(/\s{2,}/)
      return cells.map((c: string) => c.trim()).filter((c: string) => c.length > 0)
    })

    // ── Build Excel file ───────────────────────────────────────────────────
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Sheet1')

    // Style the header row (first row)
    if (rows.length > 0) {
      const headerRow = sheet.addRow(rows[0])
      headerRow.eachCell(cell => {
        cell.font = { bold: true, color: { argb: 'FFFFFFFF' } }
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF4F46E5' },
        }
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        }
      })
    }

    // Add remaining rows
    for (let i = 1; i < rows.length; i++) {
      const row = sheet.addRow(rows[i])
      const isEven = i % 2 === 0
      row.eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: isEven ? 'FFF5F5FF' : 'FFFFFFFF' },
        }
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          left: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          bottom: { style: 'thin', color: { argb: 'FFE2E8F0' } },
          right: { style: 'thin', color: { argb: 'FFE2E8F0' } },
        }
      })
    }

    // Auto-fit columns
    sheet.columns.forEach(column => {
      let maxLength = 10
      column.eachCell?.({ includeEmpty: true }, cell => {
        const val = cell.value ? cell.value.toString() : ''
        if (val.length > maxLength) maxLength = val.length
      })
      column.width = Math.min(maxLength + 4, 50)
    })

    const outputBuffer = Buffer.from(await workbook.xlsx.writeBuffer())
    const outputName = file.name.replace(/\.pdf$/i, '.xlsx')

    return new NextResponse(outputBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${outputName}"`,
        'Content-Length': outputBuffer.length.toString(),
      },
    })

  } catch (err) {
    console.error('PDF-to-Excel error:', err)
    return NextResponse.json({ error: 'Conversion failed. Please try again.' }, { status: 500 })
  }
}