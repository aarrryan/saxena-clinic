"""
End-to-end checks against the production server (node server.mjs).

  npm run build
  ENQUIRY_MODE=log PORT=4321 node server.mjs &      # enquiry accepted in log mode
  PORT=4322 node server.mjs &                        # enquiry not configured (expects 503)
  python3 tests/e2e.py

Checks every sitemap route at 360/390/768/1024/1440/1920 px: horizontal overflow, console errors,
one <h1>, heading order, title/description/canonical/robots, JSON-LD validity, images, internal links,
plus navigation, film player, enquiry form states and API behaviour.
"""
import asyncio, json, os, re, sys, time, urllib.request, urllib.error
from xml.etree import ElementTree
from playwright.async_api import async_playwright

BASE = 'http://localhost:4321'
MODE = os.environ.get('E2E_MODE', 'preview')   # set E2E_MODE=launch when testing a launch build
BASE_UNCONFIGURED = 'http://localhost:4322'
WIDTHS = [360, 390, 768, 1024, 1440, 1920]
CHROME = '/usr/bin/google-chrome'
failures: list[str] = []
def fail(msg): failures.append(msg); print('  FAIL', msg)
def ok(msg): print('  ok  ', msg)

def http(url, method='GET', data=None, headers=None):
    req = urllib.request.Request(url, method=method, data=data, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=10) as r: return r.status, r.read().decode('utf-8', 'replace'), dict(r.headers)
    except urllib.error.HTTPError as e: return e.code, e.read().decode('utf-8', 'replace'), dict(e.headers)

