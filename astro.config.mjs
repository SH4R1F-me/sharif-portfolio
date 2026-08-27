import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://sharifmadber.com',
  output: 'static',
  integrations: [
    react(),
    sitemap(),
  ],
  vite: {
    optimizeDeps: {
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  },
});
