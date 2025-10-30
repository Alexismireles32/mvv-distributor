"use client";

import React from "react";
import { ProductCardWithCart } from "./product-card-with-cart";

const FEATURED_PRODUCTS = [
  { 
    name: "Duo-60 Fusion", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png", 
    slug: "/duo-60-fusion",
    badge: { text: "🏆 #1 Más Vendido", color: "bg-[#FFD700]" }
  },
  { 
    name: "Alpha Glow", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575532/alphaglow_jwu8mg.png", 
    slug: "/alphaglow",
    badge: { text: "✨ Producto Nuevo", color: "bg-como" }
  },
  { 
    name: "Chupa Panza", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png", 
    slug: "/chupapanza",
    badge: { text: "📜 Producto Clásico", color: "bg-purple-500" }
  },
  { 
    name: "SOS Burn", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575596/sosburn_g2ui2b.png", 
    slug: "/sosburn"
  },
  { 
    name: "SOS Burn Sensitive", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575600/sosburnsensitive_dfsrs1.png", 
    slug: "/sosburn-sensitive"
  },
  { 
    name: "Prime Rose", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575597/primerose_jk26zj.png", 
    slug: "/primrose"
  },
  { 
    name: "Lida Booster", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575576/Lidabooster_xd5mo9.png", 
    slug: "/lidabooster"
  },
  { 
    name: "Lipo HD 360", 
    image: "https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575584/lipohd_zg9lxy.png", 
    slug: "/lipohd"
  },
];


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

