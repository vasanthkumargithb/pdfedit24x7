import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://pdfedit24x7.com'),
  verification: { google: '4J71s0RKFWJEdWiV6qzIf8ZC7xRhatemqSe6-7xdI6Y' },
  title: {
    default: 'PDFEdit24x7 – Free Online PDF Tools | Merge, Split, Compress, Convert PDF',
    template: '%s | PDFEdit24x7 – Free Online PDF Tools',
  },
  description:
    'PDFEdit24x7 offers 20+ free online PDF tools: merge, split, compress, convert PDF to Word, Excel, PowerPoint, JPG, and more. Edit, sign, watermark PDFs instantly. Fast, secure, no signup required.',
  keywords: [
    'pdf tools online',
    'free pdf tools',
    'merge pdf',
    'split pdf',
    'compress pdf',
    'pdf to word',
    'word to pdf',
    'image to pdf',
    'pdf to jpg',
    'pdf to excel',
    'excel to pdf',
    'pdf to powerpoint',
    'powerpoint to pdf',
    'edit pdf online',
    'sign pdf online',
    'watermark pdf',
    'protect pdf',
    'rotate pdf',
    'pdf converter',
    'pdf editor online free',
    'presentation maker',
    'remove pages from pdf',
    'extract pages pdf',
    'add page numbers pdf',
  ],
  authors: [{ name: 'PDFEdit24x7' }],
  creator: 'PDFEdit24x7',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pdfedit24x7.com',
    siteName: 'PDFEdit24x7',
    title: 'PDFEdit24x7 – 20+ Free Online PDF Tools',
    description:
      'Merge, split, compress, convert, edit and sign PDFs online for free. No signup, no watermarks, no limits.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'PDFEdit24x7 – Free Online PDF Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDFEdit24x7 – 20+ Free Online PDF Tools',
    description: 'Merge, split, compress, convert, edit and sign PDFs online for free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics — replace G-KQCX16RJ9Q with your real ID */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtag/js?id=G-KQCX16RJ9Q';
              f.parentNode.insertBefore(j,f);
              window.dataLayer=window.dataLayer||[];
              function gtag(){dataLayer.push(arguments);}
              gtag('js',new Date());
              gtag('config','G-KQCX16RJ9Q');
              })(window,document,'script','dataLayer','G-KQCX16RJ9Q');
            `,
          }}
        />

        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'PDFEdit24x7',
              url: 'https://pdfedit24x7.com',
              description: '20+ free online PDF tools – merge, split, compress, convert, edit and sign PDFs',
              applicationCategory: 'UtilitiesApplication',
              operatingSystem: 'Any',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: [
                'Merge PDF', 'Split PDF', 'Compress PDF', 'PDF to Word',
                'Word to PDF', 'PDF to Excel', 'Excel to PDF', 'PDF to PowerPoint',
                'PowerPoint to PDF', 'PDF to JPG', 'Image to PDF', 'Edit PDF',
                'Sign PDF', 'Watermark PDF', 'Protect PDF', 'Rotate PDF',
                'Extract Pages', 'Remove Pages', 'Add Page Numbers', 'Presentation Maker',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}






