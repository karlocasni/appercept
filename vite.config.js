
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                consulting: resolve(__dirname, 'consulting.html'),
                marketing: resolve(__dirname, 'marketing.html'),
                aibots: resolve(__dirname, 'ai-bots.html'),
                web: resolve(__dirname, 'web.html'),
            }
        }
    }
});
