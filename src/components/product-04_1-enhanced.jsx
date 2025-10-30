"use client";

import React from "react";
import { ProductCardWithCart } from "./product-card-with-cart";

const PRODUCTS_SET_1 = [
  { 
    name: "30-Day Detox", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575526/30daydetox_roziws.png", 
    slug: "/30daydetox"
  },
  { 
    name: "Lipo HD 360", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575584/lipohd_zg9lxy.png", 
    slug: "/lipohd"
  },
  { 
    name: "Chupa Panza", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png", 
    slug: "/chupapanza"
  },
  { 
    name: "Serenity", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575589/serenity_mnncq7.png", 
    slug: "/serenity"
  },
  { 
    name: "Apple Cider Vinagre", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575550/applecyder_xxg1ps.png", 
    slug: "/applecyder",
    badge: { text: "✨ Producto Nuevo", color: "bg-como" }
  },
];

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

