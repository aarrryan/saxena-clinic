import { describe, it, expect } from 'vitest';
import { topics, DEKA_STATEMENT } from '../src/data/topics';
import { doctors } from '../src/data/doctors';
import { articles, isPublishable } from '../src/data/articles';

const allText = (o: unknown) => JSON.stringify(o).toLowerCase();

describe('content safety rules', () => {
  it('has the five consultants with correct names', () => {
    expect(doctors.map((d) => d.name)).toEqual(['Rajeev Saxena', 'Akshay Saxena', 'Nischay Saxena', 'Amita Saxena', 'Jigisha Chhangani']);
  });
  it('attributes the 40+ years claim only to Dr. Rajeev Saxena', () => {
    expect(doctors.filter((d) => d.experienceYears).map((d) => d.slug)).toEqual(['dr-rajeev-saxena']);
    for (const d of doctors.filter((x) => x.slug !== 'dr-rajeev-saxena')) expect(allText(d.summary)).not.toMatch(/40\+?\s*years/);
  });
  it('never renders held (unconfirmed) areas or unconfirmed qualifications as published copy', () => {
    for (const d of doctors) for (const h of d.heldAreas) expect(d.focusAreas.map((f) => f.toLowerCase())).not.toContain(h.toLowerCase());
    expect(doctors.every((d) => d.qualifications.status !== 'confirmed')).toBe(true);
  });
  it('states the DEKA indications exactly as supplied and nowhere invents specifications', () => {
    expect(DEKA_STATEMENT).toBe('Fractional CO2 laser treatment using Italian DEKA technology, offered for selected concerns including acne scars, stretch marks and post-traumatic injury scars, following specialist assessment.');
    const t = allText(topics);
    for (const banned of ['smartxide', 'punto', 'success rate', '% of patients', 'fda', 'cdsco', 'guaranteed result']) expect(t.includes(banned), banned).toBe(false);
    expect(/\d\s?(nm|µm|watts?|mj)\b/.test(t), 'numeric device specifications').toBe(false);
    expect(/\b(will|can|we) (cure|eliminate|erase)\b|100%|guarantee[sd]? (results?|success)/.test(t), 'promise-style outcome claims').toBe(false);
  });
  it('does not mention FUE, Pico or Q-switched as offered', () => {
    for (const t of topics) for (const s of t.services ?? []) if (/pico|q-switched|tattoo|botox|filler|booster|vaginal/i.test(s.label)) expect(s.availability, s.label).toBe('to-confirm');
    expect(allText(topics)).not.toContain('fue');
  });
  it('only publishes articles with named author, reviewer, dates and references', () => {
    expect(articles.filter(isPublishable)).toHaveLength(0);
    for (const a of articles) expect(a.author === null && a.reviewer === null).toBe(true);
  });
  it('gives every topic a unique path, title and description', () => {
    for (const key of ['path', 'metaTitle', 'metaDescription'] as const) expect(new Set(topics.map((t) => t[key])).size).toBe(topics.length);
  });
});
