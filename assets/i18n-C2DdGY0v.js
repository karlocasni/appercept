(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const o={colors:{background:"#111111",accentPrimary:"#1c75bc",accentSecondary:"#2b3990",text:"#ffffff",glassBorder:"rgba(255, 255, 255, 0.1)"},fonts:{primary:'"Inter", "Helvetica Neue", sans-serif',heading:'"Outfit", sans-serif'},styles:{glass:`
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    `,container:`
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      width: 100%;
    `}},p=()=>{const r=document.createElement("style");r.innerHTML=`
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
      background-color: ${o.colors.background};
      color: ${o.colors.text};
      font-family: ${o.fonts.primary};
      overflow-x: hidden;
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
    
    .glass-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.5);
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
  `,document.head.appendChild(r)};function d(){const r=document.createElement("div");r.id="background-blobs";const a=`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Changed from 100vw to prevent scrollbar overflow */
    height: 300vh; /* Extremely extended height for mobile scrolling safety */
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background: ${o.colors.background};
  `;r.style.cssText=a,[{color:"#1c75bc",size:"900px",top:"-10%",left:"-10%",delay:"0s"},{color:"#2b3990",size:"800px",top:"40%",left:"30%",delay:"-5s"},{color:"#00d2ff",size:"1000px",top:"60%",left:"70%",delay:"-10s"},{color:"#1c75bc",size:"700px",top:"10%",left:"80%",delay:"-2s"},{color:"#2b3990",size:"900px",top:"85%",left:"10%",delay:"-7s"},{color:"#00d2ff",size:"800px",top:"110%",left:"60%",delay:"-3s"},{color:"#1c75bc",size:"1000px",top:"130%",left:"20%",delay:"-5s"},{color:"#2b3990",size:"600px",top:"160%",left:"70%",delay:"-8s"},{color:"#00d2ff",size:"500px",top:"190%",left:"10%",delay:"-2s"},{color:"#1c75bc",size:"800px",top:"220%",left:"50%",delay:"-5s"},{color:"#2b3990",size:"700px",top:"260%",left:"20%",delay:"-9s"}].forEach((t,i)=>{const s=document.createElement("div");s.style.cssText=`
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
    `,i%2===0&&(s.style.animationDuration="25s"),r.appendChild(s)});let n=!1;const e=()=>{const s=-(window.scrollY*.15);r.style.transform=`translate3d(0, ${s}px, 0)`,n=!1};return window.addEventListener("scroll",()=>{n||(window.requestAnimationFrame(e),n=!0)}),r}const c=()=>localStorage.getItem("language")||"hr",m=()=>{const r=c()==="hr"?"en":"hr";localStorage.setItem("language",r),window.location.reload()},f=(r,a)=>c()==="hr"?r:a;export{d as B,f as a,m as b,c as g,p as i,o as t};
