
import { theme } from '../theme.js';
import { t, toggleLanguage, getLanguage } from '../lib/i18n.js';

export function Header() {
  const header = document.createElement('header');

  const style = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    width: 100%;
    padding: 20px 0;
    transition: background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease;
  `;

  header.style.cssText = style;

  // Solid at top, glassy on scroll
  header.style.background = 'rgba(17, 17, 17, 1)';
  header.style.backdropFilter = 'none';
  header.style.webkitBackdropFilter = 'none';
  header.style.borderBottom = `1px solid transparent`;

  // Scroll listener: 75% opacity + blur when scrolled
  const onScroll = () => {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(17, 17, 17, 0.60)';
      header.style.backdropFilter = 'blur(12px)';
      header.style.webkitBackdropFilter = 'blur(12px)';
      header.style.borderBottom = `1px solid ${theme.colors.glassBorder}`;
    } else {
      header.style.background = 'rgba(17, 17, 17, 1)';
      header.style.backdropFilter = 'none';
      header.style.webkitBackdropFilter = 'none';
      header.style.borderBottom = `1px solid transparent`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  const container = document.createElement('div');
  container.style.cssText = `
    ${theme.styles.container}
    display: flex;
    justify-content: space-between;
    align-items: center;
  `;

  // Logo
  const logo = document.createElement('a');
  logo.href = '#';
  logo.style.cssText = `
        display: block;
        height: 55px; /* Fixed height for the header alignment */
        overflow: hidden; /* Crop the excess top/bottom whitespace */
    `;

  const logoImg = document.createElement('img');
  logoImg.src = '/logo_wide.png';
  logoImg.alt = 'APPERCEPT';
  logoImg.style.cssText = `
        height: 120px; /* Render larger to zoom in */
        width: auto;
        display: block;
        margin-top: -32px; /* Pull up to center the logo text (120 - 55) / 2 approx */
    `;
  logo.appendChild(logoImg);

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
  hamburger.style.cssText = `
    background: transparent;
    border: none;
    cursor: pointer;
    display: none; /* Hidden by default */
    z-index: 1001;
  `;

  // Nav
  const nav = document.createElement('nav');
  nav.className = 'header-nav';
  nav.style.cssText = `display: flex; gap: 30px;`;

  const ul = document.createElement('ul');
  ul.style.cssText = `list-style: none; padding: 0; margin: 0; display: flex; align-items: center; gap: 30px;`;

  // Backdrop for mobile menu
  const backdrop = document.createElement('div');
  backdrop.style.cssText = `
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5); /* darkened backdrop */
      z-index: 998; /* Below nav (999) */
      display: none;
      opacity: 0;
      transition: opacity 0.3s;
      backdrop-filter: blur(4px);
  `;
  document.body.appendChild(backdrop);

  // Toggle Logic Helper
  const toggleMenu = (forceClose = false) => {
    const isOpening = !nav.classList.contains('open') && !forceClose;

    if (isOpening) {
      nav.classList.add('open');
      document.body.style.overflow = 'hidden'; // Lock scroll

      backdrop.style.display = 'block';
      // Use setTimeout to ensure display:block is applied before opacity transition
      setTimeout(() => backdrop.style.opacity = '1', 10);

      // Switch to X icon
      hamburger.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>`;
    } else {
      nav.classList.remove('open');
      document.body.style.overflow = '';

      backdrop.style.opacity = '0';
      // Use setTimeout to ensure opacity transition completes before display:none
      setTimeout(() => backdrop.style.display = 'none', 300);

      // Switch back to Hamburger icon
      hamburger.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>`;
    }
  };

  hamburger.onclick = () => toggleMenu();
  backdrop.onclick = () => toggleMenu(true); // Close menu when backdrop is clicked

  const links = [
    { name: t('O nama', 'About us'), href: '#about' },
    { name: t('Projekti', 'Projects'), href: '#products' },
    { name: t('Kontakt', 'Contact'), href: '#contact' }
  ];

  links.forEach(link => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = link.name;
    a.href = link.href;
    a.style.cssText = `
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0.8;
      transition: all 0.3s ease;
    `;
    // ... hover effects ...
    a.onmouseenter = () => { a.style.opacity = '1'; a.style.color = theme.colors.accentPrimary; };
    a.onmouseleave = () => { a.style.opacity = '0.8'; a.style.color = 'inherit'; };

    // Close menu on click (mobile) and smooth scroll
    a.onclick = (e) => {
      e.preventDefault();

      if (window.innerWidth <= 768) {
        toggleMenu(true); // Force close the menu
      }

      const targetId = link.href.split('#')[1];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const headerHeight = header.offsetHeight || 95; // Account for fixed header
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2 seconds for slower scroll
        let startTime = null;

        function animation(currentTime) {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / duration, 1);
          
          // easeOutQuart: starts fast, strongly slows down at the end
          const ease = 1 - Math.pow(1 - progress, 4);
          
          window.scrollTo(0, startPosition + distance * ease);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          } else {
            // Update URL hash without jumping
            history.pushState(null, null, link.href);
          }
        }
        
        requestAnimationFrame(animation);
      }
    };

    li.appendChild(a);
    ul.appendChild(li);
  });

  // ── Services dropdown ────────────────────────────────────────────────────────
  const servicesItems = [
    {
      label: 'Consulting',
      sub: t('AI strategija i digitalna transformacija', 'AI strategy & digital transformation'),
      href: '/consulting',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>`
    },
    {
      label: t('Marketing & Media', 'Marketing & Media'),
      sub: t('Video, foto, podcast i social media', 'Video, photo, podcast & social media'),
      href: '/marketing',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2"></rect></svg>`
    },
    {
      label: t('AI Botovi', 'AI Bots'),
      sub: t('Voice botovi, chat botovi i automatizacija', 'Voice bots, chat bots & automation'),
      href: '/ai-bots',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v1a7 7 0 0 1-14 0v-1"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`
    },
    {
      label: t('Web & Aplikacije', 'Web & Apps'),
      sub: t('Web stranice, e-commerce i web aplikacije', 'Websites, e-commerce & web apps'),
      href: '/web',
      icon: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`
    },
  ];

  const servicesLi = document.createElement('li');
  servicesLi.style.cssText = `position:relative;`;

  const servicesTrigger = document.createElement('button');
  servicesTrigger.style.cssText = `
    background:transparent;border:none;cursor:pointer;font-family:inherit;
    display:flex;align-items:center;gap:6px;
    font-size:0.9rem;font-weight:600;
    background:linear-gradient(135deg,${theme.colors.accentPrimary},${theme.colors.accentSecondary});
    -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    padding:0;
  `;
  servicesTrigger.innerHTML = `
    <span>${t('Usluge', 'Services')}</span>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;transition:transform .3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
  `;

  const dropdown = document.createElement('div');
  dropdown.style.cssText = `
    position:absolute;top:calc(100% + 16px);left:50%;transform:translateX(-50%);
    background:rgba(17,17,17,0.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,0.1);border-radius:16px;
    padding:8px;min-width:300px;
    box-shadow:0 20px 60px rgba(0,0,0,0.6),0 0 0 1px rgba(28,117,188,0.15);
    opacity:0;pointer-events:none;transform:translateX(-50%) translateY(-8px);
    transition:opacity .2s ease,transform .2s ease;
  `;

  servicesItems.forEach(item => {
    const row = document.createElement('a');
    row.href = item.href;
    row.style.cssText = `
      display:flex;align-items:center;gap:14px;padding:12px 14px;border-radius:10px;
      text-decoration:none;color:white;transition:background .2s;cursor:pointer;
    `;
    row.onmouseenter = () => row.style.background = 'rgba(28,117,188,0.15)';
    row.onmouseleave = () => row.style.background = 'transparent';

    const iconWrap = document.createElement('div');
    iconWrap.style.cssText = `
      width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;
      background:rgba(28,117,188,0.15);border:1px solid rgba(28,117,188,0.25);
      color:${theme.colors.accentPrimary};flex-shrink:0;
    `;
    iconWrap.innerHTML = item.icon;

    const textWrap = document.createElement('div');
    const labelEl = document.createElement('div');
    labelEl.textContent = item.label;
    labelEl.style.cssText = `font-size:.9rem;font-weight:600;`;
    const subEl = document.createElement('div');
    subEl.textContent = item.sub;
    subEl.style.cssText = `font-size:.75rem;color:rgba(255,255,255,.45);margin-top:2px;`;
    textWrap.appendChild(labelEl);
    textWrap.appendChild(subEl);

    row.appendChild(iconWrap);
    row.appendChild(textWrap);
    dropdown.appendChild(row);
  });

  // Show/hide logic — hover on the li keeps it open
  let hideTimer;
  const showDropdown = () => {
    clearTimeout(hideTimer);
    dropdown.style.opacity = '1';
    dropdown.style.pointerEvents = 'auto';
    dropdown.style.transform = 'translateX(-50%) translateY(0)';
    servicesTrigger.querySelector('svg').style.transform = 'rotate(180deg)';
  };
  const hideDropdown = () => {
    hideTimer = setTimeout(() => {
      dropdown.style.opacity = '0';
      dropdown.style.pointerEvents = 'none';
      dropdown.style.transform = 'translateX(-50%) translateY(-8px)';
      servicesTrigger.querySelector('svg').style.transform = 'rotate(0deg)';
    }, 120);
  };

  servicesLi.onmouseenter = showDropdown;
  servicesLi.onmouseleave = hideDropdown;

  // Mobile: toggle on tap
  servicesTrigger.onclick = (e) => {
    e.stopPropagation();
    const isOpen = dropdown.style.opacity === '1';
    isOpen ? hideDropdown() : showDropdown();
  };

  servicesLi.appendChild(servicesTrigger);
  servicesLi.appendChild(dropdown);
  ul.appendChild(servicesLi);



  // Language button
  const langBtn = document.createElement('button');
  langBtn.textContent = getLanguage() === 'hr' ? 'EN' : 'HR';
  langBtn.style.cssText = `
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.18);
    color: white;
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    align-self: center;
    font-family: inherit;
    letter-spacing: 0.5px;
  `;
  langBtn.onmouseenter = () => {
    langBtn.style.background = 'rgba(255,255,255,0.15)';
    langBtn.style.borderColor = theme.colors.accentPrimary;
  };
  langBtn.onmouseleave = () => {
    langBtn.style.background = 'rgba(255,255,255,0.06)';
    langBtn.style.borderColor = 'rgba(255,255,255,0.18)';
  };
  langBtn.onclick = () => {
    toggleLanguage();
  };

  const langLi = document.createElement('li');
  langLi.style.cssText = `display: flex; align-items: center; justify-content: center;`;
  langLi.appendChild(langBtn);
  ul.appendChild(langLi);

  nav.appendChild(ul);

  container.appendChild(logo);
  container.appendChild(hamburger);
  container.appendChild(nav);
  header.appendChild(container);

  return header;
}
