"use client";

import { useEffect, useState } from 'react';
import { PRODUCTS as STATIC_PRODUCTS } from './product-catalog';

/**
 * Product list, seeded from the bundled static catalog and upgraded with whatever
 * the admin has configured in the database.
 *
 * The static seed is deliberate: it means the product grid renders instantly and
 * still renders if the API is unreachable, which is what kept these screens usable
 * while the old backend was down.
 */
export function useProducts() {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/products', { credentials: 'same-origin' });
        if (!response.ok) return; // keep the static catalog
        const payload = await response.json();

        if (mounted && Array.isArray(payload?.products) && payload.products.length > 0) {
          setProducts(
            payload.products.map((p) => ({
              name: p.name,
              image: p.image_url,
              slug: p.slug || '#'
            }))
          );
        }
      } catch {
        // Offline or API down — the static catalog stays in place.
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => { mounted = false; };
  }, []);

  return { products, loading };
}
