// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import db from '@astrojs/db';
import svelte from '@astrojs/svelte';

// 1. Import all three platform adapters
import vercel from '@astrojs/vercel';
import netlify from '@astrojs/netlify';
import cloudflare from '@astrojs/cloudflare';

// 2. Define a function to swap them automatically depending on where you deploy
function getAdapter() {
  if (process.env.CF_PAGES || process.env.CLOUDFLARE_ACCOUNT_ID) {
    return cloudflare({ imageService: 'compile' });
  }
  if (process.env.NETLIFY) {
    return netlify();
  }
  // Default fallback to your original Vercel adapter
  return vercel();
}

// https://astro.build/config
export default defineConfig({
  site: 'https://smile-clinic-two.vercel.app',
  prefetch: true,
  trailingSlash: 'never',
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
    db(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static', // Kept your original configuration intact
  
});
