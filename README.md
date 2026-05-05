# PDFPro — Free Online PDF Tools

A production-ready, SEO-optimized PDF tools web application built with **Next.js 14**, **Tailwind CSS**, and **pdf-lib**.

---

## 📁 Folder Structure

```
pdfpro/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout — global SEO metadata, fonts
│   ├── page.tsx                  # Home page
│   ├── not-found.tsx             # Custom 404 page
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # Auto-generated robots.txt
│   ├── [tool]/
│   │   └── page.tsx              # Dynamic tool pages (/merge-pdf, /compress-pdf, etc.)
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact form page
│   ├── privacy/
│   │   └── page.tsx              # Privacy Policy page
│   └── api/
│       └── pdf/
│           ├── merge/route.ts        # POST — merge multiple PDFs
│           ├── split/route.ts        # POST — split PDF by page range
│           ├── compress/route.ts     # POST — compress/optimise PDF
│           ├── rotate/route.ts       # POST — rotate PDF pages
│           ├── image-to-pdf/route.ts # POST — JPG/PNG → PDF
│           ├── pdf-to-jpg/route.ts   # POST — PDF → JPG (needs CloudConvert)
│           ├── word-to-pdf/route.ts  # POST — DOCX → PDF (needs CloudConvert)
│           └── pdf-to-word/route.ts  # POST — PDF → DOCX (needs CloudConvert)
├── components/
│   ├── Navbar.tsx                # Sticky responsive navbar with tool dropdown
│   ├── Hero.tsx                  # Landing page hero with stats + trust badges
│   ├── ToolGrid.tsx              # Categorised tool card grid
│   ├── FileUpload.tsx            # Drag-and-drop upload, progress, download
│   ├── Footer.tsx                # Full footer with links
│   └── sections.tsx              # HowItWorks + Features sections
├── lib/
│   └── tools.ts                  # Central tool definitions (slug, title, icon, limits)
├── styles/
│   └── globals.css               # Global styles, animations, font imports
├── public/                       # Static assets (favicon, OG image, etc.)
├── .env.example                  # Environment variable template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18.17+ (check: `node -v`)
- npm or yarn

### Step 1 — Clone / download the project
```bash
# If using git:
git clone https://github.com/yourname/pdfpro.git
cd pdfpro

# Or just cd into the folder you created:
cd pdfpro
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Set up environment variables
```bash
cp .env.example .env.local
```
Open `.env.local` and add your keys (at minimum, everything works without any keys except Word/JPG conversion).

### Step 4 — Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔧 API Routes — How They Work

| Route | Method | Input | Output | Library |
|---|---|---|---|---|
| `/api/pdf/merge` | POST | 2–20 PDFs | Single PDF | pdf-lib |
| `/api/pdf/split` | POST | 1 PDF + range | PDF | pdf-lib |
| `/api/pdf/compress` | POST | 1 PDF | Compressed PDF | pdf-lib |
| `/api/pdf/rotate` | POST | 1 PDF + degrees | Rotated PDF | pdf-lib |
| `/api/pdf/image-to-pdf` | POST | 1–20 images | PDF | pdf-lib |
| `/api/pdf/pdf-to-jpg` | POST | 1 PDF | JPG | CloudConvert* |
| `/api/pdf/word-to-pdf` | POST | .docx file | PDF | CloudConvert* |
| `/api/pdf/pdf-to-word` | POST | 1 PDF | .docx | CloudConvert* |

*Requires `CLOUDCONVERT_API_KEY` in `.env.local`

