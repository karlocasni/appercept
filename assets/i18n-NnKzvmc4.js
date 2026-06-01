(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const o={colors:{background:"#111111",accentPrimary:"#1c75bc",accentSecondary:"#2b3990",text:"#ffffff",glassBorder:"rgba(255, 255, 255, 0.1)"},fonts:{primary:'"Inter", "Helvetica Neue", sans-serif',heading:'"Outfit", sans-serif'},styles:{glass:`
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 50px 0 rgba(28, 117, 188, 0.05);
    `,container:`
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      width: 100%;
    `}},d=()=>{const r=document.createElement("style");r.innerHTML=`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Outfit:wght@400;700;900&display=swap');

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      width: 100%;
    }

    body {
      background-color: ${o.colors.background};
      color: ${o.colors.text};
      font-family: ${o.fonts.primary};
      width: 100%;
      -webkit-font-smoothing: antialiased;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: ${o.fonts.heading};
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
      font-family: ${o.fonts.primary};
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
      ${o.styles.glass}
      border-radius: 24px;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .carousel-inner {
      overflow: hidden;
      width: calc(100% - 140px);
      margin: 0 auto;
      padding: 20px 0;
      -webkit-mask-image: linear-gradient(to right, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%);
      mask-image: linear-gradient(to right, transparent 0%, black 120px, black calc(100% - 120px), transparent 100%);
    }

    .carousel-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.1);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 10;
      transition: all 0.3s ease;
      font-size: 1.2rem;
    }
    
    .carousel-arrow:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-50%) scale(1.05);
    }
    
    .carousel-arrow.left {
      left: 10px;
    }
    
    .carousel-arrow.right {
      right: 10px;
    }

    .project-card {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 520px;
      height: 440px;
      flex-shrink: 0;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.04);
      border-radius: 24px;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.33, 1), box-shadow 0.4s ease, border-color 0.4s ease;
      box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
    }
    
    .project-card:hover {
      transform: translateY(-8px) scale(1.02);
      border-color: rgba(255, 255, 255, 0.12);
      box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(28, 117, 188, 0.15);
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
      background: linear-gradient(135deg, ${o.colors.accentPrimary}, ${o.colors.accentSecondary});
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
      
      .carousel-inner {
        width: 100% !important;
        padding: 20px 0 !important;
        -webkit-mask-image: linear-gradient(to right, transparent 0%, black 30px, black calc(100% - 30px), transparent 100%) !important;
        mask-image: linear-gradient(to right, transparent 0%, black 30px, black calc(100% - 30px), transparent 100%) !important;
      }
      .carousel-arrow {
        top: auto !important;
        bottom: -50px !important;
        transform: none !important;
      }
      .carousel-arrow:hover {
        transform: scale(1.05) !important;
      }
      .carousel-arrow.left {
        left: calc(50% - 54px) !important;
      }
      .carousel-arrow.right {
        right: calc(50% - 54px) !important;
      }
      .carousel-track {
        padding: 0 calc(10vw - 20px) !important;
      }
      .project-card {
        width: 80vw !important;
        height: auto !important;
        min-height: 420px !important;
      }
      
      section { 
          padding: 60px 0 !important; 
          overflow-x: clip; /* Fix horizontal overflow */
      }
      
      /* Force vertical stack for grids on mobile */
      .responsive-grid {
        display: flex !important;
        flex-direction: column !important;
        gap: 40px !important;
        align-items: center !important; /* Ensure content centered */
      }
      
      .responsive-grid > div,
      .responsive-grid > form {
        width: 100% !important;
        box-sizing: border-box !important;
      }

      /* Reduce contact form internal padding on mobile */
      .glass-card {
        padding: 24px !important;
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
      
      /* Hide Consulting sub-label on desktop, show only on mobile */
      .consulting-logo-label {
        display: none;
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
      
      /* Consulting logo sub-label */
      .consulting-logo-label {
        display: block !important;
      }

      /* Consulting hero: push content below the fixed header on mobile */
      .consulting-hero {
        padding-top: 120px !important;
      }

      /* Hide/Adjust bg logo on mobile */
      .bg-logo-hero {
        opacity: 0.02 !important;
        width: 120% !important;
        right: -10% !important;
      }

      /* Services nav tabs — fit on one line so progress bar aligns */
      .services-nav-wrap {
        padding: 0 0 12px 0 !important;
        overflow: hidden !important;
      }
      .services-nav {
        flex-wrap: nowrap !important;
        justify-content: space-between !important;
        overflow-x: hidden !important;
        padding: 0 20px !important;
        gap: 2px !important;
        width: 100% !important;
      }
      .services-nav button {
        font-size: clamp(8px, 2.2vw, 12px) !important;
        min-width: 0 !important;
        padding: 8px 0 !important;
        letter-spacing: 0px !important;
        flex: 0 1 auto !important;
        text-align: center !important;
      }
      .services-nav button:last-child {
        margin-right: 0 !important;
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
    /* 3D Stacked File Folders & Cabinet Design */
    /* 3D Stacked File Folders & Cabinet Design */
    /* 3D Stacked File Folders & Cabinet Design */
    .cabinet-drawer {
      position: relative;
      background: rgba(10, 15, 30, 0.25);
      border: 1px solid rgba(255, 255, 255, 0.03);
      border-radius: 32px;
      padding: 60px 40px 40px 40px;
      margin: 60px auto 40px auto;
      width: 100%;
      max-width: 900px;
      height: 520px;
      box-shadow: inset 0 20px 50px rgba(0, 0, 0, 0.8), 0 20px 40px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      overflow: visible;
    }
    
    .cabinet-handle {
      width: 150px;
      height: 14px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 50%, rgba(0, 0, 0, 0.4) 100%);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      margin: 30px auto 10px auto;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 10;
    }
    .cabinet-handle::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 45px;
      right: 45px;
      height: 8px;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 2px;
      box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1);
    }
    
    .file-stack {
      position: relative;
      width: 820px;
      height: 400px;
      margin: 0 auto;
    }
    
    .file-folder {
      position: absolute;
      width: 280px;
      height: 370px;
      top: 30px;
      background: rgba(20, 25, 45, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 0 20px 20px 20px;
      padding: 35px 24px 24px 24px;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.33, 1), box-shadow 0.4s ease, border-color 0.4s ease, background 0.4s ease, z-index 0s;
      box-shadow: 10px 10px 30px rgba(0, 0, 0, 0.5);
      cursor: default;
      display: flex;
      flex-direction: column;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
    }
    
    /* Horizontal overlapping positions */
    .file-folder-0 {
      left: 0px;
      z-index: 1;
    }
    .file-folder-1 {
      left: 180px;
      z-index: 2;
    }
    .file-folder-2 {
      left: 360px;
      z-index: 3;
    }
    .file-folder-3 {
      left: 540px;
      z-index: 4;
    }
    
    /* Folder Index Tab */
    .file-folder::before {
      content: attr(data-index);
      position: absolute;
      top: -24px;
      left: -1px;
      height: 24px;
      width: 80px;
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.07);
      border-bottom: none;
      border-radius: 8px 10px 0 0;
      color: rgba(255, 255, 255, 0.4);
      font-size: 0.7rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      letter-spacing: 1.5px;
      font-family: monospace;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      transition: background 0.3s, color 0.3s, border-color 0.3s;
    }
    
    /* Hover state: pop file up out of stack and scale up to read */
    .file-folder:hover {
      transform: translateY(-70px) scale(1.12) !important;
      z-index: 100 !important;
      box-shadow: 0 40px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(28, 117, 188, 0.25) !important;
      border-color: rgba(255, 255, 255, 0.3) !important;
      background: rgba(25, 32, 58, 0.85) !important;
    }
    
    .file-folder:hover::before {
      background: linear-gradient(135deg, #1c75bc, #2b3990);
      color: white;
      border-color: transparent;
    }
    
    /* Pop inner parts */
    .file-folder:hover .pop-3d-icon {
      transform: translateZ(35px) scale(1.05);
    }
    .file-folder:hover .pop-3d-text {
      transform: translateZ(20px);
    }

    @media (max-width: 968px) {
      .cabinet-drawer {
        height: auto;
        max-width: 100%;
        padding: 40px 15px 20px 15px;
      }
      .file-stack {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: column;
        gap: 50px;
      }
      .file-folder {
        position: relative;
        left: 0 !important;
        right: 0 !important;
        top: auto;
        bottom: auto;
        width: 100% !important;
        height: auto;
        transform: none !important;
        opacity: 1 !important;
        margin-top: 35px;
      }
      .file-folder:hover {
        transform: translateY(-10px) scale(1.04) !important;
      }
    }
    }
    }
  `,document.head.appendChild(r)};function c(){const r=document.createElement("div");r.id="background-blobs";const a=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Changed from 100vw to prevent scrollbar overflow */
    height: 300vh; /* Extremely extended height for mobile scrolling safety */
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background: ${o.colors.background};
  `;r.style.cssText=a,[{color:"#1c75bc",size:"900px",top:"-10%",left:"-10%",delay:"0s"},{color:"#2b3990",size:"800px",top:"40%",left:"30%",delay:"-5s"},{color:"#00d2ff",size:"1000px",top:"60%",left:"70%",delay:"-10s"},{color:"#1c75bc",size:"700px",top:"10%",left:"80%",delay:"-2s"},{color:"#2b3990",size:"900px",top:"85%",left:"10%",delay:"-7s"},{color:"#00d2ff",size:"800px",top:"110%",left:"60%",delay:"-3s"},{color:"#1c75bc",size:"1000px",top:"130%",left:"20%",delay:"-5s"},{color:"#2b3990",size:"600px",top:"160%",left:"70%",delay:"-8s"},{color:"#00d2ff",size:"500px",top:"190%",left:"10%",delay:"-2s"},{color:"#1c75bc",size:"800px",top:"220%",left:"50%",delay:"-5s"},{color:"#2b3990",size:"700px",top:"260%",left:"20%",delay:"-9s"}].forEach((t,n)=>{const s=document.createElement("div");s.style.cssText=`
      position: absolute;
      width: ${t.size};
      height: ${t.size};
      background: ${t.color};
      border-radius: 50%;
      filter: blur(120px); /* Increased blur slightly for larger blobs */
      opacity: 0.3; /* Slightly reduced opacity */
      top: ${t.top};
      left: ${t.left};
      animation: float 25s infinite ease-in-out; /* Slower float for larger mass */
      animation-delay: ${t.delay};
    `,n%2===0&&(s.style.animationDuration="25s"),r.appendChild(s)});let i=!1;const e=()=>{const s=-(window.scrollY*.15);r.style.transform=`translate3d(0, ${s}px, 0)`,i=!1};return window.addEventListener("scroll",()=>{i||(window.requestAnimationFrame(e),i=!0)}),r}const p=()=>localStorage.getItem("language")||"en",m=()=>{const r=p()==="hr"?"en":"hr";localStorage.setItem("language",r),window.location.reload()},x=(r,a)=>p()==="hr"?r:a;export{c as B,x as a,m as b,p as g,d as i,o as t};
