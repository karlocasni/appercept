
# Appercept

High-end corporate website built with Vanilla JS, Vite, and Supabase.

## Setup

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Variables (Optional):**
    Create a `.env` file in the root directory for your Supabase credentials. If skipped, the app uses mock data.
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    *Note: The app is configured to gracefully fallback to mock data if these are missing or invalid.*

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```
    The output will be in the `dist/` folder.

## Deployment (GitHub Pages)

This project is pre-configured for GitHub Pages deployment.
1.  Push the code to GitHub.
2.  Go to Settings > Pages.
3.  Set source to "GitHub Actions" or standard branch deployment pointed at `dist` folder (if you commit dist, though usually you build via Actions).
4.  Alternatively, use `gh-pages` package:
    ```bash
    npx gh-pages -d dist
    ```

## Architecture

*   **`main.js`**: Entry point. Mounts the `App` component.
*   **`src/App.js`**: Main orchestrator. Assembles the page sections.
*   **`src/components/`**: Functional components (pure JS returning DOM elements).
*   **`src/theme.js`**: Central design system token and global style injector.
*   **`src/lib/supabase.js`**: Supabase client configuration and mock data fallback.

## Design

*   **Glassmorphism**: Achieved via `backdrop-filter: blur()` and semi-transparent backgrounds defined in `theme.js`.
*   **Dynamic Background**: `Background.js` injects animated colored blobs.
*   **Content**: Fetches from Supabase `products` and `offers` tables dynamic content.
