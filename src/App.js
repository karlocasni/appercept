
import { injectGlobalStyles } from './theme.js';
import { Background } from './components/Background.js';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { About } from './components/About.js';
import { ProductsGrid } from './components/ProductsGrid.js';
import { Offers } from './components/Offers.js';
import { OtherServices } from './components/OtherServices.js';
import { Contact, Footer } from './components/Contact.js';

export function App() {
    // Inject global CSS/Reset
    injectGlobalStyles();

    const app = document.createElement('div');
    app.id = 'app-root';
    app.style.position = 'relative'; // Ensure z-index context

    // Assemble the page
    app.appendChild(Background());
    app.appendChild(Header());
    app.appendChild(Hero());
    app.appendChild(About());
    app.appendChild(ProductsGrid());
    app.appendChild(Offers());
    app.appendChild(OtherServices());
    app.appendChild(Contact());
    app.appendChild(Footer());

    return app;
}
