
import { theme } from '../theme.js';
import { supabase, mockProducts } from '../lib/supabase.js';
import { t } from '../lib/i18n.js';

const ProductCard = (product) => {
  const card = document.createElement('div');
  card.className = 'glass-card animate-on-scroll';
  card.style.cssText = `
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 520px;
    height: 380px;
    ${theme.styles.glass}
    border-radius: 20px;
  `;

  // Icon Area
  const imgContainer = document.createElement('div');
  imgContainer.style.height = '200px';
  imgContainer.style.display = 'flex';
  imgContainer.style.alignItems = 'center';
  imgContainer.style.justifyContent = 'center';
  imgContainer.style.background = 'rgba(255,255,255,0.02)';
  imgContainer.style.borderBottom = '1px solid rgba(255,255,255,0.05)';

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
  title.style.cssText = `font-size: 1.4rem; margin-bottom: 10px;`;

  const desc = document.createElement('p');
  desc.textContent = product.description;
  desc.style.cssText = `
    font-size: 0.95rem; 
    color: rgba(255,255,255,0.7); 
    line-height: 1.6; 
    margin-bottom: 20px;
    flex: 1;
  `;

  const footer = document.createElement('div');
  footer.style.cssText = `display: flex; justify-content: space-between; align-items: center; margin-top: auto;`;

  const price = document.createElement('span');
  price.textContent = product.price;
  price.style.cssText = `font-size: 1.2rem; font-weight: 700; color: ${theme.colors.accentPrimary};`;

  const btn = document.createElement('button');
  btn.textContent = t('Detalji', 'Details');
  btn.style.cssText = `
    background: transparent;
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    transition: all 0.3s ease;
    cursor: pointer;
  `;
  btn.onmouseenter = () => { btn.style.background = 'rgba(255,255,255,0.1)'; };
  btn.onmouseleave = () => { btn.style.background = 'transparent'; };
  btn.onclick = () => {
    if (product.title === 'ClubCrowd') {
      window.open('https://clubcrowd.app', '_blank');
    }
  };

  footer.appendChild(price);
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

  const grid = document.createElement('div');
  grid.id = 'product-grid';
  grid.style.cssText = `
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
  `;

  // Fetch logic
  const loadProducts = async () => {
    try {
      const { data, error } = await supabase.from('products').select('*');

      const productsToRender = (data && data.length > 0) ? data : mockProducts;

      if (error && !data) console.warn("Supabase fetch error (expected if no creds):", error);

      grid.innerHTML = ''; // Clear loading state
      productsToRender.forEach((item, index) => {
        const card = ProductCard(item);
        grid.appendChild(card);

        // Staggered fade-in animation without observer (more robust for dynamic content)
        setTimeout(() => {
          card.classList.add('is-visible');
        }, 100 + (index * 150));
      });
    } catch (err) {
      console.error("Error loading products:", err);
      // Fallback to mocks
      grid.innerHTML = '';
      mockProducts.forEach((item, index) => {
        const card = ProductCard(item);
        grid.appendChild(card);

        // Staggered fade-in
        setTimeout(() => {
          card.classList.add('is-visible');
        }, 100 + (index * 150));
      });
    }
  };

  // Initial loading state
  grid.innerHTML = `<p style="text-align:center; color: #666;">${t('Učitavanje projekata...', 'Loading projects...')}</p>`;

  // Trigger load
  loadProducts();

  container.appendChild(header);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}
