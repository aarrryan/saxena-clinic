/**
 * Central site configuration.
 *
 * Every fact about the clinic lives here once, with its verification status:
 *   - 'confirmed'  : approved by the clinic for publication.
 *   - 'supplied'   : provided in the client's notes, not yet confirmed. Shown in preview builds,
 *                    but `npm run build:launch` refuses to build until it is confirmed.
 *   - 'missing'    : not supplied. Never rendered. Code paths that need it render nothing.
 *
 * Nothing in this file may be invented. If a value is unknown, leave it 'missing'.
 */
export type Status = 'confirmed' | 'supplied' | 'missing';
export interface Fact<T = string> { value: T | null; status: Status; source: string }

const fact = <T,>(value: T | null, status: Status, source: string): Fact<T> => ({ value, status, source });

export const site = {
  name: 'Saxena Skin and Cosmetic Clinic',
  shortName: 'Saxena Clinic',
  city: 'Jabalpur',
  region: 'Madhya Pradesh',
  country: 'India',
  countryCode: 'IN',

  /** Absolute origin used for canonicals, sitemap and Open Graph. Set SITE_URL in the environment. */
  url: (import.meta.env.SITE_URL as string | undefined) ?? 'https://preview.invalid',

  address: fact(
    {
      streetAddress: '1 Kushi Plaza, Krishna Hotel Road, Near Bhavartal Garden, Napier Town',
      addressLocality: 'Jabalpur',
      addressRegion: 'Madhya Pradesh',
      postalCode: '482002',
      addressCountry: 'IN',
    },
    'supplied',
    'reference-assets/Pasted markdown.md — "Proper Address"',
  ),
  phones: [
    fact({ display: '0761 245 0122', e164: '+917612450122' }, 'supplied', 'Pasted markdown.md — Phone number 1'),
    fact({ display: '83492 55492', e164: '+918349255492' }, 'supplied', 'Pasted markdown.md — Phone number 2'),
  ],
  whatsapp: fact<string>(null, 'missing', 'Pasted markdown.md — "Existing WhatsApp link was unable to load"'),
  email: fact<string>(null, 'missing', 'Pasted markdown.md — "Not available in the collected notes"'),
  hours: fact<string>(null, 'missing', 'Not supplied'),
  geo: fact<{ lat: number; lng: number }>(null, 'missing', 'Not supplied — never derive coordinates'),
  instagram: fact(
    { handle: 'saxena_skin_and_cosmetic', url: 'https://www.instagram.com/saxena_skin_and_cosmetic/' },
    'supplied',
    'Handle burned into the clinic’s own supplied reels (2ae4a4ef…, 7908c711…, e607b189…)',
  ),
  /** Experience claim — client-stated, applies ONLY to Dr. Rajeev Saxena. */
  rajeevExperienceYears: fact(40, 'supplied', 'Client brief §3A and master prompt §3'),
} as const;

/** Preview builds are noindexed and may show 'supplied' facts. Launch builds require everything rendered to be confirmed. */
export const isLaunch = (import.meta.env.PUBLIC_SITE_MODE as string | undefined) === 'launch';

/** A fact can be rendered if it is confirmed, or supplied while in preview. Missing facts never render. */
export function canShow<T>(f: Fact<T>): f is Fact<T> & { value: T } {
  if (f.value === null || f.status === 'missing') return false;
  return f.status === 'confirmed' || !isLaunch;
}
/**
 * WhatsApp actions only ever use a confirmed number. Phone numbers are click-to-call whenever they are shown
 * (client instruction, 22 Nov 2026); they still count as unconfirmed for the launch check until set to 'confirmed'.
 */
export const canLink = <T,>(f: Fact<T>): boolean => f.value !== null && f.status === 'confirmed';

export const integrations = {
  ga4Id: (import.meta.env.PUBLIC_GA4_ID as string | undefined) || null,
  gscVerification: (import.meta.env.PUBLIC_GSC_VERIFICATION as string | undefined) || null,
};

export const mapsDirectionsUrl = (): string | null => {
  if (!canShow(site.address)) return null;
  const a = site.address.value;
  const q = `${site.name}, ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
};
