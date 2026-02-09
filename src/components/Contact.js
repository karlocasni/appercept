
import { theme } from '../theme.js';

export function Contact() {
  const section = document.createElement('section');
  section.id = 'contact';
  section.style.cssText = `padding: 100px 0;`;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const grid = document.createElement('div');
  grid.className = 'responsive-grid';
  grid.style.cssText = `
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center; /* Centered vertically */
  `;

  // Info
  const info = document.createElement('div');
  info.className = 'mobile-center animate-on-scroll'; // Center on mobile

  const h2 = document.createElement('h2');
  h2.textContent = "Gradimo budućnost zajedno";
  h2.style.cssText = `font-size: 3rem; margin-bottom: 0px;`;

  const divider = document.createElement('div');
  divider.style.cssText = `
    width: 80px;
    height: 4px;
    background: ${theme.colors.accentPrimary};
    margin: 20px 0 30px 0; /* Left aligned by default */
    border-radius: 2px;
  `;

  const p = document.createElement('p');
  p.textContent = "Spremni za nadogradnju vaše infrastrukture? Kontaktirajte naš tim stručnjaka.";
  p.style.cssText = `font-size: 1.1rem; opacity: 0.7; margin-bottom: 40px;`;

  // Contact Details
  const contactDetails = document.createElement('div');
  contactDetails.style.marginTop = '40px';

  const details = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>`,
      text: 'kontakt@appercept.net'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>`,
      text: 'Ul. Roberta F. Mihanovića 9, Zagreb'
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="${theme.colors.accentPrimary}" stroke="none"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.35-.63.24-1.01-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3.3 3 4.24 3 5.37c0 8.07 6.53 14.6 14.6 14.6 1.13 0 2.07-.65 2.07-1.19v-3.81c0-.55-.45-1-.99-1H20.01z"></path></svg>`,
      text: '+385 91 9545 128'
    }
  ];

  details.forEach(det => {
    const row = document.createElement('div');
    row.className = 'flex-row'; // Use general utility
    row.style.cssText = `display: flex; align-items: center; gap: 15px; margin-bottom: 20px; font-size: 1.05rem; opacity: 0.9;`;

    const iconSpan = document.createElement('span');
    iconSpan.innerHTML = det.icon;
    iconSpan.style.display = 'flex';

    // Create Link
    const link = document.createElement('a');
    link.textContent = det.text;
    link.style.color = 'inherit';
    link.style.textDecoration = 'none';
    link.style.transition = 'color 0.3s';

    // Determine href
    if (det.text.includes('@')) link.href = `mailto:${det.text}`;
    else if (det.text.includes('+')) link.href = `tel:${det.text.replace(/\s/g, '')}`;
    else link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(det.text)}`;

    link.onmouseenter = () => link.style.color = theme.colors.accentPrimary;
    link.onmouseleave = () => link.style.color = 'inherit';

    row.appendChild(iconSpan);
    row.appendChild(link);
    contactDetails.appendChild(row);
  });

  info.appendChild(h2);
  info.appendChild(divider);
  info.appendChild(p);
  info.appendChild(contactDetails);

  // Form
  const formCard = document.createElement('form');
  formCard.className = 'glass-card animate-on-scroll';
  formCard.style.cssText = `
    ${theme.styles.glass}
    padding: 40px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;

  const inputStyle = `
    width: 100%;
    padding: 16px;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    color: white;
    font-size: 1rem;
    font-family: ${theme.fonts.primary};
    transition: border-color 0.3s;
  `;

  ['Ime', 'Email'].forEach(placeholder => {
    const input = document.createElement('input');
    input.type = placeholder === 'Email' ? 'email' : 'text';
    input.placeholder = placeholder;
    input.style.cssText = inputStyle;
    input.onfocus = () => { input.style.borderColor = theme.colors.accentPrimary; };
    input.onblur = () => { input.style.borderColor = 'rgba(255,255,255,0.1)'; };
    formCard.appendChild(input);
  });

  const textarea = document.createElement('textarea');
  textarea.placeholder = "Recite nam više o vašem projektu...";
  textarea.rows = 5;
  textarea.style.cssText = inputStyle;
  textarea.onfocus = () => { textarea.style.borderColor = theme.colors.accentPrimary; };
  textarea.onblur = () => { textarea.style.borderColor = 'rgba(255,255,255,0.1)'; };
  formCard.appendChild(textarea);

  const btn = document.createElement('button');
  btn.textContent = 'Pošalji poruku';
  btn.className = 'btn-primary';
  btn.style.marginTop = '10px';
  btn.type = 'submit';

  formCard.onsubmit = (e) => {
    e.preventDefault();
    btn.textContent = 'Poslano!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = 'Pošalji poruku';
      btn.style.background = ''; // reset to default class style
      formCard.reset();
    }, 3000);
  };

  formCard.appendChild(btn);

  grid.appendChild(info);
  grid.appendChild(formCard);
  container.appendChild(grid);
  section.appendChild(container);

  return section;
}

