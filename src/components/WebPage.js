import { theme } from '../theme.js';
import { t, toggleLanguage, getLanguage } from '../lib/i18n.js';

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
    if (progress < 1) window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
}

function Divider(align = 'center') {
  return mkEl('div', `width:80px;height:4px;background:linear-gradient(90deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});border-radius:2px;margin:20px ${align === 'left' ? '0' : 'auto'} 30px ${align === 'left' ? '0' : 'auto'};`);
}

function sectionHeader(title, subtitle, align = 'center') {
  const wrap = mkEl('div', `text-align:${align};margin-bottom:64px;`);
  wrap.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, title));
  wrap.appendChild(Divider(align));
  if (subtitle) wrap.appendChild(mkEl('p', `color:rgba(255,255,255,.6);font-size:1.1rem;max-width:640px;margin:0 ${align === 'center' ? 'auto' : '0'};line-height:1.7;`, subtitle));
  return wrap;
}

/* ── HEADER ─────────────────────────────────────────── */
function WebHeader() {
  const header = mkEl('header', `position:fixed;top:0;left:0;right:0;z-index:1000;width:100%;padding:18px 0;background:rgba(17,17,17,1);border-bottom:1px solid transparent;transition:background .4s,backdrop-filter .4s,-webkit-backdrop-filter .4s,border-color .4s;`);
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 40;
    header.style.background = s ? 'rgba(17,17,17,0.60)' : 'rgba(17,17,17,1)';
    header.style.backdropFilter = s ? 'blur(12px)' : 'none';
    header.style.webkitBackdropFilter = s ? 'blur(12px)' : 'none';
    header.style.borderBottom = s ? `1px solid ${theme.colors.glassBorder}` : '1px solid transparent';
  }, { passive: true });

  const ctr = mkEl('div', `${theme.styles.container}display:flex;justify-content:space-between;align-items:center;`);

  const logoWrap = mkEl('a', `display:flex;flex-direction:column;align-items:flex-start;text-decoration:none;`);
  logoWrap.href = '/';
  const logoInner = mkEl('div', `display:block;height:50px;overflow:hidden;`);
  const img = mkEl('img', `height:110px;width:auto;display:block;margin-top:-28px;`);
  img.src = '/logo_wide.png'; img.alt = 'Appercept';
  logoInner.appendChild(img);
  const subLabel = mkEl('span', `font-size:0.65rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-top:2px;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`);
  subLabel.textContent = t('Web & Aplikacije', 'Web & Apps');
  logoWrap.appendChild(logoInner);
  logoWrap.appendChild(subLabel);

  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
  hamburger.style.cssText = `background:transparent;border:none;cursor:pointer;display:none;z-index:1001;`;

  const backdrop = document.createElement('div');
  backdrop.style.cssText = `position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:998;display:none;opacity:0;transition:opacity 0.3s;backdrop-filter:blur(4px);`;
  document.body.appendChild(backdrop);

  const nav = mkEl('nav', `display:flex;gap:24px;align-items:center;`);
  nav.className = 'header-nav';

  const toggleMenu = (forceClose = false) => {
    const isOpening = !nav.classList.contains('open') && !forceClose;
    if (isOpening) {
      nav.classList.add('open');
      document.body.style.overflow = 'hidden';
      backdrop.style.display = 'block';
      setTimeout(() => backdrop.style.opacity = '1', 10);
      hamburger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
    } else {
      nav.classList.remove('open');
      document.body.style.overflow = '';
      backdrop.style.opacity = '0';
      setTimeout(() => backdrop.style.display = 'none', 300);
      hamburger.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    }
  };

  hamburger.onclick = () => toggleMenu();
  backdrop.onclick = () => toggleMenu(true);

  const ul = document.createElement('ul');
  ul.style.cssText = `list-style:none;padding:0;margin:0;display:flex;align-items:center;gap:30px;`;

  [[t('Usluge', 'Services'), 'services'], [t('Proces', 'Process'), 'process'], [t('Kontakt', 'Contact'), 'contact']].forEach(([name, id]) => {
    const li = document.createElement('li');
    const a = mkEl('a', `font-size:.9rem;font-weight:500;opacity:.8;cursor:pointer;transition:all .3s;`, name);
    a.onmouseenter = () => { a.style.opacity = '1'; a.style.color = theme.colors.accentPrimary; };
    a.onmouseleave = () => { a.style.opacity = '.8'; a.style.color = 'inherit'; };
    a.onclick = e => {
      e.preventDefault();
      if (window.innerWidth <= 768) toggleMenu(true);
      const el = document.getElementById(id);
      if (!el) return;
      const s0 = window.scrollY, s1 = el.getBoundingClientRect().top + s0 - 90, d = s1 - s0, dur = 1100;
      let t0;
      const go = ts => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / dur, 1); window.scrollTo(0, s0 + d * (1 - Math.pow(1 - p, 4))); if (p < 1) requestAnimationFrame(go); };
      requestAnimationFrame(go);
    };
    li.appendChild(a);
    ul.appendChild(li);
  });

  const backLi = document.createElement('li');
  const back = mkEl('a', `font-size:.9rem;font-weight:600;transition:all .3s;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`, t('← Natrag', '← Back'));
  back.href = '/';
  backLi.appendChild(back);
  ul.appendChild(backLi);

  const langLi = document.createElement('li');
  langLi.style.cssText = `display:flex;align-items:center;justify-content:center;`;
  const langBtn = document.createElement('button');
  langBtn.textContent = getLanguage() === 'hr' ? 'EN' : 'HR';
  langBtn.style.cssText = `background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);color:white;padding:6px 14px;border-radius:6px;font-size:0.8rem;font-weight:700;cursor:pointer;transition:all 0.3s;align-self:center;font-family:inherit;letter-spacing:0.5px;`;
  langBtn.onmouseenter = () => { langBtn.style.background = 'rgba(255,255,255,0.15)'; langBtn.style.borderColor = theme.colors.accentPrimary; };
  langBtn.onmouseleave = () => { langBtn.style.background = 'rgba(255,255,255,0.06)'; langBtn.style.borderColor = 'rgba(255,255,255,0.18)'; };
  langBtn.onclick = () => toggleLanguage();
  langLi.appendChild(langBtn);
  ul.appendChild(langLi);

  nav.appendChild(ul);
  ctr.appendChild(logoWrap);
  ctr.appendChild(hamburger);
  ctr.appendChild(nav);
  header.appendChild(ctr);
  return header;
}

