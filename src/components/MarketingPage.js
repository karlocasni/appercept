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
function MarketingHeader() {
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
  const subLabel = mkEl('span', `font-size:0.65rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding-left:0;margin-top:2px;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`);
  subLabel.textContent = t('Marketing & Media', 'Marketing & Media');
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

  [[t('Usluge', 'Services'), 'services'], [t('Radovi', 'Work'), 'work'], [t('Paketi', 'Packages'), 'pricing'], [t('Kontakt', 'Contact'), 'contact']].forEach(([name, id]) => {
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
  const back = mkEl('a', `font-size:.9rem;font-weight:600;opacity:1;transition:all .3s;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`, t('← Natrag', '← Back'));
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
function MarketingHero() {
  const sec = mkEl('section', `min-height:90vh;display:flex;align-items:center;padding:140px 0 100px;position:relative;`);
  sec.className = 'consulting-hero';
  const ctr = mkEl('div', theme.styles.container);
  const col = mkEl('div', `max-width:860px;`);
  col.className = 'fade-in-up';

  const h1 = mkEl('h1', `font-size:4.2rem;line-height:1.1;font-weight:900;margin-bottom:22px;margin-top:80px;`);
  h1.innerHTML = t(
    `Sadržaj koji <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">ostavlja trag</span>`,
    `Content that <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">leaves a mark</span>`
  );
  col.appendChild(h1);
  col.appendChild(mkEl('p', `font-size:1.35rem;color:rgba(255,255,255,.7);margin-bottom:40px;max-width:620px;line-height:1.65;font-weight:300;`,
    t('Snimamo, montiramo i plasiramo vaš brand. Od podcast produkcije i event coveragea do kompletne strategije digitalnog i analognog marketinga.',
      'We film, edit, and market your brand. From podcast production and event coverage to complete digital and analog marketing strategy.')
  ));

  const row = mkEl('div', `display:flex;gap:14px;flex-wrap:wrap;`);
  const cta = mkEl('button', '', t('Zatraži ponudu', 'Request a quote'));
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
    { target: 85, prefix: '', suffix: '+', label: t('Projekata isporučeno', 'Projects delivered') },
    { target: 2, prefix: '', suffix: '', label: t('Podcast klijenta', 'Podcast clients') },
    { target: 100, prefix: '', suffix: '%', label: t('Klijenti preporučuju', 'Clients recommend us') },
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
function MarketingServices() {
  const items = [
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
      title: t('Video Produkcija', 'Video Production'),
      short: t('Video', 'Video'),
      desc: t('Profesionalno snimanje podcasta, YouTube videa, eventova i promotivnih filmova. Koristimo suvremenu opremu za kinematografski rezultat koji se ističe na svakoj platformi.',
        'Professional filming of podcasts, YouTube videos, events, and promotional films. We use modern equipment for a cinematic result that stands out on every platform.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,
      title: t('Montaža & Post-produkcija', 'Editing & Post-production'),
      short: t('Montaža', 'Editing'),
      desc: t('Profesionalna montaža s color gradingom, sound designom i motion graphicsom. Svaki video isporučujemo optimiziran za YouTube, Instagram Reels, TikTok i sve ostale platforme.',
        'Professional editing with color grading, sound design, and motion graphics. Every video is delivered optimized for YouTube, Instagram Reels, TikTok, and all other platforms.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`,
      title: t('Fotografija', 'Photography'),
      short: t('Foto', 'Photo'),
      desc: t('Event fotografija, portretna i brand fotografija za web i print. Svaki projekt isporučujemo s profesionalnom obradom i retušom — spreman za objavu odmah.',
        'Event photography, portrait, and brand photography for web and print. Every project is delivered with professional processing and retouching — ready to publish immediately.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.4 4.4 3.9 6.8 4.3.9-5 5.8-8.3 10.8-4.3 1.1.7 2.5 2.8 4.4-1z"></svg>`,
      title: t('Social Media Marketing', 'Social Media Marketing'),
      short: t('Social', 'Social'),
      desc: t('Kreiramo i objavljujemo sadržaj na Instagramu, LinkedInu, TikToku i YouTubeu. Od strategije i kalendara objava do copywritinga, grafika i analize rezultata — sve na jednom mjestu.',
        'We create and publish content on Instagram, LinkedIn, TikTok, and YouTube. From strategy and posting calendar to copywriting, graphics, and results analysis — all in one place.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
      title: t('Podcast Produkcija', 'Podcast Production'),
      short: t('Podcast', 'Podcast'),
      desc: t('Kompletna produkcija podcasta — od postavljanja studija, snimanja i zvučne obrade do distribucije na Spotify, Apple Podcasts i YouTube. Radili smo s Backstage Beauty i Financijskim klubom.',
        'Complete podcast production — from studio setup, recording, and audio processing to distribution on Spotify, Apple Podcasts, and YouTube. We worked with Backstage Beauty and Financijski Klub.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
      title: t('Event Coverage', 'Event Coverage'),
      short: t('Eventi', 'Events'),
      desc: t('Potpuni video i foto coverage vaših evenata — konferencije, lansiranja, gala večeri i promotivne akcije. Isporučujemo highlight video, full footage i foto galeriju u dogovorenom roku.',
        'Complete video and photo coverage of your events — conferences, launches, gala dinners, and promotional activations. We deliver a highlight video, full footage, and photo gallery within the agreed timeline.')
    }
  ];

  const N = items.length;

  const sec = document.createElement('section');
  sec.id = 'services';
  sec.style.cssText = 'position:relative; height:' + (N * 100) + 'vh; height:' + (N * 100) + 'dvh; width:100%;';

  const headerWrap = document.createElement('div');
  headerWrap.style.cssText = 'max-width:1200px; margin:0 auto; padding:0 20px; width:100%; padding-top:110px; padding-bottom:40px;';
  headerWrap.appendChild(sectionHeader(
    t('Što radimo', 'What We Do'),
    t('Od prvog kadra do viralne objave — pokrivamo svaki korak vaše medijske prisutnosti.', 'From the first frame to the viral post — we cover every step of your media presence.')
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
    btn.style.cssText = 'background:transparent; border:none; color:rgba(255,255,255,0.4); font-size:1.05rem; font-weight:600; cursor:pointer; padding:10px 0; transition:color 0.4s ease; text-transform:uppercase; letter-spacing:1px; flex:1; min-width:100px; text-align:center; font-family:inherit;';
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
    bgWrap.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:40vw; height:40vw; max-width:500px; max-height:500px; z-index:0; display:flex; justify-content:center; align-items:center; pointer-events:none; opacity:0.06;';
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
    ctaEl.textContent = t('Zatraži ponudu', 'Request a quote');
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

/* ── CLIENTS / WORK ─────────────────────────────────── */
function MarketingWork() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'work';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader(
    t('S kime smo radili', 'Who We\'ve Worked With'),
    t('Ponosni smo na dugoročne suradnje s brendovima koji vjeruju u kvalitetan sadržaj.', 'We are proud of long-term partnerships with brands that believe in quality content.')
  ));

  const clients = [
    {
      name: 'Backstage Beauty',
      type: t('Podcast produkcija', 'Podcast Production'),
      desc: t('Kompletna video i audio produkcija beauty & lifestyle podcasta. Snimanje, montaža, distribucija i social media sadržaj.', 'Complete video and audio production for a beauty & lifestyle podcast. Recording, editing, distribution, and social media content.'),
      tags: [t('Podcast', 'Podcast'), t('Video', 'Video'), t('Social Media', 'Social Media')],
      logo: null,
      logoSrc: '/Logo.jpeg',
      yt: 'https://www.youtube.com/@Backstage_Beauty',
      ig: 'https://www.instagram.com/backstagebeauty.podcast/',
    },
    {
      name: 'Financijski Klub',
      type: t('Podcast produkcija', 'Podcast Production'),
      desc: t('Snimamo podcast o financijama i investicijama. Video produkcija, montaža i distribucija na svim platformama.', 'We film a podcast about finance and investments. Video production, editing, and distribution across all platforms.'),
      tags: [t('Podcast', 'Podcast'), t('Finance', 'Finance'), t('YouTube', 'YouTube')],
      logo: null,
      logoSrc: '/financijskiklub_logo.png',
      yt: 'https://www.youtube.com/@FinanceHrvatska',
      ig: 'https://www.instagram.com/financijski_klub/',
    }
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:28px;margin-bottom:80px;`);

  clients.forEach(c => {
    const card = mkEl('div', `padding:40px;border-radius:22px;position:relative;transition:transform .3s,box-shadow .3s,border-color .3s;display:flex;flex-direction:column;gap:16px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);box-shadow:0 25px 50px -12px rgba(0,0,0,.7);`);
    card.className = 'animate-on-scroll';

    card.onmouseenter = () => { card.style.transform = 'translateY(-5px)'; card.style.boxShadow = '0 35px 60px -10px rgba(0,0,0,.8),0 0 60px 0 rgba(28,117,188,.15)'; };
    card.onmouseleave = () => { card.style.transform = ''; card.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,.7)'; };

    const top = mkEl('div', `display:flex;align-items:center;gap:16px;`);
    const logoEl = c.logoSrc
      ? (() => {
          const img = mkEl('img', `width:64px;height:64px;object-fit:contain;border-radius:12px;display:block;`);
          img.src = c.logoSrc;
          img.alt = c.name;
          img.onerror = () => { img.style.display = 'none'; };
          return img;
        })()
      : mkEl('div', `font-size:2.8rem;`, c.logo);
    top.appendChild(logoEl);
    const info = mkEl('div');
    info.appendChild(mkEl('h3', `font-size:1.5rem;font-weight:700;margin:0 0 4px;`, c.name));
    info.appendChild(mkEl('span', `font-size:.82rem;color:${theme.colors.accentPrimary};font-weight:600;letter-spacing:.5px;text-transform:uppercase;`, c.type));
    top.appendChild(info);
    card.appendChild(top);

    card.appendChild(mkEl('p', `font-size:.97rem;color:rgba(255,255,255,.68);line-height:1.7;margin:0;`, c.desc));

    const tagsRow = mkEl('div', `display:flex;gap:8px;flex-wrap:wrap;`);
    c.tags.forEach(tag => {
      tagsRow.appendChild(mkEl('span', `padding:6px 14px;border-radius:50px;background:rgba(28,117,188,.15);border:1px solid rgba(28,117,188,.3);font-size:.78rem;color:rgba(255,255,255,.85);`, tag));
    });
    card.appendChild(tagsRow);

    const btnRow = mkEl('div', `display:flex;gap:10px;flex-wrap:wrap;margin-top:8px;`);
    if (c.yt) {
      const ytBtn = mkEl('a', `display:inline-flex;align-items:center;gap:10px;padding:11px 22px;border-radius:50px;background:rgba(255,0,0,0.12);border:1px solid rgba(255,0,0,0.3);color:white;font-size:.88rem;font-weight:600;text-decoration:none;transition:all .3s;width:fit-content;`,
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="#ff4444"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/></svg>YouTube`);
      ytBtn.href = c.yt; ytBtn.target = '_blank'; ytBtn.rel = 'noopener noreferrer';
      ytBtn.onmouseenter = () => { ytBtn.style.background = 'rgba(255,0,0,0.25)'; ytBtn.style.borderColor = '#ff4444'; ytBtn.style.transform = 'translateY(-2px)'; };
      ytBtn.onmouseleave = () => { ytBtn.style.background = 'rgba(255,0,0,0.12)'; ytBtn.style.borderColor = 'rgba(255,0,0,0.3)'; ytBtn.style.transform = ''; };
      btnRow.appendChild(ytBtn);
    }
    if (c.ig) {
      const igBtn = mkEl('a', `display:inline-flex;align-items:center;gap:10px;padding:11px 22px;border-radius:50px;background:rgba(193,53,132,0.12);border:1px solid rgba(193,53,132,0.3);color:white;font-size:.88rem;font-weight:600;text-decoration:none;transition:all .3s;width:fit-content;`,
        `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e1306c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>Instagram`);
      igBtn.href = c.ig; igBtn.target = '_blank'; igBtn.rel = 'noopener noreferrer';
      igBtn.onmouseenter = () => { igBtn.style.background = 'rgba(193,53,132,0.25)'; igBtn.style.borderColor = '#e1306c'; igBtn.style.transform = 'translateY(-2px)'; };
      igBtn.onmouseleave = () => { igBtn.style.background = 'rgba(193,53,132,0.12)'; igBtn.style.borderColor = 'rgba(193,53,132,0.3)'; igBtn.style.transform = ''; };
      btnRow.appendChild(igBtn);
    }
    card.appendChild(btnRow);

    grid.appendChild(card);
  });

  ctr.appendChild(grid);
  sec.appendChild(ctr);

  // Marquee — full viewport width, outside the container
  const platforms = [
    'YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'Spotify', 'Apple Podcasts',
    t('Podcast snimanje', 'Podcast Recording'), t('Event coverage', 'Event Coverage'),
    t('Color Grading', 'Color Grading'), t('Sound Design', 'Sound Design'),
    t('Motion Graphics', 'Motion Graphics'), t('Brand Fotografija', 'Brand Photography'),
    'Reels', 'Shorts', t('Live Streaming', 'Live Streaming'), t('Intervjui', 'Interviews')
  ];

  const marqueeWrap = mkEl('div', `width:100%;overflow:hidden;padding:28px 0;position:relative;`);
  // Fade masks on both edges
  marqueeWrap.style.cssText += `;-webkit-mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);mask-image:linear-gradient(to right,transparent 0%,black 8%,black 92%,transparent 100%);`;

  const track = mkEl('div');
  track.className = 'marquee-track';

  const createTag = (name) => {
    const tag = mkEl('div', `padding:14px 28px;border-radius:50px;background:rgba(28,117,188,.12);border:1px solid rgba(28,117,188,.25);font-size:.95rem;color:rgba(255,255,255,.9);transition:all .3s;cursor:default;white-space:nowrap;display:inline-block;`);
    tag.textContent = name;
    tag.onmouseenter = () => { tag.style.background = 'rgba(28,117,188,.25)'; tag.style.borderColor = theme.colors.accentPrimary; tag.style.transform = 'translateY(-2px)'; };
    tag.onmouseleave = () => { tag.style.background = 'rgba(28,117,188,.12)'; tag.style.borderColor = 'rgba(28,117,188,.25)'; tag.style.transform = ''; };
    return tag;
  };

  [...platforms, ...platforms].forEach(p => track.appendChild(createTag(p)));
  marqueeWrap.appendChild(track);
  sec.appendChild(marqueeWrap);
  return sec;
}

/* ── PRICING ─────────────────────────────────────────── */
function MarketingPricing() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'pricing';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader(
    t('Paketi i cijene', 'Plans & Pricing'),
    t('Fleksibilni modeli suradnje — od jednokratnog projekta do dugoročnog medijskog partnerstva.', 'Flexible collaboration models — from a one-off project to a long-term media partnership.')
  ));

  const plans = [
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
      name: t('Po projektu', 'Per Project'),
      price: t('Po dogovoru', 'On request'),
      unit: t('/projekt', '/project'),
      badge: '',
      highlight: false,
      desc: t('Za jednokratne potrebe — event, reklamni video, foto shoot ili podcast epizoda.', 'For one-off needs — event, promo video, photo shoot, or a podcast episode.'),
      features: [
        t('Snimanje eventa ili podcasta', 'Event or podcast filming'),
        t('Profesionalna foto sesija', 'Professional photo session'),
        t('Montaža i isporuka u roku', 'Editing and delivery on time'),
        t('Optimizacija za željenu platformu', 'Optimization for desired platform'),
        t('Neograničene revizije (u dogovorenom opsegu)', 'Unlimited revisions (within agreed scope)'),
      ]
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.4 4.4 3.9 6.8 4.3.9-5 5.8-8.3 10.8-4.3 1.1.7 2.5 2.8 4.4-1z"></svg>`,
      name: t('Content Starter', 'Content Starter'),
      price: '€499',
      unit: t('/mjesec', '/month'),
      badge: '',
      highlight: false,
      desc: t('Idealno za brendove koji tek počinju graditi prisutnost na društvenim mrežama.', 'Ideal for brands just starting to build their social media presence.'),
      features: [
        t('8 objava/mj. (Instagram + LinkedIn)', '8 posts/mo. (Instagram + LinkedIn)'),
        t('Copywriting i hashtag strategija', 'Copywriting and hashtag strategy'),
        t('4 kratka Reels/Short videa', '4 short Reels/Short videos'),
        t('Grafički dizajn za objave', 'Graphic design for posts'),
        t('Mjesečni performance report', 'Monthly performance report'),
      ]
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      name: t('Content Growth', 'Content Growth'),
      price: '€999',
      unit: t('/mjesec', '/month'),
      badge: t('NAJPOPULARNIJE', 'MOST POPULAR'),
      highlight: true,
      desc: t('Za brandove koji žele ozbiljan rast — više sadržaja, više platformi, više rezultata.', 'For brands that want serious growth — more content, more platforms, more results.'),
      features: [
        t('16 objava/mj. (Instagram, LinkedIn, TikTok)', '16 posts/mo. (Instagram, LinkedIn, TikTok)'),
        t('2 dulja YouTube/podcast videa', '2 longer YouTube/podcast videos'),
        t('8 Reels/Shorts optimiziranih za rast', '8 Reels/Shorts optimized for growth'),
        t('Paid ads upravljanje (do €500 ad spend)', 'Paid ads management (up to €500 ad spend)'),
        t('Tjedni check-in i strategija', 'Weekly check-in and strategy'),
        t('Dvomjesečni video shoot (po dogovoru)', 'Bi-monthly video shoot (as agreed)'),
      ]
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      name: t('Full Partner', 'Full Partner'),
      price: '€2.499+',
      unit: t('/mjesec', '/month'),
      badge: '',
      highlight: false,
      desc: t('Kompletno medijsko partnerstvo — prepustite nam sve od produkcije do marketinga.', 'Complete media partnership — hand over everything from production to marketing.'),
      features: [
        t('Neograničen broj objava i platformi', 'Unlimited posts and platforms'),
        t('Podcast produkcija (snimanje + distribucija)', 'Podcast production (recording + distribution)'),
        t('Tjedni video shoot i event coverage', 'Weekly video shoot and event coverage'),
        t('Kompletna paid ads strategija', 'Complete paid ads strategy'),
        t('Branding i vizualni identitet', 'Branding and visual identity'),
        t('Dedicirani account manager', 'Dedicated account manager'),
        t('Prioritetna dostupnost i SLA', 'Priority availability and SLA'),
      ]
    }
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;align-items:start;`);

  plans.forEach(p => {
    const card = mkEl('div', `padding:36px;border-radius:22px;position:relative;display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s,border-color .3s;
      box-shadow:0 25px 50px -12px rgba(0,0,0,.7),0 0 50px 0 rgba(28,117,188,.05);
      ${p.highlight
        ? `background:linear-gradient(135deg,rgba(28,117,188,.22),rgba(43,57,144,.22));border:1px solid rgba(28,117,188,.5);`
        : `background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);`}`);
    card.className = 'animate-on-scroll';

    card.onmouseenter = () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 35px 60px -10px rgba(0,0,0,.8),0 0 60px 0 rgba(28,117,188,.15)';
      card.style.borderColor = p.highlight ? theme.colors.accentPrimary : 'rgba(255,255,255,.2)';
    };
    card.onmouseleave = () => {
      card.style.transform = '';
      card.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,.7),0 0 50px 0 rgba(28,117,188,.05)';
      card.style.borderColor = p.highlight ? 'rgba(28,117,188,.5)' : 'rgba(255,255,255,.08)';
    };

    if (p.badge) {
      card.appendChild(mkEl('div', `position:absolute;top:-13px;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;padding:5px 18px;border-radius:50px;font-size:.75rem;font-weight:700;white-space:nowrap;`, p.badge));
    }

    card.appendChild(mkEl('div', `margin-bottom:12px;display:flex;align-items:center;height:36px;`, p.icon));
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
      ${p.highlight
        ? `background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;border:none;`
        : `background:transparent;color:white;border:1px solid rgba(255,255,255,.22);`}`,
      t('Zatraži ponudu', 'Request a quote'));
    btn.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.filter = 'brightness(1.1)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; btn.style.filter = ''; };
    card.appendChild(btn);
    grid.appendChild(card);
  });

  ctr.appendChild(grid);
  ctr.appendChild(mkEl('p', `text-align:center;color:rgba(255,255,255,.35);font-size:.82rem;margin-top:32px;`,
    t('Cijene su okvirne. Svaki paket prilagođavamo vašim potrebama i obujmu projekta. Kontaktirajte nas za personalnu ponudu.',
      'Prices are indicative. Every plan is tailored to your needs and project scope. Contact us for a personalized proposal.')
  ));
  sec.appendChild(ctr);
  return sec;
}

