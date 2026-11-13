# SBM GOLD website

Website for SBM GOLD (SBM Pipe Industries Private Limited, Siliguri): uPVC doors and windows profiles, WPC door frames, HDPE and uPVC pipes, water tanks and wall putty.

Built with **Next.js 14 (App Router)**, **TypeScript**, **GSAP + ScrollTrigger** and **Lenis** smooth scrolling. Every page is rendered to static HTML at build time.

## Pages

| Route | What it shows |
| --- | --- |
| `/` | Home: hero, mission with the HDPE-pipe Earth animation, about, strengths, quality, products, company, emblem zoom, partner, milestones |
| `/about` | Mission, key numbers, strengths, quality, company details, milestones |
| `/products`, `/products/[slug]` | Product range with a category filter, and one page per product |
| `/partner` | Ways to partner, benefits, how it works, partner inquiry form |
| `/contact` | Call, email, visit and Instagram cards, inquiry form |
| `/blog`, `/blog/[slug]` | Articles with a topic filter |
| `/privacy`, `/sitemap` | Privacy policy and an HTML sitemap |

`/sitemap.xml` and `/robots.txt` are generated from `app/sitemap.ts` and `app/robots.ts`.

## Where things live

- `lib/site.ts`: site URL, contact details, header and footer menus, page metadata helper
- `lib/products.ts`, `lib/blog.ts`: product and article content
- `lib/seo.ts`: structured data (JSON-LD) for search engines
- `lib/pipeEarth.js`: the rotating Earth animation (settings at the top of the file)
- `components/sections/`: home page sections, reused on inner pages
- `components/inner/`: building blocks for the inner pages
- `app/globals.css`: site-wide styles on top of the theme in `public/theme/css/style.css`
- `app/inner-pages.css`: styles for the inner pages (classes start with `ip-`)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production

```bash
npm run build
npm start
```

The site can be deployed to any Node.js host or to Vercel without extra settings. If the domain changes, update `SITE_URL` in `lib/site.ts`.
