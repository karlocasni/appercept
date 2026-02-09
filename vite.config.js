
import { defineConfig } from 'vite';

export default defineConfig({
    base: './', // Use relative paths for assets to support any deployment subpath (e.g. GitHub Pages repo name)
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
