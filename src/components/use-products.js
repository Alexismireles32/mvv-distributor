"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { PRODUCTS as STATIC_PRODUCTS } from './product-catalog';

export function useProducts() {
  const [products, setProducts] = useState(STATIC_PRODUCTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        if (!supabase) return;
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('name', { ascending: true });
        if (!error && data && data.length > 0) {
          const mapped = data.map((p) => ({
            name: p.name,
            image: p.image_url,
            slug: p.slug || '#'
          }));
          if (mounted) setProducts(mapped);
        }
      } catch (_) {
        // ignore and keep static
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return { products, loading };
}