/* ── HERO ────────────────────────────────────────────── */
function WebHero() {
  const sec = mkEl('section', `min-height:90vh;display:flex;align-items:center;padding:140px 0 100px;position:relative;`);
  sec.className = 'consulting-hero';
  const ctr = mkEl('div', theme.styles.container);
  const col = mkEl('div', `max-width:860px;`);
  col.className = 'fade-in-up';

  const h1 = mkEl('h1', `font-size:4.2rem;line-height:1.1;font-weight:900;margin-bottom:22px;margin-top:80px;`);
  h1.innerHTML = t(
    `Web koji radi <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">za vaš biznis</span>`,
    `Web that works <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">for your business</span>`
  );
  col.appendChild(h1);
  col.appendChild(mkEl('p', `font-size:1.35rem;color:rgba(255,255,255,.7);margin-bottom:40px;max-width:640px;line-height:1.65;font-weight:300;`,
    t('Od brzih landing pageva do kompleksnih web aplikacija — dizajniramo, razvijamo i isporučujemo digitalne proizvode koji izgledaju vrhunski i performiraju još bolje.',
      'From fast landing pages to complex web applications — we design, develop, and deliver digital products that look exceptional and perform even better.')
  ));

  const row = mkEl('div', `display:flex;gap:14px;flex-wrap:wrap;`);
  const cta = mkEl('button', '', t('Pokreni projekt', 'Start a project'));
  cta.className = 'btn-primary';
  cta.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  const sec2 = mkEl('button', `background:transparent;border:1px solid rgba(255,255,255,.25);color:white;padding:0 28px;height:50px;border-radius:50px;font-size:.95rem;font-weight:500;cursor:pointer;transition:all .3s;`,
    t('Pogledaj usluge', 'Explore services'));
  sec2.onmouseenter = () => { sec2.style.background = 'rgba(255,255,255,.08)'; sec2.style.borderColor = 'rgba(255,255,255,.5)'; };
  sec2.onmouseleave = () => { sec2.style.background = 'transparent'; sec2.style.borderColor = 'rgba(255,255,255,.25)'; };
  sec2.onclick = () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  row.appendChild(cta); row.appendChild(sec2);
  col.appendChild(row);

  const statsData = [
    { target: 6, prefix: '', suffix: '+', label: t('Godina iskustva', 'Years of experience') },
    { target: 50, prefix: '', suffix: '+', label: t('Web projekata', 'Web projects') },
    { target: 99, prefix: '', suffix: '%', label: t('Zadovoljnih klijenata', 'Satisfied clients') },
    { target: 2, prefix: '<', suffix: 's', label: t('Prosječno load time', 'Average load time') },
  ];

  const stats = mkEl('div', `display:flex;gap:40px;margin-top:64px;flex-wrap:wrap;padding-top:40px;border-top:1px solid rgba(255,255,255,.08);`);
  statsData.forEach(itemData => {
    const item = mkEl('div');
    const valEl = mkEl('div', `font-size:2rem;font-weight:800;color:${theme.colors.accentPrimary};`, itemData.prefix + '0' + itemData.suffix);
    item.appendChild(valEl);
    item.appendChild(mkEl('div', `font-size:.78rem;opacity:.45;letter-spacing:1px;text-transform:uppercase;margin-top:4px;`, itemData.label));
    stats.appendChild(item);

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
      animateValue(valEl, 0, itemData.target, 1000, itemData.prefix, itemData.suffix);
    }
  });

  col.appendChild(stats);
  ctr.appendChild(col);
  sec.appendChild(ctr);
  return sec;
}

