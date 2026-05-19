import { theme } from '../theme.js';

function mkEl(tag, css = '', inner = '') {
  const el = document.createElement(tag);
  if (css) el.style.cssText = css;
  if (inner) el.innerHTML = inner;
  return el;
}

function animateValue(obj, start, end, duration, prefix = '', suffix = '') {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    obj.innerHTML = prefix + Math.floor(ease * (end - start) + start) + suffix;
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
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
  const statsData = [
    { target: 11, prefix: '$', suffix: 'B', label: 'AI consulting tržište 2025' },
    { target: 91, prefix: '$', suffix: 'B', label: 'Projekcija do 2035' },
    { target: 26, prefix: '', suffix: '%', label: 'Godišnji CAGR rast' },
    { target: 88, prefix: '', suffix: '%', label: 'Tvrtki koristi AI' }
  ];

  const stats = mkEl('div', `display:flex;gap:40px;margin-top:64px;flex-wrap:wrap;padding-top:40px;border-top:1px solid rgba(255,255,255,.08);`);
  
  statsData.forEach(itemData => {
    const item = mkEl('div');
    const valEl = mkEl('div', `font-size:2rem;font-weight:800;color:${theme.colors.accentPrimary};`, itemData.prefix + '0' + itemData.suffix);
    item.appendChild(valEl);
    item.appendChild(mkEl('div', `font-size:.78rem;opacity:.45;letter-spacing:1px;text-transform:uppercase;margin-top:4px;`, itemData.label));
    stats.appendChild(item);

    // Trigger count-up animation when stats element intersects viewport
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateValue(valEl, 0, itemData.target, 1000, itemData.prefix, itemData.suffix);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      observer.observe(stats);
    } else {
      // Fallback
      animateValue(valEl, 0, itemData.target, 1000, itemData.prefix, itemData.suffix);
    }
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
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
      title: 'Voice Botovi',
      desc: 'Glasovni AI asistenti koji primaju pozive, odgovaraju na upite i zakažu termine — bez čekanja i bez potrebe za živim operaterom.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
      title: 'Chat Botovi',
      desc: 'Pametan chatbot za vašu web stranicu ili WhatsApp koji kvalificira leadove, odgovara na FAQ i pretvara posjetitelje u klijente.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      title: 'Automatizacija procesa',
      desc: 'Eliminiramo ručni rad: automatski emailovi, generiranje dokumenata, CRM unosi, izvještaji — sve radi samo.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
      title: 'AI Integracije',
      desc: 'Spajamo OpenAI, Anthropic, n8n i Make s vašim sustavima. Workflow automatizacija prilagođena vašem poslovnom modelu.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
      title: 'AI Audit',
      desc: 'Analiziramo vaše poslovanje i identificiramo top 3-5 mjesta gdje AI može odmah uštedjeti novac ili povećati prihod.'
    },
    {
      icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`,
      title: 'AI Edukacija & Radionice',
      desc: 'Obučavamo vaš tim kako koristiti AI alate. Hands-on radionice prilagođene vašoj industriji i razini znanja.'
    }
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;`);
  items.forEach(s => {
    const card = mkEl('div', `padding:36px;border-radius:20px;transition:transform .3s,box-shadow .3s;cursor:default;`);
    card.className = 'glass-card';
    card.appendChild(mkEl('div', `margin-bottom:16px; display:flex; align-items:center; height:36px;`, s.icon));
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
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      name: 'Hourly', price: '€100 – €350', unit: '/sat',
      badge: '', highlight: false,
      desc: 'Idealno za scoping, savjete i kratke projekte.',
      features: ['Junior konzultant od €100/h', 'Mid-level od €200/h', 'Senior AI arhitekt od €350/h', 'Minimum 2 sata po sesiji', 'Idealno za inicijalne konzultacije'],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
      name: 'Retainer', price: '€3K – €15K', unit: '/mjesec',
      badge: 'PREPORUČENO', highlight: true,
      desc: 'Kontinuirana podrška, implementacija i razvoj.',
      features: ['Neograničene konzultacije', 'Advisory + implementacija', 'Roadmap ownership', 'Tjedni check-in pozivi', 'Prioritetna podrška', 'Mjerna izvješća (KPI)'],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      name: 'Fixed Project', price: '€10K – €150K+', unit: '/projekt',
      badge: '', highlight: false,
      desc: 'Definirani projekti s jasnim deliverables.',
      features: ['AI audit (€2K–5K)', 'Implementacija (€15K–80K)', 'Custom AI rješenje', 'Jasni acceptance criteria', 'Timeline i milestones'],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      name: 'Value-Based', price: '5–20%', unit: 'od ROI',
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

    card.appendChild(mkEl('div', `margin-bottom:12px; display:flex; align-items:center; height:36px;`, p.icon));
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

  const details = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>`,
      text: 'kontakt@appercept.net',
      href: 'mailto:kontakt@appercept.net'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`,
      text: 'Ul. Roberta F. Mihanovića 9, Zagreb',
      href: 'https://www.google.com/maps/search/?api=1&query=Ul.%20Roberta%20F.%20Mihanovi%C4%87a%209%2C%20Zagreb'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.63.24-1.01-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 4.24 3 5.37c0 8.07 6.53 14.6 14.6 14.6 1.13 0 2.07-.65 2.07-1.19v-3.81c0-.55-.45-1-.99-1H20.01z"></path></svg>`,
      text: '+385 91 9545 128',
      href: 'tel:+385919545128'
    }
  ];

  details.forEach(d => {
    const row = mkEl('div', `display:flex;align-items:center;gap:14px;margin-bottom:18px;font-size:.98rem;`);
    const iconSpan = mkEl('span', `display:inline-flex;align-items:center;`);
    iconSpan.innerHTML = d.icon;
    row.appendChild(iconSpan);
    const a = mkEl('a', `color:rgba(255,255,255,.75);transition:color .3s;`, d.text);
    a.href = d.href;
    a.onmouseenter = () => a.style.color = theme.colors.accentPrimary;
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,.75)';
    row.appendChild(a);
    info.appendChild(row);
  });
  grid.appendChild(info);

  const inpStyle = `width:100%;padding:14px;background:rgba(30,30,30,0.85);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;font-size:.97rem;font-family:${theme.fonts.primary};transition:border-color .3s, background-color .3s;outline:none;`;
  const form = mkEl('form', `padding:36px;border-radius:22px;display:flex;flex-direction:column;gap:16px;`);
  form.className = 'glass-card';

  [['Ime i prezime','text'],['Email','email'],['Tvrtka / projekt','text']].forEach(([ph,type]) => {
    const inp = mkEl('input', inpStyle);
    inp.placeholder = ph; inp.type = type;
    inp.onfocus = () => { inp.style.borderColor = theme.colors.accentPrimary; inp.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
    inp.onblur = () => { inp.style.borderColor = 'rgba(255,255,255,.1)'; inp.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
    form.appendChild(inp);
  });

  const sel = mkEl('select', inpStyle + `cursor:pointer; background-color: rgba(30,30,30,0.85);`);
  sel.onfocus = () => { sel.style.borderColor = theme.colors.accentPrimary; sel.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
  sel.onblur = () => { sel.style.borderColor = 'rgba(255,255,255,.1)'; sel.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
  
  [['','Što vas zanima...'],['voicebot','Voice Bot'],['chatbot','Chat Bot'],['automation','Automatizacija procesa'],['audit','AI Audit'],['hourly','Hourly konzultacija'],['other','Ostalo']].forEach(([v,t]) => {
    const o = mkEl('option', `background: #1e1e1e; color: #fff; padding: 10px;`, t); o.value = v; sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inpStyle);
  ta.placeholder = 'Opišite vaš slučaj i što biste htjeli automatizirati...';
  ta.rows = 4;
  ta.onfocus = () => { ta.style.borderColor = theme.colors.accentPrimary; ta.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
  ta.onblur = () => { ta.style.borderColor = 'rgba(255,255,255,.1)'; ta.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
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
  const footer = document.createElement('footer');
  footer.style.cssText = `
        background: #090909;
        border-top: 1px solid rgba(255,255,255,0.05);
        padding: 80px 0 40px 0;
        margin-top: auto;
    `;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const grid = document.createElement('div');
  grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 40px;
        margin-bottom: 60px;
        align-items: center;
        justify-content: center;
    `;

  // 1. Navigation
  const navCol = document.createElement('div');
  navCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`;
  const navTitle = document.createElement('h4');
  navTitle.textContent = 'Navigacija';
  navTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;
  const navUl = document.createElement('ul');
  navUl.style.cssText = `list-style: none; padding: 0; text-align: center;`;

  [
    { name: 'O nama', href: '/#about' },
    { name: 'Projekti', href: '/#products' },
    { name: 'Kontakt', href: '/#contact' },
    { name: 'Consulting', href: '/consulting.html' }
  ].forEach(link => {
    const li = document.createElement('li');
    li.style.marginBottom = '10px';
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.name;
    a.style.cssText = `color: rgba(255,255,255,0.6); font-size: 0.95rem; text-decoration: none; transition: color 0.3s;`;
    a.onmouseenter = () => a.style.color = 'white';
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,0.6)';
    li.appendChild(a);
    navUl.appendChild(li);
  });
  navCol.appendChild(navTitle);
  navCol.appendChild(navUl);

  // 2. Personal Contacts
  const contactsCol = document.createElement('div');
  contactsCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`;
  const contactsTitle = document.createElement('h4');
  contactsTitle.textContent = 'Naš tim';
  contactsTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;

  const contacts = [
    { name: 'Gašpar Bodulica', num: '+385 99 3553 000' },
    { name: 'Karlo Časni', num: '+385 91 9545 128' },
    { name: 'Bruno Vujčec', num: '+385 97 6635 960' }
  ];

  contacts.forEach(c => {
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.textAlign = 'center';

    const nameDiv = document.createElement('div');
    nameDiv.textContent = c.name;
    nameDiv.style.cssText = `color: white; font-weight: 500;`;

    const numLink = document.createElement('a');
    numLink.textContent = c.num;
    numLink.href = `tel:${c.num.replace(/\s/g, '')}`;
    numLink.style.cssText = `color: rgba(255,255,255,0.6); font-size: 0.9rem; transition: color 0.3s; text-decoration: none;`;

    numLink.onmouseenter = () => numLink.style.color = theme.colors.accentPrimary;
    numLink.onmouseleave = () => numLink.style.color = 'rgba(255,255,255,0.6)';

    div.appendChild(nameDiv);
    div.appendChild(numLink);
    contactsCol.appendChild(div);
  });

  // 3. Socials
  const socialCol = document.createElement('div');
  socialCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`;
  const socialTitle = document.createElement('h4');
  socialTitle.textContent = 'Social';
  socialTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;
  const socialRow = document.createElement('div');
  socialRow.style.cssText = `display: flex; gap: 15px; justify-content: center;`;

  ['LinkedIn', 'Instagram'].forEach(net => {
    const link = document.createElement('a');
    link.href = net === 'LinkedIn' ? 'https://www.linkedin.com/company/appercept-net/?viewAsMember=true' : 'https://www.instagram.com/appercept_net/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = net;

    let svgPath = '';
    if (net === 'LinkedIn') svgPath = '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>';
    if (net === 'Instagram') svgPath = '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>';

    link.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>`;

    link.style.cssText = `
        ${theme.styles.glass}
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        color: white; 
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.03); 
    `;

    link.onmouseenter = () => {
      link.style.background = `linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`;
      link.style.transform = 'translateY(-3px)';
      link.style.borderColor = 'transparent';
    };
    link.onmouseleave = () => {
      link.style.background = 'rgba(255, 255, 255, 0.03)';
      link.style.transform = 'translateY(0)';
      link.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    };

    socialRow.appendChild(link);
  });

  socialCol.appendChild(socialTitle);
  socialCol.appendChild(socialRow);

  // Append Columns
  grid.appendChild(navCol);
  grid.appendChild(contactsCol);
  grid.appendChild(socialCol);

  // Copyright
  const copy = document.createElement('div');
  copy.style.cssText = `
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 20px;
        text-align: center;
        color: rgba(255,255,255,0.4);
        font-size: 0.85rem;
    `;
  copy.innerHTML = `&copy; ${new Date().getFullYear()} Appercept. Sva prava pridržana.`;

  container.appendChild(grid);
  container.appendChild(copy);
  footer.appendChild(container);

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
