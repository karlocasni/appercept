import { theme } from '../theme.js';
import { t } from '../lib/i18n.js';

export function About() {
  const section = document.createElement('section');
  section.id = 'about';
  section.style.cssText = `
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  `;

  const container = document.createElement('div');
  container.style.cssText = `
    ${theme.styles.container}
    position: relative;
    z-index: 2;
  `;

  // Top Intro Header
  const header = document.createElement('div');
  header.className = 'animate-on-scroll';
  header.style.cssText = `
    text-align: center;
    max-width: 800px;
    margin: 0 auto 60px auto;
  `;

  const h2 = document.createElement('h2');
  h2.textContent = t('O nama', 'About Us');
  h2.style.cssText = `font-size: 3rem; margin-bottom: 20px; font-weight: 700;`;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 0 auto 30px auto;
    border-radius: 2px;
  `;

  const p = document.createElement('p');
  p.textContent = t(
    "Appercept je tehnološki studio posvećen stvaranju inteligentnih digitalnih rješenja. Gradimo naprednu digitalnu infrastrukturu koja spaja viziju u oblaku s konkretnim rezultatima u stvarnosti.",
    "Appercept is a technology studio dedicated to building intelligent digital solutions. We create advanced digital infrastructure that bridges cloud vision with concrete real-world results."
  );
  p.style.cssText = `
    font-size: 1.15rem; 
    line-height: 1.8; 
    color: rgba(255, 255, 255, 0.75); 
    margin: 0;
  `;

  header.appendChild(h2);
  header.appendChild(divider);
  header.appendChild(p);
  container.appendChild(header);

  // Pillars Grid (Mission, Goal, Motto)
  const grid = document.createElement('div');
  grid.className = 'about-grid';
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  `;

  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    @media (max-width: 968px) {
      .about-grid {
        grid-template-columns: 1fr !important;
        gap: 30px !important;
      }
    }
  `;
  section.appendChild(styleTag);

  const pillars = [
    {
      title: t('Naša Misija', 'Our Mission'),
      desc: t(
        'Pretvoriti kompleksnost podataka i poslovnih procesa u besprijekornu, intuitivnu automatizaciju koja štedi vrijeme i resurse.',
        'To transform the complexity of data and business processes into seamless, intuitive automation that saves time and resources.'
      ),
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>`
    },
    {
      title: t('Naš Cilj', 'Our Goal'),
      desc: t(
        'Izgraditi digitalnu infrastrukturu nevidljive prisutnosti koja omogućava tvrtkama svih veličina da rastu autonomno i bez napora.',
        'To build digital infrastructure of invisible presence that enables businesses of all sizes to grow autonomously and effortlessly.'
      ),
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>`
    },
    {
      title: t('Naš Moto', 'Our Motto'),
      desc: t(
        '"Vizija u oblaku, rezultati u stvarnosti." Težimo izvrsnosti u dizajnu i razvoju kako bismo osigurali stabilnost i vrhunsko korisničko iskustvo.',
        '"Vision in the cloud, results in reality." We strive for excellence in design and development to ensure stability and premium user experience.'
      ),
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`
    }
  ];

  pillars.forEach(pillar => {
    const card = document.createElement('div');
    card.className = 'glass-card animate-on-scroll';
    card.style.cssText = `
      ${theme.styles.glass}
      border-radius: 20px;
      padding: 36px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.3s ease;
    `;
    card.onmouseenter = () => {
      card.style.transform = 'translateY(-5px)';
      card.style.borderColor = theme.colors.accentPrimary;
      card.style.boxShadow = '0 35px 60px -10px rgba(0, 0, 0, 0.8), 0 0 60px 0 rgba(28, 117, 188, 0.15)';
    };
    card.onmouseleave = () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      card.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px 0 rgba(28, 117, 188, 0.05)';
    };

    // Icon Circle
    const iconBox = document.createElement('div');
    iconBox.style.cssText = `
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(28, 117, 188, 0.1);
      border: 1px solid rgba(28, 117, 188, 0.25);
      color: ${theme.colors.accentPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
    `;
    iconBox.innerHTML = pillar.icon;

    const pTitle = document.createElement('h3');
    pTitle.textContent = pillar.title;
    pTitle.style.cssText = `
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 12px;
      color: white;
    `;

    const pDesc = document.createElement('p');
    pDesc.textContent = pillar.desc;
    pDesc.style.cssText = `
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    `;

    card.appendChild(iconBox);
    card.appendChild(pTitle);
    card.appendChild(pDesc);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