export function Footer() {
  const footer = document.createElement('footer');
  footer.style.cssText = `
        padding: 80px 0 40px;
        background: rgba(0,0,0,0.4);
        border-top: 1px solid rgba(255,255,255,0.05);
        margin-top: auto;
    `;

  const container = document.createElement('div');
  container.style.cssText = theme.styles.container;

  const grid = document.createElement('div');
  grid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 40px;
        margin-bottom: 60px;
        align-items: center; /* Center items vertically */
        justify-content: center; /* Center grid items horizontally if they don't fill row */
    `;

  // 1. Navigation
  const navCol = document.createElement('div');
  navCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`; // Center items
  const navTitle = document.createElement('h4');
  navTitle.textContent = 'Navigacija';
  navTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;
  const navUl = document.createElement('ul');
  navUl.style.cssText = `list-style: none; padding: 0; text-align: center;`; // Text align center for list

  [
    { name: 'O nama', href: '#about' },
    { name: 'Projekti', href: '#products' },
    { name: 'Kontakt', href: '#contact' }
  ].forEach(link => {
    const li = document.createElement('li');
    li.style.marginBottom = '10px';
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.name;
    a.style.cssText = `color: rgba(255,255,255,0.6); font-size: 0.95rem;`;
    a.onmouseenter = () => a.style.color = 'white';
    a.onmouseleave = () => a.style.color = 'rgba(255,255,255,0.6)';
    li.appendChild(a);
    navUl.appendChild(li);
  });
  navCol.appendChild(navTitle);
  navCol.appendChild(navUl);

  // 2. Personal Contacts
  const contactsCol = document.createElement('div');
  contactsCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`; // Center items
  const contactsTitle = document.createElement('h4');
  contactsTitle.textContent = 'Naš tim';
  contactsTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;

  const contacts = [
    { name: 'Gašpar Bodulica', num: '+385 99 3553 000' },
    { name: 'Karlo Časni', num: '+385 91 9545 128' },
    { name: 'Bruno Vujčec', num: '+385 97 6635 960' }
  ];

  contacts.forEach(c => {
    const div = document.createElement('div');
    div.style.marginBottom = '15px';
    div.style.textAlign = 'center'; // Center text

    const nameDiv = document.createElement('div');
    nameDiv.textContent = c.name;
    nameDiv.style.cssText = `color: white; font-weight: 500;`;

    const numLink = document.createElement('a');
    numLink.textContent = c.num;
    numLink.href = `tel:${c.num.replace(/\s/g, '')}`;
    numLink.style.cssText = `color: rgba(255,255,255,0.6); font-size: 0.9rem; transition: color 0.3s;`;

    numLink.onmouseenter = () => numLink.style.color = theme.colors.accentPrimary;
    numLink.onmouseleave = () => numLink.style.color = 'rgba(255,255,255,0.6)';

    div.appendChild(nameDiv);
    div.appendChild(numLink);
    contactsCol.appendChild(div);
  });

  // 3. Socials
  const socialCol = document.createElement('div');
  socialCol.style.cssText = `display: flex; flex-direction: column; align-items: center;`; // Center items
  const socialTitle = document.createElement('h4');
  socialTitle.textContent = 'Social';
  socialTitle.style.cssText = `color: white; margin-bottom: 20px; font-size: 1.1rem;`;
  const socialRow = document.createElement('div');
  socialRow.style.cssText = `display: flex; gap: 15px; justify-content: center;`; // justify center

  ['LinkedIn', 'Instagram'].forEach(net => {
    const link = document.createElement('a');
    link.href = net === 'LinkedIn' ? 'https://www.linkedin.com/company/appercept-net/?viewAsMember=true' : 'https://www.instagram.com/appercept_net/';
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.title = net;

    let svgPath = '';
    if (net === 'LinkedIn') svgPath = '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>';
    if (net === 'Instagram') svgPath = '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>';

    link.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${svgPath}</svg>`;

    // Similar glass but smaller for footer? Or same size. Let's keep it consistent.
    link.style.cssText = `
        ${theme.styles.glass}
        display: flex; 
        align-items: center; 
        justify-content: center; 
        width: 40px; 
        height: 40px; 
        border-radius: 50%; 
        color: white; 
        transition: all 0.3s ease;
        background: rgba(255, 255, 255, 0.03); 
    `;

    link.onmouseenter = () => {
      link.style.background = `linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary})`;
      link.style.transform = 'translateY(-3px)';
      link.style.borderColor = 'transparent';
    };
    link.onmouseleave = () => {
      link.style.background = 'rgba(255, 255, 255, 0.03)';
      link.style.transform = 'translateY(0)';
      link.style.borderColor = 'rgba(255, 255, 255, 0.08)';
    };

    socialRow.appendChild(link);
  });

  socialCol.appendChild(socialTitle);
  socialCol.appendChild(socialRow);

  // Append Cols
  grid.appendChild(navCol);
  grid.appendChild(contactsCol);
  grid.appendChild(socialCol);

  // Copyright
  const copy = document.createElement('div');
  copy.style.cssText = `
        border-top: 1px solid rgba(255,255,255,0.1);
        padding-top: 20px;
        text-align: center;
        color: rgba(255,255,255,0.4);
        font-size: 0.85rem;
    `;
  copy.innerHTML = `&copy; ${new Date().getFullYear()} Appercept. Sva prava pridržana.`;

  container.appendChild(grid);
  container.appendChild(copy);
  footer.appendChild(container);

  return footer;
}
