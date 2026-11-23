// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.SITE_URL || 'https://preview.invalid';
const isLaunch = process.env.PUBLIC_SITE_MODE === 'launch';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  output: 'static',                       // every page is prerendered; only /api/enquiry runs on demand
  adapter: node({ mode: 'middleware' }),  // wrapped by server.mjs, which adds security headers
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/api/') &&
        // drafts are noindexed in preview and not generated at launch
        !(page.includes('/patient-education/') && /patient-education\/.+\/$/.test(page) && !isLaunch),
    }),
  ],
  image: { responsiveStyles: false },
  build: { format: 'directory', inlineStylesheets: 'auto' },
  vite: { define: { 'import.meta.env.SITE_URL': JSON.stringify(SITE_URL) } },
});
