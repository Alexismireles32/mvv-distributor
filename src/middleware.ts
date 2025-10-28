import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = (context, next) => {
  // COMPREHENSIVE SEO BLOCKING - Multiple layers of protection
  if (context.response && context.response.headers) {
    // Primary robots blocking
    context.response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet, noimageindex, nocache, noyaca');
    
    // Additional search engine blocking
    context.response.headers.set('X-Content-Type-Options', 'nosniff');
    context.response.headers.set('X-Frame-Options', 'DENY');
    context.response.headers.set('Referrer-Policy', 'no-referrer');
    
    // Cache control to prevent search engines from caching
    context.response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private');
    context.response.headers.set('Pragma', 'no-cache');
    context.response.headers.set('Expires', '0');
    
    // Additional meta for specific bots
    context.response.headers.set('X-Bingbot', 'noindex, nofollow');
    context.response.headers.set('X-Slurp', 'noindex, nofollow');
    context.response.headers.set('X-DuckDuckBot', 'noindex, nofollow');
  }
  
  return next();
};

