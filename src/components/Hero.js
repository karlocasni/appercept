
import { theme } from '../theme.js';

export function Hero() {
  const section = document.createElement('section');
  section.style.cssText = `
    min-height: 90vh;
    display: flex;
    align-items: center;
    position: relative;
    padding: 160px 0 100px 0; /* Extra top padding for fixed header */
  `;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const content = document.createElement('div');
  content.className = 'fade-in-up hero-content';
  content.style.maxWidth = '800px';

  const title = document.createElement('h1');
  title.innerHTML = `Nadmaši <span style="background: linear-gradient(90deg, #1c75bc, #00d2ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">granice spoznaje.</span>`;
  title.style.cssText = `
    font-size: 5rem;
    line-height: 1.1;
    margin-bottom: 24px;
    font-weight: 900;
  `;

  const slogan = document.createElement('p');
  slogan.textContent = "Vrhunska digitalna arhitektura za lidere suvremenog poslovanja. Besprijekorna, skalabilna i beskompromisno učinkovita.";
  slogan.style.cssText = `
    font-size: 1.5rem;
    color: rgba(255,255,255,0.7);
    margin-bottom: 40px;
    font-weight: 300;
    max-width: 600px;
  `;

  const buttonRow = document.createElement('div');
  buttonRow.className = 'hero-btn-row';
  buttonRow.style.cssText = `display: flex; gap: 20px; align-items: center;`;

  const cta = document.createElement('button');
  cta.textContent = 'Istraži projekte';
  cta.className = 'btn-primary';
  cta.onclick = () => document.getElementById('products').scrollIntoView({ behavior: 'smooth' });

  const socialLinks = document.createElement('div');
  socialLinks.style.cssText = `display: flex; gap: 15px;`;
  ['LinkedIn', 'Instagram'].forEach(net => {
    const link = document.createElement('a');
    link.href = net === 'LinkedIn' ? 'https://www.linkedin.com/company/appercept-net/?viewAsMember=true' : 'https://www.instagram.com/appercept_net/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'social-icon';
    link.title = net;

    // SVG Icons
    let svgPath = '';
    if (net === 'LinkedIn') svgPath = '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>';
    // Instagram Icon
    if (net === 'Instagram') svgPath = '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>';

    link.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>`;

    // Glass Style matching OtherServices but circular
    link.style.cssText = `
        ${theme.styles.glass}
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 50px; 
        height: 50px; 
        border-radius: 50%; 
        color: white; 
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.03); /* Ensuring base opacity matches glass tokens */
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

    socialLinks.appendChild(link);
  });

  buttonRow.appendChild(cta);
  buttonRow.appendChild(socialLinks);

  content.appendChild(title);
  content.appendChild(slogan);
  content.appendChild(buttonRow);
  container.appendChild(content);
  // Faint background logo
  const bgLogo = document.createElement('img');
  bgLogo.className = 'bg-logo-hero';
  bgLogo.src = '/logo.png';
  bgLogo.style.cssText = `
    position: absolute;
    right: 0%;
    top: 50%;
    transform: translateY(-50%) rotate(-15deg);
    width: 800px;
    height: auto;
    opacity: 0.03;
    z-index: 0;
    pointer-events: none;
    filter: grayscale(100%);
  `;

  // Ensure content is above bgLogo
  container.style.position = 'relative';
  container.style.zIndex = '1';

  section.appendChild(bgLogo);
  section.appendChild(container);

  return section;
}
