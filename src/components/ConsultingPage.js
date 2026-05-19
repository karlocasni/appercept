import { theme } from '../theme.js';

function mkEl(tag, css = '', inner = '') {
  const el = document.createElement(tag);
  if (css) el.style.cssText = css;
  if (inner) el.innerHTML = inner;
  return el;
}

function Divider(align = 'center') {
  return mkEl('div', `width:80px;height:4px;background:${theme.colors.accentPrimary};border-radius:2px;margin:20px ${align === 'left' ? '0' : 'auto'} 30px ${align === 'left' ? '0' : 'auto'};`);
}

function sectionHeader(title, subtitle, align = 'center') {
  const wrap = mkEl('div', `text-align:${align};margin-bottom:64px;`);
  wrap.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, title));
  wrap.appendChild(Divider(align));
  if (subtitle) wrap.appendChild(mkEl('p', `color:rgba(255,255,255,.6);font-size:1.1rem;max-width:640px;margin:0 ${align === 'center' ? 'auto' : '0'};line-height:1.7;`, subtitle));
  return wrap;
}

/* ── HEADER ─────────────────────────────────────────── */
function ConsultingHeader() {
  const header = mkEl('header', `position:fixed;top:0;left:0;right:0;z-index:1000;width:100%;padding:18px 0;background:rgba(17,17,17,1);border-bottom:1px solid transparent;transition:background .4s,backdrop-filter .4s,border-color .4s;`);
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 40;
    header.style.background = s ? 'rgba(17,17,17,0.5)' : 'rgba(17,17,17,1)';
    header.style.backdropFilter = s ? 'blur(18px)' : 'none';
    header.style.borderBottom = s ? `1px solid ${theme.colors.glassBorder}` : '1px solid transparent';
  }, { passive: true });

  const ctr = mkEl('div', `${theme.styles.container}display:flex;justify-content:space-between;align-items:center;`);
  const logo = mkEl('a', `display:block;height:50px;overflow:hidden;`);
  logo.href = '/';
  const img = mkEl('img', `height:110px;width:auto;display:block;margin-top:-28px;`);
  img.src = '/logo_wide.png'; img.alt = 'Appercept';
  logo.appendChild(img);

  const nav = mkEl('nav', `display:flex;gap:24px;align-items:center;list-style:none;`);
  [['Usluge','services'],['Pricing','pricing'],['Kontakt','contact']].forEach(([name, id]) => {
    const a = mkEl('a', `font-size:.9rem;font-weight:500;opacity:.8;cursor:pointer;transition:all .3s;`, name);
    a.onmouseenter = () => { a.style.opacity = '1'; a.style.color = theme.colors.accentPrimary; };
    a.onmouseleave = () => { a.style.opacity = '.8'; a.style.color = 'inherit'; };
    a.onclick = e => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (!el) return;
      const s0 = window.scrollY, s1 = el.getBoundingClientRect().top + s0 - 90, d = s1 - s0, dur = 1100;
      let t0;
      const go = t => { if (!t0) t0 = t; const p = Math.min((t-t0)/dur,1); window.scrollTo(0, s0+d*(1-Math.pow(1-p,4))); if(p<1) requestAnimationFrame(go); };
      requestAnimationFrame(go);
    };
    nav.appendChild(a);
  });

  const back = mkEl('a', `background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;padding:9px 20px;border-radius:50px;font-size:.85rem;font-weight:600;transition:all .3s;margin-left:12px;`, '← Natrag');
  back.href = '/';
  back.onmouseenter = () => { back.style.filter = 'brightness(1.15)'; back.style.transform = 'translateY(-2px)'; };
  back.onmouseleave = () => { back.style.filter = ''; back.style.transform = ''; };
  nav.appendChild(back);

  ctr.appendChild(logo); ctr.appendChild(nav);
  header.appendChild(ctr);
  return header;
}

