import type { APIRoute } from 'astro';
import { normaliseEnquiry, validateEnquiry, spamReason } from '../../lib/enquiry';

export const prerender = false;

/**
 * Appointment enquiry endpoint.
 *
 * Delivery (set in the server environment, never in frontend code):
 *   ENQUIRY_WEBHOOK_URL     HTTPS endpoint that receives the enquiry as JSON (clinic CRM, email relay, automation tool…)
 *   ENQUIRY_WEBHOOK_SECRET  optional shared secret, sent as the X-Enquiry-Secret header
 *   ENQUIRY_MODE=log        development only: accept and log a redacted summary instead of delivering
 * With none configured the endpoint answers 503 so the page can tell the visitor to contact the clinic directly.
 */
const env = (k: string) => (typeof process !== 'undefined' ? process.env[k] : undefined) ?? (import.meta.env[k] as string | undefined);

const WINDOW_MS = 10 * 60 * 1000, MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string, now: number) {
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  list.push(now); hits.set(ip, list);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return list.length > MAX_PER_WINDOW;
}
const json = (status: number, body: unknown) => new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

export const POST: APIRoute = async ({ request, clientAddress, url }) => {
  const now = Date.now();
  // CSRF guard: a browser always sends Origin on cross-site POSTs; it must match the host it was sent to.
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host')?.split(',')[0]?.trim() || request.headers.get('host') || url.host;
  if (origin) { let oh = ''; try { oh = new URL(origin).host; } catch { /* malformed */ } if (oh !== host) return json(403, { message: 'Invalid origin.' }); }
  const len = Number(request.headers.get('content-length') ?? '0');
  if (len > 10_000) return json(413, { message: 'Enquiry too large.' });

  let raw: Record<string, unknown> = {};
  try {
    const ct = request.headers.get('content-type') ?? '';
    if (ct.includes('application/json')) raw = await request.json();
    else raw = Object.fromEntries((await request.formData()).entries());
  } catch { return json(400, { message: 'Could not read the enquiry.' }); }

  const input = normaliseEnquiry(raw);
  const { ok, errors } = validateEnquiry(input);
  if (!ok) return json(422, { message: 'Please check the highlighted fields.', errors });

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || clientAddress || 'unknown';
  if (rateLimited(ip, now)) return json(429, { message: 'Too many enquiries from this connection. Please try again later or contact the clinic directly.' });
  // Spam is accepted silently (a bot gets no signal) but never delivered.
  if (spamReason(input, now)) return json(200, { ok: true });

  const webhook = env('ENQUIRY_WEBHOOK_URL');
  const mode = env('ENQUIRY_MODE');
  const payload = {
    type: 'appointment_enquiry', receivedAt: new Date(now).toISOString(), source: url.host,
    name: input.name, phone: input.phone, email: input.email || null, speciality: input.speciality,
    doctor: input.doctor || null, preferredDate: input.preferredDate || null, preferredTime: input.preferredTime || null,
    message: input.message || null, consent: true,
  };

  if (webhook) {
    if (!/^https:\/\//.test(webhook)) return json(503, { message: 'Online enquiries are not configured correctly. Please contact the clinic directly.' });
    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      const secret = env('ENQUIRY_WEBHOOK_SECRET'); if (secret) headers['x-enquiry-secret'] = secret;
      const res = await fetch(webhook, { method: 'POST', headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return json(200, { ok: true });
    } catch (err) {
      console.error('[enquiry] delivery failed:', (err as Error).message);
      return json(502, { message: 'Sorry, your enquiry could not be sent just now. Please try again shortly or contact the clinic directly.' });
    }
  }
  if (mode === 'log') {
    console.info('[enquiry:log-mode]', { speciality: payload.speciality, doctor: payload.doctor, preferredDate: payload.preferredDate, receivedAt: payload.receivedAt });
    return json(200, { ok: true, mode: 'log' });
  }
  return json(503, { message: 'Online enquiries are not active yet. Please contact the clinic directly by telephone.' });
};

export const ALL: APIRoute = () => json(405, { message: 'Method not allowed.' });
