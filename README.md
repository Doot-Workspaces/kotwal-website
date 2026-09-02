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

S3 + CloudFront, provisioned by CloudFormation (`infra/cloudformation.yml`).
DNS for `kotwal.cloudsaathi.com` is a GoDaddy CNAME pointing at the
CloudFront distribution domain.

### One-time bootstrap

1. Set repo secrets `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` to a
   user with permissions to create S3 buckets, CloudFront distributions,
   IAM users, and Secrets Manager secrets.
2. Trigger **Bootstrap AWS infra (one-time)** via the Actions tab —
   workflow_dispatch only. It deploys the CloudFormation stack and prints
   the bucket name, distribution ID, distribution domain, and the
   Secrets Manager name holding the scoped deployer credentials.
3. Follow the workflow summary's next-steps:
   - Set `AWS_S3_BUCKET` + `CLOUDFRONT_DISTRIBUTION_ID` GitHub secrets.
   - Retrieve scoped deployer keys from Secrets Manager and rotate
     `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` to those values.
   - Add a GoDaddy CNAME for `kotwal.cloudsaathi.com` →
     `<distribution>.cloudfront.net`.
4. Push any commit to `main` — `Build & Deploy to S3` workflow ships the site.

### What CloudFormation creates

| Resource | Purpose |
|---|---|
| Private S3 bucket (versioning on, 30-day noncurrent expiration) | Static site hosting |
| CloudFront distribution with Origin Access Control (OAC) | HTTPS edge, custom domain, SPA fallback |
| Bucket policy | Locks read access to this distribution only |
| Scoped IAM user | Used by `deploy.yml` — only `s3:Sync` + `cloudfront:CreateInvalidation` on these resources |
| Secrets Manager entry | Holds the scoped IAM user's access key + secret |

The CloudFront distribution uses managed cache + origin-request +
security-headers policies and falls back to `/index.html` on 403/404
so client-side router routes resolve correctly (10-second cache TTL on
the fallback so real 404s recover quickly).

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


<!-- Security scan triggered at 2026-08-31 16:59:37 -->

<!-- Security scan triggered at 2026-08-31 16:46:08 -->

<!-- Security scan triggered at 2026-08-31 18:17:31 -->

<!-- Security scan triggered at 2026-09-02 06:42:35 -->

<!-- Security scan triggered at 2026-09-02 06:46:49 -->