/* ── HERO ────────────────────────────────────────────── */
function ConsultingHero() {
  const sec = mkEl('section', `min-height:90vh;display:flex;align-items:center;padding:160px 0 100px;position:relative;`);
  const ctr = mkEl('div', theme.styles.container);
  const col = mkEl('div', `max-width:820px;`);
  col.className = 'fade-in-up';

  col.appendChild(mkEl('div', `display:inline-flex;align-items:center;gap:8px;background:rgba(28,117,188,.15);border:1px solid rgba(28,117,188,.3);padding:8px 18px;border-radius:50px;font-size:.82rem;color:${theme.colors.accentPrimary};margin-bottom:26px;letter-spacing:.5px;`, '🤖 &nbsp; Appercept AI Consulting'));

  const h1 = mkEl('h1', `font-size:4.2rem;line-height:1.1;font-weight:900;margin-bottom:22px;`);
  h1.innerHTML = `AI koji radi <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">za vaše poslovanje</span>`;
  col.appendChild(h1);
  col.appendChild(mkEl('p', `font-size:1.35rem;color:rgba(255,255,255,.7);margin-bottom:40px;max-width:600px;line-height:1.65;font-weight:300;`, 'Voice botovi, chat botovi i automatizacija poslovnih procesa. Implementiramo AI alate koji štede sate rada dnevno i povećavaju prihod.'));

  const row = mkEl('div', `display:flex;gap:14px;flex-wrap:wrap;`);
  const cta = mkEl('button', '', 'Dogovorite konzultaciju');
  cta.className = 'btn-primary';
  cta.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  const sec2 = mkEl('button', `background:transparent;border:1px solid rgba(255,255,255,.25);color:white;padding:0 28px;height:50px;border-radius:50px;font-size:.95rem;font-weight:500;cursor:pointer;transition:all .3s;`, 'Pogledaj usluge');
  sec2.onmouseenter = () => { sec2.style.background = 'rgba(255,255,255,.08)'; sec2.style.borderColor = 'rgba(255,255,255,.5)'; };
  sec2.onmouseleave = () => { sec2.style.background = 'transparent'; sec2.style.borderColor = 'rgba(255,255,255,.25)'; };
  sec2.onclick = () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  row.appendChild(cta); row.appendChild(sec2);
  col.appendChild(row);

  // Market stats from PDF
  const stats = mkEl('div', `display:flex;gap:40px;margin-top:64px;flex-wrap:wrap;padding-top:40px;border-top:1px solid rgba(255,255,255,.08);`);
  [['$11B','AI consulting tržište 2025'],['$91B','Projekcija do 2035'],['26%','Godišnji CAGR rast'],['88%','Tvrtki koristi AI']].forEach(([v,l]) => {
    const item = mkEl('div');
    item.appendChild(mkEl('div', `font-size:2rem;font-weight:800;color:${theme.colors.accentPrimary};`, v));
    item.appendChild(mkEl('div', `font-size:.78rem;opacity:.45;letter-spacing:1px;text-transform:uppercase;margin-top:4px;`, l));
    stats.appendChild(item);
  });
  col.appendChild(stats);

  ctr.appendChild(col);
  sec.appendChild(ctr);
  return sec;
}

