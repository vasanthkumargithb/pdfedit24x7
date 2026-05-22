export const runtime = 'nodejs'

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { execFile } from 'child_process'
import { promisify } from 'util'
import { writeFile, readFile, unlink } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { PDFDocument } from 'pdf-lib'

const execFileAsync = promisify(execFile)

// Try 'python' first, fall back to 'python3'
async function runPython(script: string): Promise<void> {
  try {
    const result = await execFileAsync('python', [script], { timeout: 30000 })
    if (!result.stdout.includes('done')) {
      throw new Error('Python script did not complete successfully')
    }
  } catch {
    const result = await execFileAsync('python3', [script], { timeout: 30000 })
    if (!result.stdout.includes('done')) {
      throw new Error('Python script did not complete successfully')
    }
  }
}

export async function POST(request: NextRequest) {
  const tmpFiles: string[] = []

  try {
    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const output = (formData.get('output') as string) || 'pdf'

    if (!files || files.length === 0) {
      return NextResponse.json({ error: 'No images provided.' }, { status: 400 })
    }

    const unique = Date.now()
    const processedImages: Buffer[] = []

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const tmpIn  = join(tmpdir(), `edge-in-${unique}-${i}.${ext}`)
      const tmpOut = join(tmpdir(), `edge-out-${unique}-${i}.jpg`)
      const pyScript = join(tmpdir(), `edge-script-${unique}-${i}.py`)

      tmpFiles.push(tmpIn, tmpOut, pyScript)

      await writeFile(tmpIn, Buffer.from(await file.arrayBuffer()))

      // Use double-escaped paths so Windows backslashes don't break Python strings
      const safeTmpIn  = tmpIn.replace(/\\/g, '/')
      const safeTmpOut = tmpOut.replace(/\\/g, '/')

      const script = `
import cv2
import numpy as np
import sys

def order_points(pts):
    rect = np.zeros((4, 2), dtype="float32")
    s = pts.sum(axis=1)
    rect[0] = pts[np.argmin(s)]
    rect[2] = pts[np.argmax(s)]
    diff = np.diff(pts, axis=1)
    rect[1] = pts[np.argmin(diff)]
    rect[3] = pts[np.argmax(diff)]
    return rect

def four_point_transform(image, pts):
    rect = order_points(pts)
    (tl, tr, br, bl) = rect
    widthA = np.sqrt(((br[0] - bl[0]) ** 2) + ((br[1] - bl[1]) ** 2))
    widthB = np.sqrt(((tr[0] - tl[0]) ** 2) + ((tr[1] - tl[1]) ** 2))
    maxWidth = max(int(widthA), int(widthB))
    heightA = np.sqrt(((tr[0] - br[0]) ** 2) + ((tr[1] - br[1]) ** 2))
    heightB = np.sqrt(((tl[0] - bl[0]) ** 2) + ((tl[1] - bl[1]) ** 2))
    maxHeight = max(int(heightA), int(heightB))
    dst = np.array([[0,0],[maxWidth-1,0],[maxWidth-1,maxHeight-1],[0,maxHeight-1]], dtype="float32")
    M = cv2.getPerspectiveTransform(rect, dst)
    return cv2.warpPerspective(image, M, (maxWidth, maxHeight))

def auto_scan(input_path, output_path):
    image = cv2.imread(input_path)
    if image is None:
        print("error: could not read image")
        sys.exit(1)

    orig = image.copy()
    h, w = image.shape[:2]

    # Use a larger resize for edge detection — better accuracy
    scale = 1000.0 / max(h, w)
    resized = cv2.resize(image, (int(w * scale), int(h * scale)))

    gray = cv2.cvtColor(resized, cv2.COLOR_BGR2GRAY)
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    edged = cv2.Canny(blurred, 50, 150)

    contours, _ = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:5]

    screenCnt = None
    rh, rw = resized.shape[:2]
    min_area = rw * rh * 0.2  # quad must cover at least 20% of image

    for c in contours:
        area = cv2.contourArea(c)
        if area < min_area:
            continue
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        if len(approx) == 4:
            screenCnt = approx
            break

    if screenCnt is not None:
        pts = screenCnt.reshape(4, 2) / scale
        warped = four_point_transform(orig, pts)
        # Only use warp if result is reasonably sized
        wh, ww = warped.shape[:2]
        if ww < 100 or wh < 100:
            warped = orig
    else:
        warped = orig  # no valid document found — use full image

    # Save full color, high quality
    cv2.imwrite(output_path, warped, [cv2.IMWRITE_JPEG_QUALITY, 95])
    print("done")

auto_scan("${safeTmpIn}", "${safeTmpOut}")
`

      await writeFile(pyScript, script)

      try {
        await runPython(pyScript)
      } catch (pyErr) {
        console.error(`Python failed for file ${i}:`, pyErr)
        return NextResponse.json(
          { error: `Processing failed for image "${file.name}". Make sure Python and opencv-python are installed.` },
          { status: 500 }
        )
      }

      // Check output file was actually created
      let imgBuffer: Buffer
      try {
        imgBuffer = await readFile(tmpOut)
      } catch {
        return NextResponse.json(
          { error: `Could not read processed output for image "${file.name}".` },
          { status: 500 }
        )
      }

      processedImages.push(imgBuffer)
    }

    if (output === 'jpg' && processedImages.length === 1) {
      // Single image — return as JPG
      return new NextResponse(Buffer.from(processedImages[0]), {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Disposition': 'attachment; filename="scanned-document.jpg"',
        },
      })
    }

    // Default: always build a PDF (handles 1 or many images)
    const pdfDoc = await PDFDocument.create()

    for (const imgBuffer of processedImages) {
      const image = await pdfDoc.embedJpg(imgBuffer)
      const page = pdfDoc.addPage([image.width, image.height])
      page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height })
    }

    const pdfBytes = await pdfDoc.save()

    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="scanned-document.pdf"',
      },
    })

  } catch (err) {
    console.error('Edge detect error:', err)
    return NextResponse.json({ error: 'Processing failed. Please try a clearer photo.' }, { status: 500 })
  } finally {
    for (const f of tmpFiles) {
      try { await unlink(f) } catch {}
    }
  }
}
