
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

  // Consulting link (separate page)
  const consultingLink = document.createElement('a');
  consultingLink.textContent = 'Consulting';
  consultingLink.href = '/consulting';
  consultingLink.style.cssText = `
    font-size: 0.9rem; font-weight: 600; opacity: 1;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  `;

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

  // Add consulting link as a list item
  const consultingLi = document.createElement('li');
  consultingLi.appendChild(consultingLink);
  ul.appendChild(consultingLi);

  // Marketing & Media link (separate page)
  const marketingLink = document.createElement('a');
  marketingLink.textContent = t('Marketing & Media', 'Marketing & Media');
  marketingLink.href = '/marketing';
  marketingLink.style.cssText = `
    font-size: 0.9rem; font-weight: 600; opacity: 1;
    transition: all 0.3s ease;
    background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  `;
  const marketingLi = document.createElement('li');
  marketingLi.appendChild(marketingLink);
  ul.appendChild(marketingLi);

  // ── Two auth buttons → Appercept Space dashboard ─────────────────────────────
  const getAppUrl = () => {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000';
      }
    }
    return 'https://app.appercept.net';
  };
  const APP_URL = getAppUrl();

  // ── Launch overlay: shown for 3 s before redirecting to the app ─────────────
  const getFirstName = () => {
    const match = document.cookie.split('; ').find(c => c.startsWith('appercept_fn='));
    return match ? decodeURIComponent(match.split('=')[1]) : null;
  };

  const QUOTES = [
    'Perceive beyond the obvious.',
    'Great things are built one focused day at a time.',
    'Today is a canvas — make something remarkable.',
    'Small steps, compounding into momentum.',
    'Clarity comes from action, not waiting.',
    'Build what you wish existed.',
    'Progress over perfection, always.',
    'The best work feels like play. Enjoy today.',
    'Focus is the new superpower — use yours well.',
    'Done is better than perfect. Ship it.',
    'Every expert was once a beginner who kept going.',
    'Calm mind, sharp focus, bold moves.',
    'Make it work, make it right, make it beautiful.',
  ];

  const showLaunchOverlay = (destination) => {
    const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    const firstName = getFirstName();

    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 9999;
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 22px; padding: 24px;
      background:
        radial-gradient(ellipse 85% 55% at 15% -5%, rgba(40,130,210,0.40) 0%, transparent 62%),
        radial-gradient(ellipse 65% 45% at 88% 12%, rgba(0,210,255,0.28) 0%, transparent 58%),
        linear-gradient(135deg, #0c2148 0%, #16386e 100%);
      opacity: 0; transition: opacity 300ms ease;
    `;

    const logo = document.createElement('img');
    logo.src = '/logo.png';
    logo.alt = 'Appercept';
    logo.style.cssText = `
      width: 72px; height: 72px; border-radius: 18px; object-fit: contain;
      padding: 10px;
      box-shadow: 0 8px 30px rgba(0,210,255,0.4);
      animation: apLaunchPop 600ms cubic-bezier(0.34,1.56,0.64,1) forwards;
    `;

    const text = document.createElement('div');
    text.style.cssText = 'text-align: center; max-width: 460px;';
    text.innerHTML = `
      <div style="font-size: 2rem; font-weight: 800; color: #fff; margin-bottom: 10px; letter-spacing: -0.01em;">
        ${firstName ? `Welcome, ${firstName}` : 'Welcome to Appercept Space'}
      </div>
      <div style="font-size: 1rem; color: rgba(232,240,248,0.78); line-height: 1.5; font-style: italic;">
        &ldquo;${quote}&rdquo;
      </div>
    `;

    const barWrap = document.createElement('div');
    barWrap.style.cssText = 'width: 200px; height: 4px; border-radius: 9999px; background: rgba(255,255,255,0.12); overflow: hidden; margin-top: 6px;';
    const bar = document.createElement('div');
    bar.style.cssText = 'height: 100%; border-radius: 9999px; background: linear-gradient(90deg,#1c75bc,#00d2ff); width: 0%; transition: width 3s linear;';
    barWrap.appendChild(bar);

    const label = document.createElement('div');
    label.style.cssText = 'font-size: 0.75rem; color: rgba(232,240,248,0.5);';
    label.textContent = 'Entering Appercept Space…';

    const styleTag = document.createElement('style');
    styleTag.textContent = `
      @keyframes apLaunchPop {
        from { transform: scale(0.6); opacity: 0; }
        to   { transform: scale(1);   opacity: 1; }
      }
    `;

    overlay.appendChild(styleTag);
    overlay.appendChild(logo);
    overlay.appendChild(text);
    overlay.appendChild(barWrap);
    overlay.appendChild(label);
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      requestAnimationFrame(() => { bar.style.width = '100%'; });
    });

    setTimeout(() => { window.location.href = destination; }, 3000);
  };

  // ── Log In button (ghost/outline style) ─────────────────────────────────────
  const loginLi = document.createElement('li');
  loginLi.style.cssText = 'display: flex; align-items: center;';
  const loginBtn = document.createElement('a');
  loginBtn.href = APP_URL;
  loginBtn.textContent = t('Admin prijava', 'Admin Login');
  loginBtn.style.cssText = `
    display: inline-flex; align-items: center;
    background: transparent;
    border: 1px solid rgba(255,255,255,0.25);
    color: #fff; padding: 7px 16px; border-radius: 7px;
    font-size: 0.85rem; font-weight: 600; cursor: pointer;
    font-family: inherit; text-decoration: none;
    transition: border-color 0.2s ease, background 0.2s ease;
  `;
  loginBtn.onmouseenter = () => { loginBtn.style.borderColor = theme.colors.accentPrimary; loginBtn.style.background = 'rgba(255,255,255,0.06)'; };
  loginBtn.onmouseleave = () => { loginBtn.style.borderColor = 'rgba(255,255,255,0.25)'; loginBtn.style.background = 'transparent'; };
  loginBtn.addEventListener('click', (e) => { e.preventDefault(); showLaunchOverlay(APP_URL); });
  loginLi.appendChild(loginBtn);
  ul.appendChild(loginLi);


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
