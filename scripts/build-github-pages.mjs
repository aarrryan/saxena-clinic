import { spawn } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';
import { resolve } from 'node:path';

const apiFile = resolve('src/pages/api/enquiry.ts');
const disabledFile = resolve('src/pages/api/enquiry.ts.github-pages-disabled');
const astroCli = resolve('node_modules/astro/bin/astro.mjs');

if (!existsSync(apiFile)) {
  console.error('Enquiry API route not found. Aborting.');
  process.exit(1);
}

if (existsSync(disabledFile)) {
  console.error('Temporary API backup already exists. Aborting.');
  process.exit(1);
}

if (!existsSync(astroCli)) {
  console.error('Local Astro CLI not found. Run npm ci first.');
  process.exit(1);
}

renameSync(apiFile, disabledFile);

let exitCode = 1;

try {
  exitCode = await new Promise((resolveResult, reject) => {
    const child = spawn(process.execPath, [astroCli, 'build'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        GITHUB_PAGES: 'true',
        SITE_URL: 'https://aarrryan.github.io',
        PUBLIC_SITE_MODE: 'preview',
      },
    });

    child.on('error', reject);
    child.on('close', (code) => resolveResult(code ?? 1));
  });
} catch (error) {
  console.error('GitHub Pages build failed:', error);
  exitCode = 1;
} finally {
  if (existsSync(disabledFile)) {
    renameSync(disabledFile, apiFile);
    console.log('Enquiry API route restored.');
  }
}

process.exitCode = exitCode;
