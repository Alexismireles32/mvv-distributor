"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product4() {
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
          {/* 1. Duo 60 Fusion */}
          <div className="group">
            {/* Badge "Más Vendido" */}
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-[#FFD700] text-como px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                🏆 #1 Más Vendido
              </div>
              <a href="/duo-60-fusion" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png"
                  alt="Duo-60 Fusion - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
              />
            </a>
            </div>
            <a href="/duo-60-fusion" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Duo-60 Fusion</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/duo-60-fusion">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 2. Alpha Glow with "Nuevo" badge */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-como text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                ✨ Producto Nuevo
              </div>
              <a href="/alphaglow" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575532/alphaglow_jwu8mg.png"
                  alt="Alpha Glow - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
            <a href="/alphaglow" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Alpha Glow</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Alpha Glow"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/alphaglow">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 3. Chupa Panza with "Producto Clásico" badge */}
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-purple-500 text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                📜 Producto Clásico
              </div>
              <a href="/chupapanza" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png"
                  alt="Chupa Panza - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
            <a href="/chupapanza" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Chupa Panza</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Chupa Panza"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/chupapanza">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 4. SOS Burn */}
          <div className="group">
            <a href="/sosburn" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575596/sosburn_g2ui2b.png"
                alt="SOS Burn - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/sosburn" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">SOS Burn</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto SOS Burn"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/sosburn">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 5. SOS Burn Sensitive */}
          <div className="group">
            <a href="/sosburnsensitive" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575600/sosburnsensitive_dfsrs1.png"
                alt="SOS Burn Sensitive - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/sosburnsensitive" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">SOS Burn Sensitive</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto SOS Burn Sensitive"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/sosburnsensitive">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 6. Prime Rose */}
          <div className="group">
            <a href="/primerose" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575597/primerose_jk26zj.png"
                alt="Prime Rose - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/primerose" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Prime Rose</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Prime Rose"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/primerose">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 7. Lida Booster */}
          <div className="group">
            <a href="/lidabooster" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575576/Lidabooster_xd5mo9.png"
                alt="Lida Booster - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/lidabooster" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Lida Booster</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Lida Booster"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/lidabooster">
                Ver Producto
              </a>
            </Button>
          </div>

          {/* 8. Lipo HD */}
          <div className="group">
            <a href="/lipohd" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575584/lipohd_zg9lxy.png"
                alt="Lipo HD 360 - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/lipohd" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Lipo HD 360</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Lipo HD 360"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/lipohd">
                Ver Producto
              </a>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
