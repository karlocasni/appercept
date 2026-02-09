
import { theme } from '../theme.js';

export function Header() {
  const header = document.createElement('header');

  const style = `
    position: sticky;
    top: 0;
    z-index: 1000;
    width: 100%;
    padding: 20px 0;
    transition: all 0.3s ease;
  `;

  header.style.cssText = style;

  // Glass background for header (we apply it to a container inside or the header itself on scroll)
  // For now, let's make the whole header glassy
  header.style.background = 'rgba(17, 17, 17, 0.7)';
  header.style.backdropFilter = 'blur(12px)';
  header.style.borderBottom = `1px solid ${theme.colors.glassBorder}`;

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
  ul.style.cssText = `list-style: none; padding: 0; display: flex; gap: 30px;`;

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
    { name: 'O nama', href: '#about' },
    { name: 'Projekti', href: '#products' },
    { name: 'Kontakt', href: '#contact' }
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

  nav.appendChild(ul);

  container.appendChild(logo);
  container.appendChild(hamburger); // Add hamburger
  container.appendChild(nav);
  header.appendChild(container);

  return header;
}
