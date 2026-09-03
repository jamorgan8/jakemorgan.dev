import app from 'vinext/server/fetch-handler';

interface Env {
  ASSETS: Fetcher;
  resume_assets: R2Bucket;
  TURNSTILE_SITE_KEY?: string;
  TURNSTILE_SECRET?: string;
  TURNSTILE_HOSTNAMES?: string;
}

const COOKIE_NAME = 'resume_access';
const COOKIE_LIFETIME_SECONDS = 5 * 60;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
  })[character] ?? character);
}

function gatePage(siteKey?: string, error?: string) {
  const configured = Boolean(siteKey);
  const errorMessage = error === 'verification'
    ? 'Verification was not completed. Please try again.'
    : error === 'unavailable'
      ? 'The resume is being updated. Please try again shortly.'
      : '';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Resume access | Jake Morgan</title>
  <meta name="theme-color" content="#08111f">
  <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
  <style>
    :root{color-scheme:light;--ink:#08111f;--slate:#435064;--line:#d8dee8;--paper:#f7f9fc;--blue:#175cd3;--cyan:#43c7b9;--focus:#f6b73c}*{box-sizing:border-box}body{margin:0;min-height:100svh;display:grid;place-items:center;padding:1rem;background:var(--paper);color:var(--ink);font:16px/1.6 Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.shell{width:min(100%,34rem)}.wordmark{display:inline-flex;align-items:center;gap:.7rem;margin-bottom:1.25rem;font-weight:750;text-decoration:none;letter-spacing:-.02em}.wordmark span{display:grid;place-items:center;width:2rem;height:2rem;border-radius:.45rem;background:var(--ink);color:#fff;font-size:.76rem;letter-spacing:.05em}.card{padding:clamp(1.5rem,6vw,2.5rem);border:1px solid var(--line);border-radius:.75rem;background:#fff;box-shadow:0 16px 45px rgb(8 17 31/.08)}.eyebrow{margin:0 0 .7rem;color:var(--blue);font:700 .78rem/1.2 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.1em;text-transform:uppercase}h1{margin:0 0 .8rem;font-size:clamp(2rem,10vw,3.1rem);line-height:1;letter-spacing:-.055em}p{margin:0;color:var(--slate)}form{display:grid;gap:1rem;margin-top:1.7rem}.cf-turnstile{min-height:4rem}.button{min-height:3.15rem;border:0;border-radius:.55rem;background:var(--blue);color:#fff;font:700 .95rem/1 system-ui,sans-serif;cursor:pointer}.button:disabled{cursor:not-allowed;opacity:.55}.button:focus-visible,a:focus-visible{outline:3px solid var(--focus);outline-offset:4px}.error{margin-top:1rem;padding:.8rem;border-left:3px solid #c33;background:#fff5f5;color:#8a1f1f}.note{margin-top:1rem;font-size:.82rem}.back{display:inline-block;margin-top:1.25rem;color:var(--ink);font-weight:650;text-underline-offset:.25rem}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}
  </style>
</head>
<body>
  <main class="shell">
    <a class="wordmark" href="/"><span aria-hidden="true">JM</span>Jake Morgan</a>
    <section class="card" aria-labelledby="gate-title">
      <p class="eyebrow">Resume access</p>
      <h1 id="gate-title">One quick check.</h1>
      <p>This helps keep automated scrapers away from the personal information in my resume.</p>
      ${errorMessage ? `<p class="error" role="alert">${escapeHtml(errorMessage)}</p>` : ''}
      <form method="post" action="/resume-access">
        ${configured ? `<div class="cf-turnstile" data-sitekey="${escapeHtml(siteKey!)}" data-action="resume_download" data-theme="light" data-size="flexible"></div>` : ''}
        <button class="button" type="submit" ${configured ? '' : 'disabled'}>Continue to resume</button>
      </form>
      <noscript><p class="error">JavaScript is required to complete the bot check.</p></noscript>
      ${configured ? '<p class="note">Verification expires after five minutes and is used only for this download.</p>' : '<p class="note">Resume access is being configured.</p>'}
      <a class="back" href="/">← Back to profile</a>
    </section>
  </main>
</body>
</html>`;
}

function htmlResponse(html: string, status = 200) {
  return new Response(html, {
    status,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store',
      'content-security-policy': "default-src 'none'; script-src https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src https://challenges.cloudflare.com; style-src 'unsafe-inline'; img-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'",
      'referrer-policy': 'no-referrer',
      'x-content-type-options': 'nosniff',
    },
  });
}

function parseCookie(request: Request, name: string) {
  const cookie = request.headers.get('cookie') ?? '';
  return cookie.split(';').map((item) => item.trim()).find((item) => item.startsWith(`${name}=`))?.slice(name.length + 1);
}

function bytesToHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function signature(secret: string, expires: string) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return bytesToHex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${COOKIE_NAME}:${expires}`)));
}

