/**
 * POST /api/contact
 * Sends contact form emails via Resend (https://resend.com)
 * 
 * Setup:
 *   1. npm install resend
 *   2. Sign up at resend.com → get free API key (3,000 emails/month free)
 *   3. Add to .env.local:  RESEND_API_KEY=re_xxxxxxxxxxxx
 *   4. Verify your sending domain in Resend dashboard
 */

import { NextRequest, NextResponse } from 'next/server'

interface ContactBody {
  name: string
  email: string
  subject: string
  message: string
}

// Simple in-memory rate limiting (use Redis/Upstash for production)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 3    // max 3 submissions
const WINDOW_MS = 3600000 // per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again in an hour.' }, { status: 429 })
  }

  let body: ContactBody
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { name, email, subject, message } = body

  // Basic validation
  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 })
  }
  if (message.length > 2000) {
    return NextResponse.json({ error: 'Message too long (max 2000 chars).' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    // Dev fallback: just log to console
    console.log('📧 Contact form submission (no RESEND_API_KEY set):', { name, email, subject, message })
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PDFEdit24x7 Contact <noreply@pdfedit24x7.com>',
        to: ['support@tejdeal.com'],
        reply_to: email,
        subject: `[PDFEdit24x7 Contact] ${subject || 'New message'} — from ${name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
            <h2 style="color: #1440e1; margin-bottom: 16px;">New Contact Form Submission</h2>
            <table style="width:100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #64748b; width: 100px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #64748b;">Subject</td><td style="padding: 8px 0;">${subject || '—'}</td></tr>
            </table>
            <hr style="margin: 16px 0; border-color: #e2e8f0;" />
            <p style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        `,
      }),
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.message || 'Email send failed')
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact email error:', err)
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}


