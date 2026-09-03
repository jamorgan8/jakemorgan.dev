# Jake Morgan — career landing page

A mobile-first career landing page for recruiters and hiring managers arriving from `jakemorgan.dev` or the business-card QR URL `https://jakemorgan.dev/?src=card`.

## Architecture

- Vinext with a Cloudflare Worker entry point
- Cloudflare Turnstile verification and a private R2-backed resume
- No database, user accounts, analytics, or visitor storage
- System fonts, minimal client-side code, and no third-party assets

## Local development

Install dependencies with `npm install`, then run `npm run dev`. Create a production export with `npm run build`.

## Deployment

The production build emits a Cloudflare Worker in `dist/server/`. Configure the hosting project to deploy from the `main` branch. HTTPS should be Cloudflare-managed.

For the custom domain, set `jakemorgan.dev` as the primary domain and attach `www.jakemorgan.dev`. The included `public/_redirects` rule permanently redirects `www` traffic to the apex domain. Confirm the redirect after DNS is active.

## Content updates

- **Resume:** Upload the real PDF as the private R2 object `resume.pdf` in the `resume_assets` bucket. Do not place it in `public/` or commit it to this public repository. Visitors are sent through `/resume-access`; after server-side Turnstile verification they receive a signed, five-minute, HTTP-only access cookie and can load `/resume.pdf`.
- **Contact links:** Replace the three clearly marked placeholder values in `app/page.tsx` for LinkedIn, GitHub, and email.
- **Accomplishments:** Edit the `impact` array in `app/page.tsx`.
- **Headshot:** None is required. To add one later, place an optimized WebP image in `public/` and add it to the hero with descriptive alt text.
- **QR attribution:** `?src=card` is intentionally accepted without redirecting, transmitting, or storing visitor data. The parameter remains available for future privacy-conscious first-party attribution.

## Placeholders still required

1. LinkedIn profile URL
2. GitHub profile URL
3. Email address
4. A real resume PDF uploaded to the private R2 bucket as `resume.pdf`
5. Production `TURNSTILE_SITE_KEY` and secret `TURNSTILE_SECRET_KEY`

## Production checklist

- Create a managed Turnstile widget for `jakemorgan.dev` and `www.jakemorgan.dev`.
- Configure `TURNSTILE_SITE_KEY` as a runtime variable and `TURNSTILE_SECRET_KEY` as a secret. Never deploy the test credentials from `.env.example`.
- Upload the resume to the bound private R2 bucket with the object name `resume.pdf`.
- Connect the repository's `main` branch to the hosting project.
- Add `jakemorgan.dev` and `www.jakemorgan.dev` as custom domains.
- Confirm Cloudflare-managed HTTPS and the permanent `www` redirect.
- Replace all four placeholders above before printing the QR code.
