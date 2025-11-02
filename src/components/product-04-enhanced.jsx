"use client";

import React from "react";
import { ProductCardWithCart } from "./product-card-with-cart";
import { PRODUCTS } from "./product-catalog";

// Badges para productos destacados
const PRODUCT_BADGES = {
  "Duo-60 Fusion": { text: "🏆 #1 Más Vendido", color: "bg-[#FFD700]" },
  "Alpha Glow": { text: "✨ Producto Nuevo", color: "bg-como" },
  "Chupa Panza": { text: "📜 Producto Clásico", color: "bg-purple-500" },
};

// Primeros 13 productos del catálogo para la primera sección
const FEATURED_PRODUCTS = PRODUCTS.slice(0, 13).map(product => ({
  ...product,
  badge: PRODUCT_BADGES[product.name]
}));


export function Product4Enhanced() {
  return (
    <section id="relume" className="px-[5%] py-10 md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-10 md:mb-14 lg:mb-18">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="mt-2 text-2xl font-bold leading-tight xxs:text-3xl sm:mt-3 md:mt-4 md:text-4xl md:leading-tight lg:text-6xl lg:leading-tight xl:text-7xl xl:leading-none">
              Productos Destacados
            </h1>
            <p className="mt-4 text-sm xxs:text-base md:mt-6 md:text-md">
              Nuestros suplementos naturales más populares
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCardWithCart 
              key={product.name} 
              product={{ name: product.name, image: product.image, slug: product.slug }}
              badge={product.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

