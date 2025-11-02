"use client";

import React from "react";
import { ProductCardWithCart } from "./product-card-with-cart";
import { PRODUCTS } from "./product-catalog";

// Badges para productos nuevos
const PRODUCT_BADGES = {
  "Apple Cider Vinagre": { text: "✨ Producto Nuevo", color: "bg-como" },
};

// Productos 14-26 del catálogo para la segunda sección
const PRODUCTS_SET_1 = PRODUCTS.slice(13, 26).map(product => ({
  ...product,
  badge: PRODUCT_BADGES[product.name]
}));

export function Product4_1Enhanced() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {PRODUCTS_SET_1.map((product) => (
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

