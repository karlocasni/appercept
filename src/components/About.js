import { theme } from '../theme.js';

export function About() {
  const section = document.createElement('section');
  section.id = 'about';
  section.style.cssText = `padding: 100px 0;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  // Single column layout
  const textCol = document.createElement('div');
  textCol.className = 'mobile-center'; // Center on mobile
  textCol.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
  `;

  const h2 = document.createElement('h2');
  h2.textContent = 'O nama';
  h2.style.cssText = `font-size: 3rem; margin-bottom: 20px;`;

  const divider = document.createElement('div');
  divider.className = 'mobile-divider-center';
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 0 auto 30px auto;
    border-radius: 2px;
  `;

  const p = document.createElement('p');
  p.textContent = "Gradimo digitalnu infrastrukturu nevidljive prisutnosti i apsolutne moći. Vizija u oblaku, rezultati u stvarnosti. Naša je misija pretvoriti kompleksnost podataka u besprijekornu ljudsku intuiciju.";
  p.style.cssText = `font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.8);`;

  textCol.appendChild(h2);
  textCol.appendChild(divider);
  textCol.appendChild(p);

  container.appendChild(textCol);
  section.appendChild(container);

  return section;
}
