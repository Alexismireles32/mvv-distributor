"use client";

import { Button } from "@relume_io/relume-ui";
import React from "react";

export function Header76({ onOpenWhatsApp }) {
  return (
    <section
      id="relume"
      className="grid grid-cols-1 gap-y-8 pt-8 md:gap-y-16 md:pt-16 lg:grid-flow-col lg:grid-cols-2 lg:items-center lg:pt-0 lg:gap-y-16"
    >
      <div className="mx-[5%] max-w-[40rem] justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h1 className="mb-4 text-3xl font-bold leading-tight xxs:text-4xl sm:mb-5 md:mb-6 md:text-6xl md:leading-tight lg:text-8xl lg:leading-tight xl:text-10xl xl:leading-none">
          Baja de Peso con MVV Natural: Productos Que Sí Funcionan
        </h1>
        <p className="text-sm leading-relaxed xxs:text-base sm:text-base md:text-md md:leading-relaxed">
          Nuestro bestseller <strong>Duo 60 Fusion Xtreme</strong> y todos nuestros quemadores de grasa naturales aceleran tu metabolismo y controlan los antojos. Nuestros clientes pierden entre <strong>15 y 25 kilos en 2-3 meses</strong>. Sin químicos raros, sin efectos locos. Solo ingredientes naturales en las dosis correctas. <strong>15 años vendiendo</strong> en México y USA nos respaldan.
        </p>
        <div className="mt-5 flex flex-col gap-2.5 xxs:gap-3 sm:flex-row sm:flex-wrap sm:gap-4 md:mt-8">
          <Button 
            title="Comprar por WhatsApp" 
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto bg-como hover:bg-[#3d6849] text-white font-bold text-sm xxs:text-base px-6 py-3.5 xxs:px-8 xxs:py-4 min-h-[44px] md:text-lg md:px-10 md:py-6 shadow-xl hover:shadow-2xl active:scale-95 md:hover:scale-105 transition-all duration-300 rounded-full"
          >
            <span className="flex items-center justify-center gap-2 md:gap-3">
              <span>Comprar por WhatsApp</span>
              <span className="text-lg xxs:text-xl md:text-2xl">🇲🇽🇺🇸</span>
            </span>
          </Button>
          <Button 
            title="Ver Todos los Productos" 
            variant="secondary" 
            asChild
            className="w-full sm:w-auto bg-white border-2 border-como text-como hover:bg-ecru-white font-semibold text-sm xxs:text-base px-6 py-3.5 xxs:px-8 xxs:py-4 min-h-[44px] md:text-lg md:px-10 md:py-6 hover:shadow-lg active:scale-95 md:hover:scale-105 transition-all duration-300 rounded-full"
          >
            <a href="/productos" className="flex items-center justify-center gap-2 md:gap-3">
              <span>Ver Todos los Productos</span>
              <span className="text-lg xxs:text-xl md:text-2xl">🛍️</span>
            </a>
          </Button>
        </div>
      </div>
      <div className="h-[25rem] overflow-hidden pl-[5vw] pr-[5vw] xxs:h-[30rem] md:h-[40rem] lg:h-screen lg:pl-0">
        <div className="grid w-full grid-cols-2 gap-x-4">
          <div className="-mt-[120%] grid size-full animate-loop-vertically columns-2 grid-cols-1 gap-4 self-center">
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/duo-60-fusion" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png"
                  alt="Duo-60 Fusion - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/higa2" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575578/higa2_bzokur.png"
                  alt="Higa2 - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/lidabooster" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575576/Lidabooster_xd5mo9.png"
                  alt="Lida Booster - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/lipohd" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575584/lipohd_zg9lxy.png"
                  alt="Lipo HD - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/duo-60-fusion" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png"
                  alt="Duo-60 Fusion - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/sosburn" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575596/sosburn_g2ui2b.png"
                  alt="SOS Burn - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
          <div className="grid size-full animate-loop-vertically grid-cols-1 gap-4">
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/primerose" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575597/primerose_jk26zj.png"
                  alt="Prime Rose - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/duo-60-fusion" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png"
                  alt="Duo-60 Fusion - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/chupapanza" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575545/chupapanza_m7zfgs.png"
                  alt="Chupa Panza - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/30daydetox" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575526/30daydetox_roziws.png"
                  alt="30 Day Detox - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/duo-60-fusion" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575568/Duo-60fusion_xhsjhs.png"
                  alt="Duo-60 Fusion - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
            <div className="grid size-full grid-cols-1 gap-4">
              <a href="/cmpushup" className="relative w-full pt-[120%] block overflow-hidden rounded-lg transition-transform hover:scale-105">
                <img
                  className="absolute inset-0 size-full object-cover"
                  src="https://res.cloudinary.com/dsulhqvza/image/upload/f_auto,q_auto,w_1200/v1761575544/cmpushup_ncxzh6.png"
                  alt="CM Push Up (Body Shape) - MVV Natural"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
