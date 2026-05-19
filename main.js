
import { App } from './src/App.js';

const app = App();
const root = document.querySelector('#app');
root.appendChild(app);

// Scroll Animations
const observerOpts = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        } else {
            entry.target.classList.remove('is-visible');
        }
    });
}, observerOpts);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
