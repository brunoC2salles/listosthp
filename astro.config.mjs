// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.tuhogarposible.com',
  output: 'static',
  trailingSlash: 'always',
  // Old indexed URLs from previous site versions -> current equivalents
  redirects: {
    '/politica-de-privacidad': '/legal/',
    '/simuladores': '/',
    '/simuladores/credito-hipotecario': '/',
  },
  integrations: [react(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});