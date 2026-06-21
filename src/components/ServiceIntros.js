import { theme } from '../theme.js';
import { t } from '../lib/i18n.js';

const services = [
  {
    id: 'marketing',
    label: t('MARKETING & MEDIA', 'MARKETING & MEDIA'),
    title: t('Sadržaj koji gradi brand i puni kalendar', 'Content that builds brands and fills calendars'),
    desc: t(
      'Od snimanja podcasta i YouTube videa do Instagram strategije i event coveragea — stvaramo vizualni identitet koji se pamti i publiku koja ostaje.',
      'From podcast recording and YouTube videos to Instagram strategy and event coverage — we create a visual identity that sticks and an audience that stays.'
    ),
    href: '/marketing',
    cta: t('Pogledajte Marketing & Media →', 'Explore Marketing & Media →'),
    glowColor: 'rgba(193,53,132,0.15)',
    accentColor: '#e1306c',
    highlights: [
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>`,
        title: t('Video produkcija', 'Video Production'),
        desc: t('Podcast, YouTube, eventi i promotivni filmovi s profesionalnom opremom.', 'Podcasts, YouTube, events, and promos with professional equipment.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
        title: t('Social Media Marketing', 'Social Media Marketing'),
        desc: t('Strategija, kalendar objava, copywriting i analiza rezultata za sve platforme.', 'Strategy, posting calendar, copywriting, and results analysis across all platforms.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        title: t('Rast publike', 'Audience Growth'),
        desc: t('Dokazani rezultati — 5.7M+ pregleda i 3.8M+ lajkova za naše klijente.', 'Proven results — 5.7M+ views and 3.8M+ likes across our clients.'),
      },
    ],
  },
  {
    id: 'ai-bots',
    label: t('AI BOTOVI', 'AI BOTS'),
    title: t('Automatizacija koja radi umjesto vas — 24/7', 'Automation that works for you — 24/7'),
    desc: t(
      'Voice botovi koji primaju pozive, chat botovi koji odgovaraju na upite i WhatsApp automatizacija koja prati svaki lead — bez čekanja, bez propuštenih prilika.',
      'Voice bots that handle calls, chat bots that answer queries, and WhatsApp automation that follows every lead — no waiting, no missed opportunities.'
    ),
    href: '/ai-bots',
    cta: t('Pogledajte AI Botove →', 'Explore AI Bots →'),
    glowColor: 'rgba(0,210,255,0.12)',
    accentColor: '#00d2ff',
    highlights: [
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
        title: t('Voice Botovi', 'Voice Bots'),
        desc: t('AI koji prima pozive, zakazuje termine i odgovara na pitanja — kao pravi agent.', 'AI that handles calls, books appointments, and answers questions — like a real agent.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
        title: t('Chat & WhatsApp Botovi', 'Chat & WhatsApp Bots'),
        desc: t('Automatizirani odgovori i lead nurturing na webu i WhatsAppu.', 'Automated responses and lead nurturing on web and WhatsApp.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
        title: t('Automatizacija procesa', 'Process Automation'),
        desc: t('Integracije s CRM-om, kalendarima i internim sustavima za potpunu automatizaciju.', 'Integrations with CRM, calendars, and internal systems for full automation.'),
      },
    ],
  },
  {
    id: 'web',
    label: t('WEB & APLIKACIJE', 'WEB & APPS'),
    title: t('Web koji konvertira i aplikacije koje traju', 'Web that converts and apps that last'),
    desc: t(
      'Od brze landing stranice do kompleksne web aplikacije — dizajniramo i razvijamo digitalne proizvode koji izgledaju vrhunski, rade brzo i rastu zajedno s vašim biznisom.',
      'From a fast landing page to a complex web application — we design and build digital products that look great, run fast, and scale with your business.'
    ),
    href: '/web',
    cta: t('Pogledajte Web & Aplikacije →', 'Explore Web & Apps →'),
    glowColor: 'rgba(28,117,188,0.15)',
    accentColor: theme.colors.accentPrimary,
    highlights: [
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        title: t('Web Stranice & Landing Pageovi', 'Websites & Landing Pages'),
        desc: t('Brze, SEO-optimizirane stranice prilagođene vašem brandu — isporučene za 2–4 tjedna.', 'Fast, SEO-optimised sites tailored to your brand — delivered in 2–4 weeks.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>`,
        title: t('Web Aplikacije & E-commerce', 'Web Apps & E-commerce'),
        desc: t('Custom dashboardi, SaaS platforme i online trgovine koje rastu s vašim biznisom.', 'Custom dashboards, SaaS platforms, and online shops that scale with your business.'),
      },
      {
        icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
        title: t('Održavanje & SEO', 'Maintenance & SEO'),
        desc: t('Tehnička podrška, optimizacija performansi i SEO koji dovodi organski promet.', 'Technical support, performance optimisation, and SEO that drives organic traffic.'),
      },
    ],
  },
];

