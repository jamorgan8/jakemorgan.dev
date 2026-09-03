# Jake Morgan — career landing page

A mobile-first career landing page for recruiters and hiring managers arriving from `jakemorgan.dev` or the business-card QR URL `https://jakemorgan.dev/?src=card`.

## Architecture

- Vinext static export with React and a single page
- Cloudflare-compatible static output in `dist/client/`
- No backend, database, authentication, analytics, or visitor storage
- System fonts, minimal client-side code, and no third-party assets

## Local development

Install dependencies with `npm install`, then run `npm run dev`. Create a production export with `npm run build`.

## Deployment

The production build exports the site to `dist/client/`. Configure the hosting project to publish that directory from the `main` branch. HTTPS should be Cloudflare-managed.

For the custom domain, set `jakemorgan.dev` as the primary domain and attach `www.jakemorgan.dev`. The included `public/_redirects` rule permanently redirects `www` traffic to the apex domain. Confirm the redirect after DNS is active.

## Content updates

- **Resume:** Add the real PDF at `public/resume.pdf`. It will be available at `https://jakemorgan.dev/resume.pdf`. The included text file is only an obvious placeholder; no resume was fabricated.
- **Contact links:** Replace the three clearly marked placeholder values in `app/page.tsx` for LinkedIn, GitHub, and email.
- **Accomplishments:** Edit the `impact` array in `app/page.tsx`.
- **Headshot:** None is required. To add one later, place an optimized WebP image in `public/` and add it to the hero with descriptive alt text.
- **QR attribution:** `?src=card` is intentionally accepted without redirecting, transmitting, or storing visitor data. The parameter remains available for future privacy-conscious first-party attribution.

## Placeholders still required

1. LinkedIn profile URL
2. GitHub profile URL
3. Email address
4. Real resume PDF at `public/resume.pdf`

## Production checklist

- Connect the repository's `main` branch to the hosting project.
- Add `jakemorgan.dev` and `www.jakemorgan.dev` as custom domains.
- Confirm Cloudflare-managed HTTPS and the permanent `www` redirect.
- Replace all four placeholders above before printing the QR code.
