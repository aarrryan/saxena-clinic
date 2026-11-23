import { describe, it, expect } from 'vitest';
import { validateEnquiry, normaliseEnquiry, spamReason, phoneOk } from '../src/lib/enquiry';

const good = { name: 'Asha Verma', phone: '98765 43210', email: '', speciality: 'Dermatology', doctor: '', preferredDate: '', preferredTime: '', message: '', consent: true };

describe('enquiry validation', () => {
  it('accepts a minimal valid enquiry', () => expect(validateEnquiry(good).ok).toBe(true));
  it('requires name, phone, speciality and consent', () => {
    const r = validateEnquiry({ ...good, name: '', phone: '123', speciality: '', consent: false });
    expect(Object.keys(r.errors).sort()).toEqual(['consent', 'name', 'phone', 'speciality']);
  });
  it('accepts common Indian phone formats', () => {
    for (const p of ['9876543210', '+91 98765 43210', '0761-245-0122', '0761 245 0122', '+919876543210']) expect(phoneOk(p), p).toBe(true);
    for (const p of ['12345', 'abcdefghij', '98765 4321 0000']) expect(phoneOk(p), p).toBe(false);
  });
  it('rejects options that are not in the lists', () => {
    expect(validateEnquiry({ ...good, speciality: 'Neurosurgery' }).errors.speciality).toBeTruthy();
    expect(validateEnquiry({ ...good, doctor: 'Dr. Unknown' }).errors.doctor).toBeTruthy();
  });
  it('rejects past dates', () => {
    expect(validateEnquiry({ ...good, preferredDate: '2020-01-01' }, new Date('2026-11-22')).errors.preferredDate).toBeTruthy();
    expect(validateEnquiry({ ...good, preferredDate: '2026-11-22' }, new Date('2026-11-22T10:00:00')).ok).toBe(true);
  });
  it('normalises input: trims, strips control characters, caps length, parses consent', () => {
    const n = normaliseEnquiry({ name: '  Ravi\u0007 ', phone: '9876543210', speciality: 'Dermatology', consent: 'yes', message: 'x'.repeat(900) });
    expect(n.name).toBe('Ravi'); expect(n.consent).toBe(true); expect(n.message!.length).toBe(500);
  });
});

describe('spam heuristics', () => {
  const now = 1_800_000_000_000;
  it('flags the honeypot, missing or too-fast timestamps and links', () => {
    expect(spamReason({ ...good, website: 'x', started: String(now - 10_000) }, now)).toBe('honeypot');
    expect(spamReason({ ...good, started: '' }, now)).toBe('no-timestamp');
    expect(spamReason({ ...good, started: String(now - 500) }, now)).toBe('too-fast');
    expect(spamReason({ ...good, message: 'visit http://spam.example', started: String(now - 10_000) }, now)).toBe('links');
  });
  it('passes a normal submission', () => expect(spamReason({ ...good, started: String(now - 20_000) }, now)).toBeNull());
});
