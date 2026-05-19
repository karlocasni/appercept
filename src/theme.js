
export const theme = {
    colors: {
        background: '#111111',
        accentPrimary: '#1c75bc',
        accentSecondary: '#2b3990',
        text: '#ffffff',
        glassBorder: 'rgba(255, 255, 255, 0.1)',
        glassBg: 'rgba(255, 255, 255, 0.05)',
    },
    fonts: {
        primary: '"Inter", "Helvetica Neue", sans-serif',
        heading: '"Outfit", sans-serif',
    },
    styles: {
        glass: `
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px 0 rgba(28, 117, 188, 0.05);
    `,
        container: `
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      width: 100%;
    `,
        flexCenter: `
      display: flex;
      justify-content: center;
      align-items: center;
    `
    }
};

// Helper to inject Global CSS for animations and fonts
export const injectGlobalStyles = () => {
    const style = document.createElement('style');
    style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@400;700;900&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      overflow-x: hidden;
      width: 100%;
    }

    body {
      background-color: ${theme.colors.background};
      color: ${theme.colors.text};
      font-family: ${theme.fonts.primary};
      overflow-x: hidden;
      width: 100%;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${theme.fonts.heading};
    }

    a {
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
    }
    
    button {
      cursor: pointer;
      border: none;
      outline: none;
      font-family: ${theme.fonts.primary};
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: #000; 
    }
    ::-webkit-scrollbar-thumb {
      background: #333; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #555; 
    }

    /* Utilities */
    .glass-card {
      ${theme.styles.glass}
      border-radius: 24px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .text-gradient {
      background: linear-gradient(135deg, #1c75bc, #56b3fa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline;
      font-weight: 600;
    }
    
    .glass-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 35px 60px -10px rgba(0, 0, 0, 0.8), 0 0 60px 0 rgba(28, 117, 188, 0.15);
      border-color: rgba(255, 255, 255, 0.2);
    }

    .btn-primary {
      background: linear-gradient(135deg, ${theme.colors.accentPrimary}, ${theme.colors.accentSecondary});
      color: white;
      padding: 0 32px;
      height: 50px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(28, 117, 188, 0.4);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(43, 57, 144, 0.6);
      filter: brightness(1.1);
    }

    /* Animations */
    @keyframes float {
      0% { transform: translate(0, 0); }
      50% { transform: translate(0, 20px); }
      100% { transform: translate(0, 0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Responsive Styles */
    @media (max-width: 768px) {
      h1 { font-size: 3rem !important; }
      h2 { font-size: 2.2rem !important; }
      
      section { 
          padding: 60px 0 !important; 
          overflow-x: hidden; /* Fix horizontal overflow */
      }
      
      /* Force vertical stack for grids on mobile */
      .responsive-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 40px !important;
        align-items: center !important; /* Ensure content centered */
      }
      
      .responsive-grid > div {
        width: 100% !important;
      }

      /* Mobile Stats Scaling */
      .mobile-center .flex-row {
          gap: 15px !important; /* Reduce gap */
          justify-content: center !important;
      }
      /* Target the stat value and label inside the flex-row items */
      .mobile-center .flex-row > div > div:nth-child(1) { /* Value */
          font-size: 1.5rem !important;
      }
      .mobile-center .flex-row > div > div:nth-child(2) { /* Label */
          font-size: 0.75rem !important;
          letter-spacing: 0.5px !important;
      }

      .mobile-center {
        text-align: center !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
      }
      
      .mobile-center > p {
        margin-left: auto !important;
        margin-right: auto !important;
      }

      .mobile-center > div {
          margin-left: auto !important;
          margin-right: auto !important;
      }
      
      .mobile-center .flex-row {
          justify-content: center !important;
          width: 100% !important;
          flex-wrap: nowrap !important; /* Prevent wrapping for stats */
      }
      
      /* Mobile Nav Overlay (Side Menu) */
      .header-nav {
        display: flex !important;
        position: fixed;
        top: 0;
        right: -100%;
        width: 75% !important;
        max-width: 300px;
        height: 100vh;
        height: 100dvh; /* Mobile viewport height fix */
        background: rgba(17, 17, 17, 0.98);
        backdrop-filter: blur(20px);
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: right 0.4s ease;
        z-index: 999;
        box-shadow: -5px 0 30px rgba(0,0,0,0.5);
        
        /* Safe Area Support */
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
      }
      
      .header-nav.open {
        right: 0;
      }
      
      .header-nav ul {
        flex-direction: column !important;
        gap: 40px !important;
      }
      
      .header-nav a {
        font-size: 1.5rem !important;
      }

      .hamburger-btn {
        display: block !important;
      }
      
      header .container {
        padding: 10px 20px !important;
        flex-direction: row !important;
        justify-content: space-between !important;
      }

      /* Smaller Hero Description */
      section h1 + p {
          font-size: 1.25rem !important;
          line-height: 1.6 !important;
          max-width: 100% !important;
      }

      /* Make hero buttons inline and centered on mobile */
      .hero-btn-row {
        flex-direction: row !important;
        justify-content: center !important;
        width: 100%;
        flex-wrap: wrap;
      }
      .hero-btn-row button {
        width: auto !important;
        margin-right: 0 !important;
      }
      
      /* Center Hero Text */
      .hero-content {
          text-align: center !important;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
      }
      
      /* Hide/Adjust bg logo on mobile */
      .bg-logo-hero {
        opacity: 0.02 !important;
        width: 120% !important;
        right: -10% !important;
      }
    }

    /* Scroll Animations (Global) */
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .animate-on-scroll.scroll-down {
      transform: translateY(30px);
    }
    .animate-on-scroll.scroll-up {
      transform: translateY(-30px);
    }
    .animate-on-scroll.is-visible {
      opacity: 1;
      transform: translateY(0);
    }

    .fade-in-up {
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes subtle-jump {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-8px);
      }
    }
    .subtle-jump-animation {
      animation: subtle-jump 2.5s ease-in-out infinite;
    }

    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
    .marquee-container {
      overflow: hidden;
      width: 100%;
      position: relative;
      display: flex;
    }
    .marquee-track {
      display: flex;
      gap: 20px;
      width: max-content;
      animation: marquee 45s linear infinite;
    }
    .marquee-track:hover {
      animation-play-state: paused;
    }
    /* 3D Floating & Perspective Utility System */
    .perspective-group {
      perspective: 1500px;
      transform-style: preserve-3d;
    }
    
    .card-3d {
      transform-style: preserve-3d;
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.33, 1), box-shadow 0.5s ease, border-color 0.5s ease !important;
    }
    
    .card-3d-left, .card-3d-left.is-visible {
      transform: perspective(1500px) rotateY(22deg) rotateX(2deg) translateZ(0) !important;
    }
    
    .card-3d-center, .card-3d-center.is-visible {
      transform: perspective(1500px) rotateX(4deg) translateZ(0) !important;
    }
    
    .card-3d-right, .card-3d-right.is-visible {
      transform: perspective(1500px) rotateY(-22deg) rotateX(2deg) translateZ(0) !important;
    }
    
    /* 3D translation on hover */
    .card-3d:hover {
      transform: perspective(1500px) rotateY(0deg) rotateX(0deg) translateZ(50px) translateY(-12px) !important;
      box-shadow: 0 40px 80px -15px rgba(0, 0, 0, 0.85), 0 0 60px 0 rgba(28, 117, 188, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
    }

    /* Pop out inner elements */
    .card-3d .pop-3d-icon {
      transform: translateZ(50px);
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.33, 1);
    }
    .card-3d .pop-3d-text {
      transform: translateZ(30px);
      transition: transform 0.5s cubic-bezier(0.25, 1, 0.33, 1);
    }

    @media (max-width: 968px) {
      /* Flatten 3D effects on tablet/mobile for readability and touch interaction */
      .card-3d-left, .card-3d-center, .card-3d-right {
        transform: none !important;
      }
      .card-3d:hover {
        transform: translateY(-5px) !important;
      }
      .card-3d .pop-3d-icon, .card-3d .pop-3d-text {
        transform: none !important;
      }
    /* 3D Book Card Design */
    /* 3D Stacked File Folders Design */
    .file-stack {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      perspective: 1500px;
      transform-style: preserve-3d;
      padding: 60px 0;
    }
    
    .file-folder {
      position: relative;
      flex: 1;
      min-width: 250px;
      max-width: 280px;
      height: 390px;
      margin-left: -50px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 20px 20px 20px; /* Top left sharp for the tab */
      padding: 40px 24px 24px 24px;
      transform-style: preserve-3d;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.33, 1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.6), 0 0 50px 0 rgba(28, 117, 188, 0.05);
      z-index: 1;
      cursor: default;
      display: flex;
      flex-direction: column;
    }
    
    .file-folder:first-child {
      margin-left: 0;
    }
    
    /* Slight natural cabinet rotations */
    .file-folder-0 { transform: perspective(1500px) rotateZ(-3deg) translateY(0); }
    .file-folder-1 { transform: perspective(1500px) rotateZ(2deg) translateY(12px); }
    .file-folder-2 { transform: perspective(1500px) rotateZ(-1deg) translateY(-8px); }
    .file-folder-3 { transform: perspective(1500px) rotateZ(3deg) translateY(8px); }
    
    /* Folder Index Tab */
    .file-folder::before {
      content: attr(data-index);
      position: absolute;
      top: -26px;
      left: -1px;
      height: 26px;
      width: 90px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-bottom: none;
      border-radius: 8px 12px 0 0;
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 1px;
      font-family: monospace;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: background 0.3s, color 0.3s, border-color 0.3s;
    }
    
    /* Hover state: pop out of stack and scale up to read */
    .file-folder:hover {
      transform: perspective(1500px) translateY(-60px) scale(1.18) rotate(0deg) !important;
      z-index: 100 !important;
      box-shadow: 0 45px 85px -10px rgba(0, 0, 0, 0.85), 0 0 60px 0 rgba(28, 117, 188, 0.2) !important;
      border-color: rgba(255, 255, 255, 0.25) !important;
      background: rgba(255, 255, 255, 0.05) !important;
    }
    
    .file-folder:hover::before {
      background: linear-gradient(135deg, #1c75bc, #2b3990);
      color: white;
      border-color: transparent;
    }
    
    /* Pop inner parts */
    .file-folder:hover .pop-3d-icon {
      transform: translateZ(40px) scale(1.05);
    }
    .file-folder:hover .pop-3d-text {
      transform: translateZ(25px);
    }

    @media (max-width: 968px) {
      .file-stack {
        flex-direction: column;
        align-items: center;
        gap: 50px;
      }
      .file-folder {
        margin-left: 0 !important;
        max-width: 100%;
        width: 100%;
        transform: none !important;
      }
      .file-folder:hover {
        transform: translateY(-10px) scale(1.05) !important;
      }
    }
  `;
    document.head.appendChild(style);
};
