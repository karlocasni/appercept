import { theme } from '../theme.js';

function mkEl(tag, css = '', inner = '') {
  const el = document.createElement(tag);
  if (css) el.style.cssText = css;
  if (inner) el.innerHTML = inner;
  return el;
}

function Divider() {
  return mkEl('div', `width:80px;height:4px;background:${theme.colors.accentPrimary};border-radius:2px;margin:20px auto 30px auto;`);
}

/* ── HEADER ─────────────────────────────────────────────── */
function ConsultingHeader() {
  const header = mkEl('header', `
    position:fixed;top:0;left:0;right:0;z-index:1000;
    width:100%;padding:20px 0;
    transition:background .4s ease,backdrop-filter .4s ease,border-color .4s ease;
    background:rgba(17,17,17,1);border-bottom:1px solid transparent;
  `);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(17,17,17,0.5)';
      header.style.backdropFilter = 'blur(18px)';
      header.style.borderBottom = `1px solid ${theme.colors.glassBorder}`;
    } else {
      header.style.background = 'rgba(17,17,17,1)';
      header.style.backdropFilter = 'none';
      header.style.borderBottom = '1px solid transparent';
    }
  }, { passive: true });

  const container = mkEl('div', `${theme.styles.container}display:flex;justify-content:space-between;align-items:center;`);

  const logo = mkEl('a', `display:block;height:55px;overflow:hidden;`);
  logo.href = '/';
  const logoImg = mkEl('img', `height:120px;width:auto;display:block;margin-top:-32px;`);
  logoImg.src = '/logo_wide.png'; logoImg.alt = 'APPERCEPT';
  logo.appendChild(logoImg);

  const nav = mkEl('nav', `display:flex;gap:30px;align-items:center;`);
  const links = [
    { name: 'Usluge', id: 'services' },
    { name: 'Proces', id: 'process' },
    { name: 'Planovi', id: 'pricing' },
    { name: 'Kontakt', id: 'contact' },
  ];
  links.forEach(l => {
    const a = mkEl('a', `font-size:.9rem;font-weight:500;opacity:.8;transition:all .3s ease;cursor:pointer;`);
    a.textContent = l.name;
    a.onmouseenter = () => { a.style.opacity = '1'; a.style.color = theme.colors.accentPrimary; };
    a.onmouseleave = () => { a.style.opacity = '.8'; a.style.color = 'inherit'; };
    a.onclick = (e) => {
      e.preventDefault();
      const target = document.getElementById(l.id);
      if (target) {
        const start = window.scrollY;
        const end = target.getBoundingClientRect().top + window.scrollY - 90;
        const dist = end - start;
        const dur = 1200;
        let t0 = null;
        const step = (now) => {
          if (!t0) t0 = now;
          const p = Math.min((now - t0) / dur, 1);
          window.scrollTo(0, start + dist * (1 - Math.pow(1 - p, 4)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    };
    nav.appendChild(a);
  });

  const backBtn = mkEl('a', `
    background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});
    color:white;padding:10px 22px;border-radius:50px;font-size:.85rem;font-weight:600;
    transition:all .3s ease;margin-left:20px;
  `, '← Appercept.net');
  backBtn.href = '/';
  backBtn.onmouseenter = () => { backBtn.style.filter = 'brightness(1.15)'; backBtn.style.transform = 'translateY(-2px)'; };
  backBtn.onmouseleave = () => { backBtn.style.filter = ''; backBtn.style.transform = ''; };
  nav.appendChild(backBtn);

  container.appendChild(logo);
  container.appendChild(nav);
  header.appendChild(container);
  return header;
}

/* ── HERO ────────────────────────────────────────────────── */
function ConsultingHero() {
  const section = mkEl('section', `
    min-height:90vh;display:flex;align-items:center;
    position:relative;padding:160px 0 100px;
  `);
  const container = mkEl('div', theme.styles.container);
  const content = mkEl('div', `max-width:800px;`);
  content.className = 'fade-in-up';

  const badge = mkEl('div', `
    display:inline-flex;align-items:center;gap:8px;
    background:rgba(28,117,188,.15);border:1px solid rgba(28,117,188,.3);
    padding:8px 18px;border-radius:50px;font-size:.85rem;
    color:${theme.colors.accentPrimary};margin-bottom:28px;letter-spacing:.5px;
  `, '◆ &nbsp; Appercept Consulting');
  content.appendChild(badge);

  const h1 = mkEl('h1', `font-size:4.5rem;line-height:1.1;font-weight:900;margin-bottom:24px;`);
  h1.innerHTML = `Strateška <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">digitalna</span> transformacija`;
  content.appendChild(h1);

  content.appendChild(mkEl('p', `
    font-size:1.4rem;color:rgba(255,255,255,.7);margin-bottom:40px;
    font-weight:300;max-width:620px;line-height:1.6;
  `, 'Pretvaramo kompleksne poslovne izazove u jasne, provedive strategije. Vaš uspjeh je naša jedina metrika.'));

  const btnRow = mkEl('div', `display:flex;gap:16px;flex-wrap:wrap;`);
  const cta = mkEl('button', ``, 'Dogovorite konzultaciju');
  cta.className = 'btn-primary';
  cta.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

  const secondary = mkEl('button', `
    background:transparent;border:1px solid rgba(255,255,255,.25);
    color:white;padding:0 32px;height:50px;border-radius:50px;
    font-size:1rem;font-weight:500;cursor:pointer;transition:all .3s ease;
  `, 'Saznaj više');
  secondary.onmouseenter = () => { secondary.style.background = 'rgba(255,255,255,.08)'; secondary.style.borderColor = 'rgba(255,255,255,.5)'; };
  secondary.onmouseleave = () => { secondary.style.background = 'transparent'; secondary.style.borderColor = 'rgba(255,255,255,.25)'; };
  secondary.onclick = () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' });

  btnRow.appendChild(cta);
  btnRow.appendChild(secondary);
  content.appendChild(btnRow);

  // Stats row
  const stats = mkEl('div', `display:flex;gap:50px;margin-top:70px;flex-wrap:wrap;`);
  [['10+', 'Godina iskustva'], ['50+', 'Uspješnih projekata'], ['100%', 'Zadovoljnih klijenata']].forEach(([val, label]) => {
    const item = mkEl('div');
    item.appendChild(mkEl('div', `font-size:2.2rem;font-weight:800;color:${theme.colors.accentPrimary};`, val));
    item.appendChild(mkEl('div', `font-size:.85rem;opacity:.5;letter-spacing:1px;text-transform:uppercase;margin-top:4px;`, label));
    stats.appendChild(item);
  });
  content.appendChild(stats);

  container.appendChild(content);
  section.appendChild(container);
  return section;
}

/* ── SERVICES ────────────────────────────────────────────── */
function ConsultingServices() {
  const section = mkEl('section', `padding:100px 0;`);
  section.id = 'services';
  const container = mkEl('div', theme.styles.container);

  const hdr = mkEl('div', `text-align:center;margin-bottom:70px;`);
  hdr.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, 'Naše usluge'));
  hdr.appendChild(Divider());
  hdr.appendChild(mkEl('p', `color:rgba(255,255,255,.6);font-size:1.1rem;max-width:600px;margin:0 auto;line-height:1.6;`,
    'Pružamo sveobuhvatne konzultantske usluge prilagođene vašim specifičnim poslovnim ciljevima.'));
  container.appendChild(hdr);

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:28px;`);
  const services = [
    { icon: '🎯', title: 'IT & Digitalna strategija', desc: 'Definiramo vašu digitalnu viziju, procjenjujemo digitalnu zrelost i kreiramo prioritizirani roadmap za rast.' },
    { icon: '⚡', title: 'Digitalna transformacija', desc: 'Implementacija cloud rješenja, automatizacija procesa i modernizacija legacy sustava za maksimalnu efikasnost.' },
    { icon: '🤖', title: 'AI & Podatkovna analitika', desc: 'Uvođenje AI i machine learning rješenja za donošenje odluka temeljenih na podacima u realnom vremenu.' },
    { icon: '🛡️', title: 'Kibernetička sigurnost', desc: 'Zaštita digitalne infrastrukture kroz sveobuhvatne sigurnosne revizije i implementaciju best practice standarda.' },
    { icon: '📈', title: 'Upravljanje & Strategija', desc: 'Dugoročno strateško planiranje, optimizacija organizacijske strukture i razvoj liderstva za konkurentnu prednost.' },
    { icon: '🔄', title: 'Optimizacija procesa', desc: 'Identifikacija uskih grla, smanjenje troškova i povećanje produktivnosti kroz BPM metodologije.' },
  ];
  services.forEach(s => {
    const card = mkEl('div', `padding:36px;border-radius:20px;transition:transform .3s ease,box-shadow .3s ease;`);
    card.className = 'glass-card';
    card.appendChild(mkEl('div', `font-size:2.5rem;margin-bottom:18px;`, s.icon));
    card.appendChild(mkEl('h3', `font-size:1.25rem;margin-bottom:12px;`, s.title));
    card.appendChild(mkEl('p', `font-size:.95rem;color:rgba(255,255,255,.65);line-height:1.7;`, s.desc));
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

/* ── PROCESS ─────────────────────────────────────────────── */
function ConsultingProcess() {
  const section = mkEl('section', `padding:100px 0;`);
  section.id = 'process';
  const container = mkEl('div', theme.styles.container);

  const hdr = mkEl('div', `text-align:center;margin-bottom:70px;`);
  hdr.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, 'Naš proces'));
  hdr.appendChild(Divider());
  hdr.appendChild(mkEl('p', `color:rgba(255,255,255,.6);font-size:1.1rem;max-width:600px;margin:0 auto;`,
    'Strukturirani, transparentni pristup koji osigurava mjerljive rezultate u svakom koraku.'));
  container.appendChild(hdr);

  const steps = [
    { n: '01', title: 'Otkrivanje', desc: 'Dubinska analiza vašeg poslovanja, tržišta i izazova. Intervjuiramo ključne dionike i prikupljamo podatke.' },
    { n: '02', title: 'Dijagnoza', desc: 'Identificiramo uzroke problema, prilike za rast i prioritete. Definiramo mjerljive ciljeve.' },
    { n: '03', title: 'Strategija', desc: 'Razvijamo prilagođeni plan akcije s jasnim rokovima, odgovornostima i KPI-jima.' },
    { n: '04', title: 'Implementacija', desc: 'Podržavamo provedbu strategije — od instalacije softvera do obuke tima i praćenja napretka.' },
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;`);
  steps.forEach((s, i) => {
    const card = mkEl('div', `padding:36px;border-radius:20px;position:relative;`);
    card.className = 'glass-card';
    card.appendChild(mkEl('div', `
      font-size:3.5rem;font-weight:900;
      background:linear-gradient(135deg,${theme.colors.accentPrimary},#00d2ff);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      margin-bottom:16px;line-height:1;
    `, s.n));
    card.appendChild(mkEl('h3', `font-size:1.2rem;margin-bottom:12px;`, s.title));
    card.appendChild(mkEl('p', `font-size:.9rem;color:rgba(255,255,255,.6);line-height:1.7;`, s.desc));
    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

/* ── PRICING ─────────────────────────────────────────────── */
function ConsultingPricing() {
  const section = mkEl('section', `padding:100px 0;`);
  section.id = 'pricing';
  const container = mkEl('div', theme.styles.container);

  const hdr = mkEl('div', `text-align:center;margin-bottom:70px;`);
  hdr.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, 'Planovi i cijene'));
  hdr.appendChild(Divider());
  hdr.appendChild(mkEl('p', `color:rgba(255,255,255,.6);font-size:1.1rem;max-width:600px;margin:0 auto;`,
    'Fleksibilni paketi prilagođeni vašim potrebama i veličini organizacije.'));
  container.appendChild(hdr);

  const plans = [
    {
      name: 'Starter', price: 'Na upit', period: 'jednokratno',
      desc: 'Idealno za manje tvrtke koje trebaju početnu digitalnu strategiju.',
      features: ['Inicijalna dijagnoza poslovanja', 'Strateški roadmap (30 dana)', '2 radionica s timom', 'Pisani izvještaj i preporuke', 'Email podrška 30 dana'],
      highlight: false,
    },
    {
      name: 'Growth', price: 'Na upit', period: 'mjesečno',
      desc: 'Za rastuće tvrtke koje žele kontinuiranu transformaciju i podršku.',
      features: ['Sve iz Starter paketa', 'Mjesečne strateške sesije', 'AI & analitika implementacija', 'KPI praćenje i reporting', 'Prioritetna podrška', 'Obuka tima'],
      highlight: true,
    },
    {
      name: 'Enterprise', price: 'Na upit', period: 'prilagođeno',
      desc: 'Kompleksna transformacija za velike organizacije s posebnim zahtjevima.',
      features: ['Dedicated consulting tim', 'Neograničene konzultacije', 'Custom integrations', 'SLA ugovor', 'C-level strateška podrška', 'On-site workshop sesije', 'Cybersecurity audit'],
      highlight: false,
    },
  ];

  const grid = mkEl('div', `display:flex;justify-content:center;gap:24px;flex-wrap:wrap;align-items:stretch;`);
  plans.forEach(p => {
    const card = mkEl('div', `
      padding:40px;border-radius:24px;width:340px;max-width:100%;
      display:flex;flex-direction:column;position:relative;
      transition:transform .3s ease,box-shadow .3s ease;
      ${p.highlight
        ? `background:linear-gradient(135deg,rgba(28,117,188,.25),rgba(43,57,144,.25));border:1px solid rgba(28,117,188,.5);`
        : `background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);`}
    `);

    if (p.highlight) {
      const badge = mkEl('div', `
        position:absolute;top:-14px;left:50%;transform:translateX(-50%);
        background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});
        color:white;padding:6px 20px;border-radius:50px;font-size:.8rem;font-weight:700;
        white-space:nowrap;
      `, '⭐ NAJPOPULARNIJE');
      card.appendChild(badge);
    }

    card.appendChild(mkEl('h3', `font-size:1.5rem;margin-bottom:8px;`, p.name));
    card.appendChild(mkEl('p', `font-size:.9rem;color:rgba(255,255,255,.55);margin-bottom:24px;line-height:1.5;`, p.desc));

    const priceEl = mkEl('div', `margin-bottom:28px;`);
    priceEl.appendChild(mkEl('div', `font-size:2rem;font-weight:800;color:${p.highlight ? theme.colors.accentPrimary : 'white'};`, p.price));
    priceEl.appendChild(mkEl('div', `font-size:.8rem;color:rgba(255,255,255,.4);`, p.period));
    card.appendChild(priceEl);

    const ul = mkEl('ul', `list-style:none;padding:0;margin-bottom:32px;flex:1;`);
    p.features.forEach(f => {
      const li = mkEl('li', `display:flex;align-items:center;gap:10px;margin-bottom:12px;font-size:.9rem;color:rgba(255,255,255,.8);`);
      li.innerHTML = `<span style="color:${theme.colors.accentPrimary};font-size:1rem;">✓</span> ${f}`;
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const btn = mkEl('button', `
      width:100%;height:48px;border-radius:50px;font-size:.95rem;font-weight:600;
      cursor:pointer;transition:all .3s ease;
      ${p.highlight
        ? `background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;border:none;`
        : `background:transparent;color:white;border:1px solid rgba(255,255,255,.25);`}
    `, 'Kontaktirajte nas');
    btn.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.filter = 'brightness(1.1)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; btn.style.filter = ''; };
    card.appendChild(btn);

    grid.appendChild(card);
  });
  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

/* ── CONTACT ─────────────────────────────────────────────── */
function ConsultingContact() {
  const section = mkEl('section', `padding:100px 0;`);
  section.id = 'contact';
  const container = mkEl('div', theme.styles.container);

  const grid = mkEl('div', `display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;`);
  grid.className = 'responsive-grid';

  const info = mkEl('div');
  info.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, 'Dogovorite konzultaciju'));
  info.appendChild(Divider());
  info.appendChild(mkEl('p', `font-size:1.1rem;opacity:.7;margin-bottom:40px;line-height:1.7;`,
    'Kontaktirajte nas za besplatnu inicijalnu konzultaciju. Analiziramo vaše potrebe i predlažemo optimalni pristup.'));

  [
    { icon: '✉️', text: 'kontakt@appercept.net', href: 'mailto:kontakt@appercept.net' },
    { icon: '📍', text: 'Ul. Roberta F. Mihanovića 9, Zagreb', href: '#' },
    { icon: '📞', text: '+385 91 9545 128', href: 'tel:+38591954512' },
  ].forEach(d => {
    const row = mkEl('div', `display:flex;align-items:center;gap:16px;margin-bottom:20px;font-size:1rem;opacity:.85;`);
    row.appendChild(mkEl('span', `font-size:1.2rem;`, d.icon));
    const a = mkEl('a', `color:inherit;transition:color .3s;`, d.text);
    a.href = d.href;
    a.onmouseenter = () => a.style.color = theme.colors.accentPrimary;
    a.onmouseleave = () => a.style.color = 'inherit';
    row.appendChild(a);
    info.appendChild(row);
  });
  grid.appendChild(info);

  const form = mkEl('form', `
    ${theme.styles.glass}padding:40px;border-radius:20px;
    display:flex;flex-direction:column;gap:18px;
  `);
  form.className = 'glass-card';

  const inputStyle = `width:100%;padding:14px;background:rgba(0,0,0,.3);
    border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;
    font-size:1rem;font-family:${theme.fonts.primary};transition:border-color .3s;`;

  ['Ime i prezime', 'Email', 'Tvrtka'].forEach(ph => {
    const inp = mkEl('input', inputStyle);
    inp.placeholder = ph;
    inp.type = ph === 'Email' ? 'email' : 'text';
    inp.onfocus = () => inp.style.borderColor = theme.colors.accentPrimary;
    inp.onblur = () => inp.style.borderColor = 'rgba(255,255,255,.1)';
    form.appendChild(inp);
  });

  const sel = mkEl('select', inputStyle + `cursor:pointer;`);
  [['', 'Vrsta konzultacije...'], ['strategy', 'IT Strategija'], ['transformation', 'Digitalna transformacija'], ['ai', 'AI & Analitika'], ['security', 'Kibernetička sigurnost'], ['other', 'Ostalo']].forEach(([val, txt]) => {
    const o = mkEl('option', `background:#111;`, txt);
    o.value = val;
    sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inputStyle);
  ta.placeholder = 'Opišite vaš projekt i izazov...';
  ta.rows = 4;
  ta.onfocus = () => ta.style.borderColor = theme.colors.accentPrimary;
  ta.onblur = () => ta.style.borderColor = 'rgba(255,255,255,.1)';
  form.appendChild(ta);

  const btn = mkEl('button', `margin-top:6px;`, 'Pošalji upit');
  btn.className = 'btn-primary';
  btn.type = 'submit';
  btn.style.width = '100%';
  form.onsubmit = e => {
    e.preventDefault();
    btn.textContent = 'Poslano! Javit ćemo se uskoro.';
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = 'Pošalji upit'; btn.style.background = ''; form.reset(); }, 4000);
  };
  form.appendChild(btn);
  grid.appendChild(form);

  container.appendChild(grid);
  section.appendChild(container);
  return section;
}

