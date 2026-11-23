import type { APIRoute } from 'astro';
import { site, isLaunch } from '../config/site';

/** Preview builds disallow all crawling; launch builds allow crawling and point to the sitemap. */
export const GET: APIRoute = () => {
  const body = isLaunch
    ? `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${new URL('/sitemap-index.xml', site.url).href}\n`
    : `# Preview build — not for indexing\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
};
