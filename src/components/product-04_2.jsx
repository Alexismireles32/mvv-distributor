"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Product4_2() {
  return (
    <section id="relume" className="px-[5%]">
      <div className="container">
        <div className="grid grid-cols-2 justify-items-start gap-x-4 gap-y-8 xxs:gap-x-5 xxs:gap-y-10 xs:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-4">
          <div className="group">
            <a href="/colit6" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575551/colit6_te7kpi.png"
                alt="Colit 6 - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/colit6" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Colit 6</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Colit 6"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/colit6">
                Ver Producto
              </a>
            </Button>
          </div>
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-como text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                ✨ Producto Nuevo
              </div>
              <a href="/floryva" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575563/floryva_nb3b0y.png"
                  alt="Floryva - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
            <a href="/floryva" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Floryva</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Floryva"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/floryva">
                Ver Producto
              </a>
            </Button>
          </div>
          <div className="group">
            <div className="relative mb-3 md:mb-4">
              <div className="absolute -top-2 -right-2 z-10 bg-como text-white px-3 py-1 rounded-full font-bold text-xs shadow-xl rotate-12 animate-pulse">
                ✨ Producto Nuevo
              </div>
              <a href="/encimax" className="block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como">
                <img
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575578/encimax_kuhluy.png"
                  alt="Encimax - MVV Natural"
                  className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </a>
            </div>
            <a href="/encimax" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Encimax</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Encimax"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/encimax">
                Ver Producto
              </a>
            </Button>
          </div>
          <div className="group">
            <a href="/macapremium" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575588/macapremium_s6k65z.png"
                alt="Maca Premium - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/macapremium" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">Maca Premium</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto Maca Premium"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/macapremium">
                Ver Producto
              </a>
            </Button>
          </div>
          <div className="group">
            <a href="/cmpushupmen" className="mb-3 block aspect-[5/6] overflow-hidden rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-como md:mb-4">
              <img
                src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575544/cmpushup_ncxzh6.png"
                alt="CM Push up Men - MVV Natural"
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
            </a>
            <a href="/cmpushupmen" className="flex flex-col text-center md:text-md">
              <div className="mb-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-como">CM Push up Men</h3>
              </div>
            </a>
            <Button
              variant="secondary"
              size="sm"
              title="Ver Producto CM Push up Men"
              className="mt-3 w-full md:mt-4"
              asChild
            >
              <a href="/cmpushupmen">
                Ver Producto
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
