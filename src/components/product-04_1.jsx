"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product4_1() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          <div className="group">
            <a href="/30daydetox" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575526/30daydetox_roziws.png"
                alt="30-Day Detox - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/30daydetox" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">30-Day Detox</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto 30-Day Detox"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/30daydetox">
                Ver Producto
              </a>
            </Button>
          </div>
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
          <div className="group">
            <a href="/chupapanza" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png"
                alt="Chupa Panza - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
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
          {/* ELIMINAR ALPHA GLOW DUPLICADO */}
          {/* <div className="group">
            <a href="/alphaglow" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575532/alphaglow_jwu8mg.png"
                alt="Alpha Glow - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
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
          </div> */}
          <div className="group">
            <a href="/serenity" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575589/serenity_mnncq7.png"
                alt="Serenity - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/serenity" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Serenity</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Serenity"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/serenity">
                Ver Producto
              </a>
            </Button>
          </div>
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-como text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                ✨ Producto Nuevo
              </div>
              <a href="/applecyder" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575550/applecyder_xxg1ps.png"
                  alt="Apple Cider Vinagre - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
            <a href="/applecyder" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Apple Cider Vinagre</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Apple Cider Vinagre"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/applecyder">
                Ver Producto
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