### Getting a CloudConvert API key (free tier available)
1. Go to [cloudconvert.com](https://cloudconvert.com)
2. Sign up → Dashboard → API → Create API Key
3. Free tier includes 25 conversion minutes/day
4. Add to `.env.local`: `CLOUDCONVERT_API_KEY=your_key_here`

---

## 🎨 Adding a New Tool

1. **Add to `lib/tools.ts`:**
```ts
{
  slug: 'watermark-pdf',
  title: 'Watermark PDF',
  shortTitle: 'Watermark',
  description: 'Add a text or image watermark to your PDF.',
  longDescription: '...',
  icon: 'watermark',
  color: 'bg-teal-50',
  iconColor: '#0d9488',
  accept: 'application/pdf',
  maxFiles: 1,
  maxSize: 100 * 1024 * 1024,
  action: 'watermark',
  category: 'organize',
  keywords: ['watermark pdf', 'add watermark to pdf online'],
}
```

2. **Create the API route at `app/api/pdf/watermark/route.ts`**

3. **Add an SVG icon case in `components/Navbar.tsx`'s `ToolIcon` function**

That's it — the dynamic `[tool]/page.tsx` handles rendering automatically.

---

## 🌐 Deployment

### Option A — Vercel (Recommended, easiest)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Build and deploy
vercel

# 3. Add environment variables in Vercel Dashboard:
#    Settings → Environment Variables → Add:
#      CLOUDCONVERT_API_KEY = your_key
#      NEXT_PUBLIC_SITE_URL = https://yoursite.com
```

**Important Vercel settings:**
- Go to Project Settings → Functions → Set max duration to **60s** (for large file processing)
- Body size limit: already configured in `next.config.js` to 50MB

### Option B — Hostinger VPS (Full control)

```bash
# On your VPS (Ubuntu 22.04):

# 1. Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Install PM2 (process manager)
sudo npm install -g pm2

# 3. Clone your project
git clone https://github.com/yourname/pdfpro.git /var/www/pdfpro
cd /var/www/pdfpro

# 4. Install deps and build
npm install
cp .env.example .env.local
# Edit .env.local with your values
npm run build

# 5. Start with PM2
pm2 start npm --name "pdfpro" -- start
pm2 save
pm2 startup

# 6. Install Nginx
sudo apt install nginx -y
```

**Nginx config** (`/etc/nginx/sites-available/pdfpro`):
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Increase upload size
    client_max_body_size 100M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
```

```bash
# Enable and add SSL with Certbot
sudo ln -s /etc/nginx/sites-available/pdfpro /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option C — Hostinger Shared Hosting
Hostinger's shared plans don't support Node.js natively. Use **Hostinger VPS** (Plan: KVM 2 or higher) or deploy to Vercel and point your Hostinger domain to it.

---

## 🔍 SEO Checklist

- ✅ Dynamic `<title>` and `<meta description>` per tool page
- ✅ OpenGraph and Twitter Card tags
- ✅ JSON-LD structured data (WebApplication schema)
- ✅ Auto-generated `sitemap.xml` at `/sitemap.xml`
- ✅ Auto-generated `robots.txt` at `/robots.txt`
- ✅ Semantic HTML (H1→H2→H3 hierarchy)
- ✅ Clean URL slugs (`/compress-pdf`, `/merge-pdf`)
- ✅ Canonical URLs
- ✅ FAQ content per tool page (rich snippet eligible)
- ✅ Fast load via Next.js static generation
- ✅ Image `alt` attributes
- 🔲 Add Google Search Console verification meta tag in `layout.tsx`
- 🔲 Submit sitemap at search.google.com/search-console

**Target keywords built in:**
- "merge pdf online free"
- "compress pdf without losing quality"
- "convert pdf to word online"
- "split pdf online"
- "image to pdf converter"

---

## 📦 Key Libraries

| Package | Purpose |
|---|---|
| `pdf-lib` | Merge, split, compress, rotate PDFs in Node.js |
| `sharp` | Image optimization (install for image pre-processing) |
| `lucide-react` | Clean SVG icon set |
| `framer-motion` | Page and component animations |
| `next-seo` | Additional SEO helpers (optional) |

---

## 🛡️ Security Notes

1. **File validation** — always validate MIME type on the server, not just client-side
2. **Size limits** — enforced in both `FileUpload.tsx` and API routes
3. **Temp files** — pdf-lib works in memory; no disk writes needed for basic ops
4. **Rate limiting** — add `@upstash/ratelimit` with Redis for production
5. **Content Security Policy** — add CSP headers in `next.config.js` for XSS protection

---

## 🎨 Customising the Brand

| File | What to Change |
|---|---|
| `app/layout.tsx` | Site name, domain, OG image path |
| `tailwind.config.ts` | `brand.*` colors, fonts |
| `styles/globals.css` | Font import URLs |
| `components/Navbar.tsx` | Logo text/icon |
| `components/Footer.tsx` | Company name, links, social URLs |
| `lib/tools.ts` | Tool names, descriptions, limits |

---

## 📄 License

MIT — free to use, modify, and deploy commercially.
