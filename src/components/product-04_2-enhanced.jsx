"use client";

import React from "react";
import { ProductCardWithCart } from "./product-card-with-cart";

const PRODUCTS_SET_2 = [
  { 
    name: "Colit 6", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575551/colit6_te7kpi.png", 
    slug: "/colit6"
  },
  { 
    name: "Floryva", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575563/floryva_nb3b0y.png", 
    slug: "/floryva",
    badge: { text: "✨ Producto Nuevo", color: "bg-como" }
  },
  { 
    name: "Encimax", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575578/encimax_kuhluy.png", 
    slug: "/encimax",
    badge: { text: "✨ Producto Nuevo", color: "bg-como" }
  },
  { 
    name: "Maca Premium", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575588/macapremium_s6k65z.png", 
    slug: "/macapremium"
  },
  { 
    name: "CM Push up Men", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575544/cmpushup_ncxzh6.png", 
    slug: "/cmpushupmen"
  },
];

export function Product4_2Enhanced() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          {PRODUCTS_SET_2.map((product) => (
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

