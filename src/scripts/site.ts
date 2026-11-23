(window as unknown as { __siteReady: boolean }).__siteReady = true;
/* Progressive enhancement only — every page is fully usable without JavaScript. */

/* ---------- specialities panel ---------- */
const toggle = document.querySelector<HTMLButtonElement>('[data-panel-toggle]');
const panel = document.querySelector<HTMLElement>('[data-panel]');
function setPanel(open: boolean) {
  if (!toggle || !panel) return;
  toggle.setAttribute('aria-expanded', String(open));
  panel.classList.toggle('open', open);
}
toggle?.addEventListener('click', () => setPanel(toggle.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('click', (e) => { if (panel && toggle && !panel.contains(e.target as Node) && !toggle.contains(e.target as Node)) setPanel(false); });

/* ---------- mobile menu ---------- */
const menuBtn = document.querySelector<HTMLAnchorElement>('[data-menu-toggle]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
function setMenu(open: boolean) {
  if (!menuBtn || !menu) return;
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.querySelector('.menu-label')!.textContent = open ? 'Close' : 'Menu';
  if (open) menu.querySelector<HTMLAnchorElement>('a')?.focus();
}
menuBtn?.setAttribute('role', 'button');
menuBtn?.addEventListener('click', (e) => { e.preventDefault(); setMenu(menu!.hidden === true); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  if (toggle?.getAttribute('aria-expanded') === 'true') { setPanel(false); toggle.focus(); }
  if (menu && !menu.hidden) { setMenu(false); menuBtn?.focus(); }
});
matchMedia('(min-width: 1081px)').addEventListener('change', (m) => { if (m.matches) setMenu(false); });

/* ---------- restrained scroll reveals ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealables = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) revealables.forEach((el) => el.classList.add('is-in'));
else {
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px' });
  revealables.forEach((el) => io.observe(el));
}

/* ---------- click-to-load embeds (identity film, map): nothing third-party loads until asked ---------- */
function loadEmbed(btn: HTMLButtonElement, focus: boolean) {
  const wrap = btn.closest<HTMLElement>('[data-embed-wrap]')!;
  if (wrap.querySelector('iframe')) return;
  const iframe = document.createElement('iframe');
  iframe.src = btn.dataset.embed!;
  iframe.title = btn.dataset.title || 'Embedded content';
  iframe.referrerPolicy = 'no-referrer-when-downgrade';
  if (btn.dataset.allow) iframe.allow = btn.dataset.allow;
  if (focus) { wrap.replaceChildren(iframe); iframe.focus(); }
  else { btn.hidden = true; wrap.append(iframe); }          // autoplay: keep the poster underneath until the film paints
}
document.querySelectorAll<HTMLButtonElement>('[data-embed]').forEach((btn) => btn.addEventListener('click', () => loadEmbed(btn, true)));

/* identity film: plays automatically when scrolled into view (silent), pauses when scrolled away, and restarts
   from the beginning each time it comes back into view. The film page is same-origin, so it is driven through its
   own controls (window.FILM and its play/pause button) without modifying the supplied file. */
const autoWraps = document.querySelectorAll<HTMLElement>('[data-embed-wrap][data-autoplay]');
if (autoWraps.length) {
  type FilmApi = { seek: (t: number) => unknown };
  const control = (w: Element) => {
    const f = w.querySelector<HTMLIFrameElement>('iframe');
    try {
      const win = f?.contentWindow as (Window & { FILM?: FilmApi }) | null;
      const btn = f?.contentDocument?.getElementById('bPlay');
      return win?.FILM && btn ? { film: win.FILM, btn } : null;
    } catch { return null; }
  };
  const playing = (btn: HTMLElement) => btn.getAttribute('aria-label') === 'Pause';
  const enter = (w: Element) => {
    if (!w.querySelector('iframe')) {                       // first time in view: load it (the film starts at 0:00 and plays)
      const b = w.querySelector<HTMLButtonElement>('[data-embed]'); if (b) loadEmbed(b, false); return;
    }
    const c = control(w); if (!c) return;
    c.film.seek(0); if (!playing(c.btn)) c.btn.click();      // back in view: restart from the beginning
  };
  const leave = (w: Element) => { const c = control(w); if (c && playing(c.btn)) c.btn.click(); };
  if ('IntersectionObserver' in window) {
    const fio = new IntersectionObserver((entries) => entries.forEach((en) => (en.isIntersecting ? enter : leave)(en.target)), { threshold: 0.5 });
    autoWraps.forEach((w) => fio.observe(w));
  } else autoWraps.forEach(enter);
}

/* homepage scroll film: scroll position drives the film's clock (0–18 s), eased so it glides rather than jumps */
const sf = document.querySelector<HTMLElement>('[data-scrollfilm]');
if (sf) {
  const frame = sf.querySelector<HTMLIFrameElement>('iframe')!;
  const bar = sf.querySelector<HTMLElement>('[data-sf-bar]');
  const END = 16;                                             // the logo end card is complete at 16 s; after that the film loops back
  let cur = 0, running = false, last = -1;
  const film = () => { try { return (frame.contentWindow as (Window & { FILM?: { seek: (t: number) => unknown } }) | null)?.FILM ?? null; } catch { return null; } };
  const progress = () => {
    const r = sf.getBoundingClientRect(); const span = r.height - innerHeight;
    return span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  };
  const tick = () => {
    const p = progress(), target = p * END;
    cur += (target - cur) * (reduce ? 1 : 0.09);
    if (Math.abs(target - cur) < 0.002) cur = target;
    if (cur !== last) { const f = film(); if (f) { f.seek(cur); last = cur; } }
    if (bar) bar.style.transform = `scaleX(${p})`;
    sf.toggleAttribute('data-done', p > 0.02);
    if (running) requestAnimationFrame(tick);
  };
  frame.addEventListener('load', () => { last = -1; });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([en]) => { const was = running; running = en.isIntersecting; if (running && !was) requestAnimationFrame(tick); }, { rootMargin: '25% 0px' }).observe(sf);
  } else { running = true; requestAnimationFrame(tick); }
}

/* ---------- appointment enquiry form ---------- */
import { validateEnquiry, type EnquiryInput } from '../lib/enquiry';
const form = document.querySelector<HTMLFormElement>('[data-enquiry]');
if (form) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const started = form.querySelector<HTMLInputElement>('input[name="started"]');
  if (started) started.value = String(Date.now());
  const summary = form.querySelector<HTMLElement>('[data-summary]');
  type Errors = Partial<Record<keyof EnquiryInput, string>>;
  const readInput = () => {
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    return { ...data, consent: data.consent === 'yes' } as unknown as EnquiryInput;
  };
  const setFieldError = (key: string, msg: string) => {
    const el = form.querySelector<HTMLElement>(`[data-error-for="${key}"]`);
    const field = form.querySelector<HTMLElement>(`[name="${key}"]`);
    if (el) el.textContent = msg;
    field?.setAttribute('aria-invalid', msg ? 'true' : 'false');
  };
  const showErrors = (errors: Errors) => {
    form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => setFieldError(el.dataset.errorFor!, errors[el.dataset.errorFor as keyof EnquiryInput] ?? ''));
  };
  const showSummary = (errors: Errors) => {
    if (!summary) return;
    const list = summary.querySelector('ul')!;
    list.replaceChildren(...Object.entries(errors).filter(([, m]) => m).map(([key, msg]) => {
      const field = form.querySelector<HTMLElement>(`[name="${key}"]`);
      const li = document.createElement('li'); const a = document.createElement('a');
      a.href = `#${field?.id ?? ''}`; a.textContent = msg as string;
      a.addEventListener('click', (ev) => { ev.preventDefault(); field?.focus(); });
      li.append(a); return li;
    }));
    summary.hidden = !list.children.length;
  };
  /* validate a field when the visitor leaves it, and clear its error as soon as it is fixed */
  const touched = new Set<string>();
  const checkField = (name: string) => { if (!touched.has(name)) return; const { errors } = validateEnquiry(readInput()); setFieldError(name, (errors as Errors)[name as keyof EnquiryInput] ?? ''); };
  form.addEventListener('focusout', (e) => { const t = e.target as HTMLInputElement; if (!t.name || t.name === 'website' || t.type === 'hidden') return; if (t.value || t.type === 'checkbox') touched.add(t.name); checkField(t.name); });
  form.addEventListener('input', (e) => { const t = e.target as HTMLInputElement; if (t.getAttribute('aria-invalid') === 'true') { touched.add(t.name); checkField(t.name); } });
  form.addEventListener('change', (e) => { const t = e.target as HTMLInputElement; if (t.type === 'checkbox' || t.tagName === 'SELECT') { touched.add(t.name); checkField(t.name); } });
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = readInput();
    const { ok, errors } = validateEnquiry(input);
    showErrors(errors); showSummary(errors);
    if (!ok) {
      status.dataset.state = 'error';
      status.textContent = 'Please check the highlighted fields.';
      summary ? summary.focus() : form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }
    if (summary) summary.hidden = true;
    submit.disabled = true; submit.setAttribute('aria-busy', 'true');
    status.dataset.state = 'pending'; status.textContent = 'Sending your enquiry…';
    try {
      const res = await fetch(form.action, { method: 'POST', headers: { 'content-type': 'application/json', accept: 'application/json' }, body: JSON.stringify(input) });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        form.reset(); if (started) started.value = String(Date.now());
        status.dataset.state = 'success';
        status.textContent = 'Thank you — your enquiry has been received. This is not a confirmed appointment: the clinic will contact you to arrange a time.';
      } else if (res.status === 503) {
        status.dataset.state = 'error';
        status.textContent = body.message || 'Online enquiries are not active yet. Please contact the clinic directly.';
      } else if (res.status === 422 && body.errors) {
        showErrors(body.errors); showSummary(body.errors); status.dataset.state = 'error'; status.textContent = 'Please check the highlighted fields.'; summary?.focus();
      } else {
        status.dataset.state = 'error';
        status.textContent = body.message || 'Sorry, something went wrong. Please try again or contact the clinic directly.';
      }
    } catch {
      status.dataset.state = 'error';
      status.textContent = 'We could not reach the server. Please check your connection and try again.';
    } finally {
      submit.disabled = false; submit.removeAttribute('aria-busy');
      if (!summary || summary.hidden) status.focus();
    }
  });
}
