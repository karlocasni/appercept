
import { theme } from '../theme.js';

export function About() {
  const section = document.createElement('section');
  section.id = 'about';
  section.style.cssText = `padding: 100px 0;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  // Grid layout
  const grid = document.createElement('div');
  grid.className = 'responsive-grid';
  grid.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
  `;

  // Text Content
  const textCol = document.createElement('div');
  textCol.className = 'mobile-center'; // Center on mobile

  const h2 = document.createElement('h2');
  h2.textContent = 'O nama';
  h2.style.cssText = `font-size: 3rem; margin-bottom: 20px;`;

  const divider = document.createElement('div');
  divider.className = 'mobile-divider-center'; // Helper class for centering margin on mobile? 
  // actually, mobile-center class centers text-align. Divider is a block. Needs margin: 0 auto on mobile.
  // Let's just style it inline with a class reference or similar.
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 0 0 30px 0;
    border-radius: 2px;
  `;

  // We need to inject a style to handle the margin change for the divider on mobile if the parent is mobile-center
  // Or I can add a specific class for this divider.

  const p = document.createElement('p');
  p.textContent = "Gradimo digitalnu infrastrukturu nevidljive prisutnosti i apsolutne moći. Vizija u oblaku, rezultati u stvarnosti. Naša je misija pretvoriti kompleksnost podataka u besprijekornu ljudsku intuiciju.";
  p.style.cssText = `font-size: 1.1rem; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 30px;`;

  const stats = document.createElement('div');
  stats.className = 'flex-row';
  stats.style.cssText = `display: flex; gap: 40px;`;

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

        // Handle float for uptime if needed, but simple integer counting is usually cleaner. 
        // For 99.9, we might want special handling or just jump to it. 
        // Let's keep it simple: if val is float, show fixed.
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

  textCol.appendChild(h2);
  textCol.appendChild(divider);
  textCol.appendChild(p);
  textCol.appendChild(stats);

  // Visual Content (Glass Card)
  const visualCol = document.createElement('div');
  visualCol.className = 'glass-card';
  visualCol.style.height = '400px';
  visualCol.style.display = 'flex';
  visualCol.style.alignItems = 'center';
  visualCol.style.justifyContent = 'center';
  visualCol.style.position = 'relative';
  visualCol.style.overflow = 'hidden';

  const circle = document.createElement('div');
  circle.style.cssText = `
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: linear-gradient(135deg, ${theme.colors.accentPrimary}, transparent);
    animation: float 6s infinite ease-in-out;
  `;
  visualCol.appendChild(circle);

  grid.appendChild(textCol);
  grid.appendChild(visualCol);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
