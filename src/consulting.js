
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