/* ── FOOTER ──────────────────────────────────────────────── */
function ConsultingFooter() {
  const footer = mkEl('footer', `
    padding:50px 0 30px;background:rgba(0,0,0,.4);
    border-top:1px solid rgba(255,255,255,.05);
  `);
  const container = mkEl('div', theme.styles.container);
  const row = mkEl('div', `display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;margin-bottom:30px;`);

  const brand = mkEl('div');
  brand.appendChild(mkEl('div', `font-size:1.1rem;font-weight:700;`, 'Appercept Consulting'));
  brand.appendChild(mkEl('div', `font-size:.85rem;color:rgba(255,255,255,.4);margin-top:4px;`, 'Strateška digitalna transformacija'));
  row.appendChild(brand);

  const navLinks = mkEl('div', `display:flex;gap:24px;flex-wrap:wrap;`);
  ['Usluge', 'Proces', 'Planovi', 'Kontakt'].forEach(name => {
    const a = mkEl('a', `color:rgba(255,255,255,.5);font-size:.9rem;transition:color .3s;cursor:pointer;`, name);
    a.onmouseenter = () => a.style.color = 'white';
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,.5)';
    navLinks.appendChild(a);
  });
  row.appendChild(navLinks);

  const backLink = mkEl('a', `color:${theme.colors.accentPrimary};font-size:.9rem;transition:opacity .3s;`, '← Appercept.net');
  backLink.href = '/';
  backLink.onmouseenter = () => backLink.style.opacity = '.7';
  backLink.onmouseleave = () => backLink.style.opacity = '1';
  row.appendChild(backLink);

  container.appendChild(row);
  container.appendChild(mkEl('div', `
    border-top:1px solid rgba(255,255,255,.07);padding-top:20px;
    text-align:center;color:rgba(255,255,255,.3);font-size:.8rem;
  `, `© ${new Date().getFullYear()} Appercept Consulting. Sva prava pridržana.`));
  footer.appendChild(container);
  return footer;
}

/* ── ASSEMBLE ────────────────────────────────────────────── */
export function ConsultingPage() {
  const wrapper = mkEl('div');
  wrapper.appendChild(ConsultingHeader());
  wrapper.appendChild(ConsultingHero());
  wrapper.appendChild(ConsultingServices());
  wrapper.appendChild(ConsultingProcess());
  wrapper.appendChild(ConsultingPricing());
  wrapper.appendChild(ConsultingContact());
  wrapper.appendChild(ConsultingFooter());
  return wrapper;
}