export function ServiceIntros() {
  const wrap = document.createElement('div');

  services.forEach((svc, i) => {
    const section = document.createElement('section');
    section.id = `${svc.id}-intro`;
    section.style.cssText = `padding:100px 0;position:relative;overflow:hidden;`;

    const glow = document.createElement('div');
    glow.style.cssText = `
      position:absolute;top:50%;${i % 2 === 0 ? 'right:-10%' : 'left:-10%'};
      width:400px;height:400px;
      background:radial-gradient(circle,${svc.glowColor} 0%,transparent 70%);
      filter:blur(80px);z-index:1;pointer-events:none;transform:translateY(-50%);
    `;
    section.appendChild(glow);

    const container = document.createElement('div');
    container.style.cssText = `${theme.styles.container}position:relative;z-index:2;`;

    const grid = document.createElement('div');
    grid.className = 'grid-layout';
    grid.style.cssText = `display:grid;grid-template-columns:1.1fr 0.9fr;gap:60px;align-items:center;`;

    const mediaStyle = document.createElement('style');
    mediaStyle.innerHTML = `@media(max-width:968px){#${svc.id}-intro .grid-layout{grid-template-columns:1fr!important;gap:40px!important;}}`;
    section.appendChild(mediaStyle);

    // Left col
    const left = document.createElement('div');
    left.className = 'animate-on-scroll';
    left.style.cssText = `display:flex;flex-direction:column;align-items:flex-start;${i % 2 !== 0 ? 'order:2;' : ''}`;

    const label = document.createElement('span');
    label.textContent = svc.label;
    label.style.cssText = `font-size:.9rem;font-weight:700;letter-spacing:2px;color:${svc.accentColor};margin-bottom:12px;`;

    const title = document.createElement('h2');
    title.textContent = svc.title;
    title.style.cssText = `font-size:2.8rem;line-height:1.2;margin-bottom:20px;font-weight:700;`;

    const desc = document.createElement('p');
    desc.textContent = svc.desc;
    desc.style.cssText = `font-size:1.1rem;line-height:1.7;color:rgba(255,255,255,.7);margin-bottom:32px;`;

    const cta = document.createElement('a');
    cta.href = svc.href;
    cta.textContent = svc.cta;
    cta.style.cssText = `
      background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});
      color:white;padding:14px 36px;border-radius:50px;font-weight:600;font-size:1.05rem;
      transition:all .3s;cursor:pointer;box-shadow:0 4px 15px rgba(28,117,188,.4);
      display:inline-flex;align-items:center;justify-content:center;text-decoration:none;
    `;
    cta.onmouseenter = () => { cta.style.transform = 'translateY(-3px) scale(1.03)'; cta.style.boxShadow = '0 6px 20px rgba(43,57,144,.6)'; cta.style.filter = 'brightness(1.1)'; };
    cta.onmouseleave = () => { cta.style.transform = ''; cta.style.boxShadow = '0 4px 15px rgba(28,117,188,.4)'; cta.style.filter = ''; };

    left.appendChild(label);
    left.appendChild(title);
    left.appendChild(desc);
    left.appendChild(cta);

    // Right col — highlight cards
    const right = document.createElement('div');
    right.style.cssText = `display:flex;flex-direction:column;gap:20px;${i % 2 !== 0 ? 'order:1;' : ''}`;

    svc.highlights.forEach(h => {
      const card = document.createElement('div');
      card.className = 'glass-card animate-on-scroll';
      card.style.cssText = `${theme.styles.glass}border-radius:16px;padding:24px;display:flex;gap:20px;align-items:flex-start;`;

      const iconBox = document.createElement('div');
      iconBox.style.cssText = `
        background:rgba(28,117,188,.1);border:1px solid rgba(28,117,188,.25);
        border-radius:12px;padding:12px;color:${svc.accentColor};
        display:flex;align-items:center;justify-content:center;flex-shrink:0;
      `;
      iconBox.innerHTML = h.icon;

      const info = document.createElement('div');
      const ht = document.createElement('h3');
      ht.textContent = h.title;
      ht.style.cssText = `font-size:1.15rem;font-weight:600;margin-bottom:6px;color:white;`;
      const hd = document.createElement('p');
      hd.textContent = h.desc;
      hd.style.cssText = `font-size:.95rem;line-height:1.5;color:rgba(255,255,255,.55);`;
      info.appendChild(ht);
      info.appendChild(hd);

      card.appendChild(iconBox);
      card.appendChild(info);
      right.appendChild(card);
    });

    grid.appendChild(left);
    grid.appendChild(right);
    container.appendChild(grid);
    section.appendChild(container);
    wrap.appendChild(section);
  });

  return wrap;
}
