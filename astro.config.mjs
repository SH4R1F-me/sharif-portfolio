import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sharifmadber.online',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    optimizeDeps: {
      include: ['three'],
    },
  },
});