/* ── SERVICES ─────────────────────────────────────────── */
function ConsultingServices() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'services';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader('Naše AI usluge', 'Specijaliziramo se za praktičnu primjenu AI-a — od automatizacije rutinskih zadataka do inteligentnih botova koji rade 24/7.'));

  const items = [
    { icon: '🎙️', title: 'Voice Botovi', desc: 'Glasovni AI asistenti koji primaju pozive, odgovaraju na upite i zakažu termine — bez čekanja i bez potrebe za živim operaterom.' },
    { icon: '💬', title: 'Chat Botovi', desc: 'Pametan chatbot za vašu web stranicu ili WhatsApp koji kvalificira leadove, odgovara na FAQ i pretvara posjetitelje u klijente.' },
    { icon: '⚡', title: 'Automatizacija procesa', desc: 'Eliminiramo ručni rad: automatski emailovi, generiranje dokumenata, CRM unosi, izvještaji — sve radi samo.' },
    { icon: '🔗', title: 'AI Integracije', desc: 'Spajamo OpenAI, Anthropic, n8n i Make s vašim sustavima. Workflow automatizacija prilagođena vašem poslovnom modelu.' },
    { icon: '📊', title: 'AI Audit', desc: 'Analiziramo vaše poslovanje i identificiramo top 3-5 mjesta gdje AI može odmah uštedjeti novac ili povećati prihod.' },
    { icon: '🎓', title: 'AI Edukacija & Radionice', desc: 'Obučavamo vaš tim kako koristiti AI alate. Hands-on radionice prilagođene vašoj industriji i razini znanja.' },
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;`);
  items.forEach(s => {
    const card = mkEl('div', `padding:36px;border-radius:20px;transition:transform .3s,box-shadow .3s;cursor:default;`);
    card.className = 'glass-card';
    card.appendChild(mkEl('div', `font-size:2.4rem;margin-bottom:16px;`, s.icon));
    card.appendChild(mkEl('h3', `font-size:1.2rem;margin-bottom:10px;`, s.title));
    card.appendChild(mkEl('p', `font-size:.92rem;color:rgba(255,255,255,.62);line-height:1.72;`, s.desc));
    grid.appendChild(card);
  });
  ctr.appendChild(grid);
  sec.appendChild(ctr);
  return sec;
}

/* ── NICHES ─────────────────────────────────────────── */
function ConsultingNiches() {
  const sec = mkEl('section', `padding:60px 0;`);
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader('Industrije koje servisiramo', 'Visoko traženi niches u 2025 godini prema Gartner, Deloitte i McKinsey istraživanjima.'));

  const niches = ['Healthcare AI','Finance & Banking','Voice & Chat automatizacija','Legal & Compliance AI','Retail & E-commerce','Manufacturing / Ops','HR & Talent automatizacija','SME digitalna transformacija'];
  const wrap = mkEl('div', `display:flex;flex-wrap:wrap;gap:14px;justify-content:center;`);
  niches.forEach(n => {
    const tag = mkEl('div', `padding:12px 22px;border-radius:50px;background:rgba(28,117,188,.12);border:1px solid rgba(28,117,188,.25);font-size:.9rem;color:rgba(255,255,255,.8);transition:all .3s;cursor:default;`);
    tag.textContent = n;
    tag.onmouseenter = () => { tag.style.background = 'rgba(28,117,188,.25)'; tag.style.borderColor = `${theme.colors.accentPrimary}`; };
    tag.onmouseleave = () => { tag.style.background = 'rgba(28,117,188,.12)'; tag.style.borderColor = 'rgba(28,117,188,.25)'; };
    wrap.appendChild(tag);
  });
  ctr.appendChild(wrap);
  sec.appendChild(ctr);
  return sec;
}

/* ── PRICING ─────────────────────────────────────────── */
function ConsultingPricing() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'pricing';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader('Modeli suradnje', 'Fleksibilni pricing modeli prilagođeni vašim potrebama — od jednokratnih konzultacija do dugoročnog partnerstva.'));

  const plans = [
    {
      icon: '⏱️', name: 'Hourly', price: '€100 – €350', unit: '/sat',
      badge: '', highlight: false,
      desc: 'Idealno za scoping, savjete i kratke projekte.',
      features: ['Junior konzultant od €100/h', 'Mid-level od €200/h', 'Senior AI arhitekt od €350/h', 'Minimum 2 sata po sesiji', 'Idealno za inicijalne konzultacije'],
    },
    {
      icon: '🔄', name: 'Retainer', price: '€3K – €15K', unit: '/mjesec',
      badge: '⭐ PREPORUČENO', highlight: true,
      desc: 'Kontinuirana podrška, implementacija i razvoj.',
      features: ['Neograničene konzultacije', 'Advisory + implementacija', 'Roadmap ownership', 'Tjedni check-in pozivi', 'Prioritetna podrška', 'Mjerna izvješća (KPI)'],
    },
    {
      icon: '📦', name: 'Fixed Project', price: '€10K – €150K+', unit: '/projekt',
      badge: '', highlight: false,
      desc: 'Definirani projekti s jasnim deliverables.',
      features: ['AI audit (€2K–5K)', 'Implementacija (€15K–80K)', 'Custom AI rješenje', 'Jasni acceptance criteria', 'Timeline i milestones'],
    },
    {
      icon: '📈', name: 'Value-Based', price: '5–20%', unit: 'od ROI',
      badge: '', highlight: false,
      desc: 'Premium model — plaćate samo za dokazane rezultate.',
      features: ['Za dokazane klijente', 'Naknada vezana za ROI', 'Zajednički interesi', 'Highest accountability', 'Mjerljivi poslovni impact'],
    },
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;align-items:start;`);
  plans.forEach(p => {
    const card = mkEl('div', `padding:36px;border-radius:22px;position:relative;display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s;
      ${p.highlight ? `background:linear-gradient(135deg,rgba(28,117,188,.22),rgba(43,57,144,.22));border:1px solid rgba(28,117,188,.5);` : `background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);`}`);

    if (p.badge) {
      const b = mkEl('div', `position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;padding:5px 18px;border-radius:50px;font-size:.75rem;font-weight:700;white-space:nowrap;`, p.badge);
      card.appendChild(b);
    }

    card.appendChild(mkEl('div', `font-size:2rem;margin-bottom:12px;`, p.icon));
    card.appendChild(mkEl('h3', `font-size:1.3rem;margin-bottom:8px;`, p.name));
    card.appendChild(mkEl('p', `font-size:.85rem;color:rgba(255,255,255,.5);margin-bottom:20px;`, p.desc));

    const priceBox = mkEl('div', `margin-bottom:24px;`);
    priceBox.appendChild(mkEl('span', `font-size:1.8rem;font-weight:800;color:${p.highlight ? theme.colors.accentPrimary : 'white'};`, p.price));
    priceBox.appendChild(mkEl('span', `font-size:.85rem;color:rgba(255,255,255,.4);margin-left:6px;`, p.unit));
    card.appendChild(priceBox);

    const ul = mkEl('ul', `list-style:none;padding:0;margin-bottom:28px;flex:1;`);
    p.features.forEach(f => {
      const li = mkEl('li', `display:flex;align-items:flex-start;gap:10px;margin-bottom:11px;font-size:.88rem;color:rgba(255,255,255,.78);`);
      li.innerHTML = `<span style="color:${theme.colors.accentPrimary};margin-top:1px;flex-shrink:0;">✓</span>${f}`;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const btn = mkEl('button', `width:100%;height:46px;border-radius:50px;font-size:.9rem;font-weight:600;cursor:pointer;transition:all .3s;
      ${p.highlight ? `background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;border:none;` : `background:transparent;color:white;border:1px solid rgba(255,255,255,.22);`}`, 'Kontaktirajte nas');
    btn.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.filter = 'brightness(1.1)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; btn.style.filter = ''; };
    card.appendChild(btn);
    grid.appendChild(card);
  });
  ctr.appendChild(grid);

  const note = mkEl('p', `text-align:center;color:rgba(255,255,255,.35);font-size:.82rem;margin-top:32px;`, 'Cijene su okvirne i prilagođavaju se prema opsegu projekta, industriji i trajanju suradnje. Kontaktirajte nas za personalnu ponudu.');
  ctr.appendChild(note);
  sec.appendChild(ctr);
  return sec;
}

