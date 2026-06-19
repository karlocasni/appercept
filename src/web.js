
import { injectGlobalStyles } from './theme.js';
import { Background } from './components/Background.js';
import { WebPage } from './components/WebPage.js';

injectGlobalStyles();

const app = document.querySelector('#app');
const root = document.createElement('div');
root.id = 'app-root';
root.style.position = 'relative';
root.appendChild(Background());
root.appendChild(WebPage());
app.appendChild(root);

let scrollDirection = 'down';
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    let newDir = scrollDirection;
    if (currentScrollY > lastScrollY) newDir = 'down';
    else if (currentScrollY < lastScrollY) newDir = 'up';
    lastScrollY = currentScrollY;

    if (newDir !== scrollDirection) {
        scrollDirection = newDir;
        document.querySelectorAll('.animate-on-scroll:not(.is-visible)').forEach(el => {
            el.classList.remove(scrollDirection === 'down' ? 'scroll-up' : 'scroll-down');
            el.classList.add(scrollDirection === 'down' ? 'scroll-down' : 'scroll-up');
        });
    }
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.remove('scroll-down', 'scroll-up');
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
            entry.target.classList.add(scrollDirection === 'down' ? 'scroll-down' : 'scroll-up');
        }
    });
}, { threshold: 0.05 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('scroll-down');
    observer.observe(el);
});
