/**
 * Production server: serves the prerendered site from dist/client with security and caching headers,
 * and hands /api/* to Astro (the enquiry endpoint). Run with `npm start` after `npm run build`.
 *
 *   PORT (default 4321) · HOST (default 0.0.0.0)
 */
import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import { extname, join, normalize, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createBrotliCompress, createGzip, constants as zc } from 'node:zlib';
import { handler as astro } from './dist/server/entry.mjs';

const root = resolve(fileURLToPath(new URL('./dist/client/', import.meta.url)));
const PORT = Number(process.env.PORT || 4321), HOST = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.webp': 'image/webp', '.avif': 'image/avif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff',
};

const COMPRESSIBLE = new Set(['.html', '.css', '.js', '.json', '.xml', '.txt', '.svg', '.webmanifest']);

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "frame-src 'self' https://www.google.com https://maps.google.com",
  "media-src 'self'",
  "object-src 'none'", "base-uri 'self'", "form-action 'self'", "frame-ancestors 'self'",
].join('; ');

function securityHeaders(res) {
  res.setHeader('Content-Security-Policy', CSP);
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), interest-cohort=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
}

function fileFor(pathname) {
  let p;
  try { p = decodeURIComponent(pathname); } catch { return null; }
  const abs = normalize(join(root, p));
  if (!abs.startsWith(root)) return null;                                   // path traversal guard
  for (const cand of [abs, join(abs, 'index.html')]) {
    try { const st = statSync(cand); if (st.isFile()) return { path: cand, size: st.size }; } catch { /* next */ }
  }
  return null;
}

const server = http.createServer((req, res) => {
  securityHeaders(res);
  const url = new URL(req.url || '/', 'http://local');
  if (url.pathname.startsWith('/api/')) return astro(req, res);
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }

  // Canonical trailing slash for page routes (files with extensions are left alone).
  if (!url.pathname.endsWith('/') && !extname(url.pathname)) {
    res.writeHead(301, { Location: `${url.pathname}/${url.search}` }); return res.end();
  }
  const f = fileFor(url.pathname);
  if (!f) {
    const nf = fileFor('/404.html');
    res.writeHead(404, { 'Content-Type': TYPES['.html'], 'Cache-Control': 'no-cache' });
    return nf && req.method === 'GET' ? createReadStream(nf.path).pipe(res) : res.end();
  }
  const ext = extname(f.path);
  const immutable = url.pathname.startsWith('/_astro/');
  const headers = {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': immutable ? 'public, max-age=31536000, immutable' : ext === '.html' ? 'public, max-age=0, must-revalidate' : 'public, max-age=86400',
    Vary: 'Accept-Encoding',
  };
  // Compress text responses (HTML, CSS, JS, JSON, XML, SVG, text); images and fonts are already compressed.
  const accept = String(req.headers['accept-encoding'] || '');
  const compressible = COMPRESSIBLE.has(ext) && f.size > 1024;
  const enc = compressible ? (/\bbr\b/.test(accept) ? 'br' : /\bgzip\b/.test(accept) ? 'gzip' : null) : null;
  if (enc) headers['Content-Encoding'] = enc; else headers['Content-Length'] = f.size;
  res.writeHead(200, headers);
  if (req.method === 'HEAD') return res.end();
  const src = createReadStream(f.path);
  if (enc === 'br') src.pipe(createBrotliCompress({ params: { [zc.BROTLI_PARAM_QUALITY]: 5 } })).pipe(res);
  else if (enc === 'gzip') src.pipe(createGzip({ level: 6 })).pipe(res);
  else src.pipe(res);
});

server.listen(PORT, HOST, () => console.log(`Saxena Clinic site on http://${HOST}:${PORT}`));
