# Jake Morgan — career portfolio

A responsive career portfolio for recruiters, hiring managers, and professional contacts. The production site is [jakemorgan.dev](https://jakemorgan.dev); `https://jakemorgan.dev/?src=card` is the business-card QR destination.

## What is included

- Hero, technical skills, career highlights, professional experience, personal interests, and contact sections
- Two optimized WebP photos supplied by Jake and stored in `public/`
- A bot-gated resume served from private object storage rather than the public repository
- Responsive styling, reduced-motion support, semantic HTML, and keyboard-visible focus states

## Architecture

- Vinext/React application with a Cloudflare Worker entry point
- OpenAI Sites hosting, configured by `.openai/hosting.json`
- Cloudflare Turnstile verification and a private R2-backed resume
- No application database, user accounts, analytics, or visitor-data persistence
- Site-wide transport, framing, MIME-sniffing, referrer, and browser-permission security headers

## Local development

Use Node.js 22.13 or newer.

```bash
npm install
npm run dev
```

Run the quality checks before publishing:

```bash
npm run lint
npm run build
```

Local Turnstile development uses the public test credentials documented in `.env.example`. Copy them into an ignored `.env.local` file; never put production credentials in a committed file or in a `VITE_`-prefixed variable.

## Deployment

The production build emits the Worker bundle in `dist/server/`. Publishing is handled through OpenAI Sites using the project in `.openai/hosting.json`. The custom domains are `jakemorgan.dev` and `www.jakemorgan.dev`; the Worker permanently redirects `www` to the HTTPS apex domain.

Production must provide these runtime values:

- `TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET`
- `TURNSTILE_HOSTNAMES` as a comma-separated allowlist
- The private R2 binding `resume_assets`, containing `resume.pdf`

## Content updates

- **Page copy and links:** Edit `app/page.tsx`. The Career Highlights content is in the `impact` array and professional roles are in `experience`.
- **Styling:** Edit `app/globals.css`.
- **Personal photos:** Replace the optimized WebP files in `public/`, preserve meaningful alt text, and strip location/camera metadata before committing replacements.
- **Resume:** Upload the PDF as the private R2 object `resume.pdf`. Never add the resume PDF to `public/` or commit it to this repository. Visitors pass `/resume-access`, complete server-side Turnstile verification, and receive a signed, five-minute, `HttpOnly`, `Secure`, `SameSite=Strict` cookie scoped to `/resume.pdf`.
- **QR attribution:** `?src=card` remains available for future privacy-conscious, first-party attribution, but is not currently transmitted or stored by the application.

## Security notes

- Secrets belong in the hosting environment or ignored local environment files. `.gitignore` also excludes common private-key, credential, and local Worker secret formats.
- The example Turnstile values are Cloudflare's public test credentials and must never be used in production.
- The main page does not use a restrictive Content Security Policy because the current React/Vinext runtime emits inline bootstrap scripts. The resume gate has a route-specific allowlist CSP.
- The site accepts no file uploads and processes no visitor-supplied images. Its transitive `image-size` package therefore only sees trusted repository assets during the current build/runtime flow.
- Public portfolio copy, contact links, and personal photos are intentionally public; review them as public information before publishing changes.
