import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  // Add X-Robots-Tag header to prevent all indexing
  if (context.response && context.response.headers) {
    context.response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex');
  }
  
  return next();
};

