import { theme } from '../theme.js';

export function About() {
  const section = document.createElement('section');
  section.id = 'about';
  section.style.cssText = `padding: 100px 0;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  // Single column layout
  const textCol = document.createElement('div');
  textCol.className = 'mobile-center animate-on-scroll'; // Center on mobile
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
  p.style.cssText = `font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 30px;`;

  const stats = document.createElement('div');
  stats.className = 'flex-row animate-on-scroll';
  stats.style.cssText = `display: flex; gap: 40px; justify-content: center; width: 100%; margin-bottom: 40px;`;

  const statItems = [
    { label: 'Klijenata', val: 200, suffix: '+' },
    { label: 'Uptime', val: 99.9, suffix: '%' },
    { label: 'Projekata', val: 650, suffix: '+' }
  ];

  statItems.forEach(item => {
    const statItem = document.createElement('div');
    const val = document.createElement('div');
    // Initial value 0
    val.textContent = '0' + item.suffix;
    val.style.cssText = `font-size: 2rem; font-weight: 700; color: ${theme.colors.accentPrimary};`;

    // Animate function
    const animate = () => {
      const duration = 2000; // 2 seconds
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const current = Math.floor(progress * item.val);

        if (item.val % 1 !== 0) {
          val.textContent = (progress * item.val).toFixed(1) + item.suffix;
        } else {
          val.textContent = current + item.suffix;
        }

        if (progress < 1) requestAnimationFrame(step);
        else val.textContent = item.val + item.suffix; // Ensure final value is exact
      };
      requestAnimationFrame(step);
    };

    // Intersection Observer to trigger animation when in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      });
    });
    observer.observe(statItem);

    const label = document.createElement('div');
    label.textContent = item.label;
    label.style.cssText = `font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6;`;

    statItem.appendChild(val);
    statItem.appendChild(label);
    stats.appendChild(statItem);
  });
  textCol.appendChild(stats);

  textCol.appendChild(h2);
  textCol.appendChild(divider);
  textCol.appendChild(p);

  const imgContainer = document.createElement('div');
  imgContainer.style.cssText = `
    width: 100%;
    display: flex;
    justify-content: center;
  `;

  const placeholder = document.createElement('div');
  placeholder.className = 'fade-in-up glass-card';
  placeholder.style.cssText = `
    width: 500px; /* Smaller width */
    max-width: 80%; /* Responsive limit */
    height: 300px; /* Fixed height for placeholder */
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.3);
    font-size: 1.2rem;
    font-weight: 500;
  `;
  placeholder.textContent = 'Slika'; // Text saying "Image"

  imgContainer.appendChild(placeholder);

  container.appendChild(textCol);
  container.appendChild(imgContainer);
  section.appendChild(container);

  return section;
}