/* ── SERVICES ────────────────────────────────────────── */
function WebServices() {
  const items = [
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
      title: t('Web Stranice', 'Websites'),
      short: t('Web', 'Web'),
      desc: t('Brze, responzivne i SEO optimizirane web stranice koje konvertiraju posjetitelje u klijente. Dizajn prilagođen vašem brandu, razvoj na modernim tehnologijama, isporuka u roku od 2–4 tjedna.',
        'Fast, responsive, and SEO-optimised websites that convert visitors into clients. Design tailored to your brand, built on modern technologies, delivered in 2–4 weeks.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
      title: t('Landing Pageovi', 'Landing Pages'),
      short: t('Landing', 'Landing'),
      desc: t('Visoko konverzivni landing pageovi za kampanje, proizvode i eventi. Dizajniramo svaki element s ciljem maksimiziranja konverzije — od headlinea do CTA gumba.',
        'High-converting landing pages for campaigns, products, and events. We design every element to maximise conversion — from the headline to the CTA button.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
      title: t('Web Aplikacije', 'Web Applications'),
      short: t('Aplikacije', 'Apps'),
      desc: t('Custom web aplikacije prilagođene vašim poslovnim procesima — dashboardi, interni alati, SaaS platforme, portali za klijente. Gradimo skalabilna rješenja koja rastu s vašim biznisom.',
        'Custom web applications tailored to your business processes — dashboards, internal tools, SaaS platforms, client portals. We build scalable solutions that grow with your business.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,
      title: t('E-commerce', 'E-commerce'),
      short: t('E-commerce', 'E-commerce'),
      desc: t('Online trgovine koje prodaju 24/7. Integriramo payment gatewaye, upravljanje zalihama, automatske emailove i analitiku. Shopify, WooCommerce ili custom rješenje — biramo ono što odgovara vašem modelu.',
        'Online stores that sell 24/7. We integrate payment gateways, inventory management, automated emails, and analytics. Shopify, WooCommerce, or custom — we pick what fits your model.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
      title: t('CMS & Blog', 'CMS & Blog'),
      short: t('CMS', 'CMS'),
      desc: t('Web stranice s upravljanjem sadržajem koje možete sami ažurirati bez ijedne linije koda. WordPress, Sanity, Contentful ili headless CMS — prilagođavamo po vašim potrebama i razini tehničkog znanja.',
        'Content-managed websites you can update yourself without a single line of code. WordPress, Sanity, Contentful, or headless CMS — tailored to your needs and technical level.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
      title: t('Održavanje & SEO', 'Maintenance & SEO'),
      short: t('SEO', 'SEO'),
      desc: t('Kontinuirano održavanje, sigurnosna ažuriranja i tehnička podrška. On-page i tehničko SEO koje vaš web gura prema vrhu Googlea. Pratimo performanse i redovito izvještavamo.',
        'Continuous maintenance, security updates, and technical support. On-page and technical SEO that pushes your site to the top of Google. We track performance and report regularly.')
    },
  ];

  const N = items.length;

  const sec = document.createElement('section');
  sec.id = 'services';
  sec.style.cssText = 'position:relative; height:' + (N * 100) + 'vh; height:' + (N * 100) + 'dvh; width:100%;';

  const headerWrap = document.createElement('div');
  headerWrap.style.cssText = 'max-width:1200px; margin:0 auto; padding:0 20px; width:100%; padding-top:110px; padding-bottom:40px;';
  headerWrap.appendChild(sectionHeader(
    t('Što gradimo', 'What We Build'),
    t('Od jednostavnog weba do kompleksnih aplikacija — svaki projekt tretiramo kao naš vlastiti proizvod.', 'From a simple website to complex applications — we treat every project as our own product.')
  ));
  sec.appendChild(headerWrap);

  const sticky = document.createElement('div');
  sticky.style.cssText = 'position:sticky; top:100px; height:calc(100vh - 100px); height:calc(100dvh - 100px); width:100%; display:flex; flex-direction:column; overflow:hidden; padding-top:20px;';
  sec.appendChild(sticky);

  const navWrap = document.createElement('div');
  navWrap.className = 'services-nav-wrap';
  navWrap.style.cssText = 'max-width:1000px; margin:0 auto; padding:0 20px; width:100%; flex-shrink:0; position:relative; z-index:10; padding-bottom:12px;';

  const nav = document.createElement('div');
  nav.className = 'services-nav';
  nav.style.cssText = 'display:flex; justify-content:center; gap:0; flex-wrap:wrap; width:100%; position:relative;';
  navWrap.appendChild(nav);

  const globalLineWrap = document.createElement('div');
  globalLineWrap.style.cssText = 'position:absolute; bottom:0; left:20px; right:20px; height:3px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;';
  const globalLine = document.createElement('div');
  globalLine.style.cssText = 'position:absolute; top:0; left:0; height:100%; width:0%; background:linear-gradient(90deg,' + theme.colors.accentPrimary + ',' + theme.colors.accentSecondary + '); transition:width 0.1s linear;';
  globalLineWrap.appendChild(globalLine);
  navWrap.appendChild(globalLineWrap);
  sticky.appendChild(navWrap);

  const navItems = [];
  for (let ni = 0; ni < N; ni++) {
    const btn = document.createElement('button');
    btn.style.cssText = 'background:transparent; border:none; color:rgba(255,255,255,0.4); font-size:1.05rem; font-weight:600; cursor:pointer; padding:10px 0; transition:color 0.4s ease; text-transform:uppercase; letter-spacing:1px; flex:1; min-width:90px; text-align:center; font-family:inherit;';
    btn.textContent = items[ni].short;
    btn.setAttribute('data-idx', ni);
    btn.addEventListener('click', function() { scrollToService(parseInt(this.getAttribute('data-idx'))); });
    nav.appendChild(btn);
    navItems.push({ btn });
  }

  const slideWrap = document.createElement('div');
  slideWrap.style.cssText = 'flex:1; position:relative; width:100%;';
  sticky.appendChild(slideWrap);

  const slides = [];
  for (let si = 0; si < N; si++) {
    const slide = document.createElement('div');
    slide.style.cssText = 'position:absolute; inset:0; display:' + (si === 0 ? 'flex' : 'none') + '; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 20px; opacity:' + (si === 0 ? '1' : '0') + '; transition:opacity 0.4s ease; overflow:hidden;';

    const bgWrap = document.createElement('div');
    bgWrap.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); width:40vw; height:40vw; max-width:500px; max-height:500px; z-index:0; pointer-events:none; opacity:0.06; display:flex; align-items:center; justify-content:center;';
    let svgStr = items[si].icon;
    svgStr = svgStr.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
    svgStr = svgStr.replace(/stroke="[^"]+"/, 'stroke="#ffffff"');
    bgWrap.innerHTML = svgStr;
    slide.appendChild(bgWrap);

    const contentWrap = document.createElement('div');
    contentWrap.style.cssText = 'position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; padding:40px;';

    const h3El = document.createElement('h3');
    h3El.style.cssText = 'font-size:4rem; margin-bottom:24px; font-weight:800; background:linear-gradient(90deg,#fff,rgba(255,255,255,0.8)); -webkit-background-clip:text; -webkit-text-fill-color:transparent;';
    h3El.textContent = items[si].title;
    contentWrap.appendChild(h3El);

    const pEl = document.createElement('p');
    pEl.style.cssText = 'font-size:1.3rem; color:rgba(255,255,255,0.7); max-width:700px; line-height:1.75; font-weight:300; margin:0 auto;';
    pEl.textContent = items[si].desc;
    contentWrap.appendChild(pEl);

    const ctaEl = document.createElement('button');
    ctaEl.style.cssText = 'margin-top:44px; background:linear-gradient(135deg,' + theme.colors.accentPrimary + ',' + theme.colors.accentSecondary + '); color:white; padding:16px 42px; border-radius:50px; font-size:1.1rem; font-weight:600; cursor:pointer; border:none; transition:all 0.3s; box-shadow:0 10px 20px -5px rgba(28,117,188,0.4); font-family:inherit;';
    ctaEl.textContent = t('Pokreni projekt', 'Start a project');
    ctaEl.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px)'; this.style.boxShadow = '0 15px 28px -5px rgba(28,117,188,0.5)'; });
    ctaEl.addEventListener('mouseleave', function() { this.style.transform = ''; this.style.boxShadow = '0 10px 20px -5px rgba(28,117,188,0.4)'; });
    ctaEl.addEventListener('click', function() { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); });
    contentWrap.appendChild(ctaEl);

    slide.appendChild(contentWrap);
    slideWrap.appendChild(slide);
    slides.push(slide);
  }

  let currentIdx = 0;
  let isTransitioning = false;

  function updateNav(idx) {
    for (let i = 0; i < navItems.length; i++) {
      navItems[i].btn.style.color = i === idx ? 'white' : i < idx ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)';
    }
  }

  function transitionTo(idx) {
    if (isTransitioning || idx === currentIdx) return;
    isTransitioning = true;
    const outSlide = slides[currentIdx];
    outSlide.style.opacity = '0';
    setTimeout(function() {
      outSlide.style.display = 'none';
      currentIdx = idx;
      updateNav(idx);
      const inSlide = slides[idx];
      inSlide.style.display = 'flex';
      inSlide.style.opacity = '0';
      void inSlide.offsetHeight;
      inSlide.style.opacity = '1';
      setTimeout(function() { isTransitioning = false; }, 50);
    }, 350);
  }

  function scrollToService(idx) {
    const rect = sec.getBoundingClientRect();
    const headerH = headerWrap.offsetHeight || 150;
    const scrollableDistance = rect.height - window.innerHeight - headerH;
    const target = window.scrollY + rect.top + headerH + (idx / N) * scrollableDistance;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  function handleScroll() {
    const secRect = sec.getBoundingClientRect();
    const stickyRect = sticky.getBoundingClientRect();
    const headerH = headerWrap.offsetHeight || 150;
    const currentOffset = (stickyRect.top - secRect.top) - headerH;
    const maxOffset = sec.offsetHeight - headerH - sticky.offsetHeight;
    const scrollProgress = maxOffset > 0 ? (currentOffset / maxOffset) : 0;
    const progress = Math.max(0, Math.min(1, scrollProgress));
    const idx = Math.min(N - 1, Math.floor(progress * N));
    if (idx !== currentIdx) transitionTo(idx);
    globalLine.style.width = (progress * 100) + '%';
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateNav(0);
  return sec;
}

/* ── PROCESS ─────────────────────────────────────────── */
function WebProcess() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'process';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader(
    t('Kako radimo', 'How We Work'),
    t('Jasan, predvidiv proces bez iznenađenja — od prve ideje do launch dana.', 'A clear, predictable process with no surprises — from the first idea to launch day.')
  ));

  const steps = [
    {
      num: '01',
      title: t('Discovery & Brief', 'Discovery & Brief'),
      desc: t('Razumijemo vaš biznis, ciljeve i publiku. Definiramo opseg projekta, tehnologiju i rokove. Dobivate detaljan brief i ponudu.', 'We understand your business, goals, and audience. We define project scope, technology, and timelines. You get a detailed brief and quote.'),
    },
    {
      num: '02',
      title: t('Dizajn & Prototip', 'Design & Prototype'),
      desc: t('Dizajniramo UI/UX u Figmi — desktop i mobilni prikaz. Odobravate svaki ekran prije nego što napišemo ikakav kod.', 'We design the UI/UX in Figma — desktop and mobile views. You approve every screen before we write a single line of code.'),
    },
    {
      num: '03',
      title: t('Razvoj', 'Development'),
      desc: t('Kodiramo u agilnim sprintevima. Redoviti previews na staging okolini — pratite napredak u realnom vremenu i dajete feedback u hodu.', 'We code in agile sprints. Regular previews on a staging environment — you follow progress in real time and give feedback as we go.'),
    },
    {
      num: '04',
      title: t('Testiranje & QA', 'Testing & QA'),
      desc: t('Testiramo na svim uređajima i browserima. Performance audit, SEO check, sigurnosni pregled — isporučujemo tek kada je sve savršeno.', 'We test on all devices and browsers. Performance audit, SEO check, security review — we deliver only when everything is perfect.'),
    },
    {
      num: '05',
      title: t('Launch & Podrška', 'Launch & Support'),
      desc: t('Deploy na vaš hosting ili naš server. Nakon launcha pratimo performanse i dostupni smo za sve izmjene i pitanja.', 'Deploy to your hosting or our server. After launch we monitor performance and are available for all changes and questions.'),
    },
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:24px;`);

  steps.forEach((step, i) => {
    const card = mkEl('div', `padding:32px;border-radius:20px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);position:relative;transition:transform .3s,box-shadow .3s,border-color .3s;box-shadow:0 20px 40px -12px rgba(0,0,0,.6);`);
    card.className = 'animate-on-scroll';
    card.onmouseenter = () => { card.style.transform = 'translateY(-5px)'; card.style.borderColor = 'rgba(28,117,188,.4)'; card.style.boxShadow = '0 30px 50px -10px rgba(0,0,0,.8),0 0 40px 0 rgba(28,117,188,.1)'; };
    card.onmouseleave = () => { card.style.transform = ''; card.style.borderColor = 'rgba(255,255,255,.08)'; card.style.boxShadow = '0 20px 40px -12px rgba(0,0,0,.6)'; };

    card.appendChild(mkEl('div', `font-size:2.8rem;font-weight:900;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:14px;line-height:1;`, step.num));
    card.appendChild(mkEl('h3', `font-size:1.15rem;font-weight:700;margin-bottom:10px;`, step.title));
    card.appendChild(mkEl('p', `font-size:.92rem;color:rgba(255,255,255,.6);line-height:1.7;margin:0;`, step.desc));

    grid.appendChild(card);
  });

  ctr.appendChild(grid);

  // Tech stack marquee
  const techs = [
    'React', 'Next.js', 'Vue', 'Nuxt', 'TypeScript', 'Node.js', 'Python',
    'Tailwind CSS', 'Figma', 'WordPress', 'Sanity', 'Shopify', 'Stripe',
    'PostgreSQL', 'Supabase', 'Firebase', 'Vercel', 'AWS', 'Cloudflare', 'Docker'
  ];

  const subLabel = mkEl('p', `text-align:center;font-size:.78rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.3);margin:60px 0 24px;`, t('Tehnologije koje koristimo', 'Technologies we use'));

  const marqueeWrap = mkEl('div', `width:100%;overflow:hidden;position:relative;`);
  marqueeWrap.style.cssText += `;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);`;

  const track = mkEl('div');
  track.className = 'marquee-track';

  const createTag = (name) => {
    const tag = mkEl('div', `padding:12px 24px;border-radius:50px;background:rgba(28,117,188,.08);border:1px solid rgba(28,117,188,.2);font-size:.88rem;color:rgba(255,255,255,.75);white-space:nowrap;display:inline-block;transition:all .3s;cursor:default;`);
    tag.textContent = name;
    tag.onmouseenter = () => { tag.style.background = 'rgba(28,117,188,.2)'; tag.style.borderColor = theme.colors.accentPrimary; tag.style.transform = 'translateY(-2px)'; };
    tag.onmouseleave = () => { tag.style.background = 'rgba(28,117,188,.08)'; tag.style.borderColor = 'rgba(28,117,188,.2)'; tag.style.transform = ''; };
    return tag;
  };

  [...techs, ...techs].forEach(t => track.appendChild(createTag(t)));
  marqueeWrap.appendChild(track);

  sec.appendChild(ctr);
  sec.appendChild(subLabel);
  sec.appendChild(marqueeWrap);
  return sec;
}

/* ── PRICING CTA ─────────────────────────────────────── */
function WebPricing() {
  const sec = mkEl('section', `padding:100px 0;`);
  const ctr = mkEl('div', theme.styles.container);

  const box = mkEl('div', `
    max-width:760px;margin:0 auto;padding:64px;border-radius:28px;text-align:center;
    background:linear-gradient(135deg,rgba(28,117,188,.15),rgba(43,57,144,.15));
    border:1px solid rgba(28,117,188,.35);
    box-shadow:0 30px 60px -12px rgba(0,0,0,.7),0 0 80px 0 rgba(28,117,188,.08);
  `);
  box.className = 'animate-on-scroll';

  box.appendChild(mkEl('div', `font-size:3.5rem;margin-bottom:16px;`, '💬'));
  box.appendChild(mkEl('h2', `font-size:2.4rem;font-weight:800;margin-bottom:16px;`, t('Cijena? Po dogovoru.', 'Pricing? On request.')));
  box.appendChild(mkEl('p', `font-size:1.1rem;color:rgba(255,255,255,.65);line-height:1.75;max-width:520px;margin:0 auto 40px;`,
    t('Svaki web projekt je jedinstven — ovisi o složenosti dizajna, broju stranica, funkcionalnostima i integracijama. Opišite nam što trebate i dobivate konkretnu ponudu u roku od 24 sata.',
      'Every web project is unique — it depends on design complexity, number of pages, features, and integrations. Describe what you need and get a concrete quote within 24 hours.')
  ));

  const btn = mkEl('button', ``, t('Pokreni projekt →', 'Start a project →'));
  btn.className = 'btn-primary';
  btn.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  box.appendChild(btn);

  ctr.appendChild(box);
  sec.appendChild(ctr);
  return sec;
}

/* ── CONTACT ─────────────────────────────────────────── */
function WebContact() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'contact';
  const ctr = mkEl('div', theme.styles.container);

  const grid = mkEl('div', `display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;`);
  grid.className = 'responsive-grid';

  const info = mkEl('div');
  info.className = 'animate-on-scroll';
  info.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, t('Pokrenimo projekt', 'Let\'s start a project')));
  info.appendChild(Divider('left'));
  info.appendChild(mkEl('p', `font-size:1.05rem;opacity:.7;margin-bottom:36px;line-height:1.75;`,
    t('Ispunite obrazac s kratkim opisom projekta. Javljamo se u roku od 24 sata s pitanjima i okvirnom ponudom.',
      'Fill in the form with a brief project description. We\'ll get back to you within 24 hours with questions and a rough quote.')
  ));

  const details = [
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>`, text: 'kontakt@appercept.net', href: 'mailto:kontakt@appercept.net' },
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`, text: 'Ul. Roberta F. Mihanovića 9, Zagreb', href: 'https://www.google.com/maps/search/?api=1&query=Ul.%20Roberta%20F.%20Mihanovi%C4%87a%209%2C%20Zagreb' },
    { icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.63.24-1.01-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 4.24 3 5.37c0 8.07 6.53 14.6 14.6 14.6 1.13 0 2.07-.65 2.07-1.19v-3.81c0-.55-.45-1-.99-1H20.01z"></path></svg>`, text: '+385 91 9545 128', href: 'tel:+385919545128' }
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

  const inpStyle = `width:100%;padding:14px;background:rgba(30,30,30,0.85);border:1px solid rgba(255,255,255,.1);border-radius:8px;color:white;font-size:.97rem;font-family:${theme.fonts.primary};transition:border-color .3s,background-color .3s;outline:none;`;
  const form = mkEl('form', `padding:36px;border-radius:22px;display:flex;flex-direction:column;gap:16px;`);
  form.className = 'glass-card animate-on-scroll';

  [[t('Ime i prezime', 'Full Name'), 'text'], [t('Email', 'Email'), 'email'], [t('Tvrtka / brand', 'Company / brand'), 'text']].forEach(([ph, type]) => {
    const inp = mkEl('input', inpStyle);
    inp.placeholder = ph; inp.type = type;
    inp.onfocus = () => { inp.style.borderColor = theme.colors.accentPrimary; inp.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
    inp.onblur = () => { inp.style.borderColor = 'rgba(255,255,255,.1)'; inp.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
    form.appendChild(inp);
  });

  const sel = mkEl('select', `width:100%;padding:14px;background:url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat calc(100% - 14px) center, linear-gradient(135deg,#1c75bc,#2b3990);border:none;border-radius:8px;color:white;font-size:.97rem;font-family:${theme.fonts.primary};outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;padding-right:40px;`);

  [
    { value: '', text: t('Što trebate...', 'What do you need...') },
    { value: 'website', text: t('Web stranica', 'Website') },
    { value: 'landing', text: t('Landing page', 'Landing page') },
    { value: 'webapp', text: t('Web aplikacija', 'Web application') },
    { value: 'ecommerce', text: t('E-commerce', 'E-commerce') },
    { value: 'cms', text: t('CMS / Blog', 'CMS / Blog') },
    { value: 'seo', text: t('SEO & Održavanje', 'SEO & Maintenance') },
    { value: 'other', text: t('Ostalo', 'Other') }
  ].forEach(opt => {
    const o = mkEl('option', `background:#1c75bc;color:#fff;padding:10px;`, opt.text);
    o.value = opt.value;
    sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inpStyle);
  ta.placeholder = t('Ukratko opišite projekt — što trebate, rok, posebni zahtjevi...', 'Briefly describe the project — what you need, deadline, special requirements...');
  ta.rows = 4;
  ta.onfocus = () => { ta.style.borderColor = theme.colors.accentPrimary; ta.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
  ta.onblur = () => { ta.style.borderColor = 'rgba(255,255,255,.1)'; ta.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
  form.appendChild(ta);

  const btn = mkEl('button', `width:100%;margin-top:6px;`, t('Pošalji upit →', 'Send inquiry →'));
  btn.className = 'btn-primary';
  btn.type = 'submit';
  form.onsubmit = e => {
    e.preventDefault();
    btn.textContent = t('✓ Primljeno! Javit ćemo se uskoro.', '✓ Received! We\'ll be in touch soon.');
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = t('Pošalji upit →', 'Send inquiry →'); btn.style.background = ''; form.reset(); }, 4000);
  };
  form.appendChild(btn);
  grid.appendChild(form);

  ctr.appendChild(grid);
  sec.appendChild(ctr);
  return sec;
}

/* ── FOOTER ─────────────────────────────────────────── */
function WebFooter() {
  const footer = document.createElement('footer');
  footer.style.cssText = `background:rgba(0,0,0,0.4);border-top:1px solid rgba(255,255,255,0.05);padding:80px 0 40px 0;margin-top:auto;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const grid = document.createElement('div');
  grid.style.cssText = `display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;margin-bottom:60px;align-items:center;`;

  const navCol = document.createElement('div');
  navCol.style.cssText = `display:flex;flex-direction:column;align-items:center;`;
  const navTitle = document.createElement('h4');
  navTitle.textContent = t('Navigacija', 'Navigation');
  navTitle.style.cssText = `color:white;margin-bottom:20px;font-size:1.1rem;`;
  const navUl = document.createElement('ul');
  navUl.style.cssText = `list-style:none;padding:0;text-align:center;`;

  [
    { name: t('O nama', 'About us'), href: '/#about' },
    { name: t('Projekti', 'Projects'), href: '/#products' },
    { name: t('Kontakt', 'Contact'), href: '/#contact' },
    { name: t('Consulting', 'Consulting'), href: '/consulting' },
    { name: t('Marketing & Media', 'Marketing & Media'), href: '/marketing' },
    { name: t('AI Botovi', 'AI Bots'), href: '/ai-bots' },
    { name: t('Web & Aplikacije', 'Web & Apps'), href: '/web' },
  ].forEach(link => {
    const li = document.createElement('li');
    li.style.marginBottom = '10px';
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.name;
    a.style.cssText = `color:rgba(255,255,255,0.6);font-size:0.95rem;text-decoration:none;transition:color 0.3s;`;
    a.onmouseenter = () => a.style.color = 'white';
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,0.6)';
    li.appendChild(a);
    navUl.appendChild(li);
  });
  navCol.appendChild(navTitle);
  navCol.appendChild(navUl);

  const contactsCol = document.createElement('div');
  contactsCol.style.cssText = `display:flex;flex-direction:column;align-items:center;`;
  const contactsTitle = document.createElement('h4');
  contactsTitle.textContent = t('Naš tim', 'Our Team');
  contactsTitle.style.cssText = `color:white;margin-bottom:20px;font-size:1.1rem;`;

  [
    { name: 'Gašpar Bodulica', num: '+385 99 3553 000' },
    { name: 'Karlo Časni', num: '+385 91 9545 128' },
    { name: 'Bruno Vujčec', num: '+385 97 6635 960' }
  ].forEach(c => {
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.textAlign = 'center';
    const nameDiv = document.createElement('div');
    nameDiv.textContent = c.name;
    nameDiv.style.cssText = `color:white;font-weight:500;`;
    const numLink = document.createElement('a');
    numLink.textContent = c.num;
    numLink.href = `tel:${c.num.replace(/\s/g, '')}`;
    numLink.style.cssText = `color:rgba(255,255,255,0.6);font-size:0.9rem;transition:color 0.3s;text-decoration:none;`;
    numLink.onmouseenter = () => numLink.style.color = theme.colors.accentPrimary;
    numLink.onmouseleave = () => numLink.style.color = 'rgba(255,255,255,0.6)';
    div.appendChild(nameDiv);
    div.appendChild(numLink);
    contactsCol.appendChild(div);
  });

  const socialCol = document.createElement('div');
  socialCol.style.cssText = `display:flex;flex-direction:column;align-items:center;`;
  const socialTitle = document.createElement('h4');
  socialTitle.textContent = 'Social';
  socialTitle.style.cssText = `color:white;margin-bottom:20px;font-size:1.1rem;`;
  const socialRow = document.createElement('div');
  socialRow.style.cssText = `display:flex;gap:15px;justify-content:center;`;

  ['LinkedIn', 'Instagram'].forEach(net => {
    const link = document.createElement('a');
    link.href = net === 'LinkedIn' ? 'https://www.linkedin.com/company/appercept-net/?viewAsMember=true' : 'https://www.instagram.com/appercept_net/';
    link.target = '_blank'; link.rel = 'noopener noreferrer'; link.title = net;
    let svgPath = '';
    if (net === 'LinkedIn') svgPath = '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>';
    if (net === 'Instagram') svgPath = '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>';
    link.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>`;
    link.style.cssText = `${theme.styles.glass}display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:white;transition:all 0.3s;background:rgba(255,255,255,0.03);`;
    link.onmouseenter = () => { link.style.background = `linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary})`; link.style.transform = 'translateY(-3px)'; link.style.borderColor = 'transparent'; };
    link.onmouseleave = () => { link.style.background = 'rgba(255,255,255,0.03)'; link.style.transform = ''; link.style.borderColor = 'rgba(255,255,255,0.08)'; };
    socialRow.appendChild(link);
  });

  socialCol.appendChild(socialTitle);
  socialCol.appendChild(socialRow);

  grid.appendChild(navCol);
  grid.appendChild(contactsCol);
  grid.appendChild(socialCol);

  const copy = document.createElement('div');
  copy.style.cssText = `border-top:1px solid rgba(255,255,255,0.1);padding-top:20px;text-align:center;color:rgba(255,255,255,0.4);font-size:0.85rem;`;
  copy.innerHTML = t(`&copy; ${new Date().getFullYear()} Appercept. Sva prava pridržana.`, `&copy; ${new Date().getFullYear()} Appercept. All rights reserved.`);

  container.appendChild(grid);
  container.appendChild(copy);
  footer.appendChild(container);
  return footer;
}

/* ── ASSEMBLE ─────────────────────────────────────────── */
export function WebPage() {
  const wrap = document.createElement('div');
  wrap.appendChild(WebHeader());
  wrap.appendChild(WebHero());
  wrap.appendChild(WebServices());
  wrap.appendChild(WebProcess());
  wrap.appendChild(WebPricing());
  wrap.appendChild(WebContact());
  wrap.appendChild(WebFooter());
  return wrap;
}
