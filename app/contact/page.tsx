'use client'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Simulate sending — connect to your email service (Resend, SendGrid, etc.)
    await new Promise(r => setTimeout(r, 1500))
    setStatus('sent')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20 bg-surface-50 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12 pt-8">
            <div className="inline-block px-3 py-1 bg-brand-50 text-brand-700 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">Contact</div>
            <h1 className="font-display font-700 text-4xl text-slate-900 mb-3">Get in Touch</h1>
            <p className="text-lg text-slate-500">Questions, feedback, or just want to say hello? We read every message.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {/* Contact info */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-surface-100 shadow-card">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <h3 className="font-display font-600 text-sm text-slate-900 mb-1">Email</h3>
                <p className="text-sm text-slate-500">support@tejdeal.com</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-surface-100 shadow-card">
                <div className="w-10 h-10 bg-violet-50 rounded-xl flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-violet-600" />
                </div>
                <h3 className="font-display font-600 text-sm text-slate-900 mb-1">Response Time</h3>
                <p className="text-sm text-slate-500">Usually within 24 hours on business days.</p>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2 bg-white rounded-2xl border border-surface-100 shadow-card p-6 sm:p-8">
              {status === 'sent' ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 bg-emerald-50 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-emerald-500" />
                  </div>
                  <h3 className="font-display font-600 text-xl text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 text-sm">Thanks for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Name</label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3.5 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">Email</label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all placeholder:text-slate-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Subject</label>
                    <select
                      name="subject" value={form.subject} onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all"
                    >
                      <option value="">Select a subject</option>
                      <option value="bug">Report a Bug</option>
                      <option value="feature">Feature Request</option>
                      <option value="business">Business Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">Message</label>
                    <textarea
                      name="message" required value={form.message} onChange={handleChange}
                      rows={5} placeholder="Tell us more..."
                      className="w-full px-3.5 py-2.5 text-sm bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all resize-none placeholder:text-slate-300"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="flex items-center gap-2 px-5 py-2.5 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}


