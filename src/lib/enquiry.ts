/**
 * Appointment enquiry validation — shared by the browser and the server so the rules can never drift.
 * Data minimisation: no medical history fields. The optional message is short and patients are asked not to
 * include detailed medical information.
 */
export const SPECIALITY_OPTIONS = [
  'Dermatology', 'Hair clinic / hair transplantation', 'Laser treatments', 'Cosmetic dermatology',
  'Gynaecology', 'Cosmetic gynaecology', 'Facial aesthetics / maxillofacial surgery', 'Not sure — please advise',
] as const;
export const DOCTOR_OPTIONS = [
  'No preference', 'Dr. Rajeev Saxena', 'Dr. Akshay Saxena', 'Dr. Nischay Saxena', 'Dr. Amita Saxena', 'Dr. Jigisha Chhangani',
] as const;
export const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening', 'Any time'] as const;

export interface EnquiryInput {
  name: string;
  phone: string;
  email?: string;
  speciality: string;
  doctor?: string;
  preferredDate?: string;
  preferredTime?: string;
  message?: string;
  consent: boolean;
  website?: string;  // honeypot — must stay empty
  started?: string;  // ms timestamp when the form was rendered
}
export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

const clean = (s: unknown, max: number) => (typeof s === 'string' ? s.replace(/[\u0000-\u001F\u007F]/g, ' ').trim().slice(0, max) : '');

export function normaliseEnquiry(raw: Record<string, unknown>): EnquiryInput {
  return {
    name: clean(raw.name, 80),
    phone: clean(raw.phone, 20),
    email: clean(raw.email, 120),
    speciality: clean(raw.speciality, 80),
    doctor: clean(raw.doctor, 60),
    preferredDate: clean(raw.preferredDate, 10),
    preferredTime: clean(raw.preferredTime, 20),
    message: clean(raw.message, 500),
    consent: raw.consent === true || raw.consent === 'yes' || raw.consent === 'true',
    website: clean(raw.website, 200),
    started: clean(raw.started, 20),
  };
}

/** Indian mobile or landline: optional +91/0 prefix, 10 digits (spaces/dashes allowed). */
export const phoneOk = (p: string) => /^(?:\+?91[\s-]?|0)?[\s-]?(?:\d[\s-]?){10}$/.test(p.trim());
export const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

export function validateEnquiry(input: EnquiryInput, today = new Date()): { ok: boolean; errors: EnquiryErrors } {
  const e: EnquiryErrors = {};
  const name = (input.name || '').trim();
  if (name.length < 2) e.name = 'Please enter your name.';
  else if (name.length > 80) e.name = 'Please shorten your name to 80 characters.';
  if (!input.phone || !phoneOk(input.phone)) e.phone = 'Please enter a 10-digit phone number.';
  if (input.email && !emailOk(input.email)) e.email = 'Please enter a valid email address, or leave it blank.';
  if (!input.speciality || !(SPECIALITY_OPTIONS as readonly string[]).includes(input.speciality)) e.speciality = 'Please choose a speciality.';
  if (input.doctor && !(DOCTOR_OPTIONS as readonly string[]).includes(input.doctor)) e.doctor = 'Please choose from the list.';
  if (input.preferredTime && !(TIME_OPTIONS as readonly string[]).includes(input.preferredTime)) e.preferredTime = 'Please choose from the list.';
  if (input.preferredDate) {
    const d = new Date(input.preferredDate + 'T00:00:00');
    const t0 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    if (Number.isNaN(d.getTime())) e.preferredDate = 'Please choose a valid date.';
    else if (d < t0) e.preferredDate = 'Please choose today or a future date.';
  }
  if (input.message && input.message.length > 500) e.message = 'Please keep your message under 500 characters.';
  if (!input.consent) e.consent = 'Please confirm you agree to be contacted about this enquiry.';
  return { ok: Object.keys(e).length === 0, errors: e };
}

/** Spam heuristics (server side). Returns a reason string if the submission should be silently discarded. */
export function spamReason(input: EnquiryInput, now = Date.now()): string | null {
  if (input.website) return 'honeypot';
  const started = Number(input.started);
  if (!Number.isFinite(started) || started <= 0) return 'no-timestamp';
  if (now - started < 3000) return 'too-fast';
  if (now - started > 1000 * 60 * 60 * 24) return 'stale';
  if (/(https?:\/\/|www\.)/i.test(`${input.name} ${input.message}`)) return 'links';
  return null;
}
