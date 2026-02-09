
import { theme } from '../theme.js';

export function OtherServices() {
  const section = document.createElement('section');
  section.id = 'other-services';
  section.style.cssText = `padding: 100px 0; position: relative; overflow: hidden;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  // Header Text
  const header = document.createElement('div');
  header.className = 'animate-on-scroll';
  header.style.textAlign = 'center';
  header.style.marginBottom = '60px';

  const h2 = document.createElement('h2');
  h2.textContent = 'Egzosfera Ekosustav';
  h2.style.cssText = `font-size: 3rem; margin-bottom: 0px;`;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 20px auto 30px auto;
    border-radius: 2px;
  `;

  const p = document.createElement('p');
  p.textContent = "Kako bismo vam pomogli unaprijediti ostale aspekte poslovanja, nudimo i specijalizirane module koji se mogu besprijekorno integrirati u svaki Appercept paket.";
  p.style.cssText = `
    font-size: 1.1rem; 
    line-height: 1.8; 
    color: rgba(255,255,255,0.7); 
    max-width: 700px; 
    margin: 0 auto;
  `;

  header.appendChild(h2);
  header.appendChild(divider);
  header.appendChild(p);

  // Services Grid
  const servicesGrid = document.createElement('div');
  servicesGrid.style.cssText = `
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  `;

  const services = [
    "AI Asistent",
    "Glasovni Asistent",
    "Web Aplikacija",
    "Foto i Video",
    "Društvene Mreže"
  ];

  services.forEach(service => {
    const card = document.createElement('div');
    card.className = 'glass-service-card animate-on-scroll'; // We can add specific hover styles for this if needed, or inline
    card.style.cssText = `
      ${theme.styles.glass}
      padding: 24px 32px;
      border-radius: 50px; /* Pill shape */
      font-weight: 500;
      color: white;
      transition: all 0.3s ease;
      cursor: default;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid rgba(255, 255, 255, 0.05);
    `;

    card.textContent = service;

    card.onmouseenter = () => {
      card.style.background = `linear-gradient(90deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`;
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
      card.style.border = '1px solid transparent';
    };

    card.onmouseleave = () => {
      card.style.background = 'rgba(255, 255, 255, 0.02)';
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = 'none';
      card.style.border = '1px solid rgba(255, 255, 255, 0.05)';
    };

    servicesGrid.appendChild(card);
  });

  // Optional: Link button at bottom
  const btnContainer = document.createElement('div');
  btnContainer.style.cssText = `display: flex; justify-content: center; margin-top: 50px;`;

  const linkBtn = document.createElement('a');
  linkBtn.href = 'https://egzosfera.com'; // Replace with actual URL
  linkBtn.textContent = 'Posjetite Egzosferu →';
  linkBtn.style.cssText = `
    font-size: 1rem;
    color: ${theme.colors.accentPrimary};
    font-weight: 600;
    opacity: 0.8;
    transition: opacity 0.3s;
  `;
  linkBtn.onmouseenter = () => linkBtn.style.opacity = '1';
  linkBtn.onmouseleave = () => linkBtn.style.opacity = '0.8';

  btnContainer.appendChild(linkBtn);

  container.appendChild(header);
  container.appendChild(servicesGrid);
  container.appendChild(btnContainer);
  section.appendChild(container);

  return section;
}
