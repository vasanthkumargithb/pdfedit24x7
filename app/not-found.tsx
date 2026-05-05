import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-surface-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="font-display font-800 text-[8rem] leading-none text-surface-200 mb-4 select-none">404</div>
          <h1 className="font-display font-700 text-3xl text-slate-900 mb-3">Page Not Found</h1>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">
            Looks like this page got lost in the document cloud. Let's get you back.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="px-5 py-2.5 bg-brand-600 text-white font-semibold text-sm rounded-xl hover:bg-brand-700 transition-colors">
              Go Home
            </Link>
            <Link href="/#tools" className="px-5 py-2.5 bg-white text-slate-700 font-semibold text-sm rounded-xl border border-surface-200 hover:bg-surface-50 transition-colors">
              Browse Tools
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