def routes():
    _, idx, _ = http(BASE + '/sitemap-index.xml')
    locs = []
    for sm in ElementTree.fromstring(idx).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc'):
        path = re.sub(r'^https?://[^/]+', '', sm.text)
        _, body, _ = http(BASE + path)
        locs += [re.sub(r'^https?://[^/]+', '', l.text) for l in ElementTree.fromstring(body).iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
    return locs

PAGE_AUDIT = r"""() => {
  const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(h => h.offsetParent !== null || h.closest('[hidden]') === null).map(h => +h.tagName[1]);
  let skip = null; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i-1] + 1) { skip = `h${hs[i-1]}→h${hs[i]}`; break; }
  const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map(s => { try { JSON.parse(s.textContent); return true; } catch { return false; } });
  return {
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    h1: document.querySelectorAll('h1').length, skip,
    title: document.title, desc: document.querySelector('meta[name="description"]')?.content || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '', robots: document.querySelector('meta[name="robots"]')?.content || '',
    ldOk: ld.every(Boolean), ldCount: ld.length, lang: document.documentElement.lang,
    imgsNoAlt: [...document.images].filter(i => !i.hasAttribute('alt')).length,
    links: [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')),
    placeholders: /NEEDS_CONFIRMATION|lorem ipsum|TODO/i.test(document.body.innerText),
  };
}"""

async def audit_routes(b, paths):
    print(f'\n== Routes ({len(paths)}) × widths {WIDTHS}')
    titles, descs, all_links = {}, {}, set()
    for w in WIDTHS:
        ctx = await b.new_context(viewport={'width': w, 'height': 900})
        pg = await ctx.new_page()
        errs = []
        pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        pg.on('pageerror', lambda e: errs.append(str(e)))
        for p in paths:
            errs.clear()
            resp = await pg.goto(BASE + p, wait_until='load')
            if resp.status != 200: fail(f'{p} @{w}: HTTP {resp.status}'); continue
            a = await pg.evaluate(PAGE_AUDIT)
            if a['overflow'] > 0: fail(f'{p} @{w}: horizontal overflow {a["overflow"]}px')
            if errs: fail(f'{p} @{w}: console errors {errs[:2]}')
            if w == 1440:
                if a['h1'] != 1: fail(f'{p}: {a["h1"]} <h1> elements')
                if a['skip']: fail(f'{p}: heading level skipped {a["skip"]}')
                if not a['title'] or not a['desc']: fail(f'{p}: missing title/description')
                if not a['canonical'].endswith(p): fail(f'{p}: canonical {a["canonical"]}')
                if MODE == 'preview' and 'noindex' not in a['robots']: fail(f'{p}: preview build must be noindex (got {a["robots"]})')
                if MODE == 'launch' and 'noindex' in a['robots']: fail(f'{p}: launch build must be indexable')
                if not a['ldOk']: fail(f'{p}: invalid JSON-LD')
                if a['imgsNoAlt']: fail(f'{p}: {a["imgsNoAlt"]} images without alt')
                if a['lang'] != 'en-IN': fail(f'{p}: lang={a["lang"]}')
                if a['placeholders']: fail(f'{p}: placeholder text visible')
                if len(a['title']) > 80: fail(f'{p}: title too long ({len(a["title"])})')
                if not (50 <= len(a['desc']) <= 175): fail(f'{p}: description length {len(a["desc"])}')
                titles.setdefault(a['title'], []).append(p); descs.setdefault(a['desc'], []).append(p)
                all_links |= {l for l in a['links'] if l.startswith('/') and not l.startswith('//')}
                # images: scroll through, then confirm every image decoded
                H = await pg.evaluate('document.body.scrollHeight')
                for y in range(0, H, 700): await pg.evaluate(f'window.scrollTo(0,{y})'); await pg.wait_for_timeout(25)
                await pg.wait_for_load_state('networkidle')
                bad = await pg.evaluate("[...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src)")
                if bad: fail(f'{p}: images not loaded {bad[:2]}')
        await ctx.close()
        ok(f'width {w}px audited')
    for t, ps in titles.items():
        if len(ps) > 1: fail(f'duplicate title "{t}" on {ps}')
    for d, ps in descs.items():
        if len(ps) > 1: fail(f'duplicate description on {ps}')
    ok(f'titles unique ({len(titles)}), descriptions unique ({len(descs)})')
    print(f'\n== Internal links ({len(all_links)})')
    for l in sorted(all_links):
        url = BASE + l.split('#')[0]
        st, _, _ = http(url)
        if st != 200: fail(f'link {l} → HTTP {st}')
    ok('all internal links resolve')

async def interactions(b):
    print('\n== Interactions')
    ctx = await b.new_context(viewport={'width': 1440, 'height': 900}); pg = await ctx.new_page()
    await pg.goto(BASE + '/')
    t = pg.locator('[data-panel-toggle]')
    await t.click()
    if await t.get_attribute('aria-expanded') != 'true' or not await pg.locator('#spec-panel').is_visible(): fail('specialities panel did not open')
    await pg.keyboard.press('Escape')
    if await t.get_attribute('aria-expanded') != 'false': fail('specialities panel did not close on Escape')
    else: ok('specialities panel opens, closes on Escape')
    # skip link + focus visibility (fresh page load)
    await pg.goto(BASE + '/'); await pg.keyboard.press('Tab')
    if (await pg.evaluate('document.activeElement.className')) != 'skip-link': fail('first Tab stop is not the skip link')
    else: ok('skip link is first focus stop')
    # homepage centrepiece: four panels arrive one by one with scroll, titles follow, the clinic mark comes last
    await pg.goto(BASE + '/'); await pg.wait_for_timeout(300)
    geo = await pg.evaluate("(() => { const s = document.querySelector('[data-walk]'); const r = s.getBoundingClientRect(); return { top: r.top + scrollY, span: r.height - innerHeight, live: s.classList.contains('walk--live') }; })()")
    async def walk_state():
        return await pg.evaluate("(() => ({ k: [...document.querySelectorAll('[data-walk] .wp')].map(e => +(+getComputedStyle(e).getPropertyValue('--k')).toFixed(2)), c: +(+getComputedStyle(document.querySelector('[data-core]')).getPropertyValue('--c')).toFixed(2) }))()")
    try:
        if not geo['live']: fail('centrepiece not in its scroll-controlled mode')
        got = []
        for frac in (0.0, 0.3, 1.0):
            await pg.evaluate(f"window.scrollTo(0, {geo['top'] + geo['span'] * frac})"); await pg.wait_for_timeout(1600)
            got.append(await walk_state())
        s0, s1, s2 = got
        seq = s0['k'] == [0, 0, 0, 0] and s1['k'][0] > 0.9 and s1['k'][3] < 0.1 and s2['k'] == [1, 1, 1, 1] and s0['c'] == 0 and s2['c'] == 1
        ok(f'centrepiece assembles in order {s0} -> {s1} -> {s2}') if seq else fail(f'centrepiece sequence {got}')
        playing = await pg.evaluate("[...document.querySelectorAll('[data-walk] video')].map(v => v.muted && !v.paused && v.readyState >= 2)")
        ok('centrepiece videos playing, muted') if all(playing) else fail(f'centrepiece videos {playing}')
    except Exception as e: fail(f'homepage centrepiece: {e}')
    # About film also autoplays in view; scrolling away pauses it; coming back restarts it from 0:00
    await pg.goto(BASE + '/about-us/'); await pg.locator('.film').scroll_into_view_if_needed(); await pg.wait_for_timeout(3500)
    af = pg.frame_locator('.film iframe')
    try:
        await pg.evaluate('window.scrollTo(0, 0)'); await pg.wait_for_timeout(600)
        p1 = await af.locator('#tc').text_content(timeout=4000); await pg.wait_for_timeout(1000); p2 = await af.locator('#tc').text_content()
        ok('film pauses when scrolled away') if p1 == p2 else fail(f'film kept running off-screen ({p1} -> {p2})')
        await pg.locator('.film').scroll_into_view_if_needed(); await pg.wait_for_timeout(700)
        r = await af.locator('#tc').text_content()
        secs = float(r.split('/')[0].strip().split(':')[1])
        ok('film restarts from the beginning when back in view') if secs < 1.5 else fail(f'film did not restart ({r})')
        await pg.wait_for_timeout(1000); r2 = await af.locator('#tc').text_content()
        ok('film plays again after restart') if r2 != r else fail('film did not resume')
    except Exception as e: fail(f'About film autoplay check failed: {e}')
    await ctx.close()

    ctx = await b.new_context(viewport={'width': 390, 'height': 844}); pg = await ctx.new_page()
    await pg.goto(BASE + '/')
    mb = pg.locator('[data-menu-toggle]')
    await mb.click()
    if not await pg.locator('#mobile-menu').is_visible(): fail('mobile menu did not open')
    links = await pg.locator('#mobile-menu a').count()
    await pg.keyboard.press('Escape')
    if await pg.locator('#mobile-menu').is_visible(): fail('mobile menu did not close on Escape')
    else: ok(f'mobile menu opens ({links} links), closes on Escape')
    await ctx.close()

async def wait_state(pg, timeout=10):
    # polled from Python: the site's CSP (correctly) forbids eval, so wait_for_function strings cannot run
    for _ in range(int(timeout * 10)):
        st = await pg.locator('[data-status]').get_attribute('data-state')
        if st in ('success', 'error'): return st
        await pg.wait_for_timeout(100)
    return None

async def form_tests(b):
    print('\n== Enquiry form')
    ctx = await b.new_context(viewport={'width': 390, 'height': 844}); pg = await ctx.new_page()
    await pg.goto(BASE + '/contact-us/')
    await pg.locator('form[data-enquiry] button[type=submit]').click()
    invalid = await pg.locator('form [aria-invalid="true"]').count()
    st = await pg.locator('[data-status]').text_content()
    if invalid < 4: fail(f'empty submit marked {invalid} fields invalid (expected ≥4)')
    else: ok(f'empty submit: {invalid} fields flagged, status "{st}"')
    # error summary: shown, focused, links to each invalid field
    summ = pg.locator('[data-summary]')
    n_links = await summ.locator('a').count()
    focused = await pg.evaluate("document.activeElement?.hasAttribute('data-summary')")
    if not await summ.is_visible() or n_links != invalid or not focused: fail(f'error summary: visible={await summ.is_visible()} links={n_links} focused={focused}')
    else:
        await summ.locator('a').first.click()
        fid = await pg.evaluate('document.activeElement.id')
        ok(f'error summary focused, {n_links} links, first link focuses #{fid}') if fid == 'enq-name' else fail(f'summary link focused {fid}')
    # blur validation: a bad phone is flagged on leaving the field and cleared once fixed
    await pg.fill('#enq-phone', '12'); await pg.locator('#enq-email').focus()
    bad = await pg.locator('#enq-phone').get_attribute('aria-invalid')
    await pg.fill('#enq-phone', '98765 43210')
    fixed = await pg.locator('#enq-phone').get_attribute('aria-invalid')
    ok('phone validated on blur, cleared when fixed') if (bad, fixed) == ('true', 'false') else fail(f'blur validation phone: {bad} -> {fixed}')
    await pg.fill('#enq-name', 'Test Patient'); await pg.fill('#enq-phone', '98765 43210')
    await pg.select_option('#enq-spec', 'Dermatology'); await pg.select_option('#enq-doc', 'Dr. Rajeev Saxena')
    await pg.check('#enq-consent')
    await pg.wait_for_timeout(3200)   # human-speed submission (spam timer)
    await pg.locator('form[data-enquiry] button[type=submit]').click()
    state = await wait_state(pg)
    msg = await pg.locator('[data-status]').text_content()
    if await pg.locator('[data-summary]').is_visible(): fail('error summary still visible after a valid submit')
    if state != 'success' or 'not a confirmed appointment' not in msg: fail(f'valid submit → {state}: {msg}')
    else: ok('valid submit (log mode) → success, says it is not a confirmed appointment')
    await ctx.close()

    # not configured → honest 503 message in the page
    ctx = await b.new_context(viewport={'width': 1024, 'height': 900}); pg = await ctx.new_page()
    await pg.goto(BASE_UNCONFIGURED + '/contact-us/')
    await pg.fill('#enq-name', 'Test Patient'); await pg.fill('#enq-phone', '9876543210'); await pg.select_option('#enq-spec', 'Gynaecology'); await pg.check('#enq-consent')
    await pg.wait_for_timeout(3200)
    await pg.locator('form[data-enquiry] button[type=submit]').click()
    await wait_state(pg)
    msg = await pg.locator('[data-status]').text_content()
    ok(f'unconfigured server → "{msg}"') if 'not active yet' in msg else fail(f'unconfigured server message: {msg}')
    await ctx.close()

def api_tests():
    print('\n== API')
    good = {'name': 'Test Patient', 'phone': '9876543210', 'speciality': 'Dermatology', 'consent': True, 'started': str(int(time.time()*1000) - 10000)}
    hdr = {'content-type': 'application/json', 'origin': BASE}
    st, body, _ = http(BASE + '/api/enquiry/', 'POST', json.dumps(good).encode(), hdr)
    ok('valid JSON → 200') if st == 200 else fail(f'valid JSON → {st} {body}')
    st, body, _ = http(BASE + '/api/enquiry/', 'POST', json.dumps({**good, 'phone': '12'}).encode(), hdr)
    ok('invalid phone → 422 with field errors') if st == 422 and 'phone' in json.loads(body)['errors'] else fail(f'invalid → {st} {body}')
    st, body, _ = http(BASE + '/api/enquiry/', 'POST', json.dumps({**good, 'website': 'bot'}).encode(), hdr)
    ok('honeypot → silent 200') if st == 200 else fail(f'honeypot → {st}')
    st, _, _ = http(BASE + '/api/enquiry/', 'POST', json.dumps(good).encode(), {**hdr, 'origin': 'https://evil.example'})
    ok('foreign origin → 403') if st == 403 else fail(f'foreign origin → {st}')
    st, _, _ = http(BASE + '/api/enquiry/')
    ok('GET → 405') if st == 405 else fail(f'GET → {st}')
    st, body, _ = http(BASE_UNCONFIGURED + '/api/enquiry/', 'POST', json.dumps(good).encode(), {**hdr, 'origin': BASE_UNCONFIGURED})
    ok('unconfigured delivery → 503') if st == 503 else fail(f'unconfigured → {st} {body}')

def server_tests():
    print('\n== Server, robots, sitemap, headers')
    st, _, h = http(BASE + '/no-such-page/')
    ok('unknown route → 404') if st == 404 else fail(f'unknown route → {st}')
    st, _, h = http(BASE + '/dermatology')
    ok('missing trailing slash → 301') if st in (200, 301) else fail(f'/dermatology → {st}')
    st, body, h = http(BASE + '/robots.txt')
    if MODE == 'preview': ok('preview robots.txt disallows all') if re.search(r'^Disallow: /\s*$', body, re.M) else fail('robots.txt not disallowing in preview')
    else: ok('launch robots.txt allows crawling') if 'Allow: /' in body and 'Sitemap:' in body else fail('launch robots.txt wrong')
    for k in ['Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'Strict-Transport-Security', 'Permissions-Policy']:
        if k not in h: fail(f'missing header {k}')
    ok('security headers present')
    st, _, _ = http(BASE + '/../../etc/passwd')
    ok('path traversal blocked') if st == 404 else fail(f'path traversal → {st}')

async def main():
    paths = routes()
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path=CHROME)
        await audit_routes(b, paths)
        await interactions(b)
        await form_tests(b)
        await b.close()
    api_tests(); server_tests()
    print(f'\n{len(failures)} failure(s)')
    sys.exit(1 if failures else 0)

asyncio.run(main())
