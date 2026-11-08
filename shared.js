/* =====================================================================
   LABORU · KONFIGURASI TOKO  (ISI BAGIAN INI SAJA)
   ===================================================================== */
window.LABORU_CONFIG = {
  pixelId: '',            // contoh: '1234567890123456'  (Events Manager > Data Sources > Pixel ID)
  currency: 'IDR',
  checkout: {             // link checkout Lynk.id (bisa juga diubah lewat Google Sheet: lihat sheetCsv di bawah)
    entry_work:    'https://lynk.id/auzanasar/rx7w59xzxrrr/checkout',
    entry_habit:   'https://lynk.id/auzanasar/qd6m0lx9v0o4/checkout',
    entry_finance: 'https://lynk.id/auzanasar/xd5p7qo80v3e/checkout',
    core:          'https://lynk.id/auzanasar/2jpqkgkmmjyw/checkout',
    ultimate:      'https://lynk.id/auzanasar/ggpo4l1gpz1l/checkout',
    upgrade: '',
    r01: 'https://lynk.id/auzanasar/mly732rx38j4/checkout',
    r02: 'https://lynk.id/auzanasar/8659wj0w9r12/checkout',
    r03: 'https://lynk.id/auzanasar/xomwl2e870rg/checkout',
    r05: 'https://lynk.id/auzanasar/8gwxkj19p3d9/checkout',
    r06: 'https://lynk.id/auzanasar/og2vpyk2ojm0/checkout',
    r07: 'https://lynk.id/auzanasar/wp6gd5g080dv/checkout',
    r08: 'https://lynk.id/auzanasar/76pvd178vome/checkout',
    r09: 'https://lynk.id/auzanasar/qv7nxdklvl7r/checkout'
  },
  // Google Sheet harga & link (File > Bagikan > Siapa saja yang memiliki link: Pelihat). Isi ID sheet di sini;
  // kolom: kode | nama | harga | harga_coret | link_checkout. Sheet: 'LABORU - Harga & Link Checkout' di Google Drive. Kosongkan untuk memakai nilai di file ini.
  sheetId: '1SSruj8FmwkTDPRzwBfvzb2QyH2LoADte7cwcqZCXKOU',

  waAdmin: '',            // nomor WA admin format 62812xxxx (dipakai bila link checkout belum diisi)
  waCommunity: 'https://chat.whatsapp.com/JJk1WKvTX3d7qCen7Br7xe',
  instagram: 'https://www.instagram.com/laboru_id'
};
/* ===================================================================== */

window.LABORU_PRODUCTS = {
  entry_work:    { n: 'Entry · Work Toolkit',    p: 79000,  cat: 'entry' },
  entry_habit:   { n: 'Entry · Habit Toolkit',   p: 79000,  cat: 'entry' },
  entry_finance: { n: 'Entry · Finance Toolkit', p: 79000,  cat: 'entry' },
  core:          { n: 'Core · Personal Life System', p: 189000, v: 277000, cat: 'package' },
  ultimate:      { n: 'Ultimate · Life & Business System', p: 289000, v: 792000, cat: 'package' },
  upgrade:       { n: 'Upgrade Core → Ultimate', p: 99000, cat: 'upgrade' },
  r01: { n: 'CV ATS Pack (180 template)', p: 35000, cat: 'eceran' },
  r02: { n: 'Creative CV & Portfolio Pack (360 template)', p: 49000, cat: 'eceran' },
  r03: { n: 'Cover Letter & Email Lamaran Pack (360 template)', p: 35000, cat: 'eceran' },
  r05: { n: 'LABO Asisten (Companion App)', p: 29000, cat: 'eceran' },
  r06: { n: 'Ebook Level Up Diri', p: 39000, cat: 'eceran' },
  r07: { n: 'Company Preparation System', p: 249000, cat: 'eceran' },
  r08: { n: 'Company Improvement System', p: 149000, cat: 'eceran' },
  r09: { n: 'Ebook From Zero to Financial Freedom Vol.1', p: 49000, cat: 'eceran' }
};

