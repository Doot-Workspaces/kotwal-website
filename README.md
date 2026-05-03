# kotwal-website

Marketing site for **Kotwal** — an AI security agent powered by Claude Code.

Live at: `https://kotwal.cloudsaathi.com` (planned subdomain)
Product repo: `Doot-Workspaces/kotwal`
Parent: [CloudSaathi](https://cloudsaathi.com) — Doot Workspaces

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS (utilities only — bulk of styling is inline via `src/design.ts` tokens, sibling pattern to `cloudsaathi-main-website`)
- `react-router-dom` (currently single page; reserved for `/docs`, `/changelog`, etc.)
- `react-helmet-async` for SEO meta
- `lucide-react` for icons

## Local dev

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build to ./dist
npm run preview      # preview the build on :4173
npm run typecheck    # tsc --noEmit
npm run lint
```

## Design system

Tokens live in `src/design.ts`:

- **Palette** — warm cream (`#F5F1E8`) base, maroon (`#811622`) primary, orange (`#F58634`) accent, plum (`#53435B`) quiet detail. Mirrors Kotwal's CLI brand.
- **Fonts** — Playfair Display (display), Outfit (body), IBM Plex Mono (code), Noto Sans Devanagari (Hindi-script accents — कोतवाल, चौकीदार, etc.)
- **Signature interactions** — Devanagari hover-flip on key headings (`DvH` component), Sanskrit watermark code lines as background texture, reveal-on-scroll for every section

The styling is intentionally inline-style React (not Tailwind classes) to match the CloudSaathi sibling site's pattern. Tailwind is configured for utility classes if needed.

## Deploy

Vercel — separate project from `cloudsaathi-main-website`. Domain: `kotwal.cloudsaathi.com` via DNS CNAME.

## Sections

| Section | File location |
|--------|---------------|
| Nav | `KotwalSite.tsx` → `Nav` |
| Hero | `KotwalSite.tsx` → `Hero` |
| Trust strip | `KotwalSite.tsx` → `TrustStrip` |
| How it works | `KotwalSite.tsx` → `HowItWorks` |
| Sub-agents grid | `KotwalSite.tsx` → `SubAgents` |
| Sample report | `KotwalSite.tsx` → `SampleReport` |
| Pricing | `KotwalSite.tsx` → `Pricing` |
| FAQ | `KotwalSite.tsx` → `FAQ` |
| Final CTA | `KotwalSite.tsx` → `FinalCTA` |
| Footer | `KotwalSite.tsx` → `Footer` |

## To-do before launch

- [ ] Sign and place a sample DOCX/PDF at `/public/sample-report.pdf`
- [ ] Replace placeholder Gumroad URL in `src/design.ts` once the listing is live
- [ ] Add `og-image.png` (1200×630) to `/public/`
- [ ] Wire DNS for `kotwal.cloudsaathi.com`
- [ ] Add Plausible/Umami analytics (optional — keeps the page tracker-light)