/* ── CONTACT ─────────────────────────────────────────── */
function ConsultingContact() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'contact';
  const ctr = mkEl('div', theme.styles.container);

  const grid = mkEl('div', `display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;`);
  grid.className = 'responsive-grid';

  const info = mkEl('div');
  info.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, 'Dogovorite konzultaciju'));
  info.appendChild(Divider('left'));
  info.appendChild(mkEl('p', `font-size:1.05rem;opacity:.7;margin-bottom:36px;line-height:1.75;`, 'Počnite s besplatnim 30-minutnim discovery pozivom. Analiziramo vaše poslovanje i predlažemo gdje AI može napraviti razliku odmah.'));

  [['✉️','kontakt@appercept.net','mailto:kontakt@appercept.net'],
   ['📍','Ul. Roberta F. Mihanovića 9, Zagreb','#'],
   ['📞','+385 91 9545 128','tel:+38591954512']].forEach(([icon,text,href]) => {
    const row = mkEl('div', `display:flex;align-items:center;gap:14px;margin-bottom:18px;font-size:.98rem;`);
    row.appendChild(mkEl('span', `font-size:1.1rem;`, icon));
    const a = mkEl('a', `color:rgba(255,255,255,.75);transition:color .3s;`, text);
    a.href = href;
    a.onmouseenter = () => a.style.color = theme.colors.accentPrimary;
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,.75)';
    row.appendChild(a);
    info.appendChild(row);
  });
  grid.appendChild(info);

  const inpStyle = `width:100%;padding:14px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;font-size:.97rem;font-family:${theme.fonts.primary};transition:border-color .3s;outline:none;`;
  const form = mkEl('form', `padding:36px;border-radius:22px;display:flex;flex-direction:column;gap:16px;`);
  form.className = 'glass-card';

  [['Ime i prezime','text'],['Email','email'],['Tvrtka / projekt','text']].forEach(([ph,type]) => {
    const inp = mkEl('input', inpStyle);
    inp.placeholder = ph; inp.type = type;
    inp.onfocus = () => inp.style.borderColor = theme.colors.accentPrimary;
    inp.onblur = () => inp.style.borderColor = 'rgba(255,255,255,.1)';
    form.appendChild(inp);
  });

  const sel = mkEl('select', inpStyle + `cursor:pointer;`);
  [['','Što vas zanima...'],['voicebot','Voice Bot'],['chatbot','Chat Bot'],['automation','Automatizacija procesa'],['audit','AI Audit'],['hourly','Hourly konzultacija'],['other','Ostalo']].forEach(([v,t]) => {
    const o = mkEl('option', `background:#111;`, t); o.value = v; sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inpStyle);
  ta.placeholder = 'Opišite vaš slučaj i što biste htjeli automatizirati...';
  ta.rows = 4;
  ta.onfocus = () => ta.style.borderColor = theme.colors.accentPrimary;
  ta.onblur = () => ta.style.borderColor = 'rgba(255,255,255,.1)';
  form.appendChild(ta);

  const btn = mkEl('button', `width:100%;margin-top:6px;`, 'Pošalji upit →');
  btn.className = 'btn-primary';
  btn.type = 'submit';
  form.onsubmit = e => {
    e.preventDefault();
    btn.textContent = '✓ Primljeno! Javit ćemo se uskoro.';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Pošalji upit →'; btn.style.background = ''; form.reset(); }, 4000);
  };
  form.appendChild(btn);
  grid.appendChild(form);

  ctr.appendChild(grid);
  sec.appendChild(ctr);
  return sec;
}

