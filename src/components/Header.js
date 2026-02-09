
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

  const links = [
    { name: 'O nama', href: '#about' },
    { name: 'Projekti', href: '#products' },
    { name: 'Ponuda', href: '#offers' },
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

    // Close menu on click (mobile)
    a.onclick = () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
        document.body.style.overflow = '';
      }
    };

    li.appendChild(a);
    ul.appendChild(li);
  });

  nav.appendChild(ul);

  // Toggle Logic
  hamburger.onclick = () => {
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
      document.body.style.overflow = 'hidden'; // Lock scroll
    } else {
      document.body.style.overflow = '';
    }
  };

  container.appendChild(logo);
  container.appendChild(hamburger); // Add hamburger
  container.appendChild(nav);
  header.appendChild(container);

  return header;
}