/* ── CONTACT ─────────────────────────────────────────── */
function MarketingContact() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'contact';
  const ctr = mkEl('div', theme.styles.container);

  const grid = mkEl('div', `display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;`);
  grid.className = 'responsive-grid';

  const info = mkEl('div');
  info.className = 'animate-on-scroll';
  info.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, t('Razgovarajmo', 'Let\'s Talk')));
  info.appendChild(Divider('left'));
  info.appendChild(mkEl('p', `font-size:1.05rem;opacity:.7;margin-bottom:36px;line-height:1.75;`,
    t('Ispunite obrazac i javit ćemo se unutar 24 sata. Počnemo s kratkim pozivom kako bismo razumjeli vaše ciljeve.',
      'Fill out the form and we\'ll get back to you within 24 hours. We start with a short call to understand your goals.')
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
    { value: '', text: t('Što vas zanima...', 'What are you interested in...') },
    { value: 'video', text: t('Video produkcija', 'Video production') },
    { value: 'podcast', text: t('Podcast produkcija', 'Podcast production') },
    { value: 'photo', text: t('Fotografija', 'Photography') },
    { value: 'social', text: t('Social media marketing', 'Social media marketing') },
    { value: 'event', text: t('Event coverage', 'Event coverage') },
    { value: 'package', text: t('Mjesečni paket', 'Monthly package') },
    { value: 'other', text: t('Ostalo', 'Other') }
  ].forEach(opt => {
    const o = mkEl('option', `background:#1c75bc;color:#fff;padding:10px;`, opt.text);
    o.value = opt.value;
    sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inpStyle);
  ta.placeholder = t('Opišite projekt, platforme koje koristite i što biste htjeli postići...', 'Describe your project, platforms you use, and what you want to achieve...');
  ta.rows = 4;
  ta.onfocus = () => { ta.style.borderColor = theme.colors.accentPrimary; ta.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
  ta.onblur = () => { ta.style.borderColor = 'rgba(255,255,255,.1)'; ta.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
  form.appendChild(ta);

  const btn = mkEl('button', `width:100%;margin-top:6px;`, t('Pošalji upit →', 'Send Inquiry →'));
  btn.className = 'btn-primary';
  btn.type = 'submit';
  form.onsubmit = e => {
    e.preventDefault();
    btn.textContent = t('✓ Primljeno! Javit ćemo se uskoro.', '✓ Received! We\'ll be in touch soon.');
    btn.style.background = '#22c55e';
    setTimeout(() => { btn.textContent = t('Pošalji upit →', 'Send Inquiry →'); btn.style.background = ''; form.reset(); }, 4000);
  };
  form.appendChild(btn);
  grid.appendChild(form);

  ctr.appendChild(grid);
  sec.appendChild(ctr);
  return sec;
}

/* ── FOOTER ─────────────────────────────────────────── */
function MarketingFooter() {
  const footer = document.createElement('footer');
  footer.style.cssText = `background:rgba(0,0,0,0.4);border-top:1px solid rgba(255,255,255,0.05);padding:80px 0 40px 0;margin-top:auto;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const grid = document.createElement('div');
  grid.style.cssText = `display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:40px;margin-bottom:60px;align-items:center;justify-content:center;`;

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
    { name: t('Marketing & Media', 'Marketing & Media'), href: '/marketing' }
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
    link.style.cssText = `${theme.styles.glass}display:flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:white;transition:all 0.3s ease;background:rgba(255,255,255,0.03);`;
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
export function MarketingPage() {
  const wrap = document.createElement('div');
  wrap.appendChild(MarketingHeader());
  wrap.appendChild(MarketingHero());
  wrap.appendChild(MarketingServices());
  wrap.appendChild(MarketingWork());
  wrap.appendChild(MarketingPricing());
  wrap.appendChild(MarketingContact());
  wrap.appendChild(MarketingFooter());
  return wrap;
}