(function () {
  const C = window.LABORU_CONFIG, PR = window.LABORU_PRODUCTS;
  const rp = n => 'Rp' + Number(n).toLocaleString('id-ID');
  window.LABORU_rp = rp;
  /* ---- Meta Pixel (kode resmi Meta) dimuat hanya jika pixelId diisi ---- */
  if (C.pixelId) {
    !function (f, b, e, v, n, t, s) { if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments) }; if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = []; t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s) }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', C.pixelId);
    fbq('track', 'PageView');
  }
  const eid = () => 'lb' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  window.LABORU_track = function (ev, params, custom) {
    const id = eid();
    try { if (window.fbq && C.pixelId) fbq(custom ? 'trackCustom' : 'track', ev, params || {}, { eventID: id }) } catch (e) {}
    try { window.dataLayer = window.dataLayer || []; window.dataLayer.push(Object.assign({ event: ev, event_id: id }, params || {})) } catch (e) {}
    return id;
  };
  /* ---- simpan UTM / fbclid pertama kali datang, teruskan ke checkout ---- */
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid'];
  const q = new URLSearchParams(location.search), saved = (() => { try { return JSON.parse(localStorage.getItem('lb_utm') || '{}') } catch (e) { return {} } })();
  KEYS.forEach(k => { if (q.get(k)) saved[k] = q.get(k) });
  try { localStorage.setItem('lb_utm', JSON.stringify(saved)) } catch (e) {}
  function withUtm(url) {
    try { const u = new URL(url); KEYS.forEach(k => { if (saved[k] && !u.searchParams.get(k)) u.searchParams.set(k, saved[k]) }); return u.toString() } catch (e) { return url }
  }
  /* ---- tombol beli: data-buy="core" ---- */
  window.LABORU_buy = function (key, source) {
    const p = PR[key]; if (!p) return;
    const params = { content_ids: [key], content_name: p.n, content_type: 'product', value: p.p, currency: C.currency, num_items: 1 };
    LABORU_track('InitiateCheckout', params);
    const url = C.checkout[key];
    if (url && /^https?:\/\//.test(url)) { setTimeout(() => { location.href = withUtm(url) }, 250); return }
    if (C.waAdmin) {
      const msg = encodeURIComponent('Halo admin LABORU, saya mau order: ' + p.n + ' (' + rp(p.p) + ').' + (source ? ' [' + source + ']' : ''));
      setTimeout(() => { location.href = 'https://wa.me/' + C.waAdmin.replace(/\D/g, '') + '?text=' + msg }, 250); return;
    }
    alert('Link checkout untuk "' + p.n + '" belum diisi. (Pemilik toko: isi LABORU_CONFIG.checkout di file shared.js)');
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-buy]'); if (b) { e.preventDefault(); LABORU_buy(b.dataset.buy, b.dataset.src || '') }
    const w = e.target.closest('[data-wa]'); if (w) { LABORU_track('Contact', { content_name: 'WA community' }); w.href = C.waCommunity }
    const ig = e.target.closest('[data-ig]'); if (ig) ig.href = C.instagram;
  });
  function fill() {
    document.querySelectorAll('[data-price]').forEach(el => { const p = PR[el.dataset.price]; if (p) el.textContent = rp(p.p) });
    document.querySelectorAll('[data-value]').forEach(el => { const p = PR[el.dataset.value]; if (p && p.v) el.textContent = rp(p.v) });
    document.querySelectorAll('[data-save]').forEach(el => { const p = PR[el.dataset.save]; if (p && p.v) el.textContent = 'hemat ' + Math.round((1 - p.p / p.v) * 100) + '%' });
    document.dispatchEvent(new Event('laboru:prices'));
  }
  window.LABORU_fill = fill;
  /* ---- harga & link dari Google Sheet (opsional) ---- */
  function csvRows(t) { const R = []; let r = [], f = '', q = false; for (let i = 0; i < t.length; i++) { const c = t[i]; if (q) { if (c === '"') { if (t[i + 1] === '"') { f += '"'; i++ } else q = false } else f += c } else if (c === '"') q = true; else if (c === ',') { r.push(f); f = '' } else if (c === '\n') { r.push(f); R.push(r); r = []; f = '' } else if (c !== '\r') f += c } if (f || r.length) { r.push(f); R.push(r) } return R }
  const num = v => Number(String(v || '').replace(/[^0-9]/g, '')) || 0;
  if (C.sheetId) {
    const ctl = window.AbortController ? new AbortController() : null; if (ctl) setTimeout(() => ctl.abort(), 4000);
    fetch('https://docs.google.com/spreadsheets/d/' + C.sheetId + '/gviz/tq?tqx=out:csv', ctl ? { signal: ctl.signal } : {})
      .then(r => r.ok ? r.text() : Promise.reject()).then(t => {
        csvRows(t).slice(1).forEach(([k, n, h, v, link]) => { k = (k || '').trim(); if (!PR[k]) return; if (num(h)) PR[k].p = num(h); if (num(v)) PR[k].v = num(v); if (n && n.trim()) PR[k].n = n.trim(); if (link && /^https?:\/\//.test(link.trim())) C.checkout[k] = link.trim() });
        if (document.readyState !== 'loading') fill();
      }).catch(() => {});
  }
  document.addEventListener('DOMContentLoaded', () => {
    fill();
    document.querySelectorAll('[data-price]').forEach(el => { const p = PR[el.dataset.price]; if (p) el.textContent = rp(p.p) });
    document.querySelectorAll('[data-value]').forEach(el => { const p = PR[el.dataset.value]; if (p && p.v) el.textContent = rp(p.v) });
    document.querySelectorAll('[data-wa]').forEach(a => a.href = C.waCommunity);
    document.querySelectorAll('[data-ig]').forEach(a => a.href = C.instagram);
  });
})();
