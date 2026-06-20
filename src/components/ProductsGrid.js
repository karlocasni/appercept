
import { theme } from '../theme.js';
import { mockProducts } from '../lib/supabase.js';
import { t } from '../lib/i18n.js';

const ProductCard = (product) => {
  const card = document.createElement('div');
  card.className = 'project-card animate-on-scroll';
  card.style.cssText = ``;

  // Icon Area
  const imgContainer = document.createElement('div');
  imgContainer.style.height = '200px';
  imgContainer.style.display = 'flex';
  imgContainer.style.alignItems = 'center';
  imgContainer.style.justifyContent = 'center';
  imgContainer.style.background = 'transparent';
  imgContainer.style.borderBottom = 'none';

  if (product.image) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'subtle-jump-animation';
    imgWrapper.style.cssText = `
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const img = document.createElement('img');
    img.src = product.image;
    img.style.cssText = `
        max-width: 70%;
        max-height: 70%;
        object-fit: contain;
        transition: transform 0.3s ease;
      `;
    imgWrapper.appendChild(img);
    imgContainer.appendChild(imgWrapper);

    card.onmouseenter = () => {
      img.style.transform = 'scale(1.05)';
    };
    card.onmouseleave = () => {
      img.style.transform = 'scale(1)';
    };
  } else if (product.icon) {
    const iconWrapper = document.createElement('div');
    iconWrapper.style.cssText = `
        width: 100px;
        height: 100px;
        color: ${theme.colors.accentPrimary};
        filter: drop-shadow(0 0 15px ${theme.colors.accentPrimary}60);
        transition: transform 0.3s ease;
      `;
    iconWrapper.innerHTML = product.icon;
    imgContainer.appendChild(iconWrapper);

    // Hover effect for card to animate icon
    card.onmouseenter = () => {
      iconWrapper.style.transform = 'scale(1.1)';
    };
    card.onmouseleave = () => {
      iconWrapper.style.transform = 'scale(1)';
    };
  }

  // Content
  const content = document.createElement('div');
  content.style.padding = '24px';
  content.style.flex = '1';
  content.style.display = 'flex';
  content.style.flexDirection = 'column';

  const title = document.createElement('h3');
  title.textContent = product.title;
  title.style.cssText = `font-size: 1.4rem; margin-bottom: 10px; text-align: center;`;

  const desc = document.createElement('p');
  desc.innerHTML = product.description;
  desc.style.cssText = `
    font-size: 0.95rem; 
    color: rgba(255,255,255,0.7); 
    line-height: 1.6; 
    margin-bottom: 20px;
    flex: 1;
    text-align: center;
  `;

  const footer = document.createElement('div');
  footer.style.cssText = `display: flex; justify-content: center; align-items: center; margin-top: auto;`;

  const btn = document.createElement('button');
  btn.textContent = t('Više informacija →', 'More Information →');
  btn.style.cssText = `
    background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
    border: none;
    color: white;
    padding: 12px 48px;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.05rem;
    transition: all 0.3s ease;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(28, 117, 188, 0.4);
  `;
  btn.onmouseenter = () => {
    btn.style.transform = 'translateY(-2px) scale(1.05)';
    btn.style.boxShadow = '0 6px 20px rgba(43, 57, 144, 0.6)';
    btn.style.filter = 'brightness(1.15)';
  };
  btn.onmouseleave = () => {
    btn.style.transform = 'translateY(0) scale(1)';
    btn.style.boxShadow = '0 4px 15px rgba(28, 117, 188, 0.4)';
    btn.style.filter = 'brightness(1)';
  };
  btn.onclick = () => {
    if (product.title === 'ClubCrowd') {
      window.open('https://clubcrowd.app', '_blank');
    } else if (product.title === 'NemaNeide') {
      window.open('https://nemaneide.com', '_blank');
    } else if (product.title === 'Projekt90') {
      window.open('https://projekt90.nemaneide.com', '_blank');
    }
  };

  footer.appendChild(btn);

  content.appendChild(title);
  content.appendChild(desc);
  content.appendChild(footer);

  card.appendChild(imgContainer);
  card.appendChild(content);

  return card;
};

export function ProductsGrid() {
  const section = document.createElement('section');
  section.id = 'products';
  section.style.cssText = `padding: 100px 0;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  /* Helper for dividers */
  const createDivider = () => {
    const div = document.createElement('div');
    div.style.cssText = `
        width: 80px;
        height: 4px;
        background: ${theme.colors.accentPrimary};
        margin: 20px auto 30px auto;
        border-radius: 2px;
      `;
    return div;
  };

  const header = document.createElement('div');
  header.className = 'animate-on-scroll';
  header.style.marginBottom = '60px';
  header.style.textAlign = 'center';

  const h2 = document.createElement('h2');
  h2.textContent = t('Naši projekti', 'Our Projects');
  h2.style.cssText = `font-size: 3rem; margin-bottom: 0;`; // Remove bottom margin to fit divider

  const p = document.createElement('p');
  p.textContent = t('Neograničena mreža sustava i platformi, iskrojenih za maksimalnu učinkovitost, neovisno o opsegu vaših ciljeva.', 'An unlimited network of systems and platforms, tailored for maximum efficiency, regardless of the scope of your goals.');
  p.style.cssText = `color: rgba(255,255,255,0.6); font-size: 1.1rem; max-width: 700px; margin: 0 auto; line-height: 1.6;`;

  header.appendChild(h2);
  header.appendChild(createDivider()); // Add Divider
  header.appendChild(p);

  const cardWrap = document.createElement('div');
  cardWrap.style.cssText = `display:flex;justify-content:center;`;

  const card = ProductCard(mockProducts[0]);
  card.style.cssText += `max-width:420px;width:100%;`;
  setTimeout(() => { card.classList.add('is-visible'); }, 100);
  cardWrap.appendChild(card);

  container.appendChild(header);
  container.appendChild(cardWrap);
  section.appendChild(container);

  return section;
}
