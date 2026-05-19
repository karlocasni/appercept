import { theme } from '../theme.js';
import { t } from '../lib/i18n.js';

export function Founders() {
  const section = document.createElement('section');
  section.id = 'founders';
  section.style.cssText = `
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  `;

  // Background glow effect
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: absolute;
    bottom: -10%;
    right: -10%;
    width: 450px;
    height: 450px;
    background: radial-gradient(circle, rgba(43, 57, 144, 0.15) 0%, rgba(28, 117, 188, 0.05) 50%, transparent 100%);
    filter: blur(90px);
    z-index: 1;
    pointer-events: none;
  `;
  section.appendChild(glow);

  const container = document.createElement('div');
  container.style.cssText = `
    ${theme.styles.container}
    position: relative;
    z-index: 2;
  `;

  // Section Header
  const header = document.createElement('div');
  header.className = 'animate-on-scroll';
  header.style.cssText = `
    text-align: center;
    margin-bottom: 60px;
  `;

  const subtitle = document.createElement('span');
  subtitle.textContent = t('NAŠ TIM', 'OUR TEAM');
  subtitle.style.cssText = `
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${theme.colors.accentPrimary};
    margin-bottom: 12px;
    display: block;
  `;

  const title = document.createElement('h2');
  title.textContent = t('Upoznajte Osnivače', 'Meet the Founders');
  title.style.cssText = `
    font-size: 3rem;
    font-weight: 700;
    margin: 0;
  `;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 20px auto 0 auto;
    border-radius: 2px;
  `;

  header.appendChild(subtitle);
  header.appendChild(title);
  header.appendChild(divider);
  container.appendChild(header);

  // Founders Grid
  const grid = document.createElement('div');
  grid.className = 'founders-grid';
  grid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  `;

  // Responsive Styles
  const styleTag = document.createElement('style');
  styleTag.innerHTML = `
    @media (max-width: 968px) {
      .founders-grid {
        grid-template-columns: 1fr !important;
        gap: 40px !important;
      }
    }
  `;
  section.appendChild(styleTag);

  const foundersData = [
    {
      name: 'Karlo Časni',
      role: t('Suosnivač', 'Co-Founder'),
      initials: 'KČ',
      bio: t(
        'Specijaliziran za razvoj poslovanja, AI strategiju i vođenje kompleksnih softverskih projekata od ideje do realizacije.',
        'Specialized in business development, AI strategy, and leading complex software projects from concept to execution.'
      )
    },
    {
      name: 'Gašpar Bodulica',
      role: t('Suosnivač', 'Co-Founder'),
      initials: 'GB',
      bio: t(
        'Fokusiran na operativnu izvrsnost, optimizaciju procesa i besprijekornu isporuku rješenja za naše klijente.',
        'Focused on operational excellence, process optimization, and seamless delivery of solutions for our clients.'
      )
    },
    {
      name: 'Bruno Vujčec',
      role: t('Suosnivač', 'Co-Founder'),
      initials: 'BV',
      bio: t(
        'Usmjeren na tehnički razvoj, arhitekturu sustava i primjenu AI tehnologija za rješavanje stvarnih poslovnih izazova.',
        'Focused on technical development, system architecture, and applying AI technologies to solve real-world business challenges.'
      )
    }
  ];

  foundersData.forEach(founder => {
    const card = document.createElement('div');
    card.className = 'glass-card animate-on-scroll';
    card.style.cssText = `
      ${theme.styles.glass}
      border-radius: 20px;
      padding: 40px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s ease;
    `;
    card.onmouseenter = () => {
      card.style.transform = 'translateY(-6px)';
      card.style.borderColor = theme.colors.accentPrimary;
      card.style.boxShadow = '0 15px 35px rgba(28, 117, 188, 0.15)';
    };
    card.onmouseleave = () => {
      card.style.transform = 'translateY(0)';
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      card.style.boxShadow = 'none';
    };

    // Avatar Circle
    const avatar = document.createElement('div');
    avatar.style.cssText = `
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 24px;
      border: 2px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 24px rgba(28, 117, 188, 0.3);
    `;

    const placeholderSvg = document.createElement('div');
    placeholderSvg.style.cssText = `display: flex; align-items: center; justify-content: center;`;
    placeholderSvg.innerHTML = `
      <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.9;">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    `;
    avatar.appendChild(placeholderSvg);

    // Name
    const nameEl = document.createElement('h3');
    nameEl.textContent = founder.name;
    nameEl.style.cssText = `
      font-size: 1.4rem;
      font-weight: 700;
      margin-bottom: 6px;
      color: white;
      text-align: center;
    `;

    // Role
    const roleEl = document.createElement('span');
    roleEl.textContent = founder.role;
    roleEl.style.cssText = `
      font-size: 0.9rem;
      font-weight: 600;
      color: ${theme.colors.accentPrimary};
      margin-bottom: 20px;
      text-transform: uppercase;
      letter-spacing: 1px;
      text-align: center;
    `;

    // Bio
    const bioEl = document.createElement('p');
    bioEl.textContent = founder.bio;
    bioEl.style.cssText = `
      font-size: 0.95rem;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
      margin: 0;
    `;

    card.appendChild(avatar);
    card.appendChild(nameEl);
    card.appendChild(roleEl);
    card.appendChild(bioEl);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
