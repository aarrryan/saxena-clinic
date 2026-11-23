#!/usr/bin/env node
/**
 * Launch guard — run automatically by `npm run build:launch`.
 * Fails (exit 1) if anything that must be confirmed by the clinic is still unconfirmed, if placeholder text
 * reached the built pages, or if the site would still be noindexed.
 */
import { readFileSync, readdirSync, statSync, rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const out = 'dist/client';
const problems = [];
const reportPath = join(out, 'launch-report.json');
if (!existsSync(reportPath)) { console.error('launch-report.json missing — did the build run?'); process.exit(1); }
const report = JSON.parse(readFileSync(reportPath, 'utf8'));
rmSync(reportPath);                                      // never deploy the report
problems.push(...report.blocking);

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const html = walk(out).filter((f) => f.endsWith('.html'));
const markers = [/data-needs-confirmation/, /NEEDS_CONFIRMATION/, /Preview build/, /awaiting clinical review/i, /lorem ipsum/i, /preview\.invalid/];
for (const f of html) {
  const s = readFileSync(f, 'utf8');
  for (const m of markers) if (m.test(s)) problems.push(`${f.replace(out, '')}: contains placeholder marker ${m}`);
  if (!f.endsWith('404.html') && /<meta name="robots" content="noindex/.test(s) && !/patient-education\/.+\//.test(f)) problems.push(`${f.replace(out, '')}: still noindex`);
}
const robots = readFileSync(join(out, 'robots.txt'), 'utf8');
if (/Disallow: \/\s*$/m.test(robots)) problems.push('robots.txt disallows everything');

console.log(`\nLaunch verification — ${html.length} pages checked\n`);
if (report.warnings.length) { console.log('Warnings (not blocking):'); report.warnings.forEach((w) => console.log('  · ' + w)); console.log(''); }
if (problems.length) {
  console.error(`✗ Not ready to launch — ${problems.length} blocking item(s):`);
  [...new Set(problems)].forEach((p) => console.error('  ✗ ' + p));
  console.error('\nSee CONTENT-VERIFICATION.md. Preview builds (`npm run build`) are unaffected.');
  process.exit(1);
}
console.log('✓ Ready to launch.');
