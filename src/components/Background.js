
import { theme } from '../theme.js';

export function Background() {
    const container = document.createElement('div');
    container.id = 'background-blobs';

    const style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%; /* Changed from 100vw to prevent scrollbar overflow */
    height: 300vh; /* Extremely extended height for mobile scrolling safety */
    z-index: -1;
    overflow: hidden;
    pointer-events: none;
    background: ${theme.colors.background};
  `;
    container.style.cssText = style;

    // Blob definitions - Increased sizes
    const blobs = [
        { color: '#1c75bc', size: '900px', top: '-10%', left: '-10%', delay: '0s' },
        { color: '#2b3990', size: '800px', top: '40%', left: '30%', delay: '-5s' },
        { color: '#00d2ff', size: '1000px', top: '60%', left: '70%', delay: '-10s' },
        { color: '#1c75bc', size: '700px', top: '10%', left: '80%', delay: '-2s' },
        { color: '#2b3990', size: '900px', top: '85%', left: '10%', delay: '-7s' },
        { color: '#00d2ff', size: '800px', top: '110%', left: '60%', delay: '-3s' },
        { color: '#1c75bc', size: '1000px', top: '130%', left: '20%', delay: '-5s' },
        { color: '#2b3990', size: '600px', top: '160%', left: '70%', delay: '-8s' },
        { color: '#00d2ff', size: '500px', top: '190%', left: '10%', delay: '-2s' },
        { color: '#1c75bc', size: '800px', top: '220%', left: '50%', delay: '-5s' },
        { color: '#2b3990', size: '700px', top: '260%', left: '20%', delay: '-9s' },
    ];

    blobs.forEach((blob, index) => {
        const el = document.createElement('div');
        el.style.cssText = `
      position: absolute;
      width: ${blob.size};
      height: ${blob.size};
      background: ${blob.color};
      border-radius: 50%;
      filter: blur(120px); /* Increased blur slightly for larger blobs */
      opacity: 0.3; /* Slightly reduced opacity */
      top: ${blob.top};
      left: ${blob.left};
      animation: float 25s infinite ease-in-out; /* Slower float for larger mass */
      animation-delay: ${blob.delay};
    `;
        // Add slightly different animation durations for randomness feel
        if (index % 2 === 0) {
            el.style.animationDuration = '25s';
        }
        container.appendChild(el);
    });

    // Parallax effect on scroll
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        // Move the background slightly opposite to scroll direction (or with it?)
        // Standard parallax for "distant" background is to move slower than foreground.
        // Foreground moves up by scrollY.
        // If background is fixed (0 speed), it already moves "with" the viewport perfectly.
        // To make it feel like it's "behind" but not infinite distance, it should move up slightly as we scroll down.
        // So translateY should be negative.
        const speed = 0.15;
        const offset = -(scrollY * speed);

        container.style.transform = `translate3d(0, ${offset}px, 0)`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    return container;
}
