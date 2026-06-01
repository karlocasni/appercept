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
  const header = mkEl('header', `position:fixed;top:0;left:0;right:0;z-index:1000;width:100%;padding:18px 0;background:rgba(17,17,17,1);border-bottom:1px solid transparent;transition:background .4s,backdrop-filter .4s,-webkit-backdrop-filter .4s,border-color .4s;`);
  window.addEventListener('scroll', () => {
    const s = window.scrollY > 40;
    header.style.background = s ? 'rgba(17,17,17,0.60)' : 'rgba(17,17,17,1)';
    header.style.backdropFilter = s ? 'blur(12px)' : 'none';
    header.style.webkitBackdropFilter = s ? 'blur(12px)' : 'none';
    header.style.borderBottom = s ? `1px solid ${theme.colors.glassBorder}` : '1px solid transparent';
  }, { passive: true });

  const ctr = mkEl('div', `${theme.styles.container}display:flex;justify-content:space-between;align-items:center;`);

  // Logo wrapper (column flex so sub-label sits below)
  const logoWrap = mkEl('a', `display:flex;flex-direction:column;align-items:flex-start;text-decoration:none;`);
  logoWrap.href = '/';
  const logoInner = mkEl('div', `display:block;height:50px;overflow:hidden;`);
  const img = mkEl('img', `height:110px;width:auto;display:block;margin-top:-28px;`);
  img.src = '/logo_wide.png'; img.alt = 'Appercept';
  logoInner.appendChild(img);
  const consultingLabel = mkEl('span', `font-size:0.65rem;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding-left:0;margin-top:2px;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`);
  consultingLabel.className = 'consulting-logo-label';
  consultingLabel.textContent = 'Consulting';
  logoWrap.appendChild(logoInner);
  logoWrap.appendChild(consultingLabel);
  const logo = logoWrap;

  // Hamburger Button
  const hamburger = document.createElement('button');
  hamburger.className = 'hamburger-btn';
  hamburger.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  `;
  hamburger.style.cssText = `background:transparent;border:none;cursor:pointer;display:none;z-index:1001;`;

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:998;
    display:none;opacity:0;transition:opacity 0.3s;backdrop-filter:blur(4px);
  `;
  document.body.appendChild(backdrop);

  // Nav
  const nav = mkEl('nav', `display:flex;gap:24px;align-items:center;`);
  nav.className = 'header-nav';

  // Toggle logic
  const toggleMenu = (forceClose = false) => {
    const isOpening = !nav.classList.contains('open') && !forceClose;
    if (isOpening) {
      nav.classList.add('open');
      document.body.style.overflow = 'hidden';
      backdrop.style.display = 'block';
      setTimeout(() => backdrop.style.opacity = '1', 10);
      hamburger.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>`;
    } else {
      nav.classList.remove('open');
      document.body.style.overflow = '';
      backdrop.style.opacity = '0';
      setTimeout(() => backdrop.style.display = 'none', 300);
      hamburger.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>`;
    }
  };

  hamburger.onclick = () => toggleMenu();
  backdrop.onclick = () => toggleMenu(true);

  // Nav ul
  const ul = document.createElement('ul');
  ul.style.cssText = `list-style:none;padding:0;display:flex;gap:30px;`;

  // Section scroll links
  [[t('Usluge', 'Services'), 'services'], [t('Pricing', 'Pricing'), 'pricing'], [t('Kontakt', 'Contact'), 'contact']].forEach(([name, id]) => {
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

  // Back link — styled like the Consulting gradient link on the main page
  const backLi = document.createElement('li');
  const back = mkEl('a', `font-size:.9rem;font-weight:600;opacity:1;transition:all .3s;background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});-webkit-background-clip:text;-webkit-text-fill-color:transparent;`, t('← Natrag', '← Back'));
  back.href = '/';
  backLi.appendChild(back);
  ul.appendChild(backLi);

  // Language button — inside ul so it slides in with the mobile menu
  const langLi = document.createElement('li');
  langLi.style.cssText = `display:flex;align-items:center;justify-content:center;`;
  const langBtn = document.createElement('button');
  langBtn.textContent = getLanguage() === 'hr' ? 'EN' : 'HR';
  langBtn.style.cssText = `
    background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.18);
    color:white;padding:6px 14px;border-radius:6px;font-size:0.8rem;font-weight:700;
    cursor:pointer;transition:all 0.3s;align-self:center;font-family:inherit;letter-spacing:0.5px;
  `;
  langBtn.onmouseenter = () => { langBtn.style.background = 'rgba(255,255,255,0.15)'; langBtn.style.borderColor = theme.colors.accentPrimary; };
  langBtn.onmouseleave = () => { langBtn.style.background = 'rgba(255,255,255,0.06)'; langBtn.style.borderColor = 'rgba(255,255,255,0.18)'; };
  langBtn.onclick = () => toggleLanguage();
  langLi.appendChild(langBtn);
  ul.appendChild(langLi);

  nav.appendChild(ul);

  ctr.appendChild(logo);
  ctr.appendChild(hamburger);
  ctr.appendChild(nav);
  header.appendChild(ctr);
  return header;
}

/* ── HERO ────────────────────────────────────────────── */
function ConsultingHero() {
  const sec = mkEl('section', `min-height:90vh;display:flex;align-items:center;padding:140px 0 100px;position:relative;`);
  sec.className = 'consulting-hero';
  const ctr = mkEl('div', theme.styles.container);
  const col = mkEl('div', `max-width:820px;`);
  col.className = 'fade-in-up';

  const h1 = mkEl('h1', `font-size:4.2rem;line-height:1.1;font-weight:900;margin-bottom:22px;margin-top:80px;`);
  h1.innerHTML = t(`AI koji radi <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">za vaše poslovanje</span>`, `AI that works <span style="background:linear-gradient(90deg,${theme.colors.accentPrimary},#00d2ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">for your business</span>`);
  col.appendChild(h1);
  col.appendChild(mkEl('p', `font-size:1.35rem;color:rgba(255,255,255,.7);margin-bottom:40px;max-width:600px;line-height:1.65;font-weight:300;`, t('Voice botovi, chat botovi i automatizacija poslovnih procesa. Implementiramo AI alate koji štede sate rada dnevno i povećavaju prihod.', 'Voice bots, chatbots, and business process automation. We implement AI tools that save hours of work daily and increase revenue.')));

  const row = mkEl('div', `display:flex;gap:14px;flex-wrap:wrap;`);
  const cta = mkEl('button', '', t('Dogovorite konzultaciju', 'Book a consultation'));
  cta.className = 'btn-primary';
  cta.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  const sec2 = mkEl('button', `background:transparent;border:1px solid rgba(255,255,255,.25);color:white;padding:0 28px;height:50px;border-radius:50px;font-size:.95rem;font-weight:500;cursor:pointer;transition:all .3s;`, t('Pogledaj usluge', 'Explore services'));
  sec2.onmouseenter = () => { sec2.style.background = 'rgba(255,255,255,.08)'; sec2.style.borderColor = 'rgba(255,255,255,.5)'; };
  sec2.onmouseleave = () => { sec2.style.background = 'transparent'; sec2.style.borderColor = 'rgba(255,255,255,.25)'; };
  sec2.onclick = () => document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
  row.appendChild(cta); row.appendChild(sec2);
  col.appendChild(row);

  // Market stats from PDF
  const statsData = [
    { target: 11, prefix: '$', suffix: 'B', label: t('AI consulting tržište 2025', 'AI Consulting Market 2025') },
    { target: 91, prefix: '$', suffix: 'B', label: t('Projekcija do 2035', 'Projection by 2035') },
    { target: 26, prefix: '', suffix: '%', label: t('Godišnji CAGR rast', 'Annual CAGR Growth') },
    { target: 88, prefix: '', suffix: '%', label: t('Tvrtki koristi AI', 'Companies Using AI') }
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

/* ── SERVICES (Egzosfera-style) ────────────────────────── */
function ConsultingServices() {
  const items = [
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
      title: t('Voice Botovi', 'Voice Bots'),
      short: t('Voice Bot', 'Voice Bot'),
      desc: t('Glasovni AI asistenti koji primaju pozive, odgovaraju na upite i zakažu termine — bez čekanja i bez potrebe za živim operaterom.', 'Voice AI assistants that handle calls, answer queries, and schedule appointments — with no waiting times and no live operator needed.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`,
      title: t('Chat Botovi', 'Chat Bots'),
      short: t('Chat Bot', 'Chat Bot'),
      desc: t('Pametan chatbot za vašu web stranicu ili WhatsApp koji kvalificira leadove, odgovara na FAQ i pretvara posjetitelje u klijente.', 'Smart chatbot for your website or WhatsApp that qualifies leads, answers FAQs, and converts visitors into clients.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
      title: t('Automatizacija procesa', 'Process Automation'),
      short: t('Automatizacija', 'Automation'),
      desc: t('Eliminiramo ručni rad: automatski emailovi, generiranje dokumenata, CRM unosi, izvještaji — sve radi samo.', 'Eliminating manual work: automated emails, document generation, CRM data entry, reports — all running on autopilot.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`,
      title: t('AI Integracije', 'AI Integrations'),
      short: t('Integracije', 'Integrations'),
      desc: t('Spajamo OpenAI, Anthropic, n8n i Make s vašim sustavima. Workflow automatizacija prilagođena vašem poslovnom modelu.', 'Connecting OpenAI, Anthropic, n8n, and Make with your systems. Custom workflow automation tailored to your business model.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>`,
      title: t('AI Audit', 'AI Audit'),
      short: t('AI Audit', 'AI Audit'),
      desc: t('Analiziramo vaše poslovanje i identificiramo top 3-5 mjesta gdje AI može odmah uštedjeti novac ili povećati prihod.', 'Analyzing your operations and identifying the top 3-5 areas where AI can immediately save money or boost revenue.')
    },
    {
      icon: `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path></svg>`,
      title: t('AI Edukacija & Radionice', 'AI Education & Workshops'),
      short: t('Edukacija', 'Education'),
      desc: t('Obučavamo vaš tim kako koristiti AI alate. Hands-on radionice prilagođene vašoj industriji i razini znanja.', 'Training your team to use AI tools. Hands-on workshops tailored to your industry and skill level.')
    }
  ];

  const N = items.length;

  // Tall outer section gives scroll room
  const sec = document.createElement('section');
  sec.id = 'services';
  sec.style.cssText = 'position:relative; height:' + (N * 100) + 'vh; height:' + (N * 100) + 'dvh; width:100%;';

  // Header (Scrolls normally)
  const headerWrap = document.createElement('div');
  headerWrap.style.cssText = 'max-width:1200px; margin:0 auto; padding:0 20px; width:100%; padding-top:110px; padding-bottom:40px;';
  headerWrap.appendChild(sectionHeader(t('Naše AI usluge', 'Our AI Services'), t('Specijaliziramo se za praktičnu primjenu AI-a — od automatizacije do inteligentnih botova.', 'We specialize in practical AI — from automation to intelligent bots.')));
  sec.appendChild(headerWrap);

  // Sticky viewport container
  const sticky = document.createElement('div');
  sticky.style.cssText = 'position:sticky; top:100px; height:calc(100vh - 100px); height:calc(100dvh - 100px); width:100%; display:flex; flex-direction:column; overflow:hidden; padding-top:20px;';
  sec.appendChild(sticky);

  // Nav tabs & Global Progress Bar
  const navWrap = document.createElement('div');
  navWrap.className = 'services-nav-wrap';
  navWrap.style.cssText = 'max-width:1000px; margin:0 auto; padding:0 20px; width:100%; flex-shrink:0; position:relative; z-index:10; padding-bottom:12px;';
  
  const nav = document.createElement('div');
  nav.className = 'services-nav';
  nav.style.cssText = 'display:flex; justify-content:center; gap:0; flex-wrap:wrap; width:100%; position:relative;';
  navWrap.appendChild(nav);

  // Single global progress bar underneath all tabs
  var globalLineWrap = document.createElement('div');
  globalLineWrap.style.cssText = 'position:absolute; bottom:0; left:20px; right:20px; height:3px; background:rgba(255,255,255,0.1); border-radius:3px; overflow:hidden;';
  
  var globalLine = document.createElement('div');
  globalLine.style.cssText = 'position:absolute; top:0; left:0; height:100%; width:0%; background:linear-gradient(90deg, ' + theme.colors.accentPrimary + ', ' + theme.colors.accentSecondary + '); transition:width 0.1s linear;';
  globalLineWrap.appendChild(globalLine);
  navWrap.appendChild(globalLineWrap);
  
  sticky.appendChild(navWrap);

  var navItems = [];
  for (var ni = 0; ni < N; ni++) {
    var btn = document.createElement('button');
    btn.style.cssText = 'background:transparent; border:none; color:rgba(255,255,255,0.4); font-size:1.05rem; font-weight:600; cursor:pointer; padding:10px 0; transition:color 0.4s ease; text-transform:uppercase; letter-spacing:1px; flex:1; min-width:120px; text-align:center; font-family:inherit;';
    btn.textContent = items[ni].short;
    
    btn.setAttribute('data-idx', ni);
    btn.addEventListener('click', function() {
      scrollToService(parseInt(this.getAttribute('data-idx')));
    });
    
    nav.appendChild(btn);
    navItems.push({ btn: btn });
  }

  // Slides container
  var slideWrap = document.createElement('div');
  slideWrap.style.cssText = 'flex:1; position:relative; width:100%;';
  sticky.appendChild(slideWrap);

  // Build slides
  var slides = [];
  for (var si = 0; si < N; si++) {
    var slide = document.createElement('div');
    slide.style.cssText = 'position:absolute; inset:0; display:' + (si === 0 ? 'flex' : 'none') + '; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:0 20px; opacity:' + (si === 0 ? '1' : '0') + '; transition:opacity 0.4s ease; overflow:hidden;';

    // Background Icon (sized to fit inside the grid nicely)
    var bgWrap = document.createElement('div');
    bgWrap.style.cssText = 'position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:40vw; height:40vw; max-width:500px; max-height:500px; z-index:0; display:flex; justify-content:center; align-items:center; pointer-events:none; opacity:0.06;';
    
    // Extract icon and modify its properties to make it huge and white
    let svgStr = items[si].icon;
    svgStr = svgStr.replace(/width="\d+"/, 'width="100%"').replace(/height="\d+"/, 'height="100%"');
    svgStr = svgStr.replace(/stroke="[^"]+"/, 'stroke="#ffffff"'); 
    bgWrap.innerHTML = svgStr;
    slide.appendChild(bgWrap);

    // Content container (above the icon)
    var contentWrap = document.createElement('div');
    contentWrap.style.cssText = 'position:relative; z-index:2; display:flex; flex-direction:column; align-items:center; padding: 40px;';

    var h3El = document.createElement('h3');
    h3El.style.cssText = 'font-size:4rem; margin-bottom:24px; font-weight:800; background:linear-gradient(90deg,#fff,rgba(255,255,255,0.8)); -webkit-background-clip:text; -webkit-text-fill-color:transparent;';
    h3El.textContent = items[si].title;
    contentWrap.appendChild(h3El);

    var pEl = document.createElement('p');
    pEl.style.cssText = 'font-size:1.3rem; color:rgba(255,255,255,0.7); max-width:700px; line-height:1.75; font-weight:300; margin:0 auto;';
    pEl.textContent = items[si].desc;
    contentWrap.appendChild(pEl);

    var ctaEl = document.createElement('button');
    ctaEl.style.cssText = 'margin-top:44px; background:linear-gradient(135deg,' + theme.colors.accentPrimary + ',' + theme.colors.accentSecondary + '); color:white; padding:16px 42px; border-radius:50px; font-size:1.1rem; font-weight:600; cursor:pointer; border:none; transition:all 0.3s; box-shadow:0 10px 20px -5px rgba(28,117,188,0.4); font-family:inherit;';
    ctaEl.textContent = t('Kontaktirajte nas', 'Contact Us');
    ctaEl.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-3px)'; this.style.boxShadow = '0 15px 28px -5px rgba(28,117,188,0.5)'; });
    ctaEl.addEventListener('mouseleave', function() { this.style.transform = ''; this.style.boxShadow = '0 10px 20px -5px rgba(28,117,188,0.4)'; });
    ctaEl.addEventListener('click', function() { document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); });
    contentWrap.appendChild(ctaEl);

    slide.appendChild(contentWrap);

    slideWrap.appendChild(slide);
    slides.push(slide);
  }

  // State
  var currentIdx = 0;
  var isTransitioning = false;

  function updateNav(idx) {
    for (var i = 0; i < navItems.length; i++) {
      if (i === idx) {
        navItems[i].btn.style.color = 'white';
      } else if (i < idx) {
        navItems[i].btn.style.color = 'rgba(255,255,255,0.8)';
      } else {
        navItems[i].btn.style.color = 'rgba(255,255,255,0.4)';
      }
    }
  }

  function transitionTo(idx) {
    if (isTransitioning || idx === currentIdx) return;
    isTransitioning = true;

    var outSlide = slides[currentIdx];
    outSlide.style.opacity = '0';

    setTimeout(function() {
      outSlide.style.display = 'none';
      currentIdx = idx;
      updateNav(idx);

      var inSlide = slides[idx];
      inSlide.style.display = 'flex';
      inSlide.style.opacity = '0';
      // Force reflow
      void inSlide.offsetHeight;
      inSlide.style.opacity = '1';

      setTimeout(function() { isTransitioning = false; }, 50);
    }, 350);
  }

  function scrollToService(idx) {
    var rect = sec.getBoundingClientRect();
    var headerH = headerWrap.offsetHeight || 150; // fallback if 0
    var scrollableDistance = rect.height - window.innerHeight - headerH;
    var target = window.scrollY + rect.top + headerH + (idx / N) * scrollableDistance;
    window.scrollTo({ top: target, behavior: 'smooth' });
  }

  function handleScroll() {
    var secRect = sec.getBoundingClientRect();
    var stickyRect = sticky.getBoundingClientRect();
    var headerH = headerWrap.offsetHeight || 150;
    
    var currentOffset = (stickyRect.top - secRect.top) - headerH;
    var maxOffset = sec.offsetHeight - headerH - sticky.offsetHeight;
    
    var scrollProgress = maxOffset > 0 ? (currentOffset / maxOffset) : 0;
    
    var progress = Math.max(0, Math.min(1, scrollProgress));
    var idx = Math.min(N - 1, Math.floor(progress * N));
    
    if (idx !== currentIdx) transitionTo(idx);

    // Continuous progress bar update for the single global line
    globalLine.style.width = (progress * 100) + '%';
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateNav(0);

  return sec;
}



/* ── NICHES ─────────────────────────────────────────── */
function ConsultingNiches() {
  const sec = mkEl('section', `padding:60px 0; overflow:hidden; width:100%;`);
  
  const headerCtr = mkEl('div', theme.styles.container);
  headerCtr.appendChild(sectionHeader(t('Industrije koje servisiramo', 'Industries We Service'), t('Visoko traženi niches u 2025 godini prema Gartner, Deloitte i McKinsey istraživanjima.', 'High-demand niches in 2025 according to Gartner, Deloitte, and McKinsey research.')));
  sec.appendChild(headerCtr);

  const niches = [
    t('Healthcare AI', 'Healthcare AI'),
    t('Finance & Banking', 'Finance & Banking'),
    t('Voice & Chat automatizacija', 'Voice & Chat Automation'),
    t('Legal & Compliance AI', 'Legal & Compliance AI'),
    t('Retail & E-commerce', 'Retail & E-commerce'),
    t('Manufacturing / Ops', 'Manufacturing / Ops'),
    t('HR & Talent automatizacija', 'HR & Talent Automation'),
    t('SME digitalna transformacija', 'SME Digital Transformation')
  ];

  const marqueeContainer = mkEl('div');
  marqueeContainer.className = 'marquee-container animate-on-scroll';
  marqueeContainer.style.cssText += `; padding: 20px 0;`;

  const track = mkEl('div');
  track.className = 'marquee-track';

  const createTag = (name) => {
    const tag = mkEl('div', `padding:14px 28px;border-radius:50px;background:rgba(28,117,188,.12);border:1px solid rgba(28,117,188,.25);font-size:.95rem;color:rgba(255,255,255,.9);transition:all .3s;cursor:default;white-space:nowrap;display:inline-block;`);
    tag.textContent = name;
    tag.onmouseenter = () => { 
      tag.style.background = 'rgba(28,117,188,.25)'; 
      tag.style.borderColor = `${theme.colors.accentPrimary}`; 
      tag.style.transform = 'translateY(-2px)';
    };
    tag.onmouseleave = () => { 
      tag.style.background = 'rgba(28,117,188,.12)'; 
      tag.style.borderColor = 'rgba(28,117,188,.25)'; 
      tag.style.transform = 'translateY(0)';
    };
    return tag;
  };

  // Duplicate list to make it infinitely scrolling
  const doubleNiches = [...niches, ...niches];
  doubleNiches.forEach(n => {
    track.appendChild(createTag(n));
  });

  marqueeContainer.appendChild(track);
  sec.appendChild(marqueeContainer);
  
  return sec;
}

/* ── PRICING ─────────────────────────────────────────── */
function ConsultingPricing() {
  const sec = mkEl('section', `padding:100px 0;`);
  sec.id = 'pricing';
  const ctr = mkEl('div', theme.styles.container);
  ctr.appendChild(sectionHeader(t('Modeli suradnje', 'Collaboration Models'), t('Fleksibilni pricing modeli prilagođeni vašim potrebama — od jednokratnih konzultacija do dugoročnog partnerstva.', 'Flexible pricing models tailored to your needs — from one-off consultations to long-term partnerships.')));

  const plans = [
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      name: t('Hourly', 'Hourly'), price: '€100 – €350', unit: t('/sat', '/hour'),
      badge: '', highlight: false,
      desc: t('Idealno za scoping, savjete i kratke projekte.', 'Ideal for scoping, advice, and short projects.'),
      features: [
        t('Junior konzultant od €100/h', 'Junior consultant from €100/h'),
        t('Mid-level od €200/h', 'Mid-level from €200/h'),
        t('Senior AI arhitekt od €350/h', 'Senior AI architect from €350/h'),
        t('Minimum 2 sata po sesiji', 'Minimum 2 hours per session'),
        t('Idealno za inicijalne konzultacije', 'Ideal for initial consultations')
      ],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>`,
      name: t('Retainer', 'Retainer'), price: '€3K – €15K', unit: t('/mjesec', '/month'),
      badge: t('PREPORUČENO', 'RECOMMENDED'), highlight: true,
      desc: t('Kontinuirana podrška, implementacija i razvoj.', 'Continuous support, implementation, and development.'),
      features: [
        t('Neograničene konzultacije', 'Unlimited consultations'),
        t('Advisory + implementacija', 'Advisory + implementation'),
        t('Roadmap ownership', 'Roadmap ownership'),
        t('Tjedni check-in pozivi', 'Weekly check-in calls'),
        t('Prioritetna podrška', 'Priority support'),
        t('Mjerna izvješća (KPI)', 'KPI measurement reports')
      ],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`,
      name: t('Fixed Project', 'Fixed Project'), price: '€10K – €150K+', unit: t('/projekt', '/project'),
      badge: '', highlight: false,
      desc: t('Definirani projekti s jasnim deliverables.', 'Defined projects with clear deliverables.'),
      features: [
        t('AI audit (€2K–5K)', 'AI audit (€2K–5K)'),
        t('Implementacija (€15K–80K)', 'Implementation (€15K–80K)'),
        t('Custom AI rješenje', 'Custom AI solution'),
        t('Jasni acceptance criteria', 'Clear acceptance criteria'),
        t('Timeline i milestones', 'Timeline and milestones')
      ],
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>`,
      name: t('Value-Based', 'Value-Based'), price: '5–20%', unit: t('od ROI', 'of ROI'),
      badge: '', highlight: false,
      desc: t('Premium model — plaćate samo za dokazane rezultate.', 'Premium model — you pay only for proven results.'),
      features: [
        t('Za dokazane klijente', 'For proven clients'),
        t('Naknada vezana za ROI', 'Fees tied to ROI'),
        t('Zajednički interesi', 'Shared interests'),
        t('Highest accountability', 'Highest accountability'),
        t('Mjerljivi poslovni impact', 'Measurable business impact')
      ],
    },
  ];

  const grid = mkEl('div', `display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:22px;align-items:start;`);
  plans.forEach(p => {
    const card = mkEl('div', `padding:36px;border-radius:22px;position:relative;display:flex;flex-direction:column;transition:transform .3s,box-shadow .3s,border-color .3s;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px 0 rgba(28, 117, 188, 0.05);
      ${p.highlight ? `background:linear-gradient(135deg,rgba(28,117,188,.22),rgba(43,57,144,.22));border:1px solid rgba(28,117,188,.5);` : `background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);`}`);
    card.className = 'animate-on-scroll';

    card.onmouseenter = () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 35px 60px -10px rgba(0, 0, 0, 0.8), 0 0 60px 0 rgba(28, 117, 188, 0.15)';
      if (p.highlight) card.style.borderColor = theme.colors.accentPrimary;
      else card.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    };
    card.onmouseleave = () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px 0 rgba(28, 117, 188, 0.05)';
      if (p.highlight) card.style.borderColor = 'rgba(28, 117, 188, 0.5)';
      else card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    };

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
      ${p.highlight ? `background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});color:white;border:none;` : `background:transparent;color:white;border:1px solid rgba(255,255,255,.22);`}`, t('Kontaktirajte nas', 'Contact Us'));
    btn.onclick = () => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    btn.onmouseenter = () => { btn.style.transform = 'translateY(-2px)'; btn.style.filter = 'brightness(1.1)'; };
    btn.onmouseleave = () => { btn.style.transform = ''; btn.style.filter = ''; };
    card.appendChild(btn);
    grid.appendChild(card);
  });
  ctr.appendChild(grid);

  const note = mkEl('p', `text-align:center;color:rgba(255,255,255,.35);font-size:.82rem;margin-top:32px;`, t('Cijene su okvirne i prilagođavaju se prema opsegu projekta, industriji i trajanju suradnje. Kontaktirajte nas za personalnu ponudu.', 'Prices are indicative and adapt to project scope, industry, and collaboration duration. Contact us for a personalized proposal.'));
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
  info.className = 'animate-on-scroll';
  info.appendChild(mkEl('h2', `font-size:3rem;margin-bottom:0;`, t('Dogovorite konzultaciju', 'Book a Consultation')));
  info.appendChild(Divider('left'));
  info.appendChild(mkEl('p', `font-size:1.05rem;opacity:.7;margin-bottom:36px;line-height:1.75;`, t('Počnite s besplatnim 30-minutnim discovery pozivom. Analiziramo vaše poslovanje i predlažemo gdje AI može napraviti razliku odmah.', 'Start with a free 30-minute discovery call. We analyze your business and suggest where AI can make an immediate difference.')));

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
  form.className = 'glass-card animate-on-scroll';

  [[t('Ime i prezime', 'Full Name'),'text'],[t('Email', 'Email'),'email'],[t('Tvrtka / projekt', 'Company / Project'),'text']].forEach(([ph,type]) => {
    const inp = mkEl('input', inpStyle);
    inp.placeholder = ph; inp.type = type;
    inp.onfocus = () => { inp.style.borderColor = theme.colors.accentPrimary; inp.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
    inp.onblur = () => { inp.style.borderColor = 'rgba(255,255,255,.1)'; inp.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
    form.appendChild(inp);
  });

  const sel = mkEl('select', `width:100%;padding:14px;background: url("data:image/svg+xml;utf8,<svg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>") no-repeat calc(100% - 14px) center, linear-gradient(135deg, #1c75bc, #2b3990);border:none;border-radius:8px;color:white;font-size:.97rem;font-family:${theme.fonts.primary};outline:none;cursor:pointer;appearance:none;-webkit-appearance:none;padding-right:40px;`);
  
  [
    { value: '', text: t('Što vas zanima...', 'What are you interested in...') },
    { value: 'voicebot', text: t('Voice Bot', 'Voice Bot') },
    { value: 'chatbot', text: t('Chat Bot', 'Chat Bot') },
    { value: 'automation', text: t('Automatizacija procesa', 'Process Automation') },
    { value: 'audit', text: t('AI Audit', 'AI Audit') },
    { value: 'hourly', text: t('Hourly konzultacija', 'Hourly Consultation') },
    { value: 'other', text: t('Ostalo', 'Other') }
  ].forEach(opt => {
    const o = mkEl('option', `background: #1c75bc; color: #fff; padding: 10px;`, opt.text);
    o.value = opt.value;
    sel.appendChild(o);
  });
  form.appendChild(sel);

  const ta = mkEl('textarea', inpStyle);
  ta.placeholder = t('Opišite vaš slučaj i što biste htjeli automatizirati...', 'Describe your use case and what you would like to automate...');
  ta.rows = 4;
  ta.onfocus = () => { ta.style.borderColor = theme.colors.accentPrimary; ta.style.backgroundColor = 'rgba(40,40,40,0.95)'; };
  ta.onblur = () => { ta.style.borderColor = 'rgba(255,255,255,.1)'; ta.style.backgroundColor = 'rgba(30,30,30,0.85)'; };
  form.appendChild(ta);

  const btn = mkEl('button', `width:100%;margin-top:6px;`, t('Pošalji upit →', 'Send Inquiry →'));
  btn.className = 'btn-primary';
  btn.type = 'submit';
  form.onsubmit = e => {
    e.preventDefault();
    btn.textContent = t('✓ Primljeno! Javit ćemo se uskoro.', '✓ Received! We will get in touch soon.');
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
function ConsultingFooter() {
  const footer = document.createElement('footer');
  footer.style.cssText = `
        background: rgba(0,0,0,0.4);
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
  navTitle.textContent = t('Navigacija', 'Navigation');
  navTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;
  const navUl = document.createElement('ul');
  navUl.style.cssText = `list-style: none; padding: 0; text-align: center;`;

  [
    { name: t('O nama', 'About us'), href: '/#about' },
    { name: t('Projekti', 'Projects'), href: '/#products' },
    { name: t('Kontakt', 'Contact'), href: '/#contact' },
    { name: t('Consulting', 'Consulting'), href: '/consulting' }
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
  contactsTitle.textContent = t('Naš tim', 'Our Team');
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
  copy.innerHTML = t(`&copy; ${new Date().getFullYear()} Appercept. Sva prava pridržana.`, `&copy; ${new Date().getFullYear()} Appercept. All rights reserved.`);

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
