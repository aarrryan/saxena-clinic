/**
 * Structured data builders. Only facts that are visible on the page and permitted by site config are emitted.
 * Never add ratings, reviews, opening hours, coordinates or credentials that are not confirmed and shown.
 */
import { site, canShow } from '../config/site';
import type { Doctor } from '../data/doctors';
import { fullName } from '../data/doctors';
import { withBase } from './paths';

export const orgId = () => new URL(`${withBase('/')}#clinic`, site.url).href;

export const orgRef = () => ({ '@id': orgId() });

export function clinicSchema(): Record<string, unknown> {
  const o: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'MedicalBusiness'],
    '@id': orgId(),
    name: site.name,
    url: new URL(withBase('/'), site.url).href,
    logo: new URL(withBase('/icon-512.png'), site.url).href,
    image: new URL(withBase('/og-default.png'), site.url).href,
    description: 'A multidisciplinary specialist medical practice in Jabalpur for dermatology, hair restoration and transplantation, laser treatments, cosmetic dermatology, gynaecology, and cranio-maxillofacial surgery and facial aesthetics.',
    medicalSpecialty: ['Dermatology', 'Gynecologic'],
    areaServed: { '@type': 'City', name: 'Jabalpur' },
  };

  if (canShow(site.address)) {
    o.address = {
      '@type': 'PostalAddress',
      ...site.address.value,
    };
  }

  const phones = site.phones.filter(canShow).map((p) => p.value!.e164);

  if (phones.length) {
    o.telephone = phones[0];
  }

  if (canShow(site.instagram)) {
    o.sameAs = [site.instagram.value.url];
  }

  return o;
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: new URL(withBase('/'), site.url).href,
    publisher: orgRef(),
    inLanguage: 'en-IN',
  };
}

export function physicianSchema(d: Doctor, path: string): Record<string, unknown> {
  const o: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: fullName(d),
    url: new URL(withBase(path), site.url).href,
    description: d.summary[0],
    parentOrganization: orgRef(),
  };

  if (d.schemaSpecialty) {
    o.medicalSpecialty = d.schemaSpecialty;
  }

  if (canShow(site.address)) {
    o.address = {
      '@type': 'PostalAddress',
      ...site.address.value,
    };
  }

  return o;
}

export function medicalPageSchema(
  name: string,
  description: string,
  path: string,
  about?: string,
): Record<string, unknown> {
  const o: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name,
    description,
    url: new URL(withBase(path), site.url).href,
    inLanguage: 'en-IN',
    publisher: orgRef(),
  };

  if (about) {
    o.about = {
      '@type': 'MedicalCondition',
      name: about,
    };
  }

  return o;
}