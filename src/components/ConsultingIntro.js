import { theme } from '../theme.js';
import { t } from '../lib/i18n.js';

export function ConsultingIntro() {
  const section = document.createElement('section');
  section.id = 'consulting-intro';
  section.style.cssText = `
    padding: 100px 0;
    position: relative;
    overflow: hidden;
  `;

  // Background glow effect
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: absolute;
    top: 50%;
    left: -10%;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(28, 117, 188, 0.15) 0%, rgba(43, 57, 144, 0.05) 50%, transparent 100%);
    filter: blur(80px);
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

  const grid = document.createElement('div');
  grid.style.cssText = `
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 60px;
    align-items: center;
  `;

  // Media queries responsive handling
  const mediaStyle = document.createElement('style');
  mediaStyle.innerHTML = `
    @media (max-width: 968px) {
      #consulting-intro .grid-layout {
        grid-template-columns: 1fr !important;
        gap: 40px !important;
      }
    }
  `;
  grid.className = 'grid-layout';
  section.appendChild(mediaStyle);

  // Left Column - Text Block
  const leftCol = document.createElement('div');
  leftCol.className = 'animate-on-scroll';
  leftCol.style.cssText = `
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `;

  const subtitle = document.createElement('span');
  subtitle.textContent = t('AI KONZULTACIJE', 'AI CONSULTING');
  subtitle.style.cssText = `
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 2px;
    color: ${theme.colors.accentPrimary};
    margin-bottom: 12px;
  `;

  const title = document.createElement('h2');
  title.textContent = t('Transformirajte poslovanje uz AI rješenja', 'Transform Your Business with AI Solutions');
  title.style.cssText = `
    font-size: 2.8rem;
    line-height: 1.2;
    margin-bottom: 20px;
    font-weight: 700;
  `;

  const desc = document.createElement('p');
  desc.textContent = t(
    'Pomažemo tvrtkama prepoznati i uspješno implementirati napredna AI rješenja. Analiziramo vaše poslovne procese te dizajniramo i razvijamo prilagođene strategije koje štede stotine radnih sati, automatiziraju ponavljajuće zadatke i stvaraju nove izvore prihoda.',
    'We help companies identify and successfully implement advanced AI solutions. We analyze your business processes and design custom strategies that save hundreds of working hours, automate repetitive tasks, and unlock new revenue streams.'
  );
  desc.style.cssText = `
    font-size: 1.1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 32px;
  `;

  const ctaBtn = document.createElement('a');
  ctaBtn.href = '/consulting.html';
  ctaBtn.textContent = t('Saznajte više o konzultacijama →', 'Learn More About Consulting →');
  ctaBtn.style.cssText = `
    background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
    color: white;
    padding: 14px 36px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(28, 117, 188, 0.4);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  `;
  ctaBtn.onmouseenter = () => {
    ctaBtn.style.transform = 'translateY(-3px) scale(1.03)';
    ctaBtn.style.boxShadow = '0 6px 20px rgba(43, 57, 144, 0.6)';
    ctaBtn.style.filter = 'brightness(1.1)';
  };
  ctaBtn.onmouseleave = () => {
    ctaBtn.style.transform = 'translateY(0) scale(1)';
    ctaBtn.style.boxShadow = '0 4px 15px rgba(28, 117, 188, 0.4)';
    ctaBtn.style.filter = 'brightness(1)';
  };

  leftCol.appendChild(subtitle);
  leftCol.appendChild(title);
  leftCol.appendChild(desc);
  leftCol.appendChild(ctaBtn);

  // Right Column - Highlight Cards
  const rightCol = document.createElement('div');
  rightCol.style.cssText = `
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const highlights = [
    {
      title: t('AI Audit & Strategija', 'AI Audit & Strategy'),
      desc: t('Dubinska analiza vaših procesa i izrada jasnog plana za AI integraciju.', 'In-depth analysis of your processes and building a clear roadmap for AI integration.'),
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`
    },
    {
      title: t('Prilagođeni AI Agenti', 'Custom AI Agents'),
      desc: t('Dizajn i razvoj inteligentnih voice i chat botova treniranih na vašim podacima.', 'Design and development of intelligent voice and chat bots trained on your data.'),
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M12 2v9M8 5h8"/></svg>`
    },
    {
      title: t('Automatizacija procesa', 'Process Automation'),
      desc: t('Integracija alata i sustava za eliminaciju ručnih i ponavljajućih zadataka.', 'Integration of tools and systems to eliminate manual and repetitive workflows.'),
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:24px;height:24px;"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`
    }
  ];

  highlights.forEach((h, index) => {
    const card = document.createElement('div');
    card.className = 'glass-card animate-on-scroll';
    card.style.cssText = `
      ${theme.styles.glass}
      border-radius: 16px;
      padding: 24px;
      display: flex;
      gap: 20px;
      align-items: flex-start;
      transition: all 0.3s ease;
    `;
    card.onmouseenter = () => {
      card.style.transform = 'translateX(6px)';
      card.style.borderColor = theme.colors.accentPrimary;
      card.style.background = 'rgba(255, 255, 255, 0.05)';
    };
    card.onmouseleave = () => {
      card.style.transform = 'translateX(0)';
      card.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      card.style.background = 'rgba(255, 255, 255, 0.03)';
    };

    const iconBox = document.createElement('div');
    iconBox.style.cssText = `
      background: rgba(28, 117, 188, 0.1);
      border: 1px solid rgba(28, 117, 188, 0.25);
      border-radius: 12px;
      padding: 12px;
      color: ${theme.colors.accentPrimary};
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    iconBox.innerHTML = h.icon;

    const info = document.createElement('div');
    
    const hTitle = document.createElement('h3');
    hTitle.textContent = h.title;
    hTitle.style.cssText = `
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 6px;
      color: white;
    `;

    const hDesc = document.createElement('p');
    hDesc.textContent = h.desc;
    hDesc.style.cssText = `
      font-size: 0.95rem;
      line-height: 1.5;
      color: rgba(255, 255, 255, 0.55);
    `;

    info.appendChild(hTitle);
    info.appendChild(hDesc);

    card.appendChild(iconBox);
    card.appendChild(info);

    rightCol.appendChild(card);
  });

  grid.appendChild(leftCol);
  grid.appendChild(rightCol);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