async function hasValidAccess(request: Request, secret?: string) {
  if (!secret) return false;
  const value = parseCookie(request, COOKIE_NAME);
  if (!value) return false;
  const [expires, suppliedSignature] = value.split('.');
  if (!expires || !suppliedSignature || Number(expires) <= Math.floor(Date.now() / 1000)) return false;
  const expectedSignature = await signature(secret, expires);
  if (expectedSignature.length !== suppliedSignature.length) return false;
  let difference = 0;
  for (let index = 0; index < expectedSignature.length; index += 1) difference |= expectedSignature.charCodeAt(index) ^ suppliedSignature.charCodeAt(index);
  return difference === 0;
}

async function verifyTurnstile(request: Request, secret: string, token: string, hostnameList: string) {
  const expectedHostnames = new Set(
    hostnameList
      .split(',')
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );
  if (token.length === 0 || token.length > 2048 || expectedHostnames.size === 0) return false;
  try {
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({ secret, response: token, remoteip: request.headers.get('cf-connecting-ip') ?? '' }),
    });
    if (!response.ok) return false;
    const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
    return result.success === true && Boolean(result.hostname && expectedHostnames.has(result.hostname)) && result.action === 'resume_download';
  } catch {
    return false;
  }
}

async function handleGate(request: Request, env: Env) {
  if (request.method === 'GET') {
    return htmlResponse(gatePage(env.TURNSTILE_SITE_KEY, new URL(request.url).searchParams.get('error') ?? undefined));
  }
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { allow: 'GET, POST' } });
  if (!env.TURNSTILE_SITE_KEY || !env.TURNSTILE_SECRET || !env.TURNSTILE_HOSTNAMES) return htmlResponse(gatePage(undefined, 'unavailable'), 503);
  const form = await request.formData();
  const token = form.get('cf-turnstile-response');
  if (typeof token !== 'string' || !(await verifyTurnstile(request, env.TURNSTILE_SECRET, token, env.TURNSTILE_HOSTNAMES))) {
    return Response.redirect(new URL('/resume-access?error=verification', request.url), 303);
  }
  const expires = String(Math.floor(Date.now() / 1000) + COOKIE_LIFETIME_SECONDS);
  const signed = await signature(env.TURNSTILE_SECRET, expires);
  return new Response(null, {
    status: 303,
    headers: {
      location: '/resume.pdf',
      'set-cookie': `${COOKIE_NAME}=${expires}.${signed}; Max-Age=${COOKIE_LIFETIME_SECONDS}; Path=/resume.pdf; HttpOnly; Secure; SameSite=Strict`,
      'cache-control': 'no-store',
    },
  });
}

async function handleResume(request: Request, env: Env) {
  if (!(await hasValidAccess(request, env.TURNSTILE_SECRET))) return Response.redirect(new URL('/resume-access', request.url), 302);
  const resume = await env.resume_assets?.get('resume.pdf');
  if (!resume) return Response.redirect(new URL('/resume-access?error=unavailable', request.url), 302);
  return new Response(resume.body, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': 'inline; filename="Jake-Morgan-Resume.pdf"',
      'cache-control': 'private, no-store',
      'content-security-policy': "default-src 'none'; frame-ancestors 'self'",
      'x-content-type-options': 'nosniff',
      'x-robots-tag': 'noindex, nofollow, noarchive',
    },
  });
}

const worker = {
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const pathname = new URL(request.url).pathname;
    if (pathname === '/resume-access') return handleGate(request, env);
    if (pathname === '/resume.pdf') return handleResume(request, env);
    return app.fetch(request, env, context);
  },
};

export default worker;
