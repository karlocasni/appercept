
import { injectGlobalStyles } from './theme.js';
import { Background } from './components/Background.js';
import { ConsultingPage } from './components/ConsultingPage.js';

injectGlobalStyles();

const app = document.querySelector('#app');
const root = document.createElement('div');
root.id = 'app-root';
root.style.position = 'relative';
root.appendChild(Background());
root.appendChild(ConsultingPage());
app.appendChild(root);

// Scroll Animations
const observerOpts = {
    threshold: 0.05
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOpts);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});