/* ── FOOTER ─────────────────────────────────────────── */
function ConsultingFooter() {
  const footer = mkEl('footer', `padding:50px 0 30px;background:rgba(0,0,0,.4);border-top:1px solid rgba(255,255,255,.05);`);
  const ctr = mkEl('div', theme.styles.container);
  const row = mkEl('div', `display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;margin-bottom:28px;`);

  const brand = mkEl('div');
  brand.appendChild(mkEl('div', `font-size:1.05rem;font-weight:700;`, 'Appercept AI Consulting'));
  brand.appendChild(mkEl('div', `font-size:.82rem;color:rgba(255,255,255,.35);margin-top:4px;`, 'Voice Bots · Chat Bots · Automatizacija'));
  row.appendChild(brand);

  const back = mkEl('a', `color:${theme.colors.accentPrimary};font-size:.9rem;transition:opacity .3s;`, '← Appercept.net');
  back.href = '/';
  back.onmouseenter = () => back.style.opacity = '.7';
  back.onmouseleave = () => back.style.opacity = '1';
  row.appendChild(back);

  ctr.appendChild(row);
  ctr.appendChild(mkEl('div', `border-top:1px solid rgba(255,255,255,.07);padding-top:18px;text-align:center;color:rgba(255,255,255,.28);font-size:.8rem;`, `© ${new Date().getFullYear()} Appercept Consulting. Sva prava pridržana.`));
  footer.appendChild(ctr);
  return footer;
}

/* ── ASSEMBLE ─────────────────────────────────────────── */
export function ConsultingPage() {
  const wrap = document.createElement('div');
  wrap.appendChild(ConsultingHeader());
  wrap.appendChild(ConsultingHero());
  wrap.appendChild(ConsultingServices());
  wrap.appendChild(ConsultingNiches());
  wrap.appendChild(ConsultingPricing());
  wrap.appendChild(ConsultingContact());
  wrap.appendChild(ConsultingFooter());
  return wrap;
}
