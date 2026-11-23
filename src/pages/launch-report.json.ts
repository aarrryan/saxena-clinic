import type { APIRoute } from 'astro';
import { site, isLaunch } from '../config/site';
import { doctors, fullName } from '../data/doctors';
import { topics } from '../data/topics';
import { articles, isPublishable } from '../data/articles';

/**
 * Build-time verification report, read by scripts/verify-launch.mjs and deleted from the output before deploy.
 * Lists every fact or page that still needs clinic confirmation.
 */
export const GET: APIRoute = () => {
  if (!isLaunch) return new Response('{"note":"Generated only by `npm run build:launch`."}', { headers: { 'content-type': 'application/json' } });
  const facts: { field: string; status: string; source: string }[] = [];
  const push = (field: string, f: { status: string; source: string }) => facts.push({ field, status: f.status, source: f.source });
  push('address', site.address);
  site.phones.forEach((p, i) => push(`phone[${i}]`, p));
  push('whatsapp', site.whatsapp); push('email', site.email); push('hours', site.hours); push('geo', site.geo);
  push('instagram', site.instagram); push('rajeevExperienceYears', site.rajeevExperienceYears);

  const report = {
    siteUrl: site.url,
    blocking: [
      ...facts.filter((f) => f.status === 'supplied').map((f) => `Site fact "${f.field}" is supplied but not confirmed (${f.source}). Confirm it, or set it to 'missing'.`),
      ...doctors.filter((d) => d.profileStatus !== 'confirmed').map((d) => `Doctor profile ${fullName(d)} not approved by the clinic (profileStatus).`),
      ...topics.filter((t) => t.review.status !== 'approved' || !t.review.reviewer || !t.review.date).map((t) => `Medical page ${t.path} has no named clinical reviewer and review date.`),
      ...(site.url.includes('preview.invalid') ? ['SITE_URL is not set to the clinic’s real domain.'] : []),
    ],
    warnings: [
      ...facts.filter((f) => f.status === 'missing').map((f) => `Site fact "${f.field}" is missing — it will not be shown.`),
      ...doctors.filter((d) => d.qualifications.status !== 'confirmed').map((d) => `Qualifications for ${fullName(d)} are not confirmed — not shown.`),
      ...doctors.map((d) => (d.photo ? null : `No approved photograph for ${fullName(d)} — monogram placeholder shown.`)).filter(Boolean),
      ...topics.filter((t) => t.availability === 'to-confirm').map((t) => `${t.path} describes a treatment whose availability is unconfirmed (shown with an "ask the clinic" note).`),
      ...articles.filter((a) => !isPublishable(a)).map((a) => `Article "${a.title}" is a draft — excluded from launch.`),
      'Enquiry delivery is configured at runtime: set ENQUIRY_WEBHOOK_URL on the server, otherwise the form tells visitors to call.',
    ],
  };
  return new Response(JSON.stringify(report, null, 2), { headers: { 'content-type': 'application/json' } });
};
