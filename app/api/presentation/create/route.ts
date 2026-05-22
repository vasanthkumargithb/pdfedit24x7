export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import PptxGenJS from 'pptxgenjs'
import { join } from 'path'
import { tmpdir } from 'os'
import fs from 'fs'

export async function POST(req: NextRequest) {
  let pptBase = ''

  try {
    const formData = await req.formData()
    const slidesRaw = formData.get('slides') as string
    const theme = (formData.get('theme') as string) || 'modern'

    if (!slidesRaw) {
      return NextResponse.json({ error: 'No slides data provided.' }, { status: 400 })
    }

    const slides: {
      title: string
      content: string
      imageBase64?: string
      layout: 'title' | 'content' | 'image-left' | 'image-right' | 'blank'
    }[] = JSON.parse(slidesRaw)

    if (!slides.length) {
      return NextResponse.json({ error: 'At least one slide is required.' }, { status: 400 })
    }

    // Theme colors
    const themes: Record<string, { bg: string; title: string; text: string; accent: string }> = {
      modern:     { bg: 'FFFFFF', title: '1E293B', text: '475569', accent: '6366F1' },
      dark:       { bg: '0F172A', title: 'F1F5F9', text: 'CBD5E1', accent: '818CF8' },
      ocean:      { bg: '0C4A6E', title: 'F0F9FF', text: 'BAE6FD', accent: '38BDF8' },
      forest:     { bg: '14532D', title: 'F0FDF4', text: 'BBF7D0', accent: '4ADE80' },
      sunset:     { bg: 'FFF7ED', title: '7C2D12', text: '9A3412', accent: 'F97316' },
      corporate:  { bg: 'F8FAFC', title: '0F172A', text: '334155', accent: '0EA5E9' },
    }

    const t = themes[theme] || themes.modern

    const pptx = new PptxGenJS()
    pptx.layout = 'LAYOUT_WIDE'
    pptx.title = slides[0]?.title || 'Presentation'

    for (const slide of slides) {
      const s = pptx.addSlide()

      // Background
      s.background = { color: t.bg }

      // Accent bar on left
      s.addShape(pptx.ShapeType.rect, {
        x: 0, y: 0, w: 0.08, h: '100%',
        fill: { color: t.accent },
        line: { color: t.accent },
      })

      const hasImage = !!slide.imageBase64

      if (slide.layout === 'title' || !slide.layout) {
        // Full title slide
        s.addShape(pptx.ShapeType.rect, {
          x: 0, y: '35%', w: '100%', h: 0.04,
          fill: { color: t.accent },
          line: { color: t.accent },
        })
        s.addText(slide.title || '', {
          x: 0.5, y: '20%', w: '90%', h: '30%',
          fontSize: 40, bold: true, color: t.title,
          align: 'center', valign: 'middle',
        })
        if (slide.content) {
          s.addText(slide.content, {
            x: 0.5, y: '50%', w: '90%', h: '35%',
            fontSize: 20, color: t.text,
            align: 'center', valign: 'top',
          })
        }
      } else if (hasImage && slide.layout === 'image-right') {
        // Text left, image right
        s.addText(slide.title || '', {
          x: 0.4, y: 0.3, w: '48%', h: 0.9,
          fontSize: 28, bold: true, color: t.title,
        })
        if (slide.content) {
          s.addText(slide.content, {
            x: 0.4, y: 1.4, w: '48%', h: 3.2,
            fontSize: 16, color: t.text,
            breakLine: true,
          })
        }
        // Save image temp
        const imgPath = join(tmpdir(), `slide-img-${Date.now()}.png`)
        const base64Data = slide.imageBase64!.replace(/^data:image\/\w+;base64,/, '')
        fs.writeFileSync(imgPath, Buffer.from(base64Data, 'base64'))
        s.addImage({ path: imgPath, x: '52%', y: 0.3, w: '45%', h: 4.5 })
        setTimeout(() => { try { fs.unlinkSync(imgPath) } catch {} }, 5000)
      } else if (hasImage && slide.layout === 'image-left') {
        // Image left, text right
        const imgPath = join(tmpdir(), `slide-img-${Date.now()}.png`)
        const base64Data = slide.imageBase64!.replace(/^data:image\/\w+;base64,/, '')
        fs.writeFileSync(imgPath, Buffer.from(base64Data, 'base64'))
        s.addImage({ path: imgPath, x: 0.15, y: 0.3, w: '45%', h: 4.5 })
        setTimeout(() => { try { fs.unlinkSync(imgPath) } catch {} }, 5000)
        s.addText(slide.title || '', {
          x: '52%', y: 0.3, w: '45%', h: 0.9,
          fontSize: 28, bold: true, color: t.title,
        })
        if (slide.content) {
          s.addText(slide.content, {
            x: '52%', y: 1.4, w: '45%', h: 3.2,
            fontSize: 16, color: t.text,
            breakLine: true,
          })
        }
      } else {
        // Default content slide
        s.addText(slide.title || '', {
          x: 0.4, y: 0.25, w: '90%', h: 0.9,
          fontSize: 30, bold: true, color: t.title,
        })
        s.addShape(pptx.ShapeType.rect, {
          x: 0.4, y: 1.1, w: 1.2, h: 0.05,
          fill: { color: t.accent }, line: { color: t.accent },
        })
        if (slide.content) {
          s.addText(slide.content, {
            x: 0.4, y: 1.3, w: '90%', h: 3.6,
            fontSize: 17, color: t.text,
            breakLine: true, valign: 'top',
          })
        }
        if (hasImage) {
          const imgPath = join(tmpdir(), `slide-img-${Date.now()}.png`)
          const base64Data = slide.imageBase64!.replace(/^data:image\/\w+;base64,/, '')
          fs.writeFileSync(imgPath, Buffer.from(base64Data, 'base64'))
          s.addImage({ path: imgPath, x: 0.4, y: 1.5, w: 4, h: 3 })
          setTimeout(() => { try { fs.unlinkSync(imgPath) } catch {} }, 5000)
        }
      }
    }

    pptBase = join(tmpdir(), `presentation-${Date.now()}`)
    await pptx.writeFile({ fileName: pptBase })
    const pptBuffer = fs.readFileSync(`${pptBase}.pptx`)

    return new NextResponse(pptBuffer, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': 'attachment; filename="presentation.pptx"',
      },
    })
  } catch (err) {
    console.error('Presentation error:', err)
    return NextResponse.json({ error: 'Failed to create presentation.' }, { status: 500 })
  } finally {
    try {
      if (pptBase && fs.existsSync(`${pptBase}.pptx`)) fs.unlinkSync(`${pptBase}.pptx`)
    } catch {}
  }
}
