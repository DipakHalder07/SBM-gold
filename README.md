# 株式会社YMD (Yamada) - Pixel-Perfect Next.js Homepage

A pixel-perfect, high-performance replica of the corporate homepage of [株式会社YMD (e-ymd.com)](https://www.e-ymd.com/) built with **Next.js 14 (App Router)**, **TypeScript**, **GSAP & ScrollTrigger**, and the complete official visual asset pipeline and design system.

---

## 🌟 Features & Animations

1. **Custom Interactive Cursor (`#cursor`)**:
   - Smooth mouse coordinate following
   - Magnetic transform into a prominent red circular badge with `"MORE"` indicator when hovering over interactive cards (`.more-cursor`).

2. **Video Hero Section**:
   - Autoplaying, muted, responsive looped background video (`fv01.mp4`).
   - Floating diagonal geometric SVG accents with staggered keyframe entry (`anime-diag-lft`, `anime-diag-rgt`).
   - Catchphrase stagger animations (`anime-fade-lft`, `delay1`, `delay2`).
   - Infinite marquee typography ticker banner (`Noting is impossible.`).

3. **Mission Section ("OUR MISSION")**:
   - Numbered philosophy statements with rich Japanese typography (`Noto Sans JP` / `Gothic MB101`).
   - Dual-loop continuous horizontal sliding gallery (`.scroll-img--list`) featuring factory and component snapshots.

4. **About Section ("ABOUT")**:
   - Large custom typographic SVG watermark (`about-ttl.svg`).
   - 3 interactive highlight circular cards with custom line-art iconography (Trading Company, Manufacturer Function, Quality Assurance).

5. **YMD's Strengths ("FEATURE 01 - 05")**:
   - Alternating layout cards for 5 core pillars.
   - Distinctive 5-dot matrix ornamentation and angled red/white decorative geometry.
   - Smooth hover elevation and responsive layout.

6. **Quality Management & Products**:
   - 3-column interactive grids with custom link overlays and circular action indicators.
   - Products showcase with oversized English numerals (`01`, `02`, `03`) and arrow transition cues.

7. **The Iconic YMD Sticky Zoom Animation (`.home_ymd`)**:
   - 220vh scroll journey with GSAP `ScrollTrigger` scrubbing.
   - The giant corporate YMD logo scales up by **3000% (30x)** right into the camera, transitioning through red and blue wireframes into the bold corporate blue background.
   - Reveals the centered catchphrase *"自分だけの価値を創造しよう"* flanked by counter-scrolling typography banners.

8. **Recruit & News**:
   - Comprehensive career benefits presentation, employee environment highlights, and recruitment photography carousel.
   - Company press releases and Awwwards nomination announcements.

9. **Contact CTA & Comprehensive Footer**:
   - Contact CTA block with mail icon, Japanese telephone hotline, and reception schedule.
   - Multi-column site navigation map, social links (Facebook, Instagram), and copyright details.

10. **Cookie Notice Banner**:
    - Floating bottom notification with smooth blur backdrop and dismissible action.

---

## 🚀 Getting Started

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```
# SBM-gold
