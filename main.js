
import { App } from './src/App.js';

const app = App();
const root = document.querySelector('#app');
root.appendChild(app);

// Scroll Animations
let scrollDirection = 'down';
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    let newDir = scrollDirection;
    if (currentScrollY > lastScrollY) {
        newDir = 'down';
    } else if (currentScrollY < lastScrollY) {
        newDir = 'up';
    }
    lastScrollY = currentScrollY;

    if (newDir !== scrollDirection) {
        scrollDirection = newDir;
        document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(el => {
            if (scrollDirection === 'down') {
                el.classList.remove('scroll-up');
                el.classList.add('scroll-down');
            } else {
                el.classList.remove('scroll-down');
                el.classList.add('scroll-up');
            }
        });
    }
}, { passive: true });

const observerOpts = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-down', 'scroll-up');
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
            if (scrollDirection === 'down') {
                entry.target.classList.remove('scroll-up');
                entry.target.classList.add('scroll-down');
            } else {
                entry.target.classList.remove('scroll-down');
                entry.target.classList.add('scroll-up');
            }
        }
    });
}, observerOpts);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    // Initial class based on current scroll direction
    if (scrollDirection === 'down') {
        el.classList.add('scroll-down');
    } else {
        el.classList.add('scroll-up');
    }
    observer.observe(el);
});
