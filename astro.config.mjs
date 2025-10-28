// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.mvvnatural.com',
  output: 'static',
  
  // Build optimizations
  build: {
    inlineStylesheets: 'auto', // Inline small CSS for faster load
  },
  
  // Prefetch for instant navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport', // Prefetch links when visible
  },
  
  // Vite optimizations
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'ui-vendor': ['framer-motion', 'clsx'],
          }
        }
      }
    }
  },
  
  // Integrations
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      filter: (page) => !page.includes('/admin'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [], // Will be auto-generated
      serialize(item) {
        // Custom priority logic based on page type
        let priority = 0.7;
        let changefreq = 'weekly';
        
        // Homepage - highest priority
        if (item.url === 'https://www.mvvnatural.com/') {
          priority = 1.0;
          changefreq = 'daily';
        }
        // Product pages - high priority
        else if (
          item.url.includes('/duo-60-fusion') ||
          item.url.includes('/sosburn') ||
          item.url.includes('/lidabooster') ||
          item.url.includes('/alphaglow') ||
          item.url.includes('/productos')
        ) {
          priority = 0.9;
          changefreq = 'weekly';
        }
        // Blog and resources - medium-high priority
        else if (
          item.url.includes('/blog/') ||
          item.url.includes('/recursos/') ||
          item.url.includes('/testimonios')
        ) {
          priority = 0.8;
          changefreq = 'weekly';
        }
        // Other product pages
        else if (
          !item.url.includes('/contacto') &&
          !item.url.includes('/aviso-legal') &&
          !item.url.includes('/politica-de-privacidad') &&
          !item.url.includes('/catalogo') &&
          !item.url.includes('/blog')
        ) {
          priority = 0.8;
          changefreq = 'monthly';
        }
        // Legal pages - lower priority
        else if (
          item.url.includes('/aviso-legal') ||
          item.url.includes('/politica-de-privacidad') ||
          item.url.includes('/preguntas-frecuentes') ||
          item.url.includes('/contacto')
        ) {
          priority = 0.5;
          changefreq = 'monthly';
        }
        
        return {
          ...item,
          priority,
          changefreq,
        };
      },
    })
  ],
  
  // 301 Redirects for duplicate pages
  redirects: {
    '/primerose': '/primrose',
    '/slimcoffe': '/slimcoffee',
    '/ashawandha': '/ashwagandha',
    '/sosburnclear': '/sosburn-clear',
    '/sosburnsensitive': '/sosburn-sensitive',
  },
  
  // HTML compression
  compressHTML: true,
});