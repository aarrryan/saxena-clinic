// @ts-check
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';

const SITE_URL = process.env.SITE_URL || 'https://preview.invalid';
const isLaunch = process.env.PUBLIC_SITE_MODE === 'launch';
const isGithubPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  site: SITE_URL,
  base: isGithubPages ? '/saxena-clinic' : '/',
  trailingSlash: 'always',
  output: 'static',

  // Keep the Node adapter for normal server deployments.
  // GitHub Pages uses static files and does not run a Node server.
  ...(isGithubPages ? {} : { adapter: node({ mode: 'middleware' }) }),

  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/api/') &&
        !(page.includes('/patient-education/') &&
          /patient-education\/.+\/$/.test(page) && !isLaunch),
    }),
  ],

  image: { responsiveStyles: false },
  build: { format: 'directory', inlineStylesheets: 'auto' },

  vite: {
    define: {
      'import.meta.env.SITE_URL': JSON.stringify(SITE_URL),
    },
  },
});
