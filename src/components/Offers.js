
import { theme } from '../theme.js';
import { supabase, mockOffers } from '../lib/supabase.js';

export function Offers() {
  const section = document.createElement('section');
  section.id = 'offers';
  section.style.cssText = `padding: 80px 0; position: relative;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const wrapper = document.createElement('div');
  wrapper.className = 'glass-card';
  wrapper.style.cssText = `
    ${theme.styles.glass}
    padding: 60px 40px;
    border-radius: 30px;
    text-align: center;
    background: linear-gradient(135deg, rgba(28, 117, 188, 0.05), rgba(43, 57, 144, 0.05));
  `;

  const h2 = document.createElement('h2');
  h2.textContent = 'Eskluzivna ponuda';
  h2.style.cssText = `font-size: 2.5rem; margin-bottom: 20px;`;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 0 auto 50px auto;
    border-radius: 2px;
  `;

  const offersGrid = document.createElement('div');
  offersGrid.style.cssText = `
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    align-items: stretch;
  `;

  // Responsive check
  const mediaQuery = window.matchMedia('(max-width: 900px)');
  const handleResize = (e) => {
    if (e.matches) {
      offersGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
    } else {
      offersGrid.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
  };
  mediaQuery.addListener(handleResize);
  handleResize(mediaQuery); // Initial call

  const loadOffers = async () => {
    try {
      const { data, error } = await supabase.from('offers').select('*');
      // Ensure we have features array even if DB returns strings (fallback handling)
      const offersData = (data && data.length > 0) ? data : mockOffers;

      if (error && !data) console.warn("Supabase offer fetch error:", error);

      offersGrid.innerHTML = '';
      offersData.forEach(offer => {
        const item = document.createElement('div');
        item.style.cssText = `
          border: 1px solid rgba(255,255,255,0.08);
          padding: 30px 20px;
          border-radius: 20px;
          background: rgba(0,0,0,0.3);
          display: flex;
          flex-direction: column;
          transition: transform 0.3s ease;
          position: relative;
          overflow: hidden;
        `;

        item.onmouseenter = () => {
          item.style.transform = 'translateY(-5px)';
          item.style.background = 'rgba(255,255,255,0.03)';
          item.style.borderColor = theme.colors.accentPrimary;
        };
        item.onmouseleave = () => {
          item.style.transform = 'translateY(0)';
          item.style.background = 'rgba(0,0,0,0.3)';
          item.style.borderColor = 'rgba(255,255,255,0.08)';
        };

        // Title
        const title = document.createElement('h3');
        title.textContent = offer.title;
        title.style.cssText = `
            font-size: 1.2rem; 
            margin-bottom: 20px; 
            color: ${theme.colors.accentPrimary};
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 1px;
        `;

        // Checkmark List
        const list = document.createElement('ul');
        list.style.cssText = `
            list-style: none;
            padding: 0;
            margin: 0 0 30px 0;
            text-align: left;
            flex-grow: 1;
        `;

        const features = Array.isArray(offer.features) ? offer.features : [offer.features || "Standard feature"];

        features.forEach(feat => {
          const li = document.createElement('li');
          li.style.cssText = `
                display: flex;
                align-items: flex-start;
                margin-bottom: 12px;
                font-size: 1.05rem; /* Increased for better readability */
                color: rgba(255,255,255,0.8);
                line-height: 1.5;
            `;

          // Custom checkmark SVG
          const check = document.createElement('span');
          check.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="${theme.colors.accentPrimary}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            `;
          check.style.marginRight = '10px';
          check.style.marginTop = '2px';

          const text = document.createElement('span');
          text.textContent = feat;

          li.appendChild(check);
          li.appendChild(text);
          list.appendChild(li);
        });

        // Separator
        const hr = document.createElement('div');
        hr.style.cssText = `height: 1px; background: rgba(255,255,255,0.1); margin-bottom: 20px; width: 100%;`;

        // Price
        const price = document.createElement('div');
        price.textContent = offer.price || offer.discount;
        price.style.cssText = `
          font-size: 1.5rem;
          font-weight: 800;
          color: white;
          margin-top: auto;
        `;

        item.appendChild(title);
        item.appendChild(list);
        item.appendChild(hr);
        item.appendChild(price);
        offersGrid.appendChild(item);
      });

    } catch (err) {
      console.error(err);
    }
  };

  loadOffers();

  wrapper.appendChild(h2);
  wrapper.appendChild(divider);
  wrapper.appendChild(offersGrid);
  container.appendChild(wrapper);
  section.appendChild(container);

  return section;
}
