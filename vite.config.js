
import { defineConfig } from 'vite';

export default defineConfig({
    base: '/', // Use root path for custom domain
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    }
});